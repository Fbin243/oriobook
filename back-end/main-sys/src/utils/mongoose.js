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
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    const result = `${formattedTime} ${formattedDate}`;
    return result;
  },
};
