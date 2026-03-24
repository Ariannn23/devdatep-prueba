import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowLeft, FaDragon, FaBolt, FaDna, FaVenusMars } from "react-icons/fa";
import Skeleton from "../components/ui/Skeleton";
import CommentSection from "../components/CommentSection";

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: character, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: async () => {
      const response = await axios.get(`https://dragonball-api.com/api/characters/${id}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-red_dark p-6 flex justify-center items-center">
        <div className="container max-w-4xl bg-red_base rounded-2xl p-8 border-2 border-red_light shadow-2xl flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red_dark p-4 md:p-8">
      <div className="container max-w-5xl mx-auto">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-cream_light mb-8 hover:text-orange_base transition-colors font-body text-lg"
        >
          <FaArrowLeft /> Volver al listado
        </motion.button>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-red_base rounded-3xl overflow-hidden border-2 border-red_light shadow-2xl flex flex-col md:flex-row"
        >
          <div className="w-full md:w-1/2 bg-gradient-to-br from-red_light/20 to-transparent p-12 flex justify-center items-center">
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={character.image}
              alt={character.name}
              className="max-h-[500px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="mb-6">
              <h1 className="text-5xl md:text-6xl font-title font-bold text-cream_light mb-2 drop-shadow-md">
                {character.name}
              </h1>
              <div className="flex items-center gap-3 text-cream_dark font-body text-xl italic bg-red_dark/30 self-start px-4 py-1 rounded-full border border-orange_base/20">
                <FaDragon /> {character.race}
              </div>
            </div>

            <div className="bg-red_dark/20 rounded-lg border border-red_light/10 mb-8 p-1">
              <div className="max-h-[300px] overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-orange_base scrollbar-track-transparent">
                <p className="text-cream_base font-body text-lg leading-relaxed">
                  {character.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-auto">
              <div className="bg-red_dark/40 p-4 rounded-xl border border-red_light/20 flex flex-col items-center">
                <FaBolt className="text-orange_base text-2xl mb-2" />
                <span className="text-cream_light/50 text-xs font-body uppercase tracking-widest">Ki Máximo</span>
                <span className="text-cream_light font-bold text-xl">{character.ki}</span>
              </div>
              
              <div className="bg-red_dark/40 p-4 rounded-xl border border-red_light/20 flex flex-col items-center">
                <FaVenusMars className="text-red_base_light text-2xl mb-2" />
                <span className="text-cream_light/50 text-xs font-body uppercase tracking-widest">Género</span>
                <span className="text-cream_light font-bold text-xl">{character.gender}</span>
              </div>
            </div>

            {character.originPlanet && (
               <div className="mt-6 flex items-center gap-3 bg-cream_light/5 p-4 rounded-xl border border-cream_light/10">
                  <img src={character.originPlanet.image} alt={character.originPlanet.name} className="w-12 h-12 rounded-full object-cover border border-orange_base" />
                  <div>
                    <p className="text-cream_light/50 text-xs font-body uppercase">Planeta de Origen</p>
                    <p className="text-cream_light font-bold">{character.originPlanet.name}</p>
                  </div>
               </div>
            )}
          </div>
        </motion.div>
        <CommentSection characterId={id} />
      </div>
    </div>
  );
};

export default CharacterDetail;
