import { profilePlaceholder } from "@/assets/images";
import { t } from "i18next";
import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { Button } from "reactstrap";

const ProfileImageUpdate = ({
  imageLoading,
  user,
  modifyBtn,
  inputRef,
  editInfohandleChange,
  handleClick,
  deleteProfileImageHadal,
}) => {
  return (
    <div className="hstack gap-4 pb-6 ">
      {!imageLoading ? (
        <Image
          className="avatar h-18 w-18 rounded-pill"
          src={
            typeof user?.profile_image === "object" &&
            user?.profile_image !== null
              ? URL.createObjectURL(user?.profile_image)
              : typeof user?.profile_image === "string"
              ? `${process.env.NEXT_PUBLIC_API_URL}/users/profile-image/${user?.profile_image}`
              : profilePlaceholder
          }
          alt="avatar"
          width={100}
          height={100}
        />
      ) : (
        <Skeleton
          circle
          height={80}
          width={80}
          containerClassName="followup-report-loading-avatar"
        />
      )}
      <div>
        <p className="text-dark-blue-a">{t("EditInformations.ProfileImage")}</p>
        {modifyBtn && (
          <div className="mt-2">
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple="multiple"
              onChange={(e) => {
                editInfohandleChange("profile_image", e.target.files[0]);
              }}
            />
            <Button color="dark-blue-c" className="me-3" onClick={handleClick}>
              {t("EditInformations.ImageUploadBtn")}
            </Button>
            <Button
              color="red"
              className=""
              onClick={() => deleteProfileImageHadal()}
            >
              {t("EditInformations.ImageDeleteBtn")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUpdate;
