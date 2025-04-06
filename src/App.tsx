import { Routes, Route } from "react-router"
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import Layouts from "./layouts/Layouts";
import Home from "./pages/Home";
import Hok from "./pages/Hok";
import RankedDraft from "./components/RankedDraft";
import HeroList from "./pages/HeroList";
import TierListMaker from "./pages/TierListMaker";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layouts />} >
            <Route index element={<Home />} />
            <Route path="hok" element={<Hok />} />
            <Route path="hok/ranked" element={<RankedDraft />} />
            <Route path="hok/hero-list" element={<HeroList />} />
            <Route path="hok/tier-maker" element={<TierListMaker />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
