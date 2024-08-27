import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import axios from 'axios';

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const createImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // Avoid cross-origin issues
      image.src = url;
    });
  };

  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      resolve(blob);
    }, 'image/png'); // Ensure the file is saved as PNG
  });
};

const CropperComponent = ({ imageSrc, onCropped , setimagepath }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    console.log("Crop completed");
    showCroppedImage();
  }, [croppedAreaPixels]);

  const showCroppedImage = useCallback(async () => {
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);

      // Create a FormData object to send the image to the server
      const formData = new FormData();
      formData.append('file', blob, 'output.png');

      // POST the image to your server
      await axios.post('http://127.0.0.1:5000/saveCroppedImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image saved successfully');
      onCropped('Image saved successfully');
      const timestamp = new Date().getTime(); 
      setimagepath(`/Output/output.png?t=${timestamp}`);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imageSrc, onCropped]);

  return (
    <div>
      <div className="border bg-gray-100">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          // aspect={4 / 3} // Customize the aspect ratio as needed
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
    </div>
  );
};

export default CropperComponent;
