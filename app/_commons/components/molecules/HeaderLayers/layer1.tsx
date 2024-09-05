"use client";
import { AlignRightOutlined, OpenAIOutlined } from "@ant-design/icons";
import { useUser } from "@clerk/nextjs";
import { Button, Image, Switch } from "antd";
import { UserProfile } from "../../atoms/UserProfile/user-profile-dropdown";

const Layer1 = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between pb-4 px-[2rem] py-[2.5rem]">
      <div className="flex items-center space-x-6">
        <Image
          src="/icons/depoiqlogo.png"
          alt={"logo"}
          width={150}
          height={50}
          loading="lazy"
          preview={false}
        />
        <div className="flex items-center space-x-2">
          <h3>Cases</h3>
          <h3>Deponents</h3>
        </div>
      </div>

      <div className="space-x-[2rem] md:flex hidden items-center">
        <Button
          size="large"
          className="bg-gradient-to-r !bg-[#5c05bf] !hover:bg-blue-600 !text-white"
        >
          <OpenAIOutlined className="text-4xl" />
          Ask Ai
        </Button>
        <Image
          src="/icons/gear.png"
          alt={"gear icon"}
          height={20}
          width={20}
          preview={false}
        />
        <UserProfile user={user} />

        <Switch defaultChecked className="!bg-[#ebd8aa]" />
      </div>
      <div className="md:hidden">
        <AlignRightOutlined className="text-5xl" />
      </div>
    </div>
  );
};

export default Layer1;
