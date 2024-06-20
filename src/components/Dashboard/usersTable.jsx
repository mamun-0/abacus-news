import { Table } from "flowbite-react";
import React from "react";
import { toast } from "react-toastify";

export function UsersTable({ users, handleAdmin, refetch }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Profile Picture</Table.HeadCell>
          <Table.HeadCell>Make Admin</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map(({ _id, name, email, image, role }) => {
            return (
              <Table.Row
                key={_id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {name}
                </Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>
                  <img className="rounded-full h-10 w-10" src={image} alt="" />
                </Table.Cell>
                <Table.Cell>
                  {role === "admin" ? (
                    <span>Admin</span>
                  ) : (
                    <button
                      onClick={async () => {
                        const { data } = await handleAdmin(_id);
                        toast.success(data?.message);
                        refetch();
                      }}
                      className="p-2 text-xs text-white bg-blue-600 hover:bg-blue-500"
                    >
                      Make Admin
                    </button>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
