import "./Banner.css";
import { Typewriter } from "react-simple-typewriter";

export function Banner() {
  return (
    <div className="flex justify-between">
      <div className="relative flex justify-center items-center flex-1 h-[50vh] bg-cover">
        <video
          src="/bg-video.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-red-500 p-3">
            <span className="shadow-2xl text-white text-lg font-extralight">
              Abacus News Always{" "}
              <Typewriter words={["Stay with", "You ♥"]} loop={0} cursor />
            </span>
          </div>
        </div>
      </div>
      <div className="banner_gredient flex flex-col justify-center text-center space-y-3 p-3">
        <span className="text-xl Abacus text-white">
          More than a service. <br /> 24/7 coverage of the world's top news
          sites
        </span>
        <div>
          <button className="font-extralight shadow-2xl transition duration-500 hover:bg-black border border-white text-white hover:border-red-700 p-2">
            Incoming features
          </button>
        </div>
      </div>
    </div>
  );
}
