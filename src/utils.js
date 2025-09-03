export const toKey = (raw) => {
  if (!raw) return null;
  const upper = raw.length === 1 ? raw.toUpperCase() : raw;
  return /^[A-Z]$/.test(upper) ? upper : null;
};
