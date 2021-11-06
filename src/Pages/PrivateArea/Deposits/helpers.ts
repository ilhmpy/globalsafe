import moment from 'moment';

export const getPercentage = (creationDate: Date, endDate: Date): number => {
  const now = moment(new Date());
  const percent =
    (moment.duration(now.diff(creationDate)).asDays() * 100) /
    moment.duration(moment(creationDate).diff(endDate)).asDays();

  return Math.abs(Math.round(percent));
};
