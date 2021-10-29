import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components/macro';
import moment from 'moment';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/UI/Input';
import { Input as InputV4 } from '../../components/UI/V4';
import { AppContext } from '../../context/HubContext';
import { Card, Container } from '../../globalStyles';
import { PrimaryButton, Tooltip } from '../UI/V4';
import { ReactComponent as QuestionIcon } from '../../assets/svg/question14.svg'
import { Timer } from '../Login/Timer';

export const RegisterComponent: FC = () => {
  const [error, setError] = useState(true);
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');
  const [where, setWhere] = useState(false);
  const [cwdAccount, setCwdAccount] = useState(false);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const user = appContext.user;
  const logIn = appContext.login;
  const admin = appContext.isAdmin;
  const history = useHistory();
  const { t } = useTranslation();

  const [tryCode, setTryCode] = useState(0);
  const [stateRepeat, setStateRepeat] = useState<null | string>(null);
  const [loginError, setLoginError] = useState(false);
  const [loginSuccessed, setLoginSuccessed] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordSuccessed, setPasswordSuccessed] = useState(false);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginError(false)
    setError(true);
    setValue(e.target.value);
  };
  useEffect(() => {
    if (user) {
      history.replace('/info');
    }
  }, []);

  useEffect(() => {
    if(user) {
      history.replace('/info');
    }
  }, [user]);

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
    setError(true);

    let val = e.target.value;
    if(e.target.value.length >= 4 && password.length < 4) {
      val = [val.slice(0, 3), ' ', val.slice(3)].join('')
    }
    setPassword(val);
  };

  const singIn = () => {
    if (hubConnection) {
      hubConnection
        .invoke('SignIn', { login: value, password: password.replace(/\s/g, ""), signInMethod: 3 })
        .then((res: any) => {
          setTryCode((tryCode) => tryCode + 1);
          localStorage.setItem('time', moment().toISOString());
          console.log("SignIn", res);
          if (res.token !== null) {
            setPasswordError(false);
            setPasswordSuccessed(true);
            logIn(res.token);
            setWhere(true);
            setLogin(false);

            setTryCode(0);
          } else {
            setPasswordError(true);
            setPasswordSuccessed(false);
            setError(false);
          }
        })
        .catch((err: Error) => {
          setPasswordError(true);
          setPasswordSuccessed(false);

          setError(false)
        });
    }
  };

  const loginSubmit = () => {
    if (hubConnection) {
      hubConnection
        .invoke('SendAuthCode', value)
        .then((res: boolean) => {
          console.log("SendAuthCode res", res);
          setError(true);
          setLogin(true);
        })
        .catch((err: Error) => {
          setError(false);
        });
    }
  };

  // const onSubmitCode = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   singIn();
  // };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(value && !password) {
      checkCwdAccount();
      return;
    }
    if(value && passwordError) {
      loginSubmit();
      return;
    } 
    if(value && password) {
      singIn();
    }
  };

  const createAccount = () => {
    if (hubConnection) {
      hubConnection
        .invoke('CreateAccount', value, 1)
        .then((res: boolean) => {
          console.log('CreateAccount', res);
          setError(true);
          loginSubmit();
        })
        .catch((err: Error) => {
          setError(false);
          console.log(err);
        });
    }
  };

  // Check Cwd Account exists
  const checkCwdAccount = () => {
    if (hubConnection) {
      hubConnection
        .invoke('CheckCwdAccount', value)
        .then((res: boolean) => {
          console.log('CheckCwdAccount', res);
          if (res) {
            setLoginError(false);
            setLoginSuccessed(true);
            //
            setError(true);
            setCwdAccount(true);

            onSubmit();
          } else {
            setLoginError(true);
            setLoginSuccessed(false);
            //
            setError(false);
            setCwdAccount(false);
          }
        })
        .catch((err: Error) => {
          setLoginError(true);
          setLoginSuccessed(false);
          //
          setError(false);
          console.log(err);
        });
    }
  };

  // Check Account Exists or NOT
  const onSubmit = () => {
    if (hubConnection) {
      hubConnection
        .invoke('CheckAccount', value)
        .then((res: boolean) => {
          console.log('CheckAccount', res);
          if (res) {
            setLoginError(false);
            setLoginSuccessed(true);
            setTryCode(0);
            //

            setTryCode(0);
            setStateRepeat('-');
            localStorage.setItem('timeRepeat', moment().toISOString());

            setError(true);
            loginSubmit();
          } else {
            
            createAccount();
            // setError(false);
          }
        })
        .catch((err: Error) => {
          setLoginError(true);
          setLoginSuccessed(false);
          console.log(err)
      });
    }
  };


  return (
    <AuthContainer>
      <AuthCardContainer>
        {/* <CSSTransition in={where || !!user} timeout={300} classNames="alert" unmountOnExit>
          <FormBlock>
            <H4>{t('login.where')}</H4>

            <Submit mb as="button" onClick={() => history.push('/info')} dangerOutline>
              {t('headerButton.personalArea')}
            </Submit>
            <Submit as="button" onClick={() => history.push('/admin')} danger disabled={!admin}>
              {t('headerButton.admin')}
            </Submit>
          </FormBlock>
        </CSSTransition> */}

        {/* <CSSTransition in={login && !user && !where} timeout={300} classNames="alert" unmountOnExit>
          <FormBlock onSubmit={onSubmitCode}>
            <H4>{t('headerButton.register')}</H4>
            <SelfInput
              value={password}
              name="password"
              placeholder={t('login.code')}
              onChange={onChangeNumber}
              autoComplete="new-password"
            />
            {!error && (
              <StyledInlineErrorMessage>{t('login.incorrectCode')}</StyledInlineErrorMessage>
            )}
            <Submit as="button" danger type="submit" disabled={password === ''}>
              {t('login.in')}
            </Submit>
            <LinkToPage to="/login">{t('login.enter')}</LinkToPage>
            <LinkTo href={`https://backup.cwd.global/account/${value}`} target="_blank">
              {t('login.goTo')}
            </LinkTo>
          </FormBlock>
        </CSSTransition> */}

        {/* <CSSTransition
          in={!login && !user && !where}
          timeout={300}
          classNames="alert"
          unmountOnExit
        > */}
          <FormBlock onSubmit={onFormSubmit}>
            <H4>{t('headerButton.register')}</H4>
            <InputV4 
              value={value}
              name="login"
              placeholder={t('login.loginCWD')}
              onChange={onChangeValue}
              autoComplete="off"
              error={loginError ? t('login.incorrectLogin') : undefined}
              mb={10}
            />
            <InputV4 
                value={password}
                name="password"
                placeholder={t('login.oneTimeCode')}
                onChange={onChangeNumber}
                autoComplete="new-password"
                disabled={!loginSuccessed}
                isValid={passwordSuccessed}
                error={passwordError ? t('login.incorrectCode') : undefined}
                mb={20}
            />
           
           <Timer
              last={localStorage.getItem('timeRepeat') || ''}
              setTryCode={setTryCode}
              state={stateRepeat}
              setState={setStateRepeat}
            >
              {stateRepeat === null ? (
                <PrimaryButton 
                  title={t('login.getCode')}
                  type="submit"
                  disabled={value === ''}
                />
              ) : 
              (password && !passwordError)
                ?
                  <PrimaryButton 
                    title={`${t('login.register')}`}
                    type="submit"
                  />
                :
                  <PrimaryButton 
                    title={`${t('login.repeat')} ${stateRepeat}.`}
                    type="submit"
                    disabled={true}
                  />
              }
            </Timer>

            <LinkToBlock>
              <LinkTo href={`https://backup.cwd.global/account/${value}`} target="_blank">
                {`${t('login.activityOn')} cwd.global`}
              </LinkTo>
              <Tooltip 
                renderLabel={() => (
                  <InfoLinkBlock>
                    <span>Откроется в новом окне.</span><br />
                    <span>Код доступа приходит в раздел</span><br />
                    <div>Активность на 
                      <LinkToSmall href={`https://backup.cwd.global/account/${value}`} target="_blank">cwd.global</LinkToSmall>
                    </div>
                  </InfoLinkBlock>
                )} 
                direction="right"
              >
                <QuestionIcon />
              </Tooltip>
            </LinkToBlock>

            <LinkToPage to="/login">{t('login.authorize')}</LinkToPage>
          </FormBlock>
        {/* </CSSTransition> */}
      </AuthCardContainer>
    </AuthContainer>
  );
};



