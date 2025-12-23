import { Icons } from "@/components";
import { useTranslation } from "@/i18n";
import type { Provider } from "@/types";
import { ProviderContactRow, ProviderOverviewSection } from "..";

type ProviderOverviewProps = {
  about: Provider["about"];
  phone: Provider["phone"];
  email: Provider["email"];
  languages: Provider["languages"];
};

export const ProviderOverview = ({ about, email, languages, phone }: ProviderOverviewProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 pt-6">
      <ProviderOverviewSection title="About">
        <p className="font-light text-text-default-secondary">{about}</p>
      </ProviderOverviewSection>

      <ProviderOverviewSection title="Contact information">
        <div className="flex flex-col gap-1 pt-1 lg:flex-row lg:gap-8">
          <ProviderContactRow icon={<Icons.Phone className="size-6" />} text={phone} />
          <ProviderContactRow icon={<Icons.Mail className="size-6" />} text={email} />
        </div>
      </ProviderOverviewSection>

      <ProviderOverviewSection title="Languages" withDivider={false}>
        {languages.length > 0 ? (
          <div className="inline-flex items-center gap-2 pt-2">
            <Icons.World className="size-6" />
            <p className="font-light text-text-default-secondary">{languages.join(", ")}</p>
          </div>
        ) : (
          <p className="pt-2 font-light text-text-default-secondary">{t("provider.noLanguage")}</p>
        )}
      </ProviderOverviewSection>
    </div>
  );
};
