import { t } from "i18next";
import { User } from "iconsax-react";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { Button, Table } from "reactstrap";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import i18n from "@/utils/i18nextInit";
import ShowImage from "../@common/ShowImage";

const StudentStatistics = ({
  isParent,
  getStudentStatistics,
  redirectTutorProfileHandle,
  getMySchoolLevel,
}) => {
  const router = useRouter();

  const showStudentProfileHandal = (val) => {
    if (isParent) {
      redirectTutorProfileHandle(val, true);
    } else {
      router.push("/profile");
    }
  };

  return (
    <Table className="td-border-none" style={{ minWidth: "800px" }} responsive>
      <thead>
        <tr>
          <th width="25%" className="font-bolder align-bottom lh-snug">
            <span className="text-pre-line">
              {t("StudentDashboard.Student")}
            </span>
          </th>
          <th width="10%" className="font-bolder align-bottom lh-snug">
            <span className="text-pre-line">
              {t("StudentDashboard.AcademicLevel")}
            </span>
          </th>
          <th width="10%" className="font-bolder align-bottom lh-snug">
            <span className="text-pre-line">
              {t("StudentDashboard.SubjectTaught")}
            </span>
          </th>
          <th width="15%" className="font-bolder align-bottom lh-snug">
            <span className="text-pre-line">
              {t("StudentDashboard.FirstSession")}
            </span>
          </th>
          <th width="20%" className="font-bolder align-bottom lh-snug">
            <span className="text-pre-line">
              {t("StudentDashboard.LastSession")}
            </span>
          </th>
          <th width="10%" className="font-bolder align-bottom lh-snug">
            <span className="text-pre-line">
              {t("StudentDashboard.Action")}
            </span>
          </th>
        </tr>
      </thead>
      {getStudentStatistics &&
        getStudentStatistics?.map((val, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td className="font-semibold">
                  <div className="hstack gap-3">
                    <ShowImage
                      className="avatar w-8 h-8 rounded-circle flex-none"
                      imageName={val?.student_profile_image}
                      width={68}
                      height={68}
                    />
                    <span>{`${val?.student_first_name} ${val?.student_last_name}`}</span>
                  </div>
                </td>
                <td className="font-semibold">
                  {val?.school_level
                    ? getMySchoolLevel &&
                      getMySchoolLevel?.map((it, index) => {
                        return (
                          it?.id === Number(val?.school_level) && (
                            <p value={it?.value} key={index}>
                              {i18n.language === "en" ? it.name_en : it.name_fr}
                            </p>
                          )
                        );
                      })
                    : " — "}
                </td>
                <td className="font-semibold">
                  {val?.subjects?.map((item, i) => {
                    return <p key={i}> {subjectTranslationHandle(item)}</p>;
                    // return <p key={i}>{item?.subject_name}</p>;
                  })}
                </td>
                <td className="font-semibold">
                  {val?.first_session_date?.map((item, index) => {
                    return (
                      <p key={index}>
                        {item?.session_date
                          ? moment(
                              item?.session_date
                              // convertToUserTimeZone(item?.session_date)
                            ).format("DD/MMM/YY")
                          : "—"}
                      </p>
                    );
                  })}
                </td>
                <td className="font-semibold">
                  {val?.last_session_date?.map((item, i) => {
                    return (
                      <p key={i}>
                        {item?.session_date
                          ? moment(
                              item?.session_date
                              // convertToUserTimeZone(item?.session_date)
                            ).format("DD/MMM/YY")
                          : "—"}
                      </p>
                    );
                  })}
                </td>
                <td className="font-semibold">
                  <Button
                    color="none"
                    className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                    onClick={() => showStudentProfileHandal(val)}
                  >
                    <User className="me-2" size={18} />
                    {t("StudentDashboard.ViewProfile")}
                  </Button>
                </td>
              </tr>
            </tbody>
          );
        })}
    </Table>
  );
};

export default StudentStatistics;
