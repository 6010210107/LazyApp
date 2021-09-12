import React from "react";
import { Card, Button } from "react-bootstrap";
import "./CustomCard.css";

const CustomCard = ({
  imgPath = null,
  content = "",
  cardTitle = "",
  shadow = "shadow",
  cardAs = "a",
  toLink = "",
  allowFooter = false,
}) => {
  return (
    <>
      <Card
        // style={{ margin: "1rem", maxWidth: "18rem" }}
        className={`${shadow ? shadow : "shadow-none"} card-conatiner`}
      >
        <Card.Link as={cardAs} to={toLink}>
          <Card.Img variant="top" src={imgPath} className="card-img" />
        </Card.Link>
        <Card.Body className="border-top">
          <Card.Title>{cardTitle ? cardTitle : "Card Title"}</Card.Title>
          <Card.Text>
            {content
              ? content
              : "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </Card.Text>
        </Card.Body>
        {allowFooter ? (
          <Card.Footer className="justify-content-end">
            <u>{`>>>`} </u>{" "}
          </Card.Footer>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};

export default CustomCard;
