import { Dispatch, createContext } from "react";
export type UserContextType = {
  userName?: string;
  email?: string;
  profileImgUrl?: string;
};

export enum UserAction {
  SAVE_CONTEXT = "SAVE_CONTEXT",
  UPDATE_CONTEXT = "UPDATE_CONTEXT",
  REMOVE_CONTEXT = "REMOVE_CONTEXT",
}

export type UserContextActionType = {
  type: UserAction;
  payload?: UserContextType;
};

export const userReducer = (
  state: UserContextType = {
    email: "",
    profileImgUrl: "",
    userName: "",
  },
  action: UserContextActionType
) => {
  switch (action.type) {
    case UserAction.SAVE_CONTEXT:
      return action.payload;
    case UserAction.UPDATE_CONTEXT:
      return { ...state, ...action.payload };
    case UserAction.REMOVE_CONTEXT:
      return {};
    default:
      return state;
  }
};

const UserContext = createContext<
  [UserContextType, Dispatch<UserContextActionType>]
>([] as unknown as [UserContextType, Dispatch<UserContextActionType>]);

export default UserContext;
