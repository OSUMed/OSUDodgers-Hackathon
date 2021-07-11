import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Ref, Image } from 'semantic-ui-react';

import './villain.css';
import sprite from './CharacterSprite.png';

const FACTOR_ONE = 14;
const FACTOR_TWO = 4;
const FACTOR_THREE = 18;
const LoopMove = [0, 1, 0, 2];
const tall = FACTOR_TWO * FACTOR_THREE;
const wide = FACTOR_TWO * FACTOR_ONE;

// function move() {
//   window.requestAnimationFrame(move);
// }

var WASDInput = {};

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
  WASDInput[event.key] = true;
}

window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
  WASDInput[event.key] = false;
}

var XCordinate = 0;
var YCordinate = 0;
const ACCELERATION = 1;
const LEFT_VIEW = 2;
const UP_VIEW = 1;
const DOWN_VIEW = 0;
const RIGHT_VIEW = 3;
var direct = DOWN_VIEW;

export default function Character() {
  const canvasRef = useRef(null);
  const spriteRef = useRef(null);

  const move = useCallback(
    ctx => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      if (WASDInput.s) {
        YCordinate = YCordinate + ACCELERATION;
        direct = DOWN_VIEW;
      } else if (WASDInput.w) {
        YCordinate = YCordinate - ACCELERATION;
        direct = UP_VIEW;
      }
      if (WASDInput.d) {
        XCordinate = XCordinate + ACCELERATION;
        direct = RIGHT_VIEW;
      } else if (WASDInput.a) {
        XCordinate = XCordinate - ACCELERATION;
        direct = LEFT_VIEW;
      }

      board(0, direct, XCordinate, YCordinate, ctx);
    },
    []
  );

  useEffect(() => {
    let animationFrameId;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const render = () => {
      move(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [move]);

  function board(XCord, YCord, factor1, factor2, ctx) {
    const pic = spriteRef.current;
    ctx.drawImage(
      pic,
      XCord * FACTOR_ONE,
      YCord * FACTOR_THREE,
      FACTOR_ONE,
      FACTOR_THREE,
      factor1,
      factor2,
      tall,
      wide
    );
  }

  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', width: '500vw' }}>
      <Ref innerRef={spriteRef}>
        <Image
          src={sprite}
          floated="left"
          size="tiny"
          style={{
            onload: `${function () {
              window.requestAnimationFrame(move);
            }}`,
            position: `absolute`,
            height: '7px',
            zIndex: '5000',
          }}
        />
      </Ref>
    </canvas>
  );
}
