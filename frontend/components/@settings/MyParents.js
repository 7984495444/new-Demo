import { showParentsData } from "@/utils/data";
import { t } from "i18next";
import React from "react";
import { Col, Input, Label, Row } from "reactstrap";

const MyParents = ({ userData }) => {
  return (
    <>
      {userData?.student?.length > 0 && (
        <h6 className="mt-12 mb-8">{t("EditInformations.MyParent")}</h6>
      )}
      {Array.from({ length: userData?.student?.length }).map((_, ind) => (
        <Row className="gx-sm-12 gy-6 pb-8" key={ind}>
          {showParentsData.map((val, index) => {
            return (
              <Col sm="6" key={index}>
                <Label>{t(val.label)}</Label>
                <Input
                  className="custom-input-1"
                  plaintext={true}
                  type={val.type}
                  placeholder={t("EditInformations.TypeHere")}
                  value={userData?.student[ind][val?.name]}
                  disabled
                />
              </Col>
            );
          })}
        </Row>
      ))}
    </>
  );
};

export default MyParents;
