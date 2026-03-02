"use client";
import React, { useState } from "react";

export default function TransportFeesMaster() {
  const [copyFirstMonth, setCopyFirstMonth] = useState(false);

  const monthsData = [
    { month: "April", dueDate: "04/05/2025", fineType: "None", feeType: "Percentage", feeValue: "10.00", fixAmount: "" },
    { month: "May", dueDate: "05/05/2025", fineType: "None", feeType: "FixAmount", feeValue: "", fixAmount: "50.00" },
    { month: "June", dueDate: "06/05/2025", fineType: "None", feeType: "FixAmount", feeValue: "", fixAmount: "50.00" },
    { month: "July", dueDate: "07/05/2025", fineType: "None", feeType: "Percentage", feeValue: "20.00", fixAmount: "" },
    { month: "August", dueDate: "08/05/2025", fineType: "None", feeType: "Percentage", feeValue: "10.00", fixAmount: "" },
    { month: "September", dueDate: "09/05/2025", fineType: "None", feeType: "Percentage", feeValue: "15.00", fixAmount: "" },
    { month: "October", dueDate: "10/05/2025", fineType: "None", feeType: "FixAmount", feeValue: "", fixAmount: "50.00" },
    { month: "November", dueDate: "11/05/2025", fineType: "None", feeType: "FixAmount", feeValue: "", fixAmount: "20.00" },
  ];

  return (
    <>
      <div className="2xl:flex 2xl:space-x-12">
        <section className="2xl:flex-1 2xl:mb-0 mb-6">
          {/* Transport Fees Master */}
          <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
            <div className="flex flex-col space-y-5">
              <div className="flex items-center justify-between mb-0">
                <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Transport Fees Master</h3>
              </div>

              {/* Copy First Fees Checkbox */}
              <div className="flex items-center space-x-3 py-4 border-b border-bgray-300 dark:border-darkblack-400">
                <input
                  type="checkbox"
                  id="copyFirstMonth"
                  checked={copyFirstMonth}
                  onChange={(e) => setCopyFirstMonth(e.target.checked)}
                  className="w-4 h-4 text-success-300 bg-bgray-100 border-bgray-300 rounded focus:ring-success-300 dark:bg-darkblack-500 dark:border-darkblack-400"
                />
                <label
                  htmlFor="copyFirstMonth"
                  className="text-base font-medium text-bgray-900 dark:text-white cursor-pointer"
                >
                  Copy First Fees Detail For All Months
                </label>
              </div>

              {/* Table */}
              <div className="table-content w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                      <td className="py-5 px-6 xl:px-0 min-w-[120px]">
                        <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Month</span>
                      </td>
                      <td className="py-5 px-6 xl:px-0 min-w-[150px]">
                        <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Due Date</span>
                      </td>
                      <td className="py-5 px-6 xl:px-0 min-w-[150px]">
                        <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Fine Type</span>
                      </td>
                      <td className="py-5 px-6 xl:px-0 min-w-[180px]" colSpan={2}>
                        <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">Fee Type</span>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {monthsData.map((data, index) => (
                      <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                        <td className="py-5 px-6 xl:px-0">
                          <p className="font-semibold text-base text-bgray-900 dark:text-bgray-50">{data.month}</p>
                        </td>
                        <td className="py-5 px-6 xl:px-0">
                          <div className="w-full">
                            <input
                              type="text"
                              value={data.dueDate}
                              readOnly
                              className="w-full h-12 px-4 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:border-success-300"
                            />
                          </div>
                        </td>
                        <td className="py-5 px-6 xl:px-0">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`fineType-${index}`}
                              checked={data.fineType === "None"}
                              readOnly
                              className="w-4 h-4 text-success-300 bg-bgray-100 border-bgray-300 focus:ring-success-300 dark:bg-darkblack-500 dark:border-darkblack-400"
                            />
                            <span className="text-sm font-medium text-bgray-900 dark:text-white">None</span>
                          </div>
                        </td>
                        <td className="py-5 px-6 xl:px-0">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`feeType-${index}`}
                                checked={data.feeType === "Percentage"}
                                readOnly
                                className="w-4 h-4 text-success-300 bg-bgray-100 border-bgray-300 focus:ring-success-300 dark:bg-darkblack-500 dark:border-darkblack-400"
                              />
                              <span className="text-sm font-medium text-bgray-900 dark:text-white">Percentage (%)</span>
                            </div>
                            {data.feeType === "Percentage" && (
                              <input
                                type="text"
                                value={data.feeValue}
                                readOnly
                                className="w-24 h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:border-success-300"
                              />
                            )}
                          </div>
                        </td>
                        <td className="py-5 px-6 xl:px-0">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`feeType-${index}`}
                                checked={data.feeType === "FixAmount"}
                                readOnly
                                className="w-4 h-4 text-success-300 bg-bgray-100 border-bgray-300 focus:ring-success-300 dark:bg-darkblack-500 dark:border-darkblack-400"
                              />
                              <span className="text-sm font-medium text-bgray-900 dark:text-white">Fix Amount ($)</span>
                            </div>
                            {data.feeType === "FixAmount" && (
                              <input
                                type="text"
                                value={data.fixAmount}
                                readOnly
                                className="w-24 h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-500 text-sm text-bgray-900 dark:text-white focus:outline-none focus:border-success-300"
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}