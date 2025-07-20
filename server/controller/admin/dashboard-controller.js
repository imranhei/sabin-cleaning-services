import Quote from "../../model/Quote.js";
import dayjs from "dayjs";

export const getDashboardData = async (req, res) => {
  try {
    const todayStart = dayjs().startOf("day").toDate();
    const todayEnd = dayjs().endOf("day").toDate();

    // 1. Count totals
    const totalMail = await Quote.countDocuments();
    const accepted = await Quote.countDocuments({
    //   isDeleted: false,
      status: "accepted",
    });
    const rejected = await Quote.countDocuments({
    //   isDeleted: false,
      status: "rejected",
    });
    const pending = await Quote.countDocuments({
    //   isDeleted: false,
      status: "pending",
    });
    const unseen = await Quote.countDocuments({
      isDeleted: false,
      isRead: false,
    });

    // 2. Today's inbox
    const todayInbox = await Quote.find({
      createdAt: { $gte: todayStart, $lte: todayEnd },
      isDeleted: false,
    }).sort({ createdAt: -1 });

    // 3. Chart Data: status count per month
    const yearStart = dayjs().startOf("year").toDate();

    const chartRaw = await Quote.aggregate([
      {
        $match: {
          createdAt: { $gte: yearStart },
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            status: "$status",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    // 4. Format chartData
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const chartMap = {};

    chartRaw.forEach(({ _id, count }) => {
      const monthName = months[_id.month - 1];
      if (!chartMap[monthName]) {
        chartMap[monthName] = {
          month: monthName,
          accepted: 0,
          rejected: 0,
          pending: 0,
        };
      }
      chartMap[monthName][_id.status] = count;
    });

    const chartData = Object.values(chartMap).sort(
      (a, b) => months.indexOf(a.month) - months.indexOf(b.month)
    );

    // 5. Send response
    res.json({
      totalMail,
      accepted,
      rejected,
      pending,
      unseen,
      chartData,
      todayInbox,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
