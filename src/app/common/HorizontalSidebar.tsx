'use client';
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDrawer } from "@/context/DrawerContext";
import {
     User, FileText, CreditCard, DollarSign, CalendarCheck, BookOpen, Users, Clipboard, Archive, BarChart2, Settings, LayoutDashboard, Menu, X, MoreHorizontal
} from "lucide-react";

export default function HorizontalNavbar() {
     const pathname = usePathname();
     const [activeMenu, setActiveMenu] = useState<number | null>(null);
     const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
     const [openDropdown, setOpenDropdown] = useState<number | null>(null);
     const [showMoreMenu, setShowMoreMenu] = useState(false);

     // Number of menu items to show before "More"
     const VISIBLE_MENU_COUNT = 5;

     // Check if a menu item or its submenu is active
     const isMenuActive = (menuItem: any) => {
          if (menuItem.url && pathname === menuItem.url) {
               return true;
          }
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
               if (isMenuActive(item)) {
                    setActiveMenu(index);
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
               icon: <DollarSign size={20} className="text-[#0FCDE1]" />,
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
               icon: <DollarSign size={20} className="text-[#0FCDE1]" />,
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
               icon: <DollarSign size={20} className="text-[#0FCDE1]" />,
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
               icon: <DollarSign size={20} className="text-[#0FCDE1]" />,
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
               icon: <DollarSign size={20} className="text-[#0FCDE1]" />,
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
               icon: <FileText size={20} className="text-[#0FCDE1]" />,
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
               icon: <CalendarCheck size={20} className="text-[#0FCDE1]" />,
               dropdown: true,
               submenu: [
                    { title: "Online Exam", url: "/admin/OnlineExaminations/OnlineExam" },
                    { title: "Question Bank", url: "/admin/OnlineExaminations/QuestionBank" },
               ],
          },
          {
               title: "Academics",
               url: "",
               icon: <CalendarCheck size={20} className="text-[#0FCDE1]" />,
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
               icon: <CalendarCheck size={20} className="text-[#0FCDE1]" />,
               dropdown: true,
               submenu: [
                    { title: "Annual Calendar", url: "/admin/AnnualCalendar" },
                    { title: "Holiday Type", url: "/admin/AnnualCalendar/HolidayType" },
               ],
          },
          {
               title: "Lesson Plan",
               url: "",
               icon: <CalendarCheck size={20} className="text-[#0FCDE1]" />,
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
               icon: <Users size={20} className="text-[#0FCDE1]" />,
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
               icon: <Users size={20} className="text-[#0FCDE1]" />,
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
               icon: <Users size={20} className="text-[#0FCDE1]" />,
               dropdown: true,
               submenu: [
                    { title: "Add Homework", url: "/admin/Homework/AddHomework" },
                    { title: "Daily Assignment", url: "/admin/Homework/DailyAssignment" },
               ],
          },
          {
               title: "Library",
               url: "",
               icon: <Users size={20} className="text-[#0FCDE1]" />,
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
               icon: <Users size={20} className="text-[#0FCDE1]" />,
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
               icon: <Users size={20} className="text-[#0FCDE1]" />,
               dropdown: true,
               submenu: [
                    { title: "Build CV", url: "/admin/StudentCV/BuildCV" },
                    { title: "Download CV", url: "/admin/StudentCV/DownloadCV" },
               ],
          },
          {
               title: "Transport",
               url: "",
               icon: <Users size={20} className="text-[#0FCDE1]" />,
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

     // Split menu into visible and hidden items
     const visibleMenuItems = menu.slice(0, VISIBLE_MENU_COUNT);
     const hiddenMenuItems = menu.slice(VISIBLE_MENU_COUNT);

     // Close dropdown when clicking outside
     useEffect(() => {
          const handleClickOutside = (e: MouseEvent) => {
               const target = e.target as HTMLElement;
               if (!target.closest('.nav-item') && !target.closest('.more-menu-container')) {
                    setOpenDropdown(null);
                    setShowMoreMenu(false);
               }
          };

          document.addEventListener('click', handleClickOutside);
          return () => document.removeEventListener('click', handleClickOutside);
     }, []);

     return (
          <>
               <style jsx>{`
        .horizontal-navbar {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border-bottom: 2px solid rgba(15, 205, 225, 0.2);
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
        }

        .nav-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        
        .nav-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 205, 225, 0.1);
          border-radius: 10px;
        }
        
        .nav-scrollbar::-webkit-scrollbar-thumb {
          background: #0FCDE1;
          border-radius: 10px;
        }
        
        .nav-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0AB5C7;
        }

        .nav-item {
          position: relative;
        }

        .nav-item > a {
          transition: all 0.3s ease;
          padding: 12px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          color: #374151;
        }

        .nav-item > a:hover {
          background: rgba(15, 205, 225, 0.1);
          transform: translateY(-2px);
        }

        .nav-item.active > a {
          background: rgba(15, 205, 225, 0.15);
          border-bottom: 3px solid #0FCDE1;
        }

        .nav-item.active .nav-text {
          color: #0FCDE1;
          font-weight: 600;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 250px;
          max-height: 0;
          overflow: hidden;
          background: white;
          border: 1px solid rgba(15, 205, 225, 0.2);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
          opacity: 0;
          z-index: 100;
          margin-top: 8px;
        }

        .dropdown-menu.open {
          max-height: 600px;
          opacity: 1;
        }

        .dropdown-menu.mega-menu {
          min-width: 600px;
          max-width: 800px;
        }

        .dropdown-menu.mega-menu .submenu-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          padding: 16px;
        }

        .dropdown-menu li {
          list-style: none;
        }

        .dropdown-menu a {
          display: block;
          padding: 10px 20px;
          color: #6B7280;
          transition: all 0.3s ease;
          border-radius: 6px;
          position: relative;
          overflow: hidden;
        }

        .dropdown-menu a::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 3px;
          height: 0;
          background: #0FCDE1;
          transition: height 0.3s ease;
        }

        .dropdown-menu a:hover {
          color: #0FCDE1;
          background: rgba(15, 205, 225, 0.1);
          padding-left: 24px;
        }

        .dropdown-menu a:hover::before {
          height: 100%;
        }

        .dropdown-menu a.active-submenu {
          color: #0FCDE1;
          font-weight: 600;
          background: rgba(15, 205, 225, 0.15);
          padding-left: 24px;
        }

        .dropdown-menu a.active-submenu::before {
          height: 100%;
        }

        .more-menu-container {
          position: relative;
        }

        .more-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          min-width: 280px;
          max-height: 0;
          overflow: hidden;
          background: white;
          border: 1px solid rgba(15, 205, 225, 0.2);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
          opacity: 0;
          z-index: 100;
          margin-top: 8px;
        }

        .more-dropdown.open {
          max-height: 600px;
          opacity: 1;
          overflow-y: auto;
        }

        .more-dropdown .more-menu-item {
          border-bottom: 1px solid #f3f4f6;
          padding: 12px 20px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .more-dropdown .more-menu-item:last-child {
          border-bottom: none;
        }

        .more-dropdown .more-menu-item:hover {
          background: rgba(15, 205, 225, 0.05);
        }

        .more-dropdown .more-menu-title {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #374151;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .more-dropdown .more-submenu-list {
          padding-left: 35px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .more-dropdown .more-submenu-list a {
          color: #6B7280;
          font-size: 14px;
          padding: 6px 12px;
          border-radius: 6px;
          transition: all 0.2s ease;
          display: block;
        }

        .more-dropdown .more-submenu-list a:hover {
          color: #0FCDE1;
          background: rgba(15, 205, 225, 0.1);
          padding-left: 16px;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-menu.open li {
          animation: slideDown 0.3s ease forwards;
        }

        .dropdown-menu.open li:nth-child(1) { animation-delay: 0.05s; }
        .dropdown-menu.open li:nth-child(2) { animation-delay: 0.1s; }
        .dropdown-menu.open li:nth-child(3) { animation-delay: 0.15s; }
        .dropdown-menu.open li:nth-child(4) { animation-delay: 0.2s; }
        .dropdown-menu.open li:nth-child(5) { animation-delay: 0.25s; }

        .mobile-menu {
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          background: white;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .chevron-icon {
          transition: transform 0.3s ease;
        }

        .nav-item:hover .chevron-icon {
          transform: rotate(180deg);
        }

        .more-btn {
          padding: 12px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #374151;
          transition: all 0.3s ease;
          cursor: pointer;
          background: transparent;
          border: none;
          font-size: 14px;
          font-weight: 500;
        }

        .more-btn:hover {
          background: rgba(15, 205, 225, 0.1);
          transform: translateY(-2px);
        }

        .more-btn.active {
          background: rgba(15, 205, 225, 0.15);
          color: #0FCDE1;
        }

        @media (max-width: 1024px) {
          .nav-scrollbar {
            overflow-x: auto;
            overflow-y: hidden;
          }
        }
      `}</style>
               {/* Desktop Horizontal Navbar */}
               <nav className="horizontal-navbar hidden lg:block relative z-50">
                    <div className="flex items-center justify-between px-6 h-20">
                         {/* Logo */}
                         <div className="shrink-0">
                              <a href="/" className="transition-transform hover:scale-105 inline-block">
                                   <img
                                        src="/images/logo.webp"
                                        className="h-12"
                                        style={{ filter: 'drop-shadow(0 2px 8px rgba(15, 205, 225, 0.3))' }}
                                        alt="logo"
                                   />
                              </a>
                         </div>
                         {/* Navigation Menu */}
                         <div className="flex-1 ml-8">
                              <ul className="flex items-center justify-end gap-2">
                                   {/* Visible Menu Items */}
                                   {visibleMenuItems.map((item, idx) => (
                                        <li
                                             key={idx}
                                             className={`nav-item ${isMenuActive(item) ? 'active' : ''}`}
                                             onMouseEnter={() => item.dropdown && setOpenDropdown(idx)}
                                             onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
                                        >
                                             <a href={item.url || "#"} className="group">
                                                  <span className="item-ico group-hover:scale-110 transition-transform">
                                                       {item.icon}
                                                  </span>
                                                  <span className="nav-text text-sm font-medium">
                                                       {item.title}
                                                  </span>
                                                  {item.dropdown && (
                                                       <svg
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 12 12"
                                                            fill="none"
                                                            className="chevron-icon"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                       >
                                                            <path
                                                                 d="M2.5 4.5L6 8L9.5 4.5"
                                                                 stroke="currentColor"
                                                                 strokeWidth="1.5"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                            />
                                                       </svg>
                                                  )}
                                             </a>

                                             {/* Dropdown Menu */}
                                             {item.dropdown && (
                                                  <div className={`dropdown-menu ${item.submenu && item.submenu.length > 6 ? 'mega-menu' : ''} ${openDropdown === idx ? 'open' : ''}`}>
                                                       {item.submenu && item.submenu.length > 6 ? (
                                                            <div className="submenu-grid">
                                                                 {item.submenu.map((sub, i) => (

                                                                      <a key={i}
                                                                           href={typeof sub === "string" ? "#" : sub.url}
                                                                           className={`${typeof sub !== "string" && isSubmenuActive(sub.url)
                                                                                ? 'active-submenu'
                                                                                : ''
                                                                                }`}
                                                                      >
                                                                           {typeof sub === "string" ? sub : sub.title}
                                                                      </a>
                                                                 ))}
                                                            </div>
                                                       ) : (
                                                            <ul className="py-2">
                                                                 {item.submenu?.map((sub, i) => (
                                                                      <li key={i}>

                                                                           <a href={typeof sub === "string" ? "#" : sub.url}
                                                                                className={`${typeof sub !== "string" && isSubmenuActive(sub.url)
                                                                                     ? 'active-submenu'
                                                                                     : ''
                                                                                     }`}
                                                                           >
                                                                                {typeof sub === "string" ? sub : sub.title}
                                                                           </a>
                                                                      </li>
                                                                 ))}
                                                            </ul>
                                                       )}
                                                  </div>
                                             )}
                                        </li>
                                   ))}

                                   {/* More Menu Button */}
                                   {hiddenMenuItems.length > 0 && (
                                        <li className="more-menu-container">
                                             <button
                                                  className={`more-btn ${showMoreMenu ? 'active' : ''}`}
                                                  onClick={(e) => {
                                                       e.stopPropagation();
                                                       setShowMoreMenu(!showMoreMenu);
                                                       setOpenDropdown(null);
                                                  }}
                                             >
                                                  <MoreHorizontal size={20} className="text-[#0FCDE1]" />
                                                  <span>More</span>
                                                  <svg
                                                       width="12"
                                                       height="12"
                                                       viewBox="0 0 12 12"
                                                       fill="none"
                                                       className={`transition-transform ${showMoreMenu ? 'rotate-180' : ''}`}
                                                       xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                       <path
                                                            d="M2.5 4.5L6 8L9.5 4.5"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                             </button>

                                             {/* More Dropdown Menu */}
                                             <div className={`more-dropdown ${showMoreMenu ? 'open' : ''}`}>
                                                  {hiddenMenuItems.map((item, idx) => (
                                                       <div key={idx} className="more-menu-item">
                                                            <div className="more-menu-title">
                                                                 {item.icon}
                                                                 <span>{item.title}</span>
                                                            </div>
                                                            {item.dropdown && item.submenu && (
                                                                 <div className="more-submenu-list">
                                                                      {item.submenu.map((sub, i) => (

                                                                           <a key={i}
                                                                                href={typeof sub === "string" ? "#" : sub.url}
                                                                                className={`${typeof sub !== "string" && isSubmenuActive(sub.url)
                                                                                     ? 'active-submenu'
                                                                                     : ''
                                                                                     }`}
                                                                           >
                                                                                {typeof sub === "string" ? sub : sub.title}
                                                                           </a>
                                                                      ))}
                                                                 </div>
                                                            )}
                                                       </div>
                                                  ))}
                                             </div>
                                        </li>
                                   )}
                              </ul >
                         </div >
                    </div >
               </nav >
          </>
     );
}