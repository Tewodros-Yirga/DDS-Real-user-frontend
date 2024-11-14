import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Button from "../components/Button";
import { FaLockOpen } from "react-icons/fa6";

const SignIn = ({ onClose, switchToNewAccount }) => {
  const [isShowPassword, setIsShowedPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowedPassword((prev) => !prev);
  };
  return (
    <>
      <div>
        <span className="absolute right-0 top-0 z-10 flex h-12 w-10 cursor-pointer items-center justify-center rounded-tr-2xl bg-[#162938] text-white">
          <IoClose size={55} onClick={onClose} className="hover:text-red-600" />
        </span>
        <div className="w-full p-10">
          <h2 className="text-center text-2xl text-white">Login</h2>
          <form action="" method="post" autoComplete="off">
            <div className="relative my-8 h-12 w-full border-b-2 border-white">
              <span className="absolute right-2 text-xl leading-[57px] text-white">
                <FiMail size={30} />
              </span>
              <input
                type="email"
                name="ema"
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

            <div className="my-[-15px] flex justify-between text-sm font-medium text-white">
              <label>
                <input id="remember" type="checkbox" hidden />
              </label>
              <a
                href="#"
                className="my-3 cursor-pointer font-semibold hover:underline hover:text-color-1"
              >
                Forgot Password ?
              </a>
            </div>
            <Button className="mt-6 h-11 w-full cursor-pointer rounded-md text-lg font-medium text-white transition-all duration-500 hover:text-color-1 hover:scale-105">
              LogIn
            </Button>
            <div className="my-6 text-center text-sm font-medium text-white">
              <p>
                Don't have an account?{" "}
                <span
                  className="cursor-pointer font-semibold hover:underline hover:text-color-1"
                  onClick={switchToNewAccount}
                >
                  Register
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
