import { createContext } from "react";

const AuthContext = createContext({
  token: "",
  setToken: (v: string) => {},
});

export default AuthContext;
