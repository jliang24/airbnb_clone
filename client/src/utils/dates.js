export const removeUnavailableDates = (includedDates, unavailableDates) => {
  if (!includedDates) return;
  return includedDates.filter(includedDate => {
    if (
      unavailableDates.some(
        unavailableDate => includedDate.getTime() === unavailableDate.getTime()
      )
    ) {
      return false;
    }
    return true;
  });
};

export const formatDate = date => {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return month + '/' + day + '/' + year;
};
