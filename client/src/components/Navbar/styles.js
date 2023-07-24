import { styled } from '@mui/material/styles';

import lightmodeIcon from '../../images/lightmodeIcon.png';
import darkmodeIcon from '../../images/darkmodeIcon.png';

const PREFIX = 'NavBar';
export const classes = {
  root: `${PREFIX}-root`,
  appBarLight: `${PREFIX}-appBarLight`,
  appBarDark: `${PREFIX}-appBarDark`,
  heading: `${PREFIX}-heading`,
  logo: `${PREFIX}-logo`,
  toolbar: `${PREFIX}-toolbar`,
  profile: `${PREFIX}-profile`,
  authButtonLight: `${PREFIX}-authButtonLight`,
  authButtonDark: `${PREFIX}-authButtonDark`,
  userName: `${PREFIX}-userName`,
  brandContainer: `${PREFIX}-brandContainer`,
  avatar: `${PREFIX}-avatar`,
  avaatar: `${PREFIX}-avaatar`,
  toggleDiv: `${PREFIX}-toggleDiv`,
  dn: `${PREFIX}-dn`,
  toggle: `${PREFIX}-toggle`,
};

export const Root = styled('div')(({ theme, floating }) => ({
  [`&.${classes.root}`]: {
    padding: '10px',
  },
  [`& .${classes.avaatar}`]: {
    margin: theme.spacing(1),
    height: '50px',
    width: '50px',
  },
  [`& .${classes.appBarLight}`]: {
    position: 'static',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    backdropFilter: 'blur(10px)',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down(360)]: {
      padding: '10px',
    },
  },
  [`& .${classes.appBarDark}`]: {
    backgroundColor: 'rgba(5, 5, 5, .90)',
  },
  [`& .${classes.heading}`]: {
    height: floating ? '50px' : '100px',
    [theme.breakpoints.down(400)]: {
      width: '-webkit-fill-available',
    },
  },
  [`& .${classes.logo}`]: {
    marginLeft: '10px',
    marginTop: '5px',
    height: floating ? '30px' : '60px',
    [theme.breakpoints.down(400)]: {
      display: 'none',
    },
  },
  [`& .${classes.toolbar}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '30px',
    [theme.breakpoints.down('md')]: {
      width: '-webkit-fill-available',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
    },
    [theme.breakpoints.down(600)]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
    },
  },
  [`& .${classes.profile}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    gap: '20px',
    [theme.breakpoints.down(600)]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
    },
    [theme.breakpoints.down(390)]: {
      width: '-webkit-fill-available',
      justifyContent: 'space-evenly',
    },
  },
  [`& .${classes.authButtonLight}`]: {
    backgroundColor: 'black',
  },
  [`& .${classes.authButtonDark}`]: {
    backgroundColor: 'white',
    color: 'black',
  },
  [`& .${classes.userName}`]: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    [theme.breakpoints.down(390)]: {
      display: 'none',
    },
  },
  [`& .${classes.brandContainer}`]: {
    display: 'flex',
    alignItems: 'center',
  },
  [`& .${classes.toggleDiv}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // Additional styles for the checkbox input (HiddenCheckbox)

    '& input': {
      width: '0',
      height: '0',
      visibility: 'hidden',
    },

    '& label:active:after': {
      width: '40px',
    }
  },

  [`& .${classes.dn}`]: {

    // Styles for the label when the checkbox is checked

    ':checked + label': {
      backgroundColor: '#242424',
    },
    
    ':checked + label:after': {
      content: '""', 
      width: '30px',
      height: '30px',
      position: 'absolute',
      backgroundImage: `url(${darkmodeIcon})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',  
      backgroundSize: '35px 35px',
      transition: '0.8s',
      transform: 'translate(100%)',
    },

    // Additional styles for the label (ToggleLabel)
  },
  [`& .${classes.toggle}`]: {
      width: '60px',
      height: '30px',
      padding: '4px',
      position: 'relative',
      display: 'block',
      backgroundColor: 'white',
      borderRadius: '200px',
      cursor: 'pointer',
      transition: '0.8s',

      ':after': {
        content: '""', 
        width: '30px',
        height: '30px',
        position: 'absolute',
        backgroundImage: `url(${lightmodeIcon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '35px 35px',
        transition: '0.8s',
      },
    }

}));
