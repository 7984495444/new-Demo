import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { userInfoEditStatic } from "@/utils/data";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentIdToParentDeatilsAction,
  getUserProfileAction,
} from "@/redux/actions/userAction";
import StudentBagicDetails from "./studentProfile/StudentBagicDetails";
import MySchoolDetails from "./studentProfile/MySchoolDetails";
import MyNeedsDetails from "./studentProfile/MyNeedsDetails";
import DifficultiesDetails from "./studentProfile/DifficultiesDetails";
import AtSchoolDetails from "./studentProfile/AtSchoolDetails";
import MyPersonalityDetails from "./studentProfile/MyPersonalityDetails";
import InterestsDeatils from "./studentProfile/InterestsDeatils";
import AvailabilityDetails from "./studentProfile/AvailabilityDetails";

const StudentProfile = ({ userData, isEditable }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileAction(userData?.id)); // get student profile editable data
    dispatch(getStudentIdToParentDeatilsAction(userData?.id)); // get student details with parent details
  }, []);

  const { getUserProfileData, getStudentIdToParentDetailsData } = useSelector(
    (state) => state.user
  );

  // edit mode main object
  const [userInfoEdit, setUserInfoEdit] = useState(userInfoEditStatic);

  // edit button onchange
  const userInfoEditHandle = (val) => {
    const updatedUserInfoEdit = {};

    for (const key in userInfoEdit) {
      if (Object.hasOwnProperty.call(userInfoEdit, key)) {
        updatedUserInfoEdit[key] = key === val ? !userInfoEdit[key] : false;
      }
    }

    setUserInfoEdit(updatedUserInfoEdit);
  };

  return (
    <>
      <StudentBagicDetails
        userData={userData}
        getStudentIdToParentDetailsData={getStudentIdToParentDetailsData}
      />
      <Card className="mt-4">
        <CardBody className="vstack gap-10 pb-8">
          <div className="position-relative">
            {getUserProfileData && (
              <MySchoolDetails
                userData={userData}
                getUserProfileData={getUserProfileData}
                userInfoEdit={userInfoEdit}
                userInfoEditHandle={(e) => userInfoEditHandle(e)}
                isEditable={isEditable}
                getStudentIdToParentDetailsData={
                  getStudentIdToParentDetailsData
                }
              />
            )}
          </div>
          <div className="position-relative">
            {getUserProfileData && (
              <MyNeedsDetails
                userData={userData}
                getUserProfileData={getUserProfileData}
                userInfoEdit={userInfoEdit}
                userInfoEditHandle={(e) => userInfoEditHandle(e)}
                isEditable={isEditable}
              />
            )}
          </div>
          <div className="position-relative">
            {getUserProfileData && (
              <DifficultiesDetails
                userData={userData}
                getUserProfileData={getUserProfileData}
                userInfoEdit={userInfoEdit}
                userInfoEditHandle={(e) => userInfoEditHandle(e)}
                isEditable={isEditable}
              />
            )}
          </div>
          <div className="position-relative">
            {getUserProfileData && (
              <AtSchoolDetails
                userData={userData}
                getUserProfileData={getUserProfileData}
                userInfoEdit={userInfoEdit}
                userInfoEditHandle={(e) => userInfoEditHandle(e)}
                isEditable={isEditable}
              />
            )}
          </div>
          <div className="position-relative">
            {getUserProfileData && (
              <MyPersonalityDetails
                userData={userData}
                getUserProfileData={getUserProfileData}
                userInfoEdit={userInfoEdit}
                userInfoEditHandle={(e) => userInfoEditHandle(e)}
                isEditable={isEditable}
              />
            )}
          </div>
          <div className="position-relative">
            {getUserProfileData && (
              <InterestsDeatils
                userData={userData}
                getUserProfileData={getUserProfileData}
                userInfoEdit={userInfoEdit}
                userInfoEditHandle={(e) => userInfoEditHandle(e)}
                isEditable={isEditable}
              />
            )}
          </div>
          <div className="position-relative">
            {getUserProfileData && (
              <AvailabilityDetails
                userData={userData}
                getUserProfileData={getUserProfileData}
                userInfoEdit={userInfoEdit}
                userInfoEditHandle={(e) => userInfoEditHandle(e)}
                isEditable={isEditable}
              />
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default StudentProfile;
