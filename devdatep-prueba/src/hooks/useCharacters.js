import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "../api/characters";

const useCharacters = (page = 1) => {
  return useQuery({
    queryKey: ["characters", page],
    queryFn: () => getCharacters(page),
    keepPreviousData: true,
  });
};

export default useCharacters;