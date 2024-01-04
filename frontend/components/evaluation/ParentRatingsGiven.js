import React from "react";
import { Badge, Button, Card, CardBody, Col, Row } from "reactstrap";
import moment from "moment";
import { t } from "i18next";
import ShowImage from "../@common/ShowImage";

const ParentRatingsGiven = ({
  getAllparentsFollowUpReport,
  showRatingDetailsHandal,
}) => {
  return (
    <Card className="border rounded-0">
      <CardBody>
        <Row className="gy-4 gx-0">
          <Col md="auto" sm="6" xs="12" className="hstack gap-3 w-md-64">
            <ShowImage
              className="avatar h-sm-14 w-sm-14 h-10 w-10 rounded-pill flex-none"
              imageName={ getAllparentsFollowUpReport[0]?.parent?.profile_image}
              width={100}
              height={100}
            />
            <h6 className="text-base">
              {`${getAllparentsFollowUpReport[0]?.parent?.first_name} ${getAllparentsFollowUpReport[0]?.parent?.last_name}`}
            </h6>
            <Badge
              className="bg-light-blue-c text-dark-blue-c text-8 p-1"
              color="none"
            >
              {t("StudentMyProfile.parent")}
            </Badge>
          </Col>
          <Col md="auto" sm="6" xs="12" className="hstack gap-3">
            <span className="text-light-blue-a">
              {t("TutorEvaluation.EvaluationDate")}
            </span>
            <h6 className="text-base font-bolder">
              {moment(getAllparentsFollowUpReport[0]?.created_at).format(
                "DD/MMM/YY"
              )}
            </h6>
          </Col>
          <Col
            md="auto"
            xs="12"
            className="hstack justify-content-md-end ms-auto"
          >
            <Button
              className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
              color
              onClick={() =>
                showRatingDetailsHandal(getAllparentsFollowUpReport, true)
              }
            >
              {t("TutorEvaluation.MyGivenReviews")}
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ParentRatingsGiven;
