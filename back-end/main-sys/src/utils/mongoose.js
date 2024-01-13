module.exports = {
  mutipleMongooseToObject: (mongooses) => {
    return mongooses.map((mongoose) => mongoose.toObject());
  },
  mongooseToObject: (mongoose) => {
    return mongoose ? mongoose.toObject() : mongoose;
  },
  roundNumber(num, decimalPlaces = 0) {
    let p = Math.pow(10, decimalPlaces);
    return Math.round(num * p) / p;
  },
  formatDate(date) {
    const formattedTime = date.toLocaleTimeString("en-US", { hour12: false });
    const day = (date.getDate() + 1).toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const formattedResult = `${formattedTime} ${day}/${month}/${year}`;
    return formattedResult;
  },
};
