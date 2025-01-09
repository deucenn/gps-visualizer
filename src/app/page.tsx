import Header from "./components/Header";
import MapWrapper from "./components/MapWrapper";

export default function Page() {
  return (
    <>
      <Header />
      <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
        <MapWrapper />
      </div>
    </>
  );
}



