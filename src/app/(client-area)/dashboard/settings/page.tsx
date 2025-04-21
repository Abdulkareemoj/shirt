import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import SettingsAccountPage from "./tabs/account";
import SettingsAppearancePage from "./tabs/appearance";
import SettingsDisplayPage from "./tabs/display";
import SettingsNotificationsPage from "./tabs/notifications";
import SettingsProfilePage from "./tabs/profile";

export default function Settings() {
  return (
    <main className="mx-auto flex flex-col p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      <Tabs defaultValue="profile" className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex justify-center">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="profile">
          <SettingsProfilePage />
        </TabsContent>
        <TabsContent value="account">
          <SettingsAccountPage />
        </TabsContent>
        <TabsContent value="appearance">
          <SettingsAppearancePage />
        </TabsContent>
        <TabsContent value="notifications">
          <SettingsNotificationsPage />
        </TabsContent>
        <TabsContent value="display">
          <SettingsDisplayPage />
        </TabsContent>
      </Tabs>
    </main>
  );
}
