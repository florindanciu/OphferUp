import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";
import { Alert, Button } from "react-bootstrap";
import OfferForm from "../utils/OfferForm";

const AddPost = () => {
  const { userId } = useParams();
  const [message, setMessage] = useState("");
  const [successfull, setSuccessfull] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({
    itemName: "",
    description: "",
    category: "",
    price: "",
    location: "",
    contactPerson: "",
    contactEmail: "",
    phoneNumber: "",
  });
  const [files, setFiles] = useState({
    file1: {},
    file2: {},
    file3: {},
  });

  useEffect(() => {
    setLoading(true);
    UserService.getCategories().then(
      (response) => {
        setLoading(false);
        setCategories(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setCategories(_content);
      }
    );
  }, []);

  const handleForm = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessfull("");

    UserService.addItem(userId, item).then(
      (response) => {
        if (response.status === 200) {
          const itemId = response.data.new_itemId;
          // creating FormData object
          const formData = new FormData();
          formData.append("file1", files.file1);
          formData.append("file2", files.file2);
          formData.append("file3", files.file3);

          UserService.uploadImages(itemId, formData)
            .then((response) => {
              setMessage(`${response.data} submitted.`);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        setSuccessfull("true");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessfull("false");
      }
    );
  };

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeFileHandler = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const notification = () => {
    if (successfull === "true") {
      return <Alert variant="success">{message}</Alert>;
    } else if (successfull === "false") {
      return <Alert variant="warning">{message}</Alert>;
    }
  };

  return (
    <div>
      {userId === "undefined" ? (
        <>
          <Alert
            variant="success"
            style={{ textAlign: "center", marginTop: "25%" }}
          >
            <Alert.Heading>
              <h5>Please login first in order to add an offer!</h5>
            </Alert.Heading>

            <hr />
            <div className="d-flex justify-content-end">
              <Button href="/login" variant="outline-success">
                Go to LOGIN
              </Button>
            </div>
          </Alert>
        </>
      ) : (
        <div>
          <h2>Add offer</h2>
          {notification()}
          <OfferForm
            handleForm={handleForm}
            onChangeHandler={onChangeHandler}
            item={item}
            categories={categories}
            onChangeFileHandler={onChangeFileHandler}
            handleCancel={"/"}
          />
        </div>
      )}
    </div>
  );
};

export default AddPost;
