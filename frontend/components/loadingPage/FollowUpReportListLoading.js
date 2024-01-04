import React from "react";
import { Table } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FollowUpReportListLoading = () => {
  return (
    <div className="p-5">
      <Table responsive style={{ minWidth: "1064px" }} className="mb-10">
        <thead>
          <tr>
            <th width="25%" className="font-bolder">
              <Skeleton width={100} height={30} />
            </th>
            <th width="10%" className="font-bolder">
              <Skeleton width={100} height={30} />
            </th>
            <th width="10%" className="font-bolder">
              <Skeleton width={100} height={30} />
            </th>
            <th width="15%" className="font-bolder">
              <Skeleton width={100} height={30} />
            </th>
            <th width="20%" className="font-bolder">
              <Skeleton width={100} height={30} />
            </th>
            <th width="10%" className="font-bolder">
              <Skeleton width={100} height={30} />
            </th>
          </tr>
        </thead>
        {Array.from({
          length: 8,
        }).map((_, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>
                  <div className="hstack gap-3">
                    <Skeleton
                      circle
                      height={35}
                      width={35}
                      containerClassName="followup-report-loading-avatar"
                    />
                    <div>
                      <Skeleton width={110} height={20} />
                    </div>
                  </div>
                </td>
                <td>
                  <Skeleton width={110} height={20} />
                </td>
                <td>
                  <Skeleton width={100} height={20} />
                </td>
                <td>
                  <Skeleton width={100} height={20} />
                </td>
                <td>
                  <Skeleton width={150} height={20} />
                </td>
                <td>
                  <Skeleton width={100} height={30} />
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default FollowUpReportListLoading;
