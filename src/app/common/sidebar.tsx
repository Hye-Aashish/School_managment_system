'use client';
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDrawer } from "@/context/DrawerContext";
import {
  LayoutDashboard,
  User,
  CreditCard,
  GraduationCap,
  Building2,
  Video,
  Shield,
  DollarSign,
  FileText,
  ClipboardCheck,
  CalendarCheck,
  Monitor,
  BookOpen,
  Calendar,
  FileEdit,
  Users,
  MessageSquare,
  Download,
  BookMarked,
  Library,
  Package,
  FileUser,
  Bus
} from "lucide-react";

export default function Sidebar() {
  const { toggleDrawer } = useDrawer();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  // Check if a menu item or its submenu is active
  const isMenuActive = (menuItem: any, index: number) => {
    // Check if main URL matches
    if (menuItem.url && pathname === menuItem.url) {
      return true;
    }

    // Check if any submenu item matches
    if (menuItem.submenu && menuItem.submenu.length > 0) {
      return menuItem.submenu.some((sub: any) =>
        typeof sub !== "string" && pathname === sub.url
      );
    }

    return false;
  };

  // Check if a submenu item is active
  const isSubmenuActive = (url: string) => {
    return pathname === url;
  };

  // Set active menu on mount and pathname change
  useEffect(() => {
    menu.forEach((item, index) => {
      if (isMenuActive(item, index)) {
        setActiveMenu(index);

        // Find active submenu
        if (item.submenu) {
          const activeSubItem = item.submenu.find((sub: any) =>
            typeof sub !== "string" && pathname === sub.url
          );
          if (activeSubItem && typeof activeSubItem !== "string") {
            setActiveSubmenu(activeSubItem.url);
          }
        }
      }
    });
  }, [pathname]);


  const menu = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: <LayoutDashboard size={20} className="text-[#0FCDE1]" />,
      dropdown: false,
      submenu: [],
    },
    {
      title: "Student Information",
      url: "",
      icon: <User size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Student Details", url: "/admin/Students/StudentDetails" },
        { title: "Student Admission", url: "/admin/Students/Create" },
        { title: "Online Admission", url: "/admin/Students/onlineAdmission" },
        { title: "Disabled Students", url: "/admin/Students/disableStudentsList" },
        { title: "Bulk Delete", url: "/admin/Students/BulkDelete" },
        { title: "Student Categories", url: "/admin/Students/StudentCategory" },
        { title: "Student House", url: "/admin/Students/schoolhouse" },
        { title: "Disable Reason", url: "/admin/Students/DisableReason" },
      ],
    },
    {
      title: "Fee Collection",
      url: "",
      icon: <CreditCard size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Collect Fees", url: "/admin/FeesCollection/studentfee" },
        { title: "Offline Bank Payments", url: "/admin/FeesCollection/offlinepayment" },
        { title: "Search Fees Payment", url: "/admin/FeesCollection/SearchPayment" },
        { title: "Search Due Fees", url: "/admin/FeesCollection/FeeSearch" },
        { title: "Fees Master", url: "/admin/FeesCollection/feemaster" },
        { title: "Quick Fees", url: "/admin/FeesCollection/QuickFees" },
        { title: "Fees Group", url: "/admin/FeesCollection/feegroup" },
        { title: "Fees Type", url: "/admin/FeesCollection/feetype" },
        { title: "Fees Discount", url: "/admin/FeesCollection/feediscount" },
        { title: "Fees Carry Forward", url: "/admin/FeesCollection/feesforward" },
        { title: "Fees Reminder", url: "/admin/FeesCollection/feereminder" },
      ],
    },
    {
      title: "Online Course",
      url: "",
      icon: <GraduationCap size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Online Course", url: "/income/add" },
        { title: "Offline Payment", url: "/admin/onlinecourse/offlinepayment" },
        { title: "Course Category", url: "/admin/onlinecourse/coursecategory" },
        { title: "Question Bank", url: "/admin/onlinecourse/courseexamquestion" },
        { title: "Online Course Report", url: "/admin/onlinecourse/OnlineCourseReport" },
        { title: "Setting", url: "/admin/onlinecourse/setting" },
      ],
    },
    {
      title: "Multi Branch",
      url: "",
      icon: <Building2 size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Overview", url: "/admin/multibranch/overview" },
        { title: "Report", url: "/admin/multibranch/report" },
        { title: "Setting", url: "/admin/multibranch/branch" },
      ],
    },
    {
      title: "Gmeet Live Classes",
      url: "",
      icon: <Video size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Live Classes", url: "/admin/GmeetLiveClasses/liveClasses" },
        { title: "Live Meeting", url: "/admin/GmeetLiveClasses/liveMeeting" },
        { title: "Live Classes Report", url: "/admin/GmeetLiveClasses/LiveClassesReport" },
        { title: "Live Meeting Report", url: "/admin/GmeetLiveClasses/LiveMeetingReport" },
        { title: "Setting", url: "/admin/GmeetLiveClasses/setting" },
      ],
    },
    {
      title: "Zoom Live Class",
      url: "",
      icon: <Monitor size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Live Meeting", url: "/admin/GmeetLiveClasses/liveMeeting" },
        { title: "Live Classes", url: "/admin/GmeetLiveClasses/liveClasses" },
        { title: "Live Classes Report", url: "/admin/GmeetLiveClasses/LiveClassesReport" },
        { title: "Live Meeting Report", url: "/admin/GmeetLiveClasses/LiveMeetingReport" },
        { title: "Setting", url: "/admin/GmeetLiveClasses/setting" },
      ],
    },
    {
      title: "Behaviour Records",
      url: "",
      icon: <Shield size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Assign Incident", url: "/admin/behaviourRecords/AssignIncident" },
        { title: "Incidents", url: "/admin/behaviourRecords/Incidents" },
        { title: "Reports", url: "/admin/behaviourRecords/Reports" },
        { title: "Setting", url: "/admin/behaviourRecords/Setting" },
      ],
    },
    {
      title: "Income",
      url: "",
      icon: <DollarSign size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Add Income", url: "/admin/income/addIncome" },
        { title: "Search Income", url: "/admin/income/searchIncome" },
        { title: "Income Head", url: "/admin/income/incomeHead" },
      ],
    },
    {
      title: "Expenses",
      url: "",
      icon: <FileText size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Add Expense", url: "/admin/income/addIncome" },
        { title: "Search Expense", url: "/admin/income/searchIncome" },
        { title: "Expense Head", url: "/admin/income/incomeHead" },
      ],
    },
    {
      title: "CBSE Examination",
      url: "",
      icon: <ClipboardCheck size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Exam", url: "/admin/cbseexam/Exam" },
        { title: "Exam Schedule", url: "/admin/cbseexam/ExamSchedule" },
        { title: "Print Marksheet", url: "/admin/cbseexam/PrintMarksheet" },
        { title: "Exam Grade", url: "/admin/cbseexam/ExamGrade" },
        { title: "Assign Observation", url: "/admin/cbseexam/AssignObservation" },
        { title: "Observation", url: "/admin/cbseexam/Observation" },
        { title: "Observation Parameter", url: "/admin/cbseexam/ObservationParameter" },
        { title: "Assessment", url: "/admin/cbseexam/Assessment" },
        { title: "Term", url: "/admin/cbseexam/Term" },
        { title: "Template", url: "/admin/cbseexam/Template" },
        { title: "Reports", url: "/admin/cbseexam/Reports" },
        { title: "Setting", url: "/admin/cbseexam/Setting" },
      ],
    },
    {
      title: "Examinations",
      url: "",
      icon: <CalendarCheck size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Exam Group", url: "/admin/Examinations/ExamGroup" },
        { title: "Exam Schedule", url: "/admin/Examinations/ExamSchedule" },
        { title: "Exam Result", url: "/admin/Examinations/ExamResult" },
        { title: "Design AdmitCard", url: "/admin/Examinations/DesignAdmitCard" },
        { title: "Print AdmitCard", url: "/admin/Examinations/PrintAdmitCard" },
        { title: "Design Marksheet", url: "/admin/Examinations/DesignMarksheet" },
        { title: "Print Marksheet", url: "/admin/Examinations/PrintMarksheet" },
        { title: "Marks Grade", url: "/admin/Examinations/MarksGrade" },
        { title: "Marks Division", url: "/admin/Examinations/MarksDivision" },
      ],
    },
    {
      title: "Attendance",
      url: "",
      icon: <CalendarCheck size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Student Attendance", url: "/admin/Attendance/StudentAttendance" },
        { title: "Attendance By Date", url: "/admin/Attendance/AttendanceByDate" },
        { title: "Approve Leave", url: "/admin/Attendance/ApproveLeave" },
      ],
    },
    {
      title: "Online Examinations",
      url: "",
      icon: <Monitor size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Online Exam", url: "/admin/OnlineExaminations/OnlineExam" },
        { title: "Question Bank", url: "/admin/OnlineExaminations/QuestionBank" },
      ],
    },
    {
      title: "Academics",
      url: "",
      icon: <BookOpen size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Class Timetable", url: "/admin/Academics/ClassTimetable" },
        { title: "Teachers Timetable", url: "/admin/Academics/ClassTimetable" },
        { title: "Assign Class Teacher", url: "/admin/Academics/AssignClassTeacher" },
        { title: "Promote Students", url: "/admin/Academics/PromoteStudents" },
        { title: "Subject Group", url: "/admin/Academics/SubjectGroup" },
        { title: "Subjects", url: "/admin/Academics/Subjects" },
        { title: "Class", url: "/admin/Academics/Class" },
        { title: "Sections", url: "/admin/Academics/Sections" },
      ],
    },
    {
      title: "Annual Calendar",
      url: "",
      icon: <Calendar size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Annual Calendar", url: "/admin/AnnualCalendar" },
        { title: "Holiday Type", url: "/admin/AnnualCalendar/HolidayType" },
      ],
    },
    {
      title: "Lesson Plan",
      url: "",
      icon: <FileEdit size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Copy Old Lessons", url: "/admin/LessonPlan/CopyOldLessons" },
        { title: "Manage Lesson Plan", url: "/admin/LessonPlan/ManageLessonPlan" },
        { title: "Manage Syllabus Status", url: "/admin/LessonPlan/ManageSyllabusStatus" },
        { title: "Lesson", url: "/admin/LessonPlan/Lesson" },
        { title: "Topic", url: "/admin/LessonPlan/Topic" },
      ],
    },
    {
      title: "Human Resource",
      url: "",
      icon: <Users size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Staff Directory", url: "/admin/hr/staffDirectory" },
        { title: "Staff Attendance", url: "/admin/hr/staffAttendance" },
        { title: "Payroll", url: "/admin/hr/payroll" },
        { title: "Approve Leave Request", url: "/admin/hr/approveLeave" },
        { title: "Apply Leave", url: "/admin/hr/applyLeave" },
        { title: "Leave Type", url: "/admin/hr/leaveType" },
        { title: "Teachers Rating", url: "/admin/hr/teachersRating" },
        { title: "Department", url: "/admin/hr/department" },
        { title: "Designation", url: "/admin/hr/designation" },
        { title: "Disabled Staff", url: "/admin/hr/disabledStaff" },
      ],
    },
    {
      title: "Communicate",
      url: "",
      icon: <MessageSquare size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Notice Board", url: "/admin/Communicate/NoticeBoard" },
        { title: "Send Email", url: "/admin/Communicate/SendEmail" },
        { title: "Send SMS", url: "/admin/Communicate/SendSMS" },
        { title: "Email / SMS Log", url: "/admin/Communicate/EmailSMSLog" },
        { title: "Schedule Email SMS Log", url: "/admin/Communicate/ScheduleEmailSMSLog" },
        { title: "Login Credentials Send", url: "/admin/Communicate/LoginCredentialsSend" },
        { title: "Email Template", url: "/admin/Communicate/EmailTemplate" },
        { title: "SMS Template", url: "/admin/Communicate/SMSTemplate" },
      ],
    },
    {
      title: "Download Center",
      url: "",
      icon: <Download size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Content Type", url: "/admin/DownloadCenter/ContentType" },
        { title: "Content Share List", url: "/admin/DownloadCenter/ContentShareList" },
        { title: "Upload/Share Content", url: "/admin/DownloadCenter/UploadShareContent" },
        { title: "Video Tutorial", url: "/admin/DownloadCenter/VideoTutorial" },
      ],
    },
    {
      title: "Homework",
      url: "",
      icon: <BookMarked size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Add Homework", url: "/admin/Homework/AddHomework" },
        { title: "Daily Assignment", url: "/admin/Homework/DailyAssignment" },
      ],
    },
    {
      title: "Library",
      url: "",
      icon: <Library size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Book List", url: "/admin/Library/BookList" },
        { title: "Issue - Return", url: "/admin/Library/IssueReturn" },
        { title: "Add Student", url: "/admin/Library/AddStudent" },
        { title: "Add Staff Member", url: "/admin/Library/AddStaffMember" },
      ],
    },
    {
      title: "Inventory",
      url: "",
      icon: <Package size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Issue Item", url: "/admin/Inventory/IssueItem" },
        { title: "Add Item Stock", url: "/admin/Inventory/AddItemStock" },
        { title: "Add Item", url: "/admin/Inventory/AddItem" },
        { title: "Item Category", url: "/admin/Inventory/ItemCategory" },
        { title: "Item Store", url: "/admin/Inventory/ItemStore" },
        { title: "Item Supplier", url: "/admin/Inventory/ItemSupplier" },
      ],
    },
    {
      title: "Student CV",
      url: "",
      icon: <FileUser size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Build CV", url: "/admin/StudentCV/BuildCV" },
        { title: "Download CV", url: "/admin/StudentCV/DownloadCV" },
      ],
    },
    {
      title: "Transport",
      url: "",
      icon: <Bus size={20} className="text-[#0FCDE1]" />,
      dropdown: true,
      submenu: [
        { title: "Fees Master", url: "/admin/Transport/FeesMaster" },
        { title: "Pickup Point", url: "/admin/Transport/PickupPoint" },
        { title: "Routes", url: "/admin/Transport/Routes" },
        { title: "Vehicles", url: "/admin/Transport/Vehicles" },
        { title: "Assign Vehicle", url: "/admin/Transport/AssignVehicle" },
        { title: "Route Pickup Point", url: "/admin/Transport/RoutePickupPoint" },
        { title: "Student Transport Fees", url: "/admin/StudentCV/StudentTransportFees" },
      ],
    },
  ];

  useEffect(() => {
    const navSelector = document.querySelector(".nav-wrapper");
    if (!navSelector) return;

    const items = navSelector.querySelectorAll(".item");
    const listeners: Array<{ el: Element; fn: EventListener }> = [];

    // Auto-expand active menu on load
    items.forEach((item, index) => {
      const submenu = item.querySelector(".sub-menu");
      if (isMenuActive(menu[index], index) && submenu) {
        submenu.classList.add("active");
      }
    });

    items.forEach((item, index) => {
      const submenu = item.querySelector(".sub-menu");
      const clickTarget = item.querySelector("a");

      if (!clickTarget) return;

      const toggleMenu = (e: any) => {
        e.preventDefault();

        // Close all other submenus
        items.forEach((otherItem, otherIndex) => {
          const otherSubmenu = otherItem.querySelector(".sub-menu");
          if (otherSubmenu && otherIndex !== index) {
            otherSubmenu.classList.remove("active");
          }
        });

        // Toggle current submenu
        if (menu[index]?.dropdown && submenu) {
          submenu.classList.toggle("active");
          setActiveMenu(activeMenu === index ? null : index);
        } else if (menu[index]?.url) {
          window.location.href = menu[index].url;
        }
      };

      clickTarget.addEventListener("click", toggleMenu);
      listeners.push({ el: clickTarget, fn: toggleMenu });
    });

    return () => {
      listeners.forEach(({ el, fn }) => {
        el.removeEventListener("click", fn);
      });
    };
  }, [activeMenu, pathname]);

  return (
    <>
      <style jsx>{`
        .sidebar-body::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-body::-webkit-scrollbar-track {
          background: rgba(15, 205, 225, 0.1);
          border-radius: 10px;
        }
        .sidebar-body::-webkit-scrollbar-thumb {
          background: #0FCDE1;
          border-radius: 10px;
        }
        .sidebar-body::-webkit-scrollbar-thumb:hover {
          background: #0AB5C7;
        }
        
        .item a {
          transition: all 0.3s ease;
          border-radius: 8px;
          padding: 8px 12px;
          display: block;
        }
        
        .item a:hover {
          background: rgba(15, 205, 225, 0.1);
          transform: translateX(4px);
        }
        
        .item-ico {
          transition: all 0.3s ease;
        }
        
        .item a:hover .item-ico {
          transform: scale(1.15);
        }
        
        .sub-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .sub-menu.active {
          max-height: 1000px;
        }
        
        .sub-menu li a {
          position: relative;
          padding-left: 12px;
          transition: all 0.3s ease;
        }
        
        .sub-menu li a::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 0;
          background: #0FCDE1;
          border-radius: 2px;
          transition: height 0.3s ease;
        }
        
        .sub-menu li a:hover::before {
          height: 20px;
        }
        
        .sub-menu li a:hover {
          padding-left: 16px;
          color: #0FCDE1 !important;
        }

        .sub-menu li a.active-submenu {
          color: #0FCDE1 !important;
          font-weight: 600;
          padding-left: 16px;
        }

        .sub-menu li a.active-submenu::before {
          height: 20px;
        }
        
        .drawer-btn {
          transition: all 0.3s ease;
        }
        
        .drawer-btn:hover {
          transform: scale(1.05);
        }
        
        .drawer-btn:active {
          transform: scale(0.95);
        }

        .item svg {
          transition: transform 0.3s ease;
        }

        .item a:hover svg {
          transform: rotate(90deg);
        }

        .item.active > a {
          background: rgba(15, 205, 225, 0.15);
          border-left: 3px solid #0FCDE1;
        }

        .item.active .item-text {
          color: #0FCDE1;
          font-weight: 600;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .sub-menu.active li {
          animation: slideIn 0.3s ease forwards;
        }

        .sub-menu.active li:nth-child(1) { animation-delay: 0.05s; }
        .sub-menu.active li:nth-child(2) { animation-delay: 0.1s; }
        .sub-menu.active li:nth-child(3) { animation-delay: 0.15s; }
        .sub-menu.active li:nth-child(4) { animation-delay: 0.2s; }
        .sub-menu.active li:nth-child(5) { animation-delay: 0.25s; }
      `}</style>

      <aside className="block xl:block sm:hidden sidebar-wrapper w-[304px] fixed top-0 bg-black h-full z-30 shadow-2xl">
        <div className="sidebar-header relative border-b border-white/20 w-full h-[108px] flex items-center pl-5 z-30 bg-gradient-to-r from-black to-gray-900">
          <a href="/" className="transition-transform hover:scale-105">
            <img
              src="/images/logo.webp"
              className="block w-[80%]"
              style={{ filter: 'brightness(100) drop-shadow(0 0 10px rgba(15, 205, 225, 0.3))' }}
              alt="logo"
            />
          </a>
          <button
            type="button"
            onClick={toggleDrawer}
            className="drawer-btn absolute right-0 top-auto"
            title="Ctrl+b"
          >
            <span>
              <svg width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10C0 4.47715 4.47715 0 10 0H16V40H10C4.47715 40 0 35.5228 0 30V10Z" fill="#0fcde1" />
                <path d="M10 15L6 20.0049L10 25.0098" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>

        <div className="sidebar-body pl-4 pt-3.5 w-full relative z-30 h-screen overflow-y-scroll pb-[200px]">
          {/* Gradient overlay at top */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>

          <div className="nav-wrapper pr-5 mb-9">
            <div className="item-wrapper mb-5">
              <ul className="mt-2.5">
                {menu.map((m, idx) => (
                  <li
                    key={idx}
                    className={`item py-[11px] text-white ${isMenuActive(m, idx) ? 'active' : ''}`}
                  >
                    <a href={m.url || "#"} className="group">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2.5 items-center">
                          <span className="item-ico">{m.icon}</span>
                          <span className="item-text text-lg font-medium leading-none">
                            {m.title}
                          </span>
                        </div>
                        {m.dropdown && (
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            <svg
                              width="6"
                              height="12"
                              viewBox="0 0 6 12"
                              fill="none"
                              className="fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                                d="M0.531506 0.414376C0.20806 0.673133 0.155619 1.1451 0.414376 1.46855L4.03956 6.00003L0.414376 10.5315C0.155618 10.855 0.208059 11.3269 0.531506 11.5857C0.854952 11.8444 1.32692 11.792 1.58568 11.4685L5.58568 6.46855C5.80481 6.19464 5.80481 5.80542 5.58568 5.53151L1.58568 0.531506C1.32692 0.20806 0.854953 0.155619 0.531506 0.414376Z"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    </a>

                    {m.dropdown && (
                      <ul className="sub-menu mt-[22px] ml-2.5 pl-5 border-l border-[#0FCDE1]/30">
                        {m.submenu?.map((sub, i) => (
                          <li key={i}>
                            <a
                              href={typeof sub === "string" ? "#" : sub.url}
                              className={`text-md font-medium text-gray-400 hover:text-[#0FCDE1] transition-all py-1.5 inline-block ${typeof sub !== "string" && isSubmenuActive(sub.url) ? 'active-submenu' : ''
                                }`}
                            >
                              {typeof sub === "string" ? sub : sub.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="copy-write-text px-4 py-6 bg-gradient-to-t from-gray-900 to-transparent rounded-lg">
            <p className="text-sm text-gray-500 mb-1">© 2025 All Rights Reserved</p>
            <p className="text-sm text-gray-400 font-medium">
              Made with <span className="text-red-500 animate-pulse">❤️</span> by{" "}
              <a
                href="https://www.futuretouch.in/"
                target="_blank"
                className="font-semibold text-[#0FCDE1] hover:text-[#0AB5C7] transition-colors border-b border-[#0FCDE1]/50 hover:border-[#0AB5C7]"
              >
                Future IT Touch
              </a>
            </p>
          </div>
        </div>
      </aside>

      <div
        style={{ zIndex: 25 }}
        className="aside-overlay block sm:hidden w-full h-full fixed left-0 top-0 bg-black bg-opacity-40 backdrop-blur-sm"
      ></div>

      <aside className="sm:block hidden relative w-24 bg-black">
        <div className="w-full sidebar-wrapper-collapse relative top-0 z-30">
          <div className="sidebar-header bg-black sticky top-0 border-b border-white/20 w-full h-[108px] flex items-center justify-center z-20">
            <a href="index.html" className="transition-transform hover:scale-110">
              <img
                src="/images/logo.png"
                style={{ filter: 'brightness(100) drop-shadow(0 0 8px rgba(15, 205, 225, 0.4))' }}
                className="block h-10"
                alt="logo"
              />
            </a>
          </div>
          <div className="sidebar-body pt-3.5 w-full">
            <div className="flex flex-col items-center">
              <div className="nav-wrapper mb-9">
                <div className="item-wrapper mb-5">
                  <ul className="mt-2.5 flex justify-center items-center flex-col">
                    {menu.map((m, idx) => (
                      <li key={idx} className="item py-[11px] px-[43px] group">
                        <a
                          href={m.url || "#"}
                          className="transition-all hover:scale-110 inline-block"
                        >
                          <span className="item-ico group-hover:drop-shadow-[0_0_8px_rgba(15,205,225,0.6)]">
                            {m.icon}
                          </span>
                        </a>

                        {m.dropdown && m.submenu && m.submenu.length > 0 && (
                          <ul className="sub-menu border-l border-[#0FCDE1] bg-gray-900 px-5 py-2 rounded-lg shadow-2xl min-w-[200px]">
                            {m.submenu?.map((sub, i) => (
                              <li key={i}>
                                <a
                                  href={typeof sub === "string" ? "#" : sub.url}
                                  className="text-md font-medium text-gray-400 hover:text-[#0FCDE1] transition-all py-1.5 inline-block"
                                >
                                  {typeof sub === "string" ? sub : sub.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}