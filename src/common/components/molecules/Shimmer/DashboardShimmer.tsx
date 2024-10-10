export const DashboardShimmer = () => {
  return (
    <div className="flex animate-pulse flex-col gap-[0.94rem]">
      <div className="h-16 w-full bg-gray-200"></div>
      {Array(2)
        ?.fill("")
        ?.map((el, index) => (
          <div
            key={index}
            className="h-32 w-full rounded-r_08125 bg-gray-200"></div>
        ))}
    </div>
  );
};
