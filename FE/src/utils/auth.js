export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.isAdmin === true;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
