import React, { useEffect } from "react";
import { getUsers } from "@/redux/admin/user-slice";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RegisterModal from "@/components/modal/RegisterModal";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="flex h-auto flex-col gap-4 items-center">
      <div className="flex gap-4 justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Users</h1>
        <RegisterModal>
          <Button>Create User</Button>
        </RegisterModal>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((invoice) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium">{invoice.name}</TableCell>
              <TableCell>{invoice.username}</TableCell>
              <TableCell>{invoice.role}</TableCell>
              <TableCell className="flex justify-end items-center gap-4">
                <Edit className="size-4 text-green-500" />
                <Trash2 className="size-4 text-rose-500" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
