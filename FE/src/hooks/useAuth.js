import { isAdmin, isLoggedIn } from "../utils/auth";

export const useAuth = () => {
  return {
    isLoggedIn: isLoggedIn(),
    isAdmin: isAdmin()
  };
};