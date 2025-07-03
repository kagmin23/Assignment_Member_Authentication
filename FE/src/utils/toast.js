import { toast } from "bulma-toast";

export const showToast = (message, type = "is-success") => {
  toast({
    message,
    type,
    duration: 3000,
    position: "top-right",
    dismissible: true,
    pauseOnHover: true,
  });
};
