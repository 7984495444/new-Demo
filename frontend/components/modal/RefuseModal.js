import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  FormFeedback,
  FormGroup,
} from "reactstrap";
import { t } from "i18next";
import Select from "react-dropdown-select";
import CloseIconInModal from "../@common/CloseIconInModal";

function RefuseModal({ show, hide }) {
  // this modal Proposed twinning modal in tutor student in open
  const [refuseInfo, setRefuseInfo] = useState({});
  const [showAdditionalDetailsField, setShowAdditionalDetailsField] =
    useState(false);

  const onChangeHandle = (field, value) => {
    if (value === 5) {
      setShowAdditionalDetailsField(true);
    } else {
      setShowAdditionalDetailsField(false);
      setRefuseInfo({
        ...refuseInfo,
        [field]: value,
      });
    }
  };

  const options = [
    { value: 1, label: `Je ne veux plus de nouveaux élèves pour l'instant` },
    { value: 2, label: `Je ne peux pas enseigner les matières demandées` },
    {
      value: 3,
      label: `Je ne peux pas répondre aux difficultés d'apprentissage de cet élève`,
    },
    {
      value: 4,
      label: `Je ne pense pas pouvoir répondre aux besoins généraux de cet élève`,
    },
    { value: 5, label: `Autre raison (précisez)` },
  ];

  return (
    <Modal
      isOpen={show}
      toggle={hide}
      centered={true}
      style={{ ["--x-modal-width"]: "354px" }}
    >
      <ModalHeader
        className="pb-2"
        toggle={hide}
        close={<CloseIconInModal hide={() => hide()} />}
        tag="h6"
      >
        <span className="text-base">{t("RefuseModal.Refuse")}</span>
      </ModalHeader>
      <ModalBody className="pt-2">
        <FormGroup>
          <Label className="mb-2">{t("RefuseModal.Header")}</Label>
          <Select
            className="react-dropdown-select-customization px-0 select-light-blue-plain-text"
            searchable={false}
            options={options}
            placeholder="Sélectionnez une raison"
            dropdownGap={0}
            color="#005B88"
            style={{
              borderBottom: "1px solid #D0DCE7",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              boxShadow: "none",
              borderRadius: "0",
            }}
            onChange={([e]) => onChangeHandle("raison", e.value)}
          />
          <FormFeedback>{t("RefuseModal.Feedback")}</FormFeedback>
        </FormGroup>
        {showAdditionalDetailsField && (
          <FormGroup className="mt-6">
            <Label>{t("RefuseModal.AddNotes")}</Label>
            <Input
              className="custom-input-1 border-light-blue-b resize-none cursor-auto"
              placeholder={t("RefuseModal.AddNotesPlaceholder")}
              type="textarea"
              rows="5"
            />
            <FormFeedback>{t("RefuseModal.Feedback")}</FormFeedback>
          </FormGroup>
        )}
        <Button color="dark-blue-c" className="mt-6">
          {t("RefuseModal.RefuseBtn")}
        </Button>
      </ModalBody>
    </Modal>
  );
}
export default RefuseModal;
