"use client";
import React, { useReducer } from "react";
import UserContext, { userReducer } from "./UserContext";

function UserContextWrapper({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, {});
  return (
    <UserContext.Provider
      value={[
        state ?? {
          email: "",
          profileImgUrl: "",
          userName: "",
        },
        dispatch,
      ]}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextWrapper;
