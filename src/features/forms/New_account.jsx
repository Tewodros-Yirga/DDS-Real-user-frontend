import React, { useState } from "react";
import { FaLock, FaLockOpen, FaUserCircle } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Button from "../../design/Button";

const New_account = ({ onClose, switchToSignIn }) => {
  const [isShowPassword, setIsShowedPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowedPassword((prev) => !prev);
  };
  const [isShowPassword2, setIsShowedPassword2] = useState(false);
  const toggleShowPassword2 = () => {
    setIsShowedPassword2((prev) => !prev);
  };
  return (
    <>
      <div className="">
        <span className="absolute right-0 top-0 z-10 flex h-12 w-10 cursor-pointer items-center justify-center rounded-tr-2xl bg-[#162938] text-white">
          <IoClose size={55} onClick={onClose} className="hover:text-red-600" />
        </span>
        <div className="w-full p-10">
          <h2 className="text-center text-2xl text-white">Registration</h2>
          <form className="m-3" action="" method="post" autoComplete="off">
            <div className="relative my-8 h-12 w-full border-b-2 border-white">
              <span className="absolute right-2 text-xl leading-[57px] text-white">
                <FaUserCircle size={30} />
              </span>
              <input
                type="text"
                name="userName"
                required
                className="peer h-full w-full border-none bg-transparent p-2 font-semibold text-white outline-none"
              />
              <label className="absolute left-1 top-1/2 -translate-y-1/2 transform font-medium text-white transition-all duration-500 peer-valid:top-[-5px] peer-focus:top-[-5px]">
                Username
              </label>
            </div>
            <div className="relative my-8 h-12 w-full border-b-2 border-white">
              <span className="absolute right-2 text-xl leading-[57px] text-white">
                <FiMail size={30} />
              </span>
              <input
                type="email"
                name="email"
                required
                className="peer h-full w-full border-none bg-transparent p-2 font-semibold text-white outline-none"
              />
              <label className="absolute left-1 top-1/2 -translate-y-1/2 transform font-medium text-white transition-all duration-500 peer-valid:top-[-5px] peer-focus:top-[-5px]">
                Email
              </label>
            </div>

            <div className="relative my-8 h-12 w-full border-b-2 border-white">
              <span className="absolute right-2 cursor-pointer text-xl leading-[57px] text-white">
                {isShowPassword ? (
                  <FaLockOpen
                    size={30}
                    className="cursor-pointer"
                    onClick={() => toggleShowPassword()}
                  />
                ) : (
                  <FaLock
                    size={30}
                    className="cursor-pointer"
                    onClick={() => toggleShowPassword()}
                  />
                )}
              </span>
              <input
                type={isShowPassword ? "text" : "password"}
                required
                name="pass"
                id="pass"
                className="peer h-full w-full border-none bg-transparent p-2 font-semibold text-white outline-none"
              />
              <label className="absolute left-1 top-1/2 -translate-y-1/2 transform font-medium text-white transition-all duration-500 peer-valid:top-[-5px] peer-focus:top-[-5px]">
                Password
              </label>
            </div>

            <div className="relative my-8 h-12 w-full border-b-2 border-white">
              <span className="absolute right-2 cursor-pointer text-xl leading-[57px] text-white">
                {isShowPassword2 ? (
                  <FaLockOpen
                    size={30}
                    className="cursor-pointer"
                    onClick={() => toggleShowPassword2()}
                  />
                ) : (
                  <FaLock
                    size={30}
                    className="cursor-pointer"
                    onClick={() => toggleShowPassword2()}
                  />
                )}
              </span>
              <input
                type={isShowPassword2 ? "text" : "password"}
                name="cpassword"
                id="cpassword"
                required
                className="peer h-full w-full border-none bg-transparent p-2 font-semibold text-white outline-none"
              />
              <label className="absolute left-1 top-1/2 -translate-y-1/2 transform font-medium text-white transition-all duration-500 peer-valid:top-[-5px] peer-focus:top-[-5px]">
                Confirm Password
              </label>
            </div>
            <Button className="mt-6 h-11 w-full cursor-pointer rounded-md text-lg font-medium text-white transition-all duration-500 hover:scale-105 hover:text-color-1">
              Register
            </Button>
            <div className="my-6 text-center text-sm font-medium text-white">
              <p>
                Already have an account?{" "}
                <span
                  className="cursor-pointer font-semibold hover:text-color-1 hover:underline"
                  onClick={switchToSignIn}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default New_account;
