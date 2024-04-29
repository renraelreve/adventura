export default function SearchInput({ onSetCategory, onSetKeyword }) {
  function handleSubmit(e) {
    e.preventDefault();

    onSetCategory(e.target.elements.category.value);

    onSetKeyword(e.target.elements.keyword.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <span>Select Category: </span>
      <select
        name="category"
        style={{
          fontSize: "18px",
          height: "30px",
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

      <div>
        <span>Search keyword: </span>
        <input
          name="keyword"
          placeholder="Enter name of food, place,  activity"
          style={{
            width: "300px",
            height: "30px",
            border: "1px solid black",
            marginTop: "15px",
            marginBottom: "10px",
            fontSize: "18px",
          }}
        />
      </div>
      <button>Submit</button>
    </form>
  );
}
