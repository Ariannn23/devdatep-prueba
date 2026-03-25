import { forwardRef } from "react";
import Skeleton from "./Skeleton";

const CharacterCardSkeleton = forwardRef(({ index }, ref) => {
  return (
    <div ref={ref} className="bg-red_base rounded-[2.5rem] shadow-xl p-6 border-2 border-red_light/20 flex flex-col h-full">
      <Skeleton className="w-full h-56 rounded-2xl" index={index} />
      <div className="mt-6 space-y-4">
        <Skeleton className="h-8 w-3/4 rounded-xl" index={index} />
        <div className="flex justify-between items-center pt-2 border-t border-red_light/10">
          <Skeleton className="h-6 w-1/4 rounded-full" index={index} />
          <Skeleton className="h-6 w-1/4 rounded-full" index={index} />
        </div>
      </div>
    </div>
  );
});

export default CharacterCardSkeleton;
