import dbApi from "./dragonballApi";

export const getCharacters = async (page = 1) => {
  const { data } = await dbApi.get("/characters", {
    params: { 
      page,
      limit: 12
    },
  });
  return data;
};

export const getCharacterById = async (id) => {
  const { data } = await dbApi.get(`/characters/${id}`);
  return data;
};