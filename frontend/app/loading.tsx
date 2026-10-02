import { Hourglass } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
      />
    </div>
  );
}
