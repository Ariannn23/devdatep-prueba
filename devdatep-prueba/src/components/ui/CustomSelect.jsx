import { useState, useEffect, useRef, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import Skeleton from "./Skeleton";

const CustomSelect = forwardRef(({ label, icon: Icon, options, value, onChange, placeholder, isLoading, error, className = "" }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) setSearchTerm("");
  }, [isOpen]);

  const filteredOptions = options.filter(opt => {
    const name = (opt.name || opt).toString().toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  return (
    <div className={`flex flex-col gap-1 ${className}`} ref={containerRef}>
      {label && (
        <label className="flex items-center gap-2 font-bold text-sm text-cream_light/70 ml-1">
          {Icon && <Icon className="text-orange_base" />} {label}
        </label>
      )}
      {isLoading ? (
        <Skeleton className="h-12 w-full rounded-xl" />
      ) : (
        <div className="relative">
          <button
            type="button"
            ref={ref}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full bg-red_dark border-2 rounded-2xl px-5 py-3 flex items-center justify-between font-bold transition-all shadow-lg ${
              isOpen ? 'border-orange_base' : 'border-red_light/20'
            }`}
          >
            <span className={value ? 'text-cream_light' : 'text-cream_light/30 italic text-sm'}>
              {options.find(opt => (opt.value || opt.id || opt.name || opt) === value)?.label || 
               options.find(opt => (opt.value || opt.id || opt.name || opt) === value)?.name || 
               value || placeholder}
            </span>
            <FaChevronDown className={`text-orange_base transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute z-[100] w-full mt-2 bg-red_base border-2 border-red_light/20 rounded-2xl shadow-2xl overflow-hidden p-2 flex flex-col gap-2"
              >
                <input
                  type="text"
                  placeholder="Buscar..."
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-red_dark border border-red_light/10 rounded-xl px-4 py-2 text-sm text-cream_light focus:outline-none focus:border-orange_base/50 placeholder:text-cream_light/20 font-body"
                />
                
                <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-orange_base p-1 flex flex-col gap-1 pr-1">
                  {filteredOptions.length === 0 ? (
                    <p className="text-cream_light/30 text-xs text-center py-4 font-body italic">No hay resultados</p>
                  ) : (
                    filteredOptions.map((opt) => {
                      const optValue = opt.value || opt.id || opt.name || opt;
                      const optName = opt.label || opt.name || opt;
                      const isSelected = value === optValue;

                      return (
                        <button
                          key={optValue}
                          type="button"
                          onClick={() => {
                            onChange(optValue);
                            setIsOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 transition-all rounded-xl font-bold flex items-center justify-between group ${
                            isSelected ? 'bg-red_light/20' : 'hover:bg-red_light/10 text-cream_light'
                          }`}
                        >
                          <span className="text-cream_light">
                            {optName}
                          </span>
                          {isSelected && <FaChevronRight className="text-orange_base text-xs" />}
                        </button>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      {error && <p className="text-red-400 text-xs ml-1">{error}</p>}
    </div>
  );
});

export default CustomSelect;
