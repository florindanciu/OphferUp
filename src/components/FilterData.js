import React, { useMemo } from "react";
import { Card, CardColumns, CardDeck } from "react-bootstrap";
import { Link } from "react-router-dom";

const FilterData = ({ name, location, data, loading }) => {
  const filteredResults = useMemo(() => {
    if (!name && !location) {
      return data;
    } else if (name && !location) {
      return data.filter((item) => {
        return item.itemName.toLowerCase().includes(name.toLowerCase());
      });
    } else if (!name && location) {
      return data.filter((item) => {
        return item.location.toLowerCase().includes(location.toLowerCase());
      });
    } else {
      return data.filter((item) => {
        return (
          item.itemName.toLowerCase().includes(name.toLowerCase()) &&
          item.location.toLowerCase().includes(location.toLowerCase())
        );
      });
    }
  }, [name, location, data]);

  const formatDate = (string) => {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <CardColumns>
        {loading
          ? "Loading..."
          : filteredResults.map((item) => (
              <Card key={item.id}>
                <Link to={`/details/${item.id}`}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/api/v1/items/image/${item.id}/file1/download`}
                  />
                </Link>
                <Card.Body>
                  <Card.Text>{item.itemName}</Card.Text>
                  <small className="text-muted">
                    {item.location} - {formatDate(item.postingDate)}
                  </small>
                  <Card.Title style={{ marginTop: "20px" }}>
                    $ {item.price}
                  </Card.Title>
                </Card.Body>
              </Card>
            ))}
      </CardColumns>
    </div>
  );
};
export default FilterData;
