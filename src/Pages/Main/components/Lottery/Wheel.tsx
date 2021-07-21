import { useState, useEffect, FC } from 'react';
import wheel from '../../../../assets/svg/wheel.svg';
import arrow from '../../../../assets/svg/arrowWheel.svg';
import center from '../../../../assets/svg/center.svg';
import * as Styled from './Lottery.elements';
import { Prize, Winner, Users } from '../../../../types/drawResult';
import { Balance } from '../../../../types/balance';
import { ReactComponent as PresentIcon } from '../../../../assets/svg/present.svg';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import doc from '../../../../assets/svg/document.svg';
import euro from '../../../../assets/svg/euro.svg';
import proc from '../../../../assets/svg/proc.svg';

type Props = {
  drawResult: [Prize[], Prize, Users[], Winner] | null;
  winNumber?: number;
  winnerResult: (res: Prize) => void;
  onShowModalCongrats: () => void;
};

export const Wheel: FC<Props> = ({ drawResult, onShowModalCongrats }: Props) => {
  const [deg, setDeg] = useState(0);
  const [radius, setRadius] = useState(75);
  const [angle, setAngle] = useState(0);
  const [top, setTop] = useState(0);
  const [easeOut, setEaseOut] = useState(2);
  const [rotate, setRotate] = useState(20);
  const [offset, setOffset] = useState(0);
  const [net, setNet] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [prevRotate, setPrevRotate] = useState(0);
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  // let spin = Math.floor(Math.random() * 900) + 500;
  // let netRotation = ((spin % 360) * Math.PI) / 180;
  // console.log("netRotation", netRotation)

  const list = ['document', 'euro1', 'euro2', 'procent', 'euro3', 'euro4'];

  // list = ["document = 1 0", "euro1", "euro2", "procent = 2  3", "euro3", "euro4"]
  // list = [drawResult[1][0], drawResult[1][3], drawResult[1][4], drawResult[1][1], drawResult[1][2], drawResult[1][5]]

  const fakeArr = [
    {
      id: 322559577302237185,
      safeId: '322559577302237185', // 1
      kind: 2,
      isActive: true,
      balanceKind: 9,
      volume: 1,
    },
    {
      id: 322559860770078721,
      safeId: '322559860770078721', // 3
      kind: 1,
      isActive: true,
      balanceKind: null,
      volume: null,
    },
    {
      id: 322558885812502529,
      safeId: '322558885812502529',
      kind: 0,
      isActive: true,
      balanceKind: 1,
      volume: 6000000,
    },
    {
      id: 322558847157796865,
      safeId: '322558847157796865',
      kind: 0,
      isActive: true,
      balanceKind: 1,
      volume: 4000000,
    },
    {
      id: 322558902992371713,
      safeId: '322558902992371713',
      kind: 0,
      isActive: true,
      balanceKind: 1,
      volume: 8000000,
    },
    {
      id: 322558567984922625,
      safeId: '322558567984922625',
      kind: 0,
      isActive: true,
      balanceKind: 1,
      volume: 2000000,
    },
  ];

  const topPosition = (num: number, angle: number) => {
    let topSpot: null | number = null;
    let degreesOff: null | number = null;
    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }
    setTop((topSpot as number) - 1);
    setOffset(degreesOff as number);
  };

  const spin = () => {
    const randomSpin = Math.floor(Math.random() * 900) + 500;

    // let randomSpin = 60 + 500;
    console.log('randomSpin', randomSpin);
    setRotate(randomSpin);
    setEaseOut(2);
    setSpinning(true);

    setTimeout(() => {
      getResult(randomSpin);
    }, 2000);
  };

  const getResult = (spin: number) => {
    const netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
    let travel = netRotation + offset;
    let count = top + 1;
    while (travel > 0) {
      travel = travel - angle;
      count--;
    }
    let result;
    if (count >= 0) {
      result = count;
    } else {
      result = list.length + count;
    }
    setNet(netRotation);
    setResult(result);
  };

  const onHandleClick = () => {
    setDeg((deg) => deg + Math.floor(5000 + Math.random() * 5000));
  };

  const reset = () => {
    setRotate(0);
  };

  useEffect(() => {
    let timer1: any;
    let timer2: any;
    let timer3: any;
    if (!!drawResult) {
      const prizes = [
        drawResult[0][0],
        drawResult[0][3],
        drawResult[0][4],
        drawResult[0][1],
        drawResult[0][2],
        drawResult[0][5],
      ];
      const keyWin = drawResult[0].findIndex((i) => i.safeId === drawResult[1].safeId);
      const numOptions = list.length;
      const arcSize = (2 * Math.PI) / numOptions;
      setAngle(arcSize);
      topPosition(numOptions, arcSize);
      const segment = 360 / list.length;
      const win = drawResult[1].kind;
      const key = win === 0 ? 2 : win === 1 ? 1 : win === 2 ? 4 : 5;
      const newPosition = segment * (keyWin + 1) - Math.random() * segment;

      timer1 = setTimeout(() => {
        setPrevRotate(newPosition);
        setRotate(-newPosition + 3240);
      }, 2000);
      timer3 = setTimeout(() => {
        setShow(true);
      }, 12000);
      timer2 = setTimeout(() => {
        onShowModalCongrats();
      }, 20000);
    }
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [drawResult]);

  const test = () => {
    setEaseOut((easy) => easy + 2);
    const segment = 360 / list.length;
    // let position = 1500 + Math.round(Math.random() * 1500);
    const key = 5;
    const newPosition = segment * key - Math.random() * segment;
    setPrevRotate(newPosition);
    setRotate(-newPosition + 2880);

    console.log('newPosition', newPosition);
  };

  return (
    <div>
      {drawResult && (
        // <CSSTransition
        //   in={show && !!drawResult}
        //   timeout={10000}
        //   classNames="present"
        // >
        <Styled.Present>
          <Styled.PresentInner show={show && !!drawResult}>
            <PresentIcon />
            {drawResult[1].kind === 0
              ? (drawResult[1].volume / 100000).toLocaleString('ru-RU', {
                  maximumFractionDigits: 5,
                })
              : drawResult[1].kind === 1
              ? t('win.two')
              : drawResult[1].volume}
            &nbsp;
            {drawResult[1].volume ? Balance[drawResult[1].balanceKind] : ''}
          </Styled.PresentInner>
        </Styled.Present>
        // </CSSTransition>
      )}
      {/* <Styled.WheelWrap>
        <Styled.WheelContainer onClick={onHandleClick}>
          <Styled.Wheel
            style={{
              WebkitTransform: `rotate(${rotate}deg)`,
              position: "relative",
            }}
          >
            <img src={wheel} alt="" />
          </Styled.Wheel>
          <Styled.Arrow>
            <img src={arrow} alt="" />
          </Styled.Arrow>
          <Styled.Center>
            <img src={center} alt="" />
          </Styled.Center>
        </Styled.WheelContainer>
      </Styled.WheelWrap> */}

      <WheelContainer>
        <WheelContainerInner>
          <WheelImg>
            <section
              className="chart"
              style={{
                WebkitTransform: `rotate(${rotate}deg)`,
                position: 'relative',
              }}
            >
              {drawResult ? (
                <>
                  <Img1
                    src={
                      drawResult[0][0].kind === 1 ? doc : drawResult[0][0].kind === 2 ? proc : euro
                    }
                    alt=""
                  />
                  <Img2
                    src={
                      drawResult[0][1].kind === 1 ? doc : drawResult[0][1].kind === 2 ? proc : euro
                    }
                    alt=""
                  />
                  <Img3
                    src={
                      drawResult[0][2].kind === 1 ? doc : drawResult[0][2].kind === 2 ? proc : euro
                    }
                    alt=""
                  />
                  <Img4
                    src={
                      drawResult[0][3].kind === 1 ? doc : drawResult[0][3].kind === 2 ? proc : euro
                    }
                    alt=""
                  />
                  <Img5
                    src={
                      drawResult[0][4].kind === 1 ? doc : drawResult[0][4].kind === 2 ? proc : euro
                    }
                    alt=""
                  />
                  <Img6
                    src={
                      drawResult[0][5].kind === 1 ? doc : drawResult[0][5].kind === 2 ? proc : euro
                    }
                    alt=""
                  />
                </>
              ) : (
                ''
              )}
              {/* <Img1 src={doc} alt="" />
              <Img2 src={euro} alt="" />
              <Img3 src={euro} alt="" />
              <Img4 src={proc} alt="" />
              <Img5 src={euro} alt="" />
              <Img6 src={euro} alt="" /> */}
              <div className="triangle" style={{ transform: 'rotate(0deg)' }}>
                <div
                  className="circle"
                  style={{
                    background:
                      'radial-gradient(circle farthest-corner, rgba(255, 145, 0, 1) 3.76%, rgba(255, 182, 85, 1) 100%)',
                  }}
                ></div>
              </div>
              <div
                className="triangle"
                style={{ transform: "rotate(-60deg), position: 'relative'" }}
              >
                <div
                  className="circle"
                  style={{
                    background:
                      'radial-gradient( circle farthest-corner, rgba(197, 0, 72, 1) 0%, rgba(224, 43, 106, 1) 47.98%, rgba(255, 94, 147, 1) 100%)',
                    position: 'relative',
                  }}
                ></div>
              </div>
              <div className="triangle" style={{ transform: 'rotate(-120deg)' }}>
                <div
                  className="circle"
                  style={{
                    background:
                      'radial-gradient( circle farthest-corner, rgba(122, 244, 171, 1) 3.76%, rgba(201, 206, 126, 1) 100%)',
                  }}
                ></div>
              </div>
              <div className="triangle" style={{ transform: 'rotate(-180deg)' }}>
                <div
                  className="circle"
                  style={{
                    background:
                      'radial-gradient( circle farthest-corner, rgba(122, 244, 171, 1) 3.76%, rgba(201, 206, 126, 1) 100%)',
                  }}
                ></div>
              </div>
              <div className="triangle" style={{ transform: 'rotate(-180deg)' }}>
                <div
                  className="circle"
                  style={{
                    background:
                      'radial-gradient( circle farthest-corner, rgba(9, 86, 198, 1) 3.76%, rgba(9, 91, 200, 1) 13.58%, rgba(9, 104, 207, 1) 24.66%, rgba(8, 127, 219, 1) 36.35%, rgba(7, 158, 235, 1) 48.38%, rgba(7, 169, 240, 1) 51.96%, rgba(30, 177, 242, 1) 55.27%, rgba(66, 190, 245, 1) 61.22%, rgba(95, 201, 248, 1) 67.51%, rgba(118, 210, 250, 1) 74.15%, rgba(134, 215, 251, 1) 81.3%, rgba(144, 219, 252, 1) 89.32%, rgba(147, 220, 252, 1) 100%)',
                  }}
                ></div>
              </div>
              <div className="triangle" style={{ transform: 'rotate(-240deg)' }}>
                <div
                  className="circle"
                  style={{
                    background:
                      'radial-gradient(circle farthest-corner, rgba(43, 56, 148, 1) 3.76%, rgba(128, 120, 191, 1) 100%)',
                  }}
                ></div>
              </div>
              <div className="triangle" style={{ transform: 'rotate(-300deg)' }}>
                <div
                  className="circle"
                  style={{
                    background:
                      'radial-gradient( circle farthest-corner, rgba(197, 0, 72, 1) 0%, rgba(104, 100, 181, 1) 100%)',
                  }}
                ></div>
              </div>
            </section>
            <Center>
              <img src={center} alt="" />
            </Center>
          </WheelImg>
        </WheelContainerInner>
        <Arrow>
          <img src={arrow} alt="" />
        </Arrow>
      </WheelContainer>
    </div>
  );
};

