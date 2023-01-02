import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Event.scss';

enum DATES {
  jan,
  feb,
  mar,
  apr,
  maj,
  jun,
  jul,
  aug,
  sep,
  okt,
  nov,
  dec
}

export type EventProps = {
  id: string,
  name: string,
  description?: string,
  startDate: string,
  endDate: string,
}

const getDayLabel = (date: Date) => {
  const todayLabel = 'Idag';
  const tomorrowLabel = 'Imorgon';
  const dateToday = new Date();
  const dateTomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24);
  if (date.toDateString() === dateToday.toDateString()) {
    return todayLabel;
  }
  if (date.toDateString() === dateTomorrow.toDateString()) {
    return tomorrowLabel;
  }
  return null;
}

const formatDate = (startDate: string, endDate: string) => {
  const startDateObj = new Date(startDate);
  const startDayLabel = getDayLabel(startDateObj);

  if (endDate !== startDate) {
    const endDateObj = new Date(endDate);
    const endDayLabel = getDayLabel(endDateObj);
    const ends = (endDayLabel) ? endDayLabel : `${endDateObj.getDate()} ${DATES[endDateObj.getMonth()]}`;
    let starts;
    if (startDateObj.getMonth() !== endDateObj.getMonth() || endDayLabel) {
      starts = (startDayLabel) ? startDayLabel : `${startDateObj.getDate()} ${DATES[startDateObj.getMonth()]}`;
    } else {
      starts = (startDayLabel) ? startDayLabel : `${startDateObj.getDate()}`;
    }
    return `${starts} - ${ends}`;
  }
  return (startDayLabel) ? startDayLabel : `${startDateObj.getDate()} ${DATES[startDateObj.getMonth()]}`;
}

const YearDisplay = ({ endDate }: { endDate: string }) => {
  const endYear = new Date(endDate).getFullYear();
  if (endYear !== new Date().getFullYear()) {
    return <span className="year">{endYear}</span>;
  }
  return null;
}

const Event = ({ name, description, startDate, endDate }: EventProps) => {
  const formatedDate = formatDate(startDate, endDate);
  return (
    <div className='event'>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={4} xl={3}>
            <span className='date'>{formatedDate} <YearDisplay endDate={endDate} /></span>
          </Col>
          <Col xs={12} md={8} xl={7}>
            <span className="title">{name}</span>
            <span className="description">{description}</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Event;