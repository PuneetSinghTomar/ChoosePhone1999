import React from 'react'
import {Link} from 'react-router-dom'
export default function Footer() {
  return (
    <div>
        <footer className="footer bg-base-200 text-base-content p-10">
  <aside>
  {/* <Link to='/'><img src={Logo} alt="" width={"50%"} /></Link> */}
  </aside>
  <nav>
    <h6 className="footer-title">CP</h6>
    <Link to='/' className="link link-hover">Home</Link>
    <Link to='/BuilderPages' className="link link-hover">Products</Link>
    <Link to='/GuidPages' className="link link-hover">Trends</Link>
  </nav>
  <nav>
    <h6 className="footer-title">Account</h6>
    <Link to='/login' className="link link-hover">Sign in</Link>
    <Link to='/registration' className="link link-hover">Register</Link>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <Link to='/Aboutus' className="link link-hover">About us</Link>
    <Link to='/AffiliationDiscloser' className="link link-hover">Affiliate Discloser</Link>
    <Link to='' className="link link-hover">Contact & Import</Link>
    <Link to='/PersonalInformation' className="link link-hover">Do Not Sell My Personal Information</Link>
    <Link to='/PrivacyPolicy' className="link link-hover">Privacy Policy</Link>
    <a className="link link-hover">Terms of Service</a>
  </nav>
  <nav>
    <h6 className="footer-title">Information</h6>
    <a className="link link-hover">Downloads</a>
    <a className="link link-hover">Industry Code of conduct</a>
    <a className="link link-hover">User Code of Conduct</a>
  </nav>
</footer>
<footer className="footer bg-base-300  items-center p-4">
  <aside className="grid-flow-col items-center">
 {/* <Link to='/'> <img src={Logo} alt="" width={"20%"} /></Link> */}
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
      </svg>
    </a>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
      </svg>
    </a>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
      </svg>
    </a>
  </nav>
</footer>
    </div>
  )
}
