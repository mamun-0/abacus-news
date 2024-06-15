import { useState } from "react";
import Modal from "react-modal";

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

export function DeclineReasonModal({ reason }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button
        onClick={openModal}
        type="button"
        className="bg-yellow-600 p-2 text-white hover:bg-yellow-700"
      >
        Show Reason
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
            <h2 className="text-2xl my-4 text-center">The reason we decline your post.</h2>
          <p className="font-extralight text-xl">Reason : {reason}</p>
        </div>
      </Modal>
    </div>
  );
}
