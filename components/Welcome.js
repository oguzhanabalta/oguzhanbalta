import React from "react";
import {
    Avatar,
    Box,
    Container, Fade, Grid, Hidden,
    makeStyles,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
    Zoom
} from "@material-ui/core";
import ReactTyped from "react-typed";
import simpleIcons from 'simple-icons'
import data from '../data.json'
const {welcome} = data
import { iconify } from "./util";
import {Cancel} from "@material-ui/icons";
import clsx from "clsx";
import Image from "next/image";


const contactAddress = welcome.contactAddress.map(({ alt, icon, link }) => {
    const ic = simpleIcons.get(iconify(icon)) || {
        hex: '424242',
        component: <Cancel color="white" fontSize={36} />
    }
    return {
        alt,
        backgroundColor: '#' + ic.hex,
        icon: ic.component || <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>{icon}</title>
            <path d={ic.path} fill="white" />
        </svg>,
        link
    }
})

let iobj = {}
contactAddress.forEach(({ alt, backgroundColor }) => {
    iobj[alt] = { backgroundColor }
})

const useStyles = makeStyles(theme => ({
    cont: {
        minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
        paddingBottom: theme.spacing(10)
    },
    subtitle: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5),
        color:"#20C20E"
    },
    avatar: {
        height: theme.spacing(10),
        width: theme.spacing(10),
        padding: theme.spacing(4),
        borderRadius:theme.spacing(8)
    },
    ...iobj
}))

export default function Welcome() {

    const classes = useStyles();
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
      <Grid container justify="center" alignItems="center" className={classes.cont}>
          <Grid item xs={12} lg={6}>
              <Typography variant={mdDown ? "h2" : "h1"} style={{fontWeight:"bold"}}>
                  {welcome.title}
              </Typography>
              <Typography variant={mdDown ? "h5" : "h4"} component="h3" className={classes.subtitle}>
                  <ReactTyped
                      strings={welcome.subtitles}
                      typeSpeed={40}
                      backSpeed={50}
                      loop
                  />
              </Typography>
              <Grid container direction="row" spacing={2}>
                  {
                      contactAddress.map(({ alt, icon, link }, i) =>
                          <Grid item key={i}>
                              <a href={link} target="_blank" rel="noopener noreferrer">
                                  <Zoom in={true} style={{ transitionDelay: `${100 * i}ms` }}>
                                      <Tooltip title={alt} placement="top">
                                          <Avatar variant="rounded" className={clsx([classes.avatar, classes[alt]])}>
                                              {icon}
                                          </Avatar>
                                      </Tooltip>
                                  </Zoom>
                              </a>
                          </Grid>
                      )
                  }
              </Grid>
          </Grid>
          <Hidden mdDown>
              <Fade in={true} style={{ transitionDelay: '100ms' }}>
                  <Grid item lg={6}>
                      {
                          theme.palette.type === "light" ? <Image
                          src="/welcome.svg"
                          alt="welcome"
                          width="900"
                          height="600"
                          /> : <Image
                              src="/welcome2.svg"
                              alt="welcome"
                              width="900"
                              height="600"
                          />
                      }
                  </Grid>
              </Fade>
          </Hidden>
      </Grid>
  );
}