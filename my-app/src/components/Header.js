



function Header() {
    return (
        <header className="navbar">
            <img src="./images/logo.svg" alt="Stylized text saying 'Sneackers', the company logo."></img>

            <nav>
                <span id="nav-label" hidden>Navigation</span>

                {/* The button for when the mobile menu is open */}
                <button id="btnOpen" className="navbar__open" aria-expanded="false" aria-labelledby="nav-label">
                    <img src="./images/icon-close.svg" alt="" />
                </button>

                {/* Menu, shown for both mobile and desktop */}
                <div className="navbar__menu" role="dialog" aria-labelledby="nav-label">
                    {/* Button hidden for desktop, shown on mobile */}
                    <button id="btnClose" className="navbar__close" aria-label="Close">
                        <img src="./images/icon-menu.svg" alt="" />
                    </button>

                    {/* Menu, hidden for mobile until opened, shown for desktop */}
                    <ul class="navbar__links">
                        <li class="navbar__item"><a href="https://github.com/Ankia-Fuls" class="navbar__link">Collections</a></li>
                        <li class="navbar__item"><a href="https://github.com/Ankia-Fuls" class="navbar__link">Men</a></li>
                        <li class="navbar__item"><a href="https://github.com/Ankia-Fuls" class="navbar__link">Women</a></li>
                        <li class="navbar__item"><a href="https://github.com/Ankia-Fuls" class="navbar__link">About</a></li>
                        <li class="navbar__item"><a href="https://github.com/Ankia-Fuls" class="navbar__link">Contact</a></li>
                    </ul>
                </div>
            </nav>

            {/* Shopping cart and profile button */}
            <div className="navbar__personal">
                <button id="cart-btn-open" className="navbar__cart-btn">
                    <img src="./images/icon-cart.svg" alt=""></img>
                </button>
                <button id="profile" className="navbar__profile">
                    <img src="./images/image-avatar.png" alt=""></img>
                </button>
            </div>
        </header>
    );
}

export default Header;