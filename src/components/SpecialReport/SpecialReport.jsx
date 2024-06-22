import { Link } from "react-router-dom";

export function SpecialReport() {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="p-2 space-y-4 text-center sm:w-2/5 w-full  flex flex-col justify-center items-center bg-[#F8F8F8]">
        <Link to="" className="text-2xl font-semibold">
          New $72,000 migrant smuggling routes to the US start with charter
          flights
        </Link>
        <p className="text-start font-thin">
          Record border crossings are a major issue in November’s US
          presidential election, with more migrants coming from around the
          world. Inside two new routes that take Indians and Africans via
          Central America.
        </p>
      </div>
      <div className="flex-1">
        <img
          className="w-full h-[70vh] object-cover"
          src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/AAHO4K4K7RHHPGMPR6VDLGF6YY.JPG"
          alt=""
        />
      </div>
    </div>
  );
}
