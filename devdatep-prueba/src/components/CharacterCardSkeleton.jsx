import Skeleton from "./ui/Skeleton";

const CharacterCardSkeleton = ({ index }) => {
  return (
    <div className="bg-red_base rounded-lg shadow-lg p-4 border-2 border-red_light flex flex-col h-full">
      <Skeleton className="w-full h-48" index={index} />
      <div className="flex items-center gap-2 mt-2">
        <Skeleton className="h-7 w-3/4" index={index} />
      </div>
      <div className="flex justify-between items-center mt-auto pt-4">
        <Skeleton className="h-5 w-1/4" index={index} />
        <Skeleton className="h-5 w-1/4" index={index} />
      </div>
    </div>
  );
};

export default CharacterCardSkeleton;
