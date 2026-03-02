"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/admin/dashboard");
  };
  return (
    <>
      <section className="bg-white dark:bg-darkblack-500 lg:max-h-screen overflow-hidden  ">
        <div className="flex flex-col lg:flex-row justify-between min-h-screen">
          <div className="lg:w-1/2 px-5 xl:pl-12 pt-10">
            <header>
              <a href="index.html" className="">
                <img src="/images/logo.webp" className="block dark:hidden h-[52px]" alt="Logo" />
                <img src="/images/logo.webp" className="hidden dark:block" alt="Logo" />
              </a>
            </header>
            <div className="max-w-[450px] m-auto pt-40 pb-16">
              <header className="text-center mb-8">
                <h2
                  className="text-bgray-900 dark:text-white text-4xl font-semibold font-poppins mb-2"
                >
                  Sign in to School ERP.
                </h2>
                <p className="font-urbanis text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Smart, Simple, and Efficient
                </p>
              </header>
              <form action="">
                <div className="mb-4">
                  <input
                    type="text"
                    className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                    placeholder="Username or email"
                  />
                </div>
                <div className="mb-6 relative">
                  <input
                    type="text"
                    className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                    placeholder="Password"
                  />
                  <button className="absolute top-4 right-4 bottom-4">
                    <svg
                      width="22"
                      height="20"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 1L20 19"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.58445 8.58704C9.20917 8.96205 8.99823 9.47079 8.99805 10.0013C8.99786 10.5319 9.20844 11.0408 9.58345 11.416C9.95847 11.7913 10.4672 12.0023 10.9977 12.0024C11.5283 12.0026 12.0372 11.7921 12.4125 11.417"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.363 3.36506C9.22042 3.11978 10.1082 2.9969 11 3.00006C15 3.00006 18.333 5.33306 21 10.0001C20.222 11.3611 19.388 12.5241 18.497 13.4881M16.357 15.3491C14.726 16.4491 12.942 17.0001 11 17.0001C7 17.0001 3.667 14.6671 1 10.0001C2.369 7.60506 3.913 5.82506 5.632 4.65906"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex justify-between mb-7">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 dark:bg-darkblack-500 focus:ring-transparent rounded-full border border-bgray-300 focus:accent-success-300 text-success-300"
                      name="remember"
                      id="remember"
                    />
                    <label className="text-bgray-900 dark:text-white text-base font-semibold">Remember me</label>
                  </div>
                  <div>
                    <a
                      href="#"
                      data-target="#multi-step-modal"
                      className="modal-open text-success-300 font-semibold text-base underline"
                    >Forgot Password?</a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full"
                >
                  Sign In
                </button>
              </form>
              {/* <p className="text-center text-bgray-900 dark:text-bgray-50 text-base font-medium pt-7">
                Don’t have an account?
                <a href="signup.html" className="font-semibold underline">Sign Up</a>
              </p>
              <nav
                className="flex items-center justify-center flex-wrap gap-x-11 pt-24"
              >
                <a href="#" className="text-sm text-bgray-700 dark:text-white">Terms & Condition</a>
                <a href="#" className="text-sm text-bgray-700 dark:text-white">Privacy Policy</a>
                <a href="#" className="text-sm text-bgray-700 dark:text-white">Help</a>
                <a href="#" className="text-sm text-bgray-700 dark:text-white">English</a>
              </nav> */}
              <p className="text-bgray-600 dark:text-white text-center text-sm mt-6">
                @ 2025 Future IT Touch PVT. LTD. All Right Reserved.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 lg:block hidden bg-[#F6FAFF] dark:bg-darkblack-600 p-20 relative">
            <ul>
              <li className="absolute top-10 left-8">
                <img src="/shapes/square.svg" alt="Loginsquare" />
              </li>
              <li className="absolute right-12 top-14">
                <img src="/shapes/vline.svg" alt="vline" />
              </li>
              <li className="absolute bottom-7 left-8">
                <img src="/shapes/dotted.svg" alt="dotted" />
              </li>
            </ul>
            <div className="">
              <img
                src="/images/signin.svg"
                alt="signin"
              />
            </div>
            <div>
              <div className="text-center max-w-lg px-1.5 m-auto">
                <h3
                  className="text-bgray-900 dark:text-white font-semibold font-popins text-4xl mb-4"
                >
                  Smart, Simple, and Efficient
                </h3>
                <p className="text-bgray-600 dark:text-bgray-50 text-sm font-medium">
                  School Manager helps you track student attendance, manage grades, communicate with parents, and organize school activities seamlessly. Stay updated with announcements, schedules, and events—all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  );
}
