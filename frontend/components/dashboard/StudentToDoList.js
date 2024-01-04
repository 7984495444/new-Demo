import { CheckGreen } from "@/assets/images";
import { updateDeleteSessionNotification } from "@/redux/actions/sendNotificationAction";
import { t } from "i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Progress,
  Row,
} from "reactstrap";
import ShowImage from "../@common/ShowImage";

const StudentToDoList = ({ getAllToDoList, complateSessionHistoryHandle }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const calculateProgressPercenteageHandle = () => {
    if (getAllToDoList?.length > 0) {
      return (
        (toDolistINNotComplatedTaskHandle(1) * 100) /
        getAllToDoList?.length
      ).toFixed(0);
    } else {
      return "0";
    }
  };

  const toDolistINNotComplatedTaskHandle = (read) => {
    let readList = getAllToDoList?.filter((val) => val?.is_read === read);
    return readList?.length;
  };

  const sendFollwUpHandle = (val) => {
    router.push(
      {
        pathname: "/student-parent-evaluations",
        query: {
          student: val?.student?.id,
          tutor: val?.tutor?.id,
          subject: val?.subject?.id,
          tutor_name: val?.tutor?.first_name,
          tutor_last_name: val?.tutor?.last_name,
          session: val?.session?.id,
          toDoListId: val?.id,
          isParent: false,
        },
      },
      "/student-parent-evaluations"
    );
  };

  const sendSessionHistoryHandle = (val) => {
    dispatch(
      updateDeleteSessionNotification(
        val?.tutor?.id,
        val?.student?.id,
        val?.session?.id
      )
    );
    complateSessionHistoryHandle(val);
  };

  return (
    <Card>
      <CardHeader className="px-4 pt-4 pb-0">
        <Row>
          <Col>
            <p>{t("StudentDashboard.ToDo")}</p>
          </Col>
          <Col>
            <h6 className="text-green font-bolder text-end">
              {calculateProgressPercenteageHandle()}%
            </h6>
          </Col>
        </Row>
        <Progress
          color="green"
          className="my-6"
          value={calculateProgressPercenteageHandle()}
        />
        <Row>
          <Col>
            <p>
              {t("StudentDashboard.Tasks")} (
              {toDolistINNotComplatedTaskHandle(0)})
            </p>
          </Col>
          {/* <Col>
          <Input
            type="select"
            className="select-custom-first text-11 rounded-2 font-semibold ms-auto w-auto"
          >
            <option defaultValue>
              {t("StudentDashboard.Today")}
            </option>
          </Input>
        </Col> */}
        </Row>
      </CardHeader>
      <CardBody
        className="px-4 pb-4 pt-0 h-lg-calc overflow-auto"
        style={{ ["--x-h-lg"]: "456px" }}
      >
        {getAllToDoList &&
          getAllToDoList?.map((val, index) => {
            return (
              <div
                className="py-4 border-bottom position-relative"
                key={index}
                onClick={
                  () =>
                    val?.message_en === "Follow-up Report"
                      ? sendFollwUpHandle(val)
                      : val?.message_en === "Session Summary"
                      ? sendSessionHistoryHandle(val)
                      : ""
                  // toDoListHandle(val)
                }
              >
                <FormGroup className="form-check-linethrough mb-2" check>
                  <Input
                    className="w-5 h-5 mt-0 rounded-1 flex-none"
                    id={index + 1}
                    type="checkbox"
                    checked={val?.is_read === 1}
                    readOnly
                  />
                  <Label for={index + 1} check>
                    {t(val?.message_fr)}
                  </Label>
                  {val?.is_read === 1 && (
                    <span
                      className={`h-6 w-6 rounded-2 icon-wrapper wrapper-green position-absolute end-0 top-3`}
                    >
                      <Image
                        src={CheckGreen}
                        width={9}
                        height={6}
                        alt="Checked"
                      />
                    </span>
                  )}
                </FormGroup>
                <div className="ps-7">
                  <ShowImage
                    className="avatar h-5 w-5 rounded-circle bg-light-blue-a me-1"
                    imageName={
                      val?.message_en === "Follow-up Report"
                        ? val?.tutor?.profile_image
                        : val?.student?.profile_image
                    }
                    width={68}
                    height={68}
                  />
                  <span className="text-light-blue-a">
                    {val?.message_en === "Follow-up Report"
                      ? `${val?.tutor?.first_name}  ${val?.tutor?.last_name}`
                      : `${val?.student?.first_name}  ${val?.student?.last_name}`}
                  </span>
                </div>
              </div>
            );
          })}
        {/* <div className="py-4 border-bottom">
        <FormGroup
          className="form-check-linethrough mb-2"
          check
        >
          <Input
            className="w-5 h-5 mt-0 rounded-1 flex-none"
            id="task-2"
            type="checkbox"
          />
          <Label for="task-2" check>
            {t("StudentDashboard.CompleteYourProfile")}
          </Label>
        </FormGroup>
        <div className="ps-7">
          <Link href="" className="link-light-blue-a">
            <u>{t("StudentDashboard.ViewPreference")}</u>{" "}
            <ArrowRight size="14" className="ms-1" />
          </Link>
        </div>
      </div> */}
      </CardBody>
    </Card>
  );
};

export default StudentToDoList;
