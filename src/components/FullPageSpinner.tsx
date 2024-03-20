import { CircularProgress } from "@nextui-org/react";

const FullPageSpinner = () => {
  return (
    <div className="m-10 flex h-[calc(100vh-5rem)] items-center justify-center bg-[#2d3439]">
      <CircularProgress size="lg" aria-label="Loading..." />
    </div>
  );
};

export default FullPageSpinner;
