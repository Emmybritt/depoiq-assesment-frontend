"use client";
import PageContainer from "@/app/_commons/components/atoms/PageContainer/page-container";
import TableSkeleton from "@/app/_commons/components/molecules/SkeletonLoader/table-skeleton-loader";
import { Topic } from "@/app/_modules/domain/topic";
import { useTopic } from "@/app/_modules/infrastructure/hooks/useTopic";
import { OpenAIOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Input, Modal, Skeleton, Table } from "antd";
import React from "react";

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
  const {
    loading,
    isGeneratingReport,
    selectedRowKey,
    selectedColumn,
    handleGenerateDisposition,
    handleCancel,
    dataSource,
    handleOk,
    loader,
    isPaginating,
    isModalOpen,
    inputVal,
    setInputVal,
    createTopicLoading,
    setIsModalOpen,
  } = useTopic(isSearch, topics);

  const columns = [
    {
      title: (
        <div className="space-x-[2rem]">
          <PlusCircleOutlined
            onClick={() => setIsModalOpen(true)}
            aria-label="plus circle"
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

          {isPaginating ? (
            <TableSkeleton />
          ) : (
            <tr>
              <td>
                {hasNextPage && <div ref={loader} className="h-10 w-full" />}
              </td>
            </tr>
          )}
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
        scroll={{ y: 520, x: 700 }}
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
