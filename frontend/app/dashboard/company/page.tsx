"use client";
import { DashboardLayout } from "@/components/layout";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, CheckCircle2, TrendingUp } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { getEmployDetailSlice } from "@/redux/reducer/employ.slice";
import { getProjectListSlice } from "@/redux/reducer/project.slice";

export default function CompanyDashboard() {
  const { currentUser, companies, users } = useStore();

  const userData: any = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const projects = useAppSelector((state) => state.projects.data);
  const employeDetils = useAppSelector((state) => state.employs.data);

  let [pandingProject, setPandingProject] = useState(0);
  let [activeProject, setActiveProject] = useState(0);
  let [completedProject, setCompletedProject] = useState(0);
  let [onHoldProject, setOnHoldProject] = useState(0);

  const router = useRouter();

  const myCompany = companies.find(
    (c) => c.id === (currentUser?.companyId as any),
  );

  useEffect(() => {
    if (userData) {
      dispatch(getEmployDetailSlice(""));
      dispatch(getProjectListSlice());
    }
  }, [userData]);

  useEffect(() => {
    if (projects) {
      setPandingProject(
        projects.filter((p: any) => p.status === "planning").length,
      );
      setActiveProject(
        projects.filter((p: any) => p.status === "active").length,
      );
      setCompletedProject(
        projects.filter((p: any) => p.status === "completed").length,
      );
      setOnHoldProject(
        projects.filter((p: any) => p.status === "on-hold").length,
      );
    }
  }, [projects]);

  const stats = [
    {
      title: "Active Projects",
      value: activeProject,
      icon: Briefcase,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Panding Projects",
      value: pandingProject,
      icon: Briefcase,
      color: "text-amber-600 bg-amber-100",
    },
    {
      title: "Completed Projects",
      value: completedProject,
      icon: CheckCircle2,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Total Employees",
      value: employeDetils.length,
      icon: Users,
      color: "text-violet-600 bg-violet-100",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          {userData?.companyName ? (
            <>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                You're now viewing the dashboard for {userData?.companyName}.
                Stay updated with the latest activity.
              </p>
            </>
          ) : (
            <>
              <Skeleton className="h-8 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/2   mb-2" />
            </>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="border-muted shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-display">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Projects Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display">Recent Projects</h2>
            <button
              onClick={() => router.push("/dashboard/company/projects")}
              className="text-sm text-primary font-medium hover:underline"
            >
              View all
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project: any) => (
              <Card
                key={project._id}
                className="cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => router.push("/dashboard/company/projects")}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <span
                      className={`text-xs px-2 py-1 rounded-full capitalize font-medium
                      ${
                        project.status === "active"
                          ? "bg-blue-100 text-blue-700"
                          : project.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex -space-x-2">
                      {project.members.map((memberId: any, i: any) => (
                        <div
                          key={i}
                          className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px]"
                        >
                          {/* In real app, look up user avatar */}U{i + 1}
                        </div>
                      ))}
                    </div>
                    <span>Due {project.dueDate || "Soon"}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
