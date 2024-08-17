import React from "react";

type SetInnerHtmlType = {
  value: string | any;
  className?: any;
  style?: React.CSSProperties;
};

const _Html_Set = ({ value, className, style }: SetInnerHtmlType) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: value }}
      className={className}
      style={style}
    />
  );
};

export default _Html_Set;
