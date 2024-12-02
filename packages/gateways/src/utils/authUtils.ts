export const generateAuthToken = (
  apiKey: string,
  secretKey: string,
): string => {
  return btoa(`${apiKey}:${secretKey}`)
}
