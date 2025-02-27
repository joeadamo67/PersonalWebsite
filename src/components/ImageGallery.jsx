import React, { useState } from 'react';
import '../assets/styles/image-gallery.css';

// Import the provided images (assuming you've saved them with these names)
import cloudSunsetImage from '../assets/images/cloud-sunset.jpg'; // Image 1
import moonImage from '../assets/images/moon.jpg'; // Image 2
import pinkCloudsImage from '../assets/images/pink-clouds.jpg'; // Image 3
import forestPathImage from '../assets/images/forest-path.jpg'; // Image 4
import backyardImage from '../assets/images/backyard.jpg'; // Image 5

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Gallery images array
  const galleryImages = [
    {
      id: 1,
      src: cloudSunsetImage,
      alt: 'Sunset with clouds on the horizon',
      title: 'Sunset Clouds',
      description: 'A beautiful sunset with dark clouds on the horizon.'
    },
    {
      id: 2,
      src: moonImage,
      alt: 'Half-moon in a bright blue sky',
      title: 'Daylight Moon',
      description: 'The moon visible during daylight hours against a deep blue sky.'
    },
    {
      id: 3,
      src: pinkCloudsImage,
      alt: 'Pink and orange clouds at sunset',
      title: 'Pink Sunset',
      description: 'Vibrant pink and orange clouds painted by the setting sun.'
    },
    {
      id: 4,
      src: forestPathImage,
      alt: 'Dirt road through a pine forest',
      title: 'Forest Path',
      description: 'A peaceful path winding through a dense pine forest.'
    },
    {
      id: 5,
      src: backyardImage,
      alt: 'Sunlight through trees in a backyard',
      title: 'Sunlit Garden',
      description: 'Morning sunlight streaming through trees in a tranquil garden.'
    }
  ];
  
  // Open image modal
  const openModal = (image) => {
    setSelectedImage(image);
    document.body.classList.add('modal-open');
  };
  
  // Close image modal
  const closeModal = () => {
    setSelectedImage(null);
    document.body.classList.remove('modal-open');
  };
  
  return (
    <div className="image-gallery">
      <div className="gallery-grid">
        {galleryImages.map((image) => (
          <div 
            key={image.id} 
            className="gallery-item"
            onClick={() => openModal(image)}
          >
            <img src={image.src} alt={image.alt} />
            <div className="gallery-item-overlay">
              <h3>{image.title}</h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>&times;</button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="modal-image" 
            />
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;