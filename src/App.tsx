import { Routes, Route } from "react-router-dom";
import Home from "./components/home/HomePage";
import Timeline from "./components/timeline/Timeline";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/timeline" element={<Timeline />} />
      {/* fallback for 404 */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
