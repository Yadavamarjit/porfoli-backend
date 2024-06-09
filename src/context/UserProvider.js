import React, { createContext, useState, useContext } from "react";
import { fetchAdminData } from "../utils/adminUtils";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [basicInfo, setBasicInfo] = useState({});
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [visitors, setVisitors] = useState([]);

  const getBasicInfo = async () => {
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
        messages,
        visitors: allVisitors,
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
      setMessages([...messages]);
      setVisitors(allVisitors);
    } catch (err) {
      console.log("Error in getting user Data", err);
    }
  };

  // useEffect(() => {}, []);

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
        messages,
        getBasicInfo,
        visitors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
