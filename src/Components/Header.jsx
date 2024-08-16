import React, { useEffect, useRef } from "react";
import "../CSS/slider.css";

function Header() {
  // Refs to DOM elements
  const parentRef = useRef(null);
  const topPanelRef = useRef(null);
  const handleRef = useRef(null);

  useEffect(() => {
    const parent = parentRef.current;
    const topPanel = topPanelRef.current;
    const handle = handleRef.current;
    let skewHack = 0;
    let delta = 0;

    if (parent.className.indexOf('skewed') !== -1) {
      skewHack = 1000;
    }

    const onMouseMove = (event) => {
      delta = (event.clientX - window.innerWidth / 2) * 0.5;
      handle.style.left = event.clientX + delta + 'px';
      topPanel.style.width = event.clientX + skewHack + delta + 'px';
    };

    parent.addEventListener('mousemove', onMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      parent.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <h1 className="center heading">Home</h1>
      <div ref={parentRef} className="splitview skewed">
        <div className="panel bottom">
          <div className="content">
            <div className="description">
              <h1>Image Editor</h1>
              <p>Discover the Magic of Image Editing: Elevate Your Visual Creations Today!</p>
            </div>
            <img src="../../public/cannyai.jpg" alt="Original" />
          </div>
        </div>

        <div ref={topPanelRef} className="panel top">
          <div className="content">
            <div className="description">
              <h1>Image AI</h1>
              <p>Transform Your Images into Masterpieces: Unleash Your Creativity with Our Powerful Editing Tools!</p>
            </div>
            <img src="../../public/logoai.webp" alt="Duotone" />
          </div>
        </div>

        <div ref={handleRef} className="handle"></div>
      </div>
    </>
  );
}

export default Header;
