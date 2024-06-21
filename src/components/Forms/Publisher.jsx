import { useForm } from "react-hook-form";
import { FormGroup } from "../FormGroup/FormGroup";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

export function Publisher() {
  const axiosSecure = useAxiosSecure();
  const [updateLoading, setUpdateLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(incomingData) {
    setUpdateLoading(true);
    const { name, logo } = incomingData;
    const formData = new FormData();
    formData.append("image", logo[0]);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
        formData
      );
      const { display_url } = data.data;
      const { data: res } = await axiosSecure.post("/publisher", {
        payload: {
          name,
          logo: display_url,
        },
      });
      toast.success(res.message);
      reset({
        name: "",
        logo: "",
      });
    } catch (_) {
      toast.error("Failed to add.");
    } finally {
      setUpdateLoading(false);
    }
  }
  return (
    <div className="h-[60vh] flex justify-center items-center">
      <div className="w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <FormGroup errorMessage={errors?.name?.message}>
            <label className="mb-1 text-lg" htmlFor="Name">
              Publisher Name
            </label>
            <input
              className="rounded-md p-3  border block w-full"
              type="text"
              placeholder="publisher name here"
              {...register("name", {
                required: { value: true, message: "Required" },
              })}
            />
          </FormGroup>
          <FormGroup errorMessage={errors?.logo?.message}>
            <label className="mb-1 text-lg" htmlFor="logo">
              Publisher Logo
            </label>
            <input
              className="rounded-md p-1 border block w-full"
              type="file"
              placeholder="logo"
              {...register("logo", {
                required: { value: true, message: "Required" },
              })}
            />
          </FormGroup>
          <button
            disabled={updateLoading}
            className={`${
              updateLoading ? "cursor-not-allowed bg-red-600" : "bg-blue-600"
            } p-2 rounded-md text-white hover:bg-blue-700`}
          >
            {updateLoading ? (
              <Spinner aria-label="Spinner button example" size="sm" />
            ) : (
              ""
            )}{" "}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
