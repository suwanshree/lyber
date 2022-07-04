import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./ProfileModal.css";

const ProfileModalContext = React.createContext();

export function ProfileModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ProfileModalContext.Provider value={value}>{children}</ProfileModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function ProfileModal({ onClose, children }) {
  const modalNode = useContext(ProfileModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="ProfileModal">
      <div id="ProfileModal-background" onClick={onClose} />
      <div id="ProfileModal-content">{children}</div>
    </div>,
    modalNode
  );
}
