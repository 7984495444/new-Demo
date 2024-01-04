import { Card, CardBody, Badge, Row, Col, Button } from "reactstrap";
import { t } from "i18next";
import { Like1, Message2, Profile } from "iconsax-react";
import { useRouter } from "next/router.js";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import ShowImage from "../@common/ShowImage";

const TutorCard = ({
  isParent,
  getStudentTutorDetails,
  handleClickMessageUser,
  redirectTutorProfileHandle,
}) => {
  const router = useRouter();

  const redirectEvluactionPageHandale = (val) => {
    router.push(
      {
        pathname: "/evaluations",
        query: {
          isStudentDashboard: true,
        },
      },
      "/evaluations"
    );
  };

  return (
    <>
      {getStudentTutorDetails &&
        getStudentTutorDetails?.map((val, index) => {
          return (
            <Card className="border" key={index}>
              <CardBody className="p-3">
                <Row className="gx-0 mb-5">
                  <Col xs="9" className="hstack gap-3">
                    <ShowImage
                      className="avatar avatar-sm rounded-pill"
                      imageName={val?.tutor_profile_image}
                      width={68}
                      height={68}
                    />
                    <span>
                      {val?.tutor_first_name}{" "}
                      {val?.tutor_last_name.slice(0, 1).toUpperCase()}.
                    </span>
                  </Col>
                  <Col xs="3" className="text-end">
                    <Button
                      color="none"
                      size="sm"
                      className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover btn-square"
                      onClick={() =>
                        handleClickMessageUser(val?.tutor_id, true)
                      }
                    >
                      <Message2 size={22} />
                    </Button>
                  </Col>
                </Row>
                {val?.subjects?.map((item, i) => {
                  return (
                    <Row className="gx-2 align-items-center" key={i}>
                      <Col xxl="4" xl="4" lg="4" md="4" xs="5">
                        <span className="text-light-blue-a">
                          {t("ParentDashboard.Material")}
                        </span>
                      </Col>
                      <Col xxl="4" xl="2" lg="2" md="2" xs="2">
                        <hr />
                      </Col>
                      <Col
                        xxl="4"
                        xl="6"
                        lg="6"
                        md="6"
                        xs="5"
                        className="text-sm-start text-end"
                      >
                        <Badge
                          color="none"
                          className="bg-light-blue-c text-dark-blue-c text-8 p-1"
                        >
                          {/* {item?.subject_name} */}
                          {subjectTranslationHandle(item)}
                        </Badge>
                      </Col>
                    </Row>
                  );
                })}
                {isParent && (
                  <Row className="gx-2 mt-2 align-items-center">
                    <Col xxl="4" xl="4" lg="4" md="4" xs="5">
                      <span className="text-light-blue-a">
                        {t("ParentDashboard.Student")}
                      </span>
                    </Col>
                    <Col xxl="4" xl="2" lg="2" md="2" xs="2">
                      <hr />
                    </Col>
                    <Col
                      xxl="4"
                      xl="6"
                      lg="6"
                      md="6"
                      xs="5"
                      className="hstack gap-3 justify-content-end justify-content-sm-start"
                    >
                      <ShowImage
                        className="avatar avatar-sm rounded-pill d-none"
                        imageName={val?.student_profile_image}
                        width={68}
                        height={68}
                      />
                      <span className="text-truncate">
                        {`${val?.student_first_name} ${val?.student_last_name
                          .slice(0, 1)
                          .toUpperCase()}.`}
                      </span>
                    </Col>
                  </Row>
                )}
                <Row className="mt-4 gx-2 gy-2">
                  <Col xs="auto" className="flex-fill">
                    <Button
                      color="dark-blue-c"
                      className="w-full d-flex align-items-center justify-content-center"
                      onClick={() => redirectTutorProfileHandle(val)}
                    >
                      <Profile size={20} className="me-2" />
                      <span>{t("ParentDashboard.ViewProfile")}</span>
                    </Button>
                  </Col>
                  <Col xs="auto" className="flex-fill">
                    <Button
                      color="outline-dark-blue-c"
                      className="w-full d-flex align-items-center justify-content-center"
                      onClick={() => redirectEvluactionPageHandale(val)}
                    >
                      <Like1 size={20} className="me-2" />
                      <span>{t("ParentDashboard.Rate")}</span>
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          );
        })}
    </>
  );
};

export default TutorCard;
