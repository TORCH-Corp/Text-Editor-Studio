import { JSX } from "react";
import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable";

type Props = {
  placeholder: string;
  className?: string;
  placeholderClassName?: string;
};

export function ContentEditable({
  placeholder,
  className,
  placeholderClassName,
}: Props): JSX.Element {
  return (
    <LexicalContentEditable
      className={
        className ??
        `ContentEditable__root relative block bg-background-system-body-primary text-content-system-global-primary overflow-auto min-h-full !px-12 py-4 focus:outline-none max-w-full overflow-x-hidden whitespace-pre-wrap break-words`
      }
      aria-placeholder={placeholder}
      placeholder={
        <div
          className={
            placeholderClassName ??
            `pointer-events-none absolute left-0 top-0 select-none overflow-hidden text-ellipsis px-8 py-[18px] text-content-system-global-secondary`
          }
        >
          {placeholder}
        </div>
      }
    />
  );
}
