// ============================================================
// AuthGuard — Protects all authenticated routes.
// Redirects to /login if the user is not authenticated.
// ============================================================

import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface Props {
  children: ReactNode;
}

export function AuthGuard({ children }: Props) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Preserve the intended destination so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
