import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Productcontext } from "../../utils/Context";
import "./Nav.css";

function Nav({ sortOrder, onSortChange, onClearFilters }) {
  const [products] = useContext(Productcontext);

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(
      Math.random() * 255
    ).toFixed()},${(Math.random() * 255).toFixed()},0.5)`;
  };

  return (
    <div className="nav-container">
      <nav>
        <h1>Better Cart</h1>
        <hr className="nav-divider" />
        <h1 className="nav-heading">Category</h1>
        <div className="nav-category-list">
          {distinct_category.map((c, i) => {
            return (
              <Link
                to={`/?category=${c}`}
                key={i}
                className="nav-category-link">
                <span
                  style={{ backgroundColor: color() }}
                  className="nav-category-dot"></span>
                {c}
              </Link>
            );
          })}
        </div>
        <hr className="nav-divider" />
        <div className="nav-price-filter">
          <h2 className="nav-subheading">Price</h2>
          <label className="nav-radio-option">
            <input
              type="radio"
              name="priceSort"
              value="lowToHigh"
              checked={sortOrder === "lowToHigh"}
              onChange={() => onSortChange("lowToHigh")}
            />
            Low - High
          </label>
          <label className="nav-radio-option">
            <input
              type="radio"
              name="priceSort"
              value="highToLow"
              checked={sortOrder === "highToLow"}
              onChange={() => onSortChange("highToLow")}
            />
            High - Low
          </label>
          <button
            type="button"
            className="nav-clear-button"
            onClick={onClearFilters}
          >
            Clear filters
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
