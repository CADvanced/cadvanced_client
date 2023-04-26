import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FilteredSelect from '../../../lib/FilteredSelect';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

import { ALL_VEHICLE_MODELS } from '../../../graphql/VehicleModels/queries';
import { SEARCH_VEHICLES } from '../../../graphql/Vehicles/queries';
import SearchVehiclesResults from './SearchVehiclesResults';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex'
    },
    formControl: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit,
        minWidth: 120
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
    menuItem: {
        fontFamily: 'Share Tech Mono, monospace'
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

const SearchVehicles = ({ classes }) => {
    const [loaded, setLoaded] = useState(false);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState({
        licencePlate: '',
        colour: '',
        vehicleModel: '0'
    });
    const { data: allModelsResults } = useQuery(ALL_VEHICLE_MODELS, {
        fetchPolicy: 'network-only'
    });
    const [
        doSearch,
        { loading: searchLoading, data: searchResults }
    ] = useLazyQuery(SEARCH_VEHICLES);

    useEffect(() => {
        if (
            (search.licencePlate && search.licencePlate.length > 0) ||
            (search.colour && search.colour.length > 0) ||
            search.vehicleModel > 0
        ) {
            let timeout = setTimeout(() => sendSearch(), 1000);
            return () => clearTimeout(timeout);
        }
    }, [search]);

    const sendSearch = () => {
        let toSend = {};
        ['licencePlate', 'colour', 'vehicleModel'].forEach(prop => {
            if (search[prop] && search[prop].length > 0 && search[prop] !== '0') {
                toSend[prop] = search[prop].trim();
            }
        });
        doSearch({ variables: { ...toSend } });
    };

    useEffect(() => {
        if (
            searchResults &&
            searchResults.hasOwnProperty('searchVehicles') &&
            searchResults.searchVehicles !== results
        ) {
            setResults(searchResults.searchVehicles);
            setLoaded(true);
        }
    }, [searchResults]);

    const handleSearchChange = (key, value) => {
        setSearch({
            ...search,
            [key]: value
        });
    };

    return (
        <React.Fragment>
            <Grid container spacing={32} className={classes.root}>
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
                        id="outlined-licencePlate"
                        label="Search licence plate"
                        value={search.licencePlate}
                        onChange={event =>
                            handleSearchChange(
                                'licencePlate',
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
                        id="outlined-colour"
                        label="Search vehicle colour"
                        value={search.colour}
                        onChange={event =>
                            handleSearchChange('colour', event.target.value)
                        }
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item lg={4} xs={12}>
                    <FormControl className={classes.formControl} fullWidth>
                        {allModelsResults && (
                            <FilteredSelect
                                classes={{
                                    root: classes.select,
                                    select: classes.select,
                                    selectMenu: classes.input
                                }}
                                options={allModelsResults.allVehicleModels.map(
                                    veh => ({ label: veh.name, value: veh.id })
                                )}
                                selected={search.vehicleModel}
                                update={value =>
                                    handleSearchChange('vehicleModel', value)
                                }
                                placeholder="Vehicle Model"
                                noOptionsMessage="No vehicle models defined"
                            />
                        )}
                    </FormControl>
                </Grid>
            </Grid>
            {searchLoading && (
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
            {loaded && !searchLoading && results && results.length === 0 && (
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
            {!searchLoading && results && results.length > 0 && (
                <Grid container className={classes.resultsRoot}>
                    <Grid item lg={12} xs={12}>
                        <SearchVehiclesResults results={results} />
                    </Grid>
                </Grid>
            )}
        </React.Fragment>
    );
};

export default withStyles(styles)(SearchVehicles);
