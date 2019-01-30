import React from 'react';
import Slider from 'react-slick';
import { Button } from '../ui/button';

const HomeSlider = props => {
  const slides = [
    {
      img: 'images/featured/featured_home.jpg',
      lineOne: 'Fender',
      lineTwo: 'Custome shop',
      linkTitle: 'Shop now',
      linkTo: '/shop',
    },
    {
      img: 'images/featured/featured_home_2.jpg',
      lineOne: 'B-Stock',
      lineTwo: 'Awersome discounts',
      linkTitle: 'View offers',
      linkTo: '/shop',
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const generateSlides = slides => {
    return slides
      ? slides.map(item => (
          <div key={item.img}>
            <div
              className="featured_image"
              style={{
                background: `url(${item.img})`,
                height: `${window.innerHeight}px`,
              }}
            >
              <div className="featured_action">
                <div className="tag title">{item.lineOne}</div>
                <div className="tag low_title">{item.lineTwo}</div>
                <div>
                  <Button
                    type="default"
                    title={item.linkTitle}
                    linkTo={item.linkTo}
                    addStyles={{ margin: '10px 0 0 0' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      : null;
  };

  return (
    <div className="featured_container">
      <Slider {...settings}>{generateSlides(slides)}</Slider>
    </div>
  );
};

export default HomeSlider;
