import React from "react";
import {
  CompleteSessionDownloadDocHandal,
  SessionShowCalender,
} from "@/components";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { ArrowCircleDown2, ArrowLeft, Document } from "iconsax-react";
import { t } from "i18next";
import moment from "moment";
import { ShowSessionDetails } from "../../..";
const SessionDetail = ({
  showStudentProfileHandal,
  sessionHistotyShowHandal,
  historyInfo,
  studentInfo,
  isStudentRole,
}) => {
  return (
    <Card>
      <CardBody className="py-10">
        <div className="d-flex gap-3 mb-4 position-lg-absolute top-lg-0 start-lg-0 mt-lg-n10 w-full">
          <span className="cursor-pointer">
            <ArrowLeft size={18} onClick={sessionHistotyShowHandal} />
          </span>
          <Breadcrumb>
            <BreadcrumbItem
              onClick={showStudentProfileHandal}
              className="cursor-pointer"
            >
              <a href={() => false}>
                {isStudentRole
                  ? t("SessionDetail.Header")
                  : t("SessionDetail.MyStudent")}
              </a>
            </BreadcrumbItem>
            <BreadcrumbItem
              onClick={sessionHistotyShowHandal}
              className="cursor-pointer"
            >
              <a href={() => false}>{t("SessionDetail.SessionHistory")}</a>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              {moment(historyInfo?.session_date).format("DD/MMM/YY")}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Row className="gx-lg-20 gy-10">
          <Col lg="">
            <ShowSessionDetails historyInfo={historyInfo} />
          </Col>
          <Col
            lg="auto"
            className="w-lg-96 vstack flex-none border-start-lg min-h-lg-calc"
            style={{ ["--x-h-lg"]: "226px" }}
          >
            <SessionShowCalender
              studentInfo={studentInfo}
              historyInfo={historyInfo}
              isStudentRole={isStudentRole}
            />
          </Col>
          <Col xs="12">
            <div className="d-flex flex-wrap">
              {historyInfo?.document_name && (
                <div className="me-10 mb-5">
                  <h6 className="text-base font-bolder mb-4">
                    {t("SessionDetail.Documents")}
                  </h6>
                  <div className="d-flex flex-wrap gap-4">
                    <Card
                      className="w-56 border-dark-blue-c"
                      style={{ ["--x-card-bg"]: "#E3E7EE" }}
                    >
                      <CardBody className="px-3 py-4">
                        <Row>
                          <Col xs="9" className="hstack gap-2">
                            <Document
                              size="20"
                              className="text-dark-blue-c flex-none"
                            />
                            <span className="d-block text-truncate">
                              {historyInfo?.document_name}
                            </span>
                          </Col>
                          <Col xs="3" className="text-end">
                            <Button color="none" size="sm" className="p-0">
                              <ArrowCircleDown2
                                size="20"
                                className="text-dark-blue-c"
                                onClick={() =>
                                  CompleteSessionDownloadDocHandal(
                                    historyInfo?.document_name
                                  )
                                }
                              />
                            </Button>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              )}
              {historyInfo?.session_recording && (
                <div>
                  <h6 className="text-base font-bolder mb-4">
                    {t("SessionDetail.ReviewTheSession")}
                  </h6>
                  <div className="d-flex flex-wrap gap-4">
                    <Card
                      className="w-56 border-dark-blue-c"
                      style={{ ["--x-card-bg"]: "#E3E7EE" }}
                    >
                      <CardBody className="px-3 py-4 cursor-pointer">
                        <Row>
                          <Col xs="9" className="hstack gap-2">
                            <Document
                              size="20"
                              className="text-dark-blue-c flex-none"
                            />
                            <span className="d-block text-truncate">
                              {historyInfo?.session_recording}
                            </span>
                          </Col>
                          <Col xs="3" className="text-end">
                            <Button
                              color="none"
                              size="sm"
                              className="p-0"
                              onClick={() =>
                                window.open(
                                  historyInfo?.session_recording,
                                  "_blank"
                                )
                              }
                            >
                              <ArrowCircleDown2
                                size="20"
                                className="text-dark-blue-c"
                              />
                            </Button>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SessionDetail;
