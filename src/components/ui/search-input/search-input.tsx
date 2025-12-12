import { Icons } from "@/components";

type SearchInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const SearchInput = ({ onChange, placeholder = "Search...", value }: SearchInputProps) => {
  return (
    <div className="inline-flex h-10 items-center justify-start self-stretch overflow-hidden rounded-md bg-background-surface outline-1 -outline-offset-1 outline-border-default">
      <div className="flex flex-1 items-center justify-start overflow-hidden">
        <div className="flex items-center justify-start gap-2 self-stretch pl-3">
          <Icons.Search className="size-8.5 lg:size-10" />
        </div>

        <div className="flex flex-1 items-center justify-between self-stretch px-3 py-1.5 font-light">
          <input
            aria-label={placeholder}
            className="placeholder-text-disabled text-text-disabled line-clamp-1 flex-1 justify-start bg-transparent text-sm leading-5 font-normal outline-none"
            onChange={(e) => {
              return onChange?.(e.target.value);
            }}
            placeholder={placeholder}
            type="text"
            value={value}
          />
        </div>
      </div>
    </div>
  );
};
