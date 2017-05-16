export const InvalidUrls = ["chrome:", "file:", "chrome-extension:"];

export function isUrlValid(url){

  // Finds the section of string before the first '/' and checks if in blacklist
  return (InvalidUrls.indexOf(url.substr(0, url.indexOf('/'))) >= 0);
}
