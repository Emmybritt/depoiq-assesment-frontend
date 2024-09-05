"use client";
import { layer3Tabs } from "@/app/_commons/utils/data";
import React, { useState } from "react";

const Layer3 = () => {
  const [currTab, setCurrTab] = useState(layer3Tabs[0].name);
  return (
    <div className="overflow-x-auto">
      <div className="px-[2rem] flex items-center gap-[2.5rem] py-[.5rem]">
        {layer3Tabs.map((layer, _index: number) => (
          <div
            key={_index}
            onClick={() => setCurrTab(layer.name)}
            className="flex items-center space-x-2 py-[1rem] rounded-md px-[1rem] cursor-pointer"
            style={{ background: currTab === layer.name ? "#e0c8e9" : "" }}
          >
            <span className={`${currTab === layer.name && "text-[#6c1892]"}`}>
              {layer.icon}
            </span>

            <p
              className={`${
                currTab === layer.name ? "text-[#6c1892]" : "text-gray-500"
              }`}
            >
              {layer.name}
            </p>
            {layer?.count && (
              <span className="text-[14px] font-medium text-gray-400 bg-gray-100 rounded-md px-2">
                {layer.count}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layer3;
