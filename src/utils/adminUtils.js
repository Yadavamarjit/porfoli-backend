import { fetch } from "./fetch";

export const fetchAdminData = async () => {
  try {
    return await fetch("GET", "user/admin");
  } catch (err) {
    console.error("Error while fetching admin data", err);
  }
};
