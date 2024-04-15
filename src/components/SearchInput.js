export default function SearchInput({
  onSetCategory,
  category,
  onSetKeyword,
  keyword,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    onSetCategory(e.target.elements.category.value);

    onSetKeyword(e.target.elements.keyword.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <span>Select Category</span>
      <select
        name="category"
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
        <span>Enter Keyword</span>
        <input
          name="keyword"
          style={{
            width: "100px",
            height: "20px",
            border: "1px solid black",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          // value={keyword}
          // onChange={(e) => {
          //   onSetKeyword(e.target.value);
          // }}
        />
      </div>
      <button>Sumbit</button>
    </form>
  );
}
