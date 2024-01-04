import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Card,
  CardFooter,
  Button,
  Row,
  Col,
  Table,
  Progress,
  UncontrolledTooltip,
  CardBody,
} from "reactstrap";
import { Chart, EvaluationIconBlue, profilePlaceholder } from "@/assets/images";
import {
  FollowUpListTable,
  FollowUpReportListLoading,
  PaginationComponent,
  SearchInput,
} from "@/components";
import {
  ArrowCircleLeft2,
  ArrowCircleRight2,
  ArrowRight,
  Clock,
  Diagram,
  EmojiHappy,
  InfoCircle,
  Profile,
} from "iconsax-react";
import FollowUpReport from "./firstTabEvaluation/FollowUpReport";
import RatingsReceivedDetail from "./secondTabEvaluation/RatingsReceivedDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTutorFollowUpAction,
  getAllTutorForFollowUpAction,
} from "@/redux/actions/followUpAction";
import { t } from "i18next";

const TutorEvaluationDashboard = () => {
  const dispatch = useDispatch();

  const [showFollowUpReport, setShowFollowUpReport] = useState(false);
  const [followUpReportInfo, setFollowUpReportInfo] = useState(null);
  const [showRatingDetails, setShowRatingDetails] = useState(false);
  const [showRatingDetailsInfo, setShowRatingDetailsInfo] = useState(null);
  // Toggle active state for Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("FollowUpReport");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInfo, setSearchInfo] = useState("");
  const [perPage] = useState(10);

  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  useEffect(() => {
    if (currentActiveTab === "FollowUpReport") {
      dispatch(getAllTutorFollowUpAction(currentPage, perPage, searchInfo)); // 1
    } else {
      dispatch(getAllTutorForFollowUpAction(currentPage, perPage, searchInfo)); // 2
    }
  }, [currentPage, searchInfo, currentActiveTab]);

  const { getAllFollowUp, getAllTutorForFollowUpReport } = useSelector(
    (state) => state.followUp
  );

  const showFollowUpReportHandal = (val) => {
    setFollowUpReportInfo(val);
    setShowFollowUpReport(!showFollowUpReport);
  };

  const showRatingDetailsHandal = (val) => {
    setShowRatingDetailsInfo(val);
    setShowRatingDetails(!showRatingDetails);
  };

  const studentParentAssesment = [
    {
      title: "A créé un bon lien avec votre enfant",
      progress: 100,
    },
    {
      title: "Étabilit un climat agréable et propice à",
      progress: 89,
    },
    {
      title: "Reste à l’écoute de l’élève et démontre un",
      progress: 100,
    },
    {
      title: "Est à l’aise avec la matière qu’il enseigne",
      progress: 89,
    },
    {
      title: "Vous tient informé des progrès de votre enfant",
      progress: 65,
    },
    {
      title: "Vous apporte des suggestions utiles afin que",
      progress: 93,
    },
    {
      title: "Se présente aux recontres de tutorat de",
      progress: 80,
    },
    {
      title: "Est ponctuel et respecte l`horaire convenu",
      progress: 100,
    },
  ];

  const schoolSuccessAssessments = [
    {
      title: "Moyenne de l’amélioration des notes",
      progress: 16,
    },
    {
      title: "Recommanderaient Succès Scolaire",
      progress: 100,
    },
    {
      title: "Ont vu une amélioration de la motivation",
      progress: 96,
    },
    {
      title: "Ont vu une amelioration de l’estime de soi",
      progress: 93,
    },
  ];

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
      {showFollowUpReport ? (
        <FollowUpReport // Rapport de suivi
          showFollowUpReportHandal={() => showFollowUpReportHandal()}
          followUpReportInfo={followUpReportInfo}
        />
      ) : showRatingDetails ? (
        <RatingsReceivedDetail // Évaluations Reçues
          showRatingDetailsHandal={() => showRatingDetailsHandal()}
          showRatingDetailsInfo={showRatingDetailsInfo}
        />
      ) : (
        <Card>
          <CardFooter className="nav-tab-custom">
            <Nav className="gap-4 mb-8">
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
                    currentActiveTab === "EvaluationsReceived" ? "active" : ""
                  }`}
                  onClick={() => {
                    toggle("EvaluationsReceived");
                  }}
                  href=""
                >
                  {t("Common.RatingsReceived")}
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

              {/* this code commented becouse of this task https://app.asana.com/0/0/1206121875617272/f */}
              {/* <NavItem>
                <Link
                  className={`tab-link ${
                    currentActiveTab === "MyStatistics" ? "active" : ""
                  }`}
                  onClick={() => {
                    toggle("MyStatistics");
                  }}
                  href=""

                >
                  {t("Common.MyStatistics")}
                </Link>
              </NavItem> */}
            </Nav>
            <TabContent activeTab={currentActiveTab}>
              {/* first tab */}
              <TabPane tabId="FollowUpReport">
                <Row className="gy-sm-0 gy-2 mb-6">
                  <Col sm="7" md="8" xl="9" className="hstack">
                    <p className="text-light-blue-a">
                      {t("TutorEvaluation.ValidationAvailableHere")}
                    </p>
                  </Col>
                  <Col sm="5" md="4" xl="3">
                    <SearchInput setSearchInfo={setSearchInfo} />
                  </Col>
                </Row>
                {getAllFollowUp ? (
                  <>
                    <FollowUpListTable
                      isSecondTab={false}
                      followUp={getAllFollowUp}
                      showHandal={(e) => showFollowUpReportHandal(e)}
                    />
                    {getAllFollowUp?.followups.length > 0 && (
                      <PaginationComponent
                        totalPage={getAllFollowUp?.totalPages}
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
              <TabPane tabId="EvaluationsReceived">
                <Row className="gy-sm-0 gy-2 mb-6">
                  <Col sm="7" md="8" xl="9" className="hstack">
                    <p className="text-light-blue-a">
                      {t("TutorEvaluation.EvaluationFromStudentParent")}
                    </p>
                  </Col>
                  <Col sm="5" md="4" xl="3">
                    <SearchInput setSearchInfo={setSearchInfo} />
                  </Col>
                </Row>
                {getAllTutorForFollowUpReport ? (
                  <>
                    <FollowUpListTable
                      isSecondTab={true}
                      followUp={getAllTutorForFollowUpReport}
                      showHandal={(e) => showRatingDetailsHandal(e)}
                    />
                    {getAllTutorForFollowUpReport?.followups.length > 0 && (
                      <PaginationComponent
                        totalPage={getAllTutorForFollowUpReport?.totalPages}
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
              {/* third tab */}
              <TabPane tabId="SelfEvaluations">
                <Row className="gy-sm-0 gy-2 mb-6">
                  <Col sm="7" md="8" xl="9" className="hstack">
                    <p className="text-light-blue-a">
                      {t("TutorEvaluation.SelfEvaluations")}
                    </p>
                  </Col>
                  <Col sm="5" md="4" xl="3">
                    <SearchInput setSearchInfo={setSearchInfo} />
                  </Col>
                </Row>
                <Table
                  responsive
                  style={{ minWidth: "500px" }}
                  className="mb-10 table-border-seprate"
                >
                  <thead>
                    <tr>
                      <th
                        width="35%"
                        className="font-bolder bg-white position-sticky start-0"
                      >
                        {t("TutorEvaluation.Name")}
                      </th>
                      <th width="16%" className="font-bolder">
                        Date de la séance
                      </th>
                      <th width="25%" className="font-bolder">
                        {t("TutorEvaluation.NoOfSessions")}
                      </th>
                      <th width="30%" className="font-bolder">
                        {t("TutorEvaluation.AssessmentDate")}
                      </th>
                      <th width="10%" className="font-bolder">
                        {t("TutorEvaluation.Action")}
                      </th>
                    </tr>
                  </thead>
                  {Array.from({
                    length: 5,
                  }).map((val, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td className="bg-white position-sticky start-0 overlap-10 min-w-max">
                            <Image
                              className="avatar w-8 h-8 rounded-circle me-3"
                              src={profilePlaceholder}
                              alt="User Image"
                            />
                            <span className="pe-4">Allan Moulin</span>
                          </td>
                          <td>04/Jan/23</td>
                          <td>4/8</td>
                          <td>05/Jan/23</td>
                          <td>
                            <Button
                              color="none"
                              size="sm"
                              className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                            >
                              {t("TutorEvaluation.SeeReviews")}
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
                <PaginationComponent />
              </TabPane>
              {/* four tab */}
              <TabPane tabId="MyStatistics">
                <div className="border-top bottom">
                  <Row className="py-6 gx-lg-12">
                    <Col md="auto" className="w-md-80 d-flex flex-column">
                      <Card
                        className="rounded-4 mt-auto"
                        style={{
                          boxShadow:
                            "0px 32.5843px 48.8764px rgba(0, 0, 0, 0.16)",
                        }}
                      >
                        <CardBody>
                          <Row className="gy-4">
                            <Col xs="6">
                              <Image
                                className="avatar h-md-16 w-md-16 h-10 w-10 rounded-pill"
                                src={profilePlaceholder}
                                alt="avatar"
                              />
                            </Col>
                            <Col xs="6">
                              <h5 className="font-900">94.8%</h5>
                              <p>{t("TutorEvaluation.Appreciation")}</p>
                            </Col>
                            <Col xs="6">
                              <h4 className="font-900">93.4%</h4>
                              <p>{t("TutorEvaluation.OverallRating")}</p>
                            </Col>
                            <Col xs="6">
                              <h5 className="font-900">92%</h5>
                              <p>{t("TutorEvaluation.Skills")}</p>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xs>
                      <div className="hstack justify-content-between">
                        <span>{t("TutorEvaluation.Skills")}</span>
                        <Link href="" className="link-light-blue-a text-sm">
                          <span className="text-underline">
                            {t("TutorEvaluation.DownloadSkillsBtn")}
                          </span>{" "}
                          <ArrowRight size={16} className="ms-2" />
                        </Link>
                      </div>
                      <Image src={Chart} alt="avatar" />
                    </Col>
                  </Row>
                </div>
                <div className="pt-6 pb-8 border-bottom">
                  <Row className="gy-6" lg="4" sm="2" xs="1">
                    <Col>
                      <p className="text-sm font-semibold mb-2">
                        {t("TutorEvaluation.PromotionDate")}
                      </p>
                      <span className="text-light-blue-a">
                        3 Mars 2009 (14 ans et 2 mois)
                      </span>
                    </Col>
                    <Col>
                      <p className="text-sm font-semibold mb-2">
                        {t("TutorEvaluation.Experience")}
                      </p>
                      <span className="text-light-blue-a">12158.75 heures</span>
                    </Col>
                    <Col>
                      <p className="text-sm font-semibold mb-2">
                        {t("TutorEvaluation.Retribution")}
                      </p>
                      <span className="text-light-blue-a">60$/h</span>
                    </Col>
                    <Col>
                      <p className="text-sm font-semibold mb-2">
                        {t("TutorEvaluation.ActiveStudents")}
                      </p>
                      <span className="text-light-blue-a">
                        2/4 — 2 {t("TutorEvaluation.AdditionalDesired")}
                      </span>
                    </Col>
                  </Row>
                </div>
                <div className="py-8 border-bottom">
                  <Row className="gy-6" xl="4" md="3" sm="2" xs="1">
                    <Col>
                      <Card className="border rounded-2 h-full">
                        <CardBody className="pb-2">
                          <p>{t("TutorEvaluation.Number")}</p>
                          <p>{t("TutorEvaluation.TotalStudent")}</p>
                        </CardBody>
                        <CardFooter className="pt-2">
                          <div className="hstack gap-5">
                            <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-blue">
                              <EmojiHappy className="icon-main" />
                            </span>
                            <h1 className="text-2xl font-900">10</h1>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="border rounded-2 h-full">
                        <CardBody className="pb-2">
                          <p>{t("TutorEvaluation.Number")}</p>
                          <p>{t("TutorEvaluation.TotalStudent")}</p>
                        </CardBody>
                        <CardFooter className="pt-2">
                          <div className="hstack gap-5">
                            <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-orange">
                              <Diagram className="icon-main" />
                            </span>
                            <h1 className="text-2xl font-900">57</h1>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="border rounded-2 h-full">
                        <CardBody className="pb-2">
                          <p>{t("TutorEvaluation.Number")}</p>
                          <p>{t("TutorEvaluation.TotalStudent")}</p>
                        </CardBody>
                        <CardFooter className="pt-2">
                          <div className="hstack gap-5">
                            <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-blue">
                              <Clock className="icon-main" />
                            </span>
                            <h1 className="text-2xl font-900">8.77%</h1>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="border rounded-2 h-full">
                        <CardBody className="pb-2">
                          <p>{t("TutorEvaluation.Number")}</p>
                          <p>{t("TutorEvaluation.TotalStudent")}</p>
                        </CardBody>
                        <CardFooter className="pt-2">
                          <div className="hstack gap-5">
                            <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-orange">
                              <ArrowCircleLeft2 className="icon-main" />
                            </span>
                            <h1 className="text-2xl font-900">68.42%</h1>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="border rounded-2 h-full">
                        <CardBody className="pb-2">
                          <p>{t("TutorEvaluation.Number")}</p>
                          <p>{t("TutorEvaluation.TotalStudent")}</p>
                        </CardBody>
                        <CardFooter className="pt-2">
                          <div className="hstack gap-5">
                            <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-blue">
                              <EmojiHappy className="icon-main" />
                            </span>
                            <h1 className="text-2xl font-900">2.4 Jours</h1>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="border rounded-2 h-full">
                        <CardBody className="pb-2">
                          <p>{t("TutorEvaluation.Number")}</p>
                          <p>{t("TutorEvaluation.TotalStudent")}</p>
                        </CardBody>
                        <CardFooter className="pt-2">
                          <div className="hstack gap-5">
                            <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-orange">
                              <ArrowCircleRight2 className="icon-main" />
                            </span>
                            <h1 className="text-2xl font-900">3 Jours</h1>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="border rounded-2 h-full">
                        <CardBody className="pb-2">
                          <p>{t("TutorEvaluation.Number")}</p>
                          <p>{t("TutorEvaluation.TotalStudent")}</p>
                        </CardBody>
                        <CardFooter className="pt-2">
                          <div className="hstack gap-5">
                            <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-blue">
                              <ArrowCircleLeft2 className="icon-main" />
                            </span>
                            <h1 className="text-2xl font-900">1.3 jours</h1>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="border rounded-2 h-full">
                        <CardBody className="pb-2">
                          <Row>
                            <Col xs="9">
                              <p>{t("TutorEvaluation.ProfileCompletedAt")}</p>
                            </Col>
                            <Col xs="3" className="text-end">
                              <InfoCircle
                                size="20"
                                className="text-light-blue-a text-orange-hover cursor-pointer"
                                id="bankChequeTooltip"
                              />
                              <UncontrolledTooltip
                                style={{ ["--x-tooltip-max-width"]: "450px" }}
                                placement="bottom-start"
                                target="bankChequeTooltip"
                              >
                                <h6>{t("TutorEvaluation.Tooltip")}</h6>
                              </UncontrolledTooltip>
                            </Col>
                          </Row>
                        </CardBody>
                        <CardFooter className="pt-2">
                          <div className="hstack gap-5">
                            <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-orange">
                              <Profile className="icon-main" />
                            </span>
                            <h1 className="text-2xl font-900">80%</h1>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                  </Row>
                </div>
                <div className="py-6 border-bottom">
                  <Row className="gy-6 gx-md-16" md="2" xs="1">
                    <Col>
                      <p className="text-sm mb-4">
                        {t("TutorEvaluation.SummaryofParentStudentEvaluations")}{" "}
                        <span>(77)</span>
                      </p>

                      {studentParentAssesment.map((item, i) => (
                        <Row className="gy-3 flex-none mb-7" key={i}>
                          <Col xs={9}>
                            <p className="text-light-blue-a text-truncate">
                              {item.title}
                            </p>
                          </Col>
                          <Col xs={3} className="text-end">
                            <span>{item.progress}%</span>
                          </Col>
                          <Col>
                            <Progress
                              className="h-1"
                              value={item.progress}
                              color="dark-blue-c"
                              pill={"true"}
                            />
                          </Col>
                        </Row>
                      ))}
                    </Col>
                    <Col>
                      <p className="text-sm mb-4">
                        {t(
                          "TutorEvaluation.SummaryofAcademicSuccessEvaluations"
                        )}{" "}
                        <span>(56)</span>
                      </p>
                      {schoolSuccessAssessments.map((item, i) => (
                        <Row className="gy-3 flex-none mb-7" key={i}>
                          <Col xs={9}>
                            <p className="text-light-blue-a text-truncate">
                              {item.title}
                            </p>
                          </Col>
                          <Col xs={3} className="text-end">
                            <span>{item.progress}%</span>
                          </Col>
                          <Col>
                            <Progress
                              className="h-1"
                              value={item.progress}
                              color="dark-blue-c"
                              pill={"true"}
                            />
                          </Col>
                        </Row>
                      ))}
                      <div className="mt-10 pt-7 border-top">
                        <Card className="border">
                          <CardBody>
                            <div className="hstack gap-8 mb-5">
                              <Image
                                className="ms-2 avatar h-8 w-8 rounded-pill"
                                src={profilePlaceholder}
                                alt="avatar"
                              />
                              <div>
                                <span>James Torin — Votre position</span>
                              </div>
                            </div>
                            <div className="hstack gap-5">
                              <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-blue">
                                <Image
                                  src={EvaluationIconBlue}
                                  className="icon-main"
                                  alt="icon"
                                />
                              </span>
                              <div className="d-flex align-items-end flex-wrap">
                                <h1 className="text-2xl font-900 me-2">215e</h1>
                                <span className="pb-1">
                                  {" "}
                                  sur 332 tuteurs évalués
                                </span>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="pt-7">
                  <h6 className="text-sm font-semibold mb-4">
                    {t("TutorEvaluation.GeneralComments")}
                  </h6>
                  <Row className="gy-6" xl="3" sm="2" xs="1">
                    <Col>
                      <Card className="border h-full">
                        <CardBody className="d-flex align-items-center ">
                          <p>
                            ”Lorem ipsum dolor sit amet consectetur. Rhoncus
                            faucibus congue mauris egestas diam dui eget”.
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="border h-full">
                        <CardBody className="d-flex align-items-center ">
                          <p>
                            ”Amet eu enim euismod tortor nam vitae morbi. Ac id
                            nunc enim adipiscing augue tristique facilisi. Sit
                            lectus tellus a nunc euismod viverra ultrices”.
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="border h-full">
                        <CardBody className="d-flex align-items-center ">
                          <p>
                            ”Enim euismod tortor nam vitae morbi. Ac id nunc”.
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </TabPane>
            </TabContent>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default TutorEvaluationDashboard;
