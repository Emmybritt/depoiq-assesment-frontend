import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useMutation } from "@apollo/client";
import { CREATE_TOPIC, UPDATE_TOPIC } from "../apollo/queries/topic.query";
import { toast } from "react-toastify";
import Groq from "groq-sdk";
import { Topic } from "../../domain/topic";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export const useTopic = (isSearch: boolean, topics: Array<Topic>) => {
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

  const [createTopic, { loading: createTopicLoading, error }] = useMutation(
    CREATE_TOPIC,
    {
      update(cache, { data: { addTopic } }) {
        const newDataSource = [addTopic, ...dataSource];
        setDataSource(newDataSource);
      },
    }
  );

  const [updateTopic] = useMutation(UPDATE_TOPIC, {
    update(cache, { data: { updateTopic } }) {
      setDataSource((prevItems) =>
        prevItems.map((item) =>
          item._id === updateTopic._id ? { ...item, ...updateTopic } : item
        )
      );
      setIsGeneratingReport(false);
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

  return {
    isModalOpen,
    loading,
    dataSource,
    inputVal,
    isPaginating,
    isGeneratingReport,
    selectedColumn,
    selectedRowKey,
    isLastItem,
    handleGenerateDisposition,
    handleCancel,
    updateTopic,
    handleOk,
    loader,
    setInputVal,
    createTopicLoading,
    setIsModalOpen,
  };
};
