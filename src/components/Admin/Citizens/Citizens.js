import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Citizen from '../../Citizens/Citizen/Citizen';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { SEARCH_CITIZENS } from '../../../graphql/Citizens/queries';

const styles = theme => ({
    noCitizens: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 10,
        color: theme.palette.primary.darkShade
    },
    pageHead: {
        color: theme.palette.primary.darkShade,
        paddingBottom: theme.spacing.unit * 8
    },
    textField: {
        marginLeft: '25%',
        marginRight: '25%',
        width: '50%'
    },
    loadingRoot: {
        textAlign: 'center',
        display: 'flex',
        marginTop: theme.spacing.unit * 5
    },
    resultsRoot: {
        marginTop: theme.spacing.unit * 3
    }
});

const Citizens = ({ classes }) => {
    const [expanded, setExpanded] = useState();
    const [loaded, setLoaded] = useState(false);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState({
        input: ''
    });

    const handleChange = event => {
        setSearch({ input: event.target.value });
    };

    const [doSearch, { loading, data }] = useLazyQuery(SEARCH_CITIZENS);

    useEffect(() => {
        if (search.input.length >= 3) {
            let timeout = setTimeout(() => sendSearch(), 1000);
            return () => clearTimeout(timeout);
        }
    }, [search]);

    useEffect(() => {
        if (
            data &&
            data.hasOwnProperty('searchCitizens') &&
            data.searchCitizens !== results
        ) {
            setResults(data.searchCitizens);
            setLoaded(true);
        }
    }, [data]);

    const sendSearch = () => {
        let toSend = {};
        ['firstName', 'lastName'].forEach(prop => {
            if (search.input.length >= 3) {
                toSend[prop] = search.input.trim();
            }
        });
        doSearch({ variables: { ...toSend, bool: 'or' } });
    };

    return (
        <React.Fragment>
            <Typography
                align="center"
                className={classes.pageHead}
                variant="h2"
                component="h2"
            >
                Manage citizens
            </Typography>
            <TextField
                id="Search"
                label="Search for a citizen by first name or last name"
                className={classes.textField}
                value={search.input}
                onChange={handleChange}
                margin="normal"
            />
            {loading && <LoadingSpinner />}
            {loaded && !loading && results.length === 0 && (
                <Grid container className={classes.loadingRoot}>
                    <Grid item lg={12} xs={12}>
                        <Typography variant="h4" className={classes.noCitizens}>
                            No results found
                        </Typography>
                    </Grid>
                </Grid>
            )}
            {results.length > 0 && (
                <div className={classes.resultsRoot}>
                    {results.map((citizen, idx) => (
                        <Citizen
                            selectDisabled={true}
                            key={citizen.id}
                            expanded={expanded}
                            setExpanded={setExpanded}
                            citizen={citizen}
                            idx={idx}
                        />
                    ))}
                </div>
            )}
        </React.Fragment>
    );
};

export default withStyles(styles)(Citizens);
