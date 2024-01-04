import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { Badge, Button, Card, CardBody, Col, Row } from "reactstrap";
import { t } from "i18next";
import RefuseModal from "../modal/RefuseModal";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import TwinningModal from "../modal/TwinningModal";
import { useDispatch, useSelector } from "react-redux";
import ShowImage from "../@common/ShowImage";

const getAllSuggestedStudents = [
  {
    id: 1,
    total_score: 310,
    student_id: 8,
    first_name: "test",
    last_name: "student12",
    profile_image: null,
    subject_id: 1,
    subject_name_en: "Preschool French",
    subject_name_fr: "Français préscolaire",
  },
  {
    id: 2,
    total_score: 200,
    student_id: 21,
    first_name: "cann",
    last_name: "student5",
    profile_image: null,
    subject_id: 1,
    subject_name_en: "Preschool French",
    subject_name_fr: "Français préscolaire",
  },
  {
    id: 3,
    total_score: 360,
    student_id: 6,
    first_name: "test",
    last_name: "student1",
    profile_image: null,
    subject_id: 19,
    subject_name_en: "French",
    subject_name_fr: "Français",
  },
  {
    id: 4,
    total_score: 335,
    student_id: 18,
    first_name: "cann",
    last_name: "student2",
    profile_image: null,
    subject_id: 19,
    subject_name_en: "French",
    subject_name_fr: "Français",
  },
  {
    id: 5,
    total_score: 170,
    student_id: 20,
    first_name: "cann",
    last_name: "student4",
    profile_image: null,
    subject_id: 19,
    subject_name_en: "French",
    subject_name_fr: "Français",
  },
  {
    id: 6,
    total_score: 160,
    student_id: 19,
    first_name: "cann",
    last_name: "student3",
    profile_image: null,
    subject_id: 19,
    subject_name_en: "French",
    subject_name_fr: "Français",
  },
  {
    id: 7,
    total_score: 160,
    student_id: 23,
    first_name: "denn",
    last_name: "student2",
    profile_image: null,
    subject_id: 19,
    subject_name_en: "French",
    subject_name_fr: "Français",
  },
  {
    id: 8,
    total_score: 160,
    student_id: 24,
    first_name: "denn",
    last_name: "student3",
    profile_image: null,
    subject_id: 19,
    subject_name_en: "French",
    subject_name_fr: "Français",
  },
  {
    id: 9,
    total_score: 160,
    student_id: 25,
    first_name: "denn",
    last_name: "student4",
    profile_image: null,
    subject_id: 19,
    subject_name_en: "French",
    subject_name_fr: "Français",
  },
  {
    id: 10,
    total_score: 160,
    student_id: 27,
    first_name: "denn",
    last_name: "student6",
    profile_image: null,
    subject_id: 19,
    subject_name_en: "French",
    subject_name_fr: "Français",
  },
];

const SuggestedStudentList = () => {
  const dispatch = useDispatch();

  const [showRefuseModal, setShowRefuseModal] = useState(false);
  const [refuseModalInfo, setRefuseModalInfo] = useState(null);
  const [showSuggestedStudentAcceptModal, setShowSuggestedStudentAcceptModal] =
    useState(false);
  const [suggestedStudentAcceptModalInfo, setSuggestedStudentAcceptModalInfo] =
    useState(null);

  // show accept modal handal
  const showSuggestedStudentAcceptHandal = (val) => {
    // if (val) {
    //   dispatch(getSuggestedStudentByIdAction(val?.student_id, val?.subject_id));
    // }
    setSuggestedStudentAcceptModalInfo(val);
    setShowSuggestedStudentAcceptModal(!showSuggestedStudentAcceptModal);
  };

  const { getSuggestedStudentsDetailsById } = useSelector(
    (state) => state.tutor
  );

  // show refuse modal handal
  const showRefuseModalHandal = (val) => {
    setRefuseModalInfo(val);
    setShowRefuseModal(!showRefuseModal);
  };

  return (
    <>
      <div className="me-n4 mb-8">
        <Swiper spaceBetween={12} slidesPerView={"auto"}>
          {getAllSuggestedStudents?.map((val, index) => {
            return (
              <SwiperSlide className="w-72" key={index}>
                <Card className="border border-2 border-light-blue-c">
                  <CardBody className="py-4 px-5">
                    <Row className="gy-4">
                      <Col xs="8" className="hstack gap-2">
                        <ShowImage
                          className="avatar avatar-xs rounded-circle bg-light-blue-a flex-none"
                          imageName={val?.profile_image}
                          width={100}
                          height={100}
                        />
                        <span>{`${val?.first_name} ${val?.last_name}`}</span>
                      </Col>
                      <Col xs="4" className="text-end">
                        <Badge
                          className="bg-light-blue-c text-dark-blue-c text-sm badge-text-break"
                          color="none"
                        >
                          {subjectTranslationHandle(val)}
                        </Badge>
                      </Col>
                      <Col xs="12">
                        <p className="text-light-blue-a text-10">
                          {`${val?.first_name} ${val?.last_name} ${t(
                            "TutorStudentDashboard.Needs"
                          )} ${subjectTranslationHandle(val)} ${t(
                            "TutorStudentDashboard.TutoringAt"
                          )}`}
                        </p>
                        <p className="text-light-blue-a text-10 font-bold">
                          Lundi - 10h30, Mardi - 13h00 et Vendredi - 17h00.
                        </p>
                      </Col>
                      <Col xs="12" className="d-flex gap-2">
                        <Button
                          color="dark-blue-c"
                          size="sm"
                          onClick={() => showSuggestedStudentAcceptHandal(val)}
                        >
                          {t("TutorStudentDashboard.AcceptBtn")}
                        </Button>
                        <Button
                          color="dark-blue-c"
                          size="sm"
                          outline
                          onClick={() => showRefuseModalHandal(val)}
                        >
                          {t("TutorStudentDashboard.RefuseBtn")}
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {showRefuseModal && (
        <RefuseModal
          show={showRefuseModal}
          hide={() => showRefuseModalHandal()}
          refuseModalInfo={refuseModalInfo}
        />
      )}
      {showSuggestedStudentAcceptModal && (
        // getSuggestedStudentsDetailsById &&
        <TwinningModal
          show={showSuggestedStudentAcceptModal}
          hide={() => showSuggestedStudentAcceptHandal()}
          refuseModalInfo={suggestedStudentAcceptModalInfo}
          getSuggestedStudentsDetailsById={getSuggestedStudentsDetailsById}
        />
      )}
    </>
  );
};

export default SuggestedStudentList;
