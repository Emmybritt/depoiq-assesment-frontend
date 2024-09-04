import { Ref, forwardRef } from "react";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const TextInput = forwardRef(
  ({ className, ...props }: InputProps, ref?: Ref<any>) => {
    return (
      <input
        ref={ref}
        className={`p-1 w-100p ${className}`}
        width="100%"
        {...props}
      />
    );
  }
);
TextInput.displayName = "TextInput";
