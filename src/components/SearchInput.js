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
        }}
        // value={category}
        // onChange={(e) => {
        //   onSetCategory(e.target.value);
        // }}
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
        <span>Search: </span>
        <input
          name="keyword"
          style={{
            width: "150px",
            height: "35px",
            border: "1px solid black",
            marginTop: "15px",
            marginBottom: "10px",
            fontSize: "18px",
          }}
          // value={keyword}
          // onChange={(e) => {
          //   onSetKeyword(e.target.value);
          // }
        />
      </div>
      <button>Submit</button>
    </form>
  );
}

