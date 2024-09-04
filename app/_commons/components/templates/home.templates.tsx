import { ReactNode } from "react";
import Header from "../organisms/header";

interface HomeTemplateProps {
  children: ReactNode;
}

const HomeTemplate = ({ children }: HomeTemplateProps) => {
  return (
    <div className="h-full">
      <div className="flex flex-col md:col-span-6 h-full bg-gray-100 overflow-scroll">
        <Header />
        <div className="flex-1 mt-auto">{children}</div>
      </div>
    </div>
  );
};

export default HomeTemplate;
