import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SearchInput from "./SearchInput";
import FilterData from "./FilterData";
import CancelIcon from "@material-ui/icons/Cancel";

const ItemsByCategory = () => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const { categoryId } = useParams();

  useEffect(() => {
    getCategory(categoryId);
    getItems(categoryId);
  }, [categoryId]);

  const getItems = (category_id) => {
    setIsLoading(true);
    UserService.getItemsByCategory(category_id).then(
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
  };

  const getCategory = (category_id) => {
    setIsLoading(true);
    UserService.getCategoryById(category_id).then(
      (response) => {
        setIsLoading(false);
        setCategory(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setCategory(_content);
      }
    );
  };

  return (
    <div>
      {content.length !== 0 ? (
        <>
          <h3 style={{ textAlign: "center", marginTop: "50px" }}>
            All Offers from {category.enumCategory}
          </h3>
          <SearchInput
            setName={setName}
            setLocation={setLocation}
            length={content.length}
          />
          <FilterData
            name={name}
            location={location}
            data={content}
            loading={isLoading}
          />
        </>
      ) : (
        <div
          style={{ color: "white", textAlign: "center", paddingTop: "100px" }}
        >
          <Card bg="warning">
            <Card.Body>
              <Card.Link
                style={{
                  color: "white",
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                }}
                href="/home"
              >
                <CancelIcon />
              </Card.Link>
              <Card.Text>
                Sorry, no offers from {category.enumCategory} category yet.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ItemsByCategory;
