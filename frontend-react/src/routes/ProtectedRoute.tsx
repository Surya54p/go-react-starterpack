import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { auth } from "../services/auth";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: Array<"admin" | "user">;
};

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  if (!auth.isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          message: "Silahkan login terlebih dahulu",
          type: "warning",
        }}
      />
    );
  }

  if (allowedRoles) {
    const role = auth.getUserRole();

    if (!role || !allowedRoles.includes(role)) {
      return (
        <Navigate
          to="/unauthorized"
          replace
          state={{
            message: "unauthorized",
            type: "warning",
          }}
        />
      );
    }
  }

  return <>{children}</>;
}
