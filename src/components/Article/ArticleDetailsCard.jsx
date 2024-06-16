import { Card } from "flowbite-react";

export function ArticleDetailsCard({
  image,
  description,
  publisher,
  title,
  tags,
}) {
  return (
    <Card
      className="max-w-xl shadow-none"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={image}
    >
      <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <ul className="divide-y-2 space-y-2">
        <li><span className="font-semibold">Publusher:</span> {publisher}</li>
        <ul>
          <li className="font-semibold">Tags</li>
          {tags.map((item, idx) => {
            return <li key={idx}>{item.label}</li>;
          })}
        </ul>
        <li><span className="font-semibold">Description :</span> {description}</li>
      </ul>
    </Card>
  );
}
