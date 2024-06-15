import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useController, useForm } from "react-hook-form";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import MultiSelect from "react-select";
import { Field, Input, Label, Select, Textarea } from "@headlessui/react";
import { toast } from "react-toastify";
import { FormGroup } from "../FormGroup/FormGroup";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Spinner } from "flowbite-react";

export function AddArticle({ uploadPhoto }) {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { field: selectTags } = useController({
    name: "tags",
    control,
    rules: { required: { value: true, message: "Required" } },
  });
  const tagOptions = [
    { value: "tech", label: "Tech" },
    { value: "science", label: "Science" },
    { value: "health", label: "Health" },
    { value: "other", label: "Other" },
  ];
  async function onSubmit(data) {
    setLoading(true);
    const { title, description, publisher, tags, image } = data;
    const formData = new FormData();
    formData.append("image", image[0]);
    try {
      const { display_url } = await uploadPhoto(formData);
      await axiosSecure.post("/article", {
        title,
        image: display_url,
        description,
        tags,
        publisher,
        email: user?.email,
      });
      toast.success("Article posted");
      reset({
        title: "",
        tags: "",
        publisher: "",
        description: "",
        image: "",
      });
    } catch (_) {
      toast.error("Failed to post.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex justify-center">
      {/* Start headless form component */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
        <div className="w-full space-y-4">
          {/* Title Field */}
          <FormGroup errorMessage={errors?.title?.message}>
            <Field>
              <Label className="font-medium">Title</Label>
              <Input
                placeholder="Title"
                className="border border-slate-500 block w-full rounded-md p-2"
                {...register("title", {
                  required: { value: true, message: "Required" },
                })}
              />
            </Field>
          </FormGroup>
          {/* Publisher field */}
          <div className="relative">
            <FormGroup errorMessage={errors?.publisher?.message}>
              <Field>
                <Label className="font-medium">Publisher</Label>
              </Field>
              <Select
                className="rounded-md"
                {...register("publisher", {
                  required: { value: true, message: "Required" },
                })}
              >
                <option value="">Choose</option>
                {["BBC", "TechCrunch", "Scientific American"].map(
                  (pub, idx) => (
                    <option key={idx} value={pub}>
                      {pub}
                    </option>
                  )
                )}
              </Select>
            </FormGroup>
            <ChevronDownIcon
              className="group pointer-events-none absolute top-5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </div>
          {/* Image Field */}
          <FormGroup errorMessage={errors?.image?.message}>
            <Field>
              <Label className="font-medium">Upload Photo</Label>
            </Field>
            <div className="mt-2">
              <input
                className="block w-full border"
                type="file"
                {...register("image", {
                  required: { value: true, message: "Required" },
                })}
              />
            </div>
          </FormGroup>

          {/* Tags field */}
          <FormGroup errorMessage={errors?.tags?.message}>
            <Field>
              <Label className="font-medium">Tags</Label>
            </Field>
            <MultiSelect isMulti options={tagOptions} {...selectTags} />
          </FormGroup>

          {/* Description field*/}
          <FormGroup errorMessage={errors?.description?.message}>
            <Field>
              <Label className="font-medium">Description</Label>
            </Field>
            <Textarea
              className="rounded-md"
              placeholder="Leave a brif description here..."
              {...register("description", {
                required: { value: true, message: "Required" },
              })}
            ></Textarea>
          </FormGroup>
          <button
            disabled={loading}
            className={`${
              loading ? "cursor-not-allowed bg-red-600" : "bg-blue-600"
            } p-2 text-white  hover:bg-blue-800 rounded-md`}
          >
            {loading ? (
              <div className="flex">
                <Spinner
                  className="mr-2"
                  aria-label="Alternate spinner button example"
                  size="sm"
                />
                Posting...
              </div>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
