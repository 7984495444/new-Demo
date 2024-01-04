import React, { useEffect, useState } from "react";
import {  PaginationComponent, SessionHistoryList } from "@/components";
import {
  Card,
  CardBody,
  CardFooter,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { ArrowLeft } from "iconsax-react";
import { t } from "i18next";
import SessionDetail from "./SessionDetail";
import { useDispatch, useSelector } from "react-redux";
import { getStudentAllSessionSubjectWiseDetailsAction } from "@/redux/actions/tutorAction";

const SessionHistory = ({ sessionHistotyShowHandal, studentInfo }) => {
  const dispatch = useDispatch();

  const [showSessionDetail, setShowSessionDetail] = useState(false);
  const [historyInfo, setHistoryInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(25);
  
  useEffect(() => {
    dispatch(
      getStudentAllSessionSubjectWiseDetailsAction(
        studentInfo?.student_id,
        studentInfo?.subject_id,
        currentPage,
        perPage
      )
    );
  }, [currentPage]);

  const { studentAllSessionSubjectDetails } = useSelector(
    (state) => state.tutor
  );

  const sessionDetailShowHandal = (val) => {
    setHistoryInfo(val);
    setShowSessionDetail(!showSessionDetail);
  };

  const changePageToNumberHandal = (val) => {
    setCurrentPage(val);
  };

  const nextAndPrevHandal = (val) => {
    if (val) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {showSessionDetail ? (
        <SessionDetail
          showStudentProfileHandal={() => sessionHistotyShowHandal()}
          sessionHistotyShowHandal={() => sessionDetailShowHandal()}
          historyInfo={historyInfo}
          studentInfo={studentInfo}
        />
      ) : (
        <Card>
          <CardBody>
            <div className="d-flex gap-3 mb-4 position-lg-absolute top-lg-0 start-lg-0 mt-lg-n10 w-full">
              <span className="cursor-pointer">
                <ArrowLeft size={18} onClick={sessionHistotyShowHandal} />
              </span>
              <Breadcrumb>
                <BreadcrumbItem
                  onClick={sessionHistotyShowHandal}
                  className="cursor-pointer"
                >
                  <a href={() => false}>{t("SessionHistory.MyStudentBtn")}</a>
                </BreadcrumbItem>
                <BreadcrumbItem className="font-bold">
                  {t("SessionHistory.SessionHistory")}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <h6 className="font-bolder">
              {t("SessionHistory.SessionHistory")}
            </h6>
            <SessionHistoryList
              subjectDetails={studentAllSessionSubjectDetails}
              sessionDetailShowHandal={(e) => sessionDetailShowHandal(e)}
            />
          </CardBody>
          <CardFooter>
            <PaginationComponent
              totalPage={studentAllSessionSubjectDetails?.totalPages}
              page={currentPage}
              changePageToNumberHandal={(e) => changePageToNumberHandal(e)}
              nextAndPrevHandal={(e) => nextAndPrevHandal(e)}
            />
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default SessionHistory;
