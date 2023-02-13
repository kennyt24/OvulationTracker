const mongoose = require("mongoose");

const ovulationSchema = new mongoose.Schema({
  cycleLength: {
    type: Number,
    required: true,
    min: 22,
    max: 30
  },
  lastPeriod: {
    type: Date,
    required: true
  },
  ovulationDate: {
    type: Date,
    required: false
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  }
});

const Ovulation = mongoose.model("Ovulation", ovulationSchema);

module.exports = Ovulation;