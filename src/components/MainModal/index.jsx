import React from "react";
import { Pagination, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import { baseURL } from "../../services/api";
import { useMap } from "../../contexts/Map";
import useWindowSize from "../../hooks/useWindowSize";

export default function MainModal() {
  const { defaultPlace, currentPlace, setCurrentPlace } = useMap();
  const [width] = useWindowSize();

  const handleHided = (index, video) => {
    const media = document.querySelector(`#${video ? "video" : "img"}${index}`);
    const spinner = document.querySelector(
      `#${video ? "video" : "img"}Spinner${index}`
    );
    media.classList.toggle("hide");
    spinner.classList.toggle("hide");
  };

  const handleClose = () => {
    setCurrentPlace(defaultPlace);
  };

  //   const handleMuted = (index) => {
  //     const video = document.querySelector(`#video${index}`);
  //     video.muted = !video.muted;
  //   };

  return (
    <div
      className="modal fade"
      id="main-staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="main-staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="main-staticBackdropLabel">
              <img
                src={`${baseURL}/files/icons/id/${currentPlace.icon.file}`}
                alt=""
              />
              {currentPlace.name}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            />
          </div>

          <div className="modal-body">
            <Swiper
              slidesPerView={width > 991 ? 3 : 1}
              spaceBetween={15}
              centeredSlides={true}
              freeMode={true}
              modules={[Pagination, FreeMode]}
              grabCursor={true}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
            >
              {currentPlace.images.map((image, index) => (
                <SwiperSlide key={uuidv4()}>
                  <div
                    id={`imgSpinner${index}`}
                    className="spinner-border text-primary"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <img
                    id={`img${index}`}
                    className="hide"
                    src={`${baseURL}/files/images/id/${image}`}
                    alt=""
                    onLoad={() => handleHided(index)}
                  />
                </SwiperSlide>
              ))}
              {/* {currentPlace.videos.map((video, index) => (
                <SwiperSlide key={uuidv4()}>
                  <div
                    id={`videoSpinner${index}`}
                    class="spinner-border text-primary"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <video
                    autoPlay
                    loop
                    muted
                    id={`video${index}`}
                    onClick={() => handleMuted(index)}
                    className="hide"
                    onLoadedData={() => handleHided(index, true)}
                  >
                    <source
                      src={`${baseURL}/files/videos/id/${video}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </SwiperSlide>
              ))} */}
            </Swiper>
            <div
              className={
                currentPlace.title || currentPlace.text ? "modal-text" : ""
              }
            >
              {currentPlace.title && <h1>{currentPlace.title}</h1>}
              {currentPlace.text && <p>{currentPlace.text}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
