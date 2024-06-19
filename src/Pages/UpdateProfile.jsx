import { Profile } from "../components/Forms/Profile";
import { Heading } from "../components/Heading/Heading";

export function UpdateProfile() {
  return (
    <div>
      <Heading
        title="Update Your Profile"
        subheading="If you want to update your profile picture just check the box and upload a photo."
      />
      <Profile />
    </div>
  );
}
