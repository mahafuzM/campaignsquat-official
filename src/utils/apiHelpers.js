/**
 * Safely extracts an array from any API response format.
 * Handles: plain array, { data: [] }, { success: true, data: [] }, etc.
 */
export function safeArray(res) {
  if (!res) return [];
  const d = res.data ?? res;
  if (Array.isArray(d)) return d;
  if (d && Array.isArray(d.data)) return d.data;
  return [];
}
