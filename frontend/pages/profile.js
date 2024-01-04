import React, { useEffect } from "react";
import { Layout } from "@/components";
import withAuth from "./authRouter";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../redux/actions/userAction";
import { AdminProfile, StudentProfile, TutorProfile } from "../components";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  const { userData } = useSelector((state) => state.user);
  return (
    <Layout>
      {userData?.role_id?.name === "admin" ? (
        <AdminProfile />
      ) : userData?.role_id?.name === "tutor" ? (
        <TutorProfile userData={userData} isEditable={true} />
      ) : userData?.role_id?.name === "student" ? (
        <StudentProfile userData={userData} isEditable={true} />
      ) : (
        ""
      )}
    </Layout>
  );
};

export default withAuth(Profile);