const Arrow = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  margin-left: -15px;
  width: 33px;
  height: 93px;
`;

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 170px;
  height: 170px;
  margin-top: -85px;
  margin-left: -85px;
  transform: rotate(-30deg);
  &:before {
    content: '';
    border: 12px solid #fff;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    position: absolute;
    top: -11px;
    left: -12px;
  }
  @media (max-width: 576px) {
    width: 120px;
    height: 120px;
    margin-top: -60px;
    margin-left: -60px;
  }
`;

const Img = styled.img`
  z-index: 99999;
  position: absolute;
  width: 60px;
  @media (max-width: 576px) {
    width: 40px;
  }
`;

const Img1 = styled(Img)`
  top: 17px;
  left: 158px;
  transform: rotate(0deg);
  @media (max-width: 576px) {
    top: 5px;
    left: 107px;
  }
`;

const Img2 = styled(Img)`
  top: 91px;
  left: 267px;
  transform: rotate(-12deg);
  @media (max-width: 576px) {
    top: 63px;
    left: 190px;
  }
`;

const Img3 = styled(Img)`
  top: 228px;
  left: 264px;
  transform: rotate(48deg);
  @media (max-width: 576px) {
    top: 161px;
    left: 188px;
  }
`;

const Img4 = styled(Img)`
  top: 290px;
  left: 145px;
  transform: rotate(110deg);
  @media (max-width: 576px) {
    top: 208px;
    left: 102px;
  }
`;

