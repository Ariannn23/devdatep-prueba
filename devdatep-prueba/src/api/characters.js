import dbApi from "./dragonballApi";

export const getCharacters = async () => {
  const { data } = await dbApi.get("/characters", {
    params: { limit: 30 },
  });
  return data;
};
