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
};