import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useEffect, useState } from "react";

export function ModalAfter10Sec() {
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

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    localStorage.setItem("modalShown", "true");
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const modalShown = localStorage.getItem("modalShown");
    if (!modalShown) {
      const timerID = setTimeout(() => {
        openModal();
      }, 10 * 1000);
      return () => {
        clearTimeout(timerID);
      };
    }
  }, []);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Article Decline"
      >
        {/* Show content after modal is open */}
        <button className="my-4" onClick={closeModal}>
          ❌
        </button>
        <div className="w-[60vw] h-[70vh] space-y-3 flex flex-col items-center">
          <h2 className="text-3xl my-4 text-center font-bold text-cyan-400">
            Get A Subscription And Be A Premium User
          </h2>
          <img className="" src={"/subscription.png"} alt="" />
          <Link
            to="/subscribe"
            onClick={closeModal}
            className="p-2 bg-yellow-500 text-white text-xl rounded-md mt-4"
          >
            Subscribe
          </Link>
        </div>
      </Modal>
    </div>
  );
}
