import React from "react";

type FilterMenuProps = {
  selected: string | null;
  onChange: (category: string | null) => void;
  categories: string[];
};

const categoryColors: Record<string, string> = {
  Work: "#FBBF24", // Amber
  Personal: "#10B981", // Green
  Notes: "#3B82F6", // Blue
  Other: "#9CA3AF", // Gray
};

const FilterMenu: React.FC<FilterMenuProps> = ({ selected, onChange, categories }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-10 px-4">
      {/* "All" button */}
      <button
        onClick={() => onChange(null)}
        className={`px-5 py-2 rounded-full font-semibold text-sm md:text-base transition-transform duration-200 shadow-md hover:scale-105 focus:outline-none ${
          !selected
            ? "bg-gradient-to-r from-amber-300 to-amber-500 text-white shadow-lg"
            : "bg-white text-gray-700 hover:shadow-lg"
        }`}
      >
        All
      </button>

      {categories.map((cat) => {
        const color = categoryColors[cat] || "#9CA3AF";
        const isSelected = selected === cat;

        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-5 py-2 rounded-full font-semibold text-sm md:text-base transition-transform duration-200 shadow-md hover:scale-105 focus:outline-none ${
              isSelected ? "shadow-lg scale-105" : "bg-white text-gray-700 hover:shadow-lg border border-gray-200"
            }`}
            style={{
              backgroundColor: isSelected ? color : "white",
              color: isSelected ? "white" : "gray",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default FilterMenu;
