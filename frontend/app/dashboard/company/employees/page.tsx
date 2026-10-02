"use client";
import { DashboardLayout } from "@/components/layout";
import { useStore, User } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import {
  createEmploySlice,
  deleteEmploySlice,
  editEmploySlice,
  getEmployDetailSlice,
  setCreateEmployData,
  setDeleteEmployData,
  setEditEmployData,
} from "@/redux/reducer/employ.slice";
import CreateAndEditEmployees from "@/components/employees/createEmployees";
import { useFormik } from "formik";
import DeleteAccount from "@/components/auth/delete_Account";
import { createEmploySchema } from "@/utils/validation/employ.validation";

interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  title?: string;
  _id: string;
  avatar: string;
}

interface CreateEmployeeStatusInterface {
  success: boolean;
  data:
    | {
        message: string;
      }
    | undefined;
  loading: boolean;
  error: any;
}

interface deleteEmployeeInterface {
  _id: string;
  status: boolean;
}

const CompnayEmployees = () => {
  const [createEmployeeOpen, setCreateEmployeeOpen] = useState(false);

  const [editEmployeeOpen, setEditEmployeeOpen] = useState({
    status: false,
    id: "",
  });
  const [deleteteEmployeeId, setDeleteEmployeeId] =
    useState<deleteEmployeeInterface | null>({
      _id: "",
      status: false,
    });

  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const employeDetils = useAppSelector((state) => state.employs.data);

  const loading = useAppSelector((state) => state.employs.loading);

  const createEmployStatus: any = useAppSelector(
    (state) => state.employs.create,
  );

  const editEmployStatus: any = useAppSelector((state) => state.employs.edit);

  const deleteEmployStatus: any = useAppSelector(
    (state) => state.employs.delete,
  );

  useEffect(() => {
    dispatch(getEmployDetailSlice(""));
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      title: "",
    },
    enableReinitialize: true,
    validationSchema: createEmploySchema,
    onSubmit: (values) => {
      if (editEmployeeOpen.status) {
        dispatch(editEmploySlice({ id: editEmployeeOpen.id, data: values }));
      } else {
        dispatch(createEmploySlice(values));
      }
    },
  });

  useEffect(() => {
    if (createEmployStatus.success) {
      dispatch(getEmployDetailSlice(""));
      toast({
        title: "Employee Added",
        description: "The employee has been added to the company.",
      });
      handleCloseDailog();
      dispatch(setCreateEmployData());
    } else if (createEmployStatus.error) {
      dispatch(setCreateEmployData());
      toast({
        title: "Error",
        description:
          (createEmployStatus.data.message as string) ||
          "Failed to add employee.",
        variant: "destructive",
      });
    }
  }, [createEmployStatus.success]);

  useEffect(() => {
    if (editEmployStatus.success) {
      dispatch(getEmployDetailSlice(""));
      toast({
        title: "Employee Updated",
        description: "The employee details have been updated.",
      });
      dispatch(setEditEmployData());
      handleEditDailogClose();
    } else if (editEmployStatus.error) {
      dispatch(setEditEmployData());
      toast({
        title: "Error",
        description:
          (editEmployStatus.data.message as string) ||
          "Failed to update employee details.",
        variant: "destructive",
      });
    }
  }, [editEmployStatus.success]);

  useEffect(() => {
    if (deleteEmployStatus.success) {
      dispatch(getEmployDetailSlice(""));
      toast({
        title: "Employee Deleted",
        description: "The employee has been removed from the company.",
      });
      dispatch(setDeleteEmployData());
      handleDeleteDailogClose();
    } else if (deleteEmployStatus.error) {
      toast({
        title: "Error",
        description:
          (deleteEmployStatus.data.message as string) ||
          "Failed to delete employee.",
        variant: "destructive",
      });
      dispatch(setDeleteEmployData());
    }
  }, [deleteEmployStatus.success]);

  const handleCreateDailog = () => {
    setCreateEmployeeOpen(true);
  };

  const handleCloseDailog = () => {
    formik.resetForm();
    setCreateEmployeeOpen(false);
  };

  const handleEditDailogOpen = (id: string) => {
    let employee: any = employeDetils.find((e: Employee) => e._id === id);
    if (employee) {
      const selectedRole = employee?.role || employee?.title || "";
      formik.setValues({
        firstName: employee?.firstName,
        lastName: employee?.lastName,
        email: employee?.email,
        title: selectedRole,
      });
    }

    setEditEmployeeOpen({
      status: true,
      id: id,
    });
  };

  const handleEditDailogClose = () => {
    setEditEmployeeOpen({
      status: false,
      id: "",
    });
    formik.resetForm();
  };

  const handleDelete = (id: string | undefined) => {
    setDeleteEmployeeId({
      _id: id as string,
      status: true,
    });
  };

  const handleDeleteDailogClose = () => {
    setDeleteEmployeeId({
      _id: "",
      status: false,
    });
  };

  const handleConfirmDelete = () => {
    dispatch(deleteEmploySlice(deleteteEmployeeId?._id as string));
  };

  return (
    <>
      <CreateAndEditEmployees
        isAddOpen={createEmployeeOpen}
        handleClose={handleCloseDailog}
        formik={formik}
        loading={createEmployStatus.loading}
      />
      <CreateAndEditEmployees
        isAddOpen={editEmployeeOpen?.status as boolean}
        handleClose={handleEditDailogClose}
        formik={formik}
        loading={editEmployStatus.loading}
        title="Edit Old Employee"
        submitBtnText="Edit Employee"
      />
      <DeleteAccount
        open={deleteteEmployeeId?.status as boolean}
        handleClose={handleDeleteDailogClose}
        handleDeleteAccount={handleConfirmDelete}
        loading={deleteEmployStatus.loading}
        title="Delete Employee"
        description="Are you sure you want to delete this employee? This action cannot be undone and all associated data will be permanently removed."
        btn="Delete Employee"
      />
      <DashboardLayout>
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Employees
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your team members and their roles.
              </p>
            </div>
            <Button onClick={() => handleCreateDailog()}>
              <Plus className="mr-2 h-4 w-4" /> Add Employee
            </Button>
          </div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                <div className="relative w-64 hidden sm:block">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search employees..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeDetils.length === 0 ? (
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
                    employeDetils?.map((employee: Employee) => (
                      <TableRow key={employee._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={employee.avatar} />
                              <AvatarFallback>
                                {employee.firstName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-bold">
                                {employee.firstName + " " + employee.lastName}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {employee.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {employee.role || employee.title || "Team Member"}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
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
                                onClick={() =>
                                  handleEditDailogOpen(employee._id)
                                }
                                className="cursor-pointer"
                              >
                                <Pencil className="mr-2 h-4 w-4" /> Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive cursor-pointer"
                                onClick={() => handleDelete(employee._id)}
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
    </>
  );
};

export default CompnayEmployees;
