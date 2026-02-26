import Loader from "@/components/Loader";

export default function AppLoader() {
  return (
    <div className="flex justify-center mt-64 md:mt-0 md:items-center h-svh">
      <Loader size={"w-12 h-12 border-5"} />
    </div>
  );
}
