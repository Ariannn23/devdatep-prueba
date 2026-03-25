export const getDifficultyStyles = (lvl) => {
  switch (lvl) {
    case "Bajo":
      return {
        badge: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/40 shadow-[0_0_10px_rgba(74,222,128,0.2)]",
        border: "border-t-[#4ade80]",
        glow: "from-[#4ade80]/10",
        icon: "text-[#4ade80]",
      };
    case "Medio":
      return {
        badge: "text-[#facc15] bg-[#facc15]/10 border-[#facc15]/40 shadow-[0_0_10px_rgba(250,204,21,0.2)]",
        border: "border-t-[#facc15]",
        glow: "from-[#facc15]/10",
        icon: "text-[#facc15]",
      };
    case "Alto":
      return {
        badge: "text-[#2563eb] bg-[#2563eb]/10 border-[#2563eb]/40 shadow-[0_0_15px_rgba(37,99,235,0.3)]",
        border: "border-t-[#2563eb]",
        glow: "from-[#2563eb]/15",
        icon: "text-[#2563eb]",
      };
    case "Extremo":
      return {
        badge: "text-[#a855f7] bg-[#a855f7]/20 border-[#a855f7] animate-pulse shadow-[0_0_20px_rgba(168,85,247,0.5)]",
        border: "border-t-[#a855f7]",
        glow: "from-[#a855f7]/20 via-[#a855f7]/5",
        icon: "text-[#a855f7]",
      };
    default:
      return {
        badge: "text-cream_light bg-white/5 border-white/10",
        border: "border-t-red_light/20",
        glow: "from-white/5",
        icon: "text-orange_base",
      };
  }
};
