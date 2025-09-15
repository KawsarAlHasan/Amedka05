import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// my profile
export const useGetMyProfile = () => {
  const getData = async () => {
    const response = await API.get("/auth/me");
    return response.data;
  };

  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myProfile"],
    queryFn: getData,
    keepPreviousData: true,
  });

  const { data: myProfile = {} } = response;

  return { myProfile, isLoading, isError, error, refetch };
};

// log out function
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// Get all Agents
export const useGetAllAgents = () => {
  const getData = async () => {
    const response = await API.get("/agent/all?status=Active");
    return response.data;
  };

  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allAgents"],
    queryFn: getData,
    keepPreviousData: true,
  });

  const { data: allAgents = [] } = response;

  return { allAgents, isLoading, isError, error, refetch };
};

// Get all Categories
export const useGetAllCategories = () => {
  const getData = async () => {
    const response = await API.get("/category/all?status=Active");
    return response.data;
  };

  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getData,
    keepPreviousData: true,
  });

  const { data: allCategories = [] } = response;

  return { allCategories, isLoading, isError, error, refetch };
};
