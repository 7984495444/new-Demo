import React from "react";
import { MdClose } from "react-icons/md";
import { Button } from "reactstrap";

const CloseIconInModal = ({ hide }) => {
  return (
    <Button
      color="none"
      className="text-light-blue-a shadow-none border-0 p-0"
      onClick={hide}
    >
      <MdClose size="14" />
    </Button>
  );
};

export default CloseIconInModal;
