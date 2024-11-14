import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import Modal from "react-modal";
import New_account from "../Pages/New_account.jsx";
import SignIn from "../Pages/SignIn";

Modal.setAppElement("#root");

const Header = () => {
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

  const { pathname } = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

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

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
          }`}
      >
        <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
          <a className="block w-[12rem] xl:mr-8" href="/">
            <img src={brainwave} width={190} height={40} alt="Brainwave" />
          </a>

          <nav
            className={`${openNavigation ? "flex" : "hidden"
              } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
          >
            <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  onClick={
                    handleClick && item.title === "new-account"
                      ? () => openModal("new-account")
                      : item.title === "signin"
                        ? () => openModal("signin")
                        : null
                  }
                  className={`block relative font-code text-2xl uppercase transition-colors px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 xl:px-12 ${pathname === item.url ? "text-color-1" : "text-n-1"
                    } ${item.onlyMobile ? "lg:hidden" : ""}`}
                >
                  {item.title}
                </a>
              ))}
            </div>

            <HamburgerMenu />
          </nav>

          <a
            onClick={() => openModal("new-account")}
            href="#signup"
            className="button hidden mr-8 transition-colors hover:text-color-1 lg:block text-n-1"
          >
            New account
          </a>
          <div onClick={() => openModal("signin")}>
            <Button className="hidden lg:flex" href="#login">
              <a>Sign in</a>
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
        <div className="w-[450px] rounded-2xl border-2 border-white bg-transparent shadow-xl  backdrop-blur-lg transition-transform duration-500 ease-in-out">
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

export default Header;
