export const Blacklist = ["chrome:", "file:", "chrome-extension:"];

export function isUrlBlacklisted(url){

  // Finds the section of string before the first '/' and checks if in blacklist
  return (Blacklist.indexOf(url.substr(0, url.indexOf('/'))) >= 0);
}
