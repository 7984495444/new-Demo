import moment from "moment";
import React from "react";
import { Rating } from "react-simple-star-rating";
import { Badge, Col, Row } from "reactstrap";
import { t } from "i18next";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import ShowImage from "../@common/ShowImage";

const RatingReceivedDetails = ({
  isStudent,
  userDetails,
  getAllStudentFollowUp,
  isMyparent,
}) => {
  return (
    <>
      <div className="hstack gap-4 pb-6 border-bottom">
        <ShowImage
          className="avatar h-18 w-18 rounded-pill"
          imageName={userDetails?.profile_image}
          width={68}
          height={68}
          style={{ objectFit: "cover" }}
        />
        <div>
          <h6>{`${userDetails?.first_name} ${userDetails?.last_name}`}</h6>
          <Badge
            className="bg-light-blue-c text-dark-blue-c mt-2 p-1"
            color="none"
          >
            {/* {userDetails?.subject} */}
            {subjectTranslationHandle(userDetails)}
          </Badge>
        </div>
      </div>
      {!isMyparent && (
        <div className="py-6 border-bottom">
          <Rating
            size={20}
            fillColor="#FECA36"
            emptyColor="#D9D9D9"
            className="mb-1"
            allowFraction={true}
            iconsCount={5}
            initialValue={userDetails?.general_assessment}
            readonly
            transition
            label
          />
          <h6 className="text-base">
            {t("RatingReceivedDetails.GeneralEvaluation")}
          </h6>
        </div>
      )}
      {userDetails?.isParent ? (
        <div className="py-6 border-bottom">
          {getAllStudentFollowUp?.students?.map((val, index) => {
            return (
              <div key={index} className="my-3">
                <ShowImage
                  className="avatar w-8 h-8 rounded-circle me-3"
                  imageName={val?.profile_image}
                  width={68}
                  height={68}
                />
                <span key={index}>{`${val?.first_name} ${val?.last_name}’s ${
                  getAllStudentFollowUp?.parent_gender === 1
                    ? "father"
                    : "mother"
                }`}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="py-6 border-bottom">
            <span className="text-2xl">
              {String(getAllStudentFollowUp?.confirm_sessions || "00").padStart(
                2,
                "0"
              )}
            </span>
            <span>
              /
              {String(getAllStudentFollowUp?.total_session || "00").padStart(
                2,
                "0"
              )}
            </span>
            <span className="font-bolder ms-2">
              {t("RatingReceivedDetails.CompletedSession")}
            </span>
          </div>
          {!isStudent && (
            <Row className="py-6 gx-0 gap-4">
              <Col xs="auto">
                <span className="d-block font-bolder">
                  {t("RatingReceivedDetails.FirstSession")}
                </span>
                <span>
                  {getAllStudentFollowUp?.first_session_date
                    ? moment(getAllStudentFollowUp?.first_session_date).format(
                        "DD/MMM/YY"
                      )
                    : "—"}
                </span>
              </Col>
              <Col xs="auto" className="flex-fill vstack">
                <hr className="text-black mb-2 mt-auto" />
              </Col>
              <Col xs="auto">
                <span className="d-block font-bolder">
                  {t("RatingReceivedDetails.LastSession")}
                </span>
                <span>
                  {getAllStudentFollowUp?.last_session_date
                    ? moment(getAllStudentFollowUp?.last_session_date).format(
                        "DD/MMM/YY"
                      )
                    : "—"}
                </span>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default RatingReceivedDetails;
