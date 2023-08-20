import React, { useContext } from 'react';
import Link from "next/link"
import {FormattedMessage} from "react-intl"
import classNames from 'classnames';
import { LanguageDirectionContext } from '@/helpers/langDirection';
import {Phone, Email, Facebook, Instagram} from "@mui/icons-material"

const Footer: React.FC = () => {
    const { isRTL } = useContext(LanguageDirectionContext);

  return (
    <footer className= {classNames(`${isRTL ? 'arabic' : 'english'}`,{ 'text-right': isRTL },"flex bg-primary py-8 border-t border-pgray w-full")}>
      <div className="max-w-18xl m-auto mx-auto sm:px-6 lg:px-8 ">
        <div className='lg:flex md:flex sm:block'>
          <div className="flex flex-col items-center lg:w-1/4 md:w-fit sm:w-full mr-8 m-auto mx-auto justify-center">
            <img className="h-40 w-auto mb-8" src="http://localhost:3000/logo.png" alt="Logo" />
            <ul className={`flex  ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <li className={`flex ${isRTL ? 'ml-3' : 'justify-start'}`}>
                <a href="https://www.facebook.com/90boxegypt/" target='_blank' className="text-gray-300 p-4 pt-0 hover:text-pyellow">
                  <Facebook />
                </a>
              </li>
              <li className="flex items-center">
                <a href="https://www.instagram.com/90boxegypt/" target="_blank" className="text-gray-300 p-4 pt-0 hover:text-pyellow">
                  <Instagram />
                </a>
              </li>
            </ul>
          </div>
          <div className= {`pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 `}>

          <div className={`col-span-1 ${isRTL? "md:col-start-4 md:row-start-1 sm:row-start-1 sm:col-sart1": ""}`}>
            <h1 className="text-white text-2xl font-bold mb-4"><FormattedMessage id="footer.pages" /></h1>

            <ul className="text-gray-300">
            <li>
                <Link href="/"
                className="text-white hover:text-pyellow">
                    <FormattedMessage id="navbar.home" />
              </Link>
            </li>
            <li>
              <Link href="/about"
                className="text-white hover:text-pyellow">
                    <FormattedMessage id="navbar.about" />
              </Link>
            </li>
            <li>
              <Link href="/contact"
                className="text-white hover:text-pyellow">
                    <FormattedMessage id="navbar.contact" />
              </Link>
            </li>
            <li>
              <Link href="/testimonials"
                className="text-white hover:text-pyellow">
                    <FormattedMessage id="navbar.testimonials" />
              </Link>
            </li>
            </ul>
          </div>

          <div className={`col-span-1 ${isRTL? "md:col-start-3 md:row-start-1 sm:row-start-2 sm:col-sart1": ""}`}>
            <h1 className="text-white text-2xl font-bold mb-4"><FormattedMessage id="footer.join" /></h1>
            <ul className="text-gray-300">
            <li>
                <Link href="/programs"
                className="text-white hover:text-pyellow">
                    <FormattedMessage id="footer.programs" />
              </Link>
            </li>
            <li>
              <Link href="/schedule"
                className="text-white hover:text-pyellow">
                    <FormattedMessage id="footer.schedule" />
              </Link>
            </li>
            <li>
              <Link href="/team"
                className="text-white hover:text-pyellow">
                    <FormattedMessage id="footer.team" />
              </Link>
            </li>
            <li>
              <Link href="/careers"
                className="text-white hover:text-pyellow">
                    <FormattedMessage id="footer.careers" />
              </Link>
            </li>
            </ul>
          </div>
          
          <div className={`col-span-1 ${isRTL? "lg:col-start-2 lg:row-start-1 md:col-start-3 md:row-start-1 sm:row-start-3 sm:col-sart1": "md:col-start-3 md:row-start-1"}`}>
            <h3 className="text-white text-2xl font-bold mb-4"><FormattedMessage id="footer.location" /></h3>
            <p className="text-gray-300 "><FormattedMessage id="footer.address" /></p>
            <p className="text-gray-300"><FormattedMessage id="footer.workingOpen" /></p>
            <p className="text-gray-300"><FormattedMessage id="footer.workingClose" /></p>
          </div>

          <div className={`col-span-1 ${isRTL? "lg:col-start-1 lg:row-start-1 md:col-start-4 md:row-start-2 sm:row-start-4 sm:col-sart1": ""}`}>
            <h3 className="text-white text-2xl font-bold mb-4"><FormattedMessage id="navbar.contact" /></h3>
            <div className={`  ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row'} text-white`}>
              <Phone />
              <a className={`${isRTL? "ml-10" : "ml-3" } text-white mb-3 ml-3`}>+20 1099320230</a>
            </div>
            <div className={`  ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row'} text-white`}>
              <Email />
              <a className= {`${isRTL? "ml-2" : "ml-3" } text-white mb-3`}>Nintybox@gmail.com</a>
            </div>
          </div>

          {/* <div className={`col-span-1 ${isRTL? "lg:col-start-1 lg:row-start-1 md:col-start-5 md:row-start-2 sm:row-start-5 sm:col-sart1": ""}`}>
            <h3 className="text-white text-xl font-semibold mb-4"><FormattedMessage id="footer.social" /></h3>

          </div> */}
        </div>
        </div>


        <div className="mt-8 border-t border-pgray pt-8">
          <p className="text-center text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} 90Box. <FormattedMessage id="footer.copyrights" />
          </p>
          <p className="text-center text-gray-300 text-sm">

            <Link href={"/terms"}><FormattedMessage id="footer.terms" /></Link> | <Link href="/privacy"><FormattedMessage id="footer.privacy" /></Link> | <Link href="/faq"><FormattedMessage id="footer.faq" /></Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
