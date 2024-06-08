import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useController, useForm } from "react-hook-form";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import MultiSelect from "react-select";
import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from "@headlessui/react";
import clsx from "clsx";
import { toast } from "react-toastify";
import { FormGroup } from "../FormGroup/FormGroup";

export function AddArticle({ uploadPhoto }) {
  const axiosSecure = useAxiosSecure();
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
      });
      toast.success("Article posted");
      reset();
    } catch (_) {
      toast.error("Failed to post.");
    }
  }
  return (
    <div className="flex justify-center">
      {/* Start headless form component */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
        <div className="w-full max-w-xl px-4 bg-black my-4 rounded-md">
          <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
            <Legend className="text-base/7 text-center font-semibold text-white">
              Add Article Form
            </Legend>
            <Field>
              <Label className="text-sm/6 font-medium text-white">Title</Label>
              <FormGroup errorMessage={errors?.name?.message}>
                <Input
                  {...register("title", {
                    required: { value: true, message: "Required" },
                  })}
                  className={clsx(
                    "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                />
              </FormGroup>
            </Field>
            <Field>
              <Label className="text-sm/6 font-medium text-white">
                Select Publisher
              </Label>
              <div className="relative">
                <FormGroup errorMessage={errors?.publisher?.message}>
                  <Select
                    className={clsx(
                      "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                      "*:text-black"
                    )}
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
            </Field>
            <Field>
              <Label className="text-sm/6 font-medium text-white">
                Upload Image
              </Label>
              <FormGroup errorMessage={errors?.image?.message}>
                <Input
                  type="file"
                  {...register("image", {
                    required: { value: true, message: "Required" },
                  })}
                  className={clsx(
                    "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                />
              </FormGroup>
            </Field>
            <Field>
              <Label className="text-sm/6 font-medium text-white">Tags</Label>
              <FormGroup errorMessage={errors?.tags?.message}>
                <MultiSelect isMulti options={tagOptions} {...selectTags} />
              </FormGroup>
            </Field>
            <Field>
              <Label className="text-sm/6 font-medium text-white">
                Desciption
              </Label>
              <FormGroup errorMessage={errors?.description?.message}>
                <Textarea
                  {...register("description", {
                    required: { value: true, message: "Required" },
                  })}
                  className={clsx(
                    "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                  rows={3}
                />
              </FormGroup>
            </Field>
            <button className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
              Submit
            </button>
          </Fieldset>
        </div>
      </form>
    </div>
  );
}