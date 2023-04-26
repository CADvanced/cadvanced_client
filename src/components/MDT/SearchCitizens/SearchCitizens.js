import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { SEARCH_CITIZENS } from '../../../graphql/Citizens/queries';
import SearchCitizenResult from './SearchCitizenResult';

const styles = theme => ({
    root: {
        display: 'flex'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    resultsRoot: {
        display: 'flex',
        marginTop: theme.spacing.unit * 5
    },
    loadingRoot: {
        textAlign: 'center',
        display: 'flex',
        marginTop: theme.spacing.unit * 5
    },
    loadingMessage: {
        fontFamily: 'Share Tech Mono, monospace'
    },
    inputLabel: {
        color: theme.palette.mdt.mid
    },
    input: {
        color: theme.palette.mdt.mid
    }
});

const SearchCitizens = ({ classes }) => {
    const [loaded, setLoaded] = useState(false);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        id: ''
    });
    const [expanded, setExpanded] = useState(null);

    const [doSearch, { loading, data }] = useLazyQuery(SEARCH_CITIZENS, {
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        if (
            (search.firstName && search.firstName.length > 0) ||
            (search.lastName && search.lastName.length > 0) ||
            (search.dateOfBirth && search.dateOfBirth.length > 0) ||
            (search.id && search.id.length) > 0
        ) {
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
        ['firstName', 'lastName', 'dateOfBirth', 'id'].forEach(prop => {
            if (search[prop] && search[prop].length > 0) {
                toSend[prop] = search[prop].trim();
            }
        });
        doSearch({ variables: { ...toSend } });
    };

    const handleSearchChange = (key, value) => {
        setSearch({
            ...search,
            [key]: value
        });
    };

    const updateExpanded = id => {
        if (expanded === id) {
            setExpanded(null);
        } else {
            setExpanded(id);
        }
    };

    return (
        <React.Fragment>
            <Grid container spacing={32} className={classes.root}>
                <Grid item lg={2} xs={12}>
                    <TextField
                        InputLabelProps={{
                            classes: {
                                root: classes.inputLabel
                            }
                        }}
                        InputProps={{
                            classes: {
                                input: classes.input
                            }
                        }}
                        id="outlined-firstName"
                        label="Search first name"
                        className={classes.textField}
                        value={search.firstName}
                        onChange={event =>
                            handleSearchChange('firstName', event.target.value)
                        }
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item lg={2} xs={12}>
                    <TextField
                        InputLabelProps={{
                            classes: {
                                root: classes.inputLabel
                            }
                        }}
                        InputProps={{
                            classes: {
                                input: classes.input
                            }
                        }}
                        id="outlined-lastName"
                        label="Search last name"
                        className={classes.textField}
                        value={search.lastName}
                        onChange={event =>
                            handleSearchChange('lastName', event.target.value)
                        }
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item lg={4} xs={12}>
                    <TextField
                        InputLabelProps={{
                            classes: {
                                root: classes.inputLabel
                            }
                        }}
                        InputProps={{
                            classes: {
                                input: classes.input
                            }
                        }}
                        id="outlined-dateOfBirth"
                        label="Search date of birth"
                        className={classes.textField}
                        value={search.dateOfBirth}
                        onChange={event =>
                            handleSearchChange(
                                'dateOfBirth',
                                event.target.value
                            )
                        }
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item lg={4} xs={12}>
                    <TextField
                        InputLabelProps={{
                            classes: {
                                root: classes.inputLabel
                            }
                        }}
                        InputProps={{
                            classes: {
                                input: classes.input
                            }
                        }}
                        type="number"
                        id="outlined-id"
                        label="Search citizen ID"
                        className={classes.textField}
                        value={search.id}
                        onChange={event =>
                            handleSearchChange('id', event.target.value)
                        }
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
            </Grid>
            {loading && (
                <Grid container className={classes.loadingRoot}>
                    <Grid item lg={12} xs={12}>
                        <Typography
                            variant="h4"
                            className={classes.loadingMessage}
                        >
                            Contacting central database...
                        </Typography>
                    </Grid>
                </Grid>
            )}
            {loaded && !loading && results && results.length === 0 && (
                <Grid container className={classes.loadingRoot}>
                    <Grid item lg={12} xs={12}>
                        <Typography
                            variant="h4"
                            className={classes.loadingMessage}
                        >
                            No results found
                        </Typography>
                    </Grid>
                </Grid>
            )}
            {!loading && results && results.length > 0 && (
                <Grid container className={classes.resultsRoot}>
                    <Grid item lg={12} xs={12}>
                        {results.map(result => (
                            <SearchCitizenResult
                                key={result.id}
                                citizen={result}
                                expanded={expanded}
                                updateExpanded={updateExpanded}
                            />
                        ))}
                    </Grid>
                </Grid>
            )}
        </React.Fragment>
    );
};

export default withStyles(styles)(SearchCitizens);
