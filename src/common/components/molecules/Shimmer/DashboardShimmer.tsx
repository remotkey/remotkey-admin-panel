export const DashboardShimmer = () => {
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Statistics Cards Shimmer */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className="bg-white border border-C_DEDEDE rounded-lg p-3 shadow-sm h-full">
                <div className="flex flex-col h-full">
                  {/* Header with title and icon shimmer */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-3 bg-gray-300 rounded w-20 animate-pulse"></div>
                    <div className="h-7 w-7 bg-gray-300 rounded-full animate-pulse"></div>
                  </div>
                  {/* Main stat value shimmer */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="h-6 bg-gray-300 rounded w-16 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-300 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Recent Activity Shimmer */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Recent Properties Shimmer */}
          <div className="bg-white border border-C_DEDEDE rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
            </div>
            <div className="space-y-3">
              {Array(3)
                .fill("")
                .map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-300 rounded w-24 animate-pulse"></div>
                      <div className="h-3 bg-gray-300 rounded w-32 animate-pulse"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 w-12 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-6 w-12 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Vendors Shimmer */}
          <div className="bg-white border border-C_DEDEDE rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="h-4 bg-gray-300 rounded w-28 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
            </div>
            <div className="space-y-3">
              {Array(3)
                .fill("")
                .map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-300 rounded w-20 animate-pulse"></div>
                      <div className="h-3 bg-gray-300 rounded w-28 animate-pulse"></div>
                    </div>
                    <div className="h-6 w-12 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
