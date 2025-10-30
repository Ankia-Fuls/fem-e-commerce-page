import React, { useState, useEffect } from 'react';


function Header() {

    const [openButtonExpanded, setOpenButtonExpanded] = useState(false);
    const [navMenuInert, setNavMenuInert] = useState(false);
    const [menuTransition, setMenuTransition] = useState(true);
    const [greyOut, setGreyOut] = useState(false);

    const closeMenuBtn = document.getElementById("btnClose");
    const openMenuBtn = document.getElementById("btnOpen");

    const openMenu = () => {
        setOpenButtonExpanded(true);
        setNavMenuInert(false);
        setMenuTransition(false);

        closeMenuBtn.focus();

        setGreyOut(true);

    }

    const closeMenu = () => {
        setOpenButtonExpanded(false);
        setNavMenuInert(true);

        setTimeout(() => {
            setMenuTransition(true);
        }, 500);

        openMenuBtn.focus();

        setGreyOut(false);
    }


    //SCREEN SIZE WATCHER, UPDATES
    const [isNarrowScreen, setIsNarrowScreen] = useState(false);

    useEffect(() => {
        // set initial value
        const mediaWatcher = window.matchMedia("(width<600px)")
        setIsNarrowScreen(mediaWatcher.matches);

        //watch for updates
        function updateIsNarrowScreen(e) {
            setIsNarrowScreen(e.matches);
        }
        mediaWatcher.addEventListener('change', updateIsNarrowScreen)

        // clean up after ourselves
        return function cleanup() {
            mediaWatcher.removeEventListener('change', updateIsNarrowScreen)
        }
    });

    useEffect(() => {
        if (isNarrowScreen) {
            setNavMenuInert(true);
            setMenuTransition(true);
        }
        else {
            setNavMenuInert(false);
        }
    }
        , [isNarrowScreen])


    return (
        <header className="navbar">
            <nav>
                <div class={greyOut ? "grey-out grey-out--shown" : "grey-out"} aria-hidden="true"></div>

                <div className='navbar__container'>
                    <img src="./images/logo.svg" alt="Stylized text saying 'Sneackers', the company logo." className='navbar__logo'></img>

                    <span id="nav-label" hidden>Navigation</span>

                    {/* The button for when the mobile menu is open */}
                    <button id="btnOpen" className="navbar__open" aria-expanded={openButtonExpanded} aria-labelledby="nav-label" onClick={openMenu}>
                        <img src="./images/icon-menu.svg" alt="" />
                    </button>

                    {/* Menu, shown for both mobile and desktop */}
                    <div className="navbar__menu" role="dialog" aria-labelledby="nav-label" inert={navMenuInert} style={{ transition: menuTransition ? "none" : "" }}>
                        {/* Button hidden for desktop, shown on mobile */}
                        <button id="btnClose" className="navbar__close" aria-label="Close" onClick={closeMenu}>
                            <img src="./images/icon-close.svg" alt="" />
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