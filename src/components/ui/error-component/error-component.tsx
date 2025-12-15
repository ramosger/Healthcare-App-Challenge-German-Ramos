import { useTranslation } from "@/i18n";

type ErrorComponentProps = {
  error: string;
  fetchData?: () => void;
};

export const ErrorComponent = ({ error, fetchData }: ErrorComponentProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-100">
      <p className="text-text-danger text-center text-base font-medium">{error}</p>
      <button
        className="bg-background-brand text-text-neutral rounded-md px-4 py-2 text-sm font-medium"
        onClick={fetchData}
        type="button"
      >
        {t("errorComponent.tryAgain")}
      </button>
    </div>
  );
};
