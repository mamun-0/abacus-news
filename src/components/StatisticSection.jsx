import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../hooks/useAxios";
import CountUp from "react-countup";

export function StatisticSection() {
  const axiosCommon = useAxios();
  const {
    data: statistic,
    error,
    isPending,
  } = useQuery({
    queryKey: ["statistic"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/userCount");
      return data;
    },
  });
  if (isPending) return "Loading..";
  const background_1 = {
    background: `linear-gradient(45deg, #fad029 0%, #ff9a9e 100%)`,
  };
  const background_2 = {
    background: `linear-gradient(90deg, #a1c4dd 0%, #C82249 100%)`,
  };
  const background_3 = {
    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
  };
  return (
    <div className="mt-3 mx-3 grid gap-4  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center">
      <div
        style={background_1}
        className="h-36 bg-black w-2/3 md:w-full rounded-sm flex justify-center items-center"
      >
        <h2 className="text-2xl text-white font-bold">
          Normal : <CountUp end={statistic?.normal || 0} duration={10} />
        </h2>
      </div>
      <div
        style={background_2}
        className="h-36 bg-black w-2/3 md:w-full rounded-sm flex justify-center items-center"
      >
        <h2 className="text-2xl text-white font-bold">
          {" "}
          Premium : <CountUp end={statistic?.premium || 0} duration={10} />
        </h2>
      </div>
      <div
        style={background_3}
        className="h-36 bg-black w-2/3 md:w-full rounded-sm flex justify-center items-center"
      >
        <h2 className="text-2xl text-white font-bold">
          {" "}
          Admin : <CountUp end={statistic?.admin || 0} duration={10} />
        </h2>
      </div>
    </div>
  );
}
