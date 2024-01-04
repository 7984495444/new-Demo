import {
  Layout,
  SearchInput,
  ShowAllTutorList,
  StudentListForDemo,
} from "@/components";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Card,
  CardFooter,
  Row,
  Col,
} from "reactstrap";
import { FollowUpReportListLoading, PaginationComponent } from "@/components";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptedMatchedAction,
  getAllMatchedStudentsAction,
  getAllStudentMatchedTopTutorAction,
} from "@/redux/actions/allStudentAction";

const Matchmaking = () => {
  const dispatch = useDispatch();

  const [currentActiveTab, setCurrentActiveTab] = useState("allStudents");
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInfo, setSearchInfo] = useState("");
  const [perPage] = useState(10);

  const toggle = (tab) => {
    setCurrentPage(1);
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  useEffect(() => {
    dispatch(
      getAllMatchedStudentsAction(
        currentActiveTab === "allStudents" ? 0 : 1,
        currentPage,
        perPage,
        searchInfo
      )
    );
  }, [currentActiveTab, currentPage, searchInfo]);

  const { getAllMatchedStudents } = useSelector((state) => state.allStudents);

  const acceptedMatchedHandle = (val, status) => {
    dispatch(
      acceptedMatchedAction(
        val?.tutor_id,
        val?.student_id,
        val?.subject_id,
        status,
        currentPage,
        perPage,
        searchInfo
      )
    );
    showMoreDetailsHandle(val);
    toggle("allStudents");
  };

  const showMoreDetailsHandle = (val) => {
    setShowMoreDetails(!showMoreDetails);
    if (val) {
      dispatch(
        getAllStudentMatchedTopTutorAction(val?.student_id, val?.subject_id)
      );
    }
  };

  const { getAllSTudentMatchedTutor } = useSelector(
    (state) => state.allStudents
  );

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
    <Layout>
      {showMoreDetails && getAllSTudentMatchedTutor?.length > -1 ? (
        <ShowAllTutorList
          getAllSTudentMatchedTutor={getAllSTudentMatchedTutor}
          showMoreDetailsHandle={() => showMoreDetailsHandle()}
          acceptedMatchedHandle={(v, s) => acceptedMatchedHandle(v, s)}
        />
      ) : (
        <Card>
          <CardFooter className="nav-tab-custom">
            <Nav className="gap-4 mb-8">
              <NavItem>
                <Link
                  className={`tab-link ${
                    currentActiveTab === "allStudents" ? "active" : ""
                  }`}
                  onClick={() => {
                    toggle("allStudents");
                  }}
                  href=""
                >
                  {t("MatchAllStudents.AllStudents")}
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  className={`tab-link ${
                    currentActiveTab === "acceptedStudent" ? "active" : ""
                  }`}
                  onClick={() => {
                    toggle("acceptedStudent");
                  }}
                  href=""
                >
                  {t("MatchAllStudents.AcceptedStudents")}
                </Link>
              </NavItem>
            </Nav>
            <TabContent activeTab={currentActiveTab}>
              {/* first tab */}
              <TabPane tabId="allStudents">
                <Row className="gy-sm-0 gy-2 mb-4">
                  <Col sm="7" md="8" xl="9" className="hstack">
                    {/* <p className="text-light-blue-a">
                      {t("MatchAllStudents.AllStudentsDes")}
                    </p> */}
                  </Col>
                  <Col sm="5" md="4" xl="3">
                    <SearchInput
                      setSearchInfo={setSearchInfo}
                      isMatchMaking={true}
                    />
                  </Col>
                </Row>
                {getAllMatchedStudents ? (
                  <>
                    {getAllMatchedStudents?.studentsMatches?.length > -1 && (
                      <StudentListForDemo
                        allStudent={getAllMatchedStudents?.studentsMatches}
                        showMoreDetailsHandle={(e) => showMoreDetailsHandle(e)}
                        data={0}
                        currentPage={currentPage}
                        perPage={perPage}
                        searchInfo={searchInfo}
                      />
                    )}
                    {getAllMatchedStudents?.studentsMatches?.length > 0 && (
                      <PaginationComponent
                        totalPage={getAllMatchedStudents?.totalPages}
                        page={currentPage}
                        changePageToNumberHandal={(e) =>
                          changePageToNumberHandal(e)
                        }
                        nextAndPrevHandal={(e) => nextAndPrevHandal(e)}
                      />
                    )}
                  </>
                ) : (
                  <FollowUpReportListLoading />
                )}
              </TabPane>
              {/* second tab */}
              <TabPane tabId="acceptedStudent">
                <Row className="gy-sm-0 gy-2 mb-4">
                  <Col sm="7" md="8" xl="9" className="hstack">
                    {/* <p className="text-light-blue-a">
                      {t("MatchAllStudents.AcceptedStudentsDes")}
                    </p> */}
                  </Col>
                  <Col sm="5" md="4" xl="3">
                    <SearchInput
                      setSearchInfo={setSearchInfo}
                      isMatchMaking={true}
                    />
                  </Col>
                </Row>
                {getAllMatchedStudents && getAllMatchedStudents ? (
                  <>
                    {getAllMatchedStudents?.studentsMatches?.length > 0 ? (
                      <StudentListForDemo
                        allStudent={getAllMatchedStudents?.studentsMatches}
                        showMoreDetailsHandle={(e) => showMoreDetailsHandle(e)}
                        data={1}
                      />
                    ) : (
                      t("MatchAllStudents.ThereAreNoAcceptedStudentMatches")
                    )}
                    {getAllMatchedStudents?.studentsMatches?.length > 0 && (
                      <PaginationComponent
                        totalPage={getAllMatchedStudents?.totalPages}
                        page={currentPage}
                        changePageToNumberHandal={(e) =>
                          changePageToNumberHandal(e)
                        }
                        nextAndPrevHandal={(e) => nextAndPrevHandal(e)}
                      />
                    )}
                  </>
                ) : (
                  <FollowUpReportListLoading />
                )}
              </TabPane>
            </TabContent>
          </CardFooter>
        </Card>
      )}
    </Layout>
  );
};

export default Matchmaking;
