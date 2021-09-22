import React, { useState, useContext, useEffect, FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { Button } from '../../components/Button/Button';
import { Container, Card } from '../../globalStyles';
import { Input } from '../../components/UI/Input';
import { Input as InputV4 } from '../../components/UI/V4';
import { AppContext } from '../../context/HubContext';
import { Timer } from './Timer';
import { PrimaryButton } from '../UI/V4';
import { ReactComponent as QuestionIcon } from '../../assets/svg/question14.svg';


type TimerButtonProps = {
  password: string;
  tryCode: number;
  setTryCode: (num: number) => void;
};

const TimerButton: FC<TimerButtonProps> = ({ password, tryCode, setTryCode }: TimerButtonProps) => {
  const [state, setState] = useState<null | string>(null);
  const { t } = useTranslation();
  return (
    <Timer
      last={tryCode > 2 ? localStorage.getItem('time') : ''}
      setTryCode={setTryCode}
      state={state}
      setState={setState}
    >
      {state === null ? (
        <Submit as="button" danger type="submit" disabled={password === '' || state !== null}>
          {t('login.in')}
        </Submit>
      ) : (
        <Submit as="button" danger type="submit" disabled>
          {state}
        </Submit>
      )}
    </Timer>
  );
};

export const LoginComponent = () => {
  const [error, setError] = useState(true);
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');
  const [where, setWhere] = useState(false);
  const [stateRepeat, setStateRepeat] = useState<null | string>(null);
  const [tryCode, setTryCode] = useState(0);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const user = appContext.user;
  const logIn = appContext.login;
  const admin = appContext.isAdmin;
  const history = useHistory();
  const { t } = useTranslation();

  const [loginError, setLoginError] = useState(false);
  const [loginSuccessed, setLoginSuccessed] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordSuccessed, setPasswordSuccessed] = useState(false);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginError(false);
    setError(true);
    setValue(e.target.value.toLowerCase());
  };
  useEffect(() => {
    if (user) {
      history.replace('/info');
    }
  }, []);

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
    setError(true);
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    // console.log('CheckAccount param', value);
    if (hubConnection) {
      hubConnection
        .invoke('CheckAccount', value)
        .then((res: boolean) => {
          if (res) {
            setLoginError(false);
            setLoginSuccessed(true);
            // console.log("CheckAccount", res)

            setTryCode(0);
            setStateRepeat('-');
            localStorage.setItem('timeRepeat', moment().toISOString());
            setError(true);
            loginSubmit();
          } else {
            setLoginError(true);
            setLoginSuccessed(false);
            //
            setError(false);
            setValue('');
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };


  const loginSubmit = () => {
    if (hubConnection) {
      hubConnection
        .invoke('SendAuthCode', value)
        .then((res: boolean) => {
          // console.log("SendAuthCode", res);
          setLoginError(false);
          setLoginSuccessed(true);
          //
          setError(true);
          setLogin(true);
        })
        .catch((err: Error) => {
          setLoginError(true);
          setLoginSuccessed(false);
          //
          setError(false);
        });
    }
  };

  const singIn = () => {
    if (hubConnection) {
      hubConnection
        .invoke('SignIn', { login: value, password: password, signInMethod: 3 })
        .then((res: any) => {
          // console.log("SignIn res", res);
          setTryCode((tryCode) => tryCode + 1);
          localStorage.setItem('time', moment().toISOString());
          if (res.token !== null) {
            setPasswordError(false)
            setPasswordSuccessed(true);
            //
            logIn(res.token);
            history.push('/info')

            setWhere(true);
            setLogin(false);
            setTryCode(0);
          } else {
            setPasswordError(true)
            setPasswordSuccessed(false);
            //
            setError(false);
          }
        })
        .catch((err: Error) => {
          setPasswordError(true);
          setPasswordSuccessed(false);
          //
          setError(false)
        });
    }
  };


  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(value && !password) {
      onSubmit();
      return;
    }
    if(value && passwordError) {
      onSubmit();
      return;
    } 
    if(value && password) {
      singIn();
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
            <H4>{t('login.signIn')}</H4>
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
            <TimerButton tryCode={tryCode} setTryCode={setTryCode} password={password} />

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
            <H4>{t('login.authorize')}</H4>
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
              error={passwordError ? t('login.incorrectPassword') : undefined}
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
                    title={`${t('login.in')}`}
                    type="submit"
                  />
                :
                  <PrimaryButton 
                    title={`${t('login.repeat')} ${stateRepeat}`}
                    type="submit"
                    disabled={true}
                  />
              }
            </Timer>

            <LinkToBlock>
              <LinkTo href={`https://backup.cwd.global/account/${value}`} target="_blank">
                {`${t('login.activityOn')} cwd.global`}
              </LinkTo>
              <QuestionIcon />
            </LinkToBlock>

            <LinkToPage to="/register">{t('headerButton.register')}</LinkToPage>
          </FormBlock>
        {/* </CSSTransition> */}

        {/* <Timer
          last={localStorage.getItem('timeRepeat') || ''}
          setTryCode={setTryCode}
          state={stateRepeat}
          setState={setStateRepeat}
        >
          <RepeatCode
            op={login && !user && !where}
            onClick={onSubmit}
            disabled={stateRepeat !== null}
            hasUnderline={stateRepeat === null}
          >
            <>
              {t('login.repeat')} {stateRepeat && t('login.over') + ' ' + stateRepeat}
            </>
          </RepeatCode>
        </Timer> */}
      </AuthCardContainer>
    </AuthContainer>
  );
};



const AuthContainer = styled(Container)`
  margin: 0 auto;
  padding: 0;
  padding-top: 40px;

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
  width: 480px;
  height: 444px;
  border-radius: 8px;
  background-color: ${props => props.theme.white};
  border-color: ${props => props.theme.white};
  box-shadow: none;

  @media (max-width: 768px) {
    width: 500px;
  }
  @media (max-width: 425px) {
    width: 320px;
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
  margin-bottom: 30px;
`;

const RepeatCode = styled.button<{ op?: boolean; hasUnderline?: boolean; }>`
  opacity: ${(props) => (props.op ? '1' : '0')};
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  text-decoration-line: ${props => props.hasUnderline ? 'underline' : 'none'};
  position: absolute;
  left: 0px;
  right: 0px;
  width: 100%;
  max-width: 200px;
  bottom: 40px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  margin: 0 auto;
  color: ${(props) => props.theme.repeatCode};
  &:disabled {
    cursor: initial;
  }
  @media (max-width: 768px) {
    cursor: initial;
  }
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

// const H4 = styled.h4`
//   text-align: center;
//   font-weight: 500;
//   font-size: 24px;
//   line-height: 28px;
//   margin-bottom: 23px;
// `;

// const FormBlock = styled.form`
//   margin: 0 auto;
//   width: 200px;
//   display: flex;
//   flex-direction: column;
//   position: relative;
// `;

export const Submit = styled(Button)<{ mb?: boolean }>`
  max-width: 100%;
  margin-bottom: ${(props) => (props.mb ? '20px' : '0')};
  color: ${props => props.theme.dangerButtonText};
`;

const CardContainer = styled(Card)`
  /* padding-top: 160px;
  padding-bottom: 160px; */
  display: flex;
  align-items: center;
  position: relative;
  height: 482px;
  border-radius: 10px;
  @media (max-width: 992px) {
    /* padding-top: 125px;
    padding-bottom: 125px; */
    height: 410px;
  }
`;

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
