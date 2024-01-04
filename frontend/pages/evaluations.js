import React, { useEffect } from "react";
import {
  Layout,
  ParentEvaluationDashboard,
  StudentEvaluationDashboard,
  TutorEvaluationDashboard,
} from "@/components";
import withAuth from "./authRouter";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "@/redux/actions/userAction";
import moment from "moment";
import "moment/locale/fr";

if (typeof window !== "undefined") {
  moment.locale(localStorage.getItem("i18nextLng"));
}

const Evaluations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  const { userData } = useSelector((state) => state.user);

  return (
    <Layout>
      {userData?.role_id?.id === 2 ? (
        <TutorEvaluationDashboard />
      ) : userData?.role_id?.id === 4 ? (
        <StudentEvaluationDashboard userData={userData} />
      ) : (
        <ParentEvaluationDashboard userData={userData} />
      )}
    </Layout>
  );
};

export default withAuth(Evaluations);
