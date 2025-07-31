import React, { useRef } from "react";
import "./../../css/Uploader.css";
import { showToast } from "../../utils/utils";
import { uploadImgProfile } from "../../core/services/userFetch";

const ImageUploader = ({
  maxImages = 6,
  images = [],
  onChange,
  editable = true,
  singleImage = false,
  ubication = 0,
}) => {
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    switch (ubication) {
      case 0:
        if (files.length > 1) {
          showToast("Solo se permiten una única iamgen en fromato PNG.", "error");
          return;
        }
        break;
      case 1:
        if (files.length > 6) {
          showToast("Solo se permiten un máximo de 6 imágenes en formato PNG.", "error");
          return;
        }
        break;
    }

    const validPngFiles = files.filter(
      (file) =>
        file.type === "image/png" && file.name.toLowerCase().endsWith(".png")
    );

    if (validPngFiles.length !== files.length) {
      showToast("Solo se permiten imágenes en formato PNG.", "error");
      return;
    }

    const uploadedImages = [];

    for (const file of validPngFiles) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const result = await uploadImgProfile(formData)

        if (result.status === "Success") {
          uploadedImages.push(result.imageUrl);
        } else {
          showToast("Error al subir la imagen", "error");
        }
      } catch (error) {
        console.error("Error al subir imagen:", error);
        showToast("Error de red al subir la imagen", "error");
      }
    }

    let updatedImages = singleImage
      ? [uploadedImages[0]]
      : [...images, ...uploadedImages].slice(0, maxImages);

    onChange(updatedImages);
  };

  const removeImage = (index) => {
    if (!editable) return;
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const triggerFileInput = () => {
    if (
      editable &&
      ((singleImage && images.length === 0) ||
        (!singleImage && images.length < maxImages))
    ) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="image-uploader-container">
      {images.map((img, index) => (
        <div key={index} className="uploaded-image">
          <img src={img} alt={`imagen-${index}`} />
          {editable && (
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeImage(index)}
              title="Eliminar imagen"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      {editable &&
        ((singleImage && images.length === 0) ||
          (!singleImage && images.length < maxImages)) && (
          <div
            className="upload-slot"
            onClick={triggerFileInput}
            title="Subir imagen PNG"
          >
            <span>+</span>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden-input"
              accept=".png"
              multiple={!singleImage}
              onChange={handleFileChange}
            />
          </div>
        )}
    </div>
  );
};

export default ImageUploader;
