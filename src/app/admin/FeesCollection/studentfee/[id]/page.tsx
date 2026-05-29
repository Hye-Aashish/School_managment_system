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
                <h2 className="text-2xl font-bold text-foreground">
                    Collect Fees: {student?.fname} {student?.lname}
                </h2>
                <div className="text-sm text-foreground">
                    Admission No: <span className="font-bold">{student?.admission_no}</span> |
                    Class: <span className="font-bold">{student?.class} ({student?.section})</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                            <th className="py-4 px-2 text-foreground">Fees Group</th>
                            <th className="py-4 px-2 text-foreground">Fees Type</th>
                            <th className="py-4 px-2 text-foreground">Due Date</th>
                            <th className="py-4 px-2 text-foreground text-right">Amount (₹)</th>
                            <th className="py-4 px-2 text-foreground text-right">Paid (₹)</th>
                            <th className="py-4 px-2 text-foreground text-right">Balance (₹)</th>
                            <th className="py-4 px-2 text-foreground">Action</th>
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

            {/* Premium Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 md:p-10 font-inter">
                    <div className="bg-white dark:bg-darkblack-600 rounded-2xl w-full max-w-[700px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100 dark:border-darkblack-400 transform scale-100 transition-all duration-300">
                        {/* Header */}
                        <div className="flex-shrink-0 bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-900 dark:to-violet-900 p-5 flex justify-between items-center">
                            <div>
                                <h3 className="text-white text-lg font-bold truncate pr-4">
                                    Collect Fees: {student?.fname} {student?.lname}
                                </h3>
                                <p className="text-xs text-indigo-100 mt-0.5">
                                    Admission No: {student?.admission_no} | Class: {student?.class} ({student?.section})
                                </p>
                            </div>
                            <button 
                                onClick={() => setShowPaymentModal(false)} 
                                className="text-indigo-100 hover:text-white transition-colors bg-white/10 p-1.5 rounded-lg"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="flex-grow p-6 space-y-5 overflow-y-auto">
                            {/* Info Cards Row */}
                            <div className="grid grid-cols-3 gap-4 bg-bgray-50 dark:bg-darkblack-500/50 p-4 rounded-xl">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fee Type</span>
                                    <span className="text-sm font-semibold text-foreground truncate mt-1">{selectedMaster?.fee_type?.name || selectedMaster?.fee_group?.name}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Amount</span>
                                    <span className="text-sm font-semibold text-foreground mt-1">₹{(selectedMaster?.amount || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Balance</span>
                                    <span className="text-sm font-semibold text-red-500 mt-1">₹{(selectedMaster?.amount - getMasterStatus(selectedMaster?._id) || 0).toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Inputs Row 1: Date & Paying Amount */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Date <span className="text-red-500">*</span></label>
                                    <input
                                        type="date"
                                        value={paymentDate}
                                        onChange={(e) => setPaymentDate(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-darkblack-400 rounded-xl bg-white dark:bg-darkblack-500 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none dark:text-white"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Paying Amount (₹) <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        value={payingAmount}
                                        onChange={(e) => setPayingAmount(Number(e.target.value))}
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-darkblack-400 rounded-xl bg-white dark:bg-darkblack-500 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Discount Group Selection */}
                            <div className="flex flex-col space-y-2 border border-gray-100 dark:border-darkblack-400 p-4 rounded-xl bg-bgray-50/50 dark:bg-darkblack-500/10">
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Apply Discount Group</label>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                        <span className="w-1/2">Discount Name</span>
                                        <span className="w-1/4 text-center">Available Count</span>
                                        <span className="w-1/4 text-right">Value</span>
                                    </div>
                                    <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                                        {(data?.discounts || []).map((disc: any) => (
                                            <label key={disc._id} className="flex items-center justify-between p-2 rounded-lg hover:bg-bgray-100 dark:hover:bg-darkblack-500 cursor-pointer transition-colors">
                                                <div className="flex items-center space-x-3 w-1/2">
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500/20 border-gray-300 dark:border-darkblack-400"
                                                        checked={selectedDiscounts.includes(disc._id)}
                                                        onChange={() => handleDiscountToggle(disc)}
                                                    />
                                                    <span className="text-sm font-medium text-foreground">{disc.name} <span className="text-xs text-gray-400">({disc.discount_code})</span></span>
                                                </div>
                                                <span className="w-1/4 text-center text-sm text-foreground">{disc.use_count}</span>
                                                <span className="w-1/4 text-right text-sm font-bold text-success-300">
                                                    {disc.type === "percentage" ? `${disc.percentage}%` : `₹${disc.amount}`}
                                                </span>
                                            </label>
                                        ))}
                                        {(!data?.discounts || data.discounts.length === 0) && (
                                            <p className="text-xs text-gray-400 italic text-center py-2">No discounts available</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Inputs Row 2: Discount & Fine */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Discount (₹) <span className="text-red-500">*</span></label>
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
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-darkblack-400 rounded-xl bg-white dark:bg-darkblack-500 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none dark:text-white"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Fine (₹) <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        value={fineAmount}
                                        onChange={(e) => handleFineChange(Number(e.target.value))}
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-darkblack-400 rounded-xl bg-white dark:bg-darkblack-500 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Payment Mode */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Payment Mode</label>
                                <div className="flex flex-wrap gap-2.5">
                                    {["Cash", "Cheque", "DD", "Bank Transfer", "UPI", "Card"].map((mode) => {
                                        const isSelected = paymentMode === mode;
                                        return (
                                            <label key={mode} className={`flex items-center px-4 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition-all duration-200 ${
                                                isSelected 
                                                    ? "bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-950/30 dark:border-indigo-500 dark:text-indigo-400"
                                                    : "bg-white border-gray-200 text-gray-600 dark:bg-darkblack-500 dark:border-darkblack-400 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-darkblack-400"
                                            }`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMode"
                                                    value={mode}
                                                    checked={isSelected}
                                                    onChange={(e) => setPaymentMode(e.target.value)}
                                                    className="hidden"
                                                />
                                                <span>{mode}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Note */}
                            <div className="flex flex-col space-y-1">
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Note</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    rows={2}
                                    placeholder="Add any transaction details or comments..."
                                    className="w-full p-3.5 border border-gray-200 dark:border-darkblack-400 rounded-xl bg-white dark:bg-darkblack-500 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none dark:text-white resize-none"
                                />
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex-shrink-0 p-5 border-t border-gray-100 dark:border-darkblack-400 flex justify-between items-center bg-gray-50 dark:bg-darkblack-600/50">
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-darkblack-500 border border-gray-200 dark:border-darkblack-400 rounded-xl hover:bg-gray-50 dark:hover:bg-darkblack-400 transition-colors shadow-sm"
                            >
                                Cancel
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleCollectPayment(false)}
                                    className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all rounded-xl shadow-md shadow-indigo-600/10 active:scale-95"
                                >
                                    $ Collect Fees
                                </button>
                                <button
                                    onClick={() => handleCollectPayment(true)}
                                    className="px-5 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-all rounded-xl shadow-md shadow-violet-600/10 active:scale-95"
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
