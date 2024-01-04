import { profilePlaceholder } from "@/assets/images";
import Image from "next/image";
import React from "react";

const ShowImage = ({ className, imageName, width, height, style }) => {
  return (
    <Image
      className={className}
      src={
        imageName
          ? `${process.env.NEXT_PUBLIC_API_URL}/users/profile-image/${imageName}`
          : profilePlaceholder
      }
      width={width}
      height={height}
      alt="User Image"
      style={style}
    />
  );
};

export default ShowImage;
