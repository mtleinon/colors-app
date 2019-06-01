import sizes from './sizes';
export default {
  root: {
    backgroundColor: 'blue',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflowY: 'scroll'
  },
  container: {
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
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '2rem',
    [sizes.down('sm')]: {
      gridTemplateColumns: 'repeat(2, 47.5%)'
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)'
    }
  }
};
