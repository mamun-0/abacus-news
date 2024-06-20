import { Table } from "flowbite-react";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import Modal from "react-modal";
import { Textarea } from "@headlessui/react";
import { Spinner } from "flowbite-react";
export function ArticleTable({
  _id,
  createdAt,
  title,
  email,
  approved,
  decline,
  idx,
  image,
  publisher,
  handleUpdate,
  refetch,
}) {
  let status = approved ? "Approved" : decline.status ? "Declined" : "Pending";
  function formatdDate(date) {
    return format(parseISO(date), "dd/MM/yyyy");
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>SL No.</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Author</Table.HeadCell>
          <Table.HeadCell>Author Email</Table.HeadCell>
          <Table.HeadCell>Author Photo</Table.HeadCell>
          <Table.HeadCell>Posted Date</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Publisher</Table.HeadCell>
          <Table.HeadCell>Approve</Table.HeadCell>
          <Table.HeadCell>Decline</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>Make Premium</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {idx + 1}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {title}
            </Table.Cell>
            <Table.Cell>Mamun</Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>
              <img className="w-10 h-10 rounded" src={image} />
            </Table.Cell>
            <Table.Cell>{formatdDate(createdAt)}</Table.Cell>
            <Table.Cell>{status}</Table.Cell>
            <Table.Cell>{publisher}</Table.Cell>
            <Table.Cell>
              <button
                onClick={async () => {
                  const res = await handleUpdate(_id, "approve");
                  refetch();
                  toast.success(res.data.message);
                }}
                className="p-2 hover:bg-blue-500 bg-blue-600 text-white"
              >
                Approve
              </button>
            </Table.Cell>
            {/* Decline button */}
            <Table.Cell>
              <DeclineModal
                id={_id}
                handleUpdate={handleUpdate}
                refetch={refetch}
              />
            </Table.Cell>
            <Table.Cell>
              <button
                onClick={async () => {
                  const res = await handleUpdate(_id, "delete");
                  refetch();
                  toast.success(res.data.message);
                }}
                className="p-2 hover:bg-red-500 bg-red-600 text-white"
              >
                Delete
              </button>
            </Table.Cell>
            <Table.Cell>
              <button
                onClick={async () => {
                  const res = await handleUpdate(_id, "premium");
                  refetch();
                  toast.success(res.data.message);
                }}
                className="p-2 hover:bg-green-500 bg-green-600 w-28 text-white"
              >
                Make Premium
              </button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

function DeclineModal({ id, handleUpdate, refetch }) {
  const [declineLoading, setDeclineLoading] = useState(false);
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
  const [declineText, setDeclineText] = useState("");
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  async function handleDeclineSubmit() {
    setDeclineLoading(true);
    const res = await handleUpdate(id, "decline", { payload: declineText });
    setDeclineLoading(false);
    refetch();
    toast.success(res.data.message);
    closeModal();
  }
  return (
    <div>
      <button
        onClick={openModal}
        className="p-2 hover:bg-orange-500 bg-orange-400 text-white"
      >
        Decline
      </button>
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
        <div className="w-[50vw] space-y-3">
          <h2 className="text-2xl my-4 text-center">
            Write down of the post decline reason issue.
          </h2>
          <form onSubmit={handleDeclineSubmit} className="flex flex-col">
            <Textarea
              value={declineText}
              onChange={(e) => {
                setDeclineText(e.target.value);
              }}
              className="rounded-md w-full"
              placeholder="Leave a brif description here..."
              required
            ></Textarea>
            <button className="mt-4 p-2 w-32 text-white bg-red-600">
              <span className="flex justify-center gap-2">
                {" "}
                {declineLoading ? (
                  <Spinner aria-label="Spinner button example" size="sm" />
                ) : (
                  ""
                )}{" "}
                Decline
              </span>
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
