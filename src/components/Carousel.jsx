import { Carousel } from "flowbite-react";

export function CarouselComponent() {
  return (
    <div className="h-56 sm:h-[70vh]">
      <Carousel>
        <img
          className="object-cover h-full"
          src="https://www.surfholidays.com/assets/images/blog/2017-04-12-Depositphotos_44844877_original.jpg"
        />
        <img
          className="object-cover h-full"
          src="https://discover.centurylink.com/wp-content/uploads/2021/08/shutterstock_756686665-2048x1152.jpg"
        />
        <img
          className="object-cover h-full"
          src="https://storge.pic2.me/upload/303/5fd7469e173bb1.51118220.jpg"
        />
        <img
          className="object-cover h-full"
          src="https://sfwallpaper.com/images/surfer-wallpaper-1.jpg"
        />
      </Carousel>
    </div>
  );
}
