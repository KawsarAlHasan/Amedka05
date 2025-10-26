import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Access Vite environment variables using import.meta.env.VITE_
// All custom environment variables must be prefixed with VITE_
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const API = axios.create({
  baseURL: `${BASE_URL}/api`,
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

// get single agent id
export const useGetSingleAgent = (agentId) => {
  const getData = async () => {
    const response = await API.get(`/agent/${agentId}`);
    return response.data;
  };

  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["agentDetail"],
    queryFn: getData,
    keepPreviousData: true,
  });

  const { data: agentDetail = {} } = response;

  return { agentDetail, isLoading, isError, error, refetch };
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

// Get all Wishlist
export const useGetAllWishlist = () => {
  const getData = async () => {
    const response = await API.get("/wishlist/all");
    return response.data;
  };

  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allWishlist"],
    queryFn: getData,
    keepPreviousData: true,
  });

  const { data: allWishlist = [] } = response;

  return { allWishlist, isLoading, isError, error, refetch };
};

// Get all Wishlist ids
export const useGetAllWishIds = () => {
  const getData = async () => {
    const response = await API.get("/wishlist/id");
    return response.data;
  };

  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allWishlistId"],
    queryFn: getData,
    keepPreviousData: true,
  });

  const { data: allWishlistId = [] } = response;

  return { allWishlistId, isLoading, isError, error, refetch };
};

// Get random product
export const useGetRandomProduct = () => {
  const getData = async () => {
    const response = await API.get("/product/random");
    return response.data;
  };

  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["randomProduct"],
    queryFn: getData,
    keepPreviousData: true,
  });

  const { data: randomProduct = [] } = response;

  return { randomProduct, isLoading, isError, error, refetch };
};

// Get single random product
export const useGetSingleRandomProduct = () => {
  const getData = async () => {
    const response = await API.get("/product/single-random");
    return response.data;
  };

  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["randomSingleProduct"],
    queryFn: getData,
    keepPreviousData: true,
  });

  const { data: randomSingleProduct = [] } = response;

  return { randomSingleProduct, isLoading, isError, error, refetch };
};

// get single product details
export const useGetProductDetails = (productId) => {
  const getData = async () => {
    const response = await API.get(`/product/${productId}`);
    return response.data;
  };

  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["productDetails"],
    queryFn: getData,
    keepPreviousData: true,
  });

  const { data: productDetails = {} } = response;

  return { productDetails, isLoading, isError, error, refetch };
};

export const useGetAllProducts = ({
  page = 1,
  limit = 10,
  product_name,
  // status = "Active",
  // min_price,
  // max_price,
  // size,
  color,
  category,
  sort_by = "created_at",
  sort_order = "desc",
}) => {
  const getData = async () => {
    const response = await API.get("/product/all", {
      params: {
        page,
        limit,
        // status,
        product_name,
        // min_price,
        // max_price,
        // size,
        color,
        category,
        sort_by,
        sort_order,
      },
    });
    return response.data;
  };

  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "allProducts",
      {
        page,
        limit,
        // status,
        product_name,
        // min_price,
        // max_price,
        // size,
        color,
        category,
        sort_by,
        sort_order,
      },
    ],
    queryFn: getData,
    keepPreviousData: true,
  });

  const { data: allProducts = [], pagination = {} } = response;

  return { allProducts, pagination, isLoading, isError, error, refetch };
};
