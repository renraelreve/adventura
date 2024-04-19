import { FadeLoader } from "react-spinners";

function Loading() {
  return (
    <div
      style={{
        width: 500,
        height: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FadeLoader color="#c48a3d" />
    </div>
  );
}

export default Loading;
