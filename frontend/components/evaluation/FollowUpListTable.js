import moment from "moment";
import React from "react";
import { Badge, Button, Progress, Table } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import { t } from "i18next";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import ShowImage from "../@common/ShowImage";

const FollowUpListTable = ({ isSecondTab, followUp, showHandal }) => {
  return (
    <>
      <Table
        style={{ minWidth: "800px" }}
        className="mb-10 table-border-seprate"
        responsive
      >
        <thead>
          <tr>
            <th
              width="25%"
              className="font-bolder bg-white position-sticky start-0"
            >
              {t("TutorEvaluation.Name")}
            </th>
            <th width="16%" className="font-bolder">
              {t("TutorEvaluation.Class")}
            </th>
            <th width="16%" className="font-bolder">
              {`${isSecondTab ? " Role" : "N. de séances"}`}
            </th>
            <th width="16%" className="font-bolder">
              {t("TutorEvaluation.AssessmentDate")}
            </th>
            <th width="22%" className="font-bolder pe-lg-14">
              {`${
                isSecondTab
                  ? " Évaluation générale"
                  : "Progression vers l'objectif"
              }`}
            </th>
            <th width="5%" className="font-bolder">
              {t("TutorEvaluation.Action")}
            </th>
          </tr>
        </thead>
        <tbody>
          {followUp &&
            followUp?.followups?.map((val, index) => {
              return (
                <tr key={index}>
                  <td className="bg-white position-sticky start-0 overlap-10 min-w-max">
                    <div className="hstack gap-3">
                      <ShowImage
                        className="avatar w-8 h-8 rounded-circle flex-none"
                        imageName={val?.profile_image}
                        width={68}
                        height={68}
                      />
                      <div>
                        <span className="d-block">
                          {`${val?.first_name} ${val?.last_name}`}
                        </span>
                        {isSecondTab && (
                          <>
                            {val?.role === "parent" ? (
                              <span className="text-light-blue-a">
                                {`${val?.student_first_name} ${val?.student_last_name}’s parent`}
                              </span>
                            ) : (
                              <span className="text-light-blue-a">
                                {`${val?.parent_first_name} ${val?.parent_last_name}’s child`}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td> {subjectTranslationHandle(val)}</td>
                  <td>
                    {isSecondTab ? (
                      <Badge
                        className="bg-light-blue-c text-dark-blue-a p-1"
                        color="none"
                      >
                        {val?.role === "student" ? "Élève" : "Parent"}
                      </Badge>
                    ) : (
                      `${val?.confirm_sessions} / ${val?.total_session}`
                    )}
                  </td>
                  <td>
                    {val?.date_of_assessment
                      ? moment(val?.date_of_assessment).format("DD/MMM/YY")
                      : "-"}
                  </td>
                  <td className="pe-lg-14">
                    {isSecondTab ? (
                      <Rating
                        size={20}
                        fillColor="#FECA36"
                        emptyColor="#D9D9D9"
                        allowFraction={true}
                        iconsCount={5}
                        initialValue={val?.general_assessment}
                        readonly
                        transition
                        label
                      />
                    ) : (
                      <div className="d-flex align-items-center gap-3">
                        <Progress
                          className="flex-fill"
                          style={{
                            height: "4px",
                          }}
                          value={val?.progress_percentage}
                          color="dark-blue-c"
                        />
                        <span className="w-12 flex-none">
                          {val?.progress_percentage} %
                        </span>
                      </div>
                    )}
                  </td>
                  <td>
                    <Button
                      color="none"
                      size="sm"
                      className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                      onClick={() => showHandal(val)}
                    >
                      {t("TutorEvaluation.SeeReviews")}
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

export default FollowUpListTable;
