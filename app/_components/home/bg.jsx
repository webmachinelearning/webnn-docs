import * as React from "react"
const HeroBackground = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" {...props}>
    <defs>
      <filter
        id="a"
        width="400%"
        height="400%"
        x="-100%"
        y="-100%"
        colorInterpolationFilters="sRGB"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse"
      >
        <feGaussianBlur
          width="100%"
          height="100%"
          x="0%"
          y="0%"
          in="SourceGraphic"
          result="blur"
          stdDeviation={74}
        />
      </filter>
    </defs>
    <g filter="url(#a)">
      <ellipse
        cx={504.558}
        cy={480.073}
        fill="hsl(37, 99%, 67%)"
        opacity={1}
        rx={68}
        ry={115}
      >
        <animate
          attributeName="cx"
          calcMode="spline"
          dur="10s"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          repeatCount="indefinite"
          values="504.558; 584.558; 424.558; 504.558"
        />
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="10s"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          repeatCount="indefinite"
          values="480.073; 400.073; 560.073; 480.073"
        />
      </ellipse>
      <ellipse
        cx={369.939}
        cy={56.642}
        fill="hsl(316, 73%, 52%)"
        opacity={1}
        rx={68}
        ry={115}
      >
        <animate
          attributeName="cx"
          calcMode="spline"
          dur="10s"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          repeatCount="indefinite"
          values="369.939; 449.939; 289.939; 369.939"
        />
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="10s"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          repeatCount="indefinite"
          values="56.642; 6.642; 106.642; 56.642"
        />
      </ellipse>
      <ellipse
        cx={226.42}
        cy={415.333}
        fill="hsl(185, 100%, 57%)"
        opacity={1}
        rx={68}
        ry={115}
      >
        <animate
          attributeName="cx"
          calcMode="spline"
          dur="4s"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1;"
          repeatCount="indefinite"
          values="226.420; 106.420; 46.420; 226.420"
        />
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="4s"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          repeatCount="indefinite"
          values="415.333; 355.333; 475.333; 415.333"
        />
      </ellipse>
    </g>
  </svg>
)
export default HeroBackground
