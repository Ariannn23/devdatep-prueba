import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import useCharacters from "../hooks/useCharacters";
import useCharacterFilters from "../hooks/useCharacterFilters";
import CharacterCard from "../components/CharacterCard";
import Skeleton from "../components/ui/Skeleton";
import { useState } from "react";

const MainPage = () => {
  const { data, isLoading } = useCharacters();
  const [minLoadDone, setMinLoadDone] = useState(false);
  const { search, race, handleSearch, handleRaceChange, filteredCharacters } =
    useCharacterFilters(data?.items);
  const races = [
    "Todas las razas",
    ...new Set(data?.items?.map((c) => c.race)),
  ];
  useEffect(() => {
    const timer = setTimeout(() => setMinLoadDone(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const showSkeleton = isLoading || !minLoadDone;

  return (
    <div className="min-h-screen bg-red_dark">
      <div className="container mx-auto p-4">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
          className="text-6xl font-title font-semibold text-center mb-6 text-cream_light drop-shadow-lg tracking-wide"
        >
          <span
            className="text-red_base_light"
            style={{ textShadow: "0 0 2px #d48080" }}
          >
            Personajes{" "}
          </span>
          <span className="text-orange_base italic">Dragon Ball Z</span>
        </motion.h1>

        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-red_base" />
            <input
              type="text"
              placeholder="Buscar personaje"
              value={search}
              onChange={handleSearch}
              className="w-full font-body text-red_dark bg-cream_light border-2 rounded-lg pl-10 p-2 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {races.map((r) => (
            <motion.button
              key={r}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRaceChange(r === "Todas las razas" ? "" : r)}
              className={`font-body px-3 py-1 rounded-lg border-2 transition-all 
                ${
                  race === (r === "Todas las razas" ? "" : r)
                    ? "bg-red_base text-cream_light border-cream_light"
                    : "bg-cream_light text-red_dark border-red_base"
                }`}
            >
              {r}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {showSkeleton
            ? Array(8)
                .fill(0)
                .map((_, i) => <Skeleton key={i} index={i} />)
            : filteredCharacters?.map((character, index) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  index={index}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
