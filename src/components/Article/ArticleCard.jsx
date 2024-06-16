import { Link } from "react-router-dom";

export function ArticleCard({
  _id,
  title = "",
  image = "",
  publisher = "",
  description = "",
}) {
  return (
    <div className="h-96 w-80 border-2 p-1 flex flex-col justify-around">
      <h2 className="text-xl text-center">{title}</h2>
      <img className="w-full h-3/5 object-cover" src={image} alt="" />
      <h2 className="text-lg">
        <span className="font-semibold">Publusher</span>: {publisher}
      </h2>
      <div className="h-8 overflow-y-hidden">
        <p className="text-lg">
          <span className="font-semibold">Description</span>: {description}
        </p>
      </div>
      <Link
        to={_id}
        className="text-center rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
      >
        View Details
      </Link>
    </div>
  );
}
