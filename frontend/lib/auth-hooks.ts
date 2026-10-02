import { createContext, useContext, ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { useStore, User, Role } from "./store";

// Helper hook to protect routes
export function useRequireAuth(allowedRoles: Role[] = []) {
  const user = useStore(state => state.currentUser);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!user) {
      setLocation("/auth/login");
    } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // Redirect to correct dashboard if wrong role
      if (user.role === 'company_admin') setLocation("/dashboard/company");
      else setLocation("/dashboard/employee");
    }
  }, [user, location, setLocation, allowedRoles]);

  return user;
}

// Redirect if already logged in
export function useRedirectIfAuthenticated() {
  const user = useStore(state => state.currentUser);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (user) {
      if (user.role === 'company_admin') setLocation("/dashboard/company");
      else setLocation("/dashboard/employee");
    }
  }, [user, location, setLocation]);
}
