import { useEffect, useState } from "react";
import { getProductDetails } from "../../services/getProductDetails";
import ProductCard from "../ProductCard/ProductCard";
import { Spinner } from "react-bootstrap";
import style from "./AllProducts.module.css";
const AllProducts = () => {
  const [data, setData] = useState([{}]);
  const [selectedOption, setSelectedOption] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [searchedItems, setSearchedItems] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    setIsError(false);
    getProductDetails()
      .then((res) => {
        setData(res);
        setIsLoader(false);
      })
      .catch(() => {
        setIsLoader(false);
        setIsError(true);
      });
  }, []);

  const searchFunction = () => {
    setFilteredData(
      [...filteredData].filter((item) =>
        item.title.toLowerCase().includes(searchedItems)
      )
    );
  };

  useEffect(() => {
    setFilteredData(data);
    if (selectedOption === "1") {
      setFilteredData([...data].sort((a, b) => b.price - a.price));
      if (searchedItems.trim() !== "") searchFunction();
    } else if (selectedOption === "2") {
      setFilteredData([...data].sort((a, b) => a.price - b.price));
      if (searchedItems.trim() !== "") searchFunction();
    } else if (selectedOption === "3") {
      setFilteredData([...data].sort((a, b) => b.rating.rate - a.rating.rate));
      if (searchedItems.trim() !== "") searchFunction();
    } else if (selectedOption === "men's clothing") {
      setFilteredData(filteredItems(selectedOption));
      if (searchedItems.trim() !== "") searchFunction();
    } else if (selectedOption === "women's clothing") {
      setFilteredData(filteredItems(selectedOption));
      if (searchedItems.trim() !== "") searchFunction();
    } else if (selectedOption === "electronics") {
      setFilteredData(filteredItems(selectedOption));
      if (searchedItems.trim() !== "") searchFunction();
    } else if (selectedOption === "jewelery") {
      setFilteredData(filteredItems(selectedOption));
      if (searchedItems.trim() !== "") searchFunction();
    } else {
      setFilteredData(data);
      if (searchedItems.trim() !== "") searchFunction();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedOption, searchedItems]);

  const items = filteredData.map((item, index) => (
    <ProductCard
      key={index}
      title={item.title}
      imgsrc={item.image}
      rating={item.rating && item.rating.rate}
      price={item.price}
      productID={item.id}
    />
  ));

  const filteredItems = (filterby) => {
    return data.filter((item) => item.category === filterby);
  };

  const searchInputHandler = (e) => {
    setSearchedItems(e.target.value.toLowerCase());
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-column align-items-center mb-4 mt-4">
        <input
          type="text"
          className={`ms-4 me-4 mb-2 ${style.input}`}
          placeholder="Search items here"
          onChange={searchInputHandler}
        />

        <select
          name=""
          id=""
          className="fs-5 mb-2"
          style={{ padding: "10px", borderRadius: "8px" }}
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
          }}
        >
          <option value="0">Filter by</option>
          <option value="1">Price High to Low</option>
          <option value="2">Price Low to High</option>
          <option value="3">High Customer Rating</option>
          <option>men&apos;s clothing</option>
          <option>women&apos;s clothing</option>
          <option>electronics</option>
          <option>jewelery</option>
        </select>
      </div>
      <div className="d-flex justify-content-center mt-3">
        {isLoader && (
          <Spinner
            animation="border"
            role="status"
            style={{ width: "200px", height: "200px" }}
          ></Spinner>
        )}
      </div>
      {!isLoader && !isError && (
        <div className="d-flex flex-wrap justify-content-center">{items}</div>
      )}
      {isError && (
        <p className="text-danger fs-4 text-center mt-3">
          Something went wrong. Please try again later!
        </p>
      )}
    </div>
  );
};

export default AllProducts;
