import jsonPlaceholderApi from "../../../api/jsonplaceholderApi";

const STORAGE_KEY = "dbz_missions_cache";

const getLocalMissions = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
};

const saveLocalMissions = (missions) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
};

export const missionService = {
  getAll: async () => {
    const local = getLocalMissions();
    if (local) return local;

    const response = await jsonPlaceholderApi.get("/posts?_limit=6");
    const initialMissions = response.data.map((item) => ({
      id: item.id,
      title: item.title.substring(0, 20),
      description: item.body,
      assignedCharacter: "Goku", 
      country: "Japón",          
      difficulty: "Bajo",        
    }));
    
    saveLocalMissions(initialMissions);
    return initialMissions;
  },

  create: async (missionData) => {
    const newMission = { ...missionData, id: Date.now() };
    const missions = getLocalMissions() || [];
    saveLocalMissions([newMission, ...missions]);
    return newMission;
  },

  update: async (id, missionData) => {
    const missions = getLocalMissions() || [];
    const updated = missions.map(m => m.id === id ? { ...m, ...missionData } : m);
    saveLocalMissions(updated);
    return { ...missionData, id };
  },

  delete: async (id) => {
    const missions = getLocalMissions() || [];
    const filtered = missions.filter(m => m.id !== id);
    saveLocalMissions(filtered);
    return id;
  },
};
