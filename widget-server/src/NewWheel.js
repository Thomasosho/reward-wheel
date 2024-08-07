import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';

const colors = ["white", "#ffe368", "#f13a23"];

const NewWheel = forwardRef(({ rewardList = [
  { description: "Prize 1" },
  { description: "Prize 2" },
  { description: "Prize 3" },
  { description: "Prize 4" },
  { description: "Prize 5" },
  { description: "Prize 6" },
  { description: "Prize 7" },
  { description: "Prize 8" },
], onSelectReward, pointer }, ref) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  console.info(pointer);

  useImperativeHandle(ref, () => ({
    spinWheel: () => {
      setIsSpinning(true);
      const numSegments = rewardList.length;
      const segmentAngle = 360 / numSegments;
      const randomSegment = Math.floor(Math.random() * numSegments);
      const baseAngle = randomSegment * segmentAngle;
      const randomOffset = Math.random() * segmentAngle;
      const targetAngle = baseAngle + randomOffset;
      const fullRotations = 5;

      const totalRotation = fullRotations * 360 + targetAngle;

      setRotation(prevRotation => prevRotation + totalRotation);

      // Set a timeout to stop spinning after the animation duration
      setTimeout(() => {
        setIsSpinning(false);
      }, 4000); // 4000ms matches the CSS transition duration
    }
  }));

  useEffect(() => {
    if (rotation === 0 || isSpinning) return;

    // Calculate total rotation within a 360-degree range
    const totalRotation = rotation % 360;
    const numSegments = rewardList.length;
    const segmentAngle = 360 / numSegments;

    // Calculate the index of the selected segment
    // We subtract from 360 because the wheel rotates clockwise
    const selectedIndex = Math.floor(((360 - totalRotation) % 360) / segmentAngle);

    // Select the reward
    const selectedReward = rewardList[selectedIndex];
    onSelectReward(selectedReward);

  }, [rotation, rewardList, onSelectReward, isSpinning]);

  const wrapText = (text, maxLength) => {
    const words = text.split(" ");
    const lines = [];
    let line = "";

    words.forEach((word) => {
      if ((line + word).length <= maxLength) {
        line += word + " ";
      } else {
        lines.push(line.trim());
        line = word + " ";
      }
    });

    if (line) lines.push(line.trim());
    return lines;
  };

  return (
    <svg
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "350px", height: "350px", margin: "auto" }}
    >
      <defs>
        <linearGradient
          id="linear-gradient-6"
          x1="260.55"
          y1="239.33"
          x2="319.45"
          y2="180.44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#993c0b" />
          <stop offset=".85" stopColor="#ffe368" />
          <stop offset="1" stopColor="#f8c448" />
        </linearGradient>

        <linearGradient
          id="linear-gradient-4"
          x1="208.33"
          y1="51.01"
          x2="383.33"
          y2="371.01"
          gradientTransform="translate(506.19 -91.17) rotate(90)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#c3c1c2" />
          <stop offset=".47" stopColor="#fff" />
          <stop offset="1" stopColor="#dcdbdb" />
        </linearGradient>

        <linearGradient
          id="linear-gradient-3"
          x1="411.38"
          y1="378.38"
          x2="155.38"
          y2="-29.62"
          gradientTransform="translate(91.17 506.19) rotate(-90)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f72226" />
          <stop offset=".08" stopColor="#ef1e23" />
          <stop offset=".24" stopColor="#e21820" />
          <stop offset=".26" stopColor="#e72321" />
          <stop offset=".32" stopColor="#f13a23" />
          <stop offset=".38" stopColor="#f94a24" />
          <stop offset=".44" stopColor="#fd5325" />
          <stop offset=".53" stopColor="#ff5726" />
          <stop offset=".54" stopColor="#fc4726" />
          <stop offset=".55" stopColor="#fa3626" />
          <stop offset=".57" stopColor="#f82a26" />
          <stop offset=".6" stopColor="#f72326" />
          <stop offset=".68" stopColor="#f72226" />
          <stop offset=".83" stopColor="#c31c22" />
          <stop offset=".94" stopColor="#a1181f" />
          <stop offset="1" stopColor="#94171f" />
        </linearGradient>
      </defs>

      {/* Circular Frame */}
      <g>
        <path
          d="M300,580c154.6,0,280-125.4,280-280S454.6,20,300,20 20,145.4,20,300 145.4,580,300,580Z"
          fill="url(#linear-gradient-3)"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M300,560c143.5,0,260-116.5,260-260S443.5,40,300,40 40,156.5,40,300 156.5,560,300,560Zm0-500c-132.8,0-240,107.2-240,240s107.2,240,240,240,240-107.2,240-240S432.8,60,300,60Z"
          fill="url(#linear-gradient-4)"
          stroke="black"
          strokeWidth="2"
        />
      </g>

      {/* Rotating Group */}
      <g
        style={{
          transformOrigin: 'center',
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)'
        }}
      >
        {/* Reward Wheel Itself */}
        <g transform="translate(300,300)">
          {rewardList.map((item, index) => {
            const startAngle = (360 / rewardList.length) * index;
            const endAngle = (360 / rewardList.length) * (index + 1);
            const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
            const x1 = 250 * Math.cos((Math.PI / 180) * startAngle);
            const y1 = 250 * Math.sin((Math.PI / 180) * startAngle);
            const x2 = 250 * Math.cos((Math.PI / 180) * endAngle);
            const y2 = 250 * Math.sin((Math.PI / 180) * endAngle);

            return (
              <path
                key={index}
                d={`M0,0 L${x1},${y1} A250,250 0 ${largeArcFlag},1 ${x2},${y2} Z`}
                fill={colors[index % colors.length]}
                stroke="black"
                strokeWidth="2"
              />
            );
          })}
        </g>

        <g transform="translate(300,300)">
          {rewardList.map((item, index) => {
            const angle =
              (360 / rewardList.length) * index + 360 / rewardList.length / 2;
            const radius = 180;
            const x = radius * Math.cos((Math.PI / 180) * angle);
            const y = radius * Math.sin((Math.PI / 180) * angle);
            const rotateAngle = angle + 90;
            const lines = wrapText(item.description, 10);

            return (
              <g key={index} transform={`rotate(${rotateAngle} ${x} ${y})`}>
                {lines.map((line, lineIndex) => (
                  <text
                    key={lineIndex}
                    x={x}
                    y={y + lineIndex * 30}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    style={{
                      fontSize: "25px",
                      fill: "black",
                      fontWeight: "bold",
                      textAnchor: "middle",
                    }}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </g>
      </g>

      {/* Fixed Pointer */}
      {/* <polygon
        points="300,50 280,100 320,100"
        fill="black"
        stroke="black"
        strokeWidth="2"
        transform="translate(0,200)"
      /> */}
      {/* Fixed Pointer */}
      <image
        href={pointer}
        x="250"
        y="230"
        width="100"
        preserveAspectRatio="xMidYMid meet"
        transform="rotate(55, 300, 300)"
      />
    </svg>
  );
});

export default NewWheel;