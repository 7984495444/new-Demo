import React from "react";
import { CompleteSessionDownloadDocHandal } from "../document/CompleteSessionDownloadDoc";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { ArrowCircleDown2, Document, DocumentText, Minus } from "iconsax-react";
import { t } from "i18next";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import { ShowImage } from "../index";

const CompleteSessionDocuments = ({ allDocuments }) => {
  return (
    <>
      <Card>
        <CardHeader className="pb-2 px-lg-5">
          <Row>
            <Col>
              <p className="text-sm">{t("StudentCalendar.Todo")}</p>
            </Col>
            <Col></Col>
          </Row>
        </CardHeader>
        <CardBody
          className="pt-2 px-lg-5 h-lg-calc vstack gap-8 overflow-y-lg-auto"
          style={{ ["--xallStudentAndParent-h-lg"]: "200px" }}
        >
          {allDocuments &&
            allDocuments?.map((val, index) => {
              return (
                <div key={index}>
                  <div className="d-flex align-items-start gap-3 mb-2">
                    <span className="h-50px w-50px rounded-2 icon-wrapper wrapper-orange flex-none">
                      <DocumentText size="22" className="icon-main" />
                    </span>
                    <div>
                      <p className="text-sm mb-1 text-truncate w-48">
                        {t("StudentCalendar.NextMeeting")}
                      </p>
                      <div className="hstack gap-2 text-light-blue-a">
                        <span className="w-16 text-truncate">
                          {subjectTranslationHandle(val?.session_subject_id)}
                          {/* {val?.session_subject_id?.subject_name} */}
                        </span>
                        <Minus />
                        <div className="hstack gap-1">
                          <ShowImage
                            className="avatar h-5 w-5 rounded-circle"
                            imageName={val?.user?.profile_image}
                            width={68}
                            height={68}
                          />
                          <span className="d-inline-block w-16 text-truncate">
                            {val?.user?.first_name}{" "}
                            {val?.user?.last_name.slice(0, 1).toUpperCase()}.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {val?.complate_session?.next_meeting_summary !== "null" && (
                    <p className="text-light-blue-a">
                      {val?.complate_session?.next_meeting_summary}
                    </p>
                  )}
                  {val?.complate_session?.document_name && (
                    <Card
                      className="border-dark-blue-c mt-5"
                      style={{ ["--x-card-bg"]: "#E3E7EE" }}
                    >
                      <CardBody className="px-3 py-4">
                        <Row>
                          <Col xs="8" className="hstack gap-2">
                            <Document
                              size="20"
                              className="text-dark-blue-c flex-none"
                            />
                            <span className="d-block text-truncate">
                              {val?.complate_session?.document_name}
                            </span>
                          </Col>
                          <Col xs="4" className="text-end">
                            <Button
                              color="none"
                              size="sm"
                              className="p-0"
                              onClick={() =>
                                CompleteSessionDownloadDocHandal(
                                  val?.complate_session?.document_name
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
                  )}
                </div>
              );
            })}
        </CardBody>
      </Card>
    </>
  );
};

export default CompleteSessionDocuments;
