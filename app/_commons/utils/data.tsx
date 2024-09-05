import {
  BookFilled,
  ContainerFilled,
  HddFilled,
  MessageFilled,
  ProductFilled,
  QuestionCircleFilled,
  TagFilled,
} from "@ant-design/icons";

export const layer3Tabs = [
  { name: "PageLine", icon: <ProductFilled className="text-gray-400" /> },
  { name: "Topical", icon: <BookFilled className="text-gray-400" /> },
  { name: "Exhibits", icon: <TagFilled className="text-gray-400" />, count: 7 },
  {
    name: "Admissions",
    icon: <MessageFilled className="text-gray-400" />,
    count: 7,
  },
  {
    name: "Objections",
    icon: <QuestionCircleFilled className="text-gray-400" />,
    count: 90,
  },
  {
    name: "Contradictions",
    icon: <ContainerFilled className="text-gray-400" />,
    count: 30,
  },
  {
    name: "Discrepancies",
    icon: <HddFilled />,
    count: 4,
  },
];
