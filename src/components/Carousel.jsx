import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Carousel } from 'flowbite-react';
import { useAxios } from '../hooks/useAxios';
import { Link } from 'react-router-dom';

export function CarouselComponent() {
  const axiosCommon = useAxios();
  const {
    data: trendingArticle = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['trendingArticle'],
    queryFn: async () => {
      const { data } = await axiosCommon.get('/trendingArticles');
      return data;
    },
  });

  if (isPending) return 'Loading';

  return (
    <div className="h-56 sm:h-[70vh]">
      <Carousel>
        {trendingArticle.map((article) => (
          <div
            key={article._id}
            className="flex items-center justify-center h-full"
            style={{
              backgroundImage: `url(${article.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Link to={`/all-articles/${article._id}`} className="text-4xl bg-black p-3 underline text-white">
              {article.title}
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
