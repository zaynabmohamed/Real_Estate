"use client"
import { createContext, useState } from "react";

 export const FilterContext = createContext();
 export default function FilterContextProvider({children }) {
  const [ filter , setFilter]  = useState({})


    function handleFilterChange(key, value) {
    setFilter((prev) => ({
      ...prev,
      [key]: value === "" || value === "all" ? undefined : value,
    }));
  }

 


    return <FilterContext.Provider value={ {filter , handleFilterChange }}>
          {children}
    </FilterContext.Provider>
    }
 