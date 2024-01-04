import React from "react";
import { SessionShowCalender, ShowImage } from "@/components";
import {
  Card,
  CardBody,
  Row,
  Col,
  Badge,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  List,
} from "reactstrap";
import { ArrowLeft, Category, Like1, Message2 } from "iconsax-react";
import { useState } from "react";
import SessionHistory from "./SessionHistory";
import { t } from "i18next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import StudentForEvlucation from "./StudentForEvlucation";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";

const StudentProfile = ({ showStudentProfileHandal, studentInfo }) => {
  const dispatch = useDispatch();

  const [sessionHistotyShow, setSessionHistotyShow] = useState(false);
  const [tutorMyProfileShow, setTutorMyProfileShow] = useState(false);
  const router = useRouter();

  const sessionHistotyShowHandal = () => {
    setSessionHistotyShow(!sessionHistotyShow);
  };

  const tutorMyProfileShowHandal = () => {
    setTutorMyProfileShow(!tutorMyProfileShow);
  };

  const handleClickMessageUser = async (data) => {
    router.push({
      pathname: "/messages",
      query: {
        id: data?.student_id,
        first_name: data?.student_first_name,
        last_name: data?.student_last_name,
        profile_image: data?.student_profile_image,
      },
    });
  };

  return (
    <>
      {sessionHistotyShow ? (
        <SessionHistory
          sessionHistotyShowHandal={() => sessionHistotyShowHandal()}
          studentInfo={studentInfo}
        />
      ) : tutorMyProfileShow ? (
        <StudentForEvlucation
          showStudentProfileHandal={showStudentProfileHandal}
          studentInfo={studentInfo}
        />
      ) : (
        <Card>
          <CardBody>
            <div className="d-flex gap-3 mb-4 position-lg-absolute top-lg-0 start-lg-0 mt-lg-n10 w-full">
              <span className="cursor-pointer">
                <ArrowLeft size={18} onClick={showStudentProfileHandal} />
              </span>
              <Breadcrumb>
                <BreadcrumbItem
                  onClick={showStudentProfileHandal}
                  className="cursor-pointer"
                >
                  <a href={() => false}>{t("MyStudentProfile.MyStudentBtn")}</a>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <Row className="gx-lg-20 gy-10">
              <Col lg="" className="border-end-lg">
                <Row className="mb-lg-12 mb-6 gy-4">
                  <Col xs="auto">
                    <ShowImage
                      className="avatar w-xs-12 h-xs-12 w-lg-18 h-lg-18 rounded-circle"
                      imageName={studentInfo?.student_profile_image}
                      width={68}
                      height={68}
                    />
                  </Col>
                  <Col
                    xs="auto"
                    className="d-flex gap-2 flex-column align-items-start"
                  >
                    <h6>{`${studentInfo?.student_first_name} ${studentInfo?.student_last_name}`}</h6>
                    <Badge
                      color="none"
                      className="bg-light-blue-c text-dark-blue-a"
                    >
                      {subjectTranslationHandle(studentInfo)}
                    </Badge>
                  </Col>
                  <Col xs="auto" className="ms-auto">
                    <Button
                      color="dark-blue-c"
                      onClick={() => handleClickMessageUser(studentInfo)}
                      outline
                    >
                      <Message2 />
                      <span className="ms-2 d-sm-inline-block d-none">
                        Parler à Avril
                      </span>
                    </Button>
                  </Col>
                </Row>
                <Row className="gy-6 mb-10">
                  <Col sm="6">
                    <h6 className="font-bold text-base mb-5">
                      {t("MyStudentProfile.Likes")}
                    </h6>
                    <Row xs="2">
                      <Col>
                        <List className="ps-4 text-light-blue-a">
                          <li>Languages</li>
                          <li>Folk Music</li>
                          <li>Netflix shows</li>
                          <li>Dancing</li>
                        </List>
                      </Col>
                      <Col>
                        <List className="ps-4 text-light-blue-a">
                          <li>Languages</li>
                          <li>Folk Music</li>
                          <li>Netflix shows</li>
                          <li>Dancing</li>
                        </List>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm="6">
                    <h6 className="font-bold text-base mb-5">
                      {t("MyStudentProfile.Dislikes")}
                    </h6>
                    <Row>
                      <Col>
                        <List className="ps-4 text-light-blue-a">
                          <li>Numbers</li>
                          <li>Going to the market</li>
                          <li>Going to the gym</li>
                          <li>Cooking</li>
                        </List>
                      </Col>
                      <Col>
                        <List className="ps-4 text-light-blue-a">
                          <li>Numbers</li>
                          <li>Going to the market</li>
                          <li>Going to the gym</li>
                          <li>Cooking</li>
                        </List>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <h6 className="font-bold text-base mb-5">
                  {t("MyStudentProfile.point")}
                </h6>
                <div className="d-flex flex-wrap gap-3">
                  <Badge
                    color="none"
                    className="bg-light-blue-c text-dark-blue-a"
                  >
                    Logic
                  </Badge>
                  <Badge
                    color="none"
                    className="bg-light-blue-c text-dark-blue-a"
                  >
                    Concentration
                  </Badge>
                  <Badge
                    color="none"
                    className="bg-light-blue-c text-dark-blue-a"
                  >
                    Abstract picturing
                  </Badge>
                  <Badge
                    color="none"
                    className="bg-light-blue-c text-dark-blue-a"
                  >
                    Concentration
                  </Badge>
                  <Badge
                    color="none"
                    className="bg-light-blue-c text-dark-blue-a"
                  >
                    Abstract picturing
                  </Badge>
                  <Badge
                    color="none"
                    className="bg-light-blue-c text-dark-blue-a"
                  >
                    Focus
                  </Badge>
                  <Badge
                    color="none"
                    className="bg-light-blue-c text-dark-blue-a"
                  >
                    Positive reinforcement
                  </Badge>
                  <Badge
                    color="none"
                    className="bg-light-blue-c text-dark-blue-a"
                  >
                    Basics review
                  </Badge>
                  <Badge
                    color="none"
                    className="bg-light-blue-c text-dark-blue-a"
                  >
                    Focus
                  </Badge>
                  <Badge
                    color="none"
                    className="bg-light-blue-c text-dark-blue-a"
                  >
                    Positive reinforcement
                  </Badge>
                  <Badge
                    color="none"
                    className="bg-light-blue-c text-dark-blue-a"
                  >
                    Basics review
                  </Badge>
                </div>
                <hr className="mt-lg-20 mt-12 mb-8" />
                <div className="d-flex flex-wrap gap-5">
                  <Button
                    color="dark-blue-c"
                    onClick={sessionHistotyShowHandal}
                    size="sm"
                    className="py-3"
                  >
                    <Category className="me-2" size="20" /> Historique des
                    séances
                  </Button>
                  <Button
                    color="dark-blue-c"
                    onClick={tutorMyProfileShowHandal}
                    size="sm"
                    className="py-3"
                  >
                    <Like1 className="me-2" size="20" /> Faire un rapport de
                    suivi
                  </Button>
                </div>
                <hr className="mt-8 mb-0" />
              </Col>
              <Col lg="auto" className="w-lg-96 vstack flex-none">
                <SessionShowCalender
                  studentInfo={studentInfo}
                  historyInfo={null}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default StudentProfile;
