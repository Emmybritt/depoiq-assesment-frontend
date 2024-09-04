import { Switch } from "antd";
import Image from "next/image";
import Layer1 from "../molecules/HeaderLayers/layer1";
import Layer2 from "../molecules/HeaderLayers/layer2";
import Layer3 from "../molecules/HeaderLayers/layer3";

const Header = () => {
  return (
    <div className="header divide-y bg-white">
      <Layer1 />
      <Layer2 />
      <Layer3 />
    </div>
  );
};

export default Header;
