/** @format */

import * as React from "react";
import styles from "./../assets/ImageGrid.module.css";
import Modal from "./lightModal";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Gridview = (props) => {
  const theme = useTheme();
  const ismatch = useMediaQuery(theme.breakpoints.up("md"));
  const { images } = props;
  // console.log(images[0]);
  const showImags = [...images];
  const [modal, setModal] = React.useState(false);
  const [index, setIndex] = React.useState("0");
  const [url, setUrl] = React.useState("");
  const len = showImags.length;

  function onClose() {
    setModal(false);
  }

  function openModal(index) {
    setModal(true);
    setIndex(index);
    setUrl(images[index]);
  }
  if (len === 1) {
    return (
      <div>
        <div className={styles.imgGrid} style={{ "--num-cols": 1 }}>
          <div
            onClick={() => openModal(0)}
            style={{ backgroundImage: `url(${images[0]})` }}></div>

          {modal && (
            <Modal onClose={() => onClose()} index={index} images={images} />
          )}
        </div>
      </div>
    );
  }

  if (len === 2) {
    return (
      <div className={styles.imgGrid} style={{ "--num-cols": ismatch ? 2 : 1 }}>
        <div
          onClick={() => openModal(0)}
          className={`${styles.imgGridcol2} ${styles.imgGridrow2}`}
          style={{ backgroundImage: `url(${images[0]})` }}></div>

        <div
          onClick={() => openModal(1)}
          className={`${styles.imgGridcol2} ${styles.imgGridrow2}`}
          style={{ backgroundImage: `url(${images[1]})` }}></div>
        {modal && (
          <Modal onClose={() => onClose()} index={index} images={images} />
        )}
      </div>
    );
  }

  if (len === 3) {
    return (
      <div className={styles.imgGrid}>
        <div
          onClick={() => openModal(0)}
          className={`${styles.imgGridcol2} ${styles.imgGridrow2}`}
          style={{ backgroundImage: `url(${images[0]})` }}></div>

        <div
          onClick={() => openModal(1)}
          style={{ backgroundImage: `url(${images[1]})` }}></div>

        <div
          onClick={() => openModal(2)}
          style={{ backgroundImage: `url(${images[2]})` }}>
          {/* <div className={`${styles.cover}`}>
            <div
              key='count-sub'
              className={`${styles.coverText}`}
              style={{ fontSize: '200%' }}
            >
              <p>+3</p>
            </div>
          </div> */}
        </div>
        {modal && (
          <Modal onClose={() => onClose()} index={index} images={images} />
        )}
      </div>
    );
  }

  if (len === 4) {
    return (
      <div className={styles.imgGrid} style={{ "--num-cols": 2 }}>
        <div
          onClick={() => openModal(0)}
          style={{ backgroundImage: `url(${images[0]})` }}></div>

        <div
          onClick={() => openModal(1)}
          style={{ backgroundImage: `url(${images[1]})` }}></div>

        <div
          onClick={() => openModal(2)}
          style={{ backgroundImage: `url(${images[2]})` }}></div>
        <div
          onClick={() => openModal(3)}
          style={{ backgroundImage: `url(${images[3]})` }}>
          {/* <div className={`${styles.cover}`}>
            <div
              key='count-sub'
              className={`${styles.coverText}`}
              style={{ fontSize: '200%' }}
            >
              <p>+3</p>
            </div>
          </div> */}
        </div>
        {modal && (
          <Modal onClose={() => onClose()} index={index} images={images} />
        )}
      </div>
    );
  }

  if (len > 4) {
    return (
      <div className={styles.imgGrid}>
        <div
          onClick={() => openModal(0)}
          className={`${styles.imgGridcol2} ${styles.imgGridrow2}`}
          style={{ backgroundImage: `url(${images[0]})` }}></div>
        <div
          onClick={() => openModal(1)}
          style={{ backgroundImage: `url(${images[1]})` }}></div>
        <div
          onClick={() => openModal(2)}
          style={{ backgroundImage: `url(${images[2]})` }}>
          <div className={`${styles.cover}`}>
            <div
              key="count-sub"
              className={`${styles.coverText}`}
              style={{ fontSize: "200%" }}>
              <p>+3</p>
            </div>
          </div>
        </div>
        {modal && (
          <Modal onClose={() => onClose()} index={index} images={images} />
        )}
      </div>
    );
  }
  // return (
  //   <div className={styles.imgGrid}>
  //     <div
  //       className={`${styles.imgGridcol2} ${styles.imgGridrow2}`}
  //       style={{ backgroundImage: `url(${images[0]})` }}
  //     ></div>

  //     <div style={{ backgroundImage: `url(${images[0]})` }}></div>

  //     <div style={{ backgroundImage: `url(${images[0]})` }}>
  //       <div className={`${styles.cover}`}>
  //         <div
  //           key='count-sub'
  //           className={`${styles.coverText}`}
  //           style={{ fontSize: '200%' }}
  //         >
  //           <p>+3</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
};

export default Gridview;
