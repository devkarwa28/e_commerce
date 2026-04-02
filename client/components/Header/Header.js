import MainHeader from "./MainHeader"
import NavBar from "./NavBar"
import TopBar from "./TopBar"

const Header = () => {
  return (
    <header>
      <TopBar />
      <MainHeader />
      <NavBar />
    </header>
  );
};

export default Header