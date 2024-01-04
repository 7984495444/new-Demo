import React from "react";
import { Card, Button, Row, Col, Progress, CardBody } from "reactstrap";
import moment from "moment";
import { t } from "i18next";
import ShowNoEvlucationForMessage from "./ShowNoEvlucationForMessage";

const FollowUpRapportsCardList = ({ followUpReport, showEvaluationHandal }) => {
  return (
    <>
      {followUpReport?.followups?.length > 0 && (
        <div
          className="vstack gap-6 h-lg-calc overflow-auto"
          style={{ ["--x-h-lg"]: "274px" }}
        >
          {followUpReport?.followups?.map((val, index) => {
            return (
              <Card className="border" key={index}>
                <CardBody className="p-xl-7">
                  <Row className="gy-xl-0 gy-5">
                    <Col xxl="3" xl="3" lg="12" md="3" sm="3">
                      <span className="d-block font-bolder mb-1">
                        {moment(val?.created_at).format("DD/MMM/YY")}
                      </span>
                      <span className="d-block font-bold text-light-blue-a">
                        {t("FollowUpRapportsCardList.EvaluationDate")}
                      </span>
                    </Col>
                    <Col xxl="5" xl="5" lg="12" md="4" sm="5">
                      <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                        <span className="font-bolder">
                          {t("FollowUpRapportsCardList.ProgressTowardsGoal")}
                        </span>
                        <span className="font-bolder">
                          {val?.progress_percentage}%
                        </span>
                      </div>
                      <Progress
                        className="h-1"
                        value={val?.progress_percentage}
                        color="dark-blue-c"
                      />
                    </Col>
                    <Col
                      xs="auto"
                      className="d-xl-block d-lg-none d-md-block d-none flex-fill"
                    >
                      <hr />
                    </Col>
                    <Col
                      md="auto"
                      sm="4"
                      className="text-sm-end text-lg-start text-xl-end flex-none"
                    >
                      <Button
                        className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover text-base"
                        color
                        onClick={() => showEvaluationHandal(val)}
                      >
                        {t("Common.SeeEvaluation")}
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
      {followUpReport && followUpReport?.followups?.length === 0 && (
        <ShowNoEvlucationForMessage user={t("Common.Student")} />
      )}
    </>
  );
};

export default FollowUpRapportsCardList;
