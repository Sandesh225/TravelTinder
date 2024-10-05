// Utility to get a cookie value by name
export const getCookieValue = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
};

// Utility to set a cookie with an expiration in days
export const setCookie = (name, value, days, secure = false) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  let cookieStr = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  if (secure) cookieStr += '; Secure';
  document.cookie = cookieStr;
};

// Utility to delete a cookie
export const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
};
