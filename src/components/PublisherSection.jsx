import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../hooks/useAxios";

export function PublisherSection() {
  const axiosCommon = useAxios();
  const {
    data: publishers = [],
    error,
    isPending,
  } = useQuery({
    queryKey: ["allPublisher"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/publisher");
      return data;
    },
  });
  if (isPending) return "Loading";
  return (
    <div className="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  place-items-center">
      {publishers.map((publisher) => {
        return (
          <div key={publisher._id} className="max-h-36 max-w-36 place-content-center place-self-center">
            <img src={publisher.logo} alt="" />
          </div>
        );
      })}
    </div>
  );
}
