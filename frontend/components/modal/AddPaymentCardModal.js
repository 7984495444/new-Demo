import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { MessageAdd1 } from "iconsax-react";
import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask";
import {
  addPaymentCardValidations,
  editPaymentCardValidations,
} from "@/utils/validation";
import {
  addPaymentCardAction,
  editPaymentCardAction,
} from "../../redux/actions/paymentAction";
import { useDispatch } from "react-redux";
import { t } from "i18next";
import { CloseIconInModal } from "../index";

function AddPaymentCardModal({ type, show, hide, allPaymentCard }) {
  const cvvMaskGenerator = createDefaultMaskGenerator("999");
  const dispatch = useDispatch();

  const [cardNoFlag, setCardNoFlag] = useState(false);
  const [addPaymentInfo, setAddPaymentInfo] = useState(
    type
      ? {
          card_holder_name: allPaymentCard.card_holder_name,
          card_no: `**** **** **** ${allPaymentCard.card_no}`,
          // card_no: allPaymentCard.card_no,
          // exp_date: allPaymentCard[0].exp_date,
          month: allPaymentCard.exp_date.slice(0, 2),
          year: `20${allPaymentCard.exp_date.slice(3, 5)}`,
          cvc: allPaymentCard.cvc,
        }
      : {
          month: "",
          year: "",
        }
  );
  const [errors, setErrors] = useState({});
  const [istyping, setistyping] = useState(false);
  const cardMaskGenerator = type
    ? istyping
      ? createDefaultMaskGenerator("9999 9999 9999 9999")
      : createDefaultMaskGenerator("**** **** **** 9999")
    : createDefaultMaskGenerator("9999 9999 9999 9999");

  useEffect(() => {
    if (addPaymentInfo?.card_no?.length <= 0) {
      setistyping(true);
    }
  }, [addPaymentInfo]);

  const years = [];
  const month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let year = new Date().getFullYear();
  for (let i = year; i <= year + 8; i++) {
    years.push(i);
  }

  const onChangeHandle = (field, value) => {
    if (field === "card_no" && !istyping) {
      value = "";
      setCardNoFlag(true);
    }
    setAddPaymentInfo({
      ...addPaymentInfo,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const addCardPaymentHandal = () => {
    if (type) {
      let formErrors = editPaymentCardValidations(addPaymentInfo);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
      } else {
        let filed = {
          card_holder_name: addPaymentInfo.card_holder_name,
          exp_date: `${addPaymentInfo.month}/${addPaymentInfo.year.slice(2)}`,
          cvc: cardNoFlag ? Number(addPaymentInfo.cvc) : 0,
          card_no: cardNoFlag ? Number(addPaymentInfo.card_no) : 0,
        };
        dispatch(editPaymentCardAction(filed, allPaymentCard[0]?.id));
        hide();
      }
    } else {
      let formErrors = addPaymentCardValidations(addPaymentInfo);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
      } else {
        let filed = {
          card_holder_name: addPaymentInfo.card_holder_name,
          card_no: Number(addPaymentInfo.card_no),
          exp_date: `${addPaymentInfo.month}/${addPaymentInfo.year.slice(2)}`, //moment(addPaymentInfo.exp_date).format("MM/YY"),
          cvc: Number(addPaymentInfo.cvc),
        };
        dispatch(addPaymentCardAction(filed));
        hide();
      }
    }
    // hide();
  };

  return (
    <Modal
      isOpen={show}
      toggle={hide}
      centered={true}
      style={{ ["--x-modal-width"]: "354px" }}
    >
      <ModalHeader
        className="pb-3"
        toggle={hide}
        close={<CloseIconInModal hide={() => hide()} />}
        tag="h6"
      >
        <MessageAdd1 className="me-3" />
        {type
          ? t("AddPaymentCardModal.EditCardTitle")
          : t("AddPaymentCardModal.CardTitle")}
      </ModalHeader>
      <ModalBody className="pt-3">
        <Row className="gy-4">
          <Col xs="12">
            <Label>{t("AddPaymentCardModal.Label")}</Label>
            <Input
              plaintext="true"
              className="custom-input-1"
              placeholder={t("AddPaymentCardModal.WriteHere")}
              value={addPaymentInfo.card_holder_name}
              onChange={(e) =>
                onChangeHandle("card_holder_name", e.target.value)
              }
            />
            <FormFeedback>{errors.card_holder_name}</FormFeedback>
          </Col>
          <Col xs="12">
            <Label>{t("AddPaymentCardModal.CardNum")}</Label>
            <MaskedInput
              type="text"
              className="custom-input-1 form-control-plaintext"
              placeholder={
                type
                  ? addPaymentInfo.card_no
                  : t("AddPaymentCardModal.CvvPlaceholder")
              }
              value={addPaymentInfo.card_no}
              onChange={(e) => onChangeHandle("card_no", e)}
              maskGenerator={
                type
                  ? istyping
                    ? cardMaskGenerator
                    : undefined
                  : cardMaskGenerator
              }
            />
            <FormFeedback>{errors.card_no}</FormFeedback>
          </Col>
          <Col xs="6">
            <Label>{t("AddPaymentCardModal.Expiry")}</Label>
            <Row className="gx-2 gy-4">
              <Col xs="6">
                <Input
                  className="custom-input-1 pe-5"
                  type="select"
                  onChange={(e) => onChangeHandle("month", e.target.value)}
                  value={addPaymentInfo.month}
                >
                  {month.map((val, index) => {
                    return (
                      <option key={index} value={val}>
                        {val}
                      </option>
                    );
                  })}
                </Input>
                <FormFeedback>{errors.month}</FormFeedback>
              </Col>
              <Col xs="6">
                <Input
                  className="custom-input-1 pe-5"
                  type="select"
                  onChange={(e) => onChangeHandle("year", e.target.value)}
                  value={addPaymentInfo.year}
                >
                  {years.map((val, index) => {
                    return (
                      <option key={index} value={val}>
                        {val}
                      </option>
                    );
                  })}
                </Input>
                <FormFeedback>{errors.year}</FormFeedback>
              </Col>
            </Row>
          </Col>
          <Col xs="6">
            <Label>{t("AddPaymentCardModal.Cvv")}</Label>
            <MaskedInput
              className="form-control-plaintext custom-input-1"
              type="password"
              placeholder={t("AddPaymentCardModal.WriteHere")}
              value={addPaymentInfo.cvc}
              onChange={(e) => onChangeHandle("cvc", e)}
              maskGenerator={cvvMaskGenerator}
            />
            <FormFeedback>{errors.cvc}</FormFeedback>
          </Col>
          <Col xs="12" className="mt-8">
            <Button
              type="button"
              color="dark-blue-c"
              onClick={addCardPaymentHandal}
            >
              {type
                ? t("AddPaymentCardModal.EditBtn")
                : t("AddPaymentCardModal.AddBtn")}
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}
export default AddPaymentCardModal;
