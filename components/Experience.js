import { Avatar, Card, CardActionArea, CardHeader, Fade, Grid, Hidden, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import Image from 'next/image'
import { DateRange, LocationCity } from '@material-ui/icons';
import data from '../data.json'
import { useRef } from "react";
import useAnimate from "./useAnimate";
const { experience } = data

const useStyles = makeStyles(theme => ({
    cont: {
        minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
    },
    card: {
        height: '100%',

    },
    cardHeader: {
        paddingTop: 0
    },
    cardActionArea: {
        height: '100%',
    },
    expObj: {
        marginBottom: theme.spacing(4)
    },
    cardImage:{
        width:theme.spacing(6),
        height:theme.spacing(6),
        borderRadius:theme.spacing(12)
    }
}))

const getHumanDiff = (startDate, endDate) => {
    let str = ""
    const start = new Date(startDate)
    const end = !!endDate ? new Date(endDate) : new Date()
    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    if (years > 0) {
        str += years + " year"
        if (years > 1)
            str += "s"
    }

    if (str.length > 0)
        str += ", "

    if (months > 0) {
        str += months + " month"
        if (months > 1)
            str += "s"
    }

    return str;
}

export default function Experience() {

    const classes = useStyles()
    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const align = mdDown ? "center" : "flex-start"

    const animRef = useRef(null)
    const animate = useAnimate(animRef)

    return (
        <Grid direction="row" container justifyContent="center" alignItems="center" spacing={10} className={classes.cont}>
            <Grid item xs={12}>
                <Typography variant="h3" align={align}>
                    Experience
                </Typography>
                {mdDown ?<Hidden>

                        <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
                            <Image
                                alt="Experience"
                                src="/experience.svg"
                                width="380"
                                height="300"
                            />
                        </div>
                </Hidden>: null }

            </Grid>
            <Grid container item xs={12} lg={6} direction="column" spacing={1} alignItems={align}>
                {
                    experience.map((title, id) =>
                        <Grid item key={id} className={classes.expObj}>
                            <Typography variant="h4" align={"center"} gutterBottom component="p">
                                {title}
                            </Typography>
                            <Grid container direction={mdDown ? "column" : "row"} spacing={1} >
                                {
                                    experience[title].map(({
                                                               organization,
                                                               role,
                                                               type,
                                                               startDate,
                                                               endDate,
                                                               city,
                                                               state,
                                                               country,
                                                               url,
                                                               thumbnail
                                                           }, i) =>
                                        <Grid item xs={12} sm key={i}>
                                            <Fade in={animate} style={{ transitionDelay: `${200 * i}ms` }}>
                                                <Card className={classes.card}>
                                                    <CardActionArea
                                                        className={classes.cardActionArea}
                                                        href={url}
                                                        rel="noopener noreferrer"
                                                    >
                                                        <CardHeader
                                                            avatar={
                                                                <Avatar variant="rounded"
                                                                        className={classes.cardImage}>
                                                                    <Image
                                                                        alt={`${organization} logo`}
                                                                        src={thumbnail}
                                                                        layout="fill"

                                                                    />
                                                                </Avatar>
                                                            }
                                                            title={organization}
                                                            subheader={role + " - " + type}
                                                        />
                                                        <CardHeader
                                                            avatar={<DateRange />}
                                                            title={getHumanDiff(startDate, endDate)}
                                                            subheader={`${startDate} - ${endDate}`}
                                                            className={classes.cardHeader}
                                                        />
                                                        <CardHeader
                                                            avatar={<LocationCity />}
                                                            subheader={`${city}, ${state}, ${country}`}
                                                            className={classes.cardHeader}
                                                        />
                                                    </CardActionArea>
                                                </Card>
                                            </Fade>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
            <div ref={animRef}></div>
        </Grid>
    )
}
