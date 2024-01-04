import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { ArrowLeft } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import SeeEvaluation from "./SeeEvaluation";
import {
  getAllStudentSubjectDetailsHandal,
  getAllStudentSubjectDetailsAction,
  getAllTutorFollowUpReportWithDetailsAction,
} from "@/redux/actions/followUpAction";
import {
  FollowUpReportLoading,
  RatingReceivedDetails,
  RatingReceivedCardList,
} from "@/components";
import { t } from "i18next";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";

const RatingsReceivedDetail = ({
  showRatingDetailsHandal,
  showRatingDetailsInfo,
  type,
}) => {
  const dispatch = useDispatch();

  const [showEvaluation, setShowEvaluation] = useState(false);
  const [seeEvaluationInfo, setSeeEvaluationInfo] = useState(null);
  const [subjectBtn, setSubjectBtn] = useState([]);

  useEffect(() => {
    // get student subject
    dispatch(
      getAllStudentSubjectDetailsAction(showRatingDetailsInfo?.student_id)
    );
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
  }, [getAllStudentSubjectDetails]);

  useEffect(() => {
    for (let index = 0; index < subjectBtn.length; index++) {
      const element = subjectBtn[index];
      if (element?.active === true) {
        // first tab get all student followup details
        dispatch(getAllTutorFollowUpReportWithDetailsAction(element));
      }
    }
  }, [subjectBtn]);

  const { getAllTutorFollowUpReportWithDetails } = useSelector(
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
    showRatingDetailsHandal(null);
    dispatch(getAllStudentSubjectDetailsHandal());
  };

  return (
    <>
      {showEvaluation ? (
        <SeeEvaluation
          showFollowUpReportHandal={showRatingDetailsHandal}
          showEvaluationHandal={() => showEvaluationHandal()}
          showRatingDetailsInfo={getAllTutorFollowUpReportWithDetails}
          seeEvaluationInfo={seeEvaluationInfo}
          isparent={false}
        />
      ) : (
        <Card>
          <CardBody className="py-8">
            <div className="d-flex gap-3 mb-4 position-lg-absolute top-lg-0 start-lg-0 mt-lg-n10 w-full">
              <span className="cursor-pointer">
                <ArrowLeft size={18} onClick={() => prevPageHandal()} />
              </span>
              <Breadcrumb className="">
                <BreadcrumbItem
                  className="cursor-pointer"
                  onClick={() => prevPageHandal()}
                >
                  {t("Header.Ratings")}
                </BreadcrumbItem>
                <BreadcrumbItem>{t("Common.RatingsData")}</BreadcrumbItem>
                {!type && (
                  <BreadcrumbItem active>
                    {`${showRatingDetailsInfo?.first_name} ${showRatingDetailsInfo?.last_name}`}
                  </BreadcrumbItem>
                )}
              </Breadcrumb>
            </div>
            {getAllStudentSubjectDetails &&
            getAllTutorFollowUpReportWithDetails ? (
              <Row className="gx-lg-12 gy-lg-0 gy-10">
                <Col lg="auto" className="w-lg-80 border-end-lg sticky-lg-top">
                  <RatingReceivedDetails
                    isStudent={false}
                    userDetails={
                      !getAllTutorFollowUpReportWithDetails?.first_name
                        ? showRatingDetailsInfo
                        : getAllTutorFollowUpReportWithDetails
                    }
                    getAllStudentFollowUp={getAllTutorFollowUpReportWithDetails}
                    isMyparent={false}
                  />
                </Col>
                <Col>
                  <Row className="gx-0 gy-4 mb-7">
                    <Col sm="" className="hstack">
                      <h6>
                        {t("Common.RatingsData")} (
                        {getAllTutorFollowUpReportWithDetails?.followups
                          ?.length || 0}
                        )
                      </h6>
                    </Col>
                    <Col className="hstack justify-content-sm-end">
                      <div className="d-flex flex-nowrap pb-2 overflow-auto">
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
                              {subjectTranslationHandle(val)}
                            </Button>
                          );
                        })}
                      </div>
                    </Col>
                  </Row>
                  <RatingReceivedCardList
                    getAllStudentFollowUp={getAllTutorFollowUpReportWithDetails}
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
