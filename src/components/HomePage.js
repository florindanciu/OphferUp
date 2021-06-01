import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Categories from "./Categories";
import SearchInput from "./SearchInput";
import FilterData from "./FilterData";

const Home = () => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    setIsLoading(true);
    UserService.getItemsContent().then(
      (response) => {
        setIsLoading(false);
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
      <SearchInput
        setName={setName}
        setLocation={setLocation}
        length={content.length}
      />
      <Categories length={content.length} />
      <h3 style={{ textAlign: "center", marginBottom: "30px" }}>All Offers</h3>
      <FilterData
        name={name}
        location={location}
        data={content}
        loading={isLoading}
        message={"Sorry, no products available at this time."}
      />
    </div>
  );
};

export default Home;
