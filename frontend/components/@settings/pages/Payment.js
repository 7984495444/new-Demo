import React, { useEffect, useState } from "react";
import { CardAdd, Edit, Trash } from "iconsax-react";
import { VisaCard, VisaCardBg } from "@/assets/images/index";
import Image from "next/image";
import AddPaymentCardModal from "@/components/modal/AddPaymentCardModal";
import { DeletePaymentCardModal } from "../../index";
import { getPaymentCardAction } from "../../../redux/actions/paymentAction";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask";
import { t } from "i18next";
import { getUserAction } from "../../../redux/actions/userAction";

const PaymentTab = () => {
  const cardMaskGenerator = createDefaultMaskGenerator("**** **** **** 9999");
  const dispatch = useDispatch();
  const [editPaymentInfo, setEditPaymentInfo] = useState(false);
  const [deletePaymentInfo, setDeletePaymentInfo] = useState(false);
  const [addPaymentInfo, setAddPaymentInfo] = useState(false);

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    // if (userData?.role_id?.id === 3) {
    dispatch(getPaymentCardAction()); // call only parent
    // }
  }, []);

  const { allPaymentCard } = useSelector((state) => state.payment);

  const editPaymentInfoHandle = () => {
    setEditPaymentInfo(!editPaymentInfo);
  };

  const addNewModalOpenHandal = () => {
    setAddPaymentInfo(!addPaymentInfo);
  };

  const deletePaymentInfoHandle = () => {
    setDeletePaymentInfo(!deletePaymentInfo);
  };
  return (
    <>
      <Card>
        <CardHeader className="pb-6">
          <h6 className="font-bolder">{t("PaymentTab.Header")}</h6>
        </CardHeader>
        <CardBody
          className="pt-3 h-lg-calc overflow-auto"
          style={{ ["--x-h-lg"]: "211.7px" }}
        >
          <Row className="gy-6">
            <Col sm="auto" className="w-sm-96 d-flex flex-column">
              {allPaymentCard ? (
                <>
                  <div className="hstack flex-wrap justify-content-between mb-5">
                    <p className="text-md">{t("PaymentTab.Method")}</p>
                    <div>
                      <Button
                        className="btn-square bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover me-3"
                        size="sm"
                        color="none"
                        onClick={editPaymentInfoHandle}
                      >
                        <Edit />
                      </Button>
                      <Button
                        className="btn-square bg-light-red-a bg-red-hover text-red text-light-red-a-hover"
                        size="sm"
                        color="none"
                        onClick={() => deletePaymentInfoHandle()}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                  <div
                    className="payment-card vstack flex-fill px-8 py-6 shadow-a"
                    style={{
                      backgroundImage: `url('${VisaCardBg.src}')`,
                    }}
                  >
                    <Image src={VisaCard} className="mb-2" alt="User Image" />
                    <Row className="gy-6 mt-auto">
                      <Col xs="12">
                        <h6 className="mb-2">{t("PaymentTab.Label")}</h6>
                        <p className="text-md">
                          {allPaymentCard?.card_holder_name}
                        </p>
                      </Col>
                      <Col xl="6" lg="12" md="7">
                        <h6 className="mb-2">{t("PaymentTab.Num")}</h6>
                        <MaskedInput
                          className="form-control-plaintext"
                          value={allPaymentCard?.card_no}
                          maskGenerator={cardMaskGenerator}
                          disabled
                        />
                      </Col>
                      <Col xl="6" lg="12" md="5">
                        <h6 className="mb-2">{t("PaymentTab.Expiry")}</h6>
                        <p className="text-md">{allPaymentCard?.exp_date}</p>
                      </Col>
                    </Row>
                  </div>
                </>
              ) : (
                <Button
                  color="none"
                  className="h-xl-48 h-lg-auto h-md-40 shadow-a bg-white text-dark-blue-c bg-dark-blue-c-hover text-white-hover"
                  onClick={addNewModalOpenHandal}
                >
                  <CardAdd className="me-3" />
                  {t("PaymentTab.AddBtn")}
                </Button>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
      {addPaymentInfo && (
        <AddPaymentCardModal
          type={false}
          show={addPaymentInfo}
          hide={() => addNewModalOpenHandal()}
        />
      )}
      {editPaymentInfo && (
        <AddPaymentCardModal
          type={true}
          show={editPaymentInfo}
          hide={() => editPaymentInfoHandle()}
          allPaymentCard={allPaymentCard}
        />
      )}
      {deletePaymentInfo && (
        <DeletePaymentCardModal
          show={deletePaymentInfo}
          hide={() => deletePaymentInfoHandle()}
        />
      )}
    </>
  );
};

export default PaymentTab;
