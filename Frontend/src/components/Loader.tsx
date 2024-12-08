const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;

export const Skeleton = () => {
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8">
          <div
            role="status"
            className="max-w-2xl p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
          >
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>

            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export const Skeleton1 = () => {
  return (
    <div role="status" className="space-y-2.5 animate-pulse">
      <div className="flex flex-col items-center w-full space-y-3">
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700  w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600  w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600  w-full"></div>
        <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700  w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600  w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600  w-full"></div>
        <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700  w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600  w-full"></div>
        <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const JobCardSkeleton = () => {
  return (
    <div className="group relative bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-1/2 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-1/4 h-6 bg-gray-200 rounded-md"></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="w-24 h-5 bg-gray-200 rounded-full"></div>
        <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
        <div className="w-28 h-5 bg-gray-200 rounded-full"></div>
      </div>

      <div className="space-y-3">
        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        <div className="w-full h-4 bg-gray-200 rounded"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="w-32 h-8 bg-gray-200 rounded-md"></div>
        <div className="w-24 h-8 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};
