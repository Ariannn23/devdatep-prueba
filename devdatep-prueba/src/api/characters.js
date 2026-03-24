import dbApi from "./dragonballApi";

export const getCharacters = async (page = 1, name = "", race = "") => {
  const { data } = await dbApi.get("/characters", {
    params: { 
      page, 
      limit: 8,
      ...(name && { name }),
      ...(race && { race }),
    },
  });
  return data;
};

export const getAllCharacters = async () => {
  const { data } = await dbApi.get("/characters", {
    params: { limit: 58 }, 
  });
  return data;
};
export const getCharacterById = async (id) => {
  const { data } = await dbApi.get(`/characters/${id}`);
  return data;
};