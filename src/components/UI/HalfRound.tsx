import React, { FC } from "react";

type Props = {
  color: string;
  width: string;
  height: string;
};

export const HalfRoundBorder: FC<Props> = ({ color, width, height }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 90 123"
    >
      <path
        fill={color}
        d="M85.565 9.3c.712-1.528.054-3.352-1.508-3.988a61.014 61.014 0 00-56.702 5.646A61.081 61.081 0 006.775 33.93 61.131 61.131 0 008.859 93.6a61.067 61.067 0 0022.13 21.479 61.007 61.007 0 0056.958 1.674c1.514-.743 2.044-2.608 1.227-4.083-.818-1.477-2.675-2.002-4.194-1.266a54.916 54.916 0 01-50.984-1.642A54.967 54.967 0 0114.078 90.43a55.014 55.014 0 0116.647-74.378 54.921 54.921 0 0150.745-5.196c1.567.627 3.382-.026 4.095-1.556z"
      ></path>
    </svg>
  );
};

HalfRoundBorder.defaultProps = {
  color: "#BCD476",
  width: "90",
  height: "123",
};

// export const MobHalfRoundBorder = () => {
//     return (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="47"
//         height="63"
//         fill="none"
//         viewBox="0 0 47 63"
//       >
//         <path
//           fill={color}
//           d="M44.147 4.379c.367-.789.028-1.73-.778-2.057a31.5 31.5 0 102.006 57.457c.781-.383 1.055-1.345.633-2.106-.422-.76-1.379-1.031-2.162-.653a28.35 28.35 0 11-1.81-51.84c.807.324 1.743-.013 2.11-.801z"
//         ></path>
//       </svg>
//     );
//   }
