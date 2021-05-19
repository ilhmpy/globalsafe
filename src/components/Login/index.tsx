import React, { useState, useContext, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { Container, Card } from "../../globalStyles";
import styled from "styled-components/macro";
import { Input } from "../../components/UI/Input";
import { AppContext } from "../../context/HubContext";
import { Link, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useTranslation } from "react-i18next";
import { Timer } from "./Timer";
import moment from "moment";

export const LoginComponent = () => {
  const [error, setError] = useState(true);
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");
  const [where, setWhere] = useState(false);
  const [state, setState] = useState<null | string>(null);
  const [stateRepeat, setStateRepeat] = useState<null | string>(null);
  const [tryCode, setTryCode] = useState(0);
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    e.preventDefault();
    // console.log("submit", value);
    if (hubConnection) {
      hubConnection
        .invoke("CheckAccount", value.toLowerCase())
        .then((res: boolean) => {
          localStorage.setItem("timeRepeat", moment().toISOString());
          if (res) {
            setTryCode(0);
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
            setTryCode(0);
          } else {
            setTryCode((tryCode) => tryCode + 1);
            localStorage.setItem("time", moment().toISOString());
            setError(false);
          }
        })
        .catch((err: Error) => setError(false));
    }
  };

  console.log("value", value);

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
            {/* <Submit as="button" danger type="submit" disabled={password === ""}>
              {t("login.in")}
            </Submit> */}
            <Timer
              last={tryCode > 2 ? localStorage.getItem("time") : ""}
              tryCode={tryCode}
              setTryCode={setTryCode}
              state={state}
              setState={setState}
              value={password}
            >
              {state === null ? (
                <Submit
                  as="button"
                  danger
                  type="submit"
                  disabled={value === "" || state !== null}
                >
                  {t("login.in")}
                </Submit>
              ) : (
                <Submit as="button" danger type="submit" disabled>
                  {state}
                </Submit>
              )}
            </Timer>

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
            <Submit
              as="button"
              danger
              type="submit"
              disabled={value === "" || state !== null}
            >
              {t("login.getCode")}
            </Submit>

            {/* 
            {state !== null && (
              <Submit as="button" danger disabled>
                <Timer state={state} setState={setState} />
              </Submit>
            )} */}
            {/* <Timer state={state} setState={setState} value={value} /> */}
            {/* <LinkToPage to="/register">{t("headerButton.register")}</LinkToPage> */}
          </FormBlock>
        </CSSTransition>
        {/* {tryCode > 2 && (
          <RepeatCode onClick={onSubmit} disabled={state !== null}>
            {t("login.repeat")} {state && t("login.over") + " " + state}
          </RepeatCode>
        )} */}
        <Timer
          last={localStorage.getItem("timeRepeat") || null}
          tryCode={tryCode}
          setTryCode={setTryCode}
          state={stateRepeat}
          setState={setStateRepeat}
          value={password}
        >
          <RepeatCode onClick={onSubmit} disabled={stateRepeat !== null}>
            {t("login.repeat")}{" "}
            {stateRepeat && t("login.over") + " " + stateRepeat}
          </RepeatCode>
        </Timer>
      </CardContainer>
    </Container>
  );
};

const RepeatCode = styled.button`
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  text-decoration-line: underline;
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  color: ${(props) => props.theme.repeatCode};
  @media (max-width: 768px) {
    cursor: initial;
  }
`;

const LinkToPage = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  margin-top: 20px;
  text-align: center;
  color: ${(props) => props.theme.text};
`;

const LinkTo = styled.a`
  margin-top: 20px;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  text-decoration-line: underline;
  color: ${(props) => props.theme.text2};
`;

const H4 = styled.h4`
  text-align: center;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 20px;
`;

const FormBlock = styled.form`
  margin: 0 auto;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

export const Submit = styled(Button)<{ mb?: boolean }>`
  max-width: 100%;
  margin-bottom: ${(props) => (props.mb ? "20px" : "0")};
  color: ${(props) => props.theme.text};
`;

const CardContainer = styled(Card)`
  padding-top: 160px;
  padding-bottom: 160px;
  display: flex;
  position: relative;
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
