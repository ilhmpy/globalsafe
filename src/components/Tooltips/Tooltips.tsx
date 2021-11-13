import { FC, useRef, useState } from 'react';
import { Portal } from '../Portal/Portal';

export const Tooltip: FC<any> = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState({ left: 0, top: 0, right: 0, bottom: 0 });
  const width = props.width || 256;
  const space = props.space || 16;
  const el = useRef<any>(null);
  const showTooltip = () => {
    const styles: any = {};
    if (el && el.current) {
      const dimensions = el.current.getBoundingClientRect();
      styles.left = dimensions.left - width / 3;

      if (dimensions.top < window.innerHeight / 2) {
        styles.top = dimensions.top + dimensions.height + space;
      } else {
        styles.bottom = window.innerHeight - dimensions.top + space;
      }
      setVisible(true);
      setStyle(styles);
    }
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  return (
    <div
      onMouseOver={showTooltip}
      onMouseOut={hideTooltip}
      className="tooltip-trigger-text"
      ref={el}
    >
      {props.children}

      {visible && (
        <Portal>
          <div className="tooltip-body" style={style}>
            <div dangerouslySetInnerHTML={{ __html: props.text }} />
          </div>
        </Portal>
      )}
    </div>
  );
};

export const TestTolltips: FC = () => (
  <div>
    <p>
      Some text, some of which{' '}
      <Tooltip text="This is some more info about that first thing that you should find every interesting.">
        requires explanation.
      </Tooltip>{' '}
      (Scroll down for more.)
    </p>

    <div style={{ lineHeight: 80 }}>Scroll down</div>

    <p>
      <Tooltip text="You hovered over the second one!">Something else to hover over</Tooltip> is
      what this is.
    </p>

    <div style={{ lineHeight: 80 }}>Just more paddin &lsquo;</div>
  </div>
);
