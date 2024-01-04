import Image from "next/image";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Label,
  Button,
  UncontrolledTooltip,
  Col,
  Row,
  FormFeedback,
} from "reactstrap";
import {
  DocumentCard,
  DocumentUploadBlock,
  CertificateModal,
  ModifyAndCloseBtn,
} from "@/components";
import { InfoCircle, CloseSquare, Document } from "iconsax-react";
import { BankCheque } from "@/assets/images";
import { useState } from "react";
import { t } from "i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTutorFollowUpAction,
  updateAllDocumentsAction,
  updateUniversityDocumentsAction,
} from "@/redux/actions/documentAction";
import FormData from "form-data";
import { getUserAction } from "@/redux/actions/userAction";
import { backAccountInfoVlidations } from "@/utils/validation";

const DocumentsTab = ({ getAllTutorDocumnet }) => {
  const dispatch = useDispatch();

  const iniBankAccountInfo = {
    transit_no: getAllTutorDocumnet?.transit_no
      ? getAllTutorDocumnet?.transit_no
      : null,
    institution_no: getAllTutorDocumnet?.institution_no
      ? getAllTutorDocumnet?.institution_no
      : null,
    account_no: getAllTutorDocumnet?.account_no
      ? getAllTutorDocumnet?.account_no
      : null,
  };

  const [bankAccountInfo, setBankAccountInfo] = useState(iniBankAccountInfo);
  const [universityFileInfo, setUniversityFileInfo] = useState(null);
  const [modifyBtn, setModifyBtn] = useState(false);
  const [universityInfo, setUniversityInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [uploadFalg, setuploadFalg] = useState(false);
  const [allDocUpadateInfo, setAllDocUpadateInfo] = useState([]);
  const [identityFlag, setIdentityFlag] = useState(false);
  const [bankDetailsFlag, setBankDetailsFlag] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [certificateImage, setCertificateImage] = useState(null);

  useEffect(() => {
    setBankAccountInfo(iniBankAccountInfo);
  }, [getAllTutorDocumnet]);

  // useEffect(() => {
  //   // if (userData?.role_id?.id === 2) {
  //   dispatch(getAllTutorDocumentsAction()); // call only tutor
  //   // }
  // }, []);

  // const { getAllTutorDocumnet } = useSelector((state) => state.document);

  const universictyOnChangeHandal = (files, type) => {
    setUniversityFileInfo(files);
  };

  const modifyOnChangeHandal = (files, type, idType, error) => {
    setAllDocUpadateInfo((current) => [
      ...current,
      {
        docType: type,
        file: files[0],
        isId: idType,
        isErorr: error,
      },
    ]);
  };

  const onChangeHandle = (field, value) => {
    setUniversityInfo({
      ...universityInfo,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const bankAccountInfoOnChangeHandle = (field, value) => {
    setBankDetailsFlag(true);
    setBankAccountInfo({
      ...bankAccountInfo,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const updateUniversityHandal = () => {
    const { document_title, document_type } = universityInfo;
    // let temp = [];
    if (document_title && universityFileInfo) {
      //&& document_type
      const formData = new FormData();

      // temp.push({
      //   document_title: document_title,
      //   document_type: document_type,
      //   document_name: universityFileInfo[0],
      // });

      formData.append("university_proof[0][document_title]", document_title);
      formData.append("university_proof[0][document_type]", document_type);
      formData.append(
        "university_proof[0][document_name]",
        universityFileInfo[0]
      );
      dispatch(updateUniversityDocumentsAction(formData));
      setUniversityInfo({});
      setuploadFalg(true);
      setModifyBtn(false);
    }
  };

  const allDocSubmitHandal = () => {
    const formData = new FormData();
    for (let index = 0; index < allDocUpadateInfo.length; index++) {
      const element = allDocUpadateInfo[index];
      if (element.docType === "id") {
        // if (identityFlag) {
        if (element?.isId === "face") {
          // formData.append(
          //   "identity_documents[type]",
          //   "id"
          //   // getAllTutorDocumnet?.identity_documents?.type
          // );
          formData.append("document_face", element?.file);
        } else {
          formData.append("document_back", element?.file);
        }
        // } else {
        //   if (element?.isId === "face") {
        //     formData.append("driver_license", true);
        //     formData.append("document_face", element?.file);
        //   } else {
        //     formData.append(
        //       "document_back",
        //       element?.file
        //     );
        //   }
        // }
      } else {
        formData.append("backgroundcheck_proof", element?.file);
      }
    }
    let formErrors = backAccountInfoVlidations(bankAccountInfo);
    const { transit_no, institution_no, account_no } = bankAccountInfo;
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // formData.append(
      //   "identity_documents[type]",
      //   identityFlag ? "id" : "driver_license"
      // );
      formData.append("transit_no", transit_no);
      formData.append("institution_no", institution_no);
      formData.append("account_no", account_no);
      if (bankDetailsFlag) {
        dispatch(updateAllDocumentsAction(formData));
        setModifyBtn(false);
        setBankAccountInfo(false);
      }
      if (getAllTutorDocumnet) {
        if (allDocUpadateInfo.length > 0) {
          dispatch(updateAllDocumentsAction(formData));
          setAllDocUpadateInfo([]);
          setModifyBtn(false);
          setBankAccountInfo(false);
          setBankAccountInfo(false);
        }
      } else {
        const { document_title, document_type } = universityInfo;
        if (
          allDocUpadateInfo.length >= 3 &&
          document_title &&
          // document_type &&
          universityFileInfo
        ) {
          formData.append(
            "university_proof[0][document_title]",
            document_title
          );
          // formData.append(
          //   "university_proof[0][document_type]",
          //   "document_type"
          // );
          formData.append(
            "university_proof[0][document_name]",
            universityFileInfo[0]
          );

          dispatch(addTutorFollowUpAction(formData));
          setModifyBtn(false);
          setBankDetailsFlag(false);
        }
      }
    }
    setModifyBtn(false);
  };

  const showCertificateHandale = (url) => {
    setCertificateImage(url);
    setShowCertificateModal(!showCertificateModal);
  };

  return (
    <>
      <Card>
        <CardHeader className="d-flex justify-content-between p-6">
          <h6 className="font-bolder">{t("DocumentsTab.Header")}</h6>
          <ModifyAndCloseBtn
            modifyBtn={modifyBtn}
            modifyHandal={(e) => {
              setModifyBtn(!modifyBtn);
              if (e) {
                setBankAccountInfo(iniBankAccountInfo);
                setUniversityInfo({});
                setUniversityFileInfo(null);
                setAllDocUpadateInfo([]);
              }
            }}
          />
        </CardHeader>
        <CardBody
          className="text-black pt-3 h-lg-calc overflow-auto"
          style={{ ["--x-h-lg"]: "235px" }}
        >
          <h6 className="mb-8">
            <span>{t("DocumentsTab.AccountInfo")}</span>
            <span
              className="ms-1 text-light-blue-a text-orange-hover cursor-pointer"
              id="bankChequeTooltip"
            >
              <InfoCircle size="20" className="ms-3" />
            </span>
          </h6>

          <UncontrolledTooltip
            style={{ ["--x-tooltip-max-width"]: "450px" }}
            placement="bottom-start"
            target="bankChequeTooltip"
          >
            <div className="text-start">
              <h6 className="text-base mb-2">
                {t("DocumentsTab.ChequeSheetNum")}
              </h6>
              <Image src={BankCheque} alt="BankCheque" />
            </div>
          </UncontrolledTooltip>
          {/* {bankAccountInfo && ( */}
          <Row className="gx-sm-10 gy-8">
            <Col sm="auto" className="w-sm-40">
              <Label>{t("DocumentsTab.TransitNum")}</Label>
              <Input
                className="custom-input-1"
                type="number"
                plaintext={true}
                value={bankAccountInfo?.transit_no}
                onChange={(e) =>
                  bankAccountInfoOnChangeHandle(
                    "transit_no",
                    Number(e.target.value) >= 0 && e.target.value
                  )
                }
                disabled={modifyBtn ? false : true}
                invalid={!!errors?.transit_no ? true : false}
              />
              <FormFeedback>{errors?.transit_no}</FormFeedback>
            </Col>
            <Col sm="auto" className="w-sm-40">
              <Label>{t("DocumentsTab.InstituteNum")}</Label>
              <Input
                className="custom-input-1"
                type="number"
                plaintext={true}
                value={bankAccountInfo?.institution_no}
                onChange={(e) =>
                  bankAccountInfoOnChangeHandle(
                    "institution_no",
                    Number(e.target.value) >= 0 && e.target.value
                  )
                }
                disabled={modifyBtn ? false : true}
                invalid={!!errors?.institution_no ? true : false}
              />
              <FormFeedback>{errors?.institution_no}</FormFeedback>
            </Col>
            <Col sm="auto" className="w-sm-40">
              <Label>{t("DocumentsTab.AccountNum")}</Label>
              <Input
                className="custom-input-1"
                type="number"
                plaintext={true}
                value={bankAccountInfo?.account_no}
                onChange={(e) =>
                  bankAccountInfoOnChangeHandle(
                    "account_no",
                    Number(e.target.value) >= 0 && e.target.value
                  )
                }
                disabled={modifyBtn ? false : true}
                invalid={!!errors?.account_no ? true : false}
              />
              <FormFeedback>{errors?.account_no}</FormFeedback>
            </Col>
          </Row>
          {/* )} */}
          <hr className="my-md-14 my-8" />
          <h6 className="mb-6 text-font-size-md">
            {t("DocumentsTab.IdentifyDocs")}
          </h6>
          {modifyBtn && (
            <p className="text-black mb-6">
              {" "}
              {t("DocumentsTab.IdentifyTitle")}
            </p>
            // <>
            //   <Row className="gx-10 mb-6">
            //      <Col xs="auto" className="w-sm-40">
            //       <FormGroup check inline>
            //         <Input
            //           name="identityDocuments"
            //           id="idcard"
            //           type="radio"
            //           onChange={(e) => setIdentityFlag(true)}
            //         />
            //         <Label check for="idcard">
            //           {t("DocumentsTab.CardId")}
            //         </Label>
            //       </FormGroup>
            //     </Col>
            //     <Col xs="auto" className="w-sm-60">
            //       <FormGroup check inline>
            //         <Input
            //           name="identityDocuments"
            //           id="drivingLicense"
            //           type="radio"
            //           onChange={(e) => setIdentityFlag(false)}
            //         />
            //         <Label check for="drivingLicense">
            //           {t("DocumentsTab.License")}
            //         </Label>
            //       </FormGroup>
            //     </Col>
            //   </Row>
            // </>
          )}
          <Row className="gx-10 gy-8 ">
            <Col xs="auto" className="w-sm-80">
              {modifyBtn && (
                <div className="">
                  <h6 className="font-bold mb-6 text-base">
                    {t("DocumentsTab.FaceDoc")}
                  </h6>
                  <DocumentUploadBlock
                    onChangeHandal={(e, t, z, y) =>
                      modifyOnChangeHandal(e, t, z, y)
                    }
                    type="id"
                    uploadFalg={uploadFalg}
                    idType={"face"}
                    documentAvelable={
                      getAllTutorDocumnet &&
                      getAllTutorDocumnet?.identity_documents[0]?.document_face
                        ? false
                        : true
                    }
                    getAllTutorDocumnet={getAllTutorDocumnet}
                  />
                </div>
              )}
              {getAllTutorDocumnet?.identity_documents?.length > 0
                ? getAllTutorDocumnet?.identity_documents?.map((val, index) => {
                    return (
                      val?.document_face && (
                        <DocumentCard
                          type={true}
                          getAllTutorDocumnet={getAllTutorDocumnet}
                          identityDocuments={val}
                          showUniversityProof={null}
                          backgroundCheck={null}
                          UIndex={index}
                          modifyBtn={modifyBtn}
                          isId={true}
                          showCertificateHandale={(e) =>
                            showCertificateHandale(e)
                          }
                          marginClassName={modifyBtn ? true : false}
                          key={index}
                        />
                      )
                    );
                  })
                : !modifyBtn && (
                    <div className="w-24 h-24 rounded-2 flex-none hstack justify-content-center border border-light-blue-b">
                      <Document size="18" className="text-light-blue-b" />
                    </div>
                  )}
              {/* {getAllTutorDocumnet?.identity_documents?.length === 0
                ? !modifyBtn && (
                    <div className="w-24 h-24 rounded-2 flex-none hstack justify-content-center border border-light-blue-b">
                      <Document size="18" className="text-light-blue-b" />
                    </div>
                  )
                : getAllTutorDocumnet?.identity_documents?.map((val, index) => {
                    return (
                      val?.document_face && (
                        <DocumentCard
                          type={true}
                          getAllTutorDocumnet={getAllTutorDocumnet}
                          identityDocuments={val}
                          showUniversityProof={null}
                          backgroundCheck={null}
                          UIndex={index}
                          modifyBtn={modifyBtn}
                          isId={true}
                          showCertificateHandale={(e) =>
                            showCertificateHandale(e)
                          }
                          marginClassName={modifyBtn ? true : false}
                          key={index}
                        />
                      )
                    );
                  })} */}
            </Col>
            <Col xs="auto" className="w-sm-80">
              {modifyBtn && (
                <div className="">
                  <h6 className="font-bold mb-6 text-base">
                    {t("DocumentsTab.BackDoc")}
                  </h6>
                  <DocumentUploadBlock
                    onChangeHandal={(e, t, z, y) =>
                      modifyOnChangeHandal(e, t, z, y)
                    }
                    type="id"
                    uploadFalg={uploadFalg}
                    idType={"back"}
                    documentAvelable={
                      getAllTutorDocumnet &&
                      getAllTutorDocumnet?.identity_documents[0]
                        ?.document_back === undefined &&
                      getAllTutorDocumnet?.identity_documents[1]
                        ?.document_back === undefined
                        ? true
                        : false
                    }
                    getAllTutorDocumnet={getAllTutorDocumnet}
                  />
                </div>
              )}
              {getAllTutorDocumnet?.identity_documents &&
                getAllTutorDocumnet?.identity_documents?.map((val, index) => {
                  return (
                    val?.document_back && (
                      <DocumentCard
                        type={true}
                        getAllTutorDocumnet={getAllTutorDocumnet}
                        identityDocuments={val}
                        showUniversityProof={null}
                        backgroundCheck={null}
                        UIndex={index}
                        modifyBtn={modifyBtn}
                        isId={false}
                        showCertificateHandale={(e) =>
                          showCertificateHandale(e)
                        }
                        marginClassName={modifyBtn ? true : false}
                        key={index}
                      />
                    )
                  );
                })}
            </Col>
          </Row>
          <hr className="my-md-14 my-8" />
          <h6 className="mb-6 text-font-size-md">
            {t("DocumentsTab.Academic")}
          </h6>
          {modifyBtn && (
            <Row className="gx-10 mb-lg-10 mb-6">
              <Col sm="auto" className="w-xl-80">
                <DocumentUploadBlock
                  onChangeHandal={(e, t) => universictyOnChangeHandal(e, t)}
                  type="u"
                  uploadFalg={uploadFalg}
                  documentAvelable={
                    getAllTutorDocumnet?.university_proof?.length > 0
                      ? false
                      : true
                  }
                  getAllTutorDocumnet={getAllTutorDocumnet}
                />
              </Col>
              <Col xl md="12" className="hstack">
                <Row className="flex-fill mt-auto gy-6">
                  <Col sm="4" className="col-3xl-5">
                    <Label>{t("DocumentsTab.DocumentTitle")}</Label>
                    <Input
                      plaintext={true}
                      className="custom-input-1"
                      placeholder={t("DocumentsTab.TypeHere")}
                      value={universityInfo?.document_title}
                      onChange={(e) =>
                        onChangeHandle("document_title", e.target.value)
                      }
                    />
                  </Col>
                  {/* <Col sm="4" className="col-3xl-5">
                  <Label>{t("DocumentsTab.DocumentType")}</Label>
                  <Input
                    className="custom-input-1"
                    type="select"
                    value={universityInfo.document_type}
                    onChange={(e) =>
                      onChangeHandle("document_type", e.target.value)
                    }
                  >
                    <option>{t("DocumentsTab.DocTypeOption")}</option>
                    <option>{t("DocumentsTab.DocTypeOption")}</option>
                  </Input>
                </Col> */}
                  <Col sm="8" className="col-3xl-7 hstack">
                    <Button
                      // color="grey-d"
                      color="dark-blue-c"
                      className="ms-sm-auto mt-auto"
                      onClick={() => updateUniversityHandal()}
                    >
                      {t("DocumentsTab.UploadBtn")}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
          <Row className="gx-10 gy-8">
            {/* {getAllTutorDocumnet?.university_proof?.length === 0 ? (
              <>
                {!modifyBtn && (
                  <div className="ms-6 w-24 h-24 rounded-2 flex-none hstack justify-content-center border border-light-blue-b">
                    <Document size="18" className="text-light-blue-b" />
                  </div>
                )}
              </>
            ) : (
              getAllTutorDocumnet?.university_proof?.map((val, index) => {
                return (
                  <Col sm="auto" className="w-sm-80" key={index}>
                    <DocumentCard
                      type={false}
                      getAllTutorDocumnet={getAllTutorDocumnet}
                      identityDocuments={null}
                      showUniversityProof={val}
                      backgroundCheck={null}
                      UIndex={index}
                      modifyBtn={modifyBtn}
                      showCertificateHandale={(e) => showCertificateHandale(e)}
                      key={index}
                    />
                  </Col>
                );
              })
            )} */}
            {getAllTutorDocumnet?.university_proof?.length > 0 ? (
              getAllTutorDocumnet?.university_proof?.map((val, index) => {
                return (
                  <Col sm="auto" className="w-sm-80" key={index}>
                    <DocumentCard
                      type={false}
                      getAllTutorDocumnet={getAllTutorDocumnet}
                      identityDocuments={null}
                      showUniversityProof={val}
                      backgroundCheck={null}
                      UIndex={index}
                      modifyBtn={modifyBtn}
                      showCertificateHandale={(e) => showCertificateHandale(e)}
                      key={index}
                    />
                  </Col>
                );
              })
            ) : (
              <>
                {!modifyBtn && (
                  <div className="ms-6 w-24 h-24 rounded-2 flex-none hstack justify-content-center border border-light-blue-b">
                    <Document size="18" className="text-light-blue-b" />
                  </div>
                )}
              </>
            )}
          </Row>
          <hr className="my-md-14 my-8" />
          <h6 className="mb-6 text-font-size-md">
            {t("DocumentCard.BackgroundCheck")}
          </h6>
          <Row className="gx-10 gy-8">
            {modifyBtn && (
              <Col sm="auto" className="w-sm-80">
                <DocumentUploadBlock
                  onChangeHandal={(e, t, z, y) =>
                    modifyOnChangeHandal(e, t, z, y)
                  }
                  type="background"
                  uploadFalg={uploadFalg}
                  documentAvelable={
                    getAllTutorDocumnet?.backgroundcheck_proof ? false : true
                  }
                  getAllTutorDocumnet={getAllTutorDocumnet}
                />
              </Col>
            )}
            {getAllTutorDocumnet?.backgroundcheck_proof?.length > 0 ? (
              <Col sm="auto" className="w-sm-80">
                <DocumentCard
                  type={null}
                  getAllTutorDocumnet={getAllTutorDocumnet}
                  identityDocuments={null}
                  showUniversityProof={null}
                  backgroundCheck={getAllTutorDocumnet?.backgroundcheck_proof}
                  modifyBtn={modifyBtn}
                  showCertificateHandale={(e) => showCertificateHandale(e)}
                />
              </Col>
            ) : (
              <Col>
                {!modifyBtn && (
                  <div className="w-24 h-24 rounded-2 flex-none hstack justify-content-center border border-light-blue-b">
                    <Document size="18" className="text-light-blue-b" />
                  </div>
                )}
              </Col>
            )}
          </Row>
          {modifyBtn && (
            <Button
              className="mt-10"
              color="dark-blue-c"
              onClick={() => allDocSubmitHandal()}
            >
              {t("DocumentsTab.SafeguardBtn")}
            </Button>
          )}
        </CardBody>
      </Card>
      {showCertificateModal && (
        <CertificateModal
          show={showCertificateModal}
          hide={() => showCertificateHandale()}
          certificateImage={certificateImage}
        />
      )}
    </>
  );
};

export default DocumentsTab;
