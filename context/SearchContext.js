"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const TokkoSearchContext = createContext();

export const TokkoSearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    location: "",
    operation: "",
    type: "",
  });

  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();

    const query = new URLSearchParams(searchParams).toString();
    try {
      const res = await fetch(`/api/tokko/search?${query}`);
      const data = await res.json();
      setSearchResults(data);
      router.push(`/search/results?${query}`);
    } catch (error) {
      console.error("Error fetching Tokko search results", error);
    }
  };

  return (
    <TokkoSearchContext.Provider
      value={{
        searchParams,
        setSearchParams,
        searchResults,
        setSearchResults,
        handleSearch,
      }}
    >
      {children}
    </TokkoSearchContext.Provider>
  );
};

export const useTokkoSearch = () => useContext(TokkoSearchContext);
