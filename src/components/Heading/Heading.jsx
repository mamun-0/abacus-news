export function Heading({ title = "", subheading = "" }) {
  return (
    <div className="text-center">
      <h2 className="inline-block border-b-2 border-blue-500 p-2 lg:my-4 sm:my-2 lg:text-2xl md:text-xl font-bold">
        {title}
      </h2>

      {subheading ? <p className="text-xl text-stone-500">{subheading}</p> : ""}
    </div>
  );
}
