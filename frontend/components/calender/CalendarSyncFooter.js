import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';
import { t } from "i18next";

function CalendarSyncFooter() {
  return (
    <Card>
      <CardBody>
        <Row className="row gy-4">
          <Col sm="auto" className="hstack gap-2">
            <FcGoogle size='20' />
            <span>{t("CalendarSyncFooter.CalenderSync")}</span>
          </Col>
          <Col sm="auto" className='hstack me-auto'>
            <span className='text-light-blue-a'>{t("CalendarSyncFooter.AppoinmenySync")}</span>
          </Col>
          <Col sm="auto" className='hstack'>
            <Button color="orange" className='text-white'>{t("CalendarSyncFooter.SyncMyCalenderBtn")}</Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default CalendarSyncFooter;
