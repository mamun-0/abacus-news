import { Spinner } from "flowbite-react";

export function DataLoading() {
  return (
    <div className="flex justify-center items-center h-full">
      <Spinner aria-label="Extra large spinner example" size="xl" />
    </div>
  );
}
