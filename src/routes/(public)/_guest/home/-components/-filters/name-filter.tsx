import type { ComponentProps } from "react";
import { SearchInput } from "@shared";

type NameFilterProps = ComponentProps<typeof SearchInput>;

export const NameFilter = (props: NameFilterProps) => {
  return (
    <div className="inline-flex flex-col items-start justify-start gap-2.5 self-stretch">
      <SearchInput {...props} />
    </div>
  );
};
