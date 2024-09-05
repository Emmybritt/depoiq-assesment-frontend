/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useDebouncedSearch from "@/app/_modules/infrastructure/hooks/useDebounceSearch";
import {
  CopyOutlined,
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input, Tag } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BreadCrumbs from "../BreadCrumbs/breadcumbs";

const Layer2 = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 1200);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("searchTerm", debouncedSearchTerm);
    if (debouncedSearchTerm) {
      params.set("isSearch", "true");
      params.delete("offset");
    } else {
      params.set("isSearch", "false");
      const currentOffset = searchParams.get("offset");
      params.set("offset", `${Number(currentOffset || 0) + 1}`);
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearchTerm]);

  return (
    <div>
      <BreadCrumbs name="Comparisons" />
      <div className="grid grid-cols-3 items-center justify-between px-[2rem] pb-[.5rem]">
        <div className="flex items-center col-span-3 md:col-span-2 space-x-[3rem]">
          <h3 className="font-extrabold text-[3rem]">
            Cross Deposition Analysis
          </h3>
          <div className="lg:flex hidden items-center space-x-6">
            <div className="flex items-center gap-2">
              Deponents:
              <Tag icon={<UserOutlined />} color="#bcd3c2">
                4
              </Tag>
            </div>
            <div className="flex items-center gap-2">
              Depositions:
              <Tag icon={<CopyOutlined />} color="#c4d3e8">
                0
              </Tag>
            </div>
          </div>
        </div>
        <div className="space-x-2 md:flex hidden items-center">
          <Button size="middle" icon={<PlusOutlined />}>
            Add Depo
          </Button>
          <Button size="middle" icon={<DownloadOutlined />} />
          <div className="w-[60%]">
            <Input
              placeholder="Search Topics"
              className="!w-full"
              onChange={(e) => setSearchTerm(e.target.value)}
              suffix={<SearchOutlined />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layer2;
