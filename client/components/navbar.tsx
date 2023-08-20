import React, { useContext, useState } from "react"
import Link from "next/link"
import LanguageSwitcher from "./languageSwitcher";
import { LanguageDirectionContext } from "@/helpers/langDirection";
import { FormattedMessage } from "react-intl"
import classNames from "classnames";
import AccessibilityToggler from "./accessibility";
import { Close, Menu, MenuOpen } from "@mui/icons-material";

const Navbar = () => {
    const { isRTL } = useContext(LanguageDirectionContext);

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
    };

  return (
    <nav className={classNames(`${isRTL ? 'arabic' : 'english'}`, { 'text-right': isRTL },"text-xl bg-primary py-6 w-full flex justify-around items-center border-b border-pgrey")}>
      <div className="container w-full flex flex-row justify-around items-center">
      <div className="md:hidden flex flex-row pt-2">
            <button
              className="text-white hover:text-pyellow"
              onClick={toggleNav}>
                {isNavOpen ? (<MenuOpen />) : (<Menu />)}
            </button>
          </div>
        <div className={"flex items-center"}>
          <Link href="/" className="text-white text-xl font-bold">
            <img src="http://localhost:3000/logo.png" alt="Logo" width={100} />
          </Link>
        </div>
        <div className={`md:flex ${isNavOpen ? 'flex flex-col fixed top-0 left-0 w-56 h-full bg-primary z-10 overflow-y-auto shadow-2xl shadow-pgrey' : 'hidden'}`}>
          <button className="md:hidden text-white relative flex flex-row-reverse justify-center  mb-6 p-4 border-b border-pgrey"
          onClick={toggleNav}>
            <Close />
          </button>
          <ul className={`text-2xl flex ${isRTL ? 'md:flex-row-reverse' : ''} ${isNavOpen? "m-5": ""} flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4`}>
            <li className={`p-1 ${isRTL? 'ml-3': ''}`}>
              <Link href="/" className="text-white hover:text-pyellow">
                <FormattedMessage id="navbar.home" />
              </Link>
            </li>
            <li className="p-1">
              <Link href="/about" className="text-white hover:text-pyellow">
                <FormattedMessage id="navbar.about" />
              </Link>
            </li>
            <li className="p-1">
              <Link href="/contact" className="text-white hover:text-pyellow">
                <FormattedMessage id="navbar.contact" />
              </Link>
            </li>
            <li className="p-1">
              <Link href="/programs" className="text-white hover:text-pyellow">
                <FormattedMessage id="footer.programs" />
              </Link>
            </li>
            <li className="p-1">
              <Link href="/schedule" className="text-white hover:text-pyellow">
                <FormattedMessage id="footer.schedule" />
              </Link>
            </li>
            <li className="p-1">
              <Link href="/testimonials" className="text-white hover:text-pyellow">
                <FormattedMessage id="navbar.testimonials" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row">
          <AccessibilityToggler />
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;