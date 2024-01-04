import moment from "moment";
import React from "react";
import { Badge, Col, Row } from "reactstrap";
import { HierarchyTwoPointGrey } from "@/assets/images/index";
import { t } from "i18next";
import Image from "next/image";
import { subjectTranslationHandle } from "../../utils/subjectTranslationFuncationsn";
import ShowImage from "../@common/ShowImage";

const ShowSessionDetails = ({ historyInfo }) => {
  return (
    <>
      <Row className="justify-content-between gy-2 mb-4">
        <Col xs="auto">
          <h5>
            {subjectTranslationHandle(historyInfo)} —{" "}
            {moment(historyInfo?.session_date).format("DD/MMM/YY")}
          </h5>
        </Col>
        <Col xs="auto">
          {historyInfo?.status === "confirm_session" ? (
            <Badge color="none" className="badge-green">
              {t("SessionDetail.Confirm")}
            </Badge>
          ) : historyInfo?.status === "absent_student" ? (
            <Badge color="none" className="badge-red">
              {t("SessionDetail.AbsentStudent")}
            </Badge>
          ) : (
            <Badge color="none" className="badge-orange">
              {t("SessionDetail.SessionCanceled")}
            </Badge>
          )}
        </Col>
      </Row>
      <div className="hstack gap-5 mb-lg-8 mb-5">
        <Badge color="none" className="badge-blue">
          {subjectTranslationHandle(historyInfo)}
        </Badge>
        {historyInfo?.status === "confirm_session" && (
          <span>
            <Image
              src={HierarchyTwoPointGrey}
              style={{ marginRight: "6px" }}
              alt="HierarchyTwoPointGrey"
            />
            <span className="text-light-blue-a text-10">
              {historyInfo?.duration}
            </span>
          </span>
        )}
      </div>
      {historyInfo?.status === "mutually_canceled_session" ? (
        <>
          <Row className="gx-lg-20 gy-10 mb-lg-8 mb-5">
            <Col lg="4" sm="4" xs="12">
              <h6 className="text-base font-bolder mb-8">
                {t("SessionCancelModal.OptionLabel")}
              </h6>
              <p className="text-light-blue-a">
                {historyInfo?.user?.reason_for_cancellation
                  ? historyInfo?.user?.reason_for_cancellation
                  : "—"}
              </p>
            </Col>
            <Col lg="4" sm="4" xs="12">
              <h6 className="text-base font-bolder mb-8">Annulé par</h6>
              <div className="pe-4 position-relative d-lg-block d-none">
                <div className="d-flex w-full align-items-center">
                  <span className="me-3">
                    <ShowImage
                      className="avatar avatar-sm rounded-circle bg-light-blue-a"
                      imageName={historyInfo?.user?.profile_image}
                      width={68}
                      height={68}
                    />
                  </span>
                  <div className="hstack me-3">
                    <span>
                      {`${historyInfo?.user?.first_name} ${historyInfo?.user?.last_name}`}
                    </span>
                  </div>
                  <span
                    className="badge bg-light-blue-c text-dark-blue-c text-uppercase p-1"
                    style={{ ["--x-badge-font-size"]: "8px" }}
                  >
                    {historyInfo?.user?.role_name}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <div className="mb-lg-8 mb-5">
            <h6 className="text-base font-bolder mb-8">Notes aditionnelles</h6>
            <p className="text-light-blue-a">
              {historyInfo?.user?.next_meeting_summary !== "null"
                ? historyInfo?.user?.next_meeting_summary
                : "—"}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="mb-lg-8 mb-5">
            <h6 className="text-base font-bolder mb-8">
              {t("SessionDetail.DateSummary")}
            </h6>
            <p className="text-light-blue-a">
              {historyInfo?.status === "absent_student"
                ? historyInfo?.user?.reason_for_cancellation
                  ? historyInfo?.user?.reason_for_cancellation
                  : "—"
                : historyInfo?.user?.dating_summary
                ? historyInfo?.user?.dating_summary
                : historyInfo?.dating_summary
                ? historyInfo?.dating_summary
                : "—"}
            </p>
          </div>
          <div className="mb-lg-8 mb-5">
            <h6 className="text-base font-bolder mb-8">
              {t("SessionDetail.ThingTodoNextMeeting")}
            </h6>
            <p className="text-light-blue-a">
              {historyInfo?.user?.next_meeting_summary !== "null"
                ? historyInfo?.user?.next_meeting_summary
                : historyInfo?.next_meeting_summary !== "null"
                ? historyInfo?.next_meeting_summary
                : "—"}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default ShowSessionDetails;
