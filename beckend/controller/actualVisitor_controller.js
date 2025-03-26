import Visitor from "../model/actualVisitor.js";

// Function to track a new visitor
export const trackVisitor = async (req, res) => {
  try {
    const visitorIP = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    await Visitor.create({ ip: visitorIP });
    res.status(200).json({ message: "Visitor tracked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error tracking visitor", error: error.message });
  }
};

// Function to get total visitor count
export const getTotalVisitors = async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    res.status(200).json({ totalVisitors });
  } catch (error) {
    res.status(500).json({ message: "Error fetching visitor count", error: error.message });
  }
};


// Get Weekly Data
export const getWeeklyVisitors = async (req, res) => {
  try {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const weeklyData = await Visitor.aggregate([
      { $match: { visitDate: { $gte: startOfWeek } } },
      {
        $group: {
          _id: { $dayOfWeek: "$visitDate" },
          count: { $sum: 1 },
        },
      },
    ]);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const data = Array(7).fill(0);
    weeklyData.forEach((item) => {
      data[item._id - 1] = item.count;
    });

    res.status(200).json({ labels: days, values: data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching weekly visitors", error: error.message });
  }
};

// Get Monthly Data
export const getMonthlyVisitors = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);

    const monthlyData = await Visitor.aggregate([
      { $match: { visitDate: { $gte: startOfMonth } } },
      {
        $group: {
          _id: { $week: "$visitDate" },
          count: { $sum: 1 },
        },
      },
    ]);

    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
    const data = Array(4).fill(0);
    monthlyData.forEach((item, index) => {
      data[index] = item.count;
    });

    res.status(200).json({ labels: weeks, values: data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly visitors", error: error.message });
  }
};

// Get Yearly Data
export const getYearlyVisitors = async (req, res) => {
  try {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);

    const yearlyData = await Visitor.aggregate([
      { $match: { visitDate: { $gte: startOfYear } } },
      {
        $group: {
          _id: { $month: "$visitDate" },
          count: { $sum: 1 },
        },
      },
    ]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = Array(12).fill(0);
    yearlyData.forEach((item) => {
      data[item._id - 1] = item.count;
    });

    res.status(200).json({ labels: months, values: data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching yearly visitors", error: error.message });
  }
};