import React, { useState, useContext, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { UpTitle } from "../../components/UI/UpTitle";
import { Container, Card } from "../../globalStyles";
import styled from "styled-components/macro";
import { Input, MyInput } from "../../components/UI/Input";
import { Page } from "../../components/UI/Page";
import { AppContext } from "../../context/HubContext";
import { useHistory } from "react-router-dom";

export const Authentication = () => {
  const [error, setError] = useState(true);
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const history = useHistory();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(true);
    setValue(e.target.value);
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
            localStorage.setItem("token", res.token);
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
          setLogin(true);
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const onSubmitCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    singIn();
  };

  return (
    <Page>
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
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={onChange}
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
    </Page>
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
  &:disabled {
    cursor: pointer;
    background-color: rgb(163, 168, 173);
    box-shadow: none;
    color: rgb(255, 255, 255) !important;
    border-color: rgb(163, 168, 173);
    outline: none;
    &:hover,
    &:focus {
      cursor: not-allowed;
      outline: none;
    }
  }
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
