import React from "react";
import { t } from "i18next";
import { ArrowCircleDown2 } from "iconsax-react";
import moment from "moment";
import { Badge, Button, Table } from "reactstrap";
import { CompleteSessionDownloadDocHandal } from "../document/CompleteSessionDownloadDoc";
import { subjectTranslationHandle } from "../../utils/subjectTranslationFuncationsn";

const SessionHistoryList = ({
  subjectDetails,
  sessionDetailShowHandal,
  isStudentRole,
}) => {
  return (
    <>
      <Table className="mt-4 session-history-table" responsive>
        <thead>
          <tr>
            <th
              width="20%"
              className="font-bolder bg-white position-sticky start-0"
            >
              <span className="font-bolder">
                {t("SessionHistory.ProgramName")}
              </span>
            </th>
            <th width="15%">
              <span className="font-bolder">
                {t("SessionHistory.SessionDate")}
              </span>
            </th>
            <th width="14%">
              <span className="font-bolder">{t("SessionHistory.Status")}</span>
            </th>
            {!isStudentRole && (
              <th width="13%">
                <span className="font-bolder">
                  {t("SessionHistory.Session")}
                </span>
              </th>
            )}
            <th width="13%">
              <span className="font-bolder">
                {t("SessionHistory.Duration")}
              </span>
            </th>
            <th width="20%">
              <span className="font-bolder">
                {t("SessionHistory.Document")}
              </span>
            </th>
            <th width="5%">
              <span className="font-bolder">{t("SessionHistory.Actions")}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {subjectDetails &&
            subjectDetails?.tutor_student?.map((val, index) => {
              return (
                <tr key={index}>
                  <td
                    className={`${
                      val?.status === "confirm_session"
                        ? "text-dark-blue-a"
                        : "text-light-blue-a"
                    } bg-white position-sticky start-0 overlap-10 min-w-max`}
                  >
                    <span className="row-bg" />
                    <span className="pe-4">
                      {/* show here program name not subject name */}
                      {subjectTranslationHandle(val)}
                    </span>
                  </td>
                  <td
                    className={
                      val?.status === "confirm_session"
                        ? "text-dark-blue-a"
                        : "text-light-blue-a"
                    }
                  >
                    {moment(val?.session_date).format("DD/MMM/YY")}
                  </td>
                  <td>
                    {val?.status === "confirm_session" ? (
                      <Badge color="none" className="badge-green">
                        {t("SessionDetail.Confirm")}
                      </Badge>
                    ) : val?.status === "absent_student" ? (
                      <Badge color="none" className="badge-red">
                        {t("SessionDetail.AbsentStudent")}
                      </Badge>
                    ) : val?.status === "mutually_canceled_session" ? (
                      <Badge color="none" className="badge-orange">
                        {t("SessionDetail.SessionCanceled")}
                      </Badge>
                    ) : (
                      <span> - </span>
                    )}
                  </td>
                  {!isStudentRole && (
                    <td>
                      <span>
                        {val?.status
                          ? `${val?.confirm_sessions}/${val?.total_session}`
                          : "—"}
                      </span>
                    </td>
                  )}
                  <td>
                    <span>
                      {val?.status && val.duration !== null
                        ? `${val?.duration}`
                        : "—"}
                    </span>
                  </td>
                  <td>
                    <>
                      {val?.document_name ? (
                        <Badge
                          color="none"
                          className="bg-light-blue-c text-dark-blue-a d-inline-flex align-items-center"
                        >
                          <span className="d-inline-block w-30 text-truncate">
                            {val?.document_name}
                          </span>
                          <Button color="none" size="sm" className="p-0">
                            <ArrowCircleDown2
                              onClick={() =>
                                CompleteSessionDownloadDocHandal(
                                  val?.document_name
                                )
                              }
                              size="20"
                              className="text-dark-blue-c"
                            />
                          </Button>
                        </Badge>
                      ) : (
                        "Sans document"
                      )}
                    </>
                  </td>
                  <td>
                    <Button
                      color="none"
                      className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                      size="sm"
                      onClick={() => sessionDetailShowHandal(val)}
                    >
                      {t("TutorStudentDashboard.ViewDetail")}
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default SessionHistoryList;
