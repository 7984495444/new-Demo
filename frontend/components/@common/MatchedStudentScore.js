import React from "react";
import {
  Badge,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import CloseIconInModal from "./CloseIconInModal";
import { ArrowRight } from "iconsax-react";
import { studentPointes } from "@/utils/data";
import { t } from "i18next";

const MatchedStudentScore = ({ show, hide, scoreModleInfo }) => {
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
        <span className="text-base">
          {t("MatchAllStudents.ShowStudentScore")}
        </span>
      </ModalHeader>
      <ModalBody className="pt-4">
        <div className="py-6 border-top">
          <Row className="gx-0 text-Bold">
            {studentPointes?.map((val, index) => {
              return (
                <>
                  <Col xs="8" className="my-2">
                    <div className="d-flex flex-wrap">
                      <Badge
                        className="bg-secondary text-white me-1"
                        color="none"
                      >
                        {t(val.lable)}
                      </Badge>
                    </div>
                  </Col>
                  <Col className="d-flex align-items-end justify-content-center pb-2 my-2">
                    <ArrowRight className="text-dark-blue-c" size={16} />
                  </Col>
                  <Col xs="2" className="my-2">
                    <div className="d-flex flex-wrap">
                      <Badge
                        className="bg-light-blue-c text-dark-blue-c w-16 me-1"
                        color="none"
                      >
                        {scoreModleInfo[val?.name]}
                      </Badge>
                    </div>
                  </Col>
                </>
              );
            })}
          </Row>
        </div>
        <div className="border-top d-flex justify-content-between pt-6">
          <p className="text-18">{t("MatchAllStudents.Total")}</p>
          <Badge
            className="bg-light-blue-c text-dark-blue-c w-16 text-18"
            color="none"
          >
            {scoreModleInfo?.total_score}
          </Badge>
        </div>
      </ModalBody>
      <ModalFooter className="gap-2 justify-content-start px-6 pt-1">
        <Button color="dark-blue-c text-center" onClick={() => hide()}>
          {t("MatchAllStudents.Close")}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MatchedStudentScore;
