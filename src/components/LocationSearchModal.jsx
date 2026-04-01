import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../redux/locationSlice';
import { MapPin, Crosshair, X, Navigation, Loader2 } from 'lucide-react';

const LocationSearchModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);

  // Debounced Search using OpenStreetMap's free Nominatim Geocoding API
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=5&countrycodes=in`);
        const data = await response.json();
        setResults(data || []);
      } catch (err) {
        console.error("Geocoding fetch error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSelectLocation = (lat, lng, displayName) => {
    // Extract a shorter city name logically from the display string if possible
    const parts = displayName.split(',');
    const city = parts[0].trim();
    
    dispatch(setLocation({ lat, lng, city, address: displayName }));
    onClose();
  };

  const handleGPSLocation = () => {
    setGpsLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude.toString();
          const lng = position.coords.longitude.toString();
          
          try {
            // Reverse geocode to get a visual city name 
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            
            const address = data.display_name || 'Current Location';
            const city = data.address?.city || data.address?.town || data.address?.suburb || 'Current Location';
            
            dispatch(setLocation({ lat, lng, city, address }));
            onClose();
          } catch (e) {
            console.error("Reverse Geocoding failed", e);
            // Fallback to anonymous GPS ping
            dispatch(setLocation({ lat, lng, city: "GPS Location", address: "Custom GPS Point" }));
            onClose();
          } finally {
            setGpsLoading(false);
          }
        },
        (error) => {
          console.error("GPS Error:", error);
          alert("Could not fetch GPS. Please ensure Location Permissions are allowed.");
          setGpsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setGpsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed top-0 left-0 bottom-0 z-50 w-full sm:w-[450px] bg-white dark:bg-[#1C1C1C] shadow-2xl transition-transform duration-300 transform translate-x-0 overflow-y-auto">
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold dark:text-white">Search Location</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors dark:text-gray-300">
              <X size={24} />
            </button>
          </div>

          <div className="relative mb-6">
            <MapPin className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              autoFocus
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white transition-all shadow-sm"
              placeholder="Search for area, street name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button 
            onClick={handleGPSLocation}
            disabled={gpsLoading}
            className="flex items-center gap-3 w-full p-4 mb-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors group text-left"
          >
            {gpsLoading ? (
              <Loader2 className="text-orange-500 animate-spin" size={24} />
            ) : (
              <Crosshair className="text-orange-500 group-hover:scale-110 transition-transform" size={24} />
            )}
            <div>
              <p className="font-semibold text-orange-500">Get current location</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Using GPS coordinates</p>
            </div>
          </button>

          <div className="flex-1 overflow-y-auto w-full border-t border-slate-100 dark:border-slate-800 pt-4">
            {isSearching && (
              <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
                <Loader2 className="animate-spin mr-2" size={20} /> Searching...
              </div>
            )}
            
            {!isSearching && results.length > 0 && (
              <ul className="space-y-1">
                {results.map((place) => (
                  <li key={place.place_id}>
                    <button
                      onClick={() => handleSelectLocation(place.lat, place.lon, place.display_name)}
                      className="w-full flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors text-left"
                    >
                      <Navigation className="text-slate-400 dark:text-slate-500 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">{place.display_name.split(',')[0]}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{place.display_name}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {!isSearching && searchQuery.length >= 3 && results.length === 0 && (
              <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                No locations found. Try a different search term.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationSearchModal;
