import { Link } from "react-router-dom";

export function Environment() {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="p-2 space-y-4 text-center sm:w-2/5 w-full flex flex-col justify-center items-center bg-[#F8F8F8]">
        <Link to="" className="text-2xl font-semibold">
          How US industries deal with extreme heat
        </Link>
        <p className="text-start font-thin">
          Extreme heat has companies in the United States changing the way they
          work. One frequent response: work less. Here is how heat affects
          several large industries and what they do about it.
        </p>
      </div>
      <div className="flex-1">
        <img
          className="w-full h-[70vh] object-cover"
          src="https://i.pinimg.com/originals/f7/ec/d0/f7ecd0baada7cb7df8c588196f67a117.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
