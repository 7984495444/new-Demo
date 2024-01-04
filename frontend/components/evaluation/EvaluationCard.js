import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { t } from "i18next";
import { subjectTranslationHandle } from "../../utils/subjectTranslationFuncationsn";
import { ShowImage } from "../index";
const EvaluationCard = ({
  getAllparentStudentFollowUpReport,
  showEvaluationHandal,
}) => {
  return (
    <Card className="border rounded-0">
      <CardBody>
        <Row className="align-items-center">
          <Col xs="7" className="hstack gap-3">
            <ShowImage
              className="avatar h-sm-14 w-sm-14 h-10 w-10 rounded-pill flex-none"
              imageName={getAllparentStudentFollowUpReport?.profile_image}
              width={100}
              height={100}
            />
            <div>
              <h6 className="text-base mb-1">
                {`${getAllparentStudentFollowUpReport?.first_name} ${getAllparentStudentFollowUpReport?.last_name}`}
              </h6>
              <span className="text-light-blue-a ">
                {getAllparentStudentFollowUpReport?.subjects?.map(
                  (val, index) => {
                    return (
                      <span key={index}>
                        {index === 0 ? "" : " - "}{" "}
                        {subjectTranslationHandle(val)}
                      </span>
                    );
                  }
                )}
              </span>
            </div>
          </Col>
          <Col xs="5" className="text-end">
            <Button
              className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover "
              color
              onClick={() =>
                showEvaluationHandal(getAllparentStudentFollowUpReport, false)
              }
              disabled={
                getAllparentStudentFollowUpReport?.subjects?.length > 0
                  ? false
                  : true
              }
            >
              {t("Common.ViewReviews")}
            </Button>
          </Col>
        </Row>
        {/* <Row className="gy-4">
          <Col lg="3" sm="3" xs="12">
            <span className="text-light-blue-a">N. de séances</span>
            <h6 className="text-base font-bolder mt-1">
              {getAllparentStudentFollowUpReport?.confirm_sessions}/
              {getAllparentStudentFollowUpReport?.total_session}
            </h6>
          </Col>
          <Col lg="4" sm="4" xs="12">
            <span className="text-light-blue-a">Date de l’évaluation</span>
            <h6 className="text-base font-bolder mt-1">
              {getAllparentStudentFollowUpReport?.date_of_assessment
                ? moment(
                    getAllparentStudentFollowUpReport?.date_of_assessment
                  ).format("DD/MMM/YY")
                : "-"}
            </h6>
          </Col>
          <Col lg="5" sm="5" xs="12">
            <span className="text-light-blue-a">
              Progression vers l’objectif
            </span>
            <div className="d-flex align-items-center gap-3">
              <Progress
                style={{
                  height: "4px",
                }}
                className="flex-fill"
                value={getAllparentStudentFollowUpReport?.progress_percentage}
                color="dark-blue-c"
              />
              <span className="font-bolder w-12 flex-none">
                {getAllparentStudentFollowUpReport?.progress_percentage} %
              </span>
            </div>
          </Col>
        </Row> */}
      </CardBody>
    </Card>
  );
};
export default EvaluationCard;
