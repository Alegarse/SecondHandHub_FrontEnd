const utilsData = {
  regex_mail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

const validateEmail = (email) => {
  return utilsData.regex_mail.test(email);
};

export const validateFields = (data, inReg = false) => {
  let isError = false;
  let countErrors = 0;
  let errorMessage = "";
  if (!data.email || data.email === "") {
    errorMessage += "Email";
    countErrors++;
    isError = true;
  }
  if (!data.password || data.password === "") {
    errorMessage === ""
      ? (errorMessage += "Contraseña")
      : (errorMessage += ", contraseña");
    countErrors++;
    isError = true;
  }
  if (inReg) {
    if (!data.firstName || data.firstName === "") {
      errorMessage === ""
        ? (errorMessage += "Nombre")
        : (errorMessage += ", nombre");
      countErrors++;
      isError = true;
    }
    if (!data.lastName || data.lastName === "") {
      errorMessage === ""
        ? (errorMessage += "Apellidos")
        : (errorMessage += ", apellidos");
      countErrors++;
      isError = true;
    }
    if (!data.birthDate || data.birthDate === "") {
      errorMessage === ""
        ? (errorMessage += "Fecha de nacimiento")
        : (errorMessage += ", fecha de nacimiento");
      countErrors++;
      isError = true;
    }
  }
  if (isError) {
    countErrors > 1
      ? (errorMessage += " deben contener información")
      : (errorMessage += " debe contener información");
    showToast(errorMessage, 'error')
    
  } else {
    if (!validateEmail(data.email)) {
      errorMessage = "Fórmato inválido de email";
      showToast(errorMessage, 'error')
    } else {
      return true;
    }
  }
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


export const showToast = (message, type = "success") => {
  const toast = document.querySelector("#toastMessage");
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast-message show ${type === "error" ? "error" : ""}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
};


const getAddressFromCoords = async (lat, lon) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
  );
  const data = await response.json();

  return {
    country: data.address.country || "",
    region: data.address.state || "",
    province: data.address.county || "",
    city: data.address.city || data.address.town || data.address.village || "",
  };
};

export const buildLocationObject = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await getAddressFromCoords(latitude, longitude);
        const location = {
          type: "Point",
          coordinates: [longitude, latitude],
          address,
        };
        resolve(location);
      },
      (error) => {
        console.error("Error geolocalizando:", error);
        reject(error);
      }
    );
  });
};

