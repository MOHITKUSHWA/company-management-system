import { Link, useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Settings,
  LogOut,
  CheckSquare,
  Menu,
  UserRoundCog,
} from "lucide-react";
import { useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { getDetails, setLogOut } from "@/redux/reducer/auth.slice";
import { deleteCookie, getCookie } from "cookies-next";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Skeleton } from "./ui/skeleton";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();

  const userData: any = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDetails({}));
  }, []);

  const handleLogout = () => {
    deleteCookie("token");
    dispatch(setLogOut());
    setTimeout(() => router.push("/auth/login"), 1000);
  };

  const companyLinks = [
    { href: "/dashboard/company", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/company/employees", label: "Employees", icon: Users },
    { href: "/dashboard/company/roles", label: "Roles", icon: UserRoundCog  },
    { href: "/dashboard/company/projects", label: "Projects", icon: Briefcase },
    {
      href: "/dashboard/company/profile",
      label: "Company Profile",
      icon: Settings,
    },
  ];

  const employeeLinks = [
    { href: "/dashboard/employee", label: "My Work", icon: LayoutDashboard },
    {
      href: "/dashboard/employee/projects",
      label: "Projects",
      icon: Briefcase,
    },
    { href: "/dashboard/employee/tasks", label: "My Tasks", icon: CheckSquare },
    {
      href: "/dashboard/employee/profile",
      label: "My Profile",
      icon: Settings,
    },
  ];

  const links = companyLinks;
  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-4 py-6">
      <div className="px-6 flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
          P
        </div>
        <span className="font-display font-bold text-xl">ProManage</span>
      </div>
      <div className="flex-1 px-4 mt-6">
        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathName === link.href;
            return (
              <div
                className="cursor-pointer"
                key={link.href}
                onClick={() => router.push(link.href)}
              >
                <a
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </a>
              </div>
            );
          })}
        </nav>
      </div>
      <div className="px-4 mt-auto">
        {}
        <div className="mb-4 px-3 py-3 rounded-lg bg-muted/50 border flex items-center gap-3">
          {userData?.profileImage || userData?.companyName ? (
            <Avatar className="h-8 w-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
              <AvatarImage src={userData?.profileImage} className="h-full w-full rounded-full cursor-pointer" />
              <AvatarFallback className="text-xl ">
                {userData?.companyName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Skeleton className="h-8 w-8 rounded-full" />
          )}

          <div className="flex-1 overflow-hidden">
            {userData?.companyName ? (
              <p className="text-sm font-medium truncate">{userData?.companyName}</p>
            ) : (
              <Skeleton className="h-2 w-1/3 mb-1" />
            )}
            {userData?.role ? (
              <p className="text-xs text-muted-foreground truncate capitalize">
                {userData?.role}
              </p>
            ) : userData?.companyName ? (
              <p className="text-xs text-muted-foreground truncate">Company</p>
            ) : (
              <Skeleton className="h-3 w-1/2" />
            )}
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 left-4 z-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-5xl mx-auto p-6 md:p-10 pt-16 md:pt-10 animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
