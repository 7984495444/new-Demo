import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
} from "reactstrap";
import { PaginationComponent, EvaluationCard } from "@/components";
import FollowUpReport from "./firstTabEvaluation/FollowUpReport";
import RatingsReceivedDetail from "./secondTabEvaluation/RatingsReceivedDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllParentStudentFollowUpReportAction,
  getAllParentsFollowUpReportAction,
  getAllParentsSubjectDetailsAction,
} from "@/redux/actions/followUpAction";
import TutorForRatingsReceivedDetail from "./secondTabEvaluation/TutorForRatingsReceivedDetail";
import { ParentRatingsGiven } from "../../../index";
import { t } from "i18next";
import { useRouter } from "next/router";

const ParentEvaluationDashboard = ({ userData }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Toggle active state for Tab
  const [currentActiveTab, setCurrentActiveTab] = useState(
    router?.query?.isStudentDashboard ? "AssessmentsData" : "FollowUpReport"
  );
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };
  const [showFollowUpReport, setShowFollowUpReport] = useState(false);
  const [showRatingDetails, setShowRatingDetails] = useState(false);
  const [showRatingDetailsInfo, setShowRatingDetailsInfo] = useState(null);
  const [followUpReportInfo, setFollowUpReportInfo] = useState(null);
  const [secondTabRatingFlag, setSecondTabRatingFlag] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    dispatch(getAllParentStudentFollowUpReportAction()); // first tab
    dispatch(getAllParentsFollowUpReportAction()); // second tab (parent details)
  }, []);

  const {
    getAllparentStudentFollowUpReport, // first tab
    getAllparentsFollowUpReport, // second tab (parent details)
  } = useSelector((state) => state.followUp);

  useEffect(() => {
    dispatch(getAllParentsSubjectDetailsAction()); // get parent subjects
  }, []);

  const { getAllparentSubjectDetails } = useSelector((state) => state.followUp);

  useEffect(() => {
    if (getAllparentSubjectDetails?.length > 0) {
      let stud = [];
      for (let index = 0; index < getAllparentSubjectDetails?.length; index++) {
        const element = getAllparentSubjectDetails[index];
        if (element) {
          if (index === 0) {
            setSelectedStudent({
              value: element?.student_id,
              label: `${element?.student_first_name} ${element?.student_last_name}`,
              avatar: element?.student_profile_image,
            });
          }
          stud.push({
            value: element?.student_id,
            label: `${element?.student_first_name} ${element?.student_last_name}`,
            avatar: element?.student_profile_image,
          });
        }
      }
      setStudent(stud);
      // subjectHanadal(0, selectedStudent?.value);
    }
  }, [getAllparentSubjectDetails]);

  const showFollowUpReportHandal = (val) => {
    setFollowUpReportInfo(val);
    setShowFollowUpReport(!showFollowUpReport);
  };

  const showRatingDetailsHandal = (val, type) => {
    setShowRatingDetailsInfo(val);
    setSecondTabRatingFlag(type);
    setShowRatingDetails(!showRatingDetails);
  };

  return (
    <>
      {showFollowUpReport ? (
        <FollowUpReport
          showFollowUpReportHandal={(e) => showFollowUpReportHandal(e)}
          followUpReportInfo={followUpReportInfo}
          getAllparentStudentFollowUpReport={getAllparentStudentFollowUpReport}
        />
      ) : showRatingDetails ? (
        <>
          {secondTabRatingFlag ? (
            <TutorForRatingsReceivedDetail
              showRatingDetailsHandal={(e) => showRatingDetailsHandal(e)}
              showRatingDetailsInfo={showRatingDetailsInfo}
              userData={userData}
              getAllparentSubjectDetails={getAllparentSubjectDetails}
              student1={student}
              selectedStudent1={selectedStudent}
              // type={secondTabRatingFlag}
            />
          ) : (
            <RatingsReceivedDetail
              showRatingDetailsHandal={(e) => showRatingDetailsHandal(e)}
              showRatingDetailsInfo={showRatingDetailsInfo}
              // type={secondTabRatingFlag}
            />
          )}
        </>
      ) : (
        <Card className="nav-tab-custom">
          <CardHeader>
            <Nav className="gap-4">
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
                  {t("Common.MonitoringReport")}
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
                  {t("Common.RatingsGiven")}
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
                  {t("Common.Autoevaluations")}
                </Link>
              </NavItem> */}
            </Nav>
          </CardHeader>
          <CardBody
            className="h-lg-calc overflow-auto"
            style={{ ["--x-h-lg"]: "212px" }}
          >
            <TabContent activeTab={currentActiveTab}>
              {/* first tab */}
              <TabPane tabId="FollowUpReport">
                <Row className="gx-3 gy-3">
                  {getAllparentStudentFollowUpReport?.map((val, index) => {
                    return (
                      <Col sm="auto" xs="12" className="w-sm-112" key={index}>
                        <EvaluationCard
                          getAllparentStudentFollowUpReport={val}
                          showEvaluationHandal={(e) =>
                            showFollowUpReportHandal(e)
                          }
                        />
                      </Col>
                    );
                  })}
                </Row>
              </TabPane>
              {/* second tab */}
              <TabPane tabId="AssessmentsData">
                <div className="hstack gap-4 mb-4">
                  <span className="text-light-blue-a">
                    {t("Students.MyStudents")} (
                    {getAllparentStudentFollowUpReport?.length})
                  </span>
                  <hr className="flex-fill m-0" style={{ color: "#E5F0FF" }} />
                </div>
                <Row className="gx-3 gy-3 mb-10">
                  {getAllparentStudentFollowUpReport?.map((val, index) => {
                    return (
                      <Col sm="auto" xs="12" className="w-sm-112" key={index}>
                        <EvaluationCard
                          getAllparentStudentFollowUpReport={val}
                          showEvaluationHandal={(e, t) =>
                            showRatingDetailsHandal(e, t)
                          }
                        />
                      </Col>
                    );
                  })}
                </Row>
                <div className="hstack gap-4 mb-6">
                  <span className="text-light-blue-a">
                    {t("Common.MyGivenEvaluations")}
                  </span>
                  <hr className="flex-fill m-0" style={{ color: "#E5F0FF" }} />
                </div>
                {getAllparentsFollowUpReport && (
                  <ParentRatingsGiven
                    getAllparentsFollowUpReport={getAllparentsFollowUpReport}
                    showRatingDetailsHandal={(e, t) =>
                      showRatingDetailsHandal(e, t)
                    }
                  />
                )}
              </TabPane>
              {/* third tab */}
              <TabPane tabId="SelfEvaluations">
                <PaginationComponent />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default ParentEvaluationDashboard;
