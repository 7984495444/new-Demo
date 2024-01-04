import React, { useEffect } from "react";
import withAuth from "./authRouter";
import {
  AdminDashboard,
  TutorDashboard,
  StudentDashboard,
  ParentDashboard,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllTutorSessionAction } from "@/redux/actions/tutorAction";
import {
  getAllCurrentWeekSessionAction,
  getAllToDoListAction,
} from "@/redux/actions/dashbordAction";
import { getMySchoolLevels } from "@/redux/actions/schoolLevelAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTutorSessionAction());
    dispatch(getAllToDoListAction(""));
    dispatch(getAllCurrentWeekSessionAction());
    if (userData?.role_id?.name !== "tutor") {
      dispatch(getMySchoolLevels());
    }
  }, []);

  // const { allSession } = useSelector((state) => state.tutor);
  const { getAllcurrentWeekSession } = useSelector((state) => state.dashboard);
  const { userData } = useSelector((state) => state.user);
  const { getAllToDoList } = useSelector((state) => state.dashboard);
  const { getMySchoolLevel } = useSelector((state) => state.schoolLevel);

  return (
    <>
      {userData?.role_id?.name === "admin" ? (
        <AdminDashboard />
      ) : userData?.role_id?.name === "tutor" ? (
        getAllcurrentWeekSession?.length > -1 && (
          <TutorDashboard
            userData={userData}
            getAllToDoList={getAllToDoList}
            getAllcurrentWeekSession={getAllcurrentWeekSession}
          />
        )
      ) : userData?.role_id?.name === "student" ? (
        getAllcurrentWeekSession?.length > -1 && (
          <StudentDashboard
            userData={userData}
            getAllcurrentWeekSession={getAllcurrentWeekSession}
            getAllToDoList={getAllToDoList}
            getMySchoolLevel={getMySchoolLevel}
          />
        )
      ) : (
        getAllcurrentWeekSession?.length > -1 && (
          <ParentDashboard
            userData={userData}
            getAllcurrentWeekSession={getAllcurrentWeekSession}
            getMySchoolLevel={getMySchoolLevel}
          />
        )
      )}
    </>
  );
};

export default withAuth(Dashboard);
