export const ProviderCardSkeleton = () => {
  return (
    <div className="bg-image-auth flex flex-col self-stretch overflow-hidden rounded-xl outline-1 outline-border-default">
      <div className="h-56 w-full animate-pulse bg-background-surface" />

      <div className="flex flex-1 flex-col justify-between gap-3 p-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="h-7 w-3/4 animate-pulse rounded-md bg-background-surface" />
            <div className="h-6 w-1/2 animate-pulse rounded-md bg-background-surface" />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 animate-pulse rounded-full bg-background-surface" />
              <div className="h-6 w-2/3 animate-pulse rounded-md bg-background-surface" />
            </div>

            <div className="pl-7">
              <div className="h-6 w-1/3 animate-pulse rounded-md bg-background-surface" />
            </div>
          </div>
        </div>

        <div className="h-10 w-full animate-pulse rounded-md bg-background-surface" />
      </div>
    </div>
  );
};
