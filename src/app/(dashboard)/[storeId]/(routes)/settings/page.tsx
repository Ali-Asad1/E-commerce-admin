import SettingsForm from "./components/settingsForm";

const Page = () => {
  return (
    <>
      <SettingsForm initialData={{ name: "test", id: "test" }} />
    </>
  );
};
export default Page;
