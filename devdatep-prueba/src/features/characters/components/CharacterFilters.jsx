import { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes, FaFilter, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "../../../components/ui/Skeleton";

const CharacterFilters = ({ 
  search, 
  setSearch, 
  race, 
  setRace, 
  allRaces, 
  isLoadingRaces 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRaceSelect = (selectedRace) => {
    setRace(selectedRace);
    setIsDropdownOpen(false);
  };

  const clearSearch = () => setSearch("");

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="flex-1 relative group">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-red_base group-focus-within:text-orange_base transition-colors" />
        <input
          type="text"
          placeholder="Buscar guerrero..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-cream_light text-red_dark border-2 border-red_base rounded-2xl pl-12 pr-12 py-4 font-bold focus:outline-none focus:border-orange_base transition-all placeholder:text-red_dark/30 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        />
        {search && (
          <button 
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-red_base hover:text-red_dark hover:bg-red_light/10 rounded-full transition-all"
          >
            <FaTimes size={14} />
          </button>
        )}
      </div>

      <div className="w-full md:w-64 relative" ref={dropdownRef}>
        {isLoadingRaces ? (
          <Skeleton className="h-full w-full rounded-2xl" />
        ) : (
          <>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full h-full bg-cream_light text-red_dark border-2 border-red_base rounded-2xl pl-12 pr-4 py-4 font-bold flex items-center justify-between hover:bg-white transition-all shadow-lg text-left"
            >
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-red_base" />
              <span className="truncate">{race || "Todas las razas"}</span>
              <FaChevronDown className={`text-red_base transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute z-50 w-full mt-2 bg-cream_light border-2 border-red_base rounded-2xl shadow-2xl overflow-hidden py-2"
                >
                  <button
                    onClick={() => handleRaceSelect("")}
                    className={`w-full px-6 py-3 text-left font-bold text-sm transition-colors ${!race ? 'bg-red_base text-cream_light' : 'text-red_dark hover:bg-red_light/10'}`}
                  >
                    Todas las razas
                  </button>
                  {allRaces.filter(r => r !== "").map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRaceSelect(r)}
                      className={`w-full px-6 py-3 text-left font-bold text-sm transition-colors ${race === r ? 'bg-red_base text-cream_light' : 'text-red_dark hover:bg-red_light/10'}`}
                    >
                      {r}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterFilters;
