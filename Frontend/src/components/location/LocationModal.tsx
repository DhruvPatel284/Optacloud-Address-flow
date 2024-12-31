import { MapPin, Search } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal = ({ isOpen, onClose }: LocationModalProps) => {
  if (!isOpen) return null;

  const handleEnableLocation = async () => {
    try {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          // Handle success
          onClose();
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } catch (error) {
      console.error('Error requesting location:', error);
    }
  };

  const handleManualSearch = () => {
    onClose();
    // Will implement manual search in next step
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 mb-4">
            <MapPin className="h-6 w-6 text-teal-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Enable Location Services
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            To provide you with the best delivery experience, we need access to your location. 
            You can either enable location services or search for your address manually.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleEnableLocation}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Enable Location
          </button>
          <button
            onClick={handleManualSearch}
            className="w-full flex items-center justify-center px-4 py-2 border-2 border-teal-600 text-sm font-medium rounded-md text-teal-600 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Manually
          </button>
        </div>
      </div>
    </div>
  );
};