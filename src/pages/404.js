import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Head>
        <title>Page Not Found | Boulder Startup Week Builders&apos; Room</title>
        <meta name="description" content="Page not found" />
      </Head>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Page Not Found</p>
        <p className="text-xl mb-12 text-gray-400 max-w-md text-center">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all"
        >
          Return Home
        </Link>
      </main>
      
      <Footer />
    </div>
  );
}