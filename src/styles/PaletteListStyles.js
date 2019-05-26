export default {
  root: {
    backgroundColor: 'blue',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'center',
    flexWrap: 'wrap'
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
    gridGap: '5%'
  }
};
