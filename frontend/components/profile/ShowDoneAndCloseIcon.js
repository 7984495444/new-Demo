import React from "react";
import { MdClose, MdDone } from "react-icons/md";

const ShowDoneAndCloseIcon = ({ reciveNumber, filedLength }) => {
  return (
    <>
      {Array.from({
        length: filedLength,
      }).map((_, index) => {
        return (
          <td className="text-center" key={index}>
            {parseInt(reciveNumber) === index + 1 ? (
              <MdDone className="text-xl text-dark-blue-c" />
            ) : (
              <MdClose className="text-xl text-light-a" />
            )}
          </td>
        );
      })}
    </>
  );
};

export default ShowDoneAndCloseIcon;
