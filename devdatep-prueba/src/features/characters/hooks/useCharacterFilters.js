import { useState } from "react";

const useCharacterFilters = ({ paginatedItems, allItems, debouncedSearch }) => {
  const [race, setRace] = useState("");

  const handleRaceChange = (selectedRace) => setRace(selectedRace);

  const characters = race || debouncedSearch
    ? (allItems || []).filter(
        (c) =>
          (race === "" || c.race === race) &&
          c.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      )
    : paginatedItems || [];

  return {
    race,
    handleRaceChange,
    characters,
  };
};

export default useCharacterFilters;
