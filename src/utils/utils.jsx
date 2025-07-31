import React from 'react';
import img_no_available from './../assets/no_available_img.png';

const utilsData = {
  regex_mail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

const validateEmail = (email) => {
  return utilsData.regex_mail.test(email);
};

export const validateFields = (
  data,
  inReg = false,
  inProfile = false,
  inUploadProduct = false
) => {
  let isError = false;
  let countErrors = 0;
  let errorMessage = '';
  if (!inUploadProduct) {
    if (!data.email || data.email === '') {
      errorMessage += 'Email';
      countErrors++;
      isError = true;
    }
    if (!inProfile) {
      if (!data.password || data.password === '') {
        errorMessage === ''
          ? (errorMessage += 'Contraseña')
          : (errorMessage += ', contraseña');
        countErrors++;
        isError = true;
      }
    }
    if (inReg) {
      if (!data.firstName || data.firstName === '') {
        errorMessage === ''
          ? (errorMessage += 'Nombre')
          : (errorMessage += ', nombre');
        countErrors++;
        isError = true;
      }
      if (!data.lastName || data.lastName === '') {
        errorMessage === ''
          ? (errorMessage += 'Apellidos')
          : (errorMessage += ', apellidos');
        countErrors++;
        isError = true;
      }
      if (!data.birthDate || data.birthDate === '') {
        errorMessage === ''
          ? (errorMessage += 'Fecha de nacimiento')
          : (errorMessage += ', fecha de nacimiento');
        countErrors++;
        isError = true;
      }
    }
  } else {
    if (!data.title || data.title === '') {
      errorMessage += 'Título';
      countErrors++;
      isError = true;
    }
    if (!data.description || data.description === '') {
        errorMessage === ''
          ? (errorMessage += 'Descripción')
          : (errorMessage += ', descripción');
        countErrors++;
        isError = true;
      }
    if (!data.price || data.price === '' || data.price === 0) {
        errorMessage === ''
          ? (errorMessage += 'Precio')
          : (errorMessage += ', precio');
        countErrors++;
        isError = true;
      }
    if (!data.category || data.category === '') {
        errorMessage === ''
          ? (errorMessage += 'Categoría')
          : (errorMessage += ', categoría');
        countErrors++;
        isError = true;
      }
    if (!data.condition || data.condition === '') {
        errorMessage === ''
          ? (errorMessage += 'Estado')
          : (errorMessage += ', estado');
        countErrors++;
        isError = true;
      }
  }

  if (isError) {
    countErrors > 1
      ? (errorMessage += ' deben contener información')
      : (errorMessage += ' debe contener información');
    showToast(errorMessage, 'error');
  } else {
    if (!validateEmail(data.email) && !inUploadProduct) {
      errorMessage = 'Fórmato inválido de email';
      showToast(errorMessage, 'error');
    } else {
      return true;
    }
  }
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const showToast = (message, type = 'success') => {
  const toast = document.querySelector('#toastMessage');
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast-message show ${type === 'error' ? 'error' : ''}`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
};

const getAddressFromCoords = async (lat, lon) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
  );
  const data = await response.json();

  return {
    country: data.address.country || '',
    region: data.address.state || '',
    province: data.address.county || '',
    city: data.address.city || data.address.town || data.address.village || '',
  };
};

export const buildLocationObject = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await getAddressFromCoords(latitude, longitude);
        const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
          address,
        };
        resolve(location);
      },
      (error) => {
        console.error('Error geolocalizando:', error);
        reject(error);
      }
    );
  });
};

export const getValidImg = (image) => {
  return image && image.trim() !== undefined ? image : img_no_available;
};

export function getFormattedDate(
  date,
  includeTime = false,
  isInputValue = false
) {
  const constDate = new Date(date);
  if (isNaN(constDate.getTime())) return '';

  if (isInputValue) {
    const year = constDate.getFullYear();
    const month = (constDate.getMonth() + 1).toString().padStart(2, '0');
    const day = constDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false,
    timeZone: timeZone,
  };
  if (includeTime) {
    const options2 = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    options = { ...options2, ...options };
  }
  return constDate.toLocaleString('es-ES', options).replace(',', '');
}

export function generateMapIframe(location) {
  const [lng, lat] = location.coordinates;
  const zoom = 13;
  const approxLat = parseFloat(lat.toFixed(3));
  const approxLng = parseFloat(lng.toFixed(3));

  // Usamos la URL pública de Google Maps para insertar un iframe sin API Key
  const mapUrl = `https://maps.google.com/maps?q=${approxLat},${approxLng}&z=${zoom}&output=embed`;

  return (
    <iframe
      src={mapUrl}
      width="100%"
      height="250"
      style={{ border: 0, borderRadius: '15px' }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}
