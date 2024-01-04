import React, { useEffect } from "react";
import { Badge, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { t } from "i18next";
import { languageOptions } from "../../../utils/data";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getMySchoolLevels } from "@/redux/actions/schoolLevelAction";
import i18n from "@/utils/i18nextInit";
import "moment/locale/fr";
import ShowImage from "../../@common/ShowImage";

const StudentBagicDetails = ({ userData, getStudentIdToParentDetailsData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMySchoolLevels());
  }, []);
  const { getMySchoolLevel } = useSelector((state) => state.schoolLevel);

  return (
    <Card className="border-0">
      <CardHeader className="position-relative bg-dark-blue-c h-20 h-md-24 h-lg-32 h-xl-40 h-xl-48">
        <ShowImage
          className="vatar h-16 h-lg-24 w-16 w-lg-24 rounded-circle bg-light-blue-a position-absolute start-6 bottom-0"
          imageName={userData?.profile_image}
          width={100}
          height={100}
          style={{ transform: "translateY(50%)" }}
        />
      </CardHeader>
      <CardBody className="pt-16 pb-8 position-relative">
        <Row className="gy-6 gx-0">
          <Col xxl="2" xl="3" lg="3" md="12" className="pe-4">
            <div className="d-flex align-items-start gap-2">
              <h5>{`${userData?.first_name} ${userData?.last_name}`} </h5>
              <Badge
                className="bg-light-blue-c text-dark-blue-c badge-xs py-1 badge-text-break mt-1"
                color="none"
              >
                {t("StudentMyProfile.role")}
              </Badge>
            </div>
            <p className="text-light-blue-a mt-2">{userData?.address}</p>
            {/* //Québec, Canada */}
          </Col>
          <Col
            xxl="10"
            xl="9"
            lg="9"
            md="12"
            className="border-bottom border-light-blue-b"
          >
            <Row className="gy-md-6 gy-4">
              <Col xxl="3" xl="3" lg="6" md="6" sm="6" xs="6">
                <h6>{t("Profile.LanguageHeading")}</h6>
                <p className="text-light-blue-a mt-2">
                  {languageOptions?.map((languageOpt, index) => {
                    return (
                      Number(userData?.language) === languageOpt?.val &&
                      t(languageOpt.label)
                    );
                  })}
                  {/* English, French, Spanish */}
                </p>
              </Col>
              <Col xxl="3" xl="3" lg="6" md="6" sm="6" xs="6">
                <h6>{t("StudentMyProfile.school_level")}</h6>
                <p className="text-light-blue-a mt-2">
                  {/* {schoolLavels?.map((val, index) => {
                    return (
                      val?.value === Number(userData?.school_level) && (
                        <p value={val?.value} key={index}>
                          {t(val?.name)}
                        </p>
                      )
                    );
                  })} */}
                  {getMySchoolLevel?.map((val, index) => {
                    return (
                      val?.id === Number(userData?.school_level) && (
                        <p value={val?.id} key={index}>
                          {i18n.language === "en" ? val.name_en : val.name_fr}
                        </p>
                      )
                    );
                  })}
                </p>
              </Col>
              <Col xxl="3" xl="3" lg="6" md="6" sm="6" xs="6">
                <h6>{t("Common.DateOfBirth")}</h6>
                <p className="text-light-blue-a mt-2">
                  {moment(userData?.dob).format("DD MMM YYYY")} (
                  {moment().diff(userData?.dob, "years")} ans)
                </p>
              </Col>
              <Col xxl="3" xl="3" lg="6" md="6" sm="6" xs="6">
                <h6>{t("StudentMyProfile.contact")}</h6>
                <div className="hstack gap-2 mt-2">
                  <ShowImage
                    className="avatar h-6 w-6 rounded-circle bg-light-blue-a"
                    imageName={getStudentIdToParentDetailsData?.profile_image}
                    width={100}
                    height={100}
                  />
                  <p>
                    {getStudentIdToParentDetailsData?.first_name}{" "}
                    {getStudentIdToParentDetailsData?.last_name
                      .slice(0, 1)
                      .toUpperCase()}
                    .
                  </p>
                  <Badge
                    className="bg-light-blue-c text-dark-blue-c badge-xs py-1 badge-text-break"
                    color="none"
                  >
                    {t("StudentMyProfile.parent")}
                  </Badge>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default StudentBagicDetails;
