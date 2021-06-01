import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import USER_SERVICE from "../services/user.service";
import { Alert } from "react-bootstrap";
import OfferForm from "../utils/OfferForm";

const EditItem = ({ itemId, handleEdit }) => {
  const { userId } = useParams();
  const [message, setMessage] = useState("");
  const [successfull, setSuccessfull] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState({
    itemId: "",
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

  // console.log(files);

  useEffect(() => {
    getItem();
    getCategories();
  }, []);

  const getItem = () => {
    setLoading(true);
    USER_SERVICE.getItemById(itemId).then(
      (response) => {
        setItem({
          itemId: response.data.id,
          itemName: response.data.itemName,
          description: response.data.description,
          category: response.data.category,
          price: response.data.price,
          location: response.data.location,
          contactPerson: response.data.contactPerson,
          contactEmail: response.data.contactEmail,
          phoneNumber: response.data.phoneNumber,
        });
        setLoading(false);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setCategories(_content);
      }
    );
  };

  const getCategories = () => {
    setLoading(true);
    USER_SERVICE.getCategories().then(
      (response) => {
        setCategories(response.data);
        setLoading(false);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setCategories(_content);
      }
    );
  };

  const handleForm = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessfull("");
    USER_SERVICE.updateItem(item.itemId, item).then(
      (response) => {
        if (response.status === 202) {
          if (
            files.file1.name === undefined ||
            files.file2.name === undefined ||
            files.file3.name === undefined
          ) {
            setMessage(response.data);
          } else {
            setOpen(true);
            // creating FormData object
            console.log("inside else");
            const formData = new FormData();
            formData.append("file1", files.file1);
            formData.append("file2", files.file2);
            formData.append("file3", files.file3);
            USER_SERVICE.uploadImages(item.itemId, formData)
              .then((response) => {
                setMessage(`${response.data} updated.`);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
        setOpen(false);
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
    <React.Fragment>
      <h2>Edit offer</h2>
      {notification()}
      <OfferForm
        handleForm={handleForm}
        onChangeHandler={onChangeHandler}
        item={item}
        categories={categories}
        onChangeFileHandler={onChangeFileHandler}
        handleCancel={handleEdit}
      />
    </React.Fragment>
  );
};

export default EditItem;
