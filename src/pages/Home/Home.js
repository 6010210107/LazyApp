import React from "react";
import "./Hone.css";
import { Container, Row, Col } from "react-bootstrap";
import { CustomCard, Logo } from "../../components";
import { NavLink } from "react-router-dom";
import { information } from "../../assets/data/information";
import uniqueString from "unique-string";

const Home = () => {
  return (
    <Container>
      <Container className="content-header text-center my-5 ">
        <Logo size="large" bold newLine />
      </Container>
      <Container fluid="md" className="card-content-container">
        <Row>
          <RenderCard />
        </Row>
      </Container>
    </Container>
  );
};

export default Home;

const RenderCard = () => {
  return information.app_list.map((list) => {
    return (
      <Col key={uniqueString()} xs={12} md={`auto`} className="card-gap">
        <CustomCard
          cardAs={NavLink}
          toLink={list.link}
          imgPath={list.imgPath}
          cardTitle={list.title}
          content={list.content}
        />
      </Col>
    );
  });
};
