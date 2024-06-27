import { Field, Label, Input, Textarea, Select } from "@headlessui/react";
import { useState } from "react";
import Modal from "react-modal";
import { FormGroup } from "../FormGroup/FormGroup";
import { useController, useForm } from "react-hook-form";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import MultiSelect from "react-select";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { DataLoading } from "../Loading/DataLoading";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

export function UpdateModal({
  _id,
  title,
  publisher,
  tags,
  description,
  refetch,
}) {
  const { user } = useAuth();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      title,
      publisher,
      tags,
      description,
    },
  });
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    refetch();
    setIsOpen(false);
  }
  async function onSubmit(incomingFormData) {
    setLoading(true);
    const formData = new FormData();
    if (incomingFormData?.image) {
      try {
        formData.append("image", incomingFormData.image[0]);
        const { display_url } = await uploadPhoto(formData);
        await axiosSecure.put(`/article/${_id}`, {
          email: user?.email,
          payload: { ...incomingFormData, image: display_url },
        });
        closeModal();
        toast.success("Successfully Updated");
      } catch (_) {
        toast.error("Failed to update");
      } finally {
        setLoading(false);
      }
      return;
    }
    await axiosSecure.put(`/article/${_id}`, {
      email: user?.email,
      payload: incomingFormData,
    });
    setLoading(false);
    toast.success("Successfully Updated");
    closeModal();
  }
  async function uploadPhoto(payload) {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
      payload
    );
    return data.data;
  }

  const { field: selectTags } = useController({
    name: "tags",
    control,
    rules: { required: { value: true, message: "Required" } },
  });
  const tagOptions = [
    { value: "tech", label: "Tech" },
    { value: "science", label: "Science" },
    { value: "medical", label: "Medical" },
    { value: "politics", label: "Politics" },
    { value: "history", label: "History" },
    { value: "war", label: "War" },
    { value: "other", label: "Other" },
  ];
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
  if (isPending) return <DataLoading />;
  if (error) return "Something went wrong";
  // const publisherOptions = publishers.map((publisher) => ({
  //   value: publisher.name,
  //   label: (
  //     <div className="flex items-center">
  //       <img
  //         src={publisher.logo}
  //         alt={publisher.name}
  //         style={{ width: "20px", height: "20px", marginRight: "8px" }}
  //       />
  //       {publisher.name}
  //     </div>
  //   ),
  // }));
  return (
    <div>
      <button
        onClick={openModal}
        type="button"
        className="bg-blue-600 p-2 text-white hover:bg-cyan-700"
      >
        Update
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Article Update"
      >
        {/* Show content after modal is open */}
        <button className="my-4" onClick={closeModal}>
          ❌
        </button>
        <div className="w-[50vw]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Title field */}
            <FormGroup errorMessage={errors?.title?.message}>
              <Field>
                <Label className="font-medium">Title</Label>
                <Input
                  className="border border-slate-500 block w-full rounded-md p-1"
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
                  className="mt-1 block"
                  {...register("publisher", {
                    required: { value: true, message: "Required" },
                  })}
                >
                  {publishers.map((item) => {
                    return (
                      <option key={item._id} selected={item.name == publisher}>
                        {item.name}
                      </option>
                    );
                  })}
                </Select>
                {/* <MultiSelect
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={null}
                  isClearable
                  options={publisherOptions}
                  {...selectPublisher}
                /> */}
              </FormGroup>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
            {/* Tags field */}
            <FormGroup errorMessage={errors?.tags?.message}>
              <Field>
                <Label className="font-medium">Tags</Label>
              </Field>
              <MultiSelect isMulti options={tagOptions} {...selectTags} />
            </FormGroup>
            {/* Image field */}
            <FormGroup errorMessage={errors?.image?.message}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setEnabled(e.target.checked);
                  }}
                />
                <span className="ml-2 text-sm font-semibold">
                  Do you wnat to update photo?
                </span>
              </div>
              {enabled ? (
                <div className="mt-2">
                  <input
                    className="block w-full border"
                    type="file"
                    {...register("image", {
                      required: { value: true, message: "Required" },
                    })}
                  />
                </div>
              ) : null}
            </FormGroup>
            {/* Description field*/}
            <FormGroup errorMessage={errors?.description?.message}>
              <Field>
                <Label className="font-medium">Description</Label>
              </Field>
              <Textarea
                className="rounded-md"
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
                  Updating...
                </div>
              ) : (
                "Update"
              )}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
