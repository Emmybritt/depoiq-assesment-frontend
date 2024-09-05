import { Image } from "antd";
import Link from "next/link";
import React from "react";

interface BreadCrumbsProps {
  name: string;
}

const BreadCrumbs = ({ name }: BreadCrumbsProps) => {
  return (
    <div className="flex items-center px-[2rem] space-x-2 mt-3">
      <Link href="/" className="text-gray-500 cursor-default">
        Cases
      </Link>
      <p className="font-semibold">/</p>
      <Link className="text-gray-500 cursor-default" href="">
        Marvin
      </Link>
      <p className="font-semibold">/</p>
      <Link className="text-gray-500 cursor-default" href="">
        {name}
      </Link>
    </div>
  );
};

export default BreadCrumbs;
