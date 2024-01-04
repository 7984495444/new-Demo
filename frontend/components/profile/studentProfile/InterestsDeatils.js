import { interests } from "@/utils/data";
import { t } from "i18next";
import React, { useState } from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import EditAndSaveBtn from "../EditAndSaveBtn";
import { useDispatch } from "react-redux";
import { editUserProfileAction } from "@/redux/actions/userAction";

const InterestsDeatils = ({
  userData,
  getUserProfileData,
  userInfoEdit,
  userInfoEditHandle,
  isEditable,
}) => {
  const dispatch = useDispatch();

  const [interestValues, setInterestValues] = useState(
    getUserProfileData?.interests
  );

  // Function to handle checkbox changes
  const handleCheckboxChange = (interest) => {
    setInterestValues((prevValues) => ({
      ...prevValues,
      [interest]: prevValues[interest] === 0 ? 1 : 0, // Toggle between 0 and 1
    }));
  };

  const editInfoHandle = (type, subtype) => {
    let field = {};
    if (subtype) {
      field = {
        ...getUserProfileData,
        interests: interestValues,
      };
    } else {
      setInterestValues(getUserProfileData?.interests);
    }
    // submit data edit
    if (subtype) {
      dispatch(editUserProfileAction(userData?.id, field));
    }
    userInfoEditHandle(type);
  };

  return (
    <>
      <Row className="gy-6 gx-0">
        <Col xxl="2" xl="3" lg="3" md="12">
          <h6 className="text-pre-line">{t("Profile.Interests")}</h6>
        </Col>
        {userInfoEdit?.interests ? (
          <>
            <Col
              xxl="10"
              xl="9"
              lg="9"
              md="12"
              className="pb-10 border-bottom border-light-blue-b min-h-16"
            >
              <Row>
                <Col xxl="6" xl="8" lg="8" md="8">
                  <Row xxl="4" md="3" xs="2" className="gy-5">
                    {interests?.map((val, index) => {
                      return (
                        <Col key={index}>
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              id={index}
                              checked={interestValues[val?.name] === 1}
                              onChange={() => handleCheckboxChange(val?.name)}
                            />
                            <Label for={val?.name} check>
                              {t(val?.label)}
                            </Label>
                          </FormGroup>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
              </Row>
            </Col>
          </>
        ) : (
          <>
            <Col
              xxl="10"
              xl="9"
              lg="9"
              md="12"
              className="pb-10 border-bottom border-light-blue-b  min-h-16"
            >
              <Row>
                <Col xxl="6" xl="8" lg="8" md="8">
                  <Row lg="4" md="3" xs="2" className="gy-2">
                    {interests?.map((val, index) => {
                      return (
                        interestValues[val?.name] === 1 && (
                          <Col key={index}>
                            <span className="text-sm">{t(val?.label)}</span>
                          </Col>
                        )
                      );
                    })}
                  </Row>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
      <EditAndSaveBtn
        type="interests"
        isShowSaveBtn={userInfoEdit?.interests}
        editInfoHandle={(e, t) => editInfoHandle(e, t)}
        userInfoEditHandle={(e) => userInfoEditHandle(e)}
        isEditable={isEditable}
      />
    </>
  );
};

export default InterestsDeatils;
