import { Skeleton } from "antd";

const TableSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <tr>
      {Array.from({ length: 5 }).map((_, colIndex) => (
        <td key={colIndex}>
          <Skeleton active paragraph={{ rows: 1 }} />
        </td>
      ))}
    </tr>
  );
};

export default TableSkeleton;
