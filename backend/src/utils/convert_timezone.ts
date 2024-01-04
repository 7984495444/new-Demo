import * as moment from 'moment';
import * as moment2 from 'moment-timezone';

export class timeZoneCovert {
  // function to get user timezone
  async getUserTimeZone(): Promise<any> {
    const userTimeZone = moment2.tz.guess();
    return userTimeZone;
  }

  // Function to convert the date to the universal timezone
  async convertToUniversalTime(date: string, hour: string): Promise<any> {
    const userTimeZone = moment2.tz.guess();

    const combinedDateTime = moment.tz(
      `${date} ${hour}`,
      'YYYY-MM-DD HH:mm',
      userTimeZone,
    );

    const utcDateTime = combinedDateTime.utc().format('YYYY-MM-DD HH:mm');
    return utcDateTime;
  }

  // Function to convert the date to the user timezone
  async convertToUserTimeZone(utcDateTime: string): Promise<string> {
    const userTimeZone = moment2.tz.guess();

    const localDateTime = moment
      .utc(utcDateTime)
      .tz(userTimeZone)
      .format('YYYY-MM-DD HH:mm');

    return localDateTime;
  }

  // Function to convert the time string to the utc timezone
  async convertStringFromUTCtoLocal(inputString: string): Promise<string> {
    const userTimeZone = moment2.tz.guess();
    const userTime = moment.tz(inputString, 'HH:mm', userTimeZone);
    const utcTime = userTime.utc();

    const formattedString = utcTime.format('HH[h]mm');
    return formattedString;
  }

  // Function to convert the time string to the local timezone
  async convertStringFromLocaltoUTC(inputString: string): Promise<string> {
    const userTimeZone = moment.tz.guess();
    const utcTime = moment.utc(inputString, 'HH:mm');

    const localTime = utcTime.tz(userTimeZone);

    const formattedString = localTime.format('HH[h]mm');
    return formattedString;
  }

  //Convert date to utc format
  async convertUtcDateTime(date: Date): Promise<any> {
    return moment(date).utc().format('YYYY-MM-DD HH:mm');
  }

  async getStartAndEndTime(interval: string): Promise<any> {
    const currentDate = new Date();
    let start: moment.Moment, end: moment.Moment;
    switch (interval) {
      case 'week':
        start = moment(currentDate).startOf('isoWeek');
        end = moment(currentDate).endOf('isoWeek');
        break;
      case 'day':
        start = moment(currentDate).startOf('day');
        end = moment(currentDate).endOf('day');
        break;
      default:
        throw new Error('Invalid interval provided');
    }
    return {
      start: start.utc().format('YYYY-MM-DD HH:mm:ss'),
      end: end.utc().format('YYYY-MM-DD HH:mm:ss'),
    };
  }
}
