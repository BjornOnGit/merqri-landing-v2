"use client"

import  { useState } from 'react';
import { images as initialImages } from '../constants/index';
import { motion } from 'framer-motion';

const PictureSlide = () => {
  const [images, setImages] = useState(initialImages);

  const handleImageClick = (clickedImageIndex) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      // Swap the image at index 2 with the clicked image
      [newImages[2], newImages[clickedImageIndex]] = [newImages[clickedImageIndex], newImages[2]];
      return newImages;
    });
  };

  return (
    <div className="flex justify-center space-x-0 py-8">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className={`flex-shrink-0 ${
            index === 2
              ? 'w-36 h-50 sm:w-80 sm:h-100'
              : index === 0 || index === 4
              ? 'w-14 h-30 mt-12 sm:w-40 sm:h-60 sm:mt-20'
              : 'w-16 h-40 mt-3 sm:w-60 sm:h-80 sm:mt-10'
          }`}
          onClick={() => handleImageClick(index)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="object-cover w-full h-full rounded-lg cursor-pointer border-secondary bottom-8"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default PictureSlide;
