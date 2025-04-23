import SearchBar from './SearchBar';
import NavMenu from './NavMenu';
import ThemeToggleButton from '../ui/buttons/ThemeToggleButton';
import PhantomButton from '../modules/features/wallet/PhantomButton';
import PresaleButton from '../modules/features/presale/PresaleButton';

export default function Header() {
  return (
    <div className="header-bar">
      <div className="logo">ToldYouNotToTell</div>
      <SearchBar />
      <button className="add-post-btn">+ New Note</button>
      <PhantomButton />
      <PresaleButton />
      <NavMenu />
      <ThemeToggleButton />
    </div>
  );
}