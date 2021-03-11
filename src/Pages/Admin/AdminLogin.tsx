import React from "react";
import * as Styled from "./Styled.elements";
import { LoginComponent } from "../../components/Login";
import { SideNavbar } from "../../components/SideNav";

export const AdminLogin = () => {
  return (
    <Styled.Wrapper>
      <SideNavbar />
      <Styled.Content mtbig>
        <LoginComponent />
      </Styled.Content>
    </Styled.Wrapper>
  );
};
