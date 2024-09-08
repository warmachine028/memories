import { styled } from '@mui/material/styles'

const PREFIX = 'PostDetails'
export const classes = {
  root: `${PREFIX}-root`,
  media: `${PREFIX}-media`,
  card: `${PREFIX}-card`,
  section: `${PREFIX}-section`,
  imageSection: `${PREFIX}-imageSection`,
  recommendedPosts: `${PREFIX}-recommendedPosts`,
  loadingPaperLight: `${PREFIX}-loadingPaperLight`,
  loadingPaperDark: `${PREFIX}-loadingPaperDark`,
  commentText: `${PREFIX}-commentText`,
  paragraph: `${PREFIX}-paragraph`,
  tags: `${PREFIX}-tags`,
  title: `${PREFIX}-title`,
  darktitle: `${PREFIX}-darktitle`,
  privateLabel: `${PREFIX}-privateLabel`,
  notFound: `${PREFIX}-notFound`,
  recommendedPostGrid: `${PREFIX}-recommendedPostGrid`,
  textColor: `${PREFIX}-textColor`,
  darkTextColor: `${PREFIX}-darkTextColor`
}

export const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    margin: '10px 5px'
    // padding: '10px',
  },
  [`& .${classes.media}`]: {
    borderRadius: '5px',
    objectFit: 'scale-down',
    width: '100%',
    maxHeight: '500px'
  },
  [`& .${classes.card}`]: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  [`& .${classes.section}`]: {
    borderRadius: '5px',
    margin: '10px',
    flex: 1,
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap'
    }
  },
  [`& .${classes.imageSection}`]: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  [`& .${classes.recommendedPosts}`]: {
    display: 'flex',
    justifyContent: 'center',
    minheight: '39vh',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  [`& .${classes.loadingPaperLight}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px',
    borderRadius: '5px',
    minheight: '39vh',
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, .09)',
    backdropFilter: 'blur(10px)',
    flexDirection: 'column'
  },

  [`& .${classes.loadingPaperDark}`]: {
    backgroundColor: 'rgba(5, 5, 5, .9)'
  },
  [`& .${classes.commentText}`]: {
    width: '94%',
    display: 'flex',
    color: 'white',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '280px'
    },
    [theme.breakpoints.down(385)]: {
      maxWidth: '225px'
    }
  },
  [`& .${classes.paragraph}`]: {
    wordBreak: 'break-word',
    textAlign: 'justify',
    color: 'white'
  },
  [`& .${classes.tags}`]: {
    textAlign: 'center'
  },
  [`& .${classes.title}`]: {
    textAlign: 'center',
    color: 'black',
    wordBreak: 'break-word',
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px',
      fontWeight: 'bolder',
      marginBottom: '20px'
    }
  },
  [`& .${classes.darktitle}`]: {
    color: 'white'
  },
  [`& .${classes.privateLabel}`]: {
    backgroundColor: '#00b5ff',
    align: 'center'
  },
  [`& .${classes.notFound}`]: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    width: '100%'
  },
  [`& .${classes.recommendedPostGrid}`]: {
    justifyContent: 'space-around',
    marginTop: 5,
    marginLeft: 0,
    flexDirection: 'row',
    width: '100%'
  },
  [`& .${classes.textColor}`]: {
    color: 'black'
  },
  [`& .${classes.darkTextColor}`]: {
    color: 'white'
  }
}))

export default Root
