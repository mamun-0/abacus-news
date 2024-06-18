import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export function PremiumArticleCard({ _id, title, image, publisher, description }) {
  return (
    <Card
      className="max-w-80"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={image}
    >
      <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <ul className="divide-y-2 space-y-2">
        <li>Publusher: {publisher}</li>
        <li>Description : {description}</li>
      </ul>
      <Link className="p-2 bg-blue-600 text-white text-center rounded-md" to={`/all-articles/${_id}`}>Details</Link>
    </Card>
  );
}
