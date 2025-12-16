import type { ReactNode } from "react";

type ProviderContactRowProps = {
  icon: ReactNode;
  text: string;
};

export const ProviderContactRow = ({ icon, text }: ProviderContactRowProps) => {
  return (
    <div className="inline-flex items-center gap-2">
      {icon}
      <p className="font-light text-text-default-secondary">{text}</p>
    </div>
  );
};
