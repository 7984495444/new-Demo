import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import CloseIconInModal from "../@common/CloseIconInModal";

function CertificateModal({ show, hide, certificateImage }) {
  return (
    <Modal
      isOpen={show}
      toggle={hide}
      centered={true}
      style={{ ["--x-modal-width"]: "354px" }}
    >
      <ModalHeader
        className="pb-0 pt-4"
        toggle={hide}
        close={<CloseIconInModal hide={() => hide()} />}
        tag="h6"
      >
        <span className="text-base">Documents</span>
      </ModalHeader>
      <ModalBody className="pt-4">
        <Image
          className="w-full"
          src={`${process.env.NEXT_PUBLIC_API_URL}/tutor_document/image/${certificateImage}`}
          width={200}
          height={200}
          alt="User Image "
        />
      </ModalBody>
    </Modal>
  );
}
export default CertificateModal;
