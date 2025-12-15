import type { ReactNode } from "react";

type ProviderOverviewSectionProps = {
  title: string;
  children: ReactNode;
  withDivider?: boolean;
};

export const ProviderOverviewSection = ({
  children,
  title,
  withDivider = true,
}: ProviderOverviewSectionProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-text-primary">{title}</h3>
      {children}
      {withDivider ? <hr className="border-border-default" /> : null}
    </div>
  );
};
