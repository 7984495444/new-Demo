import { Category, Like1, Profile } from "iconsax-react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { t } from "i18next";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import ShowImage from "../@common/ShowImage";

function MyStudentCard({
  getAllparentStudentFollowUpReport,
  sessionHistotyShowHandal,
  showStudentProfileHandal,
  showFollowUpReportHandal,
}) {
  return (
    <Card className="border border-light-b rounded-0">
      <CardBody>
        <Row className="gy-lg-0 gy-6">
          <Col md="3" className="hstack gap-3">
            <ShowImage
              className="avatar h-sm-14 w-sm-14 h-10 w-10 rounded-pill flex-none"
              imageName={getAllparentStudentFollowUpReport?.profile_image}
              width={100}
              height={100}
            />
            <div>
              <h5 className="text-base mb-1">
                {`${getAllparentStudentFollowUpReport?.first_name} ${getAllparentStudentFollowUpReport?.last_name}`}
              </h5>
              <p className="text-light-blue-a text-10">
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
              </p>
            </div>
          </Col>
          <Col
            md="9"
            className="d-flex align-items-center flex-wrap justify-content-md-end gap-3"
          >
            <Button
              color="dark-blue-c"
              size="sm"
              className="py-3"
              onClick={() =>
                sessionHistotyShowHandal(getAllparentStudentFollowUpReport)
              }
            >
              <Category className="me-1" size="14" />
              {t("MyStudent.SessionHistoryBtn")}
            </Button>
            <Button
              color="dark-blue-c"
              size="sm"
              className="py-3"
              onClick={() =>
                showStudentProfileHandal(getAllparentStudentFollowUpReport)
              }
            >
              <Profile className="me-1" size="16" />{" "}
              {t("MyStudent.ViewEditProfileBtn")}
            </Button>
            <Button
              color="dark-blue-c"
              size="sm"
              className="py-3"
              onClick={() =>
                showFollowUpReportHandal(getAllparentStudentFollowUpReport)
              }
              disabled={
                getAllparentStudentFollowUpReport?.subjects?.length > 0
                  ? false
                  : true
              }
            >
              <Like1 className="me-1" size="16" />{" "}
              {t("MyStudent.FollowupReportBtn")}
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
export default MyStudentCard;
