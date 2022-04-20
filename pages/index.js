import React, {useCallback} from "react";
import {
  AppBar, Box, Container, Fab,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useScrollTrigger,
  useTheme, Zoom
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {lightTheme, darkTheme} from "../themes";
import {Brightness4, Brightness7, KeyboardArrowUp} from '@material-ui/icons';
import data from '../data.json';
import Welcome from "../components/Welcome";
import Skills from "../components/Skills";
import About from "../components/About";
import Experience from "../components/Experience";

const { name } = data
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontWeight:"bold",
  },
  appBar: {
    boxShadow: "none",
  },
  toolbar: {
    boxShadow:"none",
    backgroundColor: theme.palette.background.paper,
  },
}))

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
        '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
      <Zoom in={trigger}>
        <Box
            onClick={handleClick}
            role="presentation"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          {children}
        </Box>
      </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};


export default function Home({setTheme, props}) {
  const theme = useTheme();
  const classes = useStyles()

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const toggleTheme = useCallback(() => {
    setTheme(theme => theme.palette.type === 'dark' ? lightTheme : darkTheme)
  }, [setTheme])


  return (
      <>
        <div className={classes.root}>
        <AppBar color={!trigger ? "transparent" : "inherit"} className={classes.appBar} position="fixed">
          <Toolbar>
            <Typography variant="h5" className={classes.root}>
              {name}
            </Typography>
            <IconButton edge="end" color="inherit" onClick={toggleTheme}>
              {theme.palette.type === "dark" ? <Brightness7/> : <Brightness4/>}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor"/>
        <Container >
          <Welcome/>
          <Skills/>
          <Experience/>
          <About/>
        </Container>
      </div>
        <ScrollTop {...props}>
          <Fab color="primary" size="medium" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>
      </>


  )
}
