export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <h3 className="footer__title">CONTACT US</h3>
          <p className="footer__text">support@example.com</p>
          <p className="footer__text">+91 99999 99999</p>
        </div>

        <div>
          <h3 className="footer__title">QUICK LINKS</h3>
          <ul className="footer__list">
            <li><a href="#shop">Shop</a></li>
            <li><a href="#stories">Stories</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>

        <div>
          <h3 className="footer__title">FOLLOW US</h3>
          <p className="footer__text">Instagram • LinkedIn</p>
        </div>
      </div>

      <p className="footer__copy">© {new Date().getFullYear()} Appscrip Task</p>
    </footer>
  );
}
