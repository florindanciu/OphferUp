import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import SearchBar from "./SearchBar";

const Home = () => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      <SearchBar length={content.length} items={content} loading={isLoading} />
    </div>
  );
};

export default Home;
