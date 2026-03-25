import countriesApi from "../../../api/countriesApi";

export const countryService = {
  getAll: async () => {
    const response = await countriesApi.get("/all?fields=name,flags");
    return response.data;
  },
};
