export const resolveUrl = () => {
  if (typeof window === 'undefined') {
    return `http://${process.env.INTERNAL_API_HOST}:1337`;
  }

  return EXPOSED_API_HOST;
};
