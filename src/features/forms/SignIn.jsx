import { FaLock } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Button from "../../design/Button";
import { FaLockOpen } from "react-icons/fa6";

import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "../auth/authSlice";
import { useLoginMutation } from "../auth/authApiSlice";

const SignIn = ({ onClose, switchToNewAccount }) => {
  const [isShowPassword, setIsShowedPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowedPassword((prev) => !prev);
  };

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials(userData)); // Store the full user object
      setUsername("");
      setPassword("");
      onClose(); // Close modal after successful login
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div>
        <span className="absolute right-0 top-0 z-10 flex h-12 w-10 cursor-pointer items-center justify-center rounded-tr-2xl bg-[#162938] text-white">
          <IoClose size={55} onClick={onClose} className="hover:text-red-600" />
        </span>
        <div className="w-full p-10">
          <h2 className="text-center text-2xl text-white">Login</h2>
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
          <form
            action=""
            method="post"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="relative my-8 h-12 w-full border-b-2 border-white">
              <span className="absolute right-2 text-xl leading-[57px] text-white">
                <FiMail size={30} />
              </span>
              <input
                type="text"
                ref={userRef}
                value={username}
                onChange={handleUserInput}
                required
                className="peer h-full w-full border-none bg-transparent p-2 font-semibold text-white outline-none"
              />
              <label className="absolute left-1 top-1/2 -translate-y-1/2 transform font-medium text-white transition-all duration-500 peer-valid:top-[-5px] peer-focus:top-[-5px]">
                Username
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
                onChange={handlePwdInput}
                value={password}
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
                className="my-3 cursor-pointer font-semibold hover:text-color-1 hover:underline"
              >
                Forgot Password ?
              </a>
            </div>
            <Button className="mt-6 h-11 w-full cursor-pointer rounded-md text-lg font-medium text-white transition-all duration-500 hover:scale-105 hover:text-color-1">
              LogIn
            </Button>
            <div className="my-6 text-center text-sm font-medium text-white">
              <p>
                Don't have an account?{" "}
                <span
                  className="cursor-pointer font-semibold hover:text-color-1 hover:underline"
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
