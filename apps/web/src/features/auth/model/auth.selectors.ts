"use client";

import { useSelector } from "react-redux";

import { authApi } from "@/features/auth/model/auth.slice";

/**
 * hook that provides data about the authentication
 * @returns auth data
 */
export const useAuth = () => useSelector(authApi.endpoints.me.select());
