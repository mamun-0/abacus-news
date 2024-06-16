import { Badge } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiCheck } from "react-icons/hi";

export function ArticleCard({
  _id,
  title,
  image,
  publisher,
  description,
  premium,
  premiumUser,
}) {
  const isActive = !premium || (premium && premiumUser === "premium");

  return (
    <div
      className={`${
        premium ? "shadow-xl font-extralight" : ""
      } h-96 w-80 border-2 rounded-md p-1 flex flex-col justify-around`}
    >
      <div className="flex justify-center">
        <h2 className="text-xl text-center font-bold">{title}</h2>
        {premium ? <PremiumBadge /> : ""}
      </div>
      <img className="w-full h-3/5 object-cover" src={image} alt="" />
      <h2 className="text-lg">
        <span className="font-semibold">Publisher</span>: {publisher}
      </h2>
      <div className="h-8 overflow-y-hidden">
        <p className="text-lg">
          <span className="font-semibold">Description</span>: {description}
        </p>
      </div>
      <Link
        to={isActive ? `/all-articles/${_id}` : "#"}
        className={`text-center rounded py-2 px-4 text-sm text-white 
          ${
            isActive
              ? "bg-sky-600 hover:bg-sky-500 active:bg-sky-700"
              : "bg-gray-400 pointer-events-none cursor-not-allowed"
          }`}
      >
        View Details
      </Link>
    </div>
  );
}

function PremiumBadge() {
  return (
    <div className="flex ml-2">
      <Badge icon={HiCheck}>Premium</Badge>
    </div>
  );
}
