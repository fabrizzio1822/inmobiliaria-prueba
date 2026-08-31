import React from 'react';

export default function LoadingPropiedades() {
  return (
    <div className="container mx-auto">
      <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mx-auto mt-8 mb-6"></div>
      
      {/* Search / Filters Skeleton */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="h-20 w-full bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-6 mb-10 py-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[460px] animate-pulse">
            {/* Image skeleton */}
            <div className="h-64 bg-gray-200 w-full"></div>
            
            {/* Body */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-6"></div>
              
              <div className="flex items-center gap-3 mt-auto mb-5">
                 <div className="h-5 w-16 bg-gray-200 rounded"></div>
                 <div className="h-5 w-16 bg-gray-200 rounded"></div>
                 <div className="h-5 w-16 bg-gray-200 rounded"></div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                <div className="h-10 w-28 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
