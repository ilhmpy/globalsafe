import { useState, useEffect, FC } from "react";
import wheel from "../../../../assets/svg/wheel.svg";
import arrow from "../../../../assets/svg/arrowWheel.svg";
import center from "../../../../assets/svg/center.svg";
import * as Styled from "./Lottery.elements";
import { Prize, Winner, Users } from "../../../../types/drawResult";
import { Balance } from "../../../../types/balance";
import { ReactComponent as PresentIcon } from "../../../../assets/svg/present.svg";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";

type Props = {
  drawResult: [Prize[], Prize, Users[], Winner] | null;
  winNumber?: number;
  winnerResult: (res: Prize) => void;
  onShowModalCongrats: () => void;
};

export const Wheel: FC<Props> = ({ drawResult, onShowModalCongrats }) => {
  const [deg, setDeg] = useState(0);
  const [radius, setRadius] = useState(75);
  const [angle, setAngle] = useState(0);
  const [top, setTop] = useState(0);
  const [easeOut, setEaseOut] = useState(2);
  const [rotate, setRotate] = useState(0);
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

  const list = ["document", "euro1", "euro2", "procent", "euro3", "euro4"];

  // list = ["document = 1 0", "euro1", "euro2", "procent = 2  3", "euro3", "euro4"]

  // useEffect(() => {
  //   const numOptions = list.length;
  //   const arcSize = (2 * Math.PI) / numOptions;
  //   setAngle(arcSize);
  //   topPosition(numOptions, arcSize);
  // }, []);

  // console.log("angle", angle);

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
    let randomSpin = Math.floor(Math.random() * 900) + 500;

    // let randomSpin = 60 + 500;
    console.log("randomSpin", randomSpin);
    setRotate(randomSpin);
    setEaseOut(2);
    setSpinning(true);

    setTimeout(() => {
      getResult(randomSpin);
    }, 2000);
  };

  const getResult = (spin: number) => {
    let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
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
    if (drawResult) {
      const numOptions = list.length;
      const arcSize = (2 * Math.PI) / numOptions;
      setAngle(arcSize);
      topPosition(numOptions, arcSize);
      // setEaseOut((easy) => easy + 2);
      const segment = 360 / list.length;
      const win = drawResult[1].kind;
      const key = win === 0 ? 2 : win === 1 ? 1 : win === 2 ? 4 : 5;
      let newPosition = segment * key - Math.random() * segment;

      // setTimeout(() => {
      //   winnerResult(drawResult[1]);
      // }, 5000);

      setTimeout(() => {
        setPrevRotate(newPosition);
        setRotate(-newPosition + 2160);
        setShow(true);
      }, 2000);

      setTimeout(() => {
        onShowModalCongrats();
        setRotate(0);
      }, 10000);
    }
  }, []);

  const test = () => {
    setEaseOut((easy) => easy + 2);
    const segment = 360 / list.length;
    // let position = 1500 + Math.round(Math.random() * 1500);
    const key = 5;
    let newPosition = segment * key - Math.random() * segment;
    setPrevRotate(newPosition);
    setRotate(-newPosition + 2160);

    console.log("newPosition", newPosition);
  };

  return (
    <>
      {/* <button onClick={test}>test</button> */}
      <CSSTransition
        in={show}
        timeout={10000}
        classNames="present"
        unmountOnExit
      >
        {drawResult && (
          <Styled.Present>
            <PresentIcon />
            {drawResult[1].kind === 0
              ? (drawResult[1].volume / 100000).toLocaleString("ru-RU", {
                  maximumFractionDigits: 5,
                })
              : drawResult[1].kind === 1
              ? t("win.two")
              : drawResult[1].volume}
            &nbsp;
            {drawResult[1].volume ? Balance[drawResult[1].balanceKind] : ""}
          </Styled.Present>
        )}
      </CSSTransition>
      <Styled.WheelWrap>
        <Styled.WheelContainer onClick={onHandleClick}>
          <Styled.Wheel
            style={{
              WebkitTransform: `rotate(${rotate}deg)`,
              WebkitTransition: `-webkit-transform ${easeOut}s ease-in-out`,
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
      </Styled.WheelWrap>
    </>
  );
};
