import { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimesCircle,
  FaFistRaised
} from "react-icons/fa";
import { motion } from "framer-motion";
import CharacterCard from "../features/characters/components/CharacterCard";
import CharacterCardSkeleton from "../features/characters/components/CharacterCardSkeleton";
import Skeleton from "../components/ui/Skeleton";
import CharacterFilters from "../features/characters/components/CharacterFilters";
import useCharacters, {
  useAllRaces,
  useAllCharacters,
} from "../features/characters/hooks/useCharacters";
import useCharacterFilters from "../features/characters/hooks/useCharacterFilters";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [minLoadDone, setMinLoadDone] = useState(false);

  const { data: allRaces = [], isLoading: isLoadingRaces } = useAllRaces();
  const { data: allData } = useAllCharacters();
  const { data, isLoading, isFetching } = useCharacters(page, debouncedSearch);

  const { race, handleRaceChange, characters } = useCharacterFilters({
    paginatedItems: data?.items,
    allItems: allData?.items,
    debouncedSearch,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    setMinLoadDone(false);
    const timer = setTimeout(() => setMinLoadDone(true), 1000);
    return () => clearTimeout(timer);
  }, [page, debouncedSearch, race]);

  const handleRaceChangeWithReset = (selectedRace) => {
    handleRaceChange(selectedRace);
    setPage(1);
  };

  const showSkeleton =
    !debouncedSearch && (isLoading || isFetching || !minLoadDone);

  return (
    <div className="min-h-screen bg-red_dark">
      <div className="container mx-auto p-4 flex flex-col min-h-screen">
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-5xl md:text-6xl font-title font-black text-cream_light tracking-tighter drop-shadow-[0_0_15px_rgba(161,74,74,0.5)] flex flex-wrap gap-x-4">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ 
                   WebkitTextStroke: "5px #d4ceb8",
                   paintOrder: "stroke fill"
                }}
                className="text-red_base font-black drop-shadow-none"
              >
                Personajes
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 50, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 200 }}
                className="text-orange_base italic drop-shadow-[0_0_20px_rgba(245,166,35,0.6)]"
              >
                Dragon Ball Z
              </motion.span>
            </h1>

            {isLoading ? (
              <Skeleton className="h-12 w-32 rounded-2xl" />
            ) : (
              <Link 
                  to="/missions"
                  className="flex items-center gap-3 px-6 py-3 bg-red_base border-2 border-red_light/20 rounded-2xl hover:border-orange_base transition-all group hover:scale-105"
              >
                  <FaFistRaised className="text-cream_light group-hover:rotate-12 transition-transform" />
                  <span className="text-cream_light font-bold text-sm tracking-widest uppercase">Misiones</span>
              </Link>
            )}
        </div>

        <CharacterFilters 
          search={search}
          setSearch={setSearch}
          race={race}
          setRace={handleRaceChangeWithReset}
          allRaces={allRaces}
          isLoadingRaces={isLoadingRaces}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start content-start flex-grow">
          {showSkeleton ? (
            Array(8)
              .fill(0)
              .map((_, i) => <CharacterCardSkeleton key={i} index={i} />)
          ) : characters.length === 0 ? (
            <div className="col-span-4 flex flex-col items-center justify-center py-20 gap-4">
              <FaTimesCircle className="text-red_base text-6xl drop-shadow-lg" />
              <p className="text-cream_light font-body text-xl text-center">
                No se encontraron personajes
              </p>
            </div>
          ) : (
            characters.map((character, index) => (
              <CharacterCard
                key={character.id}
                character={character}
                index={index}
              />
            ))
          )}
        </div>

        {!race && (data?.links?.next || data?.links?.prev) && (
          <div className="flex justify-center items-center gap-6 mt-10 mb-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={page === 1 || showSkeleton}
              onClick={() => setPage((prev) => prev - 1)}
              className="p-3 rounded-full bg-cream_light text-red_dark disabled:opacity-30 border-2 border-red_base shadow-md"
            >
              <FaChevronLeft size={20} />
            </motion.button>

            <span className="text-2xl font-bold text-cream_light font-body bg-red_base px-4 py-1 rounded-md border border-red_light">
              {page}
            </span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={!data?.links?.next || showSkeleton}
              onClick={() => setPage((prev) => prev + 1)}
              className="p-3 rounded-full bg-cream_light text-red_dark disabled:opacity-30 border-2 border-red_base shadow-md"
            >
              <FaChevronRight size={20} />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
