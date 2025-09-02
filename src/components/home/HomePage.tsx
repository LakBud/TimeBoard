import { Link } from "react-router-dom";
import bgPattern from "../assets/bg.jpg";

const HomePage = () => {
  return (
    <div
      className="w-full min-h-screen flex justify-center items-center px-4 bg-repeat"
      style={{
        backgroundImage: `url(${bgPattern})`,
        backgroundSize: "100px 100px",
      }}
    >
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Title Section */}
        <div className="border rounded-3xl shadow-lg p-10 bg-white/80 backdrop-blur-lg">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-3 tracking-tight">TimeBoard</h1>
          <p className="text-2xl text-gray-600 font-light">Visualize Your Memories, Track Your Journey</p>
        </div>

        {/* Description Section */}
        <div className="border rounded-3xl shadow-lg p-8 text-gray-700 bg-white/80 backdrop-blur-lg leading-relaxed text-lg">
          <p>
            TimeBoard is a personal digital timeline that helps you capture and reflect on the most meaningful moments of your
            life. Add events, moods, and images to create a beautiful, interactive history that grows with you. Spot patterns,
            revisit memories, and celebrate your journey — all in one place.
          </p>
        </div>

        {/* CTA */}
        <Link to="/timeline">
          <button className="mt-6 px-8 py-4 text-xl font-semibold rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out text-white">
            Start Your Timeline
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
