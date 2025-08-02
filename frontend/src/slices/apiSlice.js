// This file defines the core configuration for your entire API layer.
// It doesn't contain any specific endpoints itself; instead, it acts as the central hub where all other feature-specific endpoints will be "injected."

import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

// All future API calls will automatically prepend the BASE_URL to their specific endpoint path.
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// createApi: This is the central function of RTK Query. It creates a Redux slice specifically designed for managing API data.
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product"],
  endpoints: (builder) => ({}),
});

// fetchBaseQuery: This is a lightweight wrapper around the browser's native fetch function.
// Its purpose is to simplify API requests by handling common tasks like setting the base URL and parsing JSON responses.

// endpoints: builder => ({}): This is the key part of a base slice. It's intentionally empty.
// This slice is a template, and other files will use the injectEndpoints method to add their specific endpoints to this base configuration.
