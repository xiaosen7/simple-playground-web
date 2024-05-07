import { Loading } from "./loading";
import * as React from "react";
import { VscLoading } from "react-icons/vsc";

export default {
  component: Loading,
};

export const Base = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return (
    <div className="border-red-100 border border-solid w-52 h-52">
      <Loading loading={true} tip={"Loading..."} spin={<VscLoading />}>
        <button>按钮</button>
      </Loading>
    </div>
  );
};
