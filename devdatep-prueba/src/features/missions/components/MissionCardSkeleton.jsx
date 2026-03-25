import Skeleton from "../../../components/ui/Skeleton";

const MissionCardSkeleton = ({ index }) => {
  return (
    <div className="bg-red_base border-2 border-red_light/20 p-6 rounded-3xl animate-pulse shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <Skeleton className="h-6 w-20" index={index} />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" index={index} />
          <Skeleton className="h-8 w-8 rounded-lg" index={index} />
        </div>
      </div>
      <Skeleton className="h-7 w-3/4 mb-4" index={index} />
      <Skeleton className="h-10 w-full mb-6" index={index} />
      <div className="flex gap-3 mt-auto">
        <Skeleton className="h-8 w-1/3 rounded-xl" index={index} />
        <Skeleton className="h-8 w-1/3 rounded-xl" index={index} />
      </div>
    </div>
  );
};

export default MissionCardSkeleton;
