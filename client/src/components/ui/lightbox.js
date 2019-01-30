import React, { Component } from 'react';
import Lightbox from 'react-images';

export default class ImageLightbox extends Component {
  state = {
    isOpen: true,
    currentImage: this.props.pos,
    images: [],
  };

  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      const images = [];
      props.images.forEach(element => {
        images.push({ src: element });
      });

      return (state = {
        images,
      });
    }
    return false;
  }

  closeLightbox = () => {
    this.props.onClose();
  };

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  };

  onClickNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  };

  render() {
    return (
      <Lightbox
        currentImage={this.state.currentImage}
        images={this.state.images}
        isOpen={this.state.isOpen}
        onClickPrev={() => this.gotoPrevious()}
        onClickNext={() => this.onClickNext()}
        onClose={() => this.closeLightbox()}
      />
    );
  }
}
