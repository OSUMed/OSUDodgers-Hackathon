import React from 'react';
import { Container, Button, Image, Ref } from 'semantic-ui-react';

import './villain.css';
import Villain_1 from './RedneckVillain.png';
// import block_1 from './Villain.jpeg';
import bullet_1 from './HayRoll.png';
import bullet_tail_1 from './bulletTail.png';
import sprite from './Running2.png';
import spriteUpDown from './UpDown.png';
import spriteRunning1 from './Running1.png';
import hay_bale_1 from './HayBale.png';
import hay_roll_1 from './Shrub.png';

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
    this.canvasRef = React.createRef();
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
      classNames: '',
      position: 10,
      marginTop: 10,
      bulletTop: 0,
      firing: false,
      hbTop: 10,
      sprite: sprite,
      hbRight: 100,
      hbDisplay: 'none',
      hbActive: false,
      display: 'Start game?',
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
        this.setState({
          position: this.state.position - 1,
          sprite: spriteUpDown,
        });
      } else if (event.key === 's') {
        this.setState({
          position: this.state.position + 1,
          sprite: spriteUpDown,
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

  fireHayBale() {
    const hay_bale_1 = this.hayBaleRef.current;
    
    
    hay_bale_1.style.animation = 'hayBale 10s linear infinite';

    setInterval(()=> {
      this.setState({
        hbTop: Math.random() * 10
      })
    }, 15000)
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
    this.fireHayBale();
  }

  move = () => {
    setInterval(() => {
      if (this.state.position > this.state.marginTop) {
        this.setState({
          marginTop: this.state.marginTop + 1,
        });
      }

      if (this.state.position < this.state.marginTop) {
        this.setState({
          marginTop: this.state.marginTop - 1,
        });
      }
    }, 900);

    setInterval(() => {
      if (
        this.state.position === this.state.marginTop &&
        this.state.firing === false
      ) {
        this.fire(this.state.marginTop);
      }
    }, 900);
  };

  fire = bulletTop => {
    const bullet = this.bulletRef.current;

    bullet.style.animation = 'bullet 15s linear';
    this.setState({
      bulletTop: bulletTop,
      bulletDisplay: 'block',
      bulletTailDisplay: 'none',
      firing: true,
    });

    setInterval(() => {
      this.setState({
        bulletDisplay: 'none',
        firing: false,
      });
    }, 15000);
  };

  handleYesclick() {
    this.startingGame();
  }

  handleNoClick() {
    alert('Are you scared?');
  }

  render() {
    return (
      <Container
        fluid
        textAlign="center"
        style={{ position: 'absolute', display: 'inline-block' }}
        className="game"
      >
        <div ref={this.counterRef} className="counter">
          {this.state.display}
        </div>
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
            style={{
              marginTop: `${this.state.position}vh`,
            }}
          />
        </Ref>
        <Ref innerRef={this.bulletRef}>
          <Image
            style={{
              marginTop: `${this.state.bulletTop + 3.4}vh`,
              marginRight: '-2vw',
              display: `${this.state.bulletDisplay}`,
              height: '1.45vh',
              width: '2.75vw'
            }}
            src={bullet_1}
            alt="bullet"
            floated="right"
            size="tiny"
          />
        </Ref>
        <Ref innerRef={this.bulletTailRef}>
          <Image
            style={{
              marginTop: `${this.state.bulletTop + 0.83}vh`,
              marginRight: '-4vw',
              display: `${this.state.bulletTailDisplay}`,
            }}
            src={bullet_tail_1}
            alt="bullet tail"
            floated="right"
            size="mini"
          />
        </Ref>
        <Ref innerRef={this.hayBaleRef}>
          <Image
            src={hay_roll_1}
            size="mini"
            style={{
              marginTop: `${this.state.hbTop}vh`,
              marginLeft: `${this.state.hbRight}vh`,
              display: `${this.state.hbDisplay}vh`,
            }}
          />
        </Ref>
      </Container>
    );
  }
}
