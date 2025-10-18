import React from 'react';

const earningsData = [
  {
    title: "Today earning",
    count: 1,
    amount: 190,
    highlight: true,
  },
  {
    title: "Last week earning",
    count: 3,
    dateRange: "1 Jan - 6 Jan",
    amount: 100,
  },
  {
    title: "This month earning",
    count: 7,
    month: "January",
    amount: 105,
  },
  {
    title: "Previous month earning",
    count: 10,
    month: "February",
    amount: 113,
  },
  {
    title: "Total earning",
    count: 110,
    amount: 2500,
    isTotal: true,
  },
];

const EarningsCard = ({ title, count, dateRange, month, amount, highlight, isTotal }) => {
  return (
    <div
      className={`md:py-10 p-5 font-[arial] rounded-lg text-primaryBg  flex justify-between items-center ${highlight ? "bg-pink-50" : "bg-white"
        }`}
      style={{ minWidth: isTotal ? "18rem" : "14rem" }}
    >
      <div>
        <p className="text-sm text-gray-500 font-medium">
          {title}
        </p>
        <p className="font-semibold text-2xl">
          {count}
        </p>
        {(dateRange || month) && (
          <p className="text-xs text-gray-400 mt-1">
            {dateRange || month}
          </p>
        )}
      </div>
      <div className="text-right">
        <p className=" text-gray-500 mb-1 text-xl font-semibold">Earn</p>
        <p className={`font-bold text-5xl ${isTotal ? "text-xl" : ""}`}>
          ${amount}
        </p>
      </div>
    </div>
  );
};

const EarningsDashboard = () => {
  return (
    <div className=" mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {earningsData.map((item, index) => (
        <div className=' py-4 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] rounded-lg'>
          <EarningsCard key={index} {...item} />
        </div>
      ))}
    </div>
  );
};

export default EarningsDashboard;
