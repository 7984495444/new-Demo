import React, { useState } from "react";
import moment from "moment";
import LectureCardForParents from "../calender/LectureCardForParents";
import { allDay } from "@/utils/data";
import { useRouter } from "next/router";
import { DeleteSessionModal, NewSessionModal, show24HourTime } from "../index";
import { t } from "i18next";

const DashboardInShowWeekCalender = ({
  getAllcurrentWeekSession,
  isStudent,
  isParent,
}) => {
  const router = useRouter();

  const [editSessionInfo, setEditSessionInfo] = useState();
  const [editSessionShowModal, setEditSessionShowModal] = useState(false);
  const [deleteSessionInfo, setDeleteSessionInfo] = useState();
  const [deteleSessionShowModal, setDeteleSessionShowModal] = useState(false);
  const [editSessionInfoFlag, setEditSessionInfoFlag] = useState(false);
  const [deleteSessionInfoFlag, setDeleteSessionInfoFlag] = useState(false);

  // current date to get current week
  let curr = Date.now();
  const Newdate = new Date(curr);
  let curentWeek = [];
  let data = [];

  for (let i = 1; i <= 7; i++) {
    let first = Newdate.getDate() - Newdate.getDay() + i;
    let days = new Date(Newdate.setDate(first));
    curentWeek.push({ days });
    for (let index = 0; index < getAllcurrentWeekSession.length; index++) {
      const element = getAllcurrentWeekSession[index];
      if (
        moment(days).format("DD/MM/YYYY") ===
          moment(element.session_date).format(
            // moment(convertToUserTimeZone(element.session_date)).format(
            "DD/MM/YYYY"
          ) &&
        moment(days).diff(moment(), "hours") >= 0
      ) {
        data.push(element);
      }
    }
  }

  // comparison day
  const showPerDayEventsCounts = (val) => {
    let count = 0;
    for (let i = 0; i < getAllcurrentWeekSession?.length; i++) {
      const el = getAllcurrentWeekSession[i];
      if (
        moment(val.days).format("DD/MM/YYYY") ===
        // moment(convertToUserTimeZone(el.session_date)).format("DD/MM/YYYY")
        moment(el.session_date).format("DD/MM/YYYY")
      ) {
        count++;
      }
    }
    return count;
  };

  const showSessionEditModalHandle = (val, type) => {
    setEditSessionInfoFlag(type);
    setEditSessionInfo(val);
    setEditSessionShowModal(!editSessionShowModal);
  };

  const showSessionDeleteModalHandle = (val, type) => {
    setDeleteSessionInfoFlag(type);
    setDeteleSessionShowModal(!deteleSessionShowModal);
    setDeleteSessionInfo(val);
  };

  const handleClickMessageUser = (item) => {
    router.push({
      pathname: "/messages",
      query: { ...item?.user },
    });
  };

  return (
    <>
      {curentWeek.map((val, index) => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const noOfSession = showPerDayEventsCounts(val);
        return (
          moment(val?.days).diff(moment(), "hours") >= 0 &&
          noOfSession > 0 && (
            <div className="px-0 pb-6" key={index}>
              <p
                className="mb-4"
                style={
                  allDay[dayOfWeek - 1].name === allDay[index].name
                    ? { fontWeight: "bold" }
                    : {}
                }
              >
                {/* Lundi */}
                {t(allDay[index].name)}
                <span>
                  {" "}
                  {/* ({noOfSession}) */}({moment(val.days).format("DD")})
                </span>
              </p>
              <div className="vstack gap-3 border-light-blue-c">
                {getAllcurrentWeekSession &&
                  getAllcurrentWeekSession?.map((item, idx) => {
                    // var GivenDate = convertToUserTimeZone(item.session_date);
                    var GivenDate = item.session_date;
                    var CurrentDate = new Date();

                    return (
                      moment(val.days).format("DD/MM/YYYY") ===
                        moment(item.session_date).format(
                          // moment(convertToUserTimeZone(item.session_date)).format(
                          "DD/MM/YYYY"
                        ) && (
                        <LectureCardForParents
                          sessionInfo={item}
                          GivenDate={GivenDate}
                          CurrentDate={CurrentDate}
                          showEditSessionModal={(e, t) =>
                            showSessionEditModalHandle(e, t)
                          }
                          showDeleteSessionModal={(e, t) =>
                            showSessionDeleteModalHandle(e, t)
                          }
                          handleDisableState={(e, t) => show24HourTime(e, t)}
                          handleClickMessageUser={() =>
                            handleClickMessageUser(item, "calander")
                          }
                          isSetClass={false}
                          isStudent={isStudent}
                          isParent={isParent}
                          onClick={(e) => e.stopPropagation()}
                          isDashboard={true}
                          key={idx}
                        />
                      )
                    );
                  })}
              </div>
            </div>
          )
        );
      })}
      {data?.length === 0 && <p>{t("StudentDashboard.NoUpcomingSessions")}</p>}
      {editSessionShowModal && (
        <NewSessionModal
          type={editSessionInfoFlag}
          show={editSessionShowModal}
          hide={() => showSessionEditModalHandle()}
          sessionData={editSessionInfo}
          weekType={!editSessionInfoFlag}
          userRole="dashboard"
          isParentDashboard={isParent ? true : false}
        />
      )}
      {deteleSessionShowModal && (
        <DeleteSessionModal
          type={deleteSessionInfoFlag}
          show={deteleSessionShowModal}
          hide={() => showSessionDeleteModalHandle()}
          sessionData={deleteSessionInfo}
          student={false}
          weekType={!editSessionInfoFlag}
          id={true}
        />
      )}
    </>
  );
};

export default DashboardInShowWeekCalender;
