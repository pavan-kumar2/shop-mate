import React, { memo } from "react";

const SpinLoader = () => {
  return (
    <div className="w-16 h-16 border-[7px] border-neutral-900 border-t-transparent rounded-full animate-spin m-auto"></div>
  );
};

export default memo(SpinLoader);
