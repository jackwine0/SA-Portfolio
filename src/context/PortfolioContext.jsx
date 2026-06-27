import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

// ─── Context ────────────────────────────────────────────────
// Holds the mobile nav panel's open/closed state. The desktop
// sidebar has no open/closed state of its own — it's always
// visible — so this context only matters below the sidebar
// breakpoint (see Sidebar.css).
const PortfolioContext = createContext(null);

// ─── Provider ───────────────────────────────────────────────
export function PortfolioProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu   = useCallback(() => setMenuOpen(true), []);
  const closeMenu  = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((p) => !p), []);

  const value = useMemo(
    () => ({ menuOpen, openMenu, closeMenu, toggleMenu }),
    [menuOpen, openMenu, closeMenu, toggleMenu]
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────
export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used inside PortfolioProvider");
  return ctx;
}
