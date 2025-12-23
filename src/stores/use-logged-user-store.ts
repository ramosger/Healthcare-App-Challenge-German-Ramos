import { create } from "zustand";

export type LoggedUser = {
  email: string;
  name: string;
  initials: string;
};

type LoggedUserStoreState = {
  user: LoggedUser | null;
};

const useLoggedUserStore = create<LoggedUserStoreState>(() => {
  return {
    user: null,
  };
});

export const useLoggedUserStoreUser = () => {
  return useLoggedUserStore((s) => {
    return s.user;
  });
};

export const setLoggedUserStoreUser = (user: LoggedUser | null) => {
  return useLoggedUserStore.setState(() => {
    return { user };
  });
};

export const clearLoggedUserStore = () => {
  return useLoggedUserStore.setState(() => {
    return { user: null };
  });
};

export const getLoggedUserStoreUser = () => {
  return useLoggedUserStore.getState().user;
};
