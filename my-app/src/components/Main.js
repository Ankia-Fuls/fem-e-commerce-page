import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../store/cartSlice";

function Main({ pageInert, setPageInert, lightboxOpen, setLightboxOpen }) {

    const images = [
        {
            id: 0,
            src: "./images/image-product-1.jpg",
            alt: "First image of the product"
        },
        {
            id: 1,
            src: "./images/image-product-2.jpg",
            alt: "Second image of the product"
        },
        {
            id: 2,
            src: "./images/image-product-3.jpg",
            alt: "Third image of the product"
        },
        {
            id: 3,
            src: "./images/image-product-4.jpg",
            alt: "Fourth image of the product"
        }
    ];
    const thumbnails = [
        {
            id: 0,
            src: "./images/image-product-1-thumbnail.jpg",
            alt: "First image of the product"
        },
        {
            id: 1,
            src: "./images/image-product-2-thumbnail.jpg",
            alt: "Second image of the product"
        },
        {
            id: 2,
            src: "./images/image-product-3-thumbnail.jpg",
            alt: "Third image of the product"
        },
        {
            id: 3,
            src: "./images/image-product-4-thumbnail.jpg",
            alt: "Fourth image of the product"
        }
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [classnameList, setClassnameList] = useState([
        "gallery__thumbnail gallery__thumbnail--chosen", "gallery__thumbnail", "gallery__thumbnail", "gallery__thumbnail"
    ]);


    //Update class names of thumbnails based on navigation
    const updateClassnames = (selectedId) => {
        const tempArray = ["gallery__thumbnail", "gallery__thumbnail", "gallery__thumbnail", "gallery__thumbnail"];
        tempArray[selectedId] = "gallery__thumbnail gallery__thumbnail--chosen";
        setClassnameList(tempArray);
        return;
    }

    //Set large picture by clicking thumbnails
    const setChosenPicture = (e) => {
        const selectedId = parseInt(e.target.id);
        setCurrentIndex(selectedId);
        updateClassnames(selectedId);
    }

    //Button controls
    const nextImg = () => {
        const totalLength = images.length;

        if (currentIndex + 1 >= totalLength) {
            setCurrentIndex(0);
            updateClassnames(0);
        }
        else {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            updateClassnames(newIndex);
        }
    }

    const prevImg = () => {
        const totalLength = images.length;

        if (currentIndex === 0) {
            const newIndex = totalLength - 1;
            setCurrentIndex(newIndex);
            updateClassnames(newIndex);
        }
        else {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            updateClassnames(newIndex);
        }

    }

    const openLightbox = (e) => {
        setLightboxOpen(true);
    }

    const closeLightbox = (e) => {
        if (e.target.classList.contains("dismiss")) {
            setLightboxOpen(false);
        }
        setTimeout(() => {
            focusElement.current.focus();
        }, 100);
    }

    const focusElement = useRef();

    //Close modal with escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setLightboxOpen(false);
                setTimeout(() => {
                    focusElement.current.focus();
                }, 100);
            }
        };

        if (lightboxOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [lightboxOpen, setLightboxOpen]);


    // REDUX STUFF
    const [cartValue, setCartValue] = useState(0);
    const dispatch = useDispatch();

    const increaseCount = () => {
        //+ button
        const temp = cartValue + 1;
        setCartValue(temp);
    }

    const decreaseCount = () => {
        //- button
        const temp = cartValue - 1;
        if (temp < 0) {
            setCartValue(0);
        }
        else {
            setCartValue(temp);
        }
    }

    const updateCart = (value) => {
        //submit function
        dispatch(add(cartValue));
    }


    return (
        <>
            <main inert={pageInert}>
                <section className="gallery" inert={lightboxOpen} aria-labelledby="gallery-heading">
                    <h1 id="gallery-heading" hidden >Gallery</h1>
                    <div className="gallery__main">
                        <img
                            src={images[currentIndex].src} alt={images[currentIndex].alt}
                            onClick={(e) => openLightbox(e)}
                            ref={focusElement}
                            role="button" tabindex="0"
                            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { openLightbox(e) } }} />
                        <button className="navigation_button navigation_button--left" onClick={prevImg}>
                            <img src="./images/icon-previous.svg" alt="" />
                        </button>
                        <button className="navigation_button navigation_button--right" onClick={nextImg}>
                            <img src="./images/icon-next.svg" alt="" />
                        </button>
                    </div>
                    <div className="gallery__previews">
                        {thumbnails.map((item, index) => (
                            <div key={index} className="thumbnail_container">
                                <img
                                    src={item.src} alt={item.alt} id={index}
                                    className={classnameList[index]}
                                    onClick={(e) => { setChosenPicture(e) }}
                                    role="button" tabindex="0" aria-label="expand image into lightbox view"
                                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { setChosenPicture(e) } }}
                                ></img>
                            </div>
                        )
                        )}
                    </div>
                </section>

                {lightboxOpen && (

                    <aside className="lightbox dismiss" role="dialog"
                        aria-modal="true" onClick={closeLightbox}>
                        <div className="lightbox__main">
                            <button className="lightbox__dismiss dismiss" onClick={closeLightbox} autoFocus>
                                <img src="./images/icon-close.svg" alt="" className="dismiss" />
                            </button>
                            <img src={images[currentIndex].src} alt={images[currentIndex].alt} />
                            <button className="navigation_button-lightbox navigation_button-lightbox--left" onClick={prevImg} >
                                <img src="./images/icon-previous.svg" alt="" />
                            </button>
                            <button className="navigation_button-lightbox navigation_button-lightbox--right" onClick={nextImg}>
                                <img src="./images/icon-next.svg" alt="" />
                            </button>
                        </div>
                        <div className="lightbox__previews">
                            {thumbnails.map((item, index) => (
                                <div key={index} className="thumbnail_container" >
                                    <img
                                        src={item.src} alt={item.alt} id={index}
                                        className={classnameList[index]}
                                        onClick={(e) => { setChosenPicture(e) }}
                                        role="button" tabindex="0" aria-label="expand image into lightbox view"
                                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { setChosenPicture(e) } }}
                                    />
                                </div>
                            )
                            )}
                        </div>
                    </aside>
                )}

                <section aria-labelledby="product-details" className="product" inert={lightboxOpen}>
                    <h2 className="product__brand">Sneaker Company</h2>
                    <h1 id="product-details" className="product__name">Fall Limited Edition Sneakers</h1>
                    <p className="product__description">These low-profile sneakers are your perfect casual wear companion. Featuring a
                        durable rubber outer sole, they’ll withstand everything the weather can offer.</p>
                    <div className="product__price" >
                        <p className="product__price--current">$125.00 <span className="product__price--discount">50%</span></p>
                        <p className="product__price--old">$250.00</p>
                    </div>
                    <div className="product__container">
                        <div className="product__cart-container">
                            <button className="product__button" onClick={decreaseCount}>
                                <img src="./images/icon-minus.svg" alt="" />
                            </button>
                            <span className="product__amount">{cartValue}</span>
                            <button className="product__button" onClick={increaseCount}>
                                <img src="./images/icon-plus.svg" alt="" />
                            </button>
                        </div>
                        <button className="product__add-to-cart" onClick={updateCart}>
                            <img src="./images/icon-cart.svg" alt="" />
                            Add to cart
                        </button>
                    </div>

                </section>

            </main>

        </>
    );
}

export default Main;