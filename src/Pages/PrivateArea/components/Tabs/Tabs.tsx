import React, {
  useRef,
  useState,
  useEffect,
  FC,
  ReactNode,
  ReactChild,
  ReactNodeArray,
} from 'react';
import * as S from './S.el';
import { useSpring } from 'react-spring';

type Props = {
  children: any;
};

export const Tabs: FC<Props> = ({ children }: Props) => {
  const tabsRef = children?.map((child: any) => useRef(child));

  const [currentTab, setCurrentTab] = useState({ width: 0, left: 0 });

  useEffect(() => {
    setCurrentTab({
      width: tabsRef[0].current.clientWidth,
      left: tabsRef[0].current.offsetLeft,
    });
  }, []);

  const onTabSelect = (tab: number) =>
    setCurrentTab({
      width: tabsRef[tab].current.clientWidth,
      left: tabsRef[tab].current.offsetLeft,
    });

  return (
    <S.TabBar>
      {children.map((tab: string, index: number) => (
        <S.Tab key={index} ref={tabsRef[index]} onClick={() => onTabSelect(index)}>
          {tab}
        </S.Tab>
      ))}
      <S.Underline
        style={useSpring({
          width: currentTab.width || 0,
          left: currentTab.left || 0,
        })}
      />
    </S.TabBar>
  );
};

// export default () => (
//   <TabSystem>
//     <div>Tab 1</div>
//     <div>Tab 2</div>
//   </TabSystem>
// );
