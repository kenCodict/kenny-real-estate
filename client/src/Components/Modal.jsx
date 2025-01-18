import React, { useEffect } from "react";

const Modal = ({ show, closeable = true, onClose, children }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (closeable && event.key === "Escape") {
        onClose();
      }
    };

    if (show) {
      document.body.style.overflow = "hidden"; // Disable background scrolling
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = ""; // Enable background scrolling
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Cleanup
    };
  }, [show, closeable, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeable ? onClose : undefined} // Close modal on backdrop click
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
