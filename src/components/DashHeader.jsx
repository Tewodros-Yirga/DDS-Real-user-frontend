import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { logo } from "../assets/index.js";
import { navigation } from "../constants/index.js";
import Button from "../design/Button.jsx";
import MenuSvg from "../assets/svg/MenuSvg.jsx";
import { HamburgerMenu } from "../design/Header.jsx";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import New_account from "../features/forms/New_account.jsx";
import SignIn from "../features/forms/SignIn.jsx";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useSendLogoutMutation } from "../features/auth/authApiSlice.js";

Modal.setAppElement("#root");

const DashHeader = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { pathname } = useLocation(); // Get the current route

  const [modalState, setModalState] = useState({
    isShown: false,
    type: "new-account",
  });

  const openModal = (type) => {
    setModalState({ isShown: true, type });
  };

  const closeModal = () => {
    setModalState({ isShown: false, type: "new-account" });
  };

  const switchToNewAccount = () => {
    setModalState({ isShown: true, type: "new-account" });
  };

  const switchToSignIn = () => {
    setModalState({ isShown: true, type: "signin" });
  };

  const [openNavigation, setOpenNavigation] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  const [sendLogout] = useSendLogoutMutation();

  const logoutUser = async () => {
    try {
      await sendLogout().unwrap();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Function to scroll to a section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle navigation link clicks
  const handleNavigationClick = (item) => {
    if (pathname === "/") {
      // If on the root route, scroll to the section
      scrollToSection(item.url);
    } else {
      // If on another route, navigate to the root route and then scroll to the section
      navigate("/", { state: { scrollTo: item.url } });
    }
  };

  // Detect the current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      navigation.forEach((item) => {
        const section = document.getElementById(item.url);
        if (section) {
          const { top, bottom } = section.getBoundingClientRect();
          if (
            top <= window.innerHeight / 2 &&
            bottom >= window.innerHeight / 2
          ) {
            currentSection = item.url;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to the section after navigating to the root route
  useEffect(() => {
    if (pathname === "/" && location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      scrollToSection(sectionId);
    }
  }, [pathname, location.state]);

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-50 w-full border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
          openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center px-5 max-lg:py-4 lg:px-7.5 xl:px-10">
          <a className="block w-[12rem] xl:mr-8" href="/">
            <img src={logo} width={190} height={40} alt="DDS" />
          </a>

          <nav
            className={`${
              openNavigation ? "flex" : "hidden"
            } fixed bottom-0 left-0 right-0 top-[5rem] bg-n-8 lg:static lg:mx-auto lg:flex lg:bg-transparent`}
          >
            <div className="relative z-2 m-auto flex flex-col items-center justify-center lg:flex-row">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.url}`} // Change to section ID
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.title === "New Account") {
                      openModal("new-account");
                    } else if (item.title === "Sign In") {
                      openModal("signin");
                    } else {
                      handleNavigationClick(item); // Handle navigation link click
                    }
                  }}
                  className={`relative block px-6 py-6 font-code text-2xl uppercase transition-colors md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 xl:px-12 ${
                    activeSection === item.url ? "text-color-1" : "text-n-1"
                  } ${item.onlyMobile ? "lg:hidden" : ""} hover:text-color-1`}
                >
                  {item.title}
                </a>
              ))}

              {/* Render "History" only if currentUser exists */}
              {currentUser && (
                <a
                  className="relative block px-6 py-6 font-code text-2xl uppercase transition-colors cursor-pointer hover:text-color-1 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 xl:px-12"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default behavior
                    navigate("/history"); // Navigate to the history route
                  }}
                >
                  History
                </a>
              )}
            </div>

            <HamburgerMenu />
          </nav>
          {currentUser ? (
            <span className="mr-8 hidden text-n-1 lg:block">
              {currentUser.username}
            </span>
          ) : (
            <a
              onClick={() => openModal("new-account")}
              href="#signup"
              className="button mr-8 hidden text-n-1 transition-colors hover:text-color-1 lg:block"
            >
              New account
            </a>
          )}
          <div onClick={currentUser ? logoutUser : () => openModal("signin")}>
            <Button className="hidden lg:flex" href="#login">
              {currentUser ? "Sign Out" : "Sign in"}
            </Button>
          </div>
          <Button
            className="ml-auto lg:hidden"
            px="px-3"
            onClick={toggleNavigation}
          >
            <MenuSvg openNavigation={openNavigation} />
          </Button>
        </div>
      </div>

      <Modal
        isOpen={modalState.isShown}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, .5)",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            zIndex: 10000,
            padding: "0",
            background: "transparent",
            border: "none",
            overflow: "visible",
          },
        }}
      >
        <div className="w-[450px] rounded-2xl border-2 border-white bg-transparent shadow-xl backdrop-blur-lg transition-transform duration-500 ease-in-out">
          {modalState.type === "new-account" ? (
            <New_account onClose={closeModal} switchToSignIn={switchToSignIn} />
          ) : (
            <SignIn
              onClose={closeModal}
              switchToNewAccount={switchToNewAccount}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default DashHeader;