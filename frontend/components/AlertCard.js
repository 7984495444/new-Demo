import { useState } from "react";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import { allAlertMessage } from "@/utils/data";
import { Alert } from "reactstrap";

function AlertCard() {
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  return (
    <>
      {allAlertMessage.map((val, index) => {
        return (
          <Alert
            className="position-relative d-flex flex-sm-row flex-column gap-4 align-items-start"
            isOpen={visible}
            color={val.color}
            key={index}
          >
            <div className="alert-icon">{val.icon}</div>
            <div className="flex-fill vstack gap-2">
              <div className="d-flex gap-2 justify-content-between">
                <p className="alert-heading">{val.title}</p>
                <button
                  className="btn btn-alert-close p-0 shadow-none border-0 position-sm-static position-absolute top-3 end-5"
                  type="button"
                  onClick={() => {
                    onDismiss();
                  }}
                >
                  <MdClose />
                </button>
              </div>
              <div className="d-flex flex-sm-row flex-column gap-2 justify-content-between mt-auto">
                <p>{val.message}</p>
                <Link
                  className="text-underline flex-none font-bold"
                  href={val.link}
                >
                  {val.linkMessages}
                </Link>
              </div>
            </div>
          </Alert>
        );
      })}
    </>
  );
}

export default AlertCard;
