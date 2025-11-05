import { useState } from "react";

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
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    const [classnameList, setClassnameList] = useState([
        "gallery__thumbnail gallery__thumbnail--chosen", "gallery__thumbnail", "gallery__thumbnail", "gallery__thumbnail"
    ]);

    const updateClassnames = (selectedId) => {
        const tempArray = ["gallery__thumbnail", "gallery__thumbnail", "gallery__thumbnail", "gallery__thumbnail"];
        tempArray[selectedId] = "gallery__thumbnail gallery__thumbnail--chosen";
        setClassnameList(tempArray);
    }

    //Set large picture by clicking thumbnails
    const setChosenPicture = (e) => {
        const selectedId = e.target.id;
        setCurrentIndex(selectedId);
        updateClassnames(selectedId);

        // const allThumbnails = e.target.parentNode.parentNode.children;
        // for (let i = 0; i < 4; i++) {
        //     allThumbnails[i].children[0].className = "gallery__thumbnail";
        // }
        // e.target.className = "gallery__thumbnail gallery__thumbnail--chosen";
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

    const openLightbox = () => {
        setLightboxOpen(true);
    }

    const closeLightbox = (e) => {
        if (e.target.classList.contains("dismiss")) {
            setLightboxOpen(false);
        }
    }

    return (
        <>
            <main inert={pageInert}>
                <section className="gallery" inert={lightboxOpen}>
                    <div className="gallery__main">
                        <img src={images[currentIndex].src} alt={images[currentIndex].alt} onClick={openLightbox} />
                        <button className="navigation_button navigation_button--left" onClick={prevImg} >
                            <img src="./images/icon-previous.svg" alt="" />
                        </button>
                        <button className="navigation_button navigation_button--right" onClick={nextImg}>
                            <img src="./images/icon-next.svg" alt="" />
                        </button>
                    </div>
                    <div className="gallery__previews">
                        {images.map((item, index) => (
                            <div key={index} className="thumbnail_container">
                                <img
                                    src={item.src} alt={item.alt} id={index}
                                    className={classnameList[index]}
                                    onClick={(e) => { setChosenPicture(e) }}
                                ></img>
                            </div>
                        )
                        )}
                    </div>
                </section>

                {lightboxOpen && (

                    <aside className="lightbox dismiss" onClick={closeLightbox}>
                        <div className="lightbox__main">
                            <button className="lightbox__dismiss dismiss" onClick={closeLightbox}>
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
                            {images.map((item, index) => (
                                <div key={index} className="thumbnail_container" >
                                    <img
                                        src={item.src} alt={item.alt} id={index}
                                        className={classnameList[index]}
                                        onClick={(e) => { setChosenPicture(e) }}
                                    />
                                </div>
                            )
                            )}
                        </div>
                    </aside>
                )}

                <section>
                    <h1>Sneaker Company</h1>
                    <h2>Fall Limited Edition Sneakers</h2>
                    <p>These low-profile sneakers are your perfect casual wear companion. Featuring a
                        durable rubber outer sole, they’ll withstand everything the weather can offer.</p>
                    <span> $125.00
                        50%
                        $250.00</span>
                    <span>0
                        Add to cart</span>
                </section>

            </main>

        </>
    );
}

export default Main;