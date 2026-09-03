/**
 * Security & Sanitization Utilities
 * Protects against XSS, script-tag breakouts, open redirects, and malformed inputs.
 */

/**
 * Escapes characters in JSON strings so they cannot prematurely close an inline <script> tag.
 * Converts `<` to `\u003c` and `>` to `\u003e`.
 */
export function safeJsonLd(json: unknown): string {
  return JSON.stringify(json)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

/**
 * Sanitizes plain text inputs by stripping HTML tags and dangerous event handlers.
 */
export function sanitizeText(input: string = ''): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/javascript:/gi, '') // Strip javascript pseudo-protocol
    .replace(/on\w+\s*=/gi, '') // Strip event attributes (onload, onerror, etc.)
    .trim();
}

/**
 * Validates that an incoming redirect URL is strictly an internal relative path.
 * Defends against Open Redirect vulnerabilities (e.g. //attacker.com or https://evil.com).
 */
export function safeRedirectUrl(target?: string | null, fallback: string = '/admin'): string {
  if (!target) return fallback;

  const trimmed = target.trim();

  // Must start with single slash, not double slash or backslash
  if (!trimmed.startsWith('/') || trimmed.startsWith('//') || trimmed.startsWith('/\\')) {
    return fallback;
  }

  // Reject protocol strings
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    return fallback;
  }

  return trimmed;
}
