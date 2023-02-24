/** @format */

import React from "react";

import styles from "./../assets/ImageGrid.module.css";
import { itemData } from "./../assets/data";

const Images = ({ images }) => {
  const photos = itemData;
  // const countFrom = 2;
  const imageToshow = [...photos];
  const len = imageToshow.length;
  // const overlay = "";

  // const renderCountOverlay = (more) => {
  //   const extra = len - (countFrom && countFrom > 5 ? 5 : countFrom);

  //   return [
  //     more && <div key="count" className={`${styles.cover}`}></div>,
  //     more && (
  //       <div
  //         key="count-sub"
  //         className={`${styles.coverText}`}
  //         style={{ fontSize: "200%" }}>
  //         <p>+{extra}</p>
  //       </div>
  //     ),
  //   ];
  // };

  // const renderOverlay = (id) => {
  //   const hideOverlay = false;
  //   const overlayBackgroundColor = "#222222";

  //   if (hideOverlay) {
  //     return false;
  //   }

  //   return [
  //     <div
  //       key={`cover-${id}`}
  //       className={`${styles.cover} ${styles.slide}`}
  //       style={{ backgroundColor: overlayBackgroundColor }}></div>,
  //     <div
  //       key={`cover-text-${id}`}
  //       className={`${styles.coverText} ${styles.slide} ${styles.animateText} `}
  //       style={{ fontSize: "100%" }}>
  //       'preview image'
  //     </div>,
  //   ];
  // };

  if ([1, 2, 3].includes(len.length)) {
    return (
      <div className={styles.gridContainer}>console.log('render one')</div>
    );
  }
  if (len === 2) {
    return (
      <div className={styles.gridContainer}>console.log('render two')</div>
    );
  } else {
    //it is more than 2
    // const conditionalRender = len === 4 || len > 4;

    // const overlay =
    //   !countFrom ||
    //   countFrom > 5 ||
    //   (len > countFrom && [4, 5].includes(+countFrom));

    return "heo";
  }
};

export default Images;
