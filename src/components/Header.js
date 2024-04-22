import AdventuraLogo from "../assets/adventura-logo.jpeg";

function Header() {
  return (
    <header className="header">
      <img
        src={AdventuraLogo}
        alt="Adventura Logo"
        height={40}
        style={{ marginLeft: 20 }}
      />
{/* 
      <input
        type="text"
        className="search-input"
        placeholder="Search Attractions ..."
      /> */}
    </header>
  );
}

export default Header;
