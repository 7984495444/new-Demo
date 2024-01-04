import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, Row } from "reactstrap";
import moment from "moment";
import { useRouter } from "next/router";
import { allDay } from "@/utils/data";
import LectureCard from "./LectureCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { t } from "i18next";
import { getTutorLectureAction } from "@/redux/actions/lessonSpaceAction";
import { useDispatch } from "react-redux";
import NewSessionModal from "../modal/session/NewSessionModal";
import CompleteSessionModal from "../modal/session/CompleteSessionModal";
import DeleteSessionModal from "../modal/session/deleteSession/DeleteSessionModal";

const TutorCalendarDashboard = ({
  userData,
  getAllcurrentWeekSession,
  indexToScroll,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [editSessionInfo, setEditSessionInfo] = useState();
  const [editSessionShowModal, setEditSessionShowModal] = useState(false);
  const [showSessionCompleteModalBtn, setShowSessionCompleteModalBtn] =
    useState(false);
  const [complateSessionData, setComplateSessionData] = useState();
  const [deleteSessionInfo, setDeleteSessionInfo] = useState();
  const [deteleSessionShowModal, setDeteleSessionShowModal] = useState(false);
  const sliderRef = useRef(null);

  let curr = Date.now();
  const Newdate = new Date(curr);
  let curentWeek = [];

  for (let i = 1; i <= 7; i++) {
    let first = Newdate.getDate() - Newdate.getDay() + i;
    let days = new Date(Newdate.setDate(first));
    curentWeek.push({ days });
  }

  const showSessionEditModalHandle = (val) => {
    setEditSessionInfo(val);
    setEditSessionShowModal(!editSessionShowModal);
  };

  const showPerDayEventsCounts = (val) => {
    const selectedDate = moment(val.days).format("DD/MM/YYYY");

    // Assuming getAllcurrentWeekSession is an array
    return getAllcurrentWeekSession.filter((el) => {
      const sessionDate = moment(el.session_date).format("DD/MM/YYYY");
      return selectedDate === sessionDate;
    }).length;

    // let count = 0;
    // for (let i = 0; i < getAllcurrentWeekSession.length; i++) {
    //   const el = getAllcurrentWeekSession[i];
    //   if (
    //     moment(val.days).format("DD/MM/YYYY") ===
    //     moment(el.session_date).format("DD/MM/YYYY")
    //     // moment(convertToUserTimeZone(el.session_date)).format("DD/MM/YYYY")
    //   ) {
    //     count++;
    //   }
    // }
    // return count;
  };

  const showSessionCompleteModalHandal = (val) => {
    setComplateSessionData(val);
    setShowSessionCompleteModalBtn(!showSessionCompleteModalBtn);
  };

  const showSessionDeleteModalHandle = (val) => {
    setDeteleSessionShowModal(!deteleSessionShowModal);
    setDeleteSessionInfo(val);
  };

  const handleClickMessageUser = (item) => {
    router.push({
      pathname: "/messages",
      query: { ...item.student },
    });
  };

  useEffect(() => {
    if (sliderRef.current) {
      if (indexToScroll !== null) {
        sliderRef.current.slickGoTo(indexToScroll);
      } else {
        const today = new Date();
        const dayOfWeek = today.getDay();
        sliderRef.current.slickGoTo(dayOfWeek - 1);
      }
    }
  }, [indexToScroll]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    verticalSwiping: false,
    slidesToScroll: 3,
    // fade: "true",
    arrows: false,
    variableWidth: false,
    autoplay: false,
    autoplaySpeed: 500,
    cssEase: "linear",
    focusOnSelect: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const joinLectureHandle = (item) => {
    dispatch(
      getTutorLectureAction(userData?.id, item?.student_id, item?.subject_id)
    );
  };

  return (
    <>
      <Card>
        <CardBody
          className="px-6 pt-6 overflow-auto h-xl-calc h-lg-calc"
          style={{ ["--x-h-xl"]: "350px", ["--x-h-lg"]: "330px" }}
        >
          <Slider {...settings} ref={sliderRef}>
            {curentWeek.map((val, index) => {
              const today = new Date();
              const dayOfWeek = today.getDay();
              return (
                <div className="flex-none" key={index}>
                  <p
                    className="mb-4 ps-1"
                    style={
                      allDay[dayOfWeek - 1].name === allDay[index].name
                        ? { fontWeight: "bold" }
                        : {}
                    }
                  >
                    {t(allDay[index].name)}
                    <span>({showPerDayEventsCounts(val)})</span>
                  </p>

                  <div className="vstack gap-3 pe-sm-5 border-sm-end border-light-blue-c">
                    {getAllcurrentWeekSession?.map((item, idx) => {
                      var GivenDate = item.session_date;
                      // var GivenDate = convertToUserTimeZone(item.session_date);
                      var CurrentDate = new Date();
                      return (
                        moment(val.days).format("DD/MM/YYYY") ===
                          moment(item.session_date).format("DD/MM/YYYY") && (
                          <LectureCard
                            type={true}
                            item={item}
                            GivenDate={GivenDate}
                            CurrentDate={CurrentDate}
                            showEditSessionModal={(e) =>
                              showSessionEditModalHandle(e)
                            }
                            showSessionCompleteModal={(e) =>
                              showSessionCompleteModalHandal(e)
                            }
                            showDeleteSessionModal={(e) =>
                              showSessionDeleteModalHandle(e)
                            }
                            handleClickMessageUser={() =>
                              handleClickMessageUser(item)
                            }
                            isDashboard={true}
                            joinLectureHandle={(e) => joinLectureHandle(e)}
                            key={idx}
                          />
                        )
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </Slider>
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
      {editSessionShowModal && (
        <NewSessionModal
          type={true}
          show={editSessionShowModal}
          hide={() => showSessionEditModalHandle()}
          sessionData={editSessionInfo}
          weekType={null}
          userRole="tutor"
          isParentDashboard={false}
          isTutroDashboard={true}
        />
      )}
      {deteleSessionShowModal && (
        <DeleteSessionModal
          type={true}
          show={deteleSessionShowModal}
          hide={() => showSessionDeleteModalHandle()}
          sessionData={deleteSessionInfo}
          student={null}
          weekType={null}
          id={false}
        />
      )}
    </>
  );
};

export default TutorCalendarDashboard;
