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
  { name: "PageLine", icon: <ProductFilled /> },
  { name: "Topical", icon: <BookFilled /> },
  { name: "Exhibits", icon: <TagFilled />, count: 7 },
  { name: "Admissions", icon: <MessageFilled />, count: 7 },
  { name: "Objections", icon: <QuestionCircleFilled />, count: 90 },
  { name: "Contradictions", icon: <ContainerFilled />, count: 30 },
  { name: "Discrepancies", icon: <HddFilled />, count: 4 },
];
