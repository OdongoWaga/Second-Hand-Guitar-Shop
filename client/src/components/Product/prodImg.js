import React, { Component } from 'react';
import Lightbox from '../ui/lightbox';

export default class ProdImg extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: [],
  };

  componentDidMount = () => {
    if (this.props.detail.images.length) {
      let lightboxImages = [];
      this.props.detail.images.forEach(item => {
        lightboxImages.push(item.url);
      });

      this.setState({
        lightboxImages,
      });
    }
  };

  renderCartImage = images => {
    if (images.length) {
      return images[0].url;
    } else {
      const defaultImage = '/image_not_availble.png';
      return defaultImage;
    }
  };

  handleLightBox = pos => {
    if (this.state.lightboxImages.length) {
      this.setState({
        lightbox: true,
        imagePos: pos,
      });
    }
  };

  handleLightBoxClose = pos => {
    if (this.state.lightboxImages.length) {
      this.setState({
        lightbox: false,
      });
    }
  };

  showTumbs = () => {
    return this.state.lightboxImages.map((item, i) => {
      return i ? (
        <div
          className="thumb"
          style={{
            background: `url(${item}) no-repeat`,
          }}
          key={item}
          onClick={() => this.handleLightBox(i)}
        />
      ) : null;
    });
  };

  render() {
    const { detail } = this.props;
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.renderCartImage(
                detail.images
              )}) no-repeat`,
            }}
            onClick={() => this.handleLightBox(0)}
          />
        </div>
        <div className="main_thumbs">{this.showTumbs()}</div>
        {this.state.lightbox ? (
          <Lightbox
            id={detail.id}
            images={this.state.lightboxImages}
            open={this.state.open}
            pos={this.state.imagePos}
            onClose={() => this.handleLightBoxClose()}
          />
        ) : null}
      </div>
    );
  }
}
