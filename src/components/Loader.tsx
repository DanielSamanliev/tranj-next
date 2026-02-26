export default function Loader({
  size = "w-10 h-10 border-4",
}: {
  size?: string;
}) {
  return (
    <div
      className={`${size} border-t-secondary border-primary/50 rounded-full animate-spin`}
    ></div>
  );
}
