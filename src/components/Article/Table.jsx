import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { DeleteModal } from "./DeleteModal";
import { DeclineReasonModal } from "./DeclineReasonModal";
import { UpdateModal } from "./UpdateModal";

export function ArticleTable({ data, refetch }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>SL No.</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Details</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>is Premium</Table.HeadCell>
          <Table.HeadCell>Update</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item, idx) => {
            return (
              <Table.Row
                key={idx}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {idx + 1}
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/all-articles/${item._id}`}
                    className="bg-cyan-600 p-2 text-white hover:bg-cyan-700"
                  >
                    Details
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {item.approved ? (
                    "Approved"
                  ) : item.decline.status ? (
                    <div className="flex gap-2 items-center">
                      <span>Declined</span>{" "}
                      <DeclineReasonModal reason={item.decline.reason} />
                    </div>
                  ) : (
                    "Pending"
                  )}
                </Table.Cell>
                <Table.Cell>{item.premium ? "Yes" : "No"}</Table.Cell>
                <Table.Cell>
                  <UpdateModal {...item} refetch={refetch} />
                </Table.Cell>
                <Table.Cell>
                  <DeleteModal {...item} refetch={refetch} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
