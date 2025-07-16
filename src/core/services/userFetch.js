import globals from "./globals";

export const doLoginFetch = async (dataLogin) => {
  const data = await fetch(globals.URL_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataLogin),
  });
  const response = await data.json();
  console.log(response)
  return response;
};