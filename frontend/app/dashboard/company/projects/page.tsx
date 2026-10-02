"use client";
import { DashboardLayout } from "@/components/layout";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { getProjectListSlice } from "@/redux/reducer/project.slice";

const projectSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  description: z.string().min(10, "Description is required"),
  status: z.enum(["planning", "active", "completed", "on-hold"]),
  dueDate: z.string().optional(),
});

const CompanyProjects = () => {
  const { currentUser, users, addProject } = useStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.data);

  const myProjects = projects.filter(
    (p : any) => p.companyId === currentUser?.companyId,
  );
  const myEmployees = users.filter(
    (u) => u.companyId === currentUser?.companyId && u.role === "employee",
  );

  useEffect(() => {
    dispatch(getProjectListSlice());
  }, []);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: "planning",
    },
  });

  const onSubmit = (data: z.infer<typeof projectSchema>) => {
    addProject({
      ...data,
      companyId: currentUser?.companyId!,
      members: selectedMembers,
    });
    setIsAddOpen(false);
    form.reset();
    setSelectedMembers([]);
    toast({
      title: "Project created",
      description: `${data.name} has been created successfully.`,
    });
  };

  const toggleMember = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Projects
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage ongoing work and assignments.
            </p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 pt-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    placeholder="Website Redesign"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief details about the project..."
                    {...form.register("description")}
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      onValueChange={(val) =>
                        form.setValue("status", val as any)
                      }
                      defaultValue="planning"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      {...form.register("dueDate")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Assign Members</Label>
                  <div className="border rounded-md p-4 space-y-2 max-h-40 overflow-y-auto">
                    {myEmployees.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No employees available.
                      </p>
                    ) : (
                      myEmployees.map((employee) => (
                        <div
                          key={employee.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`member-${employee.id}`}
                            checked={selectedMembers.includes(employee.id)}
                            onCheckedChange={() => toggleMember(employee.id)}
                          />
                          <Label
                            htmlFor={`member-${employee.id}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {employee.name}{" "}
                            <span className="text-muted-foreground text-xs">
                              ({employee.title})
                            </span>
                          </Label>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Create Project
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myProjects.map((project : any) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant={
                      project.status === "active" ? "default" : "secondary"
                    }
                  >
                    {project.status}
                  </Badge>
                  {project.dueDate && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {project.dueDate}
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl">{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 mt-auto pt-4 border-t">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    {project.members.length} members assigned
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyProjects;
