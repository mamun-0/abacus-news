import { useState } from "react";
import Modal from "react-modal";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

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

export function DeleteModal({ _id, title, image, publisher, refetch }) {
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDelete() {
    setLoading(true);
    try {
      await axiosSecure.delete(`/article/${_id}`);
      refetch();
      toast.success("Deleted successfully.");
      closeModal();
    } catch (_) {
      toast.error("Failed to delete.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-2">
      <button
        onClick={openModal}
        type="button"
        className="bg-red-600 p-2 text-white hover:bg-red-700"
      >
        Delete
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Article Deletion"
      >
        {/* Show content after modal is open */}
        <button className="my-4" onClick={closeModal}>
          ❌
        </button>
        <div className="w-[50vw] space-y-3">
          <h2 className="text-xl text-red-500 font-bold">
            Do you want to delete this post?
          </h2>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Title : {title}</h2>
            <img className="w-3/4 h-52 object-cover" src={image} alt="" />
            <h3 className="text-lg font-semibold">Publisher : {publisher}</h3>
          </div>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-24 p-2 bg-red-500 text-white hover:bg-red-700"
          >
            {loading ? (
              <>
                <Spinner
                  className="mr-2"
                  aria-label="Alternate spinner button example"
                  size="sm"
                />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
}
