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
    </header>
  );
}

export default Header;
