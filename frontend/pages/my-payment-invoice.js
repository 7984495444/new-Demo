import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Table,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import Image from "next/image";
import { Layout } from "@/components";
import { ArrowCircleDown2, ArrowLeft } from "iconsax-react";
import { profilePlaceholder } from "@/assets/images/index";
import { t } from "i18next";
import Router from "next/router";

function MyPaymentInvoice() {
  const paymetPageHandal = () => {
    Router.push("/payment");
  };
  return (
    <>
      <Layout>
        <Card>
          <CardBody style={{ minHeight: "calc(100vh - 12rem)" }}>
            <div className="d-flex gap-3 mb-4 position-lg-absolute top-lg-0 start-lg-0 mt-lg-n10 w-full">
              <span
                className="cursor-pointer"
                onClick={() => paymetPageHandal()}
              >
                <ArrowLeft size={18} />
              </span>
              <Breadcrumb onClick={() => paymetPageHandal()}>
                <BreadcrumbItem className="cursor-pointer">
                  {t("Header.Payments")}
                </BreadcrumbItem>
                <BreadcrumbItem active>Mes factures</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <h6>{t("Facturation.MyBills")}</h6>
            <Table style={{ minWidth: "1064px" }} className="mt-5" responsive>
              <thead>
                <tr>
                  <th width="20%" className="font-bolder">
                    Nom
                  </th>
                  <th width="40%" className="font-bolder">
                    Période
                  </th>
                  <th width="15%" className="font-bolder"></th>
                  <th width="15%" className="font-bolder">
                    Montant ($)
                  </th>
                  <th width="10%" className="font-bolder">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Image
                      className="avatar w-8 h-8 rounded-circle me-2"
                      src={profilePlaceholder}
                      alt="user Image"
                    />
                    <span>James Tourin</span>
                  </td>
                  <td>
                    <div className="hstack gap-4">
                      <span>13/Apr/23</span>
                      <hr className="flex-fill my-0" />
                      <span>13/May/23</span>
                    </div>
                  </td>
                  <td></td>
                  <td>90,00</td>
                  <td>
                    <Button
                      color="none"
                      className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                    >
                      <ArrowCircleDown2 size="18" className="me-2" />{" "}
                      {t("Payment.DownloadBtn")}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
          <CardFooter>
            {/* <PaginationComponent
              totalPage={getAllPymentDeducations?.totalPages}
              page={currentPage}
              changePageToNumberHandal={(e) => changePageToNumberHandal(e)}
              nextAndPrevHandal={(e) => nextAndPrevHandal(e)}
            /> */}
          </CardFooter>
        </Card>
      </Layout>
    </>
  );
}

export default MyPaymentInvoice;
