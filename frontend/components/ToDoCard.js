import { ArrowRight, Like1, Note } from "iconsax-react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { t } from "i18next";
import { updateDeleteSessionNotification } from "@/redux/actions/sendNotificationAction";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import ShowImage from "./@common/ShowImage";
import CompleteSessionModal from "./modal/session/CompleteSessionModal";

function ToDoCard({ val }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showSessionCompleteModalBtn, setShowSessionCompleteModalBtn] =
    useState(false);
  const [complateSessionData, setComplateSessionData] = useState();

  const redirectStudentEvlucationPage = (val) => {
    let item = {
      student_id: val?.student?.id,
      subject_id: val?.subject?.id,
      student_first_name: val?.student?.first_name,
      student_last_name: val?.student?.last_name,
      student_parent_id: val?.student?.parent_id,
      notificationId: null,
      toDoListId: val?.id,
    };
    dispatch(
      updateDeleteSessionNotification(
        val?.tutor?.id,
        val?.tutor?.id,
        val?.session?.id
      )
    );
    router.push({
      pathname: "/student",
      query: { ...item, isTutorFollow: true },
    });
  };

  const showSessionCompleteModalHandal = (val, type) => {
    setComplateSessionData({
      complete_session_id: false,
      id: val?.session?.id,
      name: `${val?.student?.first_name}  ${val?.student?.last_name}`,
      session_time: val?.session?.session_time,
      session_duration: val?.session?.session_duration,
      start: val?.session?.session_date,
      profile_image: val?.student?.profile_image,
      subject: val?.subject?.subject_name,
      end: val?.session?.session_date,
      subject_id: val?.subject?.id,
      student_id: val?.student?.id,
    });
    if (type) {
      dispatch(
        updateDeleteSessionNotification(
          val?.tutor?.id,
          val?.tutor?.id,
          val?.session?.id
        )
      );
    }
    setShowSessionCompleteModalBtn(!showSessionCompleteModalBtn);
  };

  return (
    <>
      <Card className="border border-2 border-light-blue-c to-do-card">
        <CardBody className="p-sm-6 p-4">
          <div className="d-flex align-items-start gap-3">
            {/* <span className="h-12 w-12 rounded-2 icon-wrapper wrapper-blue flex-none">
            <DocumentText />
          </span> */}
            {val?.message_en === "Follow-up Report" ? (
              <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-blue">
                <Like1 className="icon-main" />
              </span>
            ) : (
              <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-orange">
                <Note className="icon-main" />
              </span>
            )}
            <div>
              <p>{t("ToDoCard.SessionSummary")}</p>
              <div className="d-flex mt-1 gap-2">
                <ShowImage
                  className="avatar avatar-xs rounded-circle bg-light-blue-a flex-none"
                  imageName={val?.student?.profile_image}
                  width={100}
                  height={100}
                />
                <span className="text-light-blue-a">
                  {`${val?.student?.first_name}  ${val?.student?.last_name}`}
                </span>
              </div>
            </div>
          </div>
          <Row className="pt-3">
            <Col xs="9">
              <span className="text-light-blue-a">12 Juin 2023</span>
            </Col>
            <Col xs="3" className="text-end">
              {/* <Link className="link-dark-blue-a ms-auto" href="/"> */}
              <ArrowRight
                color="#0D465B"
                size="16"
                className="cursor-pointer"
                onClick={() =>
                  val?.message_en === "Follow-up Report"
                    ? redirectStudentEvlucationPage(val)
                    : showSessionCompleteModalHandal(val, true)
                }
              />
              {/* </Link> */}
            </Col>
          </Row>
        </CardBody>
      </Card>
      {showSessionCompleteModalBtn && (
        <CompleteSessionModal
          type={false}
          show={showSessionCompleteModalBtn}
          hide={() => showSessionCompleteModalHandal()}
          sessionInfo={complateSessionData}
        />
      )}
    </>
  );
}
export default ToDoCard;
