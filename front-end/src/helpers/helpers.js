function convertDateFormat(inputDate) {
  // Create a Date object from the input string
  const dateObj = new Date(inputDate);

  // Extract year, month, and day from the Date object
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Construct the new date format
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

module.exports = {
  convertDateFormat,
};
