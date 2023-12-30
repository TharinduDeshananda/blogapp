"use client";
import { useClickAway } from "@uidotdev/usehooks";
import React, { useState } from "react";

function ContextMenu({
  children,
  onClickAway = () => {},
  wrapperItem,
}: {
  children: React.ReactNode[];
  onClickAway: (e: Event) => void;
  wrapperItem: React.ReactNode;
}) {
  const divRef = useClickAway<HTMLDivElement>(() => {
    setShowMenu(false);
  });
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className=" relative" ref={divRef} onClick={() => setShowMenu(true)}>
      {wrapperItem}
      {showMenu && (
        <div className="bg-white  rounded-md flex flex-col absolute top-full right-0 overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
}

export function ContextMenuItem({
  title = "",
  onClick = () => {},
}: {
  title?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-xs"
      onClick={onClick}
    >
      {title}
    </div>
  );
}

export default ContextMenu;
