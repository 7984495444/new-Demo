import { CurveVectorMessage, DotsSmallBg } from "@/assets/images";
import { Dislike, Message2 } from "iconsax-react";
import Image from "next/image";
import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { t } from "i18next";

const ShowNoEvlucationForMessage = ({ user }) => {
  return (
    <Card className="border-0">
      <CardBody
        className="hstack justify-content-center min-h-lg-calc overflow-hidden"
        style={{ ["--x-h-lg"]: "274px" }}
      >
        <Card className="flex-none w-full" style={{ maxWidth: "442px" }}>
          <CardBody>
            <Row className="g-0 position-relative overlap-20">
              <Col
                xs="2"
                sm="3"
                className="bg-yellow rounded-start-2 p-4 d-flex align-items-center justify-content-center"
              >
                <Image src={DotsSmallBg} alt="dots" />
              </Col>
              <Col xs="10" sm="9">
                <Card className="h-full">
                  <CardBody className="bg-white border rounded-end-2 border-light-blue-c">
                    <Dislike size="32" className="text-dark-blue-c mb-16" />
                    <p
                      style={{
                        fontSize: "18px",
                        maxWidth: "216px",
                      }}
                    >
                      {t("Evaluations.This")} {user}{" "}
                      {t("Evaluations.NoReportAvailable")}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Image
              className="position-absolute translate-middle mt-xl-n10 top-full start-full overlap-10"
              src={CurveVectorMessage}
              alt="CurveVectorMessage"
            />
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  );
};

export default ShowNoEvlucationForMessage;
