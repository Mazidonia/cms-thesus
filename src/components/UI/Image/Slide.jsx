import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Skeleton from "@mui/material/Skeleton";

const ImageSlide = (props) => {
  const { images, isLoading } = props;

  if (isLoading)
    return (
      <div>
        <Skeleton animation="wave" /> <Skeleton animation="wave" />
      </div>
    );

  return (
    <ImageGallery
      items={images.map((item) => {
        return {
          original: `https://coursess.pcru.ac.th/api-courses/Image/ImageSlide/${item.id}/${item.images_slide_name}`,
        };
      })}
      showThumbnails={false}
      showFullscreenButton={false}
      showPlayButton={false}
      showBullets={true}
    />
  );
};

export default ImageSlide;
