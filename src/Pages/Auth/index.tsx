import React, { useState, useContext, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { UpTitle } from "../../components/UI/UpTitle";
import { Container, Card } from "../../globalStyles";
import styled from "styled-components/macro";
import { Input, MyInput } from "../../components/UI/Input";
import { Page } from "../../components/UI/Page";
import { AppContext } from "../../context/HubContext";
import { useHistory } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

export const Authentication = () => {
  const [error, setError] = useState(true);
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const history = useHistory();
  const [myToken, setMyToken] = useLocalStorage("token");

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(true);
    setValue(e.target.value);
  };

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(true);
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit", value);
    if (hubConnection) {
      hubConnection
        .invoke("CheckAccount", value)
        .then((res: boolean) => {
          console.log("res", res);
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
          console.log("res", res);
          if (res.token !== null) {
            setMyToken(res.token);
            history.push("/info");
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  console.log("value", value, password);

  const loginSubmit = () => {
    if (hubConnection) {
      hubConnection
        .invoke("SendAuthCode", value)
        .then((res: boolean) => {
          console.log("res", res);
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
  };

  return (
    <AuthPage>
      <Container>
        <UpTitle>Личный кабинет</UpTitle>
      </Container>
      <Container>
        <CardContainer>
          {login ? (
            <FormBlock onSubmit={onSubmitCode}>
              <H4>Войти в аккаунт</H4>
              <Input
                value={password}
                name="password"
                placeholder="Введите код"
                onChange={onChangeNumber}
              />
              {!error && (
                <StyledInlineErrorMessage>
                  Код не верный
                </StyledInlineErrorMessage>
              )}
              <Submit
                as="button"
                danger
                type="submit"
                disabled={password === ""}
              >
                Войти
              </Submit>
            </FormBlock>
          ) : (
            <FormBlock onSubmit={onSubmit}>
              <H4>Войти в аккаунт</H4>
              <Input
                value={value}
                name="login"
                placeholder="Введите логин"
                onChange={onChangeValue}
              />
              {!error && (
                <StyledInlineErrorMessage>
                  Логин не верный
                </StyledInlineErrorMessage>
              )}
              <Submit as="button" danger type="submit" disabled={value === ""}>
                Получить код
              </Submit>
            </FormBlock>
          )}
        </CardContainer>
      </Container>
    </AuthPage>
  );
};

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

const Submit = styled(Button)`
  max-width: 100%;
`;

const CardContainer = styled(Card)`
  padding-top: 160px;
  padding-bottom: 160px;
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

const AuthPage = styled(Page)`
  height: 100vh;
`;
