import VueJwtDecode from "vue-jwt-decode";

export function convertDateFormat(inputDate) {
  const dateObj = new Date(inputDate);

  // Extract year, month, and day from the Date object
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Extract hours, minutes, and seconds from the Date object
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  // Construct the new date format
  const formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;

  return formattedDate;
}

export function scrollToTop(top = 0) {
  // Scroll to the top of the page
  window.scrollTo({
    top: top,
    behavior: "smooth", // You can use 'auto' instead of 'smooth' for instant scrolling
  });
}

export async function getTokenInfo() {
  const secretKey = process.env.VUE_APP_ACCESS_TOKEN_SECRET;
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  try {
    const verified = await VueJwtDecode.decode(token);
    const { payload = {} } = verified || {};
    return payload;
  } catch (err) {
    return null;
  }
}

export async function isAdmin() {
  const secretKey = process.env.VUE_APP_ACCESS_TOKEN_SECRET;
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const verified = await VueJwtDecode.decode(token);
    const { payload = {} } = verified || {};
    if (payload == null) {
      return false;
    } else {
      if (payload.isAdmin == true) {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    return false;
  }
}
