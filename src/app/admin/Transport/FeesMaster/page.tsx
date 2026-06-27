"use client";
import React, { useState, useEffect } from "react";

export default function TransportFeesMaster() {
  const [copyFirstMonth, setCopyFirstMonth] = useState(false);
  const [monthsData, setMonthsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/transport/fees-master");
      const data = await res.json();
      if (data.success && data.data && data.data.monthsData) {
        setMonthsData(data.data.monthsData);
      }
    } catch (error) {
      console.error("Failed to fetch fees master", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newData = [...monthsData];
    newData[index][field] = value;
    
    // Auto-clear unrelated fields based on feeType change
    if (field === "feeType") {
      if (value === "Percentage") {
        newData[index].fixAmount = "";
      } else if (value === "FixAmount") {
        newData[index].feeValue = "";
      }
    }
    
    setMonthsData(newData);
  };

  const handleCopyFirstMonth = (checked: boolean) => {
    setCopyFirstMonth(checked);
    if (checked && monthsData.length > 0) {
      const firstMonth = monthsData[0];
      const newData = monthsData.map((data, index) => {
        if (index === 0) return data;
        return {
          ...data,
          dueDate: firstMonth.dueDate,
          fineType: firstMonth.fineType,
          feeType: firstMonth.feeType,
          feeValue: firstMonth.feeValue,
          fixAmount: firstMonth.fixAmount,
        };
      });
      setMonthsData(newData);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/transport/fees-master", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ monthsData }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Configuration saved successfully!");
      } else {
        alert(data.error || "Failed to save configuration");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving configuration");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="2xl:flex 2xl:space-x-12">
        <section className="2xl:flex-1 2xl:mb-0 mb-6">
          <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
            <div className="flex flex-col space-y-5">
              <div className="flex items-center justify-between mb-0 border-b border-bgray-300 dark:border-darkblack-400 pb-4">
                <h3 className="text-xl font-bold text-bgray-900 dark:text-white">Transport Fees Master Configuration</h3>
                <button
                  onClick={handleSave}
                  disabled={loading || saving}
                  className="px-6 py-2.5 bg-success-300 text-white font-bold rounded-lg hover:bg-success-400 transition-all disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Configuration"}
                </button>
              </div>

              {/* Copy First Fees Checkbox */}
              <div className="flex items-center space-x-3 py-2">
                <input
                  type="checkbox"
                  id="copyFirstMonth"
                  checked={copyFirstMonth}
                  onChange={(e) => handleCopyFirstMonth(e.target.checked)}
                  className="w-4 h-4 text-success-300 bg-bgray-100 border-bgray-300 rounded focus:ring-success-300 dark:bg-darkblack-500 dark:border-darkblack-400"
                />
                <label
                  htmlFor="copyFirstMonth"
                  className="text-base font-medium text-bgray-900 dark:text-white cursor-pointer"
                >
                  Copy First Month's Fees Detail To All Months
                </label>
              </div>

              {/* Table */}
              <div className="table-content w-full overflow-x-auto min-h-[500px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                      <td className="py-5 px-6 xl:px-0 min-w-[120px]">
                        <span className="text-base font-bold text-bgray-600 dark:text-white">Month</span>
                      </td>
                      <td className="py-5 px-6 xl:px-0 min-w-[180px]">
                        <span className="text-base font-bold text-bgray-600 dark:text-white">Due Date</span>
                      </td>
                      <td className="py-5 px-6 xl:px-0 min-w-[150px]">
                        <span className="text-base font-bold text-bgray-600 dark:text-white">Fine Type</span>
                      </td>
                      <td className="py-5 px-6 xl:px-0 min-w-[180px]" colSpan={2}>
                        <span className="text-base font-bold text-bgray-600 dark:text-white">Fee Type & Value</span>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                       <tr>
                          <td colSpan={5} className="py-16 text-center">
                              <div className="w-8 h-8 border-4 border-success-300 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          </td>
                       </tr>
                    ) : (
                      monthsData.map((data, index) => (
                        <tr key={index} className="border-b border-bgray-100 dark:border-darkblack-400 hover:bg-bgray-50 dark:hover:bg-darkblack-500 transition-colors">
                          <td className="py-4 px-6 xl:px-0">
                            <p className="font-bold text-base text-bgray-900 dark:text-white">{data.month}</p>
                          </td>
                          <td className="py-4 px-6 xl:px-0">
                            <div className="w-full">
                              <input
                                type="date"
                                value={data.dueDate}
                                onChange={(e) => handleChange(index, "dueDate", e.target.value)}
                                className="w-[160px] h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-600 text-sm font-semibold text-bgray-900 dark:text-white focus:outline-none focus:border-success-300 focus:ring-1 focus:ring-success-300"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-6 xl:px-0">
                            <select
                              value={data.fineType}
                              onChange={(e) => handleChange(index, "fineType", e.target.value)}
                              className="h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-600 text-sm font-semibold text-bgray-900 dark:text-white focus:outline-none focus:border-success-300 focus:ring-1 focus:ring-success-300"
                            >
                              <option value="None">None</option>
                              <option value="Percentage">Percentage</option>
                              <option value="FixAmount">Fix Amount</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 xl:px-0">
                            <div className="flex items-center space-x-4">
                              {/* Percentage Option */}
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name={`feeType-${index}`}
                                  checked={data.feeType === "Percentage"}
                                  onChange={() => handleChange(index, "feeType", "Percentage")}
                                  className="w-4 h-4 text-success-300 bg-bgray-100 border-bgray-300 focus:ring-success-300 dark:bg-darkblack-500 dark:border-darkblack-400 cursor-pointer"
                                />
                                <span className="text-sm font-semibold text-bgray-900 dark:text-white cursor-pointer" onClick={() => handleChange(index, "feeType", "Percentage")}>
                                  Percentage (%)
                                </span>
                              </div>
                              {data.feeType === "Percentage" && (
                                <input
                                  type="number"
                                  placeholder="%"
                                  value={data.feeValue}
                                  onChange={(e) => handleChange(index, "feeValue", e.target.value)}
                                  className="w-20 h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-600 text-sm font-bold text-bgray-900 dark:text-white focus:outline-none focus:border-success-300 focus:ring-1 focus:ring-success-300"
                                />
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 xl:px-0">
                            <div className="flex items-center space-x-4">
                              {/* FixAmount Option */}
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name={`feeType-${index}`}
                                  checked={data.feeType === "FixAmount"}
                                  onChange={() => handleChange(index, "feeType", "FixAmount")}
                                  className="w-4 h-4 text-success-300 bg-bgray-100 border-bgray-300 focus:ring-success-300 dark:bg-darkblack-500 dark:border-darkblack-400 cursor-pointer"
                                />
                                <span className="text-sm font-semibold text-bgray-900 dark:text-white cursor-pointer" onClick={() => handleChange(index, "feeType", "FixAmount")}>
                                  Fix Amount ($)
                                </span>
                              </div>
                              {data.feeType === "FixAmount" && (
                                <input
                                  type="number"
                                  placeholder="$"
                                  value={data.fixAmount}
                                  onChange={(e) => handleChange(index, "fixAmount", e.target.value)}
                                  className="w-24 h-10 px-3 rounded-lg border border-bgray-300 dark:border-darkblack-400 bg-white dark:bg-darkblack-600 text-sm font-bold text-bgray-900 dark:text-white focus:outline-none focus:border-success-300 focus:ring-1 focus:ring-success-300"
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
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