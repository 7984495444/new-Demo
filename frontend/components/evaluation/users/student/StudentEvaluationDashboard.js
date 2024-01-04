import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Card,
  CardBody,
  Button,
  Row,
  Col,
} from "reactstrap";
import {
  FollowUpRapportDetails,
  FollowUpRapportsCardList,
  FollowUpReportLoading,
  PaginationComponent,
  RatingReceivedCardList,
  RatingReceivedDetails,
} from "@/components";
import SeeEvaluation from "./firstTabEvaluation/SeeEvaluation";
import SeeSecondTabEvaluation from "./secondTabEvaluation/SeeEvaluation";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStudentSubjectDetailsAction,
  getAllStudentFollowUpReportWithDetailsAction,
  getAllTutorFollowUpReportWithDetailsAction,
} from "@/redux/actions/followUpAction";
import Router, { useRouter } from "next/router.js";
import { t } from "i18next";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";

const StudentEvaluationDashboard = ({ userData }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Toggle active state for Tab
  const [currentActiveTab, setCurrentActiveTab] = useState(
    router?.query?.isStudentDashboard ? "AssessmentsData" : "FollowUpReport"
  );
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showEvaluationSecondTab, setShowEvaluationSecondTab] = useState(false);
  const [seeEvaluationInfo, setSeeEvaluationInfo] = useState(null);
  const [subjectBtn, setSubjectBtn] = useState([]);

  useEffect(() => {
    dispatch(getAllStudentSubjectDetailsAction(userData?.id)); // get student subject
  }, []);

  const { getAllStudentSubjectDetails } = useSelector(
    (state) => state.followUp
  );

  useEffect(() => {
    if (getAllStudentSubjectDetails?.length > 0) {
      let temp = [];
      for (let index = 0; index < getAllStudentSubjectDetails.length; index++) {
        const element = getAllStudentSubjectDetails[index];
        if (index === 0) {
          temp.push({
            ...element,
            active: true,
          });
        } else {
          temp.push({
            ...element,
            active: false,
          });
        }
      }
      setSubjectBtn(temp);
    }
  }, [getAllStudentSubjectDetails, currentActiveTab]);

  // ******************* first tab **************************
  useEffect(() => {
    for (let index = 0; index < subjectBtn.length; index++) {
      const element = subjectBtn[index];
      if (element?.active === true) {
        dispatch(getAllStudentFollowUpReportWithDetailsAction(element)); // first tab get all student followup details
      }
    }
  }, [subjectBtn]);

  const { getAllStudentFollowUpReportWithDetails } = useSelector(
    (state) => state.followUp
  );

  // ******************* second tab **************************
  useEffect(() => {
    for (let index = 0; index < subjectBtn.length; index++) {
      const element = subjectBtn[index];
      if (element?.active === true) {
        dispatch(getAllTutorFollowUpReportWithDetailsAction(element)); // first tab get all student followup details
      }
    }
  }, [subjectBtn]);

  const { getAllTutorFollowUpReportWithDetails } = useSelector(
    (state) => state.followUp
  );

  const showEvaluationHandal = (val) => {
    setShowEvaluation(!showEvaluation);
    setSeeEvaluationInfo(val);
  };

  const showSecondTabEvaluationHandal = (val) => {
    setShowEvaluationSecondTab(!showEvaluationSecondTab);
    setSeeEvaluationInfo(val);
  };

  // set subject wise follwups
  const setBtnWiseFollowpHandal = (id) => {
    let temp = [];
    for (let index = 0; index < getAllStudentSubjectDetails.length; index++) {
      const element = getAllStudentSubjectDetails[index];
      if (index === id) {
        temp.push({
          ...element,
          active: true,
        });
      } else {
        temp.push({
          ...element,
          active: false,
        });
      }
    }
    setSubjectBtn(temp);
  };

  const evaluationForTutor = () => {
    let data = subjectBtn?.filter((val) => val?.active === true);
    Router.push(
      {
        pathname: "/student-parent-evaluations",
        query: {
          student: data[0]?.student_id,
          tutor: data[0]?.tutor_id,
          subject: data[0]?.student_subject_id,
          tutor_name: getAllTutorFollowUpReportWithDetails?.first_name,
          tutor_last_name: getAllTutorFollowUpReportWithDetails?.last_name,
          isParent: false,
        },
      },
      "/student-parent-evaluations"
    );
  };

  return (
    <>
      {showEvaluation ? (
        <SeeEvaluation
          showEvaluationHandal={() => showEvaluationHandal()}
          seeEvaluationInfo={seeEvaluationInfo}
          seeEvaluationDetailsInfo={getAllStudentFollowUpReportWithDetails}
        />
      ) : showEvaluationSecondTab ? (
        <SeeSecondTabEvaluation
          showEvaluationHandal={() => showSecondTabEvaluationHandal()}
          seeEvaluationInfo={seeEvaluationInfo}
          seeEvaluationDetailsInfo={getAllTutorFollowUpReportWithDetails}
        />
      ) : (
        <Card>
          <CardBody className="nav-tab-custom">
            <Nav className="gap-4 pb-8">
              <NavItem>
                <Link
                  className={`tab-link ${
                    currentActiveTab === "FollowUpReport" ? "active" : ""
                  }`}
                  onClick={() => {
                    toggle("FollowUpReport");
                  }}
                  href=""
                >
                  {t("StudentEvaluation.FollowUpReport")}
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  className={`tab-link ${
                    currentActiveTab === "AssessmentsData" ? "active" : ""
                  }`}
                  onClick={() => {
                    toggle("AssessmentsData");
                  }}
                  href=""
                >
                  {t("StudentEvaluation.EvaluationsData")}
                </Link>
              </NavItem>
              {/* this code commented becouse of this task https://app.asana.com/0/0/1206121875617271/f */}
              {/* <NavItem>
                <Link
                  className={`tab-link ${
                    currentActiveTab === "SelfEvaluations" ? "active" : ""
                  }`}
                  onClick={() => {
                    toggle("SelfEvaluations");
                  }}
                  href=""

                >
                  {t("StudentEvaluation.SelfEvaluation")}
                </Link>
              </NavItem> */}
            </Nav>
            <TabContent activeTab={currentActiveTab}>
              {/* First Tab */}
              <TabPane tabId="FollowUpReport">
                {getAllStudentFollowUpReportWithDetails ? (
                  <Row className="gx-lg-12 gy-lg-0 gy-10">
                    <Col lg="auto" className="w-lg-80 border-end-lg">
                      <FollowUpRapportDetails
                        userDetails={getAllStudentFollowUpReportWithDetails}
                        isStudent={true}
                      />
                    </Col>
                    <Col>
                      <Row className="gy-6 mb-7">
                        <Col sm="4" className="hstack">
                          <h6>
                            {t("StudentEvaluation.FollowUpReports")} (
                            {getAllStudentFollowUpReportWithDetails?.followups
                              ?.length || 0}
                            )
                          </h6>
                        </Col>
                        <Col
                          sm="8"
                          className="hstack gap-2 justify-content-end"
                        >
                          <div className="d-flex flex-nowrap overflow-auto gap-2 justify-content-sm-end pb-2">
                            {subjectBtn.map((val, index) => {
                              let active = val?.active;
                              return (
                                <Button
                                  key={index}
                                  type="button"
                                  color={`${
                                    active ? "orange" : "light-blue-a"
                                  }`}
                                  outline={active ? false : true}
                                  onClick={() => setBtnWiseFollowpHandal(index)}
                                >
                                  {subjectTranslationHandle(val)}
                                </Button>
                              );
                            })}
                          </div>
                        </Col>
                      </Row>
                      <FollowUpRapportsCardList
                        followUpReport={getAllStudentFollowUpReportWithDetails}
                        showEvaluationHandal={(e) => showEvaluationHandal(e)}
                      />
                    </Col>
                  </Row>
                ) : (
                  <FollowUpReportLoading />
                )}
              </TabPane>
              {/* Second Tab */}
              <TabPane tabId="AssessmentsData">
                {getAllTutorFollowUpReportWithDetails ? (
                  <Row className="gx-lg-12 gy-lg-0 gy-10">
                    <Col
                      lg="auto"
                      className="vstack w-lg-80 border-end-lg sticky-lg-top flex-none"
                    >
                      <div className="mb-6">
                        <RatingReceivedDetails
                          isStudent={true}
                          userDetails={getAllTutorFollowUpReportWithDetails}
                          getAllStudentFollowUp={
                            getAllTutorFollowUpReportWithDetails
                          }
                          isMyparent={false}
                        />
                      </div>
                      <Button
                        color="dark-blue-c"
                        className="mt-auto lh-loose w-max"
                        onClick={() => evaluationForTutor()}
                      >
                        {`${t("StudentEvaluation.Assess")} ${
                          getAllTutorFollowUpReportWithDetails?.first_name
                        } ${getAllTutorFollowUpReportWithDetails?.last_name}`}
                      </Button>
                    </Col>
                    <Col>
                      <Row className="gy-6 mb-7">
                        <Col sm="4" className="hstack">
                          <h6>
                            {t("StudentEvaluation.EvaluationsData")} (
                            {getAllTutorFollowUpReportWithDetails?.followups
                              ?.length || 0}
                            )
                          </h6>
                        </Col>
                        <Col
                          sm="8"
                          className="d-flex flex-nowrap overflow-auto gap-2 justify-content-sm-end pb-2"
                        >
                          {subjectBtn.map((val, index) => {
                            let active = val?.active;
                            return (
                              <Button
                                key={index}
                                type="button"
                                color={`${active ? "orange" : "light-blue-a"}`}
                                outline={active ? false : true}
                                onClick={() => setBtnWiseFollowpHandal(index)}
                              >
                                {/* {val?.student_subject_name} */}
                                {subjectTranslationHandle(val)}
                              </Button>
                            );
                          })}
                        </Col>
                      </Row>
                      <RatingReceivedCardList
                        getAllStudentFollowUp={
                          getAllTutorFollowUpReportWithDetails
                        }
                        showEvaluationHandal={(e) =>
                          showSecondTabEvaluationHandal(e)
                        }
                      />
                    </Col>
                  </Row>
                ) : (
                  <FollowUpReportLoading />
                )}
              </TabPane>
              {/* third tab */}
              <TabPane tabId="SelfEvaluations">
                <div
                  className="vstack pb-4 gap-6 h-lg-calc overflow-auto"
                  style={{ ["--x-h-lg"]: "19.1rem" }}
                ></div>
                <PaginationComponent />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default StudentEvaluationDashboard;
