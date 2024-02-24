import SettingsForm from "./_components/settingsForm";

const Page = () => {
  return (
    <>
      <SettingsForm initialData={{ name: "test", id: "test" }} />
    </>
  );
};
export default Page;
