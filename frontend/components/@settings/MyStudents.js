import { addStudnetData } from "@/utils/data";
import { t } from "i18next";
import { Trash } from "iconsax-react";
import React from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";

const MyStudents = ({
  parentStudents,
  editStudentInfoOnchnageHandal,
  modifyBtn,
  studentToBeAdded,
  deleteStudentFieldHandal,
  addStudenthandleChange,
  addStudentError,
}) => {
  return (
    <>
      {Array.from({ length: parentStudents?.length }).map((_, ind) => (
        <div
          key={ind}
          className="pb-6 border-dashed border-bottom border-light-blue-b mb-4"
        >
          <div className="mt-12 mb-2 d-flex justify-content-between">
            <h6 className="">{t("EditInformations.MyStudents")}</h6>
            {/* <Button
                      className="btn-square bg-light-red-a bg-red-hover text-red text-light-red-a-hover"
                      size="sm"
                      color="none"
                    // onClick={() => ()}
                    >
                      <Trash />
                    </Button> */}
          </div>
          <Row className="gx-sm-12 gy-6" key={ind}>
            {addStudnetData.map((val, index) => {
              return (
                <Col sm="6" key={index}>
                  <Label>{t(val.label)}</Label>
                  <Input
                    className="custom-input-1"
                    plaintext={true}
                    type={val.type}
                    placeholder={t("EditInformations.placeholder")}
                    value={parentStudents[ind][val?.name]}
                    onChange={(e) =>
                      editStudentInfoOnchnageHandal(
                        val.name,
                        e.target.value,
                        ind
                      )
                    }
                    disabled={val?.name == "email" || !modifyBtn ? true : false}
                  />
                  {/* <p>{addStudentError[ind]?.[val.name]}</p> */}
                </Col>
              );
            })}
          </Row>
        </div>
      ))}
      {studentToBeAdded?.map((_, ind) => {
        return (
          <div
            key={ind}
            className="pb-6 border-bottom border-light-blue-b"
            style={{ borderStyle: "dotted" }}
          >
            <div className="mt-12 mb-2 d-flex justify-content-between">
              <h6 className="">{t("EditInformations.MyStudents")}</h6>
              <Button
                className="btn-square bg-light-red-a bg-red-hover text-red text-light-red-a-hover"
                size="sm"
                color="none"
                onClick={() => deleteStudentFieldHandal(ind)}
              >
                <Trash />
              </Button>
            </div>
            <Row className="gx-sm-12 gy-6 mb-6" key={ind}>
              {addStudnetData.map((val, index) => {
                return (
                  <Col sm="6" key={index}>
                    <Label>{t(val.label)}</Label>
                    <Input
                      className="custom-input-1"
                      plaintext={true}
                      type={val.type}
                      placeholder={val?.placeholder}
                      value={studentToBeAdded[ind][val?.name]}
                      onChange={(e) =>
                        addStudenthandleChange(val.name, e.target.value, ind)
                      }
                    />
                    {modifyBtn && <p>{addStudentError[ind]?.[val.name]}</p>}
                  </Col>
                );
              })}
            </Row>
          </div>
        );
      })}
    </>
  );
};

export default MyStudents;

// {
//   {
//     Array.from({ length: addStudentfieldConunter }).map((_, ind) => {
//       if (studentToBeAdded[ind] !== null) {
//         return (
//           <div
//             key={ind}
//             className="pb-6 border-bottom border-light-blue-b"
//             style={{ borderStyle: "dotted" }}
//           >
//             <div className="mt-12 mb-2 d-flex justify-content-between">
//               <h6 className="">Mes élèves</h6>
//               <Button
//                 className="btn-square bg-light-red-a bg-red-hover text-red text-light-red-a-hover"
//                 size="sm"
//                 color="none"
//                 onClick={() => deleteStudentFieldHandal(ind)}
//               >
//                 <Trash />
//               </Button>
//             </div>
//             <Row className="gx-sm-12 gy-6 mb-6" key={ind}>
//               {addStudnetData.map((val, index) => {
//                 return (
//                   <Col sm="6" key={index}>
//                     <Label>{val.label}</Label>
//                     <Input
//                       className="custom-input-1"
//                       plaintext={true}
//                       type={val.type}
//                       placeholder={val?.placeholder}
//                       value={
//                         studentToBeAdded[ind]?.length &&
//                         studentToBeAdded[ind][val?.name]
//                       }
//                       onChange={(e) =>
//                         addStudenthandleChange(val.name, e.target.value, ind)
//                       }
//                     />
//                     {modifyBtn && <p>{addStudentError[ind]?.[val.name]}</p>}
//                   </Col>
//                 );
//               })}
//             </Row>
//           </div>
//         );
//       }
//     });
//   }
// }
