import { useState } from "react";
import { FaMoon, FaSun, FaBars, FaWallet, FaCoins } from "react-icons/fa";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const [navOpen, setNavOpen] = useState(false);
  const { connect, connected, publicKey } = useWallet();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    document.body.classList.toggle("light-mode", theme === "dark");
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="header-bar">
      <div className="logo">ToldYouNotToTell</div>
      <input
        type="text"
        className="search-box"
        placeholder="Search by number, title or recovery code..."
        onChange={(e) => {
          /* search function */
        }}
      />
      <button
        className="add-post-btn"
        onClick={() => {
          /* toggle form */
        }}
      >
        + New Note
      </button>
      <button
        className="phantom-btn"
        onClick={() => connect()}
        style={{
          background: connected
            ? "linear-gradient(135deg, #14F195 0%, #9945FF 100%)"
            : "linear-gradient(135deg, #9945FF 0%, #14F195 100%)",
        }}
      >
        <FaWallet />
        {connected
          ? formatWalletAddress(publicKey?.toString() || "")
          : "Connect"}
      </button>
      <button
        className="presale-btn"
        onClick={() => {
          /* show presale modal */
        }}
      >
        <FaCoins /> Presale
      </button>
      <button className="nav-toggle" onClick={toggleNav}>
        <FaBars />
      </button>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? <FaMoon /> : <FaSun />}
      </button>

      <div className={`nav-menu ${navOpen ? "show" : ""}`}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); /* toggle my posts */
          }}
        >
          My Posts
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); /* show boosts */
          }}
        >
          Current Boosts
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); /* show rewards */
          }}
        >
          My Rewards
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); /* show promotion */
          }}
        >
          Promotion
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); /* show FAQ */
          }}
        >
          FAQ
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); /* show reports */
          }}
        >
          Moderator Panel
        </a>
      </div>
    </div>
  );
}
