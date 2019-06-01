import sizes from './sizes';
export default {
  Navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '6vh'
  },

  logo: {
    marginRight: '15px',
    padding: '0 13px',
    fontSize: '22px',
    backgroundColor: '#eceff1',
    fontFamily: "Roboto', sans-serif",
    height: '100%',
    display: 'flex',
    // alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: 'black',
      alignSelf: 'center'
    },
    [sizes.down('xs')]: {
      fontSize: '12px',
      '& a::first-letter': {
        fontSize: '200%',
        textTransform: 'uppercase'
      }
    }
  },
  level: {
    marginLeft: '10px'
  },
  slider: {
    width: '340px',
    margin: '0 10px',
    display: 'inline-block',

    '& .rc-slider-rail': {
      height: '8px'
    },
    '& .rc-slider-track': {
      backgroundColor: 'transparent'
    },

    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover': {
      backgroundColor: 'green',
      outline: 'none',
      border: '2px solid green',
      boxShadow: 'none',
      width: '13px',
      height: '13px',
      marginLeft: '-7px',
      marginTop: '-3px'
    },
    [sizes.down('md')]: {
      width: '145px'
    },
    [sizes.down('xs')]: {
      width: '50px'
    }
  },
  selectContainer: {
    margin: '0 1rem 0 auto'
  }
};
