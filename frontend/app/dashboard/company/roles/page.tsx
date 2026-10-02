"use client";
import { DashboardLayout } from "@/components/layout";
import CreateRoles from "@/components/roles/create.roles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { createRoleSlice, getRoleListSlice } from "@/redux/reducer/roles.silce";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { createRoleSchema } from "@/utils/validation/employ.validation";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { useFormik } from "formik";
import { MoreVertical, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { title } from "process";
import { useLayoutEffect, useState } from "react";

const RolesPage = () => {
  const disptch = useAppDispatch();

  const [openCreatRole, setOpenCreatRole] = useState(false);
  const [editRole, setEditRole] = useState({
    id: "",
    isEdit: false,
  });


  const { loading, data } = useAppSelector((state) => state.roles);

  const { toast } = useToast();

  const [createRoleLoading, setCreateRoleLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      role: "",
      premistion: "",
    },
    validationSchema: createRoleSchema,
    onSubmit: async (values) => {
      const payload = {
        role: values.role,
        permission: values.premistion,
      };

      setCreateRoleLoading(true);
      const response = await disptch(createRoleSlice(payload));

      if (!response?.payload?.success) {
        setCreateRoleLoading(false);
        toast({
          title: "Error",
          description: response?.payload?.message,
          variant: "destructive",
        });
      } else {
        disptch(getRoleListSlice());
        setCreateRoleLoading(false);
        toast({
          title: "Success",
          description: "Role created successfully",
        });
        hanldeCreteDailoagClose();
      }
    },
  });

  useLayoutEffect(() => {
    disptch(getRoleListSlice());
  }, []);

  const hanldeCreteDailoagClose = () => {
    setOpenCreatRole(false);
    formik.resetForm();
  };

  const handleOnEdit = () => {
    setOpenCreatRole(true);
  };

  return (
    <>
      <DashboardLayout>
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-4">Roles Management</h1>
              <p className="text-gray-600">
                This is where you can manage company roles and permissions.
              </p>
            </div>
            <Button onClick={() => setOpenCreatRole(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Role
            </Button>
          </div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Roles Manage</CardTitle>
                <div className="relative w-64 hidden sm:block">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search Roles..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Permissions</TableHead>

                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.length === 0 ? (
                    loading ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center h-24 text-muted-foreground"
                        >
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : (
                      loading === false && (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center h-24 text-muted-foreground"
                          >
                            No employees found. Add one to get started.
                          </TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    data?.map((role: any) => (
                      <TableRow key={role._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-bold">{role.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {role.permissions}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  console.log("hello");
                                }}
                                className="cursor-pointer"
                              >
                                <Pencil className="mr-2 h-4 w-4" /> Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive cursor-pointer"
                                onClick={() => console.log("hello")}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
      <CreateRoles
        open={openCreatRole}
        onClose={hanldeCreteDailoagClose}
        title="Create Role For Employs"
        formik={formik}
        btnText={createRoleLoading ? "Creating Role..." : "Create Role"}
        loading={createRoleLoading}
      />
      <CreateRoles
        open={editRole?.isEdit}
        onClose={hanldeCreteDailoagClose}
        title="Edit Role For Employs"
        formik={formik}
        btnText={createRoleLoading ? "Editing Role..." : "Edit Role"}
        loading={createRoleLoading}
      />
    </>
  );
};

export default RolesPage;
