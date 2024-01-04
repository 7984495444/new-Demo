import { Edit } from "iconsax-react";
import React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import { t } from "i18next";
import { languageOptions } from "@/utils/data";
import ShowImage from "../../@common/ShowImage";

const TutorDetails = ({
  userData,
  userInfoEdit,
  language,
  selectLanguage,
  noOfStudents,
  tutorStudentLength,
  setNoOfStudents,
  userInfoSaveHandle,
  userInfoDiscardHandle,
  showlanguage,
  isEditable,
  userInfoEditHandle,
}) => {
  return (
    <Card className="border-0">
      <CardHeader className="position-relative bg-yellow h-20 h-sm-24 h-lg-32 h-xl-40 h-xl-48">
        <ShowImage
          className="avatar h-16 h-lg-24 w-16 w-lg-24 rounded-circle bg-light-blue-a position-absolute start-6 bottom-0"
          imageName={userData?.profile_image}
          width={100}
          height={100}
          style={{ transform: "translateY(50%)" }}
        />
      </CardHeader>
      <CardBody className="pt-16 pb-8">
        <Row className="gy-6 gx-0 position-relative">
          <Col xxl="3" xl="3" lg="4" md="3" sm="8" xs="8" className="pe-md-8">
            <div className="hstack gap-2">
              <h5>{`${userData?.first_name} ${userData?.last_name}`} </h5>
              <Badge
                className="bg-light-blue-c text-dark-blue-c text-8 py-1 badge-text-break"
                color="none"
              >
                {t("TutorMyProfile.Tutor")}
              </Badge>
            </div>
            <p className="text-light-blue-a mt-2">{userData?.address}</p>
          </Col>
          {userInfoEdit?.userInfo ? (
            <>
              <Col xxl="2" xl="2" lg="3" md="3" sm="6" xs="6" className="pe-3">
                <Label>{t("Profile.LanguageHeading")}</Label>
                <Input
                  type="select"
                  className="select-light-blue-plain-text text-black pe-4"
                  value={language}
                  onChange={(e) => selectLanguage(e.target.value)}
                >
                  {languageOptions?.map((languageOpt, index) => {
                    return (
                      <option key={languageOpt.val} value={languageOpt.val}>
                        {t(languageOpt.label)}
                      </option>
                    );
                  })}
                </Input>
              </Col>
              <Col xxl="2" xl="2" lg="2" md="3" sm="6" xs="6" className="ps-3">
                <Label>{t("Profile.StudentTotleNo")}</Label>
                <Input
                  className="custom-input-1 pt-1 pe-8"
                  plaintext={true}
                  type="text"
                  placeholder={t("Profile.StudentTotleNo")}
                  value={noOfStudents}
                  onChange={(e) => {
                    // Use a regular expression to allow only numbers
                    const numericValue = e.target.value.replace(/\D/g, "");
                    // Update the state with the numeric value
                    setNoOfStudents(numericValue);
                  }}
                ></Input>
              </Col>
              <Col
                xxl="5"
                xl="5"
                lg="3"
                md="3"
                sm="12"
                xs="12"
                className="d-flex align-items-start justify-content-end flex-wrap gap-2"
              >
                <Button
                  color="dark-blue-c"
                  onClick={(e) => userInfoSaveHandle("userInfo", e)}
                >
                  {t("Common.SafeguardBtn")}
                </Button>
                <Button
                  color="orange"
                  onClick={() => userInfoDiscardHandle("userInfo")}
                >
                  {t("Common.CancelBtn")}
                </Button>
              </Col>
            </>
          ) : (
            <>
              <Col xxl="2" xl="2" lg="2" md="3" sm="6" xs="6" className="pe-3">
                <h6>{t("Profile.LanguageHeading")}</h6>
                <p className="text-light-blue-a mt-2">{t(showlanguage)}</p>
              </Col>
              <Col xxl="2" xl="2" lg="3" md="3" sm="6" xs="6" className="ps-3">
                <h6>{`${t("Profile.StudentNum")}/${t(
                  "Profile.StudentTotleNo"
                )}`}</h6>
                <p className="text-light-blue-a mt-2">
                  {`${tutorStudentLength}/${noOfStudents}`}{" "}
                </p>
              </Col>
              <Col
                xs="auto"
                className="position-md-relative position-absolute end-0 top-md-0 top-2 ms-auto"
              >
                {isEditable && (
                  <Button
                    color="unset"
                    size="sm"
                    className="btn-square bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                    onClick={() => userInfoEditHandle("userInfo")}
                  >
                    <Edit />
                  </Button>
                )}
              </Col>
            </>
          )}
        </Row>
      </CardBody>
    </Card>
  );
};

export default TutorDetails;
