import { useState, useEffect, useRef } from 'react';
import { fetchTags } from '../utils/api';

export default function TagSelector({ selectedTags, onChange }) {
  const [availableTags, setAvailableTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const dropdownRef = useRef(null);

  // Fetch tags from the API
  useEffect(() => {
    const loadTags = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        // Use our API utility to fetch tags
        const tagsData = await fetchTags();
        setAvailableTags(tagsData || []);
        
        // Extract unique categories
        const uniqueCategories = ['all', ...new Set(tagsData.map(tag => tag.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching tags:', err);
        setError('Failed to load tags. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTags();
  }, []);

  // Filter tags based on search term and category
  useEffect(() => {
    let filtered = [...availableTags];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tag => tag.category === selectedCategory);
    }
    
    // Apply search filter if there's a search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(tag => 
        tag.name.toLowerCase().includes(term)
      );
    }
    
    // Sort by usage count (most used first), then alphabetically
    filtered.sort((a, b) => {
      // First sort by whether it's already selected
      const aSelected = selectedTags.some(t => t.id === a.id);
      const bSelected = selectedTags.some(t => t.id === b.id);
      
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      
      // Then by usage count
      if (b.usage_count !== a.usage_count) {
        return b.usage_count - a.usage_count;
      }
      
      // Finally alphabetically
      return a.name.localeCompare(b.name);
    });
    
    setFilteredTags(filtered);
  }, [availableTags, searchTerm, selectedCategory, selectedTags]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle tag selection
  const toggleTag = (tag) => {
    const isSelected = selectedTags.some(t => t.id === tag.id);
    
    if (isSelected) {
      // Remove tag
      onChange(selectedTags.filter(t => t.id !== tag.id));
    } else {
      // Add tag
      onChange([...selectedTags, tag]);
    }
  };

  // Add a custom tag
  const addCustomTag = () => {
    if (!searchTerm.trim()) return;
    
    // Check if a tag with this name already exists
    const existingTag = availableTags.find(
      t => t.name.toLowerCase() === searchTerm.toLowerCase().trim()
    );
    
    if (existingTag) {
      toggleTag(existingTag);
      setSearchTerm('');
      return;
    }
    
    // Otherwise, create a custom tag object
    const customTag = {
      id: `custom-${Date.now()}`, // Temporary custom ID
      name: searchTerm.trim(),
      slug: searchTerm.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      category: 'custom',
      isCustom: true // Flag to identify custom tags that need to be created on the server
    };
    
    onChange([...selectedTags, customTag]);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected tags display */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.map(tag => (
          <div
            key={tag.id}
            className="flex items-center bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-sm"
          >
            <span>{tag.name}</span>
            <button
              type="button"
              onClick={() => toggleTag(tag)}
              className="ml-1 text-blue-300 hover:text-white focus:outline-none"
              aria-label={`Remove ${tag.name} tag`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      {/* Input field */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search or add skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setIsOpen(true)}
          className="w-full px-4 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
          aria-expanded={isOpen}
          aria-controls="tag-dropdown"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={addCustomTag}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-white"
            aria-label="Add custom tag"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          id="tag-dropdown"
          className="absolute z-20 mt-1 w-full max-h-60 overflow-auto rounded-md bg-slate-800 border border-slate-700 shadow-lg"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-300">
              <svg className="animate-spin h-5 w-5 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading tags...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-400">
              {error}
            </div>
          ) : (
            <>
              {/* Category filter */}
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-2">
                <div className="flex flex-wrap gap-1">
                  {categories.map(category => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`px-2 py-1 text-xs rounded-full ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tags list */}
              <div className="py-1">
                {filteredTags.length === 0 ? (
                  <div className="p-4 text-center text-gray-400">
                    {searchTerm
                      ? `No matching tags found. Press + to add "${searchTerm}" as a new tag.`
                      : 'No tags available for this category.'}
                  </div>
                ) : (
                  filteredTags.map(tag => {
                    const isSelected = selectedTags.some(t => t.id === tag.id);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-600/20 text-blue-300'
                            : 'text-gray-300 hover:bg-slate-700'
                        }`}
                      >
                        <span className="flex items-center">
                          <span className="mr-2 text-xs px-1.5 py-0.5 rounded bg-slate-700 text-gray-300">
                            {tag.category}
                          </span>
                          {tag.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {isSelected ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span>{tag.usage_count > 0 ? `${tag.usage_count} uses` : ''}</span>
                          )}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
              
              {/* Option to add custom tag if no matches */}
              {searchTerm && filteredTags.length === 0 && (
                <div className="border-t border-slate-700">
                  <button
                    type="button"
                    onClick={addCustomTag}
                    className="w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-slate-700 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add "{searchTerm}" as a new skill
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}