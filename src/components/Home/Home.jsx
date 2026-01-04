import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import Navbartop from "../Navbartop/Navbartop";
import { Productcontext } from "../../utils/Context";
import { CartContext } from "../../utils/CartContext";
import Loading from "../Loading/Loading";
import axios from "../../utils/axios";
import "./Home.css";

const Home = () => {
  const [products] = useContext(Productcontext);
  const { addToCart } = useContext(CartContext);
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const category = params.get("category") || "undefined";
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setfiltered] = useState(null);
  const [sortOrder, setSortOrder] = useState("");

  const getproductcategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfiltered(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filtered || category == "undefined") setfiltered(products);
    if (category != "undefined") {
      getproductcategory();
      setfiltered(products.filter((p) => p.category == category));
    }
    console.log(filtered)
  }, [category, products]);

  const handleSearchChange = async (value) => {
    setSearchTerm(value);

    const trimmed = value.trim();

    if (!trimmed) {
      if (category === "undefined") {
        setfiltered(products);
      } else {
        await getproductcategory();
      }
      return;
    }

    try {
      const { data } = await axios.get("/products");
      const searchResults = data.filter((p) =>
        p.title.toLowerCase().includes(trimmed.toLowerCase())
      );
      setfiltered(searchResults);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSortOrder("");

    if (category !== "undefined") {
      navigate("/");
    }

    if (products) {
      setfiltered(products);
    }
  };

  let displayedProducts = filtered ? [...filtered] : [];
  if (sortOrder === "lowToHigh") {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  return products ? (
    <div className="home-layout-grid">
      <Navbartop
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <Nav
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClearFilters={handleClearFilters}
      />

      <div className="home-products-container">
        {displayedProducts &&
          displayedProducts.map((p, i) => (
            <div
              key={i}
              className="home-card">
              <div
                className="home-card-image"
                style={{ backgroundImage: `URL(${p.image})` }}></div>
              <h1 className="home-card-title">{p.title}</h1>
              <div className="home-card-meta">
                <p className="home-card-category">{p.category}</p>
                <span
                  className={
                    p.rating && p.rating.count > 0
                      ? "home-card-stock in-stock"
                      : "home-card-stock out-of-stock"
                  }
                >
                  {p.rating && p.rating.count > 0 ? "In stock" : "Out of stock"}
                </span>
              </div>
              <div className="home-card-footer">
                <span className="home-card-price">${p.price}</span>
                <button
                  type="button"
                  className="home-card-button"
                  onClick={() => addToCart(p)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
