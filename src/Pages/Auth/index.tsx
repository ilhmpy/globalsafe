import React, { useState, useContext, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { UpTitle } from "../../components/UI/UpTitle";
import { Container, Card } from "../../globalStyles";
import styled from "styled-components/macro";
import { Input, MyInput } from "../../components/UI/Input";
import { Page } from "../../components/UI/Page";
import { AppContext } from "../../context/HubContext";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

export const Authentication = () => {
  const [formValues, setFormValues] = useState<any>();
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Логин не верный").required("Введите логин"),
  });

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  return (
    <Page>
      <Container>
        <UpTitle>Личный кабинет</UpTitle>
      </Container>
      <Container>
        <CardContainer>
          {/* <<FormBlock>
            <H4>Войти в аккаунт</H4>
            <Input placeholder="Введите логин" />
            <Submit danger type="submit">
              Получить код
            </Submit>
          </FormBlock> */}
          <H4>Войти в аккаунт</H4>
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              // console.log(values);
              setFormValues(values);

              if (hubConnection) {
                hubConnection
                  .invoke("SendAuthCode", "stella1")
                  .then((res: any) => {
                    console.log("res", res);
                  })
                  .catch((e: Error) => {
                    console.log(e);
                  });
              }

              const timeOut = setTimeout(() => {
                actions.setSubmitting(false);

                clearTimeout(timeOut);
              }, 1000);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              isSubmitting,
              isValidating,
              isValid,
            }) => {
              return (
                <>
                  <FormBlock
                    name="contact"
                    method="post"
                    onSubmit={handleSubmit}
                  >
                    <MyInput
                      type="text"
                      name="name"
                      placeholder="Введите логин"
                      valid={touched.name && !errors.name}
                      error={touched.name && errors.name}
                    />
                    {errors.name && touched.name && (
                      <StyledInlineErrorMessage>
                        {errors.name}
                      </StyledInlineErrorMessage>
                    )}
                    <Submit
                      as="button"
                      disabled={!isValid || isSubmitting}
                      danger
                      type="submit"
                    >
                      Получить код
                    </Submit>
                  </FormBlock>
                </>
              );
            }}
          </Formik>
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

const FormBlock = styled(Form)`
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
