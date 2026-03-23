import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useCharacters from "../hooks/useCharacters";
import CharacterCard from "../components/CharacterCard";
import Skeleton from "../components/ui/Skeleton";
import { motion } from "framer-motion";

const MainPage = () => {
  const [search, setSearch] = useState("");
  const [race, setRace] = useState("");
  const { data, isLoading } = useCharacters();

  const filteredCharacters = data?.items?.filter(
    (character) =>
      character.name.toLowerCase().includes(search.toLowerCase()) &&
      (race === "" || character.race === race),
  );

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
            style={{ textShadow: "0 0 2px #d48080, 0 0 2px #d48080" }}
          >
            Personajes{" "}
          </span>
          <span className="text-orange_base italic drop-shadow-[0_0_10px_#c47d0e]">
            Dragon Ball Z
          </span>
        </motion.h1>
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-red_base" />
            <input
              type="text"
              placeholder="Buscar personaje"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full font-body text-red_dark placeholder-red_dark bg-cream_light border-2 rounded-lg pl-10 p-2 focus:outline-none focus:border-light"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {[
            "Todas las razas",
            "Saiyan",
            "Namekian",
            "Human",
            "Frieza Race",
            "Android",
          ].map((r) => (
            <motion.button
              key={r}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRace(r === "Todas las razas" ? "" : r)}
              className={`font-body cursor-pointer px-3 py-1 rounded-lg border-2 transition-all duration-300
                ${
                  race === (r === "Todas las razas" ? "" : r)
                    ? "bg-red_base text-cream_light border-cream_light"
                    : "bg-cream_light text-red_dark border-red_base hover:border-red_soft"
                }`}
            >
              {r}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading
            ? Array(8)
                .fill(0)
                .map((_, index) => <Skeleton key={index} index={index} />)
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
