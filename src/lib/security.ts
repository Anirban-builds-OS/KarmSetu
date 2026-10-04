// ============================================================
// Security Utilities — KarmSetu
// All unsafe operations (localStorage, ID gen, sanitisation)
// must go through this module.
// ============================================================

// ---------- Safe localStorage ----------

const MAX_STORAGE_VALUE_BYTES = 1_000_000; // 1 MB guard

/**
 * Safely read a string from localStorage.
 * Returns null on any error (SecurityError, QuotaExceededError, etc.).
 */
export function storageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Safely write a string to localStorage.
 * Silently no-ops if the value exceeds 1 MB or any error occurs.
 */
export function storageSet(key: string, value: string): void {
  if (value.length > MAX_STORAGE_VALUE_BYTES) return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // QuotaExceededError or SecurityError in private mode
  }
}

/**
 * Safely remove a key from localStorage.
 */
export function storageRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

/**
 * Safely read and JSON-parse a value from localStorage.
 * Returns null if missing, invalid JSON, or any error.
 */
export function storageGetJson<T>(key: string): T | null {
  const raw = storageGet(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

// ---------- ID generation ----------

/**
 * Generate a cryptographically random ID using the Web Crypto API.
 * Falls back to timestamp+counter if crypto is unavailable.
 * Never uses Math.random().
 */
let _fallbackCounter = 0;
export function generateId(prefix = 'id'): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  _fallbackCounter = (_fallbackCounter + 1) % 1_000_000;
  return `${prefix}-${Date.now().toString(36)}-${_fallbackCounter.toString(36)}`;
}

// ---------- Input sanitisation ----------

const ACTIVITY_CODE_RE = /^[A-Z0-9_\-]{1,32}$/;

/** Validate that a string looks like a safe activity code. */
export function isValidActivityCode(code: string): boolean {
  return ACTIVITY_CODE_RE.test(code);
}

/** Strip all HTML tags from a string. */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

/** Truncate a string to a maximum safe display length. */
export function truncate(input: string, maxLen = 200): string {
  if (input.length <= maxLen) return input;
  return `${input.slice(0, maxLen)}\u2026`;
}

// ---------- Rate limiter ----------

interface RateLimiterEntry {
  count: number;
  windowStart: number;
}

const _rateLimits = new Map<string, RateLimiterEntry>();

/**
 * Simple in-memory rate limiter.
 * Returns true if the action is allowed, false if the limit is exceeded.
 */
export function rateLimit(key: string, maxCalls: number, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = _rateLimits.get(key);
  if (!entry || now - entry.windowStart > windowMs) {
    _rateLimits.set(key, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= maxCalls) return false;
  entry.count += 1;
  return true;
}

/** Reset a rate limit bucket (e.g. after successful auth). */
export function rateLimitReset(key: string): void {
  _rateLimits.delete(key);
}

// ---------- Immutable data helpers ----------

/** Deep-freeze an object so it cannot be mutated at runtime. */
export function deepFreeze<T extends object>(obj: T): Readonly<T> {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach(name => {
    const value = (obj as Record<string, unknown>)[name];
    if (typeof value === 'object' && value !== null && !Object.isFrozen(value)) {
      deepFreeze(value as object);
    }
  });
  return obj as Readonly<T>;
}

// ---------- Permissions ----------

export type Permission =
  | 'view:dashboard'
  | 'view:claims'
  | 'view:review'
  | 'view:audit'
  | 'view:users'
  | 'view:settings'
  | 'view:system-health'
  | 'view:writeback'
  | 'action:upload'
  | 'action:review-claim'
  | 'action:approve-writeback'
  | 'action:manage-users'
  | 'action:export';

import type { UserRole } from '../types';

const ROLE_PERMISSIONS: Readonly<Record<UserRole, readonly Permission[]>> = deepFreeze({
  SUPERVISOR: [
    'view:dashboard',
    'view:claims',
    'action:upload',
  ],
  PLANNER: [
    'view:dashboard',
    'view:claims',
    'view:review',
    'view:audit',
    'view:writeback',
    'action:upload',
    'action:review-claim',
    'action:approve-writeback',
    'action:export',
  ],
  PROJECT_MANAGER: [
    'view:dashboard',
    'view:claims',
    'view:review',
    'view:audit',
    'view:writeback',
    'view:settings',
    'action:export',
    'action:approve-writeback',
  ],
  ADMIN: [
    'view:dashboard',
    'view:claims',
    'view:review',
    'view:audit',
    'view:users',
    'view:settings',
    'view:system-health',
    'view:writeback',
    'action:upload',
    'action:review-claim',
    'action:approve-writeback',
    'action:manage-users',
    'action:export',
  ],
});

/** Check whether a given role has a specific permission. */
export function hasPermission(role: UserRole | undefined | null, permission: Permission): boolean {
  if (!role) return false;
  return (ROLE_PERMISSIONS[role] as readonly Permission[]).includes(permission);
}

/** Returns all permissions for a role. */
export function getPermissions(role: UserRole): readonly Permission[] {
  return ROLE_PERMISSIONS[role];
}
