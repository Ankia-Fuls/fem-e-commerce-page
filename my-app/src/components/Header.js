import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/cartSlice";


function Header({ pageInert, setPageInert, lightboxOpen }) {

    // START OF NAVBAR CODING

    const [openButtonExpanded, setOpenButtonExpanded] = useState(false);
    const [navMenuInert, setNavMenuInert] = useState(false);
    const [menuTransition, setMenuTransition] = useState(true);
    const [greyOut, setGreyOut] = useState(false);

    const focusOpen = useRef();
    const focusClose = useRef();

    const openMenu = () => {
        setOpenButtonExpanded(true);
        setNavMenuInert(false);
        setMenuTransition(false);

        setTimeout(() => {
            focusClose.current.focus();
        }, 500);


        setGreyOut(true);
        setPageInert(true);

    }

    const closeMenu = () => {
        setOpenButtonExpanded(false);
        setNavMenuInert(true);

        setTimeout(() => {
            setMenuTransition(true);
        }, 500);

        focusOpen.current.focus();

        setGreyOut(false);
        setPageInert(false);
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                closeMenu();
            }
        };

        if (!navMenuInert) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [navMenuInert, closeMenu]);

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


    // START OF SHOPPING CART CODE

    const [cartOpen, setCartOpen] = useState(false);

    const toggleCart = () => {
        if (cartOpen) {
            setCartOpen(false);
        }
        else {
            setCartOpen(true);
        }
    }

    const cartValue = useSelector(state => state.cart);

    const dispatch = useDispatch();
    const clearCart = () => {
        dispatch(remove());
    }


    return (
        <header className="navbar" inert={lightboxOpen}>
            <nav>
                <div class={greyOut ? "grey-out grey-out--shown" : "grey-out"} aria-hidden="true"></div>

                <div className='navbar__container'>
                    <img src="./images/logo.svg" alt="Stylized text saying 'Sneackers', the company logo." className='navbar__logo'></img>

                    <span id="nav-label" hidden>Navigation</span>

                    {/* The button for when the mobile menu is open */}
                    <button id="btnOpen" className="navbar__open" aria-expanded={openButtonExpanded} aria-labelledby="nav-label" onClick={openMenu} ref={focusOpen}>
                        <img src="./images/icon-menu.svg" alt="" />
                    </button>

                    {/* Menu, shown for both mobile and desktop */}
                    <div className="navbar__menu" role="dialog" aria-labelledby="nav-label" inert={navMenuInert} style={{ transition: menuTransition ? "none" : "" }}>
                        {/* Button hidden for desktop, shown on mobile */}
                        <button id="btnClose" className="navbar__close" aria-label="Close" onClick={closeMenu} ref={focusClose}>
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
            <div className="navbar__personal" inert={pageInert}>
                <button id="cart-btn-open" className="navbar__cart-btn" aria-label={cartOpen ? "Close shopping cart." : "Open shopping cart."} onClick={toggleCart}>
                    <img src="./images/icon-cart.svg" alt=""></img>
                </button>
                <button id="profile" className="navbar__profile" aria-label='Open user profile'>
                    <img src="./images/image-avatar.png" alt=""></img>
                </button>
                {/* Open cart */}
                <div className={cartOpen ? "cart cart--open" : "cart"}>
                    <h2 className='cart__heading'>Cart</h2>
                    <div className='cart__divider'></div>
                    {cartValue > 0 ? (
                        <div className='cart__container'>
                            <div className='cart__content'>
                                <img className='cart__image' src='./images/image-product-1-thumbnail.jpg' alt='' />
                                <div className='cart__text'>
                                    <p>Fall Limited Edition Sneakers</p>
                                    <p>&#36;125.00 x {cartValue} <span className='cart__text--bold'>&#36;{cartValue * 125}.00</span></p>
                                </div>
                                <button className='cart__delete' onClick={clearCart}>
                                    <img src='./images/icon-delete.svg' alt='' />
                                </button>
                            </div>
                            <button className='cart__checkout'>Checkout</button>
                        </div>
                    ) : (
                        <p className='cart__empty'>Your cart is empty.</p>
                    )}

                </div>
            </div>
        </header >
    );
}

export default Header;