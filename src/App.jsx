import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import SearchParams from "./SearchParams";
import Details from "./Details";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Can change TTL of cache here, it is in milliseconds
      // 1000 * 60 * 10 => 10 minutes
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  // adoptedPet is available to any component wrapped in AdoptedPetContext
  // want to be very judicious about how and where you use useContext
  // it destroys the natural flow of data/state
  // the .Provider tag on AdoptedPetContext is almost like a context wormhole that pass
  // state to other areas of your program
  const adoptedPet = useState(null);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <header>
            <Link to="/">Adopt Me</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
