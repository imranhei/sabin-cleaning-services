import React, { useEffect } from "react";
import { getUsers, deleteUser } from "@/redux/admin/user-slice";
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
import UpdateRoleModal from "@/components/modal/UpdateRoleModal";
import SimpleDeleteModal from "@/components/modal/SimpleDeleteModal";
import { toast } from "sonner";

const Users = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled" && res.payload?.success) {
          toast.success(res.payload?.message || "User deleted successfully");
        } else {
          // Check error from rejectWithValue
          toast.error(
            res.payload || res.error?.message || "Something went wrong"
          );
        }
      })
      .catch((err) => {
        console.error("Dispatch error:", err);
      });
  };

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
          {users.map((u) => (
            <TableRow key={u._id}>
              <TableCell className="font-medium">{u.name}</TableCell>
              <TableCell>
                {u.uname}
                {user?.id}
              </TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell className="flex justify-end items-center gap-4">
                {user._id !== u._id && (
                  <UpdateRoleModal initialFormData={u}>
                    <Edit className="size-4 text-sky-500 cursor-pointer" />
                  </UpdateRoleModal>
                )}
                <SimpleDeleteModal
                  onSubmit={handleDelete}
                  title="Are you sure you want to delete this user?"
                  info={u.name}
                  id={u._id}
                  isLoading={isLoading}
                >
                  <Trash2 className="size-4 text-rose-500 cursor-pointer" />
                </SimpleDeleteModal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
