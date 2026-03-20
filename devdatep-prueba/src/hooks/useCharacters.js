import { useQuery } from "@tanstack/react-query";
import dbApi from "../api/dragonballApi";

const useCharacters = () => {
    return useQuery({
        queryKey: ['characters'],
        queryFn: async () => {
            const { data } = await dbApi.get('/characters');
            return data;
        },
    })
}

export default useCharacters;