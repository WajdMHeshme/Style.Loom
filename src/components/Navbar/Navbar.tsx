import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";

export default function Navbar() {
    const [activeLink, setActiveLink] = useState(
        localStorage.getItem("activeLink") || "/"
    );

    useEffect(() => {
        localStorage.setItem("activeLink", activeLink);
    }, [activeLink]);

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen((s) => !s);

    // helper for desktop button classes (desktop vs mobile widths)
    const desktopBtn = (isActive: boolean) =>
        `rounded-[12px] text-[18px] cursor-pointer ${isActive
            ? `bg-[color:var(--color-black10)] text-[color:var(--color-gray70)] border-0`
            : `bg-transparent text-[color:var(--color-gray70)] border-[1.5px] border-dashed border-[color:var(--color-black15)]`
        } py-[18px] px-[30px] md:w-auto w-[270px]`;

    return (
        <nav className="bg-[color:var(--color-black06)] fixed w-full z-[10000]">
            <div className="px-6 md:px-[162px] relative z-[99999]">
                {/* ---------- Desktop / Tablet Navbar (>= md) ---------- */}
                <div className="hidden xl:flex justify-between items-center border-b-[1.9px] border-b-dashed border-[color:var(--color-black15)] py-[29px]">
                    {/* left buttons */}
                    <div className="flex gap-[14px]">
                        <Link to="/" onClick={() => setActiveLink("/")}>
                            <button className={desktopBtn(activeLink === "/")}>Home</button>
                        </Link>

                        <Link to="/products" onClick={() => setActiveLink("/products")}>
                            <button className={desktopBtn(activeLink === "/products")}>
                                Products
                            </button>
                        </Link>
                    </div>

                    {/* logo (desktop) */}
                    <Link to="/" onClick={() => setActiveLink("/")}>
                        <img
                            src={"/assets/imgs/Logo.png"}
                            alt="logo"
                            className="w-[151px] h-[28px] object-contain"
                        />
                    </Link>

                    {/* right buttons */}
                    <div className="flex gap-[14px] items-center">
                        <Link to="/cart">
                            <button className="rounded-[12px] p-[18px] bg-[color:var(--color-black10)] border-0 cursor-pointer">
                                <img src={"/assets/imgs/NavBar/Union.png"} alt="basket" className="w-[24px] h-[24px]" />
                            </button>
                        </Link>

                        <Link to="/login" onClick={() => setActiveLink("/login")}>
                            <button className="rounded-[12px] p-[18px] bg-[color:var(--color-black10)] border-0 flex items-center gap-2 text-[color:var(--color-gray70)] cursor-pointer">
                                <FiUserPlus className="w-[24px] h-[24px]" />
                            </button>
                        </Link>

                        <Link to="/contact" onClick={() => setActiveLink("/contact")}>
                            <button
                                className={`rounded-[12px] text-[18px] font-medium cursor-pointer bg-[color:var(--color-brown60)] py-[18px] px-[30px] md:w-auto w-[270px]`}
                            >
                                Contact
                            </button>
                        </Link>
                    </div>
                </div>

                {/* ---------- Mobile Topbar (<= md) ---------- */}
                <div className="flex xl:hidden justify-between items-center w-full py-5">
                    <Link to="/" onClick={() => setActiveLink("/")}>
                        <img src={"/assets/imgs/logo.png"} alt="logo" className="w-[120px] object-contain" />
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link to="/cart">
                            <button className="rounded-[12px] p-[12px] bg-[color:var(--color-black10)]">
                                <img src={"/assets/imgs/NavBar/Union.png"} alt="basket" className="w-[28px] h-[28px]" />
                            </button>
                        </Link>

                        <button
                            onClick={toggleMenu}
                            aria-expanded={menuOpen}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            className="rounded-[10px] bg-[color:var(--color-brown60)] p-[12px]"
                        >
                            <img
                                src={menuOpen ? "/assets/imgs/NavBar/close.svg" : "/assets/imgs/NavBar/Icon.png"}
                                alt="toggle"
                                className="w-[20px] h-[20px]"
                            />
                        </button>
                    </div>
                </div>

                {/* ---------- Mobile overlay menu (slides from top) ---------- */}
                <div
                    className={`xl:hidden fixed left-[5%]  w-[90%]  transform transition-transform duration-700 ${menuOpen ? "translate-y-0 top-[92px] z-[9955]" : "-translate-y-full top-0 z-[-10]"
                        } bg-black/80 backdrop-blur-md rounded-b-[40px] flex flex-col items-center gap-[18px]  pt-[40px]`}
                >
                    {/* mobile buttons stack */}
                    <div className="flex flex-col items-center gap-[18px]">
                        <Link to="/" onClick={() => { setActiveLink("/"); setMenuOpen(false); }}>
                            <button
                                className={`rounded-[12px] text-[18px] cursor-pointer py-[18px] px-[30px] w-[270px] ${activeLink === "/" ? 'bg-[color:var(--color-black10)] text-[color:var(--color-gray70)]' : 'bg-transparent text-[color:var(--color-gray70)] border-[1.5px] border-dashed border-[color:var(--color-black15)]'}`}
                            >
                                Home
                            </button>
                        </Link>

                        <Link to="/products" onClick={() => { setActiveLink("/products"); setMenuOpen(false); }}>
                            <button
                                className={`rounded-[12px] text-[18px] cursor-pointer py-[18px] px-[30px] w-[270px] ${activeLink === "/products" ? 'bg-[color:var(--color-black10)] text-[color:var(--color-gray70)]' : 'bg-transparent text-[color:var(--color-gray70)] border-[1.5px] border-dashed border-[color:var(--color-black15)]'}`}
                            >
                                Products
                            </button>
                        </Link>

                        <Link to="/register" onClick={() => { setActiveLink("/login"); setMenuOpen(false); }}>
                            <button className="rounded-[12px] text-[18px]    font-medium cursor-pointer bg-[color:var(--color-black10)] py-[18px] px-[30px] w-[270px] flex justify-center items-center gap-2 text-[color:var(--color-gray70)]">
                                <FiUserPlus className="w-[20px] h-[20px]" /> Register
                            </button>
                        </Link>

                        <Link to="/contact" onClick={() => { setActiveLink("/contact"); setMenuOpen(false); }}>
                            <button className="rounded-[12px] text-[18px] mb-8 font-medium cursor-pointer bg-[color:var(--color-brown60)] py-[18px] px-[30px] w-[270px]">
                                Contact
                            </button>
                        </Link>
                    </div>


                </div>
            </div>
        </nav>
    );
}
