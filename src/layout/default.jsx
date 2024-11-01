import { Outlet } from "react-router-dom";

const LayoutDefault = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-screen-2xl mx-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutDefault;
