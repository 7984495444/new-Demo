import moment from "moment";
import React from "react";
import { Rating } from "react-simple-star-rating";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { t } from "i18next";
import ShowNoEvlucationForMessage from "./ShowNoEvlucationForMessage";

const RatingReceivedCardList = ({
  getAllStudentFollowUp,
  showEvaluationHandal,
}) => {
  return (
    <>
      {getAllStudentFollowUp?.followups?.length > 0 && (
        <div
          className="vstack gap-6 h-lg-calc overflow-auto"
          style={{ ["--x-h-lg"]: "276px" }}
        >
          {getAllStudentFollowUp?.followups?.map((val, index) => {
            return (
              <Card className="border" key={index}>
                <CardBody>
                  <Row className="gy-xl-0 gy-5">
                    <Col xxl="3" xl="3" lg="6" md="3" sm="4" xs="7">
                      <span className="d-block font-bolder mb-1">
                        {moment(val.created_at).format("DD/MMM/YY")}
                      </span>
                      <span className="d-block font-bold text-light-blue-a">
                        {t("FollowUpRapportsCardList.EvaluationDate")}
                      </span>
                    </Col>
                    <Col xxl="2" xl="3" lg="6" md="4" sm="4" xs="5">
                      <Rating
                        size={20}
                        fillColor="#FECA36"
                        emptyColor="#D9D9D9"
                        className="mb-1"
                        allowFraction={true}
                        iconsCount={5}
                        initialValue={val?.star_rating}
                        readonly
                        transition
                        label
                      />
                      <h6 className="text-base">{t("Common.Evaluation")}</h6>
                    </Col>
                    <Col
                      xl="auto"
                      lg="auto"
                      md="auto"
                      className="d-xl-block d-lg-none d-md-block d-none flex-fill"
                    >
                      <hr />
                    </Col>
                    <Col
                      xxl="3"
                      xl="4"
                      lg="12"
                      md="3"
                      sm="4"
                      xs="12"
                      className="hstack justify-content-sm-end justify-content-lg-start justify-content-xl-end"
                    >
                      <Button
                        className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
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
      {getAllStudentFollowUp &&
        getAllStudentFollowUp?.followups?.length === 0 && (
          <ShowNoEvlucationForMessage user={t("Common.Student")} />
        )}
    </>
  );
};

export default RatingReceivedCardList;