const AuthContainer = styled(Container)`
  justify-content: flex-start;
  flex: 1;
  margin: 38px auto 0 auto;
  
  padding: 0;
  padding-top: 80px;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 80px;
  }
  @media (max-width: 425px) {
    padding-top: 20px;
  }
`;

const AuthCardContainer = styled(Card)`
  display: flex;
  justify-content: center;
  padding-top: 40px;
  position: relative;
  max-width: 480px;
  width: 100%;
  height: 444px;
  border-radius: 8px;
  background-color: ${props => props.theme.white};
  border-color: ${props => props.theme.white};
  box-shadow: none;

  @media (max-width: 768px) {
    max-width: 500px;
  }
  @media (max-width: 425px) {
    max-width: 320px;
    height: 302px;
    padding-top: 20px;
  }
`;

const H4 = styled.h4`
  text-align: center;
  color: ${props => props.theme.black};
  font-weight: 700;
  font-size: 36px;
  line-height: 42px;
  margin-bottom: 40px;

  @media (max-width: 425px) {
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 20px;
  }
`;

const FormBlock = styled.form`
  width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 768px) {
    width: 340px;
  }
  @media (max-width: 425px) {
    width: 280px;
  }
`;


const SelfInput = styled(Input)`
  margin-bottom: 26px;
`;

const LinkToPage = styled(Link)`
  font-size: 14px;
  line-height: 16px;
  text-decoration-line: underline;
  color: ${(props) => props.theme.black};
`;

const LinkToBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 40px;

  @media (max-width: 425px) {
    margin-bottom: 20px;
  }
`;

const LinkTo = styled.a`
  font-size: 14px;
  line-height: 16px;
  text-decoration-line: underline;
  color: ${(props) => props.theme.black};
  margin-right: 5px;
`;

const LinkToSmall = styled.a`
  font-size: 12px;
  line-height: 20px;
  text-decoration-line: underline;
  color: #3F3E4E;
  margin-left: 5px;
`;

const InfoLinkBlock = styled.div`
  padding: 7px 0;
`;


const Submit = styled(Button)<{ mb?: boolean }>`
  max-width: 100%;
  margin-bottom: ${(props) => (props.mb ? '20px' : '0')};
  color: ${(props) => props.theme.text};
`;

// const CardContainer = styled(Card)`
//   display: flex;
//   align-items: center;
//   position: relative;
//   height: 482px;
//   border-radius: 10px;
//   @media (max-width: 992px) {
//     height: 410px;
//   }
// `;

export const StyledInlineErrorMessage = styled.div`
  color: #ff416e;
  display: block;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  position: absolute;
  width: 100%;
  top: 98px;
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
