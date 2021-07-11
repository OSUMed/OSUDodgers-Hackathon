import React from 'react';
import { Container, Button, Image, Ref } from 'semantic-ui-react';

import './villain.css';
import Villain_1 from './RedneckVillain.png';
import block_1 from './Villain.jpeg';
import bullet_1 from './Bullet.png';
import bullet_tail_1 from './bulletTail.png';

export default class Villain extends React.Component {
  constructor(props) {
    super(props);

    this.villainRef = React.createRef();
    this.blockRef = React.createRef();
    this.bulletRef = React.createRef();

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
      firing: false
    };
  }

  componentDidMount() {
    // let villain = this.villainRef.current;

    this.setState({ display: 'Start game?' });
    setTimeout(() => {
      this.setState({ visible: true });
    }, 500);
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

    const block = this.blockRef.current;
    console.log(block.style);

    this.move();

    setInterval(() => {
      this.setState({
        position: Math.ceil(Math.random() * 10),
      });

      block.style.marginTop = `${this.state.position}vh`;
    }, 1000);

    // villain.style.marginTop = `${block.style.marginTop}`
  }

  move = () => {

    setInterval(() => {
      if (this.state.position > this.state.marginTop) {
        this.setState({
          marginTop: this.state.marginTop + 1,
          bulletTailDisplay: 'none'
        });
      }

      if (this.state.position < this.state.marginTop) {
        this.setState({
          marginTop: this.state.marginTop - 1,
          bulletTailDisplay: 'none'
        });
      }
    }, 95);

    setInterval(() => {
      if (this.state.position === this.state.marginTop && this.state.firing === false) {
          this.fire(this.state.marginTop)
          this.setState({bulletTailDisplay: 'block'})
      } 
    }, 10);
  };

  fire = (bulletTop) => {
    const bullet = this.bulletRef.current;

    bullet.style.animation = 'bullet 10000ms linear'
    this.setState({
      bulletTop: bulletTop,
      bulletDisplay: 'block',
      bulletTailDisplay: 'none',
      firing: true
    })

    setInterval(() => {
      this.setState({
        bulletDisplay: 'none',
        firing: false
      })
    },10000)
    
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
        {/* <Ref innerRef={this.blockRef}>
          <Image
            className="block"
            src={block_1}
            alt="block"
            floated="left"
            size="small"
          />
        </Ref> */}
        <Ref innerRef={this.bulletRef}>
          <Image
            style={{
              marginTop: `${this.state.bulletTop + 0.83}vh`,
              marginRight: '-2vw',
              display: `${this.state.bulletDisplay}`,
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
            size="tiny"
          />
        </Ref>
      </Container>
    );
  }
}
