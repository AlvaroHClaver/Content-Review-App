import { createContext, useState } from "react";
export const ProjContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [Id, setId] = useState("");

  return (
    <ProjContext.Provider value={{ Id, setId }}>
      {children}
    </ProjContext.Provider>
  );
};
