import React, { createContext, useState, useContext, useEffect } from "react";
import { fetch } from "../utils/fetch";
import { fetchAdminData } from "../utils/adminUtils";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [basicInfo, setBasicInfo] = useState({});
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAdminData();
        setUserLoading(false);
        console.log(data.user);
        const {
          experiences,
          projects,
          email,
          heading,
          name,
          profilePic,
          profession,
          techStacks,
          subHeader,
          overView,
        } = data.user;
        setBasicInfo({
          email,
          heading,
          name,
          profession,
          profilePic,
          techStacks,
          subHeader,
          overView,
        });
        setProjects([...projects]);
        setExperiences([...experiences]);
      } catch (err) {
        console.log("Error in getting user Data", err);
      }
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        basicInfo,
        setBasicInfo,
        projects,
        setProjects,
        experiences,
        setExperiences,
        userLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
