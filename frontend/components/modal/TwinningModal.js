import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Badge,
  Row,
  Col,
  ModalFooter,
} from "reactstrap";
import { t } from "i18next";
import CloseIconInModal from "../@common/CloseIconInModal";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import ShowImage from "../@common/ShowImage";

const getSuggestedStudentsDetailsById = {
  id: 8,
  first_name: "test",
  last_name: "student12",
  profile_image: null,
  support: false,
  subject_name_en: "Preschool French",
  subject_name_fr: "Français préscolaire",
  school_level_en: "Kindergarten",
  school_level_fr: "Maternelle",
  student_availability: [
    {
      monday: ["06:30 to 07:30"],
    },
    {
      tuesday: ["07:30 to 09:30"],
    },
  ],
  frequency: 1,
  school_name: "",
  difficulties: [
    "dyslexia",
    "dyscalculia",
    "dysortographie",
    "attention_deficit",
  ],
};

function TwinningModal({
  show,
  hide,
  refuseModalInfo,
  // getSuggestedStudentsDetailsById,
}) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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
        {t("TwinningModal.Twinning")}
      </ModalHeader>
      <ModalBody className="pt-2">
        <div className="border px-5 py-4 rounded-2 mb-10">
          <Row>
            <Col xs="8">
              <ShowImage
                className="avatar h-8 w-8 rounded-circle me-1"
                imageName={getSuggestedStudentsDetailsById?.profile_image}
                width={100}
                height={100}
              />
              <span className="ps-2">{`${getSuggestedStudentsDetailsById?.first_name} ${getSuggestedStudentsDetailsById?.last_name}`}</span>
            </Col>
            <Col xs="4" className="text-end">
              <Badge
                className="bg-light-blue-c text-dark-blue-c badge-text-break"
                color="none"
              >
                {subjectTranslationHandle(getSuggestedStudentsDetailsById)}
              </Badge>
            </Col>
          </Row>
        </div>

        <p className="mb-3">{t("TwinningModal.ProgramSupport")}</p>
        <ul className="point-list text-light-blue-a ps-0">
          <li>Retravailler les notions abordées en classe.</li>
          <li>Consolider les apprentissages.</li>
          <li>Prévenir les retards scolaires.</li>
        </ul>
        <hr />
        <div className="mb-5">
          <p className="mb-3">{t("TwinningModal.SubjectGradeLevel")}</p>
          <Badge
            className="bg-light-blue-c text-dark-blue-c badge-text-break"
            color="none"
          >
            Français préscolaire — Secondaire 2
          </Badge>
        </div>

        <div className="mb-5">
          <p className="mb-3">{t("TwinningModal.ProposedSchedule")}</p>
          <div className="d-flex flex-wrap gap-2 border rounded-2 p-2">
            <Badge
              className="bg-light-blue-c text-dark-blue-c badge-text-break flex-none"
              color="none"
            >
              Lundi
            </Badge>
            <Badge
              className="bg-light-blue-c text-dark-blue-c badge-text-break flex-none"
              color="none"
            >
              18h00
            </Badge>
            <Badge
              className="bg-light-blue-c text-dark-blue-c badge-text-break flex-none"
              color="none"
            >
              Durée: 1h30
            </Badge>
          </div>
        </div>
        <Row>
          <Col>
            <p className="">{t("TwinningModal.Frequency")}</p>
          </Col>
          <Col>
            <p className="text-light-blue-a">Hebdomadaire</p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p className="">{t("TwinningModal.SchoolName")}</p>
            <p className="text-light-blue-a">Northfield High School</p>
          </Col>
          <Col>
            <p className="">{t("TwinningModal.Language")}</p>
            <p className="text-light-blue-a">English, French, Spanish</p>
          </Col>
        </Row>
        <hr />
        <div>
          <p className="mb-3">{t("TwinningModal.Situation")}</p>
          <div className="d-flex flex-wrap gap-2">
            <Badge
              className="bg-light-blue-c text-dark-blue-c badge-text-break flex-none"
              color="none"
            >
              Dyslexie
            </Badge>
            <Badge
              className="bg-light-blue-c text-dark-blue-c badge-text-break flex-none"
              color="none"
            >
              Je suis médicamenté
            </Badge>
            <Badge
              className="bg-light-blue-c text-dark-blue-c badge-text-break flex-none"
              color="none"
            >
              J’ai un rapport d’évaluation / Plan d’intervention
            </Badge>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="justify-content-start pb-6 px-6 gap-2 pt-2">
        <Button color="dark-blue-c">{t("TwinningModal.Accept")}</Button>
        <Button color="dark-blue-c" outline>
          {t("TwinningModal.Refuse")}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export default TwinningModal;
