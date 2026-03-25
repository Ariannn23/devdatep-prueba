import { useQuery } from "@tanstack/react-query";
import { getCharacters, getAllCharacters } from "../../../api/characters";

const useCharacters = (page = 1, name = "") => {
  return useQuery({
    queryKey: ["characters", page, name],
    queryFn: () => getCharacters(page, name),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5, // 5 min cache persistence
  });
};

export const useAllRaces = () => {
  return useQuery({
    queryKey: ["characters-all-races"],
    queryFn: getAllCharacters,
    staleTime: Infinity,
    select: (data) => {
      const items = data?.items || data || [];
      return ["", ...new Set(items.map((c) => c.race).filter(Boolean))];
    },
  });
};

export const useAllCharacters = () => {
  return useQuery({
    queryKey: ["characters-all"],
    queryFn: getAllCharacters,
    staleTime: Infinity,
  });
};

export default useCharacters;