const Img5 = styled(Img)`
  top: 222px;
  left: 31px;
  transform: rotate(169deg);
  @media (max-width: 576px) {
    top: 161px;
    left: 19px;
  }
`;

const Img6 = styled(Img)`
  top: 85px;
  left: 33px;
  transform: rotate(-132deg);
  @media (max-width: 576px) {
    top: 62px;
    left: 16px;
  }
`;

const WheelContainer = styled.div`
  width: 360px;
  height: 360px;
  border-radius: 50%;
  position: relative;
  margin: 24px auto 0;
  @media (max-width: 576px) {
    width: 250px;
    height: 250px;
  }
`;

const WheelContainerInner = styled(WheelContainer)`
  overflow: hidden;
`;

const WheelImg = styled.div`
  width: 360px;
  height: 360px;
  @media (max-width: 576px) {
    width: 250px;
    height: 250px;
  }
  border-radius: 50%;
  border: 1px solid #333;
  transform: rotate(30deg);
  background: radial-gradient(
    circle farthest-corner,
    rgba(255, 145, 0, 1) 3.76%,
    rgba(255, 182, 85, 1) 100%
  );
  overflow: hidden;
  .chart {
    transition: all 10s cubic-bezier(0.4, 0.09, 0, 1);
  }
  .circle {
    height: 100%;
    width: 100%;
    /* background: silver; */
    border-radius: 50% 50% 0 0 / 100% 100% 0 0;
    transform-origin: center bottom;
    img {
      z-index: 9999;
    }
  }

  .triangle {
    height: 100%;
    width: 100%;
    position: relative;
    transform-origin: center bottom;
    overflow: hidden;
  }

  .triangle .circle {
    transform: rotate(120deg);
  }

  .chart {
    position: relative;
    height: auto;
    overflow: hidden; /* .triangle выходят за пределы */
  }

  .chart:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  .chart .triangle {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 50%;
    height: 50%;
  }
`;
