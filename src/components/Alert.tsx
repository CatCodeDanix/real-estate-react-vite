import { useState } from "react";

const Alert = ({
  text,
  type,
  extraClass,
  handleClose,
}: {
  text: string;
  type: "success" | "danger";
  extraClass?: string;
  handleClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  function alertCloseHandler() {
    setIsOpen(false);
    handleClose();
  }

  return isOpen ? (
    <div
      className={` fixed bottom-5 m-2 w-fit rounded-xl ${type === "success" ? "bg-emerald-400/50" : "bg-red-400/50"} px-4 py-2 ${extraClass}`}
    >
      <button onClick={alertCloseHandler} className="m-1 align-middle text-3xl">
        &times;
      </button>
      <span className="ps-1 align-middle">{text}</span>
    </div>
  ) : null;
};

export default Alert;
