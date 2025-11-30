// Utility for building and parsing URLs with query objects

/**
 * Build a URL with path and query object
 * @param path Base path (e.g. '/')
 * @param query Query object (e.g. { country: 'BD', visaCategory: 'student' })
 * @returns URL string with query params
 */
export function buildQueryUrl(path: string, query: Record<string, any>): string {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });
  return params.toString() ? `${path}?${params.toString()}` : path;
}

/**
 * Parse a query string into an object
 * @param queryString Query string (e.g. '?country=BD&visaCategory=student')
 * @returns Object with key-value pairs
 */
export function parseQuery(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString.startsWith('?') ? queryString.slice(1) : queryString);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
