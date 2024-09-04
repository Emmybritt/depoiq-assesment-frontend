import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BreadCrumbsProps {
  name: string;
}

const BreadCrumbs = ({ name }: BreadCrumbsProps) => {
  return (
    <div className="flex items-center mb-[.5rem]">
      <Link href="/">Cases</Link>
      <Image
        className="mx-[1rem]"
        src="/icons/slash.png"
        width={9}
        height={15}
        alt=""
      />
      <Link className="text-gray-500 cursor-default" href="">
        {name}
      </Link>
    </div>
  );
};

export default BreadCrumbs;
