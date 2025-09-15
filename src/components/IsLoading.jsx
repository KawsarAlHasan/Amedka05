import { Skeleton } from "antd";

function IsLoading({rows = 4}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton active paragraph={{ rows }} />
    </div>
  );
}

export default IsLoading;
