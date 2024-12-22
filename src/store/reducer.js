import { removeUser, saveUser } from "../services/sessionStorage";
import { SAVE_USER, REMOVE_USER } from "./actionTypes";

const initialState = {
  user: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_USER: {
      saveUser(action.payload);
      return { ...state, user: action.payload };
    }
    case REMOVE_USER: {
      removeUser();
      return { ...state, user: null };
    }
    default:
      return state;
  }
}
