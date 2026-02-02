import { ReactNode, useEffect } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  onCloseModal: () => void;
}
export default function Modal({ onCloseModal, children }: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onCloseModal();
  };

  useEffect(() => {
    const handleEscapePress = (e: KeyboardEvent) => {
      if (e.code === "Escape") onCloseModal();
    };

    document.addEventListener("keydown", handleEscapePress);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscapePress);
      document.body.style.overflow = "";
    };
  });

  return createPortal(
    <div onClick={handleBackdropClick} className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
