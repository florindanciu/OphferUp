import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const AddPost = () => {
  const { userId } = useParams();

  return (
    <div>
      {userId === "undefined" ? (
        <div>
          You need to login in order to add a post{" "}
          <Link to="/login">LOGIN</Link>
        </div>
      ) : (
        <div>
          TODO #create add post form wich send a POST call to API/${userId}
        </div>
      )}
    </div>
  );
};

export default AddPost;
