// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { Ref, Image} from 'semantic-ui-react';
// import Villain from './villain';

// import './villain.css';
// import sprite from './Ezjbh3E.png';

// export default function Character() {
//   const [charPosition, setCharPosition] = useState(10);
//   const [img, setImg] = useState(null);

//   const canvasRef = useRef(null);
//   const spriteRef = useRef(null);

//   const FACTOR_ONE = 200;
//   const FACTOR_TWO = 4;
//   const FACTOR_THREE = 200;
//   const LoopMove = [0, 1, 0, 2];
//   const tall = FACTOR_TWO * FACTOR_THREE;
//   const wide = FACTOR_TWO * FACTOR_ONE;

//   // function move() {
//   //   window.requestAnimationFrame(move);
//   // }

//   var WASDInput = {};

//   window.addEventListener('keydown', keyDownListener, false);
//   function keyDownListener(event) {
//     WASDInput[event.key] = true;
//   }

//   window.addEventListener('keyup', keyUpListener, false);
//   function keyUpListener(event) {
//     WASDInput[event.key] = false;
//   }

//   var XCordinate = 0;
//   var YCordinate = 0;
//   const ACCELERATION = 3;
//   // var LoopIter = 0;
//   // var direct = 0;
//   // var numFPS = 0;


//   const move = useCallback(ctx => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     if (WASDInput.s) {
//       YCordinate = YCordinate + ACCELERATION;
//       setCharPosition(YCordinate)
//     } else if (WASDInput.w) {
//       YCordinate = YCordinate - ACCELERATION;
//       setCharPosition(YCordinate)
//     }
//     if (WASDInput.d) {
//       XCordinate = XCordinate + ACCELERATION;
//     } else if (WASDInput.a) {
//       XCordinate = XCordinate - ACCELERATION;
//     }
//     board(0, 0, XCordinate, YCordinate, ctx);
//   }, []);

//   useEffect(() => {
//     let animationFrameId;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const render = () => {
//       move(context);
//       animationFrameId = window.requestAnimationFrame(render);
//     };
//     render();

//     return () => {
//       window.cancelAnimationFrame(animationFrameId);
//     };
//   }, [move]);

//   function board(XCord, YCord, factor1, factor2, ctx) {
//     const pic = spriteRef.current;
//     ctx.drawImage(
//       pic,
//       XCord * FACTOR_ONE,
//       YCord * FACTOR_THREE,
//       FACTOR_ONE,
//       FACTOR_THREE,
//       factor1,
//       factor2,
//       40,
//       40
//     );
//   }

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: 'relative',
//         width: '200vw',
//         height: '500px',
//         marginTop: '100px',
//       }}
//     >
//       <Ref innerRef={spriteRef}>
//         <Image
//           src={sprite}
//           style={{
//             onload: `${function () {
//               window.requestAnimationFrame(move);
//             }}`
//           }}
//         />
//       </Ref>
//       <Villain CharPosition={charPosition} />
//     </canvas>
//   );
// }
