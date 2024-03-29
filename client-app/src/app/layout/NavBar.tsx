import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
  return (
    <>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/" header>
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: "10px" }}
            ></img>
            Reactivities
          </Menu.Item>
          <Menu.Item as={NavLink} to="/activities" name="Activities" />
          <Menu.Item>
            <Button
              as={NavLink}
              to="/createActivity"
              positive
              content="Create Activity"
            ></Button>
          </Menu.Item>
        </Container>
      </Menu>
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>
    </>
  );
}
