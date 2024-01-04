import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Trash } from "iconsax-react";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { deletePaymentCardAction } from "@/redux/actions/paymentAction";
import CloseIconInModal from "../@common/CloseIconInModal";

function DeletePaymentCardModal({ show, hide }) {
  const dispatch = useDispatch();

  const deletePaymentCardHandle = () => {
    dispatch(deletePaymentCardAction());
    hide();
  };
  return (
    <>
      <Modal
        isOpen={show}
        toggle={hide}
        centered={true}
        style={{ ["--x-modal-width"]: "354px" }}
      >
        <ModalHeader
          className="pb-4"
          toggle={hide}
          close={<CloseIconInModal hide={() => hide()} />}
          tag="h6"
        >
          <Trash className="me-3" />
          {t("DeletePaymentCardModal.Header")}
        </ModalHeader>
        <ModalBody className="pt-4">
          <p>{t("DeletePaymentCardModal.ConfromText")}</p>
        </ModalBody>
        <ModalFooter className="px-5 pt-3 pb-5 d-block border-0 ">
          <Button
            style={{ backgroundColor: "#FDE4E4" }}
            className="font-bolder text-red me-3"
            onClick={deletePaymentCardHandle}
          >
            {t("DeletePaymentCardModal.DeleteBtn")}
          </Button>
          <Button
            color="dark-blue-c"
            className="font-bolder"
            onClick={() => hide()}
          >
            {t("DeletePaymentCardModal.CancelBtn")}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default DeletePaymentCardModal;
