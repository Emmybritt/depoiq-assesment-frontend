import Image from "next/image";
import { InputProps, TextInput } from "../atoms/TextInput/text-input";

interface SearchInputProps extends InputProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const SearchInput = ({ ...props }: SearchInputProps) => {
  return (
    <div className="search flex items-center bg-white border border-gray-300 overflow-hidden w-100p rounded-small pr-0.9 ">
      <div className="px-0.8"></div>
      <TextInput className="bottom-0" {...props} />
      <Image src="/icons/search.png" alt="search" height="24" width="24" />
    </div>
  );
};
