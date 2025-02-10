import React, { useState, useEffect } from "react";
import { FaLock, FaLockOpen, FaUserCircle } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Button from "../../design/Button";
import { useAddNewUserMutation } from "../../features/users/usersApiSlice"; // Adjust path as necessary
import { useNavigate } from "react-router-dom";

const PHONE_REGEX = /^\+(251)(9|7)\d{8}$/; // Simple regex for validating phone numbers

const New_account = ({ onClose, switchToSignIn }) => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();

  // Form state
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Validation state
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);

  // Show/hide password states
  const [isShowPassword, setIsShowedPassword] = useState(false);
  const [isShowPassword2, setIsShowedPassword2] = useState(false);

  useEffect(() => {
    setValidPhoneNumber(PHONE_REGEX.test(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    if (isSuccess) {
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhoneNumber("");
      navigate("/"); // Navigate to the home or dashboard page after successful registration
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (validPhoneNumber) {
      try {
        await addNewUser({
          username: userName,
          email,
          password,
          phone: phoneNumber,
          roles: ["Customer"],
        });
      } catch (err) {
        console.error("Failed to register:", err);
      }
    } else {
      alert("Invalid phone number.");
    }
  };

  const toggleShowPassword = () => setIsShowedPassword((prev) => !prev);
  const toggleShowPassword2 = () => setIsShowedPassword2((prev) => !prev);

  return (
    <div className="h-[650px]">
      <span className="absolute right-0 top-0 z-10 flex h-12 w-10 cursor-pointer items-center justify-center rounded-tr-2xl bg-[#162938] text-white">
        <IoClose size={55} onClick={onClose} className="hover:text-red-600" />
      </span>
      <div className="w-full p-10">
        <h2 className="text-center text-2xl text-white">Registration</h2>
        <form className="m-3" onSubmit={handleSubmit} autoComplete="off">
          {/* Username Field */}
          <div className="relative my-8 h-12 w-full border-b-2 border-white">
            <span className="absolute right-2 text-xl leading-[57px] text-white">
              <FaUserCircle size={30} />
            </span>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="peer h-full w-full border-none bg-transparent p-2 font-semibold text-white outline-none"
            />
            <label className="absolute left-1 top-1/2 -translate-y-1/2 transform font-medium text-white transition-all duration-500 peer-valid:top-[-5px] peer-focus:top-[-5px]">
              Username
            </label>
          </div>

          {/* Email Field */}
          <div className="relative my-8 h-12 w-full border-b-2 border-white">
            <span className="absolute right-2 text-xl leading-[57px] text-white">
              <FiMail size={30} />
            </span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer h-full w-full border-none bg-transparent p-2 font-semibold text-white outline-none"
            />
            <label className="absolute left-1 top-1/2 -translate-y-1/2 transform font-medium text-white transition-all duration-500 peer-valid:top-[-5px] peer-focus:top-[-5px]">
              Email
            </label>
          </div>

          {/* Phone Number Field */}
          <div className="relative my-8 h-12 w-full border-b-2 border-white">
            <span className="absolute right-2 text-xl leading-[57px] text-white">
              <FiPhone size={30} />
            </span>
            <input
              type="text"
              name="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="peer h-full w-full border-none bg-transparent p-2 font-semibold text-white outline-none"
            />
            <label className="absolute left-1 top-1/2 -translate-y-1/2 transform font-medium text-white transition-all duration-500 peer-valid:top-[-5px] peer-focus:top-[-5px]">
              Phone Number
            </label>
          </div>

          {/* Password Field */}
          <div className="relative my-8 h-12 w-full border-b-2 border-white">
            <span className="absolute right-2 cursor-pointer text-xl leading-[57px] text-white">
              {isShowPassword ? (
                <FaLockOpen size={30} onClick={toggleShowPassword} />
              ) : (
                <FaLock size={30} onClick={toggleShowPassword} />
              )}
            </span>
            <input
              type={isShowPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer h-full w-full border-none bg-transparent p-2 font-semibold text-white outline-none"
            />
            <label className="absolute left-1 top-1/2 -translate-y-1/2 transform font-medium text-white transition-all duration-500 peer-valid:top-[-5px] peer-focus:top-[-5px]">
              Password
            </label>
          </div>

          {/* Confirm Password Field */}
          <div className="relative my-8 h-12 w-full border-b-2 border-white">
            <span className="absolute right-2 cursor-pointer text-xl leading-[57px] text-white">
              {isShowPassword2 ? (
                <FaLockOpen size={30} onClick={toggleShowPassword2} />
              ) : (
                <FaLock size={30} onClick={toggleShowPassword2} />
              )}
            </span>
            <input
              type={isShowPassword2 ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="peer h-full w-full border-none bg-transparent p-2 font-semibold text-white outline-none"
            />
            <label className="absolute left-1 top-1/2 -translate-y-1/2 transform font-medium text-white transition-all duration-500 peer-valid:top-[-5px] peer-focus:top-[-5px]">
              Confirm Password
            </label>
          </div>

          <Button
            type="submit"
            className="mt-6 h-11 w-full cursor-pointer rounded-md text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:text-color-1"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
          {isError && (
            <p className="mt-4 text-red-500">{error?.data?.message}</p>
          )}
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
  );
};

export default New_account;
