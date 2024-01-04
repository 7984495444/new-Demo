import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { ArrowLeft } from "iconsax-react";
import Router from "next/router.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllFollowUpReportWithDetailsAction } from "@/redux/actions/followUpAction.js";
import SeeEvaluation from "./SeeEvaluation";
import {
  FollowUpReportLoading,
  RatingReceivedDetails,
  RatingReceivedCardList,
} from "@/components";
import ShowSelectStudentAndSubject from "@/components/evaluation/ShowSelectStudentAndSubject";
import { t } from "i18next";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";

const TutorForRatingsReceivedDetail = ({
  showRatingDetailsHandal,
  showRatingDetailsInfo,
  userData,
  getAllparentSubjectDetails,
  student1,
  selectedStudent1,
}) => {
  const dispatch = useDispatch();
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [seeEvaluationInfo, setSeeEvaluationInfo] = useState(null);
  const [subjectBtn, setSubjectBtn] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(selectedStudent1);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [student, setStudent] = useState(student1);
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    subjectHanadal(0, selectedStudent?.value);
  }, []);

  useEffect(() => {
    for (let index = 0; index < subjectBtn?.length; index++) {
      const element = subjectBtn[index];
      if (element?.active === true) {
        let filed = {
          tutor_id: element?.tutor_id,
          student_id: selectedStudent?.value,
          student_subject_id: element?.ts_subject_id,
        };
        dispatch(getAllFollowUpReportWithDetailsAction(filed)); // first tab get all parent followup details
      }
    }
  }, [subjectBtn, selectedStudent]);

  const { getAllParentFollowUpReportWithDetails } = useSelector(
    (state) => state.followUp
  );

  const showEvaluationHandal = (val) => {
    setSeeEvaluationInfo(val);
    setShowEvaluation(!showEvaluation);
  };

  // change student handal
  const changeStudetHandal = (stud) => {
    setSelectedStudent(stud);
    subjectHanadal(0, stud?.value);
  };

  // set subject wise follwups
  const setBtnWiseFollowpHandal = (index) => {
    subjectHanadal(index, selectedStudent?.value);
  };

  // set subject active
  const subjectHanadal = (i, id) => {
    let studentSubject = getAllparentSubjectDetails?.filter(
      (val) => val?.student_id === id
    );
    let temp = [];
    let sub = [];
    if (studentSubject) {
      for (
        let index = 0;
        index < studentSubject[0]?.subjects?.length;
        index++
      ) {
        const element = studentSubject[0]?.subjects[index];
        if (index === i) {
          setSelectedSubject({
            value: index,
            label: subjectTranslationHandle(element),
          });
          temp.push({
            ...element,
            active: true,
          });
        } else {
          temp.push({
            ...element,
            active: false,
          });
          sub.push({
            value: index,
            label: subjectTranslationHandle(element),
          });
        }
      }
    }
    setSubject(sub);
    setSubjectBtn(temp);
  };

  const evaluationForTutor = () => {
    let data = subjectBtn?.filter((val) => val?.active === true);
    Router.push(
      {
        pathname: "/student-parent-evaluations",
        query: {
          student: selectedStudent.value,
          parent: userData?.id,
          tutor: data[0]?.tutor_id,
          subject: data[0]?.ts_subject_id,
          tutor_name: getAllParentFollowUpReportWithDetails?.first_name,
          tutor_last_name: getAllParentFollowUpReportWithDetails?.last_name,
          isParent: true,
        },
      },
      "/student-parent-evaluations"
    );
    // Router.push("/student-parent-evaluations");
  };

  return (
    <>
      {showEvaluation ? (
        <SeeEvaluation
          showFollowUpReportHandal={showRatingDetailsHandal}
          showEvaluationHandal={() => showEvaluationHandal()}
          showRatingDetailsInfo={getAllParentFollowUpReportWithDetails}
          seeEvaluationInfo={seeEvaluationInfo}
          isparent={true}
        />
      ) : (
        <Card>
          <CardBody className="py-8">
            <div className="d-flex gap-3 mb-4 position-lg-absolute top-lg-0 start-lg-0 mt-lg-n10 w-full">
              <span className="cursor-pointer">
                <ArrowLeft
                  size={18}
                  onClick={() => showRatingDetailsHandal(null)}
                />
              </span>
              <Breadcrumb className="">
                <BreadcrumbItem
                  className="cursor-pointer"
                  onClick={() => showRatingDetailsHandal(null)}
                >
                  {t("Header.Ratings")}
                </BreadcrumbItem>
                <BreadcrumbItem> {t("Common.RatingsData")}</BreadcrumbItem>
              </Breadcrumb>
            </div>
            {getAllParentFollowUpReportWithDetails ? (
              <Row className="gx-lg-12 gy-lg-0 gy-10 position-relative overlap-20">
                <Col lg="auto" className="w-lg-80 border-end-lg sticky-lg-top">
                  <RatingReceivedDetails
                    isStudent={false}
                    userDetails={getAllParentFollowUpReportWithDetails}
                    getAllStudentFollowUp={
                      getAllParentFollowUpReportWithDetails
                    }
                    isMyparent={true}
                  />
                  <Button
                    color="dark-blue-c"
                    className="mt-6"
                    onClick={() => evaluationForTutor()}
                  >
                    {`${t("StudentEvaluation.Assess")} ${
                      getAllParentFollowUpReportWithDetails?.first_name
                    } ${getAllParentFollowUpReportWithDetails?.last_name}`}
                  </Button>
                </Col>
                <Col>
                  <Row className="gx-0 gy-4 mb-7 position-relative overlap-30">
                    <Col sm="" className="hstack">
                      <h6>
                        {t("Common.RatingsData")} (
                        {getAllParentFollowUpReportWithDetails?.followups
                          ?.length || 0}
                        )
                      </h6>
                    </Col>
                    <Col className="hstack justify-content-end">
                      <div className="d-flex">
                        <div className="me-4">
                          <ShowSelectStudentAndSubject
                            userData={student}
                            selected={selectedStudent}
                            changeStudetHandal={(e) => changeStudetHandal(e)}
                            isStudent={true}
                          />
                        </div>
                        {subjectBtn?.length <= 2 ? (
                          <>
                            {subjectBtn?.map((val, index) => {
                              let active = val?.active;
                              return (
                                <Button
                                  key={index}
                                  type="button"
                                  color={`${
                                    active ? "orange" : "light-blue-a"
                                  }`}
                                  outline={active ? false : true}
                                  className="me-4"
                                  onClick={() => setBtnWiseFollowpHandal(index)}
                                >
                                  {subjectTranslationHandle(val)}
                                </Button>
                              );
                            })}
                          </>
                        ) : (
                          <ShowSelectStudentAndSubject
                            userData={subject}
                            selected={selectedSubject}
                            changeStudetHandal={(e) =>
                              setBtnWiseFollowpHandal(e.value)
                            }
                            isStudent={false}
                          />
                        )}
                      </div>
                    </Col>
                  </Row>
                  <RatingReceivedCardList
                    getAllStudentFollowUp={
                      getAllParentFollowUpReportWithDetails
                    }
                    showEvaluationHandal={(e) => showEvaluationHandal(e)}
                  />
                </Col>
              </Row>
            ) : (
              <FollowUpReportLoading />
            )}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default TutorForRatingsReceivedDetail;
