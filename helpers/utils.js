import moment from 'moment';

export const calculateWeekInProgram = (startDate, endDate) => {
  let startDateMoment = moment(startDate).startOf('isoWeek');
  let endDateMoment = endDate ? moment(endDate) : moment();
  return endDateMoment.diff(startDateMoment, 'week') + 1
}

export function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

export function convertSecondsToMinutes(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  var finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(parseInt(seconds), '0', 2);
  return finalTime;
}

export function convertFormatTime(time) {
  const minutes = (time + "").split(".")[0];
  const seconds = ((time + "").split(".")[1]) ?
    ((time + "").split(".")[1].length < 2) ?
      ((time + "").split(".")[1]) + "0"
      :
      ((time + "").split(".")[1])
    : "00"
  return `${minutes}:${seconds}`;
}

export function convertFormatDate() {

  const d = new Date();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


  return days[d.getDay()]
}


export function checkStar(mission_activities, activities_level) {
  var sumScoreInWeek = 0;
  mission_activities && mission_activities.map((itemMa, i) => {
    var sumItem = itemMa.number_completed * itemMa.score
    sumScoreInWeek = sumScoreInWeek + sumItem

  })
  var star_numb = 0;
  var trophy = 0;
  activities_level && activities_level.map((item, i) => {
    if (sumScoreInWeek >= item.pts_length_min && sumScoreInWeek <= item.pts_length_max) {
      star_numb = item.star_numb;
    }
    if ((star_numb === 3) && (sumScoreInWeek > item.pts_length_min)) {
      trophy = 1;
    }

  });
  return star_numb;
};

export function checkTrophy(mission_activities, activities_level) {
  var sumScoreInWeek = 0;
  mission_activities && mission_activities.map((itemMa, i) => {
    var sumItem = itemMa.number_completed * itemMa.score
    let sumScoreMax = itemMa.number * itemMa.score

    if (itemMa.number_completed > itemMa.number) {
      sumScoreInWeek = sumScoreMax + sumScoreInWeek
    } else {
      sumScoreInWeek = sumScoreInWeek + sumItem
    }

  })


  var star_numb = 0;
  var trophy = 0;
  activities_level && activities_level.map((item, i) => {

    if (sumScoreInWeek >= item.pts_length_min && sumScoreInWeek <= item.pts_length_max) {
      star_numb = item.star_numb;
    }
    if ((star_numb === 3) && (sumScoreInWeek > item.pts_length_min)) {
      trophy = 1;
    }

  });
  return trophy;
}

export function currentTime() {
  const date = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  const currentDate = date.toLocaleDateString('th-TH', options);

  return currentDate;
}
export function currentTimeActivity(e) {
  const date = new Date(e);
  const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  const currentDate = date.toLocaleDateString('th-TH', options);

  return currentDate;
}
export function currentDate() {
  const date = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const currentDate = date.toLocaleDateString('th-TH', options);

  return currentDate;
}
export function currentDateActivity(e) {
  const date = new Date(e);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const currentDate = date.toLocaleDateString('th-TH', options);

  return currentDate;
}

