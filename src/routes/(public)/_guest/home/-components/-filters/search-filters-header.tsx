import { useTranslation } from "@/i18n";

export const SearchFiltersHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="inline-flex flex-col items-start justify-start gap-1 lg:w-full lg:gap-2">
      <h1 className="w-80 justify-center text-2xl font-semibold text-text-primary lg:self-stretch lg:text-3xl">
        {t("searchFilters.title")}
      </h1>
      <p className="w-80 justify-center text-base leading-6 font-normal text-text-secondary lg:w-full lg:self-stretch lg:text-lg lg:font-medium">
        {t("searchFilters.subtitle")}
      </p>
    </div>
  );
};
