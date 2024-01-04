import Image from "next/image";
import { User, SearchNormal1 } from "iconsax-react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Badge,
  Button,
  Table,
  Input,
} from "reactstrap";
import { Layout, PaginationComponent } from "@/components/index";
import { t } from "i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { profilePlaceholder } from "@/assets/images";
import { adminRightSecondData } from "@/utils/data";

const AdminDashboard = () => {
  return (
    <Layout>
      <Row className="gy-lg-0 gy-6">
        <Col md="8">
          <Card className="mb-4">
            <CardBody>
              <Row className="align-items-center mb-4">
                <Col xs="6">
                  <h6 className="text-sm">
                    {t("AdminDashboard.Pairing")} (56)
                  </h6>
                </Col>
                <Col xs="6" className="text-end">
                  <Button color="dark-blue-c">
                    {t("AdminDashboard.SeeAll")}
                  </Button>
                </Col>
              </Row>
              <div className="me-n6">
                <Swiper spaceBetween={12} slidesPerView={"auto"}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <SwiperSlide className="w-80" key={idx}>
                      <Card className="border border-2 border-light-blue-c">
                        <CardBody className="py-4 px-6">
                          <Row className="mb-3">
                            <Col xs="6" className="hstack gap-2 border-end">
                              <Image
                                className="avatar w-8 h-8 rounded-circle bg-light-blue-a flex-none"
                                src={profilePlaceholder}
                                alt="User Image"
                              />
                              <div className="flex-1">
                                <p>Avril D.</p>
                                <Badge
                                  className="bg-light-blue-c text-dark-blue-c text-8 text-uppercase p-1 mt-1"
                                  color="none"
                                >
                                  ÉLÈVE
                                </Badge>
                              </div>
                            </Col>
                            <Col xs="6" className="hstack gap-2">
                              <Image
                                className="avatar w-8 h-8 rounded-circle bg-light-blue-a flex-none"
                                src={profilePlaceholder}
                                alt="User Image"
                              />
                              <div className="flex-1">
                                <p>James T.</p>
                                <Badge
                                  className="bg-light-blue-c text-dark-blue-c text-8 text-uppercase p-1 mt-1"
                                  color="none"
                                >
                                  TUTEUR
                                </Badge>
                              </div>
                            </Col>
                          </Row>
                          <div className="mb-3">
                            <p className="text-xs text-light-blue-a">
                              Avril needs Physique tutoring at
                            </p>
                            <p className="text-xs text-light-blue-a font-bold">
                              Lundi - 10h30, Mardi - 13h00 et Vendredi - 17h00.
                            </p>
                          </div>
                          <div className="hstack gap-2">
                            <Button color="dark-blue-c">
                              {t("AdminDashboard.Accept")}
                            </Button>
                            <Button color="light-blue-c text-dark-blue-c">
                              {t("AdminDashboard.Reject")}
                            </Button>
                            <Button color="outline-dark-blue-c">
                              {t("AdminDashboard.SeeProfiles")}
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </CardBody>
          </Card>
          <Card className="mb-4">
            <CardBody>
              <Row className="align-items-center mb-4">
                <Col xs="4">
                  <p className="text-light-blue-a mb-1">
                    {t("AdminDashboard.IndividualStatistics")}
                  </p>
                  <h6 className="text-sm">
                    {t("AdminDashboard.Students")} (815)
                  </h6>
                </Col>
                <Col xs="8" className="text-end">
                  <div className="bg-white position-relative w-48 ms-auto">
                    <Input
                      placeholder={t("AdminDashboard.FindStudent")}
                      className="bg-light-blue-d border-light-blue-a rounded-2 pe-10"
                    />
                    <SearchNormal1
                      size="16"
                      color="#8497ab"
                      className="position-absolute cursor-pointer end-4 top-1/2 translate-middle-y"
                    />
                  </div>
                </Col>
              </Row>
              <Table
                className="pb-8 mb-6"
                style={{ minWidth: "900px" }}
                responsive
              >
                <thead>
                  <tr>
                    <th className="font-bold">{t("AdminDashboard.Student")}</th>
                    <th className="font-bold">
                      {t("AdminDashboard.AcademicLevel")}
                    </th>
                    <th className="font-bold">
                      {t("AdminDashboard.SubjectTaught")}
                    </th>
                    <th className="font-bold">
                      {t("AdminDashboard.FirstSession")}
                    </th>
                    <th className="font-bold">
                      {t("AdminDashboard.LastSession")}
                    </th>
                    <th className="font-bold">
                      {t("AdminDashboard.SessionNo")}
                    </th>
                    <th className="font-bold">{t("AdminDashboard.Action")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-font-size-md">
                      <Image
                        className="avatar w-8 h-8 rounded-circle me-3"
                        src={profilePlaceholder}
                        alt="User Image"
                      />
                      <span>Allan Moulin</span>
                    </td>
                    <td>Secondaire 3</td>
                    <td>Physique II</td>
                    <td>04/Jan/23</td>
                    <td>04/Mai/23</td>
                    <td>4/8</td>
                    <td>
                      <Button color="light-blue-c" className="text-dark-blue-c">
                        <User size="16" className="me-2" />{" "}
                        {t("AdminDashboard.ViewProfile")}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <PaginationComponent />
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Row className="align-items-center mb-4">
                <Col xs="4">
                  <p className="text-light-blue-a mb-1">
                    {t("AdminDashboard.IndividualStatistics")}
                  </p>
                  <h6 className="text-sm">
                    {t("AdminDashboard.Tutors")} (815)
                  </h6>
                </Col>
                <Col xs="8" className="text-end">
                  <div className="bg-white position-relative w-48 ms-auto">
                    <Input
                      placeholder={t("AdminDashboard.FindStudent")}
                      className="bg-light-blue-d border-light-blue-a rounded-2 pe-10"
                    />
                    <SearchNormal1
                      size="16"
                      color="#8497ab"
                      className="position-absolute cursor-pointer end-4 top-1/2 translate-middle-y"
                    />
                  </div>
                </Col>
              </Row>
              <Table
                className="pb-8 mb-6"
                style={{ minWidth: "900px" }}
                responsive
              >
                <thead>
                  <tr>
                    <th className="font-700">{t("AdminDashboard.Tutor")}</th>
                    <th className="font-700">
                      {t("AdminDashboard.ActivePrograms")}
                    </th>
                    <th className="font-700">
                      {t("AdminDashboard.CompletedPrograms")}
                    </th>
                    <th className="font-700">
                      {t("AdminDashboard.SatisfactionParentStudent")}
                    </th>
                    <th className="font-700">
                      {t("AdminDashboard.FollowUpReports")}
                    </th>
                    <th className="font-700">{t("AdminDashboard.Action")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-font-size-md">
                      <Image
                        className="avatar w-8 h-8 rounded-circle me-3"
                        src={profilePlaceholder}
                        alt="User Image"
                      />
                      <span>Allan Moulin</span>
                    </td>
                    <td>12</td>
                    <td>36</td>
                    <td>95%</td>
                    <td>4</td>
                    <td>
                      <Button color="light-blue-c" className="text-dark-blue-c">
                        <User size="16" className="me-2" />{" "}
                        {t("AdminDashboard.ViewProfile")}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <PaginationComponent />
            </CardBody>
          </Card>
        </Col>
        <Col md="4" className="vstack gap-3">
          {adminRightSecondData.map((val, index) => {
            return (
              <Card key={index}>
                <CardBody className="hstack gap-3 px-5 py-4">
                  <span
                    className={`h-8 w-8 rounded-2 flex-none icon-wrapper wrapper-${val.theme}`}
                  >
                    {val.icon}
                  </span>
                  <Row className="flex-fill align-items-center">
                    <Col xs="7">
                      <h6 className="w-16 text-base">{val.label}</h6>
                    </Col>
                    <Col xs="5">
                      <h4 className="text-end font-900">{val.value}</h4>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            );
          })}
        </Col>
      </Row>
    </Layout>
  );
};

export default AdminDashboard;
