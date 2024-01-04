import { Document, Eye, Trash } from "iconsax-react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteTutorDocumentsAction } from "@/redux/actions/documentAction";

function DocumentCard({
  type,
  getAllTutorDocumnet,
  identityDocuments,
  showUniversityProof,
  backgroundCheck,
  modifyBtn,
  isId,
  showCertificateHandale,
  marginClassName,
}) {
  const dispatch = useDispatch();

  const deleteDocumentHandal = (temp) => {
    let filed = {};
    let removeIds = {};
    if (type) {
      if (getAllTutorDocumnet?.identity_documents?.length > 0) {
        removeIds = getAllTutorDocumnet?.identity_documents?.filter(
          (val) => val !== identityDocuments
        );
      }
      let data = [];
      if (isId && removeIds.length > 0) {
        data?.push({
          document_back: removeIds[0].document_back,
        });
      } else if (removeIds.length > 0) {
        data?.push({
          document_face: removeIds[0].document_face,
        });
      } else {
        data = [];
      }
      filed = {
        identity_documents: data,
        university_proof: getAllTutorDocumnet.university_proof,
        backgroundcheck_proof: getAllTutorDocumnet.backgroundcheck_proof,
      };
    } else if (type === null) {
      filed = {
        identity_documents: getAllTutorDocumnet?.identity_documents,
        university_proof: getAllTutorDocumnet.university_proof,
        backgroundcheck_proof: "",
      };
    } else {
      let data = getAllTutorDocumnet?.university_proof?.filter(
        (val) => val?.document_name !== temp.document_name
      );
      filed = {
        identity_documents: getAllTutorDocumnet?.identity_documents,
        university_proof: data,
        backgroundcheck_proof: getAllTutorDocumnet.backgroundcheck_proof,
      };
    }
    dispatch(deleteTutorDocumentsAction(filed));
  };

  return (
    <Card
      className={`border-dark-blue-c ${marginClassName && "mt-10"}`}
      style={{ ["--x-card-bg"]: "#E3E7EE" }}
    >
      <CardBody className="px-5">
        <Row>
          <Col xs="8" className="hstack gap-4">
            <Document size="28" className="text-dark-blue-c" />
            <span className="d-block text-truncate">
              {type ? (
                `Id. Card ${isId ? "I" : "II"} `
              ) : type === null ? (
                "Antécédents"
              ) : (
                <>{showUniversityProof?.document_title}</>
              )}
            </span>
          </Col>
          <Col xs="4" className="hstack">
            <Button
              color="square"
              size="sm"
              className="ms-auto"
              onClick={() =>
                showCertificateHandale(
                  type
                    ? isId
                      ? identityDocuments?.document_face
                      : identityDocuments?.document_back
                    : type === null
                    ? backgroundCheck
                    : showUniversityProof?.document_name
                )
              }
            >
              <Eye size="20" className="text-dark-blue-c" />
            </Button>
            {modifyBtn && (
              <Button
                color="square"
                size="sm"
                onClick={() =>
                  deleteDocumentHandal(
                    type
                      ? isId
                        ? identityDocuments.document_face
                        : identityDocuments.document_back
                      : type === null
                      ? backgroundCheck
                      : showUniversityProof
                  )
                }
              >
                <Trash size="20" className="text-dark-blue-c" />
              </Button>
            )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
export default DocumentCard;
