/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useDebouncedSearch from "@/app/_modules/infrastructure/hooks/useDebounceSearch";
import {
  CopyOutlined,
  DownloadOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Tag } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BreadCrumbs from "../BreadCrumbs/breadcumbs";
import { SearchInput } from "../search-input";

const Layer2 = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 1200);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      params.set("searchTerm", debouncedSearchTerm);
      params.set("isSearch", "true");
      params.delete("offset");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearchTerm]);

  return (
    <div className="flex items-center justify-between px-[2rem] py-[1rem]">
      <div>
        <BreadCrumbs name="Comparisons" />
        <div className="flex items-center space-x-[3rem]">
          <h3 className="font-extrabold text-[3rem]">
            Cross Deposition Analysis
          </h3>
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-2">
              Deponents:
              <Tag icon={<UserOutlined />} color="#c0cfc5">
                4
              </Tag>
            </div>
            <div className="flex items-center gap-2">
              Depositions:
              <Tag icon={<CopyOutlined />} color="#c5d2e5">
                0
              </Tag>
            </div>
          </div>
        </div>
      </div>
      <div className="space-x-2 flex items-center">
        <Button type="primary" icon={<PlusOutlined />}>
          Add Depo
        </Button>
        <Button type="primary" icon={<DownloadOutlined />} />
        <SearchInput
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Layer2;
