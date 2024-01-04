import { Document } from "iconsax-react";
import { Button } from "reactstrap";
import { t } from "i18next";
import { useRef } from "react";
import { useState } from "react";

function DocumentUploadBlock({
  onChangeHandal,
  type,
  uploadFalg,
  idType,
  documentAvelable,
}) {
  const [document, setDocument] = useState({});
  const [errro, setErrro] = useState(false);
  const inputRef = useRef(null);
  
  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = ({ target: { files } }) => {
    const [{ size, name }] = files;
    var totalSizeMd = size / Math.pow(1024, 2);
    setDocument({
      size: totalSizeMd.toFixed(2),
      name: name,
    });

    if (totalSizeMd >= 20) {
      setErrro(true);
    } else {
      onChangeHandal(files, type, idType, errro);
      setErrro(false);
    }
  };

  return (
    <div className="d-flex gap-5">
      <div className="w-24 rounded-2 flex-none hstack justify-content-center border border-light-blue-b">
        <Document size="18" className="text-light-blue-b" />
      </div>
      <div className="flex-fill">
        <p className="text-light-blue-a mb-2" style={{ maxWidth: "140px" }}>
          {document?.name && !uploadFalg ? (
            <>
              {errro ? (
                <>
                  {t("CompleteSessionModal.FileSize")} <br />
                  <span className="text-red">
                    {document?.size}MB — {t("CompleteSessionModal.UploadError")}
                  </span>
                </>
              ) : (
                <>
                  {document?.name} <br />
                  <span className="text-green">
                    {document?.size}MB — {t("CompleteSessionModal.UploadDone")}
                  </span>
                </>
              )}
            </>
          ) : (
            t("DocumentUploadBlock.DocumentSize")
          )}
        </p>
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
        />
        <Button
          color="none"
          className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover w-full"
          onClick={handleClick}
        >
          {/* {btnNameChangeHadle()} */}
          {documentAvelable && idType == "face"
            ? t("DocumentUploadBlock.UploadDocument")
            : documentAvelable && idType == "back"
            ? t("DocumentUploadBlock.UploadDocument")
            : documentAvelable
            ? t("DocumentUploadBlock.UploadDocument")
            : t("DocumentUploadBlock.UpdateDocument")}
          {/* {documentAvelable &&
            idType === "back" &&
            t("DocumentUploadBlock.UpdateDocument")}
          {documentAvelable &&
            idType === "face" &&
            t("DocumentUploadBlock.UpdateDocument")} */}
        </Button>
      </div>
    </div>
  );
}
export default DocumentUploadBlock;
