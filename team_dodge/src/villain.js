import React from 'react';
import { Container, Button, Image, Ref } from 'semantic-ui-react';

import './villain.css';
import Villain_1 from './RedneckVillain.png';
// import block_1 from './Villain.jpeg';
import bullet_1 from './Bullet.png';
import bullet_tail_1 from './bulletTail.png';
import sprite from './StandingRanger.png';
import spriteUpDown from './RangerJumping.png';
import spriteRunning1 from './RunningRanger.png';
import hay_bale_1 from './HayRoll.png';
import shrub_1 from './Shrub.png';

/*tslint:disabled*/

// function move() {
//   window.requestAnimationFrame(move);
// }

export default class Villain extends React.Component {
  constructor(props) {
    super(props);

    this.villainRef = React.createRef();
    this.spriteRef = React.createRef();
    this.bulletRef = React.createRef();
    this.hayRollRef = React.createRef();
    this.hayBaleRef = React.createRef();

    this.state = {
      animation: 'block 2s linear infinite',
      moving: false,
      started: false,
      visible: true,
      seconds: 3,
      score: 0,
      bulletTailDisplay: 'none',
      bulletDisplay: 'none',
      bulletMarginLeft: 49,
      classNames: '',
      position: 10,
      marginTop: 10,
      bulletTop: 10,
      firing: false,
      hbTop: 10,
      sprite: sprite,
      hbRight: 52,
      hbDisplay: 'none',
      hbActive: false,
      display: 'Start game?',
      jumping: false,
      shrubTop: 0,
      shrubRight: 45,
      shrubAnimation: 'bullet 5s linear infinite',
      shrubDisplay: 'block',
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    // let villain = this.villainRef.current;

    this.setState({ display: 'Start game?' });
    setTimeout(() => {
      this.setState({ visible: true });
    }, 500);

    document.addEventListener('keydown', this.handleKeyPress, false);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    const sprite_1 = this.spriteRef.current;

    if (this.state.started === true) {
      if (event.key === 'w') {
        if (this.state.jumping === false && this.state.position > -10) {
          const jumpingInterval = setInterval(() => {
            this.setState({
              position: this.state.position - 0.25,
              sprite: spriteUpDown,
              jumping: true,
            });
          }, 30);

          setTimeout(() => {
            this.setState({
              jumping: false,
              sprite: sprite,
            });
            clearInterval(jumpingInterval);
          }, 600);
        }
      } else if (event.key === 's' && this.state.position < 10) {
        this.setState({
          position: this.state.position + 1,
          sprite: sprite,
        });
      } else if (event.key === 'd') {
        this.setState({
          sprite: spriteRunning1,
          score: this.state.score + 1,
          display: this.state.score,
        });
      }
    }
  }

  handleKeyUp() {
    this.setState({
      sprite: sprite,
    });
  }

  startingGame() {
    this.setState({ seconds: 3, score: 0 });

    let startingGameInterval = setInterval(() => {
      this.setState({ display: this.state.seconds });
      if (this.state.seconds > 0) {
        let currentTime = this.state.seconds - 1;
        this.setState({ seconds: currentTime });
      } else {
        clearInterval(startingGameInterval);
        this.startGame();
      }
    }, 1000);
  }

  startGame() {
    this.setState({
      display: this.state.score,
      started: true,
    });

    this.move();
    this.fireShrub();
  }

  move = () => {
    setInterval(() => {
      if (
        this.state.position > this.state.marginTop &&
        this.state.started === true
      ) {
        this.setState({
          marginTop: this.state.marginTop + 1,
        });
      }

      if (
        this.state.position < this.state.marginTop &&
        this.state.started === true
      ) {
        this.setState({
          marginTop: this.state.marginTop - 1,
        });
      }
    }, 900);

    setInterval(() => {
      const random = Math.random() * 10;

      if (
        (this.state.position <= this.state.marginTop + 11 ||
          this.state.position >= this.state.marginTop - 11) &&
        this.state.started === true
      ) {
        if (this.state.firing === false && random >= 5) {
          this.fire(this.state.marginTop);
        } else if (this.state.hbActive === false) {
          this.fireHayBale(this.state.marginTop);
        }
      }
    }, 900);
  };

  fireHayBale = marginTop => {
    // const hayRoll = this.hayRollRef.current;
    // hayRoll.style.animation = 'hayRoll 30s linear';

    if (this.state.hbActive === false) {
      this.setState({
        hbTop: marginTop,
        hbDisplay: 'block',
        hbActive: true,
      });

      const hayRollInterval = setInterval(() => {
        if (
          this.state.hbRight <= 1 &&
          this.state.position - 5 <=
            this.state.bulletTop <=
            this.state.position + 5
        ) {
          this.gameOver(hayRollInterval);
          clearInterval(hayRollInterval);
        }

        this.setState({
          hbRight: this.state.hbRight - 0.05,
        });
      }, 10);

      setTimeout(() => {
        this.setState({
          hbDisplay: 'none',
          hbActive: false,
          hbRight: 52,
        });
        clearInterval(hayRollInterval);
      }, 10000);
    }
  };

  fire = bulletTop => {
    // const bullet = this.bulletRef.current;

    if (this.state.firing === false) {
      // bullet.style.animation = 'bullet 5s linear';
      this.setState({
        bulletTop: bulletTop,
        bulletDisplay: 'block',
        firing: true,
      });

      const bulletInterval = setInterval(() => {
        if (
          this.state.bulletMarginLeft <= 1 &&
          this.state.position - 5 <=
            this.state.bulletTop <=
            this.state.position + 5
        ) {
          this.gameOver(bulletInterval);
          clearInterval(bulletInterval);
        }

        this.setState({
          bulletMarginLeft: this.state.bulletMarginLeft - 0.1,
        });
      }, 10);

      setTimeout(() => {
        this.setState({
          bulletDisplay: 'none',
          firing: false,
          bulletMarginLeft: 49,
        });
        clearInterval(bulletInterval);
      }, 5000);
    }
  };

  gameOver(bulletInterval) {
    this.setState({
      display: 'You lost...',
      started: false,
      shrubAnimation: 'none',
      shrubDisplay: 'none',
      hbDisplay: 'none',
      bulletDisplay: 'none',
      shrubRight: 42,
    });

    window.location.reload()

    clearInterval(bulletInterval);
    setTimeout(() => {
      this.setState({ display: 'Restart game?' });
    }, 1000);
  }

  fireShrub() {
    const hay_bale_1 = this.hayBaleRef.current;

    // hay_bale_1.style.animation = this.state.shrubAnimation;

    const shrubInterval = setInterval(() => {
      if (this.state.started === true) {
        if (
          this.state.shrubRight <= 1 &&
          this.state.position - 5 <=
            this.state.shrubTop <=
            this.state.position + 5
        ) {
          this.gameOver(shrubInterval);
          clearInterval(shrubInterval);
        }

        this.setState({
          shrubRight: this.state.shrubRight - 0.1,
        });
      }
    }, 10);

    setTimeout(() => {
      this.setState({
        shrubDisplay: 'none',
        shrubRight: 42,
      });
      this.setState({
        shrubTop: Math.random() * 15,
      });
      clearInterval(shrubInterval);
    }, 10000);

    setTimeout(() => {
      this.setState({
        shrubDisplay: 'block',
      });
      this.fireShrub();
    }, 11000);
  }

  handleYesclick() {
    this.startingGame();
  }

  handleNoClick() {
    alert('Are you scared?');
  }

  render() {
    return (
      <Container
        textAlign="center"
        style={{ position: 'absolute', display: 'inline-block' }}
        className="game"
        fluid
      >
        <Container
          fluid
          textAlign="center"
          ref={this.counterRef}
          className="counter"
        >
          {this.state.display}

          <br />
          {this.state.display === 'Restart game?' ||
          this.state.display === 'Start game?' ? (
            <Container>
              <Button
                onClick={() => this.handleYesclick()}
                style={{ position: 'relative' }}
                basic
              >
                Yes
              </Button>
              <Button
                onClick={() => this.handleNoClick()}
                style={{ position: 'relative' }}
                basic
              >
                No
              </Button>{' '}
            </Container>
          ) : null}
        </Container>

        {/* start of characters and images - game itself */}
        <div style={{ width: '100%', height: '200vh', padding: '20vh' }}>
          <Ref innerRef={this.villainRef}>
            <Image
              className="villain"
              style={{ marginTop: `${this.state.marginTop}vh` }}
              src={Villain_1}
              alt="Villain"
              floated="right"
              size="small"
            />
          </Ref>
          <Ref innerRef={this.spriteRef}>
            <Image
              src={`${this.state.sprite}`}
              floated="left"
              className="sprite"
              size="small"
              style={{
                marginTop: `${this.state.position}vh`,
              }}
            />
          </Ref>
          <Ref innerRef={this.bulletRef}>
            <Image
              style={{
                marginTop: `${this.state.bulletTop - 1.8}vh`,
                marginLeft: `${this.state.bulletMarginLeft}vw`,
                display: `${this.state.bulletDisplay}`,
                position: 'absolute',
              }}
              src={bullet_1}
              alt="bullet"
              floated="right"
              size="small"
            />
          </Ref>
          <Ref innerRef={this.hayRollRef}>
            <Image
              style={{
                marginTop: `${this.state.hbTop + 4.5}vh`,
                display: `${this.state.hbDisplay}`,
                zIndex: '7000',
                position: 'absolute',
                marginLeft: `${this.state.hbRight}vw`,
              }}
              src={hay_bale_1}
              alt="bullet tail"
              floated="right"
              size="mini"
            />
          </Ref>
          <Ref innerRef={this.hayBaleRef}>
            <Image
              src={shrub_1}
              size="mini"
              floated="right"
              style={{
                marginTop: `${this.state.shrubTop}vh`,
                marginLeft: `${this.state.shrubRight}vw`,
                display: `${this.state.shrubDisplay}`,
                position: 'absolute',
              }}
            />
          </Ref>
        </div>
      </Container>
    );
  }
}
