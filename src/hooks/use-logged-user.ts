import { useMemo } from "react";

import { useLoggedUserStoreUser } from "@/stores";
import { getInitials } from "@/utils";

export const useLoggedUser = () => {
  const user = useLoggedUserStoreUser();

  return useMemo(() => {
    if (!user) {
      return { email: "", initials: "", name: "" };
    }

    const email = user.email.trim();
    const name = user.name.trim();

    return {
      email,
      name,
      initials: user.initials || getInitials(name, email),
    };
  }, [user]);
};
