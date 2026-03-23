import { useQuery } from "@tanstack/react-query";
import dbApi from "../api/dragonballApi";

const useCharacters = () => {
  return useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      const { data } = await dbApi.get("/characters", {
        params: { limit: 20 },
      });
      return data;
    },
  });
};

export default useCharacters;