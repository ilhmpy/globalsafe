import React, { useState, useContext, useEffect, FC } from 'react';
import { Button } from '../../components/Button/Button';
import { Container, Card } from '../../globalStyles';
import styled from 'styled-components/macro';
import { Input } from '../../components/UI/Input';
import { AppContext } from '../../context/HubContext';
import { Link, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import { Timer } from './Timer';
import moment from 'moment';

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

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(true);
    setValue(e.target.value.toLowerCase());
  };
  useEffect(() => {
    if (user) {
      history.replace('/info');
    }
  }, []);

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(true);
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    e.preventDefault();
    console.log('submit', value);
    if (hubConnection) {
      hubConnection
        .invoke('CheckAccount', value)
        .then((res: boolean) => {
          if (res) {
            setTryCode(0);
            setStateRepeat('-');
            localStorage.setItem('timeRepeat', moment().toISOString());
            setError(true);
            loginSubmit();
          } else {
            setError(false);
            setValue('');
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const singIn = () => {
    if (hubConnection) {
      hubConnection
        .invoke('SignIn', { login: value, password: password, signInMethod: 3 })
        .then((res: any) => {
          // console.log("res", res);
          setTryCode((tryCode) => tryCode + 1);
          localStorage.setItem('time', moment().toISOString());
          if (res.token !== null) {
            logIn(res.token);
            setWhere(true);
            setLogin(false);
            setTryCode(0);
          } else {
            setError(false);
          }
        })
        .catch((err: Error) => setError(false));
    }
  };

  const loginSubmit = () => {
    if (hubConnection) {
      hubConnection
        .invoke('SendAuthCode', value)
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
        <CSSTransition in={where || !!user} timeout={300} classNames="alert" unmountOnExit>
          <FormBlock>
            <H4>{t('login.where')}</H4>
            <Submit mb as="button" onClick={() => history.push('/info')} dangerOutline>
              {t('headerButton.personalArea')}
            </Submit>
            <Submit as="button" onClick={() => history.push('/admin')} danger disabled={!admin}>
              {t('headerButton.admin')}
            </Submit>
          </FormBlock>
        </CSSTransition>
        <CSSTransition in={login && !user && !where} timeout={300} classNames="alert" unmountOnExit>
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
        </CSSTransition>

        <CSSTransition
          in={!login && !user && !where}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          <FormBlock onSubmit={onSubmit}>
            <H4>{t('login.signIn')}</H4>
            <SelfInput
              value={value}
              name="login"
              placeholder={t('login.login')}
              onChange={onChangeValue}
              autoComplete="off"
            />
            {!error && (
              <StyledInlineErrorMessage>{t('login.incorrectLogin')}</StyledInlineErrorMessage>
            )}
            {/* <Submit as="button" danger type="submit" disabled={value === ""}>
              {t("login.getCode")}
            </Submit> */}

            <Timer
              last={localStorage.getItem('timeRepeat') || ''}
              setTryCode={setTryCode}
              state={stateRepeat}
              setState={setStateRepeat}
            >
              {stateRepeat === null ? (
                <Submit as="button" danger type="submit" disabled={value === ''}>
                  {t('login.getCode')}
                </Submit>
              ) : (
                <Submit as="button" danger type="submit" disabled>
                  {stateRepeat}
                </Submit>
              )}
            </Timer>
            <LinkToPage to="/register">{t('headerButton.register')}</LinkToPage>
          </FormBlock>
        </CSSTransition>

        <Timer
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
        </Timer>
      </CardContainer>
    </Container>
  );
};

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
  margin-bottom: 23px;
`;

const FormBlock = styled.form`
  margin: 0 auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

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
