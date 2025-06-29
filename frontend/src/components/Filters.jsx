import { useState } from "react";

export default function Filters({ filters, onFilterChange }) {
  const [selected, setSelected] = useState({});

  const toggleOption = (category, option) => {
    const newSelected = { ...selected };
    if (!newSelected[category]) newSelected[category] = new Set();
    if (newSelected[category].has(option)) {
      newSelected[category].delete(option);
    } else {
      newSelected[category].add(option);
    }
    setSelected({ ...newSelected });
    onFilterChange(newSelected);
  };

  return (
    <div className="filters bg-dark text-white p-3 rounded">
      <h5 className="mb-3">Filters</h5>
      {filters.map((filter) => (
        <div key={filter.category} className="mb-4">
          <h6 className="mb-2">{filter.category}</h6>
          <div className="d-flex flex-wrap gap-2">
            {filter.options.map((opt) => (
              <button
                key={opt}
                onClick={() => toggleOption(filter.category, opt)}
                className={`btn btn-sm ${
                  selected[filter.category]?.has(opt) ? "btn-primary" : "btn-outline-light"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
