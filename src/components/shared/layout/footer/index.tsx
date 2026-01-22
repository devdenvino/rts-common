import { getAppConfig } from "@/lib/helpers/functions";

export default function Footer() {
  const appConfig = getAppConfig("");

  return (
    <div className="border-t-2">
      <div className="flex flex-row mt-1">
        <div className="text-xs">
          © {new Date().getFullYear()} For internal use only!!!
        </div>
        <div className="flex grow"></div>
        {appConfig?.poweredBy && (
          <div className="sticky top-[100vh] text-xs">
            Powered by {appConfig.poweredBy}
          </div>
        )}
      </div>
    </div>
  );
}
