import sizes from './sizes';
import background from './listBackground.svg';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

export default {
  '@global': {
    '.fade-exit': {
      opacity: 1
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms ease-out'
    }
  },
  root: {
    backgroundColor: '#0804CC',
    backgroundImage: `url(${background})` /* background by SVGBackgrounds.com */,
    // backgroundSize: '2000px 1100px',
    // backgroundImage:
    //   'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflowY: 'scroll'
  },
  container: {
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
    // padding: '.5rem',
    // borderRadius: '1rem',
    // marginTop: '1rem',
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'center',
    flexWrap: 'wrap',
    [sizes.down('xl')]: {
      width: '60%'
    },
    [sizes.down('lg')]: {
      width: '70%'
    },
    [sizes.down('md')]: {
      width: '80%'
    }
    // [sizes.down('xs')]: {
    //   width: '100%',
    //   margin: '1rem'
    // }
  },
  nav: {
    display: 'flex',
    width: '100%',
    marginBottom: '.5rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',

    '& a': {
      color: 'white',
      padding: '.3rem .8rem',
      textDecoration: 'none',
      backgroundColor: 'rgba(255,255,255,.3)'
    }
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '2rem',
    [sizes.down('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 1fr)'
    }
  },
  avatarCancel: {
    backgroundColor: red[100],
    color: red[600]
  },
  avatarCheck: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};
