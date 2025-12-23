const mobileRegex =
  /Mobi|Android|iPhone|iPad|iPod|Tablet|BlackBerry|BB10|PlayBook|Opera Mini|IEMobile|Silk/i;

export const isMobile = mobileRegex.test(navigator.userAgent);
