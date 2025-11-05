import { useState } from "react";

function Main({ pageInert }) {

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

    const [clickedImg, setClickedImg] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    // const [lightboxOpen, setLightboxOpen] = useState(false);

    //Set large picture by clicking thumbnails
    const setChosenPicture = (e) => {
        const selectedId = e.target.id;
        setCurrentIndex(selectedId);

        const allThumbnails = e.target.parentNode.parentNode.children;
        for (let i = 0; i < 4; i++) {
            allThumbnails[i].children[0].className = "gallery__thumbnail";
        }
        e.target.className = "gallery__thumbnail gallery__thumbnail--chosen";
    }

    const nextImg = () => {
        const totalLength = images.length;

        if (currentIndex + 1 >= totalLength) {
            setCurrentIndex(0);
        }
        else {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
        }
    }

    const prevImg = () => {
        const totalLength = images.length;

        if (currentIndex === 0) {
            const newIndex = totalLength - 1;
            setCurrentIndex(newIndex);
        }
        else {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
        }

    }

    return (
        <main inert={pageInert}>

            <section className="gallery">
                <div className="gallery__main">
                    <img src={images[currentIndex].src} alt={images[currentIndex].alt} />
                    <button className="navigation_button navigation_button--left" onClick={prevImg}>
                        <img src="./images/icon-previous.svg" alt="" />
                    </button>
                    <button className="navigation_button navigation_button--right" onClick={nextImg}>
                        <img src="./images/icon-next.svg" alt="" />
                    </button>
                </div>
                <div className="gallery__previews">
                    {images.map((item, index) => (
                        <div key={index}>
                            <img
                                src={item.src} alt={item.alt} id={index}
                                className={currentIndex === index ? "gallery__thumbnail gallery__thumbnail--chosen" : "gallery__thumbnail"}
                                onClick={(e) => { setChosenPicture(e) }}
                            />
                        </div>
                    )
                    )}
                </div>
            </section>

            {/* Sneaker Company

            Fall Limited Edition Sneakers

            These low-profile sneakers are your perfect casual wear companion. Featuring a
            durable rubber outer sole, they’ll withstand everything the weather can offer.

            $125.00
            50%
            $250.00

            0
            Add to cart */}

        </main>
    );
}

export default Main;