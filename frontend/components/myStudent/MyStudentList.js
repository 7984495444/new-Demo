import React, { useState } from "react";
import { t } from "i18next";
import { ArrowDown2, Category, Like1, Message2, User } from "iconsax-react";
import moment from "moment";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
} from "reactstrap";
import { useRouter } from "next/router";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import ShowImage from "../@common/ShowImage";

const MyStudentList = ({
  student,
  sessionHistotyShowHandal,
  showStudentForEvaluationPageHandal,
  showStudentProfileHandal,
}) => {
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [seletedBtn, setseletedBtn] = useState(null);

  // toggle droupdown with particluer index
  const toggleDropdown = (index) => {
    setseletedBtn(index);
    setDropdownOpen(!dropdownOpen);
  };

  // redirect messages handal (tutor -> student)
  const redirectMessagePageHandal = async (data) => {
    router.push({
      pathname: "/messages",
      query: {
        id: data?.student_id,
        first_name: data?.student_first_name,
        last_name: data?.student_last_name,
        profile_image: data?.student_profile_image,
      },
    });
  };

  return (
    <>
      <Table
        className="mt-6 table-border-seprate"
        style={{ minWidth: "800px" }}
        responsive
      >
        <thead>
          <tr>
            <th
              width="20%"
              className="font-bolder bg-white position-sticky start-0"
            >
              {t("TutorStudentDashboard.People")}
            </th>
            <th width="15%" className="font-bolder">
              {t("TutorStudentDashboard.AcademicLevel")}
            </th>
            <th width="22%" className="font-bolder">
              {t("TutorStudentDashboard.Subject")}
            </th>
            <th width="15%" className="font-bolder">
              {t("TutorStudentDashboard.FirstSession")}
            </th>
            <th width="22%" className="font-bolder">
              {t("TutorStudentDashboard.LastSession")}
            </th>
            <th width="6%" className="font-bolder">
              {t("TutorStudentDashboard.Actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {student &&
            student?.tutor_student?.map((val, index) => {
              return (
                <tr key={index}>
                  <td className="bg-white position-sticky start-0 overlap-10 min-w-max">
                    <ShowImage
                      className="avatar w-8 h-8 rounded-circle me-3"
                      imageName={val?.student_profile_image}
                      width={68}
                      height={68}
                    />
                    <span className="pe-4">{`${val.student_first_name} ${val.student_last_name}`}</span>
                  </td>
                  <td>Secondaire 3</td>
                  <td>{subjectTranslationHandle(val)}</td>
                  <td>
                    {val?.first_session_date
                      ? moment(val?.first_session_date).format("DD/MMM/YY")
                      : "—"}
                  </td>
                  <td>
                    {val?.last_session_date
                      ? moment(val?.last_session_date).format("DD/MMM/YY")
                      : "—"}
                  </td>
                  <td>
                    <Dropdown
                      isOpen={seletedBtn === index ? dropdownOpen : false}
                      toggle={() => toggleDropdown(index)}
                    >
                      <DropdownToggle
                        color="light-blue-c"
                        className="dropdown-2 dropdown--dark rounded-1"
                      >
                        <span className="me-2 text-base font-bold">
                          {t("TutorStudentDashboard.ViewDetail")}
                        </span>
                        <ArrowDown2
                          className="dropdown-2-toggle-icon"
                          size={13}
                        />
                      </DropdownToggle>
                      <DropdownMenu container="body">
                        <DropdownItem
                          className="link-light-blue-a"
                          onClick={() => sessionHistotyShowHandal(val)}
                        >
                          <Category
                            className="text-dark-blue-c me-2"
                            size={18}
                          />
                          {t("TutorStudentDashboard.SessionHistory")}
                        </DropdownItem>
                        <DropdownItem
                          className="link-light-blue-a"
                          onClick={() =>
                            showStudentForEvaluationPageHandal(val)
                          }
                        >
                          <Like1
                            className={`me-2 text-dark-blue-c`}
                            size={18}
                          />
                          {t("TutorStudentDashboard.FollowUpReport")}{" "}
                        </DropdownItem>
                        <DropdownItem
                          className="link-light-blue-a"
                          onClick={() => showStudentProfileHandal(val)}
                        >
                          <User className="text-dark-blue-c me-2" size={18} />
                          {t("TutorStudentDashboard.ViewProfile")}
                        </DropdownItem>
                        <DropdownItem
                          className="link-light-blue-a"
                          onClick={() => redirectMessagePageHandal(val)}
                        >
                          <Message2
                            className="text-dark-blue-c me-2"
                            size={18}
                          />
                          {t("TutorStudentDashboard.Chat")}{" "}
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default MyStudentList;
