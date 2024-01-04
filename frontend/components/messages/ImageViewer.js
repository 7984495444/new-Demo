import Image from "next/image";
import React from "react";
import { Modal, ModalBody } from "reactstrap";
import { MdClose } from "react-icons/md";

function ImageViewer({ imageUrl, onClose, isOpen }) {
  if (!isOpen) return null;

  return (
    <Modal
      contentClassName="rounded-0 position-relative"
      backdropClassName="opacity-50"
      isOpen={isOpen}
      toggle={onClose}
      centered
    >
      <MdClose
        size={20}
        className="position-absolute top-0 end-0 mt-n8 text-white cursor-pointer"
        onClick={onClose}
      />
      <ModalBody className="p-0">
        <Image
          className="w-full cursor-pointer"
          src={imageUrl}
          alt="Fullscreen Image"
          width={100}
          height={100}
          onClick={onClose}
        />
      </ModalBody>
    </Modal>
  );
}

export default ImageViewer;
