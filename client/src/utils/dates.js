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
