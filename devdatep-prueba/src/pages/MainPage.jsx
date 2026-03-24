import { useState, useEffect } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import CharacterCard from "../components/CharacterCard";
import Skeleton from "../components/ui/Skeleton";
import useCharacters, {
  useAllRaces,
  useAllCharacters,
} from "../hooks/useCharacters";
import useCharacterFilters from "../hooks/useCharacterFilters";

const MainPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [minLoadDone, setMinLoadDone] = useState(false);

  const { data: allRaces = [] } = useAllRaces();
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

  const showSkeleton = !debouncedSearch && (isLoading || isFetching || !minLoadDone);

  return (
    <div className="min-h-screen bg-red_dark">
      <div className="container mx-auto p-4 flex flex-col min-h-screen">
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
              onChange={(e) => setSearch(e.target.value)}
              className="w-full font-body text-red_dark bg-cream_light border-2 rounded-lg pl-10 p-2 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {allRaces.map((r) => (
            <motion.button
              key={r || "todas"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRaceChangeWithReset(r)}
              className={`font-body px-3 py-1 rounded-lg border-2 transition-all 
                ${
                  race === r
                    ? "bg-red_base text-cream_light border-cream_light"
                    : "bg-cream_light text-red_dark border-red_base"
                }`}
            >
              {r === "" ? "Todas las razas" : r}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start content-start flex-grow">
          {showSkeleton ? (
            Array(8)
              .fill(0)
              .map((_, i) => <Skeleton key={i} index={i} />)
          ) : characters.length === 0 ? (
            <div className="col-span-4 flex flex-col items-center justify-center py-20 gap-4">
              <FaTimesCircle className="text-red_base text-6xl drop-shadow-lg" />
              <p className="text-cream_light font-body text-xl text-center">
                No se encontraron personajes
              </p>
              <p className="text-cream_light/50 font-body text-sm text-center">
                Intenta con otro nombre o raza
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
