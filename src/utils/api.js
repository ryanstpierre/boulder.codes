// API utilities for fetching data in both production and development environments

/**
 * Get the appropriate API URL based on the current environment
 * @param {string} endpoint - The API endpoint path
 * @returns {string} - The full API URL
 */
export function getApiUrl(endpoint) {
  // Use relative URLs which work in both development and production
  // For development, ensure we're using the right port
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return `http://localhost:3000/api/${endpoint}`;
  }
  return `/api/${endpoint}`;
}

/**
 * Fetch tags from the API
 * 
 * @param {Object} options - Filter options
 * @param {string} options.category - Optional category filter
 * @param {boolean} options.approved - Whether to fetch only approved tags (default: true)
 * @param {boolean} options.hidden - Whether to fetch hidden tags (default: false)
 * @returns {Promise<Array>} - Array of tags
 */
export async function fetchTags(options = {}) {
  const { category, approved = true, hidden = false } = options;
  
  // Build query parameters
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  params.append('approved', approved.toString());
  params.append('hidden', hidden.toString());
  
  try {
    const queryString = params.toString();
    const url = `${getApiUrl('tags')}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tags (${response.status})`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch tags');
    }
    
    return result.data || [];
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
}

/**
 * Register a participant with tags
 * 
 * @param {Object} formData - Registration form data
 * @returns {Promise<Object>} - Registration result
 */
export async function registerWithTags(formData) {
  try {
    // Determine the appropriate endpoint based on registration type
    const endpoint = formData.registrationType === 'community' ? 'community/register' : 'register-with-tags';
    const url = getApiUrl(endpoint);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      // Handle specific error codes
      if (response.status === 409) {
        throw new Error('This email address is already registered');
      }
      throw new Error(`Registration failed (${response.status})`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Registration failed');
    }
    
    return result;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

/**
 * Fetch all registrations (admin only)
 * 
 * @param {string} apiKey - Admin API key for authentication
 * @returns {Promise<Array>} - Array of registrations
 */
export async function fetchRegistrations(apiKey) {
  try {
    const url = getApiUrl('registrations');
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch registrations (${response.status})`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch registrations');
    }
    
    return result.data || [];
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw error;
  }
}

/**
 * Administer tags (admin only)
 * 
 * @param {string} apiKey - Admin API key for authentication
 * @param {string} action - Action to perform (approve, hide, update, create)
 * @param {Object} tagData - Tag data
 * @returns {Promise<Object>} - Updated tag
 */
export async function administerTag(apiKey, action, tagData) {
  try {
    const url = getApiUrl('admin/tags');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        action,
        tagData
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to administer tag (${response.status})`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to administer tag');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error administering tag:', error);
    throw error;
  }
}

/**
 * Fetch community members (public endpoint)
 * 
 * @returns {Promise<Array>} - Array of community members
 */
export async function fetchCommunityMembers() {
  try {
    const url = getApiUrl('community/members');
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch community members (${response.status})`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch community members');
    }
    
    return result.data || [];
  } catch (error) {
    console.error('Error fetching community members:', error);
    throw error;
  }
}