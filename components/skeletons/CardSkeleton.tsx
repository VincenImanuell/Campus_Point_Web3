export const CardSkeleton = () => {
  return (
    <div className="w-72 bg-slate-800 rounded-xl border border-slate-700 p-4 animate-pulse flex-shrink-0">
      {/* Header Image Skeleton */}
      <div className="h-32 bg-slate-700/50 rounded-lg mb-4 w-full"></div>
      
      {/* Title Lines */}
      <div className="space-y-2">
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
        <div className="h-3 bg-slate-700 rounded w-1/2"></div>
      </div>
      
      {/* Footer Button Skeleton */}
      <div className="mt-4 pt-3 border-t border-slate-700/50">
        <div className="h-8 bg-slate-700 rounded-lg w-full"></div>
      </div>
    </div>
  );
};