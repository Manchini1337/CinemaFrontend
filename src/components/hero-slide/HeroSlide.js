import React, { useEffect, useRef, useState } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api/axios.interceptor';

import './heroslide.scss';

const HeroSlide = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api
      .get('/movies')
      .then((res) => {
        setMovies(res.data.slice(0, 3));
      })
      .catch((err) => console.log(err));
  }, []);

  SwiperCore.use([Autoplay]);

  return (
    <div className='hero-slide'>
      <Swiper
        modules={Autoplay}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
      >
        {movies.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? 'active' : ''}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movies.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props) => {
  let navigate = useNavigate();
  const item = props.item;

  const urlCode = item.trailerUrl.slice(32);

  const setModalActive = () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    const videoSrc = 'https://www.youtube.com/embed/' + urlCode;
    modal
      .querySelector('.modal__content > iframe')
      .setAttribute('src', videoSrc);

    modal.classList.toggle('active');
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${props.item.background})` }}
    >
      <div className='hero-slide__item__content container'>
        <div className='hero-slide__item__content__info'>
          <h2 className='title'>{item.name}</h2>
          <div className='overview'>{item.description}</div>
          <div className='btns'>
            <Button
              onClick={() => navigate('/movie/' + item.id, { state: item.id })}
            >
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className='hero-slide__item__content__poster'>
          <img src={item.poster} alt='poster' />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute('src', '');

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width='100%'
          height='500px'
          title='trailer'
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
