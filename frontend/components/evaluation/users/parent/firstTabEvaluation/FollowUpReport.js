import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { ArrowLeft } from "iconsax-react";
import SeeEvaluation from "./SeeEvaluation.js";
import {
  getAllStudentFollowUpReportWithDetailsAction,
  getAllStudentSubjectDetailsHandal,
  getAllStudentSubjectDetailsAction,
  getAllStudentFollowUpReportWithDetailsHandal,
} from "@/redux/actions/followUpAction";
import { useDispatch, useSelector } from "react-redux";
import {
  FollowUpRapportDetails,
  FollowUpRapportsCardList,
  FollowUpReportLoading,
} from "@/components/index.js";
import { t } from "i18next";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn.js";

const FollowUpReport = ({
  showFollowUpReportHandal,
  followUpReportInfo,
}) => {
  const dispatch = useDispatch();
  
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [seeEvaluationInfo, setSeeEvaluationInfo] = useState(null);
  const [subjectBtn, setSubjectBtn] = useState([]);

  useEffect(() => {
    dispatch(getAllStudentSubjectDetailsAction(followUpReportInfo?.student_id)); // get student subject
  }, []);

  const { getAllStudentSubjectDetails } = useSelector(
    (state) => state.followUp
  );

  useEffect(() => {
    if (getAllStudentSubjectDetails?.length > 0) {
      let temp = [];
      for (
        let index = 0;
        index < getAllStudentSubjectDetails?.length;
        index++
      ) {
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
  }, [getAllStudentSubjectDetails]);

  // ******************* first tab **************************
  useEffect(() => {
    for (let index = 0; index < subjectBtn?.length; index++) {
      const element = subjectBtn[index];
      if (element?.active === true) {
        // first tab get all student followup details
        dispatch(getAllStudentFollowUpReportWithDetailsAction(element));
      }
    }
  }, [subjectBtn]);

  const { getAllStudentFollowUpReportWithDetails } = useSelector(
    (state) => state.followUp
  );

  const showEvaluationHandal = (val) => {
    setSeeEvaluationInfo(val);
    setShowEvaluation(!showEvaluation);
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

  // redirect to  previous page handal
  const prevPageHandal = () => {
    showFollowUpReportHandal(null);
    dispatch(getAllStudentSubjectDetailsHandal());
    dispatch(getAllStudentFollowUpReportWithDetailsHandal());
  };

  return (
    <>
      {showEvaluation ? (
        <SeeEvaluation
          showFollowUpReportHandal={showFollowUpReportHandal}
          showEvaluationHandal={() => showEvaluationHandal()}
          seeEvaluationInfo={seeEvaluationInfo}
          followUpReportInfo={getAllStudentFollowUpReportWithDetails}
        />
      ) : (
        <Card>
          <CardBody className="py-8">
            <div className="hstack gap-3 mb-4 position-lg-absolute top-lg-0 start-lg-0 mt-lg-n10 w-full">
              <span className="cursor-pointer">
                <ArrowLeft size={18} onClick={() => prevPageHandal()} />
              </span>
              <Breadcrumb
                onClick={() => prevPageHandal()}
                className="cursor-pointer"
              >
                <BreadcrumbItem>{t("Header.Ratings")}</BreadcrumbItem>
              </Breadcrumb>
            </div>
            {getAllStudentFollowUpReportWithDetails ? (
              <Row className="gx-lg-12 gy-lg-0 gy-10">
                <Col lg="auto" className="w-lg-80 border-end-lg">
                  <FollowUpRapportDetails
                    userDetails={
                      !getAllStudentFollowUpReportWithDetails?.first_name
                        ? followUpReportInfo
                        : getAllStudentFollowUpReportWithDetails
                    }
                    isStudent={true}
                  />
                </Col>
                <Col>
                  <div className="hstack flex-wrap justify-content-between mb-5">
                    <h6 className="mb-6">
                      {t("Common.MonitoringReport")} (
                      {getAllStudentFollowUpReportWithDetails?.followups
                        ?.length || 0}
                      )
                    </h6>
                    <div className="d-flex flex-nowrap overflow-auto">
                      {subjectBtn.map((val, index) => {
                        let active = val?.active;
                        return (
                          <Button
                            key={index}
                            type="button"
                            color={`${active ? "orange" : "light-blue-a"}`}
                            outline={active ? false : true}
                            className="me-4"
                            onClick={() => setBtnWiseFollowpHandal(index)}
                          >
                            {/* {val?.student_subject_name} */}
                            {subjectTranslationHandle(val)}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                  <FollowUpRapportsCardList
                    followUpReport={getAllStudentFollowUpReportWithDetails}
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

export default FollowUpReport;
