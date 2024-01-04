import { t } from "i18next";
import React from "react";
import { Button, Table } from "reactstrap";
import { TickSquare, CloseSquare } from "iconsax-react";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import { useDispatch } from "react-redux";
import { acceptedMatchedAction } from "@/redux/actions/allStudentAction";
import ShowImage from "./ShowImage";
const StudentListForDemo = ({
  allStudent,
  showMoreDetailsHandle,
  data,
  currentPage,
  perPage,
  searchInfo,
}) => {
  const dispatch = useDispatch();

  const acceptedMatchedHandle = (val, status) => {
    dispatch(
      acceptedMatchedAction(
        val?.tutor_id,
        val?.student_id,
        val?.subject_id,
        status,
        currentPage,
        perPage,
        searchInfo
      )
    );
  };

  return (
    <Table
      className="mt-6 table-border-seprate mb-4"
      style={{ minWidth: "800px" }}
      responsive
    >
      <thead>
        <tr>
          <th width="20%" className="font-bolder">
            {t("MatchAllStudents.Student")}
          </th>
          <th width="20%" className="font-bolder">
            {t("MatchAllStudents.Tutor")}
          </th>
          <th width="20%" className="font-bolder">
            {t("MatchAllStudents.Subject")}
          </th>
          <th width="10%" className="font-bolder">
            {data === 0 && t("MatchAllStudents.Actions")}
          </th>
        </tr>
      </thead>
      <tbody>
        {allStudent?.map((val, index) => {
          return (
            <tr key={index}>
              <td className="bg-white position-sticky start-0 overlap-10 min-w-max">
                <ShowImage
                  className="avatar w-8 h-8 rounded-circle me-3"
                  imageName={val?.profile_image}
                  width={68}
                  height={68}
                />
                <span className="pe-4">
                  {`${val?.first_name} ${val?.last_name}`}
                </span>
              </td>
              <td>
                <ShowImage
                  className="avatar w-8 h-8 rounded-circle me-3"
                  imageName={val?.tutor_profile_image}
                  width={68}
                  height={68}
                />
                <span className="pe-4">
                  {`${val?.tutor_first_name} ${val?.tutor_last_name}`}
                </span>
              </td>
              <td>{subjectTranslationHandle(val)}</td>
              <td>
                {data === 0 && (
                  <>
                    <TickSquare
                      size="38"
                      color="green"
                      variant="Bold"
                      className="me-2 cursor-pointer"
                      onClick={() => acceptedMatchedHandle(val, 1)}
                    />

                    <CloseSquare
                      size="38"
                      color="red"
                      variant="Bold"
                      className="me-2 cursor-pointer"
                      onClick={() => acceptedMatchedHandle(val, 2)}
                    />
                    <Button
                      color="none"
                      className={`bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover ${
                        data == 0 && "ms-4"
                      }`}
                      onClick={() => showMoreDetailsHandle(val)}
                    >
                      {t("MatchAllStudents.MoreDetails")}
                    </Button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default StudentListForDemo;
