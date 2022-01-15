import { useRef } from "react";

const Filters = ({ setCardState }) => {
  const selectEl = useRef("all");
  const selectHandler = () => {
    console.log("select changed");
  };
  return (
    <div>
      <select
        ref={selectEl}
        onChange={() => selectHandler()}
        name="filters"
        id="filters"
      >
        <option selected value="All">
          All
        </option>
        <option value="Catched">Catched</option>
        <option value="ToCatch">To Catch</option>
      </select>
    </div>
  );
};

export default Filters;
