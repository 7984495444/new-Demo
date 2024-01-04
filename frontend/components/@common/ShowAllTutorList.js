import { t } from "i18next";
import { ArrowLeft, CloseSquare, TickSquare } from "iconsax-react";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  Table,
} from "reactstrap";
import MatchedStudentScore from "./MatchedStudentScore";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import { useDispatch } from "react-redux";
import { acceptedMatchedAction } from "@/redux/actions/allStudentAction";
import ShowImage from "./ShowImage";

const ShowAllTutorList = ({
  getAllSTudentMatchedTutor,
  showMoreDetailsHandle,
  acceptedMatchedHandle,
}) => {
  const [showScoreModle, setShowScoreModle] = useState(false);
  const [scoreModleInfo, setScoreModleInfo] = useState(null);

  const showScoreModleHandle = (val) => {
    setScoreModleInfo(val);
    setShowScoreModle(!showScoreModle);
  };

  return (
    <>
      <Card>
        <CardBody className="py-8">
          <div className="d-flex gap-3 mb-4 position-lg-absolute top-lg-0 start-lg-0 mt-lg-n10 w-full">
            <span className="cursor-pointer">
              <ArrowLeft size={18} onClick={showMoreDetailsHandle} />
            </span>
            <Breadcrumb
              onClick={showMoreDetailsHandle}
              className="cursor-pointer"
            >
              <BreadcrumbItem>
                {t("MatchAllStudents.AllStudentsNavigate")}
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <Table
            className="mt-6 table-border-seprate"
            style={{ minWidth: "800px" }}
            responsive
          >
            <thead>
              <tr>
                <th width="2%" className="font-bolder">
                  {t("MatchAllStudents.Rankings")}
                </th>
                <th width="10%" className="font-bolder">
                  {t("MatchAllStudents.Student")}
                </th>
                <th width="10%" className="font-bolder">
                  {t("MatchAllStudents.Tutor")}
                </th>
                <th width="10%" className="font-bolder">
                  {t("MatchAllStudents.Subject")}
                </th>
                <th width="5%" className="font-bolder">
                  {t("MatchAllStudents.Score")}
                </th>
                <th width="10%" className="font-bolder">
                  {t("TutorStudentDashboard.Actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getAllSTudentMatchedTutor &&
                getAllSTudentMatchedTutor?.map((val, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td className="bg-white position-sticky start-0 overlap-10 min-w-max">
                        <ShowImage
                          className="avatar w-8 h-8 rounded-circle me-3"
                          imageName={val?.student_profile_image}
                          width={68}
                          height={68}
                        />
                        <span className="pe-4">
                          {`${val?.student_first_name} ${val?.student_last_name}`}
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
                      <td>{val?.total_score}</td>
                      <td>
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
                          className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                          onClick={() => showScoreModleHandle(val)}
                        >
                          {t("MatchAllStudents.MoreDetails")}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      {showScoreModle && (
        <MatchedStudentScore
          show={showScoreModle}
          hide={() => showScoreModleHandle()}
          scoreModleInfo={scoreModleInfo}
        />
      )}
    </>
  );
};

export default ShowAllTutorList;
