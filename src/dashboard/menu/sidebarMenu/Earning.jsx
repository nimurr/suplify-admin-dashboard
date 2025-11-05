import React from 'react';
import { useGetAllEarningsQuery } from '../../../redux/features/withdrawRequest/withdrawRequest';
import Transaction from '../../home/Transaction';




const EarningsDashboard = () => {

  const { data, isLoading } = useGetAllEarningsQuery();

  const fullData = data?.data?.attributes || {};

  return (
    <div className=" mx-auto">
      {
        isLoading ? <div className='grid xl:grid-cols-4 lg:grid-cols-2 gap-3 grid-cols-1'>
          {
            [...Array(10)].map((_, index) => (
              <div class="mx-auto w-full max-w-sm rounded-md border border-[#8400ff2a]  p-4">
                <div class="flex animate-pulse space-x-4">
                  <div class="size-10 rounded-full bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                    <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="col-span-2 h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                        <div class="col-span-1 h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                      </div>
                      <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                      <div class="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div> :
          <div className='grid xl:grid-cols-4 lg:grid-cols-2 gap-3 grid-cols-1'>

            <div className='border py-4 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl text-gray-600 font-semibold'>Total Earnings </h2>
                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
              </div>
              <div className='flex justify-end my-5 items-center '>
                <h1 className='text-right text-5xl '>${fullData?.totalEarnings}</h1>
              </div>
              <hr />
            </div>

            <div className='border py-4 bg-gradient-to-br from-[#0059ff8e] to-[#5fa8009f] text-primaryBg border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl text-gray-600 font-semibold'>Today  Earnings </h2>
                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
              </div>
              <div className='flex justify-between my-5 items-center '>
                <span className='text-xl font-semibold text-gray-400'>{fullData?.todayEarnings?.count}</span>
                <h1 className='text-right text-5xl '>${fullData?.todayEarnings?.amount}</h1>
              </div>
              <hr />
            </div>

            <div className='border py-4 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl text-gray-600 font-semibold'>Total Transactions </h2>
                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
              </div>
              <div className='flex justify-end my-5 items-center '>
                <h1 className='text-right text-5xl '>${fullData?.totalTransactions}</h1>
              </div>
              <hr />
            </div>

            <div className='border py-4 bg-gradient-to-br from-[#0059ff8e] to-[#5fa8009f] text-primaryBg border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.thisWeekEarnings?.label} </h2>
                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
              </div>
              <div className='flex justify-between my-5 items-center '>
                <span className='text-xl font-semibold text-gray-400'>{fullData?.thisWeekEarnings?.count}</span>
                <h1 className='text-right text-5xl '>${fullData?.thisWeekEarnings?.amount}</h1>
              </div>
              <hr />
            </div>

            <div className='border py-4 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.thisWeekEarnings?.label} </h2>
                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
              </div>
              <div className='flex justify-between my-5 items-center '>
                <span className='text-xl font-semibold text-gray-400'>{fullData?.thisWeekEarnings?.dateRange}</span>
                <h1 className='text-right text-5xl '>${fullData?.thisWeekEarnings?.amount}</h1>
              </div>
              <hr />
            </div>

            <div className='border py-4 bg-gradient-to-br from-[#0059ff8e] to-[#5fa8009f] text-primaryBg border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.thisMonthEarnings?.label} </h2>
                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
              </div>
              <div className='flex justify-between my-5 items-center '>
                <span className='text-xl font-semibold text-gray-400'>{fullData?.thisMonthEarnings?.month}</span>
                <h1 className='text-right text-5xl '>${fullData?.thisMonthEarnings?.amount}</h1>
              </div>
              <hr />
            </div>

            <div className='border py-4 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.lastWeekEarnings?.label} </h2>
                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
              </div>
              <div className='flex justify-between my-5 items-center '>
                <span className='text-xl font-semibold text-gray-400'>{fullData?.lastWeekEarnings?.dateRange}</span>
                <h1 className='text-right text-5xl '>${fullData?.lastWeekEarnings?.amount}</h1>
              </div>
              <hr />
            </div>

            <div className='border py-4 bg-gradient-to-br from-[#0059ff8e] to-[#5fa8009f] text-primaryBg border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.lastMonthEarnings?.label} </h2>
                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
              </div>
              <div className='flex justify-between my-5 items-center '>
                <span className='text-xl font-semibold text-gray-400'>{fullData?.lastMonthEarnings?.month}</span>
                <h1 className='text-right text-5xl '>${fullData?.lastMonthEarnings?.amount}</h1>
              </div>
              <hr />
            </div>

            <div className='border py-4 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.thisQuarterEarnings?.label} </h2>
                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
              </div>
              <div className='flex justify-between my-5 items-center '>
                <span className='text-xl font-semibold text-gray-400'>{fullData?.thisQuarterEarnings?.count}</span>
                <h1 className='text-right text-5xl '>${fullData?.thisQuarterEarnings?.amount}</h1>
              </div>
              <hr />
            </div>

            <div className='border py-4 bg-gradient-to-br from-[#0059ff8e] to-[#5fa8009f] text-primaryBg border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.thisYearEarnings?.label} </h2>
                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
              </div>
              <div className='flex justify-between my-5 items-center '>
                <span className='text-xl font-semibold text-gray-400'>{fullData?.thisYearEarnings?.count}</span>
                <h1 className='text-right text-5xl '>${fullData?.thisYearEarnings?.amount}</h1>
              </div>
              <hr />
            </div>


            {/* 
            <div className='border py-4 bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.pendingPayments?.label} </h2>
                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
              </div>
              <div className='flex justify-between my-5 items-center '>
                <span className='text-xl font-semibold text-gray-400'>{fullData?.pendingPayments?.count}</span>
                <h1 className='text-right text-5xl '>${fullData?.pendingPayments?.amount}</h1>
              </div>
              <hr />
            </div>

            <div className='border py-4 bg-gradient-to-br from-[#0059ff8e] to-[#5fa8009f] text-primaryBg border-gray-300 hover:bg-red-50 p-3 rounded-xl'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl text-gray-600 font-semibold'>{fullData?.processingPayments?.label} </h2>
                <h2 className='text-3xl text-gray-600 font-semibold '> Earn </h2>
              </div>
              <div className='flex justify-between my-5 items-center '>
                <span className='text-xl font-semibold text-gray-400'>{fullData?.processingPayments?.count}</span>
                <h1 className='text-right text-5xl '>${fullData?.processingPayments?.amount}</h1>
              </div>
              <hr />
            </div> */}

          </div>
      }
      <Transaction />
    </div>
  );
};

export default EarningsDashboard;
