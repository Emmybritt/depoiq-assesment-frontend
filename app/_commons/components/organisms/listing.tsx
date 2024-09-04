/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import PageContainer from "@/app/_commons/components/atoms/PageContainer/page-container";
import TableSkeleton from "@/app/_commons/components/molecules/SkeletonLoader/table-skeleton-loader";
import { Topic } from "@/app/_modules/domain/topic";
import {
  CREATE_TOPIC,
  FIND_MANY_TOPICS,
  UPDATE_TOPIC,
} from "@/app/_modules/infrastructure/apollo/queries/topic.query";
import { useIntersectionObserver } from "@/app/_modules/infrastructure/hooks/useIntersectionObserver";
import { OpenAIOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Input, Modal, Skeleton, Table } from "antd";
import Groq from "groq-sdk";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

interface ListingsProps {
  topics: Topic[];
  hasNextPage: boolean;
  isSearch: boolean;
}

const Listings: React.FC<ListingsProps> = ({
  topics,
  hasNextPage = false,
  isSearch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [inputVal, setInputVal] = useState<string>("");
  const [isPaginating, setIsPaginating] = useState<boolean>(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [selectedRowKey, setSelectedRowKey] = useState<string>("");
  const [isLastItem, setLastItem] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePagination = () => {
    setIsPaginating(true);
    const currentOffset = searchParams.get("offset");
    const params = new URLSearchParams(searchParams);
    params.set("offset", `${Number(currentOffset || 0) + 20}`);
    params.set("isSearch", "false");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const loader = useRef<HTMLDivElement>(null);
  useIntersectionObserver({ containerRef: loader, onView: handlePagination }, [
    dataSource,
  ]);

  const [createTopic, { loading: createTopicLoading, error, data }] =
    useMutation(CREATE_TOPIC, {
      update(cache, { data: { createTopic } }) {
        const existingTopics: any = cache.readQuery({
          query: FIND_MANY_TOPICS,
          variables: {
            limit: 18,
            offset: null,
            // search: "",
          },
        });

        console.log(existingTopics, "this is the existing");

        cache.writeQuery({
          query: FIND_MANY_TOPICS,
          data: {
            topics: [createTopic, ...existingTopics.topics],
          },
        });
      },
      onError(error) {
        toast.error("Failed to create topic");
      },
      onCompleted() {
        toast("Topic created successfully");
      },
    });

  const [updateTopic] = useMutation(UPDATE_TOPIC, {
    refetchQueries: [
      {
        query: FIND_MANY_TOPICS,
      },
    ],
    onError(error) {
      toast.error("Failed to update the topic");
    },
    onCompleted() {
      toast("Topic updated successfully");
    },
  });

  const handleOk = () => {
    if (!inputVal) {
      return toast.error("Please enter a topic");
    }
    createTopic({
      variables: {
        input: {
          name: inputVal,
        },
      },
    });

    const newDataSource = [{ name: inputVal }, ...dataSource];
    setDataSource(newDataSource);
    setInputVal("");
    setIsModalOpen(false);
    if (!error) {
      toast("Topic created successfully");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleGenerateDisposition = async (property: string, record: Topic) => {
    setIsGeneratingReport(true);
    setSelectedColumn(property);
    setSelectedRowKey(record._id ?? "");
    const report = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `help me generate a random text not longer than 15 words`,
        },
      ],
      model: "llama3-8b-8192",
    });
    updateTopic({
      variables: {
        updateTopicId: record._id,
        input: { [property]: report.choices[0].message.content },
      },
    });
    setIsGeneratingReport(false);
  };

  useEffect(() => {
    if (isSearch) {
      setDataSource(topics);
    } else {
      setDataSource((prev) => [...(prev ?? []), ...topics]);
    }

    setLastItem(topics.length <= 0);

    setIsPaginating(false);
    setLoading(false);
  }, [topics]);

  const columns = [
    {
      title: (
        <div className="space-x-[2rem]">
          <PlusCircleOutlined
            onClick={() => setIsModalOpen(true)}
            style={{ cursor: "pointer" }}
          />
          <span>Topic</span>
        </div>
      ),
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Kathryn Murphy",
      dataIndex: "result1",
      key: "result1",
    },
    {
      title: "Courtney Henry",
      dataIndex: "result2",
      key: "result2",
    },
    {
      title: "Devon Lane",
      dataIndex: "result3",
      key: "result3",
    },
    {
      title: "Ariene McCoy",
      dataIndex: "result4",
      key: "result4",
    },
  ];
  const CustomRow = ({ props }: { props: any }) => {
    if (loading) return <TableSkeleton />;

    if (props.className === "ant-table-placeholder") {
      return (
        <tr {...props}>
          <td colSpan={columns.length} style={{ textAlign: "center" }}>
            No data available
          </td>
        </tr>
      );
    }

    const rowKey = props?.children[0]?.props?.record._id;

    return (
      <tr {...props}>
        {columns.map((column, _index) => (
          <td key={_index} className="ant-table-cell">
            {props?.children[_index]?.props?.record[column.dataIndex] ?? (
              <>
                {isGeneratingReport &&
                rowKey === selectedRowKey &&
                column.dataIndex === selectedColumn ? (
                  <Skeleton active paragraph={{ rows: 1 }} />
                ) : (
                  <OpenAIOutlined
                    className="cursor-pointer text-3xl"
                    onClick={() =>
                      handleGenerateDisposition(
                        column.dataIndex,
                        props?.children[_index]?.props?.record
                      )
                    }
                  />
                )}
              </>
            )}
          </td>
        ))}
      </tr>
    );
  };

  const CustomWrapper = (props: any) => {
    return (
      <>
        <tbody {...props}>
          {props.children}

          {hasNextPage === true &&
            (isPaginating ? (
              <TableSkeleton />
            ) : (
              <tr>
                <td>
                  {!isLastItem && <div ref={loader} className="h-10 w-full" />}
                </td>
              </tr>
            ))}
        </tbody>
      </>
    );
  };

  return (
    <PageContainer>
      <Table
        dataSource={[...dataSource]}
        columns={columns}
        pagination={false}
        scroll={{ y: 520 }}
        key="data"
        components={{
          body: {
            wrapper: CustomWrapper,
            row: (props: any) => <CustomRow props={props} />,
          },
        }}
      />
      <Modal
        title="New Topic"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={createTopicLoading ? "Creating..." : "Done"}
      >
        <label htmlFor="topic">Topic</label>
        <Input
          id="topic"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Enter topic"
        />
      </Modal>
    </PageContainer>
  );
};

export default Listings;
