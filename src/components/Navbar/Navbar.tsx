// src/components/Navbar/Navbar.tsx
import  { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { useAppSelector } from "../../redux/store/hooks";
import UserAvatar from "../UserAvatar";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState<string>(localStorage.getItem("activeLink") || "/");

  useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setMenuOpen((s) => !s);

  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    let lastKnownScrollY = 0;
    let ticking = false;
    const THRESHOLD = 40;

    function onScroll() {
      lastKnownScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsSticky(lastKnownScrollY > THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    setIsSticky(window.scrollY > THRESHOLD);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // favorites count from redux
  const favoritesCount = useAppSelector((s: { favorites: any[] }) => s.favorites.length);

  const desktopBtn = (isActive: boolean) =>
    `rounded-[12px] text-[18px] cursor-pointer ${
      isActive
        ? `bg-[color:var(--color-black10)] text-[color:var(--color-gray70)] border-0`
        : `bg-transparent text-[color:var(--color-gray70)] border-[1.5px] border-dashed border-[color:var(--color-black15)]`
    } py-[18px] px-[30px] md:w-auto w-[270px]`;

  const leftGroupClass = `flex gap-[14px] transition-transform duration-300 ease-in-out ${
    isSticky ? "-translate-x-6" : "translate-x-0"
  }`;
  const rightGroupClass = `flex gap-[14px] items-center transition-transform duration-300 ease-in-out ${
    isSticky ? "translate-x-6" : "translate-x-0"
  }`;
  const logoClass = `transition-transform duration-300 ease-in-out ${
    isSticky ? "scale-95 -translate-y-1" : "scale-100 translate-y-0"
  }`;

  const navigate = useNavigate();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userNameRaw = typeof window !== "undefined" ? localStorage.getItem("user_name") : null;
  const userName = userNameRaw ? String(userNameRaw) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    // لو هواتف أو فتح الmenu
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav
      className={`bg-[color:var(--color-black06)] fixed w-full z-[10000] transition-all duration-300 ease-in-out ${
        isSticky ? "translate-y-0 shadow-lg" : "-translate-y-0"
      }`}
      aria-hidden={false}
    >
      <div className="px-6 md:px-[162px] relative z-[99999]">
        {/* ---------- Desktop / Tablet Navbar ---------- */}
        <div className="hidden xl:flex justify-between items-center border-b-[1.9px] border-b-dashed border-[color:var(--color-black15)] py-[29px]">
          {/* left buttons */}
          <div className={leftGroupClass}>
            <Link to="/home" onClick={() => setActiveLink("/home")}>
              <button className={desktopBtn(activeLink === "/")}>Home</button>
            </Link>

            <Link to="/products" onClick={() => setActiveLink("/products")}>
              <button className={desktopBtn(activeLink === "/products")}>Products</button>
            </Link>
          </div>

          {/* logo */}
          <Link to="/" onClick={() => setActiveLink("/")}>
            <img src={"/assets/imgs/Logo.png"} alt="logo" className={`w-[151px] h-[28px] object-contain ${logoClass}`} />
          </Link>

          {/* right buttons */}
          <div className={rightGroupClass}>
                        {token ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/profile")}
                  className="rounded-[12px] p-[8px] bg-transparent border-0 cursor-pointer"
                  aria-label="Open profile"
                >
                  <UserAvatar size={50} />
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setActiveLink("/login")}>
                <button className="rounded-[12px] p-[18px] bg-[color:var(--color-black10)] border-0 flex items-center gap-2 text-[color:var(--color-gray70)] cursor-pointer transition-transform duration-300 ease-in-out">
                  <FiUserPlus className="w-[24px] h-[24px]" />
                </button>
              </Link>
            )}
            {/* Favorites */}
            <Link to="/favorites">
              <button className="relative rounded-[12px] p-[18px] bg-[color:var(--color-black10)] border-0 cursor-pointer transition-transform duration-300 ease-in-out">
                <AiOutlineHeart className="w-[24px] h-[24px] text-brown70" />
                {favoritesCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-brown70 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                    aria-label={`${favoritesCount} items in favorites`}
                  >
                    {favoritesCount}
                  </span>
                )}
              </button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <button className="rounded-[12px] p-[18px] bg-[color:var(--color-black10)] border-0 cursor-pointer transition-transform duration-300 ease-in-out">
                <img src={"/assets/imgs/NavBar/Union.png"} alt="basket" className="w-[24px] h-[24px]" />
              </button>
            </Link>

            <Link to="/contact" onClick={() => setActiveLink("/contact")}>
              <button
                className={`rounded-[12px] text-[18px] font-medium cursor-pointer bg-[color:var(--color-brown60)] py-[18px] px-[30px] md:w-auto w-[270px] transition-transform duration-300 ease-in-out`}
              >
                Contact
              </button>
            </Link>
          </div>
        </div>

        {/* ---------- Mobile Navbar ---------- */}
        <div className="flex xl:hidden justify-between items-center w-full py-5">
          <Link to="/home" onClick={() => setActiveLink("/home")}>
            <img src={"/assets/imgs/Logo.png"} alt="logo" className="w-[120px] object-contain" />
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/favorites">
              <button className="relative rounded-[12px] p-[12px] bg-[color:var(--color-black10)]">
                <AiOutlineHeart className="w-[24px] h-[24px] text-brown70" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brown70 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </button>
            </Link>

            <Link to="/cart">
              <button className="rounded-[12px] p-[12px] bg-[color:var(--color-black10)]">
                <img src={"/assets/imgs/NavBar/Union.png"} alt="basket" className="w-[28px] h-[28px]" />
              </button>
            </Link>

            <button onClick={toggleMenu} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} className="rounded-[10px] bg-[color:var(--color-brown60)] p-[12px]">
              <img src={menuOpen ? "/assets/imgs/NavBar/close.svg" : "/assets/imgs/NavBar/Icon.png"} alt="toggle" className="w-[20px] h-[20px]" />
            </button>
          </div>
        </div>

        {/* ---------- Mobile overlay (menu) ---------- */}
        <div
          className={`xl:hidden fixed left-[5%] w-[90%] transform transition-transform duration-700 ${
            menuOpen ? "translate-y-0 top-[92px] z-[9955]" : "-translate-y-full top-0 z-[-10]"
          } bg-black/80 backdrop-blur-md rounded-b-[40px] flex flex-col items-center gap-[18px] pt-[40px]`}
        >
          <div className="flex flex-col items-center gap-[18px]">
            <Link
              to="/"
              onClick={() => {
                setActiveLink("/");
                setMenuOpen(false);
              }}
            >
              <button
                className={`rounded-[12px] text-[18px] cursor-pointer py-[18px] px-[30px] w-[270px] ${
                  activeLink === "/" ? "bg-[color:var(--color-black10)] text-[color:var(--color-gray70)]" : "bg-transparent text-[color:var(--color-gray70)] border-[1.5px] border-dashed border-[color:var(--color-black15)]"
                }`}
              >
                Home
              </button>
            </Link>

            <Link
              to="/products"
              onClick={() => {
                setActiveLink("/products");
                setMenuOpen(false);
              }}
            >
              <button
                className={`rounded-[12px] text-[18px] cursor-pointer py-[18px] px-[30px] w-[270px] ${
                  activeLink === "/products" ? "bg-[color:var(--color-black10)] text-[color:var(--color-gray70)]" : "bg-transparent text-[color:var(--color-gray70)] border-[1.5px] border-dashed border-[color:var(--color-black15)]"
                }`}
              >
                Products
              </button>
            </Link>

            {/* conditional: show profile button if logged in, otherwise login/register */}
            {token ? (
              <div className="w-full px-6">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="rounded-[12px] text-[18px] font-medium cursor-pointer bg-[color:var(--color-black10)] py-[14px] px-[16px] w-full flex items-center gap-3 justify-center text-[color:var(--color-gray70)]"
                >
                  <UserAvatar size={30} />
                  <span className="truncate max-w-[140px]">{userName}</span>
                </button>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="mt-3 w-full rounded-[12px] text-[16px] py-3 border border-dashed border-[color:var(--color-black15)] text-[color:var(--color-gray70)]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => {
                  setActiveLink("/login");
                  setMenuOpen(false);
                }}
              >
                <button className="rounded-[12px] text-[18px] font-medium cursor-pointer bg-[color:var(--color-black10)] py-[18px] px-[30px] w-[270px] flex justify-center items-center gap-2 text-[color:var(--color-gray70)]">
                  <FiUserPlus className="w-[20px] h-[20px]" /> Login / Register
                </button>
              </Link>
            )}

            <Link
              to="/contact"
              onClick={() => {
                setActiveLink("/contact");
                setMenuOpen(false);
              }}
            >
              <button className="rounded-[12px] text-[18px] mb-8 font-medium cursor-pointer bg-[color:var(--color-brown60)] py-[18px] px-[30px] w-[270px]">Contact</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
