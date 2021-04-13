import React, { useState, useContext, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { Container, Card } from "../../globalStyles";
import styled from "styled-components/macro";
import { Input } from "../../components/UI/Input";
import { AppContext } from "../../context/HubContext";
import { Link, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useTranslation } from "react-i18next";

export const LoginComponent = () => {
  const [error, setError] = useState(true);
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");
  const [where, setWhere] = useState(false);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const user = appContext.user;
  const logIn = appContext.login;
  const admin = appContext.isAdmin;
  const history = useHistory();
  const { t } = useTranslation();

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(true);
    setValue(e.target.value);
  };
  useEffect(() => {
    if (user) {
      history.replace("/info");
    }
  }, []);

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(true);
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("submit", value);
    if (hubConnection) {
      hubConnection
        .invoke("CheckAccount", value)
        .then((res: boolean) => {
          // console.log("res", res);
          if (res) {
            setError(true);
            loginSubmit();
          } else {
            setError(false);
            setValue("");
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const singIn = () => {
    if (hubConnection) {
      hubConnection
        .invoke("SignIn", { login: value, password: password, signInMethod: 3 })
        .then((res: any) => {
          // console.log("res", res);
          if (res.token !== null) {
            logIn(res.token);
            setWhere(true);
            setLogin(false);
          } else {
            setError(false);
          }
        })
        .catch((err: Error) => setError(false));
    }
  };

  // console.log("value", value, password);

  const loginSubmit = () => {
    if (hubConnection) {
      hubConnection
        .invoke("SendAuthCode", value)
        .then((res: boolean) => {
          // console.log("res", res);
          setError(true);
          setLogin(true);
        })
        .catch((err: Error) => {
          setError(false);
        });
    }
  };

  const onSubmitCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    singIn();
    // setWhere(true);
    // setLogin(false);
  };

  return (
    <Container>
      <CardContainer>
        <CSSTransition
          in={where || !!user}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          <FormBlock>
            <H4>{t("login.where")}</H4>

            <Submit
              mb
              as="button"
              onClick={() => history.push("/info")}
              dangerOutline
            >
              {t("headerButton.personalArea")}
            </Submit>
            <Submit
              as="button"
              onClick={() => history.push("/admin")}
              danger
              disabled={!admin}
            >
              {t("headerButton.admin")}
            </Submit>
          </FormBlock>
        </CSSTransition>
        <CSSTransition
          in={login && !user && !where}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          <FormBlock onSubmit={onSubmitCode}>
            <H4>{t("login.signIn")}</H4>
            <Input
              value={password}
              name="password"
              placeholder={t("login.code")}
              onChange={onChangeNumber}
              autoComplete="new-password"
            />
            {!error && (
              <StyledInlineErrorMessage>
                {t("login.incorrectCode")}
              </StyledInlineErrorMessage>
            )}
            <Submit as="button" danger type="submit" disabled={password === ""}>
              {t("login.in")}
            </Submit>
            <LinkTo
              href={`https://cwd.global/account/${value}`}
              target="_blank"
            >
              {t("login.goTo")}
            </LinkTo>
          </FormBlock>
        </CSSTransition>

        <CSSTransition
          in={!login && !user && !where}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          <FormBlock onSubmit={onSubmit}>
            <H4>{t("login.signIn")}</H4>
            <Input
              value={value}
              name="login"
              placeholder={t("login.login")}
              onChange={onChangeValue}
              autoComplete="off"
            />
            {!error && (
              <StyledInlineErrorMessage>
                {t("login.incorrectLogin")}
              </StyledInlineErrorMessage>
            )}
            <Submit as="button" danger type="submit" disabled={value === ""}>
              {t("login.getCode")}
            </Submit>
            <LinkToPage to="/register">{t("headerButton.register")}</LinkToPage>
          </FormBlock>
        </CSSTransition>
      </CardContainer>
    </Container>
  );
};

const LinkToPage = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  margin-top: 20px;
  text-align: center;
  color: #0e0d3d;
`;

const LinkTo = styled.a`
  margin-top: 20px;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  text-decoration-line: underline;
  color: #515172;
`;

const H4 = styled.h4`
  text-align: center;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #0e0d3d;
  margin-bottom: 20px;
`;

const FormBlock = styled.form`
  margin: 0 auto;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

const Submit = styled(Button)<{ mb?: boolean }>`
  max-width: 100%;
  margin-bottom: ${(props) => (props.mb ? "20px" : "0")};
`;

const CardContainer = styled(Card)`
  padding-top: 160px;
  padding-bottom: 160px;
  display: flex;
  @media (max-width: 992px) {
    padding-top: 125px;
    padding-bottom: 125px;
  }
`;

export const StyledInlineErrorMessage = styled.div`
  color: #ff416e;
  display: block;
  font-size: 14px;
  line-height: 16px;
  white-space: pre-line;
  margin-bottom: 15px;
  text-align: center;
`;

export const CodeWrapper = styled.pre`
  font-family: monospace;
  font-size: 0.875rem;
  line-height: 1.25rem;
  background-color: hsl(210, 4%, 96%);
  overflow: auto;
  padding: 0.75rem;
  margin: 0;
  border-radius: 4px;

  & strong {
    margin-top: 1.5rem;

    &:first-child {
      margin-top: 0;
    }
  }
`;
