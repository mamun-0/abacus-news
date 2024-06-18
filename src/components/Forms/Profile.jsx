import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { FormGroup } from "../FormGroup/FormGroup";
import { Checkbox, FloatingLabel, Label, Spinner } from "flowbite-react";
import { FileInput } from "flowbite-react";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
export function Profile() {
  const axiosSecure = useAxiosSecure();Checkbox
  const { user, updateUserProfile } = useAuth();
  const [profileUpdate, setProfileUpdate] = useState();
  const [updateLoading, setUpdateLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
    },
  });

  async function onSubmit(incomingFormData) {
    setUpdateLoading(true);
    const { email } = incomingFormData;
    if (profileUpdate) {
      const { image, name } = incomingFormData;
      const formData = new FormData();
      formData.append("image", image[0]);
      try {
        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
          formData
        );
        const { display_url } = data.data;
        await updateUserProfile(name, display_url);
        const payload = { image: display_url, name };
        const {
          data: { message },
        } = await updateProfileIntoDatabase(email, payload);
        toast.success(message);
      } catch (_) {
        toast.error("Failed to update.");
      }
    } else {
      const { name } = incomingFormData;
      const { photoURL } = user;
      try {
        await updateUserProfile(name, photoURL);
        const payload = { name };
        const {
          data: { message },
        } = await updateProfileIntoDatabase(email, payload);
        toast.success(message);
      } catch (_) {
        toast.error("Failed to update.");
      }
    }
    setUpdateLoading(false);
  }
  async function updateProfileIntoDatabase(email, payload) {
    return axiosSecure.put("/user", {
      email,
      payload,
    });
  }
  return (
    <div className="h-[60vh] flex justify-center items-center">
      <div className="w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <FormGroup errorMessage={errors?.name?.message}>
            <FloatingLabel
              {...register("name", {
                required: { value: true, message: "Requrired" },
              })}
              variant="outlined"
              label="Name"
            />
          </FormGroup>
          <FormGroup errorMessage={errors?.email?.message}>
            <FloatingLabel
              className="cursor-not-allowed bg-slate-200"
              {...register("email", {
                required: { value: true, message: "Required" },
              })}
              variant="outlined"
              label="Email"
              disabled
            />
          </FormGroup>
          <div className="flex gap-2">
            <Checkbox
              id="remember"
              onChange={(e) => setProfileUpdate(e.target.checked)}
            />
            <Label htmlFor="remember">
              Do you want to update your profile picture?
            </Label>
          </div>
          {profileUpdate ? (
            <FormGroup errorMessage={errors?.image?.message}>
              <FileInput
                {...register("image", {
                  required: { value: true, message: "Required" },
                })}
              />
            </FormGroup>
          ) : (
            ""
          )}
          <button
          disabled={updateLoading}
            className={`${
              updateLoading
                ? "cursor-not-allowed bg-red-600"
                : "bg-blue-600"
            } p-2 w-24 rounded-md text-white hover:bg-blue-700`}
          >
            {updateLoading ? (
              <Spinner aria-label="Spinner button example" size="sm" />
            ) : (
              ""
            )}{" "}
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
