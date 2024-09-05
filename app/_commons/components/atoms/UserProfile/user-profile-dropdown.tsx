import { DownOutlined } from "@ant-design/icons";
import { SignOutButton } from "@clerk/nextjs";
import { Dropdown, Image, MenuProps } from "antd";
import React from "react";

interface UserProfileProps {
  user: any;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <SignOutButton
          redirectUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`}
        />
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <div className="flex items-center cursor-pointer space-x-2">
        <div className="flex items-center space-x-2">
          <Image
            src="/icons/portrait.png"
            alt="user"
            preview={false}
            height={30}
            width={30}
          />
          <p>{user?.username ?? user?.emailAddresses[0].emailAddress}</p>
        </div>
        <DownOutlined className="text-sm" />
      </div>
    </Dropdown>
  );
};
