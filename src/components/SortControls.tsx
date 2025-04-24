import { FaClock, FaStar, FaRandom, FaFire, FaLock } from "react-icons/fa";

export default function SortControls() {
  return (
    <div className="sort">
      <button
        className="rewards-pool-btn"
        onClick={() => {
          /* show rewards */
        }}
        title="Rewards Pool"
      >
        💎
        <span className="tooltip-text">Loading rewards info...</span>
      </button>
      <button
        onClick={() => {
          /* sort by new */
        }}
        className="active"
      >
        <FaClock /> New
      </button>
      <button
        onClick={() => {
          /* sort by top */
        }}
      >
        <FaStar /> Top
      </button>
      <button
        onClick={() => {
          /* sort by random */
        }}
      >
        <FaRandom /> Random
      </button>
      <button
        onClick={() => {
          /* sort by trending */
        }}
      >
        <FaFire /> Trending
      </button>
      <button
        className="stake-btn"
        onClick={() => {
          /* show staking */
        }}
      >
        <FaLock /> Stake TNTT
      </button>
    </div>
  );
}