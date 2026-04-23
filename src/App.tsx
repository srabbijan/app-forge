import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthError from "./components/auth/AuthError.tsx";
import GivePin from "./components/auth/GivePin.tsx";
import Builder from "./pages/Builder.tsx";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";
import Shop from "./pages/Shop.tsx";
import Success from "./pages/Success.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pin" element={<GivePin />} />
          <Route path="/error" element={<AuthError />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/success" element={<Success />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
