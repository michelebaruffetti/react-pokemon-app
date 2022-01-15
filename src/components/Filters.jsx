import { useRef } from "react";

const Filters = ({ setSelect }) => {
  const selectEl = useRef("all");
  const selectHandler = () => {
    const selectValue = selectEl.current.value;
    setSelect(selectValue);
  };
  return (
    <div className="filters container">
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
