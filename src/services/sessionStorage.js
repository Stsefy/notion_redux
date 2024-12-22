import { storage } from "../constants";

export const getUser = () => {
  try {
    const user = JSON.parse(sessionStorage.getItem(storage.user));
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const saveUser = (data) => {
  sessionStorage.setItem(storage.user, JSON.stringify(data));
};

export const removeUser = () => {
  sessionStorage.setItem(storage.user, '');
};
