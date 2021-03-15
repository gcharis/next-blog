export const resolveUrl = () => {
  if (typeof window === 'undefined') {
    return `http://${process.env.API_HOST}:1337`;
  }

  return EXT_API_HOST;
};
