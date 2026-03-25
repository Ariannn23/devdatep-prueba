import { useState, useEffect, useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimesCircle,
  FaFistRaised
} from "react-icons/fa";
import { motion } from "framer-motion";
import CharacterCard from "../features/characters/components/CharacterCard";
import CharacterCardSkeleton from "../components/ui/CharacterCardSkeleton";
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
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

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
    !debouncedSearch && isLoading && !data;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-red_dark"
    >
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
                isLoading={isLoading}
                isFirstMount={isFirstMount.current}
              />
            ))
          )}
        </div>

        {!race && (data?.links?.next || data?.links?.prev) && (
          <div className="flex justify-center items-center gap-8 mt-12 mb-8 bg-red_dark/30 p-4 rounded-[3rem] border-2 border-red_light/5 backdrop-blur-sm self-center">
            <motion.button
              whileHover={page > 1 ? { scale: 1.1, x: -5 } : {}}
              whileTap={page > 1 ? { scale: 0.9 } : {}}
              disabled={page === 1 || showSkeleton}
              onClick={() => setPage((prev) => prev - 1)}
              className="w-14 h-14 rounded-full bg-red_base text-cream_light disabled:opacity-20 border-2 border-red_light/20 shadow-[0_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all hover:border-orange_base/50"
            >
              <FaChevronLeft size={22} />
            </motion.button>

            <motion.div 
              layout
              className="relative group"
            >
              <div className="absolute inset-0 bg-orange_base blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full " />
              <div className="relative w-16 h-16 rounded-full bg-orange_base border-2 border-orange_light text-red_dark flex items-center justify-center font-title font-black text-2xl shadow-[0_0_30px_rgba(245,166,35,0.4)]">
                {page}
              </div>
            </motion.div>

            <motion.button
              whileHover={data?.links?.next ? { scale: 1.1, x: 5 } : {}}
              whileTap={data?.links?.next ? { scale: 0.9 } : {}}
              disabled={!data?.links?.next || showSkeleton}
              onClick={() => setPage((prev) => prev + 1)}
              className="w-14 h-14 rounded-full bg-red_base text-cream_light disabled:opacity-20 border-2 border-red_light/20 shadow-[0_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all hover:border-orange_base/50"
            >
              <FaChevronRight size={22} />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MainPage;
