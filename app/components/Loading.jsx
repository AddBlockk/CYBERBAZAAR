import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => {
  return (
    <div className="grid items-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[25px]">
      {Array(5)
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className="rounded bg-[#031632] max-w-[500px] h-full overflow-hidden"
          >
            <Skeleton height={300} />
            <div className="p-2 flex-grow">
              <Skeleton height={30} />
              <Skeleton height={20} count={3} />
            </div>
            <div className="flex justify-between my-[20px] p-2 mt-auto flex-wrap">
              <Skeleton width={200} height={32} />
              <Skeleton width={200} height={32} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default LoadingSkeleton;
