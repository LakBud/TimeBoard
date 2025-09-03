import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home/HomePage";
import Timeline from "./components/timeline/Timeline";

function App() {
  const location = useLocation();

  // Hide header when the current path starts with "/timeline"
  const hideHeader = location.pathname === "/timeline" || location.pathname.startsWith("/timeline/");

  return (
    <div className="app-layout">
      {/* Header / Nav */}
      {!hideHeader && (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50 text-center">
          <h1 className="text-2xl font-bold">TimeBoard</h1>
        </header>
      )}

      {/* Main content */}
      <main className={`pt-${hideHeader ? "0" : "20"} px-4`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          {/* fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
