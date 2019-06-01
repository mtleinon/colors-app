import chroma from 'chroma-js';
import sizes from './sizes';

export default {
  colorBox: {
    width: '20%',
    height: props => (props.showFullPalette ? '25%' : '50%'),
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    /* position: absolute below causes space between color boxes. 
       Negative margin removes it */
    '&:hover button': {
      opacity: '1'
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: props => (props.showFullPalette ? '20%' : '33%')
    },
    [sizes.down('md')]: {
      width: '50%',
      height: props => (props.showFullPalette ? '10%' : '20%')
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: props => (props.showFullPalette ? '5%' : '10%')
    }
  },
  copyText: {
    color: props => (chroma(props.color).luminance() < 0.3 ? 'white' : 'black')
  },
  colorName: {
    color: props => (chroma(props.color).luminance() < 0.3 ? 'white' : 'black')
  },
  seeMore: {
    color: props => (chroma(props.color).luminance() < 0.3 ? 'white' : 'black'),
    background: props =>
      chroma(props.color).luminance() < 0.3
        ? 'rgba(255,255,255,.2)'
        : 'rgba(0,0,0,.1)',
    position: 'absolute',
    right: '0',
    bottom: '0',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase'
  },
  copyButton: {
    color: props => (chroma(props.color).luminance() < 0.3 ? 'white' : 'black'),
    background: props =>
      chroma(props.color).luminance() < 0.3
        ? 'rgba(255,255,255,.2)'
        : 'rgba(0,0,0,.1)',
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    opacity: '0'
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0',
    bottom: '0',
    padding: '10px',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px'
  },
  copyOverlay: {
    opacity: '0',
    zIndex: '0',
    width: '100%',
    height: '100%',
    transform: 'scale(.1)',
    transition: 'transform 0.6s ease-in-out'
  },
  showOverlay: {
    opacity: '1',
    transform: 'scale(50)',
    zIndex: '10',
    position: 'absolute'
  },
  copyMsg: {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: '4rem',
    transform: 'scale(.1)',
    opacity: '0',
    // color: 'white',
    color: props =>
      chroma(props.color).luminance() < 0.08 ? 'white' : 'black',
    background: props =>
      chroma(props.color).luminance() < 0.08
        ? 'rgba(255,255,255,.2)'
        : 'rgba(0,0,0,.1)',

    '& h1': {
      fontWeight: '400',
      textShadow: '1px 2px black',
      background: 'rgba(255,255,255, 0.2)',
      width: '100%',
      textAlign: 'center',
      marginBottom: '0',
      padding: '1rem',
      textTransform: 'uppercase',
      [sizes.down('xs')]: {
        fontSize: '6rem'
      }
    },
    '& p': {
      fontSize: '2rem',
      fontWeight: '100'
    }
  },
  showMessage: {
    opacity: '1',
    transform: 'scale(1)',
    zIndex: '25',
    transition: 'all 0.4s ease-in-out',
    transitionDelay: '0.3s'
  }
};
