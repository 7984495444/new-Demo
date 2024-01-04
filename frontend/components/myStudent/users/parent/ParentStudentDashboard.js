import React, { useEffect, useState } from "react";
import { Layout, MyStudentCard, StudentProfile } from "../../..";
import { Breadcrumb, BreadcrumbItem, Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllParentStudentFollowUpReportAction } from "@/redux/actions/followUpAction";
import { ArrowLeft } from "iconsax-react";
import FollowUpReport from "../../../evaluation/users/parent/firstTabEvaluation/FollowUpReport";
import { t } from "i18next";
import { idToGetUserDetailsAction } from "@/redux/actions/userAction";
import SessionHistory from "./SessionHistory";

const ParentStudentDashboard = ({ userData }) => {
  const dispatch = useDispatch();

  const [sessionHistotyShow, setSessionHistotyShow] = useState(false);
  const [sessionHistotyInfo, setSessionHistotyInfo] = useState(null);
  const [showStudentProfile, setShowStudentProfile] = useState(false);
  const [studentProfileInfo, setStudentProfileInfo] = useState(null);
  const [showFollowUpReport, setShowFollowUpReport] = useState(false);
  const [followUpReportInfo, setFollowUpReportInfo] = useState(null);

  useEffect(() => {
    dispatch(getAllParentStudentFollowUpReportAction()); // get all parent student
  }, []);

  const { getAllparentStudentFollowUpReport } = useSelector(
    (state) => state.followUp
  );

  // show session histoty handle
  const sessionHistotyShowHandal = (val) => {
    setSessionHistotyInfo(val);
    setSessionHistotyShow(!sessionHistotyShow);
  };

  // show student profile handle
  const showStudentProfileHandal = (val) => {
    dispatch(idToGetUserDetailsAction(val?.student_id));
    setStudentProfileInfo(val);
    setShowStudentProfile(!showStudentProfile);
  };

  const { idToGetUserDetails } = useSelector((state) => state.user);

  // show followup report handle
  const showFollowUpReportHandal = (val) => {
    setFollowUpReportInfo(val);
    setShowFollowUpReport(!showFollowUpReport);
  };

  return (
    <Layout>
      {sessionHistotyShow ? (
        <SessionHistory
          sessionHistotyShowHandal={() => sessionHistotyShowHandal()}
          studentInfo={sessionHistotyInfo}
        />
      ) : showStudentProfile ? (
        <div>
          <div className="hstack gap-3 mb-4 top-lg-0 start-lg-0 mt-lg-n10 w-full">
            <span className="cursor-pointer">
              <ArrowLeft size={18} onClick={showStudentProfileHandal} />
            </span>
            <Breadcrumb>
              <BreadcrumbItem
                className="cursor-pointer"
                onClick={showStudentProfileHandal}
              >
                {t("Students.MyStudents")}
              </BreadcrumbItem>
              <BreadcrumbItem className="cursor-pointer">
                {`${studentProfileInfo?.first_name} ${studentProfileInfo?.last_name}`}
              </BreadcrumbItem>
              <BreadcrumbItem active>Profil</BreadcrumbItem>
            </Breadcrumb>
          </div>
          {idToGetUserDetails && (
            <StudentProfile userData={idToGetUserDetails} isEditable={true} />
          )}
        </div>
      ) : showFollowUpReport ? (
        <FollowUpReport
          showFollowUpReportHandal={(e) => showFollowUpReportHandal(e)}
          followUpReportInfo={followUpReportInfo}
          getAllparentStudentFollowUpReport={getAllparentStudentFollowUpReport}
        />
      ) : (
        <Card>
          <CardBody
            className="vstack gap-4 h-lg-calc overflow-auto"
            style={{ ["--x-h-lg"]: "9rem" }}
          >
            {getAllparentStudentFollowUpReport &&
              getAllparentStudentFollowUpReport?.map((val, index) => {
                return (
                  <MyStudentCard
                    getAllparentStudentFollowUpReport={val}
                    sessionHistotyShowHandal={(e) =>
                      sessionHistotyShowHandal(e)
                    }
                    showStudentProfileHandal={(e) =>
                      showStudentProfileHandal(e)
                    }
                    showFollowUpReportHandal={(e) =>
                      showFollowUpReportHandal(e)
                    }
                    key={index}
                  />
                );
              })}
          </CardBody>
        </Card>
      )}
    </Layout>
  );
};

export default ParentStudentDashboard;
