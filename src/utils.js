import axios from "axios";

export const findItem = (array, key, value) => {
  let indx = array.findIndex((item) => item[key] === value);
  return indx >= 0 && array[indx];
};

export const convertToHours = (time, unit) => {
  switch (unit.toLowerCase()) {
    case "minutes":
      return time / 60;
    case "hours":
      return time;
    case "days":
      return time * 24;
    case "weeks":
      return time * 24 * 7;
    default:
      return time;
  }
};

export const categorizeByTimeInterval = (data, timeInterval) => {
  const intervalInHours = convertToHours(timeInterval.value, timeInterval.unit);

  const categorizedData = {};

  data.forEach((visit) => {
    const timestamp = new Date(visit.timeStamp);
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const interval =
      (Math.floor(totalMinutes / intervalInHours) * intervalInHours) / 60;

    const keyHours = Math.floor(interval);
    const keyMinutes = ((interval % 1) * 60).toString().padStart(2, "0");
    const key = `${keyHours}:${keyMinutes}`;

    if (!categorizedData[key]) {
      categorizedData[key] = [];
    }
    categorizedData[key].push(visit);
  });

  return categorizedData;
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

export const validateField = (fieldName, value, setErrors, userData) => {
  let error = "";
  switch (fieldName) {
    case "name":
      if (value.length < 3) {
        error = "Name should be at least 3 characters";
      }
      break;
    case "email":
      // Simplified email format validation for demonstration
      if (!value.includes("@")) {
        error = "Invalid email format";
      }
      break;
    case "password":
      if (!/(?=.*\d)(?=.*[a-zA-Z]).{8,}/.test(value)) {
        error = "Password should be 8 characters with numbers and letters";
      }
      break;
    case "confpassword":
      if (value !== userData.password) {
        error = "Passwords do not match";
      }
      break;
    default:
      break;
  }
  setErrors((prevErrors) => ({
    ...prevErrors,
    [fieldName]: error,
    isAnyError: error ? true : false,
  }));
};

export const quotes = [
  "Unlock endless possibilities in just a few clicks. Your link, reimagined",
  "Transforming long URLs into shorter journeys.",
  "Shorten the links, lengthen the possibilities.",
  "Small links, big impact.",
  "Empowering connections, one short link at a time.",
  "Navigate swiftly with concise links.",
  "Minimize links, maximize potential.",
  "Simplify your journey with shortened URLs.",
  "Your gateway to efficient browsing.",
  "Short URLs, limitless potential.",
];

export const isAuthenticated = () => Boolean(localStorage.getItem("token"));
