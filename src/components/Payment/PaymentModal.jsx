import { useState } from "react";
import Modal from "react-modal";
import { PaymentCard } from "./PaymentCard";

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

export function PaymentModal({ price, days }) {
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
    <div className="p-2">
      <button
        onClick={openModal}
        type="button"
        className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      >
        {`Only for $${price}`}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Payment Modal"
      >
        {/* Show content after modal is open */}
        <button className="my-4" onClick={closeModal}>
          ❌
        </button>
        <div className="w-[50vw]">
          <PaymentCard price={price} closeModal={closeModal} days={days} />
        </div>
      </Modal>
    </div>
  );
}
