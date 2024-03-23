"use client";

export const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50">
      <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-8 w-8" />
    </div>
  );
};
