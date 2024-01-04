import moment from "moment";
import React from "react";
import { Badge, Col, Row } from "reactstrap";
import { t } from "i18next";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import { ShowImage } from "../index";

const FollowUpRapportDetails = ({ userDetails, isStudent }) => {
  return (
    <>
      <div className="hstack gap-4 pb-6 border-bottom">
        <ShowImage
          className="avatar h-18 w-18 rounded-pill"
          imageName={userDetails?.profile_image}
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
        />
        <div>
          <h6>{`${userDetails?.first_name} ${userDetails?.last_name}`}</h6>
          <Badge className="bg-light-blue-c text-dark-blue-c mt-2 p-1" color>
            {isStudent
              ? t("FollowUpReportDetails.Student")
              : subjectTranslationHandle(userDetails)}
          </Badge>
        </div>
      </div>
      <div className="py-6 border-bottom">
        <span className="text-2xl">
          {String(userDetails?.confirm_sessions || "00").padStart(2, "0")}
        </span>
        <span>
          /{String(userDetails?.total_session || "00").padStart(2, "0")}
        </span>
        <span className="font-bolder ms-2">
          {t("FollowUpReportDetails.CompletedSession")}
        </span>
      </div>
      <Row className="py-6 gx-0 gap-4">
        <Col xs="auto">
          <span className="d-block font-bolder">
            {t("FollowUpReportDetails.FirstSession")}
          </span>
          <span>
            {userDetails?.first_session_date
              ? moment(userDetails?.first_session_date).format("DD/MMM/YY")
              : "—"}
          </span>
        </Col>
        <Col xs="auto" className="flex-fill vstack">
          <hr className="text-black mb-2 mt-auto" />
        </Col>
        <Col xs="auto">
          <span className="d-block font-bolder">
            {t("FollowUpReportDetails.LastSession")}
          </span>
          <span>
            {userDetails?.last_session_date
              ? moment(userDetails?.last_session_date).format("DD/MMM/YY")
              : "—"}
          </span>
        </Col>
      </Row>
    </>
  );
};

export default FollowUpRapportDetails;
