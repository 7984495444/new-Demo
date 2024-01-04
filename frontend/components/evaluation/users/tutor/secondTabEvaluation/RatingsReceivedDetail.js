import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { ArrowLeft } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentTutorFollowUpReportAction } from "@/redux/actions/followUpAction";
import SeeEvaluation from "./SeeEvaluation";
import {
  FollowUpReportLoading,
  RatingReceivedCardList,
  RatingReceivedDetails,
} from "@/components";
import { t } from "i18next";

const RatingsReceivedDetail = ({
  showRatingDetailsHandal,
  showRatingDetailsInfo,
}) => {
  const dispatch = useDispatch();
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [seeEvaluationInfo, setSeeEvaluationInfo] = useState(null);

  useEffect(() => {
    dispatch(
      getAllStudentTutorFollowUpReportAction(
        showRatingDetailsInfo?.user_id,
        showRatingDetailsInfo?.subject_id,
        showRatingDetailsInfo?.isParent ? "parent" : "student",
        showRatingDetailsInfo?.isParent ? "parent_id" : "student_id"
      )
    );
  }, []);

  const { getAllStudentFollowUp } = useSelector((state) => state.followUp);

  const showEvaluationHandal = (val) => {
    setSeeEvaluationInfo(val);
    setShowEvaluation(!showEvaluation);
  };

  return (
    <>
      {showEvaluation ? (
        <SeeEvaluation
          showFollowUpReportHandal={showRatingDetailsHandal}
          showEvaluationHandal={() => showEvaluationHandal()}
          showRatingDetailsInfo={getAllStudentFollowUp}
          seeEvaluationInfo={seeEvaluationInfo}
        />
      ) : (
        <Card>
          <CardBody className="py-8">
            <div className="d-flex gap-3 mb-4 position-lg-absolute top-lg-0 start-lg-0 mt-lg-n10 w-full">
              <span className="cursor-pointer">
                <ArrowLeft size={18} onClick={showRatingDetailsHandal} />
              </span>
              <Breadcrumb
                onClick={showRatingDetailsHandal}
                className="cursor-pointer"
              >
                <BreadcrumbItem>{t("Common.RatingsReceived")}</BreadcrumbItem>
              </Breadcrumb>
            </div>
            {getAllStudentFollowUp ? (
              <Row className="gx-lg-12 gy-lg-0 gy-10">
                <Col lg="auto" className="w-lg-80 border-end-lg sticky-lg-top">
                  <RatingReceivedDetails
                    isStudent={false}
                    userDetails={showRatingDetailsInfo}
                    getAllStudentFollowUp={getAllStudentFollowUp}
                    isMyparent={false}
                  />
                </Col>
                <Col>
                  <h6 className="mb-6">
                    {t("Common.RatingsReceived")} (
                    {getAllStudentFollowUp?.followups?.length})
                  </h6>
                  <RatingReceivedCardList
                    getAllStudentFollowUp={getAllStudentFollowUp}
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

export default RatingsReceivedDetail;
