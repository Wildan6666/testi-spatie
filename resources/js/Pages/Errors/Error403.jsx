export default function Forbidden({ status, message }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600">{status}</h1>
      <p className="mt-4 text-lg">{message}</p>
    </div>
  );
}
