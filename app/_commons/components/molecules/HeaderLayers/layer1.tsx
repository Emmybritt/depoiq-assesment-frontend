import { Image, Switch } from "antd";
import React from "react";

const Layer1 = () => {
  return (
    <div className="flex items-center justify-between pb-4 px-[2rem] py-[2.5rem]">
      <div className="flex items-center space-x-6">
        <Image
          src="/icons/depoiqlogo.png"
          alt={"logo"}
          width={150}
          height={60}
          loading="lazy"
          preview={false}
        />
        <div className="flex items-center space-x-2">
          <h3>Cases</h3>
          <h3>Deponents</h3>
        </div>
      </div>

      <div className="space-x-[2rem] flex items-center">
        <button className="bg-btn-gradient px-[3rem] py-[1rem] rounded-md text-white">
          Ask Ai
        </button>
        <Image
          src="/icons/gear.png"
          alt={"gear icon"}
          height={20}
          width={20}
          preview={false}
        />
        <Switch defaultChecked />
      </div>
    </div>
  );
};

export default Layer1;
