import { updateDeleteSessionNotification } from "@/redux/actions/sendNotificationAction";
import { t } from "i18next";
import { Like1, Note } from "iconsax-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import ShowImage from "../@common/ShowImage";
import CompleteSessionModal from "../modal/session/CompleteSessionModal";

const TutorToDoList = ({ getAllToDoList, complateSessionHistoryHandle }) => {
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
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <Row className="gy-2 justify-content-between">
            <Col xs="auto">
              <p>{t("TutorDeshbord.Todo")}</p>
            </Col>
            <Col xs="auto">
              <Input
                type="select"
                className="select-custom-first text-11 rounded-2 font-semibold"
              >
                <option defaultValue>{t("TutorDeshbord.Today")}</option>
              </Input>
            </Col>
          </Row>
        </CardHeader>
        <CardBody className="pt-2 h-xl-88 h-lg-80 overflow-y-lg-auto ">
          <div className="vstack gap-4">
            {getAllToDoList &&
              getAllToDoList?.map((val, index) => {
                return (
                  val?.is_read === 0 && (
                    <div className="hstack align-items-start gap-3" key={index}>
                      <>
                        {/* <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-orange"> */}
                        {val?.message_en === "Follow-up Report" ? (
                          <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-blue">
                            <Like1 className="icon-main" />
                          </span>
                        ) : (
                          <span className="h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-orange">
                            <Note className="icon-main" />
                          </span>
                        )}
                        <div
                          onClick={() =>
                            val?.message_en === "Follow-up Report"
                              ? redirectStudentEvlucationPage(val)
                              : showSessionCompleteModalHandal(val, true)
                          }
                          className="cursor-pointer"
                        >
                          <p className="text-sm">{t(val?.message_fr)}</p>
                          <div className="d-flex gap-2 mt-1">
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
                      </>
                    </div>
                  )
                );
              })}
          </div>
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
};

export default TutorToDoList;
