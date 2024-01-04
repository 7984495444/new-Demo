import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { ArrowLeft } from "iconsax-react";
import SeeEvaluation from "./SeeEvaluation.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllTutorStudentFollowUpReportAction } from "@/redux/actions/followUpAction.js";
import {
  FollowUpRapportDetails,
  FollowUpRapportsCardList,
  FollowUpReportLoading,
} from "@/components/index.js";
import { t } from "i18next";

const FollowUpReport = ({ showFollowUpReportHandal, followUpReportInfo }) => {
  const dispatch = useDispatch();
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [seeEvaluationInfo, setSeeEvaluationInfo] = useState(null);

  useEffect(() => {
    dispatch(
      getAllTutorStudentFollowUpReportAction(
        followUpReportInfo?.student_id,
        followUpReportInfo?.subject_id
      )
    );
  }, []);

  const { getAllTutorStudentFollowUpReport } = useSelector(
    (state) => state.followUp
  );

  const showEvaluationHandal = (val) => {
    setSeeEvaluationInfo(val);
    setShowEvaluation(!showEvaluation);
  };

  return (
    <>
      {showEvaluation ? (
        <SeeEvaluation
          showFollowUpReportHandal={showFollowUpReportHandal}
          showEvaluationHandal={() => showEvaluationHandal()}
          followUpReportInfo={getAllTutorStudentFollowUpReport}
          seeEvaluationInfo={seeEvaluationInfo}
        />
      ) : (
        <Card>
          <CardBody className="py-8">
            <div className="d-flex gap-3 mb-4 position-lg-absolute top-lg-0 start-lg-0 mt-lg-n10 w-full">
              <span className="cursor-pointer">
                <ArrowLeft size={18} onClick={showFollowUpReportHandal} />
              </span>
              <Breadcrumb
                onClick={showFollowUpReportHandal}
                className="cursor-pointer"
              >
                <BreadcrumbItem>{t("Header.Ratings")}</BreadcrumbItem>
              </Breadcrumb>
            </div>
            {getAllTutorStudentFollowUpReport ? (
              <Row className="gx-lg-12 gy-lg-0 gy-10">
                <Col lg="auto" className="w-lg-80 border-end-lg">
                  <FollowUpRapportDetails
                    userDetails={
                      !getAllTutorStudentFollowUpReport?.first_name
                        ? followUpReportInfo
                        : getAllTutorStudentFollowUpReport
                    }
                  />
                </Col>
                <Col>
                  <h6 className="mb-6">
                    {t("Common.Reports")} (
                    {getAllTutorStudentFollowUpReport?.followups?.length})
                  </h6>
                  <FollowUpRapportsCardList
                    followUpReport={getAllTutorStudentFollowUpReport}
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
