import { Hourglass } from "react-loader-spinner";

const PageLoader = ({ title = "Loading..." }: { title?: string }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
      />
        <p className="ml-4 text-lg font-medium text-muted-foreground">{title}</p>
    </div>
  );
};

export default PageLoader;
