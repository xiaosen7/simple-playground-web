import * as React from "react";
import classNames from "classnames";
import { VscLoading } from "react-icons/vsc";

interface ILoadingProps {
  loading: boolean;
  children: React.ReactNode | (() => React.ReactNode);
  className?: string;
  style?: React.CSSProperties;
  tip?: React.ReactNode;
  spin?: React.ReactNode;
}
export function Loading(props: ILoadingProps) {
  const {
    loading,
    className,
    style,
    children,
    tip,
    spin = <VscLoading />,
  } = props;
  return (
    <div
      aria-label="loading"
      className={classNames(className, "relative")}
      style={style}
    >
      {typeof children === "function" ? !loading && children() : children}
      {loading && (
        <div
          aria-label="spin"
          className="absolute left-0 right-0 top-0 bottom-0 flex bg-slate-100/50 text-gray-500"
          style={{ backdropFilter: "blur(1px)" }}
        >
          <div className="m-auto flex justify-center items-center gap-2">
            <div className="animate-spin flex justify-center items-center">
              {spin}
            </div>
            {tip}
          </div>
        </div>
      )}
    </div>
  );
}
