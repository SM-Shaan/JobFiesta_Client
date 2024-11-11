import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Navbar = ({ }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const namespace = 'https://myapp.example.com/';
  const userRoles = user?.[`${namespace}roles`] || [];

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setSticky(offset > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { path: "/search-job", title: "Start a search" },
    // { path: "/my-job", title: "My Jobs", roles: ["Recruiter",] },
    { path: "/salary", title: "Salary Estimate", roles: ["Applicants"] },
    { path: "/post-job", title: "Post A Job", roles: ["Recruiter", "Admin"] },
    { path: "/slider", title: "Services" },
    { path: "/events", title: "Events" },
    // { path: "/dashboard", title: "Admin Dashboard", roles: ["Admin"] },
  ];

  const hasRole = (roles) => roles?.some(role => userRoles.includes(role));

  return (
    <header className={`max-w-screen-2xl container mx-auto xl:px-24 px-4 top-0 left-0 right-0 ${isSticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""}`}>
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
            <circle cx="12.0143" cy="12.5143" r="12.0143" fill="#3575E2" fillOpacity="0.4" />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span className="text-blue">Chakri.com</span>
        </a>

        <ul className="hidden md:flex gap-12">
          {isAuthenticated ? (
            <>
              {navItems.map(({ path, title, roles }) => (
                (!roles || hasRole(roles)) && (
                  <li key={path} className="text-base text-primary">
                    <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                      {title}
                    </NavLink>
                  </li>
                )
              ))}
              <div className="">
                <NavLink to='/dashmenu' className="text-xs text-slate-500">{user.name}</NavLink>
                <p className="text-[10px] text-gray-400">{userRoles.join(', ')}</p>
              </div>
              <button className="bg-blue text-white p-2 hover:bg-purple-900 rounded-lg" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
              </button>
            </>
          ) : (
            <li>
              <button className="bg-blue text-white p-2 hover:bg-purple-900 rounded-lg" onClick={() => loginWithRedirect()}>Log In</button>
            </li>
          )}
        </ul>

        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
          {navItems.map(({ path, title, roles }) => (
            (!roles || hasRole(roles)) && (
              <li key={path} className="text-base text-white first:text-blue py-1">
                <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                  {title}
                </NavLink>
              </li>
            )
          ))}
          {isAuthenticated ? (
            <>
              <li className="text-base text-white py-1">
                <NavLink to="/dashmenu/dashboard" className="text-xs text-slate-500">{user.name}</NavLink>
              </li>
              <li className="text-base text-white py-1">
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
              </li>
            </>
          ) : (
            <li className="text-base text-white py-1">
              <button onClick={() => loginWithRedirect()}>Log In</button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
