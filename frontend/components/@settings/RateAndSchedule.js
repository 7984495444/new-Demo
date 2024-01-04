import { TimeMoney } from "@/assets/images";
import { t } from "i18next";
import Image from "next/image";
import React from "react";
import { Card, CardBody, Col, Input, Label, Row } from "reactstrap";

const RateAndSchedule = () => {
  return (
    <Card className="border mt-6" style={{ maxWidth: "800px" }}>
      <CardBody className="p-5">
        <p className="mb-4">{t("EditInformations.RateSchedule")}</p>
        <Row className="align-items-end gy-4">
          <Col sm="auto" xs="12">
            <span className="h-50px w-50px rounded-2 icon-wrapper wrapper-blue flex-none bg-light-blue-c">
              <Image className="icon-main" src={TimeMoney} alt="Time" />
            </span>
          </Col>
          <Col sm="auto" xs="6">
            <Label>{t("EditInformations.Accompaniement")}</Label>
            <div className="position-relative">
              <Input
                className="custom-input-1 py-2"
                maxLength="4"
                plaintext={true}
                type="text"
                autoComplete="off"
                disabled="true"
              />
              <span className="position-absolute bottom-0 start-8 px-2 bg-white bottom-1 lh-loose">
                /{t("EditInformations.Hour")}
              </span>
            </div>
          </Col>
          <Col sm="auto" xs="6">
            <Label>{t("EditInformations.CatchUp")}</Label>
            <div className="position-relative">
              <Input
                className="custom-input-1 py-2"
                maxLength="4"
                plaintext={true}
                type="text"
                autoComplete="off"
                disabled="true"
              />
              <span className="position-absolute bottom-0 start-8 px-2 bg-white bottom-1 lh-loose">
                /{t("EditInformations.Hour")}
              </span>
            </div>
          </Col>
          <Col sm="auto" xs="6">
            <Label>{t("EditInformations.Preparing")}</Label>
            <div className="position-relative">
              <Input
                className="custom-input-1 py-2"
                plaintext={true}
                type="text"
                autoComplete="off"
                disabled="true"
              />
              <span className="position-absolute bottom-0 start-8 px-2 bg-white bottom-1 lh-loose">
                /{t("EditInformations.Hour")}
              </span>
            </div>
          </Col>
          <Col sm="auto" xs="6">
            <Label>{t("EditInformations.Enrichment")}</Label>
            <div className="position-relative">
              <Input
                className="custom-input-1 py-2"
                plaintext={true}
                type="text"
                autoComplete="off"
                disabled="true"
              />
              <span className="position-absolute bottom-0 start-8 px-2 bg-white bottom-1 lh-loose">
                /{t("EditInformations.Hour")}
              </span>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default RateAndSchedule;
