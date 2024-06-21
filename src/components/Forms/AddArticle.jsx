import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useController, useForm } from "react-hook-form";
import MultiSelect from "react-select";
import { Field, Input, Label, Textarea } from "@headlessui/react";
import { toast } from "react-toastify";
import { FormGroup } from "../FormGroup/FormGroup";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Spinner } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";

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
  const { field: selectPublisher } = useController({
    name: "publisher",
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
    console.log(data);
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
        publisher: publisher.value,
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
  const {
    data: publishers = [],
    error,
    isPending,
  } = useQuery({
    queryKey: ["getpublisher"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/publisher");
      return data;
    },
  });
  if (isPending) return "Loading";
  if (error) return "Something went wrong";

  const publisherOptions = publishers.map((publisher) => ({
    value: publisher.name,
    label: (
      <div className="flex items-center">
        <img
          src={publisher.logo}
          alt={publisher.name}
          style={{ width: "20px", height: "20px", marginRight: "8px" }}
        />
        {publisher.name}
      </div>
    ),
  }));

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
              <MultiSelect
                className="basic-single"
                classNamePrefix="select"
                defaultValue={null}
                isClearable
                options={publisherOptions}
                {...selectPublisher}
                // {...register("publisher", {
                //   required: { value: true, message: "Required" },
                // })}
              />
            </FormGroup>
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
              placeholder="Leave a brief description here..."
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
                Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
