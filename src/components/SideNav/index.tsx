import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { ReactComponent as DashBoard } from "../../assets/svg/dashboard.svg";
import { ReactComponent as Peppa } from "../../assets/svg/peppa.svg";
import { ReactComponent as Wallet } from "../../assets/svg/wallet.svg";
import { ReactComponent as Users } from "../../assets/svg/users.svg";
import { ReactComponent as Briefcase } from "../../assets/svg/briefcase.svg";
import { ReactComponent as Exit } from "../../assets/svg/exit.svg";
import { NavLink, Link } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";

export const SideNavbar = () => {
  const [navWidth, setNavWidth] = useState(false);
  const sizes = useWindowSize();
  const size = sizes < 1200;

  useEffect(() => {
    if (sizes === 0) {
      return;
    } else if (size && sizes > 0) {
      setNavWidth(true);
    } else {
      setNavWidth(false);
    }
  }, [size]);

  const navShow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!size) {
      setNavWidth(!navWidth);
    }
  };

  return (
    <SideNav small={navWidth}>
      {!size && (
        <NavHead>
          <Burger onClick={navShow}>
            <span></span>
            <span></span>
            <span></span>
          </Burger>
          <Link to="/">
            <LogoBrand />
          </Link>
        </NavHead>
      )}
      <SideInner>
        <Ul>
          <Li>
            <StyledLink to="/admin" exact>
              <DashBoard />
              <Text>Главный экран</Text>
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/admin/deposit">
              <Peppa />
              <Text>Депозиты</Text>
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/admin/payments">
              <Wallet />
              <Text>Выплаты</Text>
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/admin/users">
              <Users />
              <Text>Пользователи</Text>
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="admin/portfolio">
              <Briefcase />
              <Text>Портфель</Text>
            </StyledLink>
          </Li>
        </Ul>
        <Logout>
          <Exit />
          <Text>Выйти</Text>
        </Logout>
      </SideInner>
    </SideNav>
  );
};

const SideInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 80px);
  @media (max-width: 1200px) {
    height: calc(100%);
  }
`;

const SideNav = styled.div<{ small: boolean }>`
  width: ${(props) => (props.small ? "56px" : "243px")};
  min-height: 100vh;
  overflow: hidden;
  height: auto;
  flex: none;
  background: #fff;
  transition: 0.3s;
  @media (max-width: 992px) {
    display: none;
  }
`;

const NavHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 23px 27px 20px;
`;

const Burger = styled.div`
  padding: 5px;
  cursor: pointer;
  span {
    display: block;
    height: 2px;
    width: 14px;
    background: #ff416e;
    border-radius: 4px;
    margin-bottom: 3px;
  }
`;

const LogoBrand = styled(Logo)`
  width: 163px;
  margin-left: 20px;
`;

const Ul = styled.ul`
  list-style: none;
  font-size: 0;
`;

const Li = styled.li`
  display: flex;
  white-space: nowrap;
  align-items: center;
  &:last-child {
    margin-top: auto;
  }
`;

const Text = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  padding-left: 15px;
  color: #515172;
  transition: all 0.3s;
`;

const activeclassname = "active";

const StyledLink = styled(NavLink).attrs({ activeclassname })`
  display: flex;
  align-items: center;
  padding: 11px 20px;
  position: relative;
  width: 100%;
  transition: all 0.3s;
  &.${activeclassname} {
    background: rgba(255, 65, 110, 0.07);
    ${Text} {
      color: #ff416e;
    }
    svg path {
      stroke: #ff416e;
    }
    &:after {
      content: "";
      position: absolute;
      height: 100%;
      width: 2px;
      background: #ff416e;
      border-radius: 4px;
      left: 0;
    }
  }
  svg {
    flex: none;
  }
  &:hover {
    transition: all 0.3s;
    background: rgba(255, 65, 110, 0.07);
    ${Text} {
      color: #ff416e;
    }
    svg path {
      stroke: #ff416e;
      transition: all 0.3s;
    }
    &:after {
      content: "";
      position: absolute;
      height: 100%;
      width: 2px;
      background: #ff416e;
      border-radius: 4px;
      left: 0;
    }
  }
`;

const Logout = styled.div`
  display: flex;
  cursor: pointer;
  white-space: nowrap;
  align-items: center;
  padding: 11px 20px;
  svg {
    width: 24px;
    height: 24px;
    flex: none;
  }
`;
