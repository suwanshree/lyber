import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";

function SignupModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="signup-button" onClick={() => setShowModal(true)}>
        <i id="nav-icons" class="fa-solid fa-user-plus"></i>
        <p id="nav-text">Sign Up</p>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupModal;
