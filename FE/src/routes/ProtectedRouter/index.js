import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin, isLoggedIn } from "../../utils/auth";

// Component bảo vệ cho Admin
export function AdminRoute({ children }) {
  const loggedIn = isLoggedIn();
  const admin = isAdmin();

  if (!loggedIn) {
    return React.createElement(Navigate, { to: "/login", replace: true });
  }

  if (!admin) {
    return React.createElement(Navigate, { to: "/player-list", replace: true });
  }

  return children;
}

// Component bảo vệ cho Member
export function MemberRoute({ children }) {
  const loggedIn = isLoggedIn();
  const admin = isAdmin();

  if (!loggedIn) {
    return React.createElement(Navigate, { to: "/login", replace: true });
  }

  if (admin) {
    return React.createElement(Navigate, {
      to: "/admin/accounts",
      replace: true,
    });
  }

  return children;
}

// Component bảo vệ chung
export function PrivateRoute({ children }) {
  const loggedIn = isLoggedIn();

  if (!loggedIn) {
    return React.createElement(Navigate, { to: "/login", replace: true });
  }

  return children;
}
