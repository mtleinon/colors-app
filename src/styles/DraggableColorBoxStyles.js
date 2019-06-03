import sizes from './sizes';
import chroma from 'chroma-js';

export default {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.3)'
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: '20%'
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '10%'
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: '5%'
    }
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0',
    bottom: '0',
    padding: '10px',
    color: props =>
      chroma(props.color.color).luminance() <= 0.08
        ? 'rgba(255, 255, 255, 0.8)'
        : 'rgba(0, 0, 0, 0.8)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [sizes.down('xs')]: {
      padding: 0
    }
  },
  icon: {
    transition: 'all 0.3s ease-in-out'
  }
};
