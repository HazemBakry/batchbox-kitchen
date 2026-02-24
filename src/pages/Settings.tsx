import { AppLayout } from "@/components/AppLayout";
import { Settings as SettingsIcon } from "lucide-react";

const SettingsPage = () => {
  return (
    <AppLayout title="Settings" subtitle="Application configuration">
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <SettingsIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-1">Settings</h3>
          <p className="text-sm text-muted-foreground">Configuration options coming soon.</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
