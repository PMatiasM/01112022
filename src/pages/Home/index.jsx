import React from "react";
import Typewriter from "typewriter-effect";
import { Fade } from "react-reveal";
import useTitle from "../../hooks/useTitle";
import vert from "../../assets/vert.jpg";
import hor1 from "../../assets/hor1.jpg";
import hor2 from "../../assets/hor2.jpg";
import hor3 from "../../assets/hor3.jpg";
import hor4 from "../../assets/hor4.jpeg";
import hor5 from "../../assets/hor5.jpg";
import imgCover from "../../assets/imageCover.jpeg";

import "./style.css";

export default function Home() {
  useTitle("Home");
  return (
    <div id="homePage">
      <div className="imageCover">
        <img src={imgCover} alt="" />
      </div>
      <div className="imageDiv">
        <Fade left>
          <img id="img1" src={vert} alt="" />
        </Fade>
        <Fade top>
          <img id="img2" src={hor1} alt="" />
        </Fade>
        <Fade right>
          <img id="img3" src={hor2} alt="" />
        </Fade>
        <Fade left>
          <img id="img4" src={hor3} alt="" />
        </Fade>
        <Fade bottom>
          <img id="img5" src={hor4} alt="" />
        </Fade>
        <Fade right>
          <img id="img6" src={hor5} alt="" />
        </Fade>
      </div>
      <div className="mainText">
        <Fade top>
          <div className="h1Wrapper">
            Uma singela homenagem a você,
            <Typewriter
              options={{
                strings: [
                  " Lorena",
                  " meu bem",
                  " enjoo",
                  " <span style='color:#ba0001'>meu amor</span>",
                  " chata",
                  " bb",
                  " <span style='color:#ff97a9'>porquinha</span>",
                ],
                autoStart: true,
                loop: true,
                delay: 65,
              }}
            />
          </div>
          <div className="buttonWrapper">
            <a href="/map" className="primary-button">
              Encontre um lugar{/*Descubra um lugar*/}
            </a>
          </div>
        </Fade>
      </div>
    </div>
  );
}
