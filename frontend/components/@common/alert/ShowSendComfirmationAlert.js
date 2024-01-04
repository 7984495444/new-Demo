import { Copy, Notification } from "iconsax-react";
import React from "react";
import { MdClose } from "react-icons/md";
import { Alert } from "reactstrap";
import { t } from "i18next";
import { useRouter } from "next/router";

const ShowSendComfirmationAlert = ({
  showAlert,
  editSessionReq,
  hideShowAlert,
  userData,
}) => {
  const router = useRouter();

  // redirect messages handal (tutor -> student)
  const redirectMessagePageHandal = async (data) => {
    router.push({
      pathname: "/messages",
      query: {
        id: editSessionReq?.contact?.id,
        first_name: editSessionReq?.contact?.first_name,
        last_name: editSessionReq?.contact?.last_name,
        profile_image: editSessionReq?.contact?.student_profile_image,
      },
    });
  };

  return (
    <>
      <Alert
        className="position-relative d-flex flex-sm-row flex-column gap-4 align-items-start"
        isOpen={showAlert}
        color="green"
      >
        <div className="alert-icon">
          <Copy />
        </div>
        <div className="flex-fill vstack gap-2">
          <div className="d-flex gap-2 justify-content-between">
            <p className="alert-heading">
              {t("NotificationsTab.ModificationSent")}
            </p>
            <button
              className="btn btn-alert-close p-0 shadow-none border-0 position-sm-static position-absolute top-3 end-5"
              type="button"
              onClick={() => {
                hideShowAlert(false);
              }}
            >
              <MdClose />
            </button>
          </div>
          <div className="d-flex flex-sm-row flex-column gap-2 justify-content-between mt-auto">
            <p>
              {userData?.role_id?.id === 3
                ? t("NotificationsTab.ConfirmationAlertParent")
                : t("NotificationsTab.ModificationAlert1")}{" "}
              <Notification className="mx-1" color="#2AAC6E" />
              {t("NotificationsTab.ModificationAlert2")}
            </p>
            {editSessionReq && (
              <div
                className="text-underline flex-none font-bold cursor-pointer"
                onClick={() => redirectMessagePageHandal()}
              >
                Contact{" "}
                {`${editSessionReq?.contact?.first_name}  ${editSessionReq?.contact?.last_name}`}
              </div>
            )}
          </div>
        </div>
      </Alert>
    </>
  );
};

export default ShowSendComfirmationAlert;
