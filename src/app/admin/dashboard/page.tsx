"use client";
import React, { useEffect } from "react";
import $ from "jquery";
import RevenueFlow from '../../graphs/RevenueFlow';
import TotalSpendingChart from '../../graphs/totalSpendingChart';
import UseTotalGoalChart from '../../graphs/useTotalGoalChart';
import RevenueFlowChart from '../../graphs/RevenueFlowChart';
import PieChart from '../../graphs/PieChart'

export default function DashboardPage() {
     useEffect(() => {
          // Require slick only in browser
          const slick = require("slick-carousel");
          $(".card-slider").slick({
               dots: true,
               infinite: true,
               autoplay: true,
               speed: 500,
               fade: true,
               cssEase: "linear",
               arrows: false,
          });
     }, []);
     return (
          <div className="2xl:flex 2xl:space-x-12">
               <section className="2xl:flex-1 2xl:mb-0 mb-6">
                    <div className="w-full mb-6">
                         <div className="grid lg:grid-cols-3 grid-cols-1 gap-[24px]">
                              <div className="p-5 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex justify-between items-center mb-5">
                                        <div className="flex space-x-[7px] items-center">
                                             <div className="icon">
                                                  <span>
                                                       <img src="/assets/images/icons/total-earn.svg"
                                                            alt="icon" />
                                                  </span>
                                             </div>
                                             <span
                                                  className="text-lg text-bgray-900 dark:text-white font-semibold">Fees Awaiting Payment</span>
                                        </div>
                                   </div>
                                   <div className="flex justify-between items-end">
                                        <div className="flex-1">
                                             <p
                                                  className="text-bgray-900 dark:text-white font-bold text-3xl leading-[48px]">
                                                  $7,245.00
                                             </p>
                                             <div className="flex items-center space-x-1">
                                                  <span>
                                                       <svg width="16" height="14" viewBox="0 0 16 14"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.4318 0.522827L12.4446 0.522827L8.55575 0.522827L7.56859 0.522827C6.28227 0.522827 5.48082 1.91818 6.12896 3.02928L9.06056 8.05489C9.7037 9.1574 11.2967 9.1574 11.9398 8.05489L14.8714 3.02928C15.5196 1.91818 14.7181 0.522828 13.4318 0.522827Z"
                                                                 fill="#0FCDE1" />
                                                            <path opacity="0.4"
                                                                 d="M2.16878 13.0485L3.15594 13.0485L7.04483 13.0485L8.03199 13.0485C9.31831 13.0485 10.1198 11.6531 9.47163 10.542L6.54002 5.5164C5.89689 4.41389 4.30389 4.41389 3.66076 5.5164L0.729153 10.542C0.0810147 11.6531 0.882466 13.0485 2.16878 13.0485Z"
                                                                 fill="#0FCDE1" />
                                                       </svg>
                                                  </span>
                                                  <span className="text-success-300 text-sm font-medium">
                                                       + 3.5%
                                                  </span>
                                                  <span
                                                       className="text-bgray-700 dark:text-bgray-50 text-sm font-medium">
                                                       from last week
                                                  </span>
                                             </div>
                                        </div>
                                        <div className="w-[106px]">
                                             <RevenueFlow />
                                        </div>
                                   </div>
                              </div>
                              <div className="p-5 rounded-lg bg-white  dark:bg-darkblack-600">
                                   <div className="flex justify-between items-center mb-5">
                                        <div className="flex space-x-[7px] items-center">
                                             <div className="icon">
                                                  <span>
                                                       <img src="/assets/images/icons/total-earn.svg"
                                                            alt="icon" />
                                                  </span>
                                             </div>
                                             <span
                                                  className="text-lg text-bgray-900 dark:text-white  font-semibold">Converted Leads</span>
                                        </div>
                                   </div>
                                   <div className="flex justify-between items-end">
                                        <div className="flex-1">
                                             <p
                                                  className="text-bgray-900 dark:text-white font-bold text-3xl leading-[48px]">
                                                  $7,245.00
                                             </p>
                                             <div className="flex items-center space-x-1">
                                                  <span>
                                                       <svg width="16" height="14" viewBox="0 0 16 14"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.4318 0.522827L12.4446 0.522827L8.55575 0.522827L7.56859 0.522827C6.28227 0.522827 5.48082 1.91818 6.12896 3.02928L9.06056 8.05489C9.7037 9.1574 11.2967 9.1574 11.9398 8.05489L14.8714 3.02928C15.5196 1.91818 14.7181 0.522828 13.4318 0.522827Z"
                                                                 fill="#0FCDE1" />
                                                            <path opacity="0.4"
                                                                 d="M2.16878 13.0485L3.15594 13.0485L7.04483 13.0485L8.03199 13.0485C9.31831 13.0485 10.1198 11.6531 9.47163 10.542L6.54002 5.5164C5.89689 4.41389 4.30389 4.41389 3.66076 5.5164L0.729153 10.542C0.0810147 11.6531 0.882466 13.0485 2.16878 13.0485Z"
                                                                 fill="#0FCDE1" />
                                                       </svg>
                                                  </span>
                                                  <span className="text-success-300 text-sm font-medium">
                                                       + 3.5%
                                                  </span>
                                                  <span
                                                       className="text-bgray-700 dark:text-bgray-50 text-sm font-medium">
                                                       from last week
                                                  </span>
                                             </div>
                                        </div>
                                        <div className="w-[106px]">
                                             <TotalSpendingChart />
                                        </div>
                                   </div>
                              </div>
                              <div className="p-5 rounded-lg bg-white dark:bg-darkblack-600">
                                   <div className="flex justify-between items-center mb-5">
                                        <div className="flex space-x-[7px] items-center">
                                             <div className="icon">
                                                  <span>
                                                       <img src="/assets/images/icons/total-earn.svg"
                                                            alt="icon" />
                                                  </span>
                                             </div>
                                             <span
                                                  className="text-lg text-bgray-900 dark:text-white font-semibold">Staff Present Today</span>
                                        </div>
                                   </div>
                                   <div className="flex justify-between items-end">
                                        <div className="flex-1">
                                             <p
                                                  className="text-bgray-900 dark:text-white font-bold text-3xl leading-[48px]">
                                                  $7,245.00
                                             </p>
                                             <div className="flex items-center space-x-1">
                                                  <span>
                                                       <svg width="16" height="14" viewBox="0 0 16 14"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.4318 0.522827L12.4446 0.522827L8.55575 0.522827L7.56859 0.522827C6.28227 0.522827 5.48082 1.91818 6.12896 3.02928L9.06056 8.05489C9.7037 9.1574 11.2967 9.1574 11.9398 8.05489L14.8714 3.02928C15.5196 1.91818 14.7181 0.522828 13.4318 0.522827Z"
                                                                 fill="#0FCDE1" />
                                                            <path opacity="0.4"
                                                                 d="M2.16878 13.0485L3.15594 13.0485L7.04483 13.0485L8.03199 13.0485C9.31831 13.0485 10.1198 11.6531 9.47163 10.542L6.54002 5.5164C5.89689 4.41389 4.30389 4.41389 3.66076 5.5164L0.729153 10.542C0.0810147 11.6531 0.882466 13.0485 2.16878 13.0485Z"
                                                                 fill="#0FCDE1" />
                                                       </svg>
                                                  </span>
                                                  <span className="text-success-300 text-sm font-medium">
                                                       + 3.5%
                                                  </span>
                                                  <span
                                                       className="text-bgray-700 dark:text-bgray-50 text-sm font-medium">
                                                       from last week
                                                  </span>
                                             </div>
                                        </div>
                                        <div className="w-[106px]">
                                             <UseTotalGoalChart />
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="w-full mb-6 xl:flex xl:space-x-6">
                         <div
                              className="xl:w-66 w-full bg-white dark:bg-darkblack-600 flex flex-col justify-between rounded-lg px-[24px] py-3">
                              <div
                                   className="flex justify-between items-center pb-2 mb-2 border-b border-bgray-300 dark:border-darkblack-400">
                                   <h3
                                        className="text-bgray-900 text-nowrap dark:text-white sm:text-2xl text-xl font-bold">
                                        Revenue Flow
                                   </h3>
                                   <div className="sm:flex hidden space-x-1 items-center">
                                        <div className="flex space-x-2 items-center">
                                             <div className="w-3 h-3 bg-warning-300 rounded-full"></div>
                                             <span
                                                  className="text-bgray-700 dark:text-bgray-50 text-sm font-medium">Pending
                                             </span>
                                        </div>
                                        <div className="flex space-x-2 items-center">
                                             <div className="w-3 h-3 bg-success-300 rounded-full"></div>
                                             <span
                                                  className="text-bgray-700 dark:text-bgray-50 text-sm font-medium">Signed
                                             </span>
                                        </div>
                                        <div className="flex space-x-2 items-center">
                                             <div className="w-3 h-3 bg-orange rounded-full"></div>
                                             <span
                                                  className="text-bgray-700 dark:text-bgray-50 text-sm font-medium">Lost
                                             </span>
                                        </div>
                                   </div>
                                   <div className="date-filter relative">
                                        <button
                                             type="button"
                                             className="px-3 py-2 bg-bgray-100 dark:bg-darkblack-500 dark:text-white flex space-x-1 items-center rounded-lg overflow-hidden">
                                             <span
                                                  className="text-sm text-nowrap font-medium text-bgray-900 dark:text-white">Jan
                                                  10 - Jan 16</span>
                                             <span>
                                                  <svg className="stroke-bgray-900 dark:stroke-gray-50"
                                                       width="16" height="17" viewBox="0 0 16 17"
                                                       fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M4 6.5L8 10.5L12 6.5" strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                  </svg>
                                             </span>
                                        </button>
                                        <div id="date-filter-body"
                                             className="rounded-lg shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-[44px] hidden overflow-hidden">
                                             <ul>
                                                  <li
                                                       className="text-sm  text-bgray-90 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold hover:dark:bg-darkblack-600">
                                                       Jan 10 - Jan 16
                                                  </li>
                                                  <li
                                                       className="text-sm  text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold hover:dark:bg-darkblack-600">
                                                       Jan 10 - Jan 16
                                                  </li>
                                                  <li
                                                       className="text-sm text-bgray-900 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold hover:dark:bg-darkblack-600">
                                                       Jan 10 - Jan 16
                                                  </li>
                                             </ul>
                                        </div>
                                   </div>
                              </div>
                              <div className="w-full">
                                   <RevenueFlowChart />
                              </div>
                         </div>
                         <div className="flex-1 xl:block hidden">
                              <div className="bg-white dark:bg-darkblack-600 rounded-lg">
                                   <div
                                        className="flex px-[20px] py-[12px] justify-between items-center border-b border-bgray-300 dark:border-darkblack-400">
                                        <h3 className="text-bgray-900 dark:text-white text-xl font-bold">
                                             Efficiency
                                        </h3>
                                        <div className="date-filter relative">
                                             <button
                                                  type="button" className="flex space-x-1 items-center">
                                                  <span
                                                       className="text-base font-semibold text-bgray-900 dark:text-white">Monthly</span>
                                                  <span>
                                                       <svg className="stroke-bgray-900 dark:stroke-bgray-50"
                                                            width="16" height="17" viewBox="0 0 16 17"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M4 6.5L8 10.5L12 6.5"
                                                                 strokeWidth="1.5"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round" />
                                                       </svg>
                                                  </span>
                                             </button>
                                             <div id="month-filter"
                                                  className="rounded-lg shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-5 overflow-hidden hidden">
                                                  <ul>
                                                       <li
                                                            className="text-sm  text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold dark:text-white hover:dark:bg-darkblack-600">
                                                            January
                                                       </li>
                                                       <li
                                                            className="text-sm text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold dark:text-white hover:dark:bg-darkblack-600">
                                                            February
                                                       </li>

                                                       <li
                                                            className="text-sm  text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold dark:text-white hover:dark:bg-darkblack-600">
                                                            March
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="px-[20px] py-[12px]">
                                        <div className="flex space-x-8 items-center mb-4">
                                             <div className="w-[180px] relative">
                                                  <PieChart />
                                                 
                                             </div>
                                             <div className="counting">
                                                  <div className="mb-6">
                                                       <div className="flex items-center space-x-[2px]">
                                                            <p
                                                                 className="text-success-300 text-lg font-bold">
                                                                 $5,230
                                                            </p>
                                                            <span><svg width="14" height="12"
                                                                 viewBox="0 0 14 12" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                 <path fillRule="evenodd"
                                                                      clipRule="evenodd"
                                                                      d="M10.7749 0.558058C10.5309 0.313981 10.1351 0.313981 9.89107 0.558058L7.39107 3.05806C7.14699 3.30214 7.14699 3.69786 7.39107 3.94194C7.63514 4.18602 8.03087 4.18602 8.27495 3.94194L9.70801 2.50888V11C9.70801 11.3452 9.98783 11.625 10.333 11.625C10.6782 11.625 10.958 11.3452 10.958 11V2.50888L12.3911 3.94194C12.6351 4.18602 13.0309 4.18602 13.2749 3.94194C13.519 3.69786 13.519 3.30214 13.2749 3.05806L10.7749 0.558058Z"
                                                                      fill="#0FCDE1" />
                                                                 <path opacity="0.4"
                                                                      fillRule="evenodd"
                                                                      clipRule="evenodd"
                                                                      d="M3.22407 11.4419C3.46815 11.686 3.86388 11.686 4.10796 11.4419L6.60796 8.94194C6.85203 8.69786 6.85203 8.30214 6.60796 8.05806C6.36388 7.81398 5.96815 7.81398 5.72407 8.05806L4.29102 9.49112L4.29101 1C4.29101 0.654823 4.01119 0.375001 3.66602 0.375001C3.32084 0.375001 3.04102 0.654823 3.04102 1L3.04102 9.49112L1.60796 8.05806C1.36388 7.81398 0.968151 7.81398 0.724074 8.05806C0.479996 8.30214 0.479996 8.69786 0.724074 8.94194L3.22407 11.4419Z"
                                                                      fill="#0FCDE1" />
                                                            </svg>
                                                            </span>
                                                       </div>
                                                       <p className="text-bgray-600 text-base font-medium">
                                                            Arrival
                                                       </p>
                                                  </div>
                                                  <div>
                                                       <div className="flex items-center space-x-[2px]">
                                                            <p
                                                                 className="text-bgray-900 dark:text-white text-lg font-bold">
                                                                 $6,230
                                                            </p>
                                                            <span>
                                                                 <svg className="fill-bgray-900 dark:fill-bgray-50"
                                                                      width="14" height="12"
                                                                      viewBox="0 0 14 12" fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg">
                                                                      <path fillRule="evenodd"
                                                                           clipRule="evenodd"
                                                                           d="M10.7749 0.558058C10.5309 0.313981 10.1351 0.313981 9.89107 0.558058L7.39107 3.05806C7.14699 3.30214 7.14699 3.69786 7.39107 3.94194C7.63514 4.18602 8.03087 4.18602 8.27495 3.94194L9.70801 2.50888V11C9.70801 11.3452 9.98783 11.625 10.333 11.625C10.6782 11.625 10.958 11.3452 10.958 11V2.50888L12.3911 3.94194C12.6351 4.18602 13.0309 4.18602 13.2749 3.94194C13.519 3.69786 13.519 3.30214 13.2749 3.05806L10.7749 0.558058Z" />
                                                                      <path opacity="0.4"
                                                                           fillRule="evenodd"
                                                                           clipRule="evenodd"
                                                                           d="M3.22407 11.4419C3.46815 11.686 3.86388 11.686 4.10796 11.4419L6.60796 8.94194C6.85203 8.69786 6.85203 8.30214 6.60796 8.05806C6.36388 7.81398 5.96815 7.81398 5.72407 8.05806L4.29102 9.49112L4.29101 1C4.29101 0.654823 4.01119 0.375001 3.66602 0.375001C3.32084 0.375001 3.04102 0.654823 3.04102 1L3.04102 9.49112L1.60796 8.05806C1.36388 7.81398 0.968151 7.81398 0.724074 8.05806C0.479996 8.30214 0.479996 8.69786 0.724074 8.94194L3.22407 11.4419Z" />
                                                                 </svg>
                                                            </span>
                                                       </div>
                                                       <p
                                                            className="text-bgray-600 dark:text-bgray-50 text-base font-medium">
                                                            Spending
                                                       </p>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="status">
                                             <div className="flex justify-between items-center mb-1.5">
                                                  <div className="flex space-x-3 items-center">
                                                       <div
                                                            className="w-2.5 h-2.5 rounded-full bg-success-300">
                                                       </div>
                                                       <span
                                                            className="text-sm text-bgray-600 dark:text-bgray-50 font-medium">Goal</span>
                                                  </div>
                                                  <p
                                                       className="text-bgray-900 font-bold text-sm dark:text-bgray-50">
                                                       13%</p>
                                             </div>
                                             <div className="flex justify-between items-center mb-1.5">
                                                  <div className="flex space-x-3 items-center">
                                                       <div
                                                            className="w-2.5 h-2.5 rounded-full bg-warning-300">
                                                       </div>
                                                       <span
                                                            className="text-sm text-bgray-600 dark:text-white font-medium">Spending</span>
                                                  </div>
                                                  <p
                                                       className="text-bgray-900 font-bold text-sm dark:text-bgray-50">
                                                       28%</p>
                                             </div>
                                             <div className="flex justify-between items-center mb-1.5">
                                                  <div className="flex space-x-3 items-center">
                                                       <div
                                                            className="w-2.5 h-2.5 rounded-full bg-bgray-200">
                                                       </div>
                                                       <span
                                                            className="text-sm text-bgray-600 dark:text-white font-medium">Others</span>
                                                  </div>
                                                  <p
                                                       className="text-bgray-900 font-bold text-sm dark:text-bgray-50">
                                                       59%</p>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="w-full py-5 px-6 rounded-lg bg-white dark:bg-darkblack-600">
                         <div className="flex flex-col space-y-5">
                              <div className="w-full flex h-[56px] space-x-4">
                                   <div
                                        className="lg:w-88 sm:w-70 sm:block hidden border border-transparent focus-within:border-success-300 h-full dark:bg-darkblack-500 bg-bgray-100 rounded-lg px-[18px]">
                                        <div className="flex w-full h-full items-center space-x-[15px]">
                                             <span>
                                                  <svg className="stroke-bgray-900 dark:stroke-white"
                                                       width="21" height="22" viewBox="0 0 21 22"
                                                       fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <circle cx="9.80204" cy="10.6761" r="8.98856"
                                                            strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                       <path d="M16.0537 17.3945L19.5777 20.9094"
                                                            strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                  </svg>
                                             </span>
                                             <label className="w-full">
                                                  <input type="text" id="listSearch"
                                                       placeholder="Search by name, email, or others..."
                                                       className="search-input w-full dark:bg-darkblack-500 bg-bgray-100 border-none px-0 focus:outline-none focus:ring-0 text-sm placeholder:text-sm text-bgray-600 tracking-wide placeholder:font-medium placeholder:text-bgray-500 " />
                                             </label>
                                        </div>
                                   </div>
                                   <div className="flex-1 h-full relative">
                                        <button type="button"
                                             className="w-full px-4 h-full flex justify-center items-center bg-bgray-100 dark:bg-darkblack-500 border border-bgray-300 dark:border-darkblack-500 rounded-lg">
                                             <div className="flex space-x-3 items-center">
                                                  <span>
                                                       <svg className="stroke-bgray-900 dark:stroke-success-400"
                                                            width="18" height="17" viewBox="0 0 18 17"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.55169 13.5022H1.25098"
                                                                 strokeWidth="1.5"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round" />
                                                            <path d="M10.3623 3.80984H16.663"
                                                                 strokeWidth="1.5"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round" />
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                 d="M5.94797 3.75568C5.94797 2.46002 4.88981 1.40942 3.58482 1.40942C2.27984 1.40942 1.22168 2.46002 1.22168 3.75568C1.22168 5.05133 2.27984 6.10193 3.58482 6.10193C4.88981 6.10193 5.94797 5.05133 5.94797 3.75568Z"
                                                                 strokeWidth="1.5"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round" />
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                 d="M17.2214 13.4632C17.2214 12.1675 16.1641 11.1169 14.8591 11.1169C13.5533 11.1169 12.4951 12.1675 12.4951 13.4632C12.4951 14.7589 13.5533 15.8095 14.8591 15.8095C16.1641 15.8095 17.2214 14.7589 17.2214 13.4632Z"
                                                                 strokeWidth="1.5"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round" />
                                                       </svg>
                                                  </span>
                                                  <span
                                                       className="text-base text-success-300 font-medium">Filters</span>
                                             </div>
                                        </button>
                                        <div id="table-filter"
                                             className="rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-[60px] overflow-hidden hidden">
                                             <ul>
                                                  <li
                                                       className="text-sm  text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 dark:text-white font-semibold">
                                                       January
                                                  </li>
                                                  <li
                                                       className="text-sm  text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 dark:text-white font-semibold">
                                                       February
                                                  </li>

                                                  <li
                                                       className="text-sm  text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 hover:dark:bg-darkblack-600 dark:text-white font-semibold">
                                                       March
                                                  </li>
                                             </ul>
                                        </div>
                                   </div>
                              </div>
                              <div className="filter-content w-full">
                                   <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
                                        <div className="w-full">
                                             <p
                                                  className="text-base text-bgray-900 dark:text-white leading-[24px] font-bold mb-2">
                                                  Location
                                             </p>
                                             <div className="w-full h-[56px] relative">
                                                  <button
                                                       type="button"
                                                       className="w-full h-full rounded-lg bg-bgray-100 px-4 flex justify-between items-center relative dark:bg-darkblack-500">
                                                       <span className="text-base text-bgray-500">State or
                                                            province</span>
                                                       <span>
                                                            <svg width="21" height="21"
                                                                 viewBox="0 0 21 21" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186"
                                                                      stroke="#A0AEC0" strokeWidth="2"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" />
                                                            </svg>
                                                       </span>
                                                  </button>
                                                  <div id="province-filter"
                                                       className="rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden hidden">
                                                       <ul>
                                                            <li
                                                                 className="text-sm  text-bgray-90 dark:text-white hover:dark:bg-darkblack-600 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold">
                                                                 January
                                                            </li>
                                                            <li
                                                                 className="text-sm  text-bgray-900 dark:text-white hover:dark:bg-darkblack-600 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold">
                                                                 February
                                                            </li>

                                                            <li
                                                                 className="text-sm  text-bgray-900 dark:text-white hover:dark:bg-darkblack-600 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold">
                                                                 March
                                                            </li>
                                                       </ul>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="w-full">
                                             <p
                                                  className="text-base text-bgray-900 dark:text-white leading-[24px] font-bold mb-2">
                                                  Amount Spent
                                             </p>
                                             <div className="w-full h-[56px] relative">
                                                  <button
                                                       type="button"
                                                       className="w-full h-full rounded-lg bg-bgray-100 px-4 flex justify-between items-center relative dark:bg-darkblack-500">
                                                       <span className="text-base text-bgray-500">State or
                                                            province</span>
                                                       <span>
                                                            <svg width="21" height="21"
                                                                 viewBox="0 0 21 21" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186"
                                                                      stroke="#A0AEC0" strokeWidth="2"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" />
                                                            </svg>
                                                       </span>
                                                  </button>
                                                  <div id="amount-filter"
                                                       className="rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden hidden">
                                                       <ul>
                                                            <li
                                                                 className="text-sm  text-bgray-90 cursor-pointer px-5 py-2 hover:dark:bg-darkblack-600 hover:bg-bgray-100 font-semibold dark:text-white">
                                                                 January
                                                            </li>
                                                            <li
                                                                 className="text-sm  text-bgray-900 cursor-pointer px-5 py-2 hover:dark:bg-darkblack-600 hover:bg-bgray-100 font-semibold dark:text-white">
                                                                 February
                                                            </li>

                                                            <li
                                                                 className="text-sm  text-bgray-900 cursor-pointer px-5 py-2 hover:dark:bg-darkblack-600 dark:text-white hover:bg-bgray-100 font-semibold">
                                                                 March
                                                            </li>
                                                       </ul>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="w-full">
                                             <p
                                                  className="text-base text-bgray-900 dark:text-white leading-[24px] font-bold mb-2">
                                                  Transaction list Date
                                             </p>
                                             <div className="w-full h-[56px] relative">
                                                  <button

                                                       type="button"
                                                       className="w-full h-full rounded-lg bg-bgray-100 px-4 flex justify-between items-center relative dark:bg-darkblack-500">
                                                       <span className="text-base text-bgray-500">State or
                                                            province</span>
                                                       <span>
                                                            <svg className="stroke-bgray-500 dark:stroke-white"
                                                                 width="25" height="25"
                                                                 viewBox="0 0 25 25" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M18.6758 5.8186H6.67578C5.57121 5.8186 4.67578 6.71403 4.67578 7.8186V19.8186C4.67578 20.9232 5.57121 21.8186 6.67578 21.8186H18.6758C19.7804 21.8186 20.6758 20.9232 20.6758 19.8186V7.8186C20.6758 6.71403 19.7804 5.8186 18.6758 5.8186Z"
                                                                      strokeWidth="1.5"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" />
                                                                 <path d="M16.6758 3.8186V7.8186"
                                                                      strokeWidth="1.5"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" />
                                                                 <path d="M8.67578 3.8186V7.8186"
                                                                      strokeWidth="1.5"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" />
                                                                 <path d="M4.67578 11.8186H20.6758"
                                                                      strokeWidth="1.5"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" />
                                                                 <path d="M11.6758 15.8186H12.6758"
                                                                      strokeWidth="2"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" />
                                                                 <path d="M12.6758 15.8186V18.8186"
                                                                      strokeWidth="1.5"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" />
                                                            </svg>
                                                       </span>
                                                  </button>
                                                  <div id="date-filter-table"
                                                       className="rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden hidden">
                                                       <ul>
                                                            <li
                                                                 className="text-sm  text-bgray-90 cursor-pointer px-5 py-2 hover:dark:bg-darkblack-600 hover:bg-bgray-100 font-semibold dark:text-white">
                                                                 January
                                                            </li>
                                                            <li
                                                                 className="text-sm  text-bgray-900 cursor-pointer px-5 py-2 hover:dark:bg-darkblack-600 hover:bg-bgray-100 font-semibold dark:text-white">
                                                                 February
                                                            </li>

                                                            <li
                                                                 className="text-sm  text-bgray-900 cursor-pointer px-5 py-2 hover:dark:bg-darkblack-600 dark:text-white hover:bg-bgray-100 font-semibold">
                                                                 March
                                                            </li>
                                                       </ul>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="w-full">
                                             <p
                                                  className="text-base text-bgray-900 dark:text-white leading-[24px] font-bold mb-2">
                                                  Type of transaction
                                             </p>
                                             <div className="w-full h-[56px] relative">
                                                  <button
                                                       type="button"
                                                       className="w-full h-full rounded-lg bg-bgray-100 px-4 flex justify-between items-center relative dark:bg-darkblack-500">
                                                       <span className="text-base text-bgray-500">State or
                                                            province</span>
                                                       <span>
                                                            <svg width="21" height="21"
                                                                 viewBox="0 0 21 21" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186"
                                                                      stroke="#A0AEC0" strokeWidth="2"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" />
                                                            </svg>
                                                       </span>
                                                  </button>
                                                  <div id="trans-filter-tb"
                                                       className="w-full rounded-lg shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden hidden">
                                                       <ul>
                                                            <li
                                                                 className="text-sm  text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold hover:dark:bg-darkblack-600 dark:text-white">
                                                                 January
                                                            </li>
                                                            <li
                                                                 className="text-sm  text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold hover:dark:bg-darkblack-600 dark:text-white">
                                                                 February
                                                            </li>

                                                            <li
                                                                 className="text-sm  text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold hover:dark:bg-darkblack-600 dark:text-white">
                                                                 March
                                                            </li>
                                                       </ul>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div className="table-content w-full overflow-x-auto">
                                   <table className="w-full">
                                        <thead>
                                             <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                  <td className="">
                                                       <label className="text-center">
                                                            <input type="checkbox"
                                                                 className="focus:outline-none focus:ring-0 rounded-full border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 bg-transparent" />
                                                       </label>
                                                  </td>
                                                  <td
                                                       className="py-5 px-6 xl:px-0 w-[250px] lg:w-auto inline-block">
                                                       <div className="w-full flex space-x-2.5 items-center">
                                                            <span
                                                                 className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Customer name</span>
                                                            <span>
                                                                 <svg width="14" height="15"
                                                                      viewBox="0 0 14 15" fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M10.332 1.31567V13.3157"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M3.66602 13.3157V1.31567"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                 </svg>
                                                            </span>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="w-full flex space-x-2.5 items-center">
                                                            <span
                                                                 className="text-base font-medium text-bgray-600 dark:text-bgray-50">Email</span>
                                                            <span>
                                                                 <svg width="14" height="15"
                                                                      viewBox="0 0 14 15" fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M10.332 1.31567V13.3157"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M3.66602 13.3157V1.31567"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                 </svg>
                                                            </span>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex space-x-2.5 items-center">
                                                            <span
                                                                 className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                                                                 Location</span>
                                                            <span>
                                                                 <svg width="14" height="15"
                                                                      viewBox="0 0 14 15" fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M10.332 1.31567V13.3157"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M3.66602 13.3157V1.31567"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                 </svg>
                                                            </span>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                       <div className="w-full flex space-x-2.5 items-center">
                                                            <span
                                                                 className="text-base font-medium text-bgray-600 dark:text-bgray-50">Spent</span>
                                                            <span>
                                                                 <svg width="14" height="15"
                                                                      viewBox="0 0 14 15" fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M10.332 1.31567V13.3157"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M3.66602 13.3157V1.31567"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                                                                           stroke="#718096" strokeWidth="1.5"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                 </svg>
                                                            </span>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0"></td>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                  <td className="">
                                                       <label className="text-center">
                                                            <input type="checkbox"
                                                                 className="focus:outline-none focus:ring-0 rounded-full border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 bg-transparent" />
                                                       </label>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="w-full flex space-x-2.5 items-center">
                                                            <div
                                                                 className="w-10 h-10 rounded-full overflow-hidden">
                                                                 <img src="/assets/images/avatar/user-40x40.png"
                                                                      alt="avatar"
                                                                      className="w-full h-full object-cover" />
                                                            </div>
                                                            <p
                                                                 className="font-semibold text-base text-bgray-900 dark:text-white">
                                                                 Devon Lane
                                                            </p>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <p
                                                            className="font-medium text-base text-bgray-900 dark:text-white">
                                                            devon@mail.com
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <p
                                                            className="font-medium text-base text-bgray-900 dark:text-white">
                                                            Philadelphia, USA
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                       <p
                                                            className="font-semibold text-base text-bgray-900 dark:text-white">
                                                            $101.00
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex justify-center">
                                                            <button type="button">
                                                                 <svg width="18" height="4" viewBox="0 0 18 4"
                                                                      fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M8 2.00024C8 2.55253 8.44772 3.00024 9 3.00024C9.55228 3.00024 10 2.55253 10 2.00024C10 1.44796 9.55228 1.00024 9 1.00024C8.44772 1.00024 8 1.44796 8 2.00024Z"
                                                                           stroke="#A0AEC0" strokeWidth="2"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M1 2.00024C1 2.55253 1.44772 3.00024 2 3.00024C2.55228 3.00024 3 2.55253 3 2.00024C3 1.44796 2.55228 1.00024 2 1.00024C1.44772 1.00024 1 1.44796 1 2.00024Z"
                                                                           stroke="#A0AEC0" strokeWidth="2"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M15 2.00024C15 2.55253 15.4477 3.00024 16 3.00024C16.5523 3.00024 17 2.55253 17 2.00024C17 1.44796 16.5523 1.00024 16 1.00024C15.4477 1.00024 15 1.44796 15 2.00024Z"
                                                                           stroke="#A0AEC0" strokeWidth="2"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                 </svg>
                                                            </button>
                                                       </div>
                                                  </td>
                                             </tr>
                                             <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                  <td className="">
                                                       <label className="text-center">
                                                            <input type="checkbox"
                                                                 className="focus:outline-none focus:ring-0 rounded-full border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 bg-transparent" />
                                                       </label>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="w-full flex space-x-2.5 items-center">
                                                            <div
                                                                 className="w-10 h-10 rounded-full overflow-hidden">
                                                                 <img src="/assets/images/avatar/user-40x40-1.png"
                                                                      alt="avatar"
                                                                      className="w-full h-full object-cover" />
                                                            </div>
                                                            <p
                                                                 className="font-semibold text-base text-bgray-900 dark:text-white">
                                                                 Bessie Cooper
                                                            </p>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <p
                                                            className="font-medium text-base text-bgray-900 dark:text-white">
                                                            devon@mail.com
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <p
                                                            className="font-medium text-base text-bgray-900 dark:text-white">
                                                            Philadelphia, USA
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                       <p
                                                            className="font-semibold text-base text-bgray-900 dark:text-white">
                                                            $101.00
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex justify-center">
                                                            <button type="button">
                                                                 <svg width="18" height="4" viewBox="0 0 18 4"
                                                                      fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M8 2.00024C8 2.55253 8.44772 3.00024 9 3.00024C9.55228 3.00024 10 2.55253 10 2.00024C10 1.44796 9.55228 1.00024 9 1.00024C8.44772 1.00024 8 1.44796 8 2.00024Z"
                                                                           stroke="#A0AEC0" strokeWidth="2"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M1 2.00024C1 2.55253 1.44772 3.00024 2 3.00024C2.55228 3.00024 3 2.55253 3 2.00024C3 1.44796 2.55228 1.00024 2 1.00024C1.44772 1.00024 1 1.44796 1 2.00024Z"
                                                                           stroke="#A0AEC0" strokeWidth="2"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M15 2.00024C15 2.55253 15.4477 3.00024 16 3.00024C16.5523 3.00024 17 2.55253 17 2.00024C17 1.44796 16.5523 1.00024 16 1.00024C15.4477 1.00024 15 1.44796 15 2.00024Z"
                                                                           stroke="#A0AEC0" strokeWidth="2"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                 </svg>
                                                            </button>
                                                       </div>
                                                  </td>
                                             </tr>
                                             <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                                                  <td className="">
                                                       <label className="text-center">
                                                            <input type="checkbox"
                                                                 className="focus:outline-none focus:ring-0 rounded-full border border-bgray-400 cursor-pointer w-5 h-5 text-success-300 bg-transparent" />
                                                       </label>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="w-full flex space-x-2.5 items-center">
                                                            <div
                                                                 className="w-10 h-10 rounded-full overflow-hidden">
                                                                 <img src="/assets/images/avatar/user-40x40-2.png"
                                                                      alt="avatar"
                                                                      className="w-full h-full object-cover" />
                                                            </div>
                                                            <p
                                                                 className="font-semibold text-base text-bgray-900 dark:text-white">
                                                                 Dianne Russell
                                                            </p>
                                                       </div>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <p
                                                            className="font-medium text-base text-bgray-900 dark:text-white">
                                                            devon@mail.com
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <p
                                                            className="font-medium text-base text-bgray-900 dark:text-white">
                                                            Philadelphia, USA
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0 w-[165px]">
                                                       <p
                                                            className="font-semibold text-base text-bgray-900 dark:text-white">
                                                            $101.00
                                                       </p>
                                                  </td>
                                                  <td className="py-5 px-6 xl:px-0">
                                                       <div className="flex justify-center">
                                                            <button type="button">
                                                                 <svg width="18" height="4" viewBox="0 0 18 4"
                                                                      fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M8 2.00024C8 2.55253 8.44772 3.00024 9 3.00024C9.55228 3.00024 10 2.55253 10 2.00024C10 1.44796 9.55228 1.00024 9 1.00024C8.44772 1.00024 8 1.44796 8 2.00024Z"
                                                                           stroke="#A0AEC0" strokeWidth="2"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M1 2.00024C1 2.55253 1.44772 3.00024 2 3.00024C2.55228 3.00024 3 2.55253 3 2.00024C3 1.44796 2.55228 1.00024 2 1.00024C1.44772 1.00024 1 1.44796 1 2.00024Z"
                                                                           stroke="#A0AEC0" strokeWidth="2"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                      <path d="M15 2.00024C15 2.55253 15.4477 3.00024 16 3.00024C16.5523 3.00024 17 2.55253 17 2.00024C17 1.44796 16.5523 1.00024 16 1.00024C15.4477 1.00024 15 1.44796 15 2.00024Z"
                                                                           stroke="#A0AEC0" strokeWidth="2"
                                                                           strokeLinecap="round"
                                                                           strokeLinejoin="round" />
                                                                 </svg>
                                                            </button>
                                                       </div>
                                                  </td>
                                             </tr>
                                        </tbody>
                                   </table>
                              </div>
                              <div className="pagination-content w-full">
                                   <div
                                        className="w-full flex lg:justify-between justify-center items-center">
                                        <div className="lg:flex hidden space-x-4 items-center">
                                             <span
                                                  className="text-bgray-600 dark:text-bgray-50 text-sm font-semibold">Show
                                                  result:</span>
                                             <div className="relative">
                                                  <button
                                                       type="button"
                                                       className="px-2.5 py-3.5 border rounded-lg border-bgray-300 dark:border-darkblack-400 flex space-x-6 items-center">
                                                       <span
                                                            className="text-sm font-semibold text-bgray-900 dark:text-bgray-50">3</span>
                                                       <span>
                                                            <svg width="17" height="17"
                                                                 viewBox="0 0 17 17" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271"
                                                                      stroke="#A0AEC0" strokeWidth="1.5"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round" />
                                                            </svg>
                                                       </span>
                                                  </button>
                                                  <div id="result-filter"
                                                       className="rounded-lg w-full shadow-lg bg-white absolute right-0 z-10 top-14 overflow-hidden hidden">
                                                       <ul>
                                                            <li
                                                                 className="text-sm font-medium text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 ">
                                                                 1
                                                            </li>
                                                            <li
                                                                 className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 ">
                                                                 2
                                                            </li>

                                                            <li
                                                                 className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 ">
                                                                 3
                                                            </li>
                                                       </ul>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="flex sm:space-x-[35px] space-x-5 items-center">
                                             <button type="button">
                                                  <span>
                                                       <svg width="21" height="21" viewBox="0 0 21 21"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327"
                                                                 stroke="#A0AEC0" strokeWidth="2"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round" />
                                                       </svg>
                                                  </span>
                                             </button>
                                             <div className="flex items-center">
                                                  <button type="button"
                                                       className="rounded-lg text-success-300 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 bg-success-50 dark:bg-darkblack-500 dark:text-bgray-50">
                                                       1
                                                  </button>
                                                  <button type="button"
                                                       className="rounded-lg text-bgray-500 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 hover:bg-success-50 hover:text-success-300 transition duration-300 ease-in-out dark:hover:bg-darkblack-500">
                                                       2
                                                  </button>

                                                  <span className="text-bgray-500 text-sm">. . . .</span>
                                                  <button type="button"
                                                       className="rounded-lg text-bgray-500 lg:text-sm text-xs font-bold lg:px-6 lg:py-2.5 px-4 py-1.5 hover:bg-success-50 hover:text-success-300 transition duration-300 ease-in-out dark:hover:bg-darkblack-500">
                                                       20
                                                  </button>
                                             </div>
                                             <button type="button">
                                                  <span>
                                                       <svg width="21" height="21" viewBox="0 0 21 21"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327"
                                                                 stroke="#A0AEC0" strokeWidth="2"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round" />
                                                       </svg>
                                                  </span>
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>
               
          </div>
     );
}
