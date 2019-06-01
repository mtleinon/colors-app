// import sizes from './sizes';
import { DRAWER_WIDTH } from '../constants';
import sizes from './sizes';
const drawerWidth = DRAWER_WIDTH;
const styles = theme => ({
  root: {
    display: 'flex'
  },
  hide: {
    display: 'none'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    margin: '0 20px 0 12px',
    [sizes.down('xs')]: {
      margin: '0 2px 0 2px'
    }
  },
  navButtons: {
    marginRight: '1rem',
    [sizes.down('xs')]: {
      marginRight: '2px'
    }
  },
  navButton: {
    margin: '0 .5rem',
    [sizes.down('xs')]: {
      margin: '0 2px'
    }
  },
  link: {
    textDecoration: 'none'
  }
});

export default styles;
