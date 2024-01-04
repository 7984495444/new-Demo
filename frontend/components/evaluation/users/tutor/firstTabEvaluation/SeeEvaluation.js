import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { ArrowLeft } from "iconsax-react";
import moment from "moment";
import { handleDownloadClick } from "@/utils/globle";
import { t } from "i18next";
import { FollowUpRapportDetails, ShowRepportForStudent } from "@/components";

const SeeEvaluation = ({
  showFollowUpReportHandal,
  showEvaluationHandal,
  followUpReportInfo,
  seeEvaluationInfo,
}) => {
  const [PDFData, setPDFData] = useState(null);

  useEffect(() => {
    handleDownloadClick(setPDFData);
  }, []);

  return (
    <>
      <Card>
        <CardBody className="py-8">
          <div className="d-flex gap-3 mb-4 position-lg-absolute top-lg-0 start-lg-0 mt-lg-n10 w-full">
            <span className="cursor-pointer">
              <ArrowLeft size={18} onClick={showEvaluationHandal} />
            </span>
            <Breadcrumb>
              <BreadcrumbItem
                className="cursor-pointer"
                onClick={showFollowUpReportHandal}
              >
                {t("Header.Ratings")}
              </BreadcrumbItem>
              <BreadcrumbItem
                className="cursor-pointer"
                onClick={showEvaluationHandal}
              >
                {t("Common.MonitoringReport")}
              </BreadcrumbItem>
              <BreadcrumbItem active>
                {moment(followUpReportInfo?.created_at).format("DD/MMM/YY")}
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <Row className="gx-lg-12 gy-lg-0 gy-10" id="content-to-download">
            <Col lg="auto" className="w-lg-80 border-end-lg">
              <FollowUpRapportDetails userDetails={followUpReportInfo} />
            </Col>
            <Col>
              <Row>
                <Col xs="6">
                  <h6>
                    {moment(followUpReportInfo?.created_at).format("DD/MMM/YY")}
                  </h6>
                </Col>
                <Col xs="6" className="text-end">
                  <div id="element-to-hide" data-html2canvas-ignore="true">
                    <Button
                      id="download-button"
                      className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                      color
                      disabled={PDFData ? false : true}
                      onClick={() =>
                        PDFData.save(
                          `${moment(followUpReportInfo?.created_at).format(
                            "DD/MMM/YY"
                          )}.pdf`
                        )
                      }
                    >
                      {t("Common.DownloadPdf")}
                    </Button>
                  </div>
                </Col>
              </Row>
              <ShowRepportForStudent seeEvaluationInfo={seeEvaluationInfo} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default SeeEvaluation;
