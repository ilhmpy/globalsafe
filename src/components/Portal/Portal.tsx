import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export const Portal: React.FC = ({ children }) => {
  const targetElem = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(targetElem);
    return () => {
      document.body.removeChild(targetElem);
    };
  }, [targetElem]);

  return createPortal(children, targetElem);
};
