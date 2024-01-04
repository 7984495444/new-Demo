import React from "react";
import { Card, Row, Col, CardBody } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FollowUpReportLoading = () => {
  return (
    <Card>
      <CardBody>
        <Row className="gx-lg-12 gy-lg-0 gy-10">
          <Col
            lg="auto"
            className="w-lg-80 border-end-lg min-h-lg-calc"
            style={{ ["--x-h-lg"]: "200px" }}
          >
            <div className="hstack gap-4 pb-6 border-bottom">
              <Skeleton
                circle
                height={100}
                width={100}
                containerClassName="followup-report-loading-avatar"
              />
              <div>
                <h6>
                  <Skeleton width={150} height={20} />
                </h6>
                <Skeleton width={90} height={20} />
              </div>
            </div>
            <div className="py-6 border-bottom">
              <Skeleton width={200} height={30} />
            </div>
            <Row className="py-6 gx-0 gap-4">
              <Skeleton width={250} height={40} />
            </Row>
          </Col>
          <Col>
            <div className="d-flex  justify-content-between mb-5">
              <h6 className="mb-6">
                <Skeleton width={200} height={30} />
              </h6>
              <div className="d-flex">
                <Skeleton width={100} height={40} className="me-5" />
                <Skeleton width={100} height={40} />
              </div>
            </div>
            <div className="vstack gap-6">
              {Array.from({
                length: 4,
              }).map((_, index) => {
                return (
                  <Card className="border" key={index}>
                    <CardBody className="p-xl-7">
                      <Row className="gy-xl-0 gy-5">
                        <Col xxl="3" xl="3" lg="12" md="3" sm="3">
                          <Skeleton width={200} height={50} />
                        </Col>
                        <Col xxl="5" xl="5" lg="12" md="4" sm="6">
                          <Skeleton width={400} height={50} />
                        </Col>
                        <Col className="d-xl-block d-lg-none d-md-block d-none">
                          <hr />
                        </Col>
                        <Col className="text-sm-end text-lg-start text-xl-end">
                          <Skeleton width={100} height={40} />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default FollowUpReportLoading;
