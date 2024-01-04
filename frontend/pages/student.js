import React, { useEffect } from "react";
import withAuth from "./authRouter";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "@/redux/actions/userAction";
import { useRouter } from "next/router";
import {
  AdminStudentDashboard,
  TutorStudentDashboard,
  ParentStudentDashboard,
} from "@/components";

const Student = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  const { userData } = useSelector((state) => state.user);

  return (
    <>
      {userData?.role_id?.name === "admin" ? (
        <AdminStudentDashboard />
      ) : userData?.role_id?.name === "tutor" ? (
        <TutorStudentDashboard userData={userData} />
      ) : userData?.role_id?.name === "parent" ? (
        <ParentStudentDashboard userData={userData} />
      ) : (
        ""
      )}
    </>
  );
};

export default withAuth(Student);
