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
    return getLocalMissions() || [];
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
