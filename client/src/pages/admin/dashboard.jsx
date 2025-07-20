import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "@/redux/admin/dashboard-slice";
import { Inbox, Loader } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, Legend, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { dummyChartData } from "@/config/constants";

const chartConfig = {
  accepted: {
    label: "Accepted",
    color: "#71fb81",
  },
  rejected: {
    label: "Rejected",
    color: "#fb7185",
  },
  pending: {
    label: "Pending",
    color: "#71b1fb",
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    totalMail,
    accepted,
    rejected,
    pending,
    unseen,
    chartData,
    todayInbox,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full min-h-[90vh]">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
        <div className="flex lg:flex-row sm:flex-col  items-center justify-center flex-1 gap-4 p-4 xl:p-6 border rounded shadow">
          <div className="flex flex-col">
            <span className="text-5xl text-violet-600 font-bold text-center">
              {totalMail}
            </span>
            <span className="text-gray-500 sm:text-base text-sm">
              Total Mails
            </span>
          </div>
          <div className="p-2 rounded bg-violet-200">
            <Inbox className="text-violet-600 size-12" />
          </div>
        </div>

        <div className="flex lg:flex-row sm:flex-col items-center justify-center flex-1 gap-4 p-4 xl:p-6 border rounded shadow">
          <div className="flex flex-col">
            <span className="text-5xl text-amber-500 font-bold text-center">
              {pending}
            </span>
            <span className="text-gray-500 sm:text-base text-sm">
              Pending Mails
            </span>
          </div>
          <div className="p-2 rounded bg-amber-200">
            <Inbox className="text-amber-500 size-12" />
          </div>
        </div>

        <div className="flex lg:flex-row sm:flex-col items-center justify-center flex-1 gap-4 p-4 xl:p-6 border rounded shadow">
          <div className="flex flex-col">
            <span className="text-5xl text-green-500 font-bold text-center">
              {accepted}
            </span>
            <span className="text-gray-500 sm:text-base text-sm">
              Accepted Mails
            </span>
          </div>
          <div className="p-2 rounded bg-green-200">
            <Inbox className="text-green-500 size-12" />
          </div>
        </div>

        <div className="flex lg:flex-row sm:flex-col items-center justify-center flex-1 gap-4 p-4 xl:p-6 border rounded shadow">
          <div className="flex flex-col">
            <span className="text-5xl text-rose-500 font-bold text-center">
              {rejected}
            </span>
            <span className="text-gray-500 sm:text-base text-sm">
              Rejected Mails
            </span>
          </div>
          <div className="p-2 rounded bg-rose-200">
            <Inbox className="text-rose-500 size-12" />
          </div>
        </div>
      </div>

      <div className="w-full h-fit overflow-hidden border rounded shadow p-4">
        <ChartContainer config={chartConfig} className="sm:h-80 h-40 w-full">
          <BarChart
            accessibilityLayer
            data={dummyChartData}
            margin={{
              top: 25,
              bottom: 8,
            }}
          >
            <CartesianGrid vertical={false} />
            <Legend />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="accepted" fill="#71fb81" radius={4}>
              <LabelList
                position="top"
                offset={6}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="rejected" fill="#fb7185" radius={4}>
              <LabelList
                position="top"
                offset={6}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="pending" fill="#71b1fb" radius={4}>
              <LabelList
                position="top"
                offset={6}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Dashboard;
