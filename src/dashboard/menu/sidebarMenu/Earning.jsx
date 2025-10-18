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
      className={`p-4 rounded-lg flex justify-between items-center ${highlight ? "bg-pink-50" : "bg-white"
        }`}
      style={{ minWidth: isTotal ? "18rem" : "14rem" }}
    >
      <div>
        <p className="text-sm text-gray-500">
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
        <p className="text-sm text-gray-500 mb-1">Earn</p>
        <p className={`font-bold text-4xl ${isTotal ? "text-xl" : ""}`}>
          ${amount}
        </p>
      </div>
    </div>
  );
};

const EarningsDashboard = () => {
  return (
    <div className=" mx-auto grid grid-cols-3 gap-4">
      {earningsData.map((item, index) => (
        <div className=' py-4 bg-[#F7F7F7] rounded-lg'>
          <EarningsCard key={index} {...item} />
        </div>
      ))}
    </div>
  );
};

export default EarningsDashboard;
