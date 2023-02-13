const Ovulation = require("../model/user");

exports.calculateOvulation = async (req, res) => {
  try {
    const { cycleLength, lastPeriod, email } = req.body;
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };


    // Calculate the ovulation date
    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(ovulationDate.getDate() + (cycleLength - 14));

    // Calculate the fertile window start and end dates
    const fertileWindowStart = new Date(lastPeriod);
    fertileWindowStart.setDate(fertileWindowStart.getDate() + (cycleLength - 17));
    const fertileWindowEnd = new Date(lastPeriod);
    fertileWindowEnd.setDate(fertileWindowEnd.getDate() + (cycleLength - 10));

    // Calculate the next period date
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    // Calculate the pregnancy day
    const pregnancyDay = new Date(ovulationDate);
    pregnancyDay.setDate(pregnancyDay.getDate() + 14);

    // Create a new Ovulation instance and save it to the database
    const newOvulation = new Ovulation({
      cycleLength,
      lastPeriod,
      ovulationDate,
      email
    });
    await newOvulation.save();

    // Format the dates to the desired format
    const ovulationDateFormatted = ovulationDate.toLocaleDateString('en-US', options);
    const fertileWindowStartFormatted = fertileWindowStart.toLocaleDateString('en-US', options);
    const fertileWindowEndFormatted = fertileWindowEnd.toLocaleDateString('en-US', options);
    const nextPeriodFormatted = nextPeriod.toLocaleDateString('en-US', options);

    // Return the result in a JSON response
    res.status(200).json({
      message: "Ovulation data calculated successfully",
      ovulationDate: ovulationDateFormatted,
      fertileWindowStart: fertileWindowStartFormatted,
      fertileWindowEnd: fertileWindowEndFormatted
      
    });
  } catch (error) {
res.status(500).json({
      message: "Internal server error",
      error
    });
  }
};
