export default function Header() {
  return (
    <header className="header">
      <div className="header__row">
        <button className="iconBtn" aria-label="Menu">
          🟔 
        </button>
        <div className="logo" aria-label="Logo">
          LOGO
        </div>
        <nav className="nav" aria-label="Primary">
          <a href="#shop">SHOP</a>
          <a href="#skills">SKILLS</a>
          <a href="#stories">STORIES</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT US</a>
        </nav>
        <div className="header__actions" aria-label="Actions">
          <button className="iconBtn" aria-label="Wishlist">
            ♡
          </button>
          <button className="iconBtn" aria-label="Cart">
            👜
          </button>
        </div>
      </div>
    </header>
  );
}
