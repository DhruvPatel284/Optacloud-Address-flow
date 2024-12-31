import { Link } from 'react-router-dom';
import { MapPin, Navigation, Search } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Find and Save Your</span>
            <span className="block text-teal-600">Perfect Location</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Easily search, select, and save your delivery locations with our intuitive location service powered by Google Maps.
          </p>
          
          <div className="mt-10">
            <Link
              to="/search"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:text-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Location
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <Search className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Search Places</h3>
              <p className="mt-2 text-gray-500">
                Find any location using our powerful search powered by Google Maps
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <MapPin className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Save Addresses</h3>
              <p className="mt-2 text-gray-500">
                Save your frequently used locations for quick access
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <Navigation className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Get Directions</h3>
              <p className="mt-2 text-gray-500">
                View directions and navigate to your saved locations easily
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};