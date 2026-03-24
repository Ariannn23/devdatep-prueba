import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "../api/characters";

const useCharacters = () => {
  return useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
  });
};

export default useCharacters;