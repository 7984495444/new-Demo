import React, { useEffect, useState } from "react";
import {
  Layout,
  PaginationComponent,
  MyStudentList,
  StudentProfile,
  SearchInput,
  SuggestedStudentList,
} from "@/components";
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSuggestedStudentAction,
  getAllTutorMyStudentAction,
} from "@/redux/actions/tutorAction";
import SessionHistory from "./SessionHistory";
import StudentForEvlucation from "./StudentForEvlucation";
import { idToGetUserDetailsAction } from "@/redux/actions/userAction";
import { useRouter } from "next/router";

const TutorStudentDashboard = ({ userData }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [sessionHistotyShow, setSessionHistotyShow] = useState(false); // show session history
  const [showStudentForEvaluationPage, setShowStudentForEvaluationPage] =
    useState(router?.query?.isTutorFollow === "true" ? true : false); // show evlucation for student page
  const [showStudentProfile, setShowStudentProfile] = useState(false); // show student profile
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInfo, setSearchInfo] = useState("");
  const [perPage] = useState(10);

  useEffect(() => {
    dispatch(getAllSuggestedStudentAction());
  }, []);

  const { getAllSuggestedStudents } = useSelector((state) => state.tutor);

  useEffect(() => {
    dispatch(getAllTutorMyStudentAction(currentPage, perPage, searchInfo));
  }, [currentPage, searchInfo]);

  const { allTutorMyStudent } = useSelector((state) => state.tutor);
  const [studentInfo, setstudentInfo] = useState(null);

  // show session history handal
  const sessionHistotyShowHandal = (val) => {
    setstudentInfo(val);
    setSessionHistotyShow(!sessionHistotyShow);
  };

  // show evlucation for student page
  const showStudentForEvaluationPageHandal = (val) => {
    setstudentInfo(val);
    setShowStudentForEvaluationPage(!showStudentForEvaluationPage);
  };

  //  show student profile handal
  const showStudentProfileHandal = (val) => {
    dispatch(idToGetUserDetailsAction(val?.student_id));
    setShowStudentProfile(!showStudentProfile);
  };

  const { idToGetUserDetails } = useSelector((state) => state.user);

  // change number to particluer page in pagination
  const changePageToNumberHandal = (val) => {
    setCurrentPage(val);
  };

  // next and prev handal in pagination
  const nextAndPrevHandal = (val) => {
    if (val) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Layout>
        {sessionHistotyShow ? (
          <SessionHistory
            sessionHistotyShowHandal={() => sessionHistotyShowHandal()}
            studentInfo={studentInfo}
          />
        ) : showStudentForEvaluationPage ? (
          <StudentForEvlucation
            showStudentProfileHandal={showStudentForEvaluationPageHandal}
            studentInfo={
              router?.query?.isTutorFollow === "true"
                ? router?.query
                : studentInfo
            }
          />
        ) : showStudentProfile ? (
          idToGetUserDetails && (
            <StudentProfile userData={idToGetUserDetails} isEditable={false} />
          )
        ) : (
          <Card>
            <CardHeader className="px-4">
              <h6>{t("TutorStudentDashboard.SuggestedTwinning")}</h6>
            </CardHeader>
            <CardBody className="py-2 px-4">
              <SuggestedStudentList
                getAllSuggestedStudents={getAllSuggestedStudents}
              />
              <Row className="gy-4">
                <Col sm="7" md="8" xl="9" className="hstack">
                  <h6 className="font-bolder">
                    {t("TutorStudentDashboard.MyStudent")}
                    <span>({allTutorMyStudent?.totalStudent})</span>
                  </h6>
                </Col>
                <Col sm="5" md="4" xl="3">
                  <SearchInput setSearchInfo={setSearchInfo} />
                </Col>
              </Row>
              <MyStudentList
                student={allTutorMyStudent}
                sessionHistotyShowHandal={(e) => sessionHistotyShowHandal(e)}
                showStudentForEvaluationPageHandal={(e) =>
                  showStudentForEvaluationPageHandal(e)
                }
                showStudentProfileHandal={(e) => showStudentProfileHandal(e)}
              />
            </CardBody>
            <CardFooter>
              <PaginationComponent
                totalPage={allTutorMyStudent?.totalPages}
                page={currentPage}
                changePageToNumberHandal={(e) => changePageToNumberHandal(e)}
                nextAndPrevHandal={(e) => nextAndPrevHandal(e)}
              />
            </CardFooter>
          </Card>
        )}
      </Layout>
    </>
  );
};

export default TutorStudentDashboard;
