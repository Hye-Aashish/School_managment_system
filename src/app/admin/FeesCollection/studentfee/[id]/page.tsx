"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function StudentFeeDetail() {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedMaster, setSelectedMaster] = useState<any>(null);
    const [payingAmount, setPayingAmount] = useState<number>(0);
    const [fineAmount, setFineAmount] = useState<number>(0);
    const [discountAmount, setDiscountAmount] = useState<number>(0);
    const [paymentMode, setPaymentMode] = useState("Cash");
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
    const [note, setNote] = useState("");
    const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/student-fees/${id}`);
            if (res.ok) {
                const result = await res.json();
                setData(result);
            } else {
                setError("Failed to fetch fee details");
            }
        } catch (err) {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchData();
    }, [id]);

    const handleCollectPayment = async (printAfter = false) => {
        if (!selectedMaster || payingAmount <= 0) return;

        try {
            const res = await fetch("/api/fees-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    student: id,
                    fee_master: selectedMaster._id,
                    amount_paid: payingAmount,
                    discount_amount: discountAmount,
                    fine_amount: fineAmount,
                    payment_mode: paymentMode,
                    date: paymentDate,
                    note: note,
                    discount: selectedDiscounts.length > 0 ? selectedDiscounts[0] : undefined // Simplification for now
                })
            });

            if (res.ok) {
                setShowPaymentModal(false);
                fetchData(); // Refresh data
                if (printAfter) {
                    alert("Payment recorded! Opening print dialog...");
                    // window.print(); // Or specific print logic
                } else {
                    alert("Payment recorded successfully!");
                }
            }
        } catch (err) {
            alert("Failed to record payment");
        }
    };

    const handleDiscountToggle = (discount: any) => {
        const isSelected = selectedDiscounts.includes(discount._id);
        let newSelected = [...selectedDiscounts];
        if (isSelected) {
            newSelected = newSelected.filter(id => id !== discount._id);
        } else {
            newSelected.push(discount._id);
        }
        setSelectedDiscounts(newSelected);

        // Calculate total discount
        let totalDisc = 0;
        const availableDiscounts = data?.discounts || [];
        newSelected.forEach(id => {
            const d = availableDiscounts.find((ad: any) => ad._id === id);
            if (d) {
                if (d.type === "percentage") {
                    totalDisc += (selectedMaster.amount * d.percentage) / 100;
                } else {
                    totalDisc += d.amount || 0;
                }
            }
        });
        setDiscountAmount(totalDisc);
        
        // Adjust paying amount
        const paid = getMasterStatus(selectedMaster._id);
        const balance = selectedMaster.amount - paid;
        setPayingAmount(Math.max(0, balance + fineAmount - totalDisc));
    };

    const handleFineChange = (val: number) => {
        setFineAmount(val);
        const paid = getMasterStatus(selectedMaster._id);
        const balance = selectedMaster.amount - paid;
        setPayingAmount(Math.max(0, balance + val - discountAmount));
    };

    if (loading) return <div className="p-10 text-center">Loading Fee Details...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    const student = data?.student;
    const masters = data?.masters || [];
    const payments = data?.payments || [];

    // Calculate Paid vs Remaining for each master
    const getMasterStatus = (masterId: string) => {
        const totalPaid = payments
            .filter((p: any) => p.fee_master === masterId)
            .reduce((sum: number, p: any) => sum + p.amount_paid, 0);
        return totalPaid;
    };

    return (
        <div className="p-6 bg-white dark:bg-darkblack-600 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-bgray-900 dark:text-white">
                    Collect Fees: {student?.fname} {student?.lname}
                </h2>
                <div className="text-sm text-bgray-600 dark:text-bgray-50">
                    Admission No: <span className="font-bold">{student?.admission_no}</span> |
                    Class: <span className="font-bold">{student?.class} ({student?.section})</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                            <th className="py-4 px-2 text-bgray-600 dark:text-bgray-50">Fees Group</th>
                            <th className="py-4 px-2 text-bgray-600 dark:text-bgray-50">Fees Type</th>
                            <th className="py-4 px-2 text-bgray-600 dark:text-bgray-50">Due Date</th>
                            <th className="py-4 px-2 text-bgray-600 dark:text-bgray-50 text-right">Amount (₹)</th>
                            <th className="py-4 px-2 text-bgray-600 dark:text-bgray-50 text-right">Paid (₹)</th>
                            <th className="py-4 px-2 text-bgray-600 dark:text-bgray-50 text-right">Balance (₹)</th>
                            <th className="py-4 px-2 text-bgray-600 dark:text-bgray-50">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {masters.map((master: any) => {
                            const paid = getMasterStatus(master._id);
                            const balance = master.amount - paid;
                            return (
                                <tr key={master._id} className="border-b border-bgray-300 dark:border-darkblack-400 hover:bg-bgray-50 dark:hover:bg-darkblack-500">
                                    <td className="py-4 px-2 font-medium">{master.fee_group?.name}</td>
                                    <td className="py-4 px-2">{master.fee_type?.name}</td>
                                    <td className="py-4 px-2">{master.due_date}</td>
                                    <td className="py-4 px-2 text-right">₹{master.amount.toFixed(2)}</td>
                                    <td className="py-4 px-2 text-right text-success-300">₹{paid.toFixed(2)}</td>
                                    <td className="py-4 px-2 text-right text-red-500 font-bold">₹{balance.toFixed(2)}</td>
                                    <td className="py-4 px-2">
                                        {balance > 0 ? (
                                            <button
                                                onClick={() => {
                                                    setSelectedMaster(master);
                                                    const paid = getMasterStatus(master._id);
                                                    const balance = master.amount - paid;
                                                    setPayingAmount(balance);
                                                    setFineAmount(0);
                                                    setDiscountAmount(0);
                                                    setSelectedDiscounts([]);
                                                    setShowPaymentModal(true);
                                                }}
                                                className="bg-success-300 text-white px-3 py-1 rounded text-sm hover:bg-success-400"
                                            >
                                                + Collect
                                            </button>
                                        ) : (
                                            <span className="text-success-300 text-sm font-bold">Paid</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Simple Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-inter">
                    <div className="bg-white dark:bg-darkblack-600 rounded-xl w-full max-w-[800px] overflow-hidden shadow-2xl">
                        {/* Header */}
                        <div className="bg-[#6366f1] p-4 flex justify-between items-center">
                            <h3 className="text-white text-lg font-medium truncate pr-4">
                                {student?.admission_no}-{student?.fname} ({student?.fname} {student?.lname} ({student?.admission_no}) - {selectedMaster?.fee_group?.name}): {student?.fname} {student?.lname} ({student?.admission_no}) - {selectedMaster?.fee_group?.name}
                            </h3>
                            <button onClick={() => setShowPaymentModal(false)} className="text-white hover:text-gray-200">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            {/* Fees Display */}
                            <div className="grid grid-cols-4 items-center">
                                <label className="text-gray-600 dark:text-gray-400 text-sm col-span-1">Fees ($)</label>
                                <div className="text-gray-900 dark:text-gray-100 font-medium col-span-3">{(selectedMaster?.amount || 0).toFixed(2)}</div>
                            </div>

                            {/* Date Field */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-gray-600 dark:text-gray-400 text-sm col-span-1">Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    value={paymentDate}
                                    onChange={(e) => setPaymentDate(e.target.value)}
                                    className="col-span-3 w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-darkblack-500 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>

                            {/* Paying Amount */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-gray-600 dark:text-gray-400 text-sm col-span-1">Paying Amount ($) <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    value={payingAmount}
                                    onChange={(e) => setPayingAmount(Number(e.target.value))}
                                    className="col-span-3 w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-darkblack-500 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>

                            {/* Discount Group */}
                            <div className="grid grid-cols-4 gap-4">
                                <label className="text-gray-600 dark:text-gray-400 text-sm col-span-1 pt-1">Discount Group</label>
                                <div className="col-span-3 space-y-4">
                                    <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                                        <span className="w-1/2">Fees Discount</span>
                                        <span className="w-1/4 text-center">Available Count</span>
                                        <span className="w-1/4 text-right">Value</span>
                                    </div>
                                    <div className="space-y-3">
                                        {(data?.discounts || []).map((disc: any) => (
                                            <div key={disc._id} className="flex items-center justify-between text-sm">
                                                <label className="flex items-center space-x-3 w-1/2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                                                        checked={selectedDiscounts.includes(disc._id)}
                                                        onChange={() => handleDiscountToggle(disc)}
                                                    />
                                                    <span className="text-gray-700 dark:text-gray-300">{disc.name} ({disc.discount_code})</span>
                                                </label>
                                                <span className="w-1/4 text-center text-gray-600 dark:text-gray-400">{disc.use_count}</span>
                                                <span className="w-1/4 text-right font-medium text-gray-900 dark:text-gray-100">
                                                    {disc.type === "percentage" ? `${disc.percentage}%` : `$${disc.amount}`}
                                                </span>
                                            </div>
                                        ))}
                                        {(!data?.discounts || data.discounts.length === 0) && (
                                            <p className="text-xs text-gray-400 italic">No discounts available</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Discount and Fine Row */}
                            <div className="grid grid-cols-4 gap-6">
                                <div className="col-span-2 flex items-center gap-4 pl-[25%]">
                                    <label className="text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">Discount ($) <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        value={discountAmount}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            setDiscountAmount(val);
                                            const paid = getMasterStatus(selectedMaster._id);
                                            const balance = selectedMaster.amount - paid;
                                            setPayingAmount(Math.max(0, balance + fineAmount - val));
                                        }}
                                        className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-darkblack-500 text-sm"
                                    />
                                </div>
                                <div className="col-span-2 flex items-center gap-4">
                                    <label className="text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">Fine ($) <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        value={fineAmount}
                                        onChange={(e) => handleFineChange(Number(e.target.value))}
                                        className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-darkblack-500 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Payment Mode */}
                            <div className="grid grid-cols-4 items-center">
                                <label className="text-gray-600 dark:text-gray-400 text-sm col-span-1">Payment Mode</label>
                                <div className="col-span-3 flex flex-wrap gap-6">
                                    {["Cash", "Cheque", "DD", "Bank Transfer", "UPI", "Card"].map((mode) => (
                                        <label key={mode} className="flex items-center space-x-2.5 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="paymentMode"
                                                value={mode}
                                                checked={paymentMode === mode}
                                                onChange={(e) => setPaymentMode(e.target.value)}
                                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{mode}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Note */}
                            <div className="grid grid-cols-4 gap-4">
                                <label className="text-gray-600 dark:text-gray-400 text-sm col-span-1 pt-2">Note</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    rows={3}
                                    className="col-span-3 w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-darkblack-500 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none resize-none"
                                />
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-transparent">
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="px-6 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                            >
                                Cancel
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleCollectPayment(false)}
                                    className="px-6 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                                >
                                    $ Collect Fees
                                </button>
                                <button
                                    onClick={() => handleCollectPayment(true)}
                                    className="px-6 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                                >
                                    $ Collect & Print
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
