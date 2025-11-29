import { SyncOutlined } from "@ant-design/icons";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center gap-2 bg-white">
      <SyncOutlined spin />
      <p className="text-[15px]">Loading...</p>
    </div>
  );
};

export default Spinner;
