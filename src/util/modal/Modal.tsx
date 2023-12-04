"use client";
import React from "react";

function Modal({
  children,
  onClickDark = () => {},
}: {
  children: React.ReactNode;
  onClickDark: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      className="z-50 bg-[rgba(0,0,0,0.5)]  w-screen h-screen fixed left-0 top-0   flex justify-center items-center"
      onClick={onClickDark}
    >
      <div>{children}</div>
    </div>
  );
}

export default Modal;
