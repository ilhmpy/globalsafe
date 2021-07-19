import styled from "styled-components/macro";
import { Field } from "formik";

export const Input = styled.input`
  border: 1px solid #ff416e;
  box-sizing: border-box;
  border-radius: 24px;
  font-size: 14px;
  padding: 12px 10px;
  width: 100%;
  line-height: 16px;
  text-align: center;
  background: transparent;
  color: ${(props) => props.theme.text};
  margin-bottom: 20px;
  &::placeholder {
    color: ${(props) => props.theme.text2};
  }
  &:focus {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 3px rgba(0, 126, 255, 0.1);
    outline: none;
  }
`;

export const MyInput = styled(Field)`
  border: 1px solid #ff416e;
  box-sizing: border-box;
  border-radius: 24px;
  font-size: 14px;
  padding: 12px 10px;
  background: transparent;
  width: 100%;
  line-height: 16px;
  text-align: center;
  color: rgba(14, 13, 61, 1);
  margin-bottom: 15px;
  &::placeholder {
    color: rgba(14, 13, 61, 0.5);
  }
  &:focus,
  &:active {
    box-shadow: rgb(210, 213, 217) 0px 0px 2px 1px,
      rgb(227, 230, 232) 0px 0px 0px 3px;
    border: 1px solid rgb(26, 33, 43);
    outline: none;
  }

  /* Autocomplete styles in Chrome*/
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 0 0 0px 1000px #fff inset;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: black;
  }

  ${({ valid }) =>
    valid &&
    `
      border: 1px solid rgb(0, 156, 38);

      &:focus,
      &:active {
        border: 1px solid rgb(0, 156, 38);
        box-shadow: rgb(106, 237, 97) 0px 0px 2px 1px,
          rgb(177, 247, 160) 0px 0px 0px 3px;
        outline: none;
      }

      /* Autocomplete styles in Chrome*/
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        border: 1px solid rgb(0, 156, 38);
      }
    `}

  ${({ error }) =>
    error &&
    `
      border: 1px solid rgb(191, 49, 12);
      outline: none;

      &:focus,
      &:active {
        box-shadow: rgb(244, 129, 116) 0px 0px 2px 1px,
          rgb(251, 178, 174) 0px 0px 0px 3px;
        border: 1px solid rgb(191, 49, 12);
        outline: none;
      }

      /* Autocomplete styles in Chrome*/
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        border: 1px solid rgb(191, 49, 12);
      }
    `}
`;
