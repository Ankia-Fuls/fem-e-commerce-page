# Frontend Mentor - E-commerce product page solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it

### Screenshot

![Completed Design Screenshot](design\Completed.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- SASS Styling
- Redux

### What I learned

I learned how to create a lightbox component using React. I also learned a bit about accessibility with lightboxes and about making sections inert when they are not supposed to be accessible to prevent people from tabbing to hidden components. I did this by setting the inert property based on flags for when the lightbox or menu was open or closed.

I also learned how to allow users to close the lightbox and the menu using the escape key instead of having to use the button. The code can be seen bellow.

```
```js

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

```

### Continued development

I would like to add a functionality to the gallery in the future where you can swipe the images to move to the next one. I would also like to continue my learning on how to make websites more accessible.

### Useful resources

- [Coder Coder YouTube video](https://www.youtube.com/watch?v=pBv7igaxfQE) - This video guided me along how to create accessible hamburger menus
- [MatchMedia for ReactJS](https://medium.com/better-programming/using-window-matchmedia-in-react-8116eada2588) - This helped me adapt the way match media worked in basic JS to react to update the code based on screen width.
- [Grey-out transition](https://dev.to/nicm42/fading-in-and-fading-out-with-css-transitions-3lc1) - This helped show how to toggle visibility with an animated effect for the grey-out behind the menu.
- [Color filter](https://angel-rs.github.io/css-color-filter-generator/) - This helped me find the desired color filter to change the color of the svg to the desired color
- [Event keys in React](https://stackoverflow.com/questions/27827234/how-to-handle-the-onkeypress-event-in-reactjs) - This helped me see how to handle event keys and keydown events in React to add accessibility to the lightbox photos.
- [Using escape to close modal](https://medium.com/@priyaeswaran/beginners-guide-to-closing-a-modal-in-react-on-outside-click-and-escape-keypress-9812b1d48b84) - This helped show me how to set up event listeners for a modal to close it with the escape key.
- [Return focus](https://dev.to/samabaasi/mastering-useref-why-it-doesnt-trigger-re-renders-and-how-it-persists-across-re-renders-1l2b) - This showed me how to use useRef to set reference points to reset focus on closing the modal

## Author

- Frontend Mentor - [@Ankia-Fuls](https://www.frontendmentor.io/profile/Ankia-Fuls)
- GitHub - [@Ankia-Fuls](https://github.com/Ankia-Fuls)

