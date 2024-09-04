import React, { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return <div className="px-[2rem]">{children}</div>;
};

export default PageContainer;
