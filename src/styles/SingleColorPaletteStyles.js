import sizes from './sizes';

export default {
  palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  paletteColors: {
    height: '90%'
  },
  backBox: {
    backgroundColor: 'black',
    width: '20%',
    height: '50%',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    /* position: absolute below causes space between color boxes. 
    Negative margin removes it */
    [sizes.down('lg')]: {
      width: '75%',
      height: '33%'
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '20%'
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: '10%'
    }
  },
  backButton: {
    color: 'white',
    background: 'rgba(255,255,255,.2)',
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
    textDecoration: 'none'
  }
};
