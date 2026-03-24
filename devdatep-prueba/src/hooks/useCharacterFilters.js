import { useState, useMemo } from "react";

const useCharacterFilters = (characters = []) => {
  const [search, setSearch] = useState("");
  const [race, setRace] = useState("");

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const matchesSearch = character.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRace = race === "" || character.race === race;
      return matchesSearch && matchesRace;
    });
  }, [characters, search, race]);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleRaceChange = (selectedRace) => setRace(selectedRace);

  return {
    search,
    race,
    handleSearch,
    handleRaceChange,
    filteredCharacters,
  };
};

export default useCharacterFilters;