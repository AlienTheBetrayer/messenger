/**
 * @gravity/shared
 *
 * Shared types, constants, and utilities used across
 * the frontend (apps/web) and backend (apps/api).
 */

// ─── Example Types ───────────────────────────────────────────────

export interface User {
    id: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
}

// ─── API Response Wrapper ────────────────────────────────────────

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface ApiError {
    success: false;
    error: string;
    statusCode: number;
}

export interface HelloResponse {
    message: string;
}

// ─── Constants ───────────────────────────────────────────────────

export const APP_NAME = "Gravity";
