export default function CategoryInput({ onSetCategory, category }) {
  return (
    <div>
      <span>Select Category</span>
      <select
        value={category}
        onChange={(e) => {
          onSetCategory(e.target.value);
        }}
      >
        {[
          "accommodation",
          "attractions",
          "bars_clubs",
          "cruises",
          "events",
          "food_beverages",
          "mice_events",
          "precincts",
          "shops",
          "tours",
          "venues",
          "walking_trails",
        ].map((type) => (
          <option value={type} key={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
