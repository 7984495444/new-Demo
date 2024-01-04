import { Layout, PaginationComponent, SessionHistoryList } from "@/components";
import React, { useEffect, useState } from "react";
// import SessionDetail from "./tutor/tutorStudentPages/SessionDetail";
import { Card, CardBody, CardFooter } from "reactstrap";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentAllSubjectDetailsAction,
  getStudentSubjectDetailsAction,
} from "@/redux/actions/tutorAction";
import { getUserAction } from "@/redux/actions/userAction";
import { useRouter } from "next/router";
import { readToDoListAction } from "@/redux/actions/dashbordAction";
import SessionDetail from "@/components/myStudent/users/tutor/SessionDetail";

const Programs = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showSessionDetail, setShowSessionDetail] = useState(
    router?.query?.isComplated ? true : false
  );
  const [historyInfo, setHistoryInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    dispatch(getUserAction());
    dispatch(getStudentAllSubjectDetailsAction(currentPage, perPage));
    if (router?.query?.isComplated) {
      dispatch(getStudentSubjectDetailsAction(router?.query?.complatedId));
      dispatch(readToDoListAction(Number(router?.query?.toDoListId)));
      // dispatch(updateDeleteSessionNotification(router?.query?.toDoListId));
    }
  }, [currentPage]);

  const { userData } = useSelector((state) => state.user);
  const { studentSessionDetails, singleStudentSessionDetails } = useSelector(
    (state) => state.tutor
  );

  // show session history details page
  const sessionDetailShowHandal = (val) => {
    setHistoryInfo(val);
    setShowSessionDetail(!showSessionDetail);
  };

  const nextAndPrevHandal = (val) => {
    if (val) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePageToNumberHandal = (val) => {
    setCurrentPage(val);
  };

  return (
    <>
      <Layout>
        <>
          {showSessionDetail ? (
            <SessionDetail
              sessionHistotyShowHandal={() => sessionDetailShowHandal()}
              historyInfo={
                router?.query?.isComplated
                  ? singleStudentSessionDetails
                  : historyInfo
              }
              studentInfo={userData?.id}
              isStudentRole={true}
            />
          ) : (
            <Card>
              <CardBody
                className="min-h-lg-calc"
                style={{ ["--x-h-lg"]: "225px" }}
              >
                <h6 className="font-bolder">
                  {t("SessionHistory.SessionHistory")}
                </h6>
                <SessionHistoryList
                  subjectDetails={studentSessionDetails}
                  sessionDetailShowHandal={(e) => sessionDetailShowHandal(e)}
                  isStudentRole={true}
                />
              </CardBody>
              <CardFooter>
                <PaginationComponent
                  totalPage={studentSessionDetails?.totalPages}
                  page={currentPage}
                  changePageToNumberHandal={(e) => changePageToNumberHandal(e)}
                  nextAndPrevHandal={(e) => nextAndPrevHandal(e)}
                />
              </CardFooter>
            </Card>
          )}
        </>
      </Layout>
    </>
  );
};

export default Programs;
