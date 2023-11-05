import React, { useState } from 'react';
import './img.css';  //import css file  
//import image path           
import yellow from '../../assets/yellow.png';
import cars from '../../assets/cars.png';
import coolcar from '../../assets/coolcar.png';
import watch from '../../assets/watch.png';
import key from '../../assets/key.png';
import speaker from '../../assets/speaker.png';
import pc from '../../assets/pc.png';
import car from '../../assets/car.png'

function ImageGallery() {
  const [selectedImages, setSelectedImages] = useState([]); //state variable
  const [images, setImages] = useState([
    { src: yellow, alt: 'Yellow', isLarger: true }, //making larger the first image of first row
    { src: coolcar, alt: 'Cool Car', isLarger: false },
    { src: watch, alt: 'Watch', isLarger: false },
    { src: car, alt: 'car', isLarger: false },
    { src: key, alt: 'Key', isLarger: false },
    { src: speaker, alt: 'Speaker', isLarger: false }, 
    { src: pc, alt: 'pc', isLarger: false },
    
  ]);


  //for selecting image
  const toggleSelected = (image) => {
    if (selectedImages.includes(image.src)) {
      setSelectedImages(selectedImages.filter((selectedImage) => selectedImage !== image.src));
    } else {
      setSelectedImages([...selectedImages, image.src]);
    }
  };


  //delet image
  const deleteSelectedImages = () => {
    const updatedImages = images.filter((image) => !selectedImages.includes(image.src));
    setImages(updatedImages);
    setSelectedImages([]);
  };


  //dragging image
  const handleDragStart = (e, draggedImage) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(draggedImage));
  };
   

  //drop image

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetImage) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const draggedImage = JSON.parse(data);

    const updatedImages = [...images];
    const draggedImageIndex = updatedImages.findIndex((image) => image.src === draggedImage.src);
    const targetImageIndex = updatedImages.findIndex((image) => image.src === targetImage.src);

    if (draggedImageIndex !== -1 && targetImageIndex !== -1) {
      const isLarger = targetImageIndex === 0 && targetImage.isLarger;

      updatedImages[draggedImageIndex].isLarger = isLarger;
      updatedImages[targetImageIndex].isLarger = draggedImageIndex === 0;

      [updatedImages[draggedImageIndex], updatedImages[targetImageIndex]] = [
        updatedImages[targetImageIndex],
        updatedImages[draggedImageIndex],
      ];

      setImages(updatedImages);
    }
  };


  return (
    <div className="wm">
      <div className="card">
        <div className="card-header"><b>Image Gallery</b></div>

        {/* add delete button */}
        <div className="card-body">
          {selectedImages.length > 0 && (
            <div className="delete-button">
              <button className="btn btn-outline-primary" onClick={deleteSelectedImages}>
                Delete Selected
              </button>
            </div>
          )}
          <div className="row mt-3">
            {images.slice(0, 3).map((image, index) => (
              <div
                key={image.src}
                className="col-md-4"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, image)}
              >
                <div
                  className={`card ${selectedImages.includes(image.src) ? 'selected' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, image)}
                >
                  <div className="position-relative">
                    <input
                      type="checkbox"
                      className="image-checkbox position-absolute top-0 start-0"
                      onChange={() => toggleSelected(image)}
                    />
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`card-img-top ${index === 0 ? 'larger' : ''}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-3">
            {images.slice(3).map((image) => (
              <div
                key={image.src}
                className="col-md-3"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, image)}
              >
                <div
                  className={`card ${selectedImages.includes(image.src) ? 'selected' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, image)}
                >
                  <div className="position-relative">
                    <input
                      type="checkbox"
                      className="image-checkbox position-absolute top-0 start-0"
                      onChange={() => toggleSelected(image)}
                    />
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`card-img-top ${image.isLarger ? 'larger' : ''}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;