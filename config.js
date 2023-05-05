export const rootApi = 'http://localhost:3004'

export function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}
export function titleToSlug(title) {
  let slug = title.replace(/[^\w\s]/gi, ' ');
  slug = slug.toLowerCase();
  slug = slug.replace(/\s+/g, '-');
  slug = slug.replace(/-{2,}/g, '-');
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}

export function limitString(str, limit) {
  if (str.length <= limit) {
    return str;
  }
  return `${str.slice(0, limit)}...`;
}