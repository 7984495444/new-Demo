import { useEffect } from "react";
import withAuth from "./authRouter";
import { getUserAction } from "@/redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import {
  Layout,
  TutorCalendar,
  StudentCalendar,
  ParentCalendar,
} from "@/components";

const Calendar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <Layout>
        {userData?.role_id?.name === "tutor" ? (
          <TutorCalendar userData={userData} />
        ) : userData?.role_id?.name === "student" ? (
          <StudentCalendar userData={userData} />
        ) : (
          <ParentCalendar userData={userData} />
        )}
      </Layout>
    </>
  );
};

export default withAuth(Calendar);
