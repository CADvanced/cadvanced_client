import React from 'react';
import compose from 'lodash.flowright';
import { Query } from 'react-apollo';
import {
    Map,
    TileLayer,
    ZoomControl,
    LayersControl
} from 'react-leaflet';
import { CRS } from 'leaflet';

import { withStyles } from '@material-ui/core';

import withContext from '../../hoc/ContextConsumer';
import CallMarker from './CallMarker/CallMarker';
import UserUnitsModal from '../User/UserUnitsModal';
import withUserLocations from '../../hoc/withUserLocations';
import withCalls from '../../hoc/withCalls';
import UserMarker from './UserMarker/UserMarker';
import { ALL_MAPS } from '../../graphql/Maps/queries';

const styles = theme => ({
    map: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#25aad3'
    },
});

class CadMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 2,
            minZoom: 0,
            maxZoom: 5,
            attribution: 'Map data &copy; Rockstar Games',
            center: [-128, 128],
            allUserLocations: [],
            allCalls: [],
            userModalOpen: false,
            editingUser: null,
            uid: null
        };
    }

    populateLocations = allUserLocations => {
        const allUserLocationsFiltered = allUserLocations
            .filter(loc => loc.x && loc.y ? true : false)
            // Only display officers appropriate to the dispatcher's
            // selected department (of which there might not be one)
            .filter(loc => !this.props.department.id || (loc.character && loc.character.DepartmentId === this.props.department.id));
        this.setState({ allUserLocations: allUserLocationsFiltered });
    };

    populateCalls = allCalls => {
        this.setState({ allCalls });
    };

    componentDidMount() {
        if (
            this.props.hasOwnProperty('allUserLocations') &&
            this.props.allUserLocations
        ) {
            this.populateLocations(this.props.allUserLocations);
        }
        if (this.props.hasOwnProperty('allCalls') && this.props.allCalls) {
            this.populateCalls(this.props.allCalls);
        }
        if (this.props.context.hasOwnProperty('config')) {
            const conf = this.props.context.config.find(c => c.key === 'uid');
            this.setState({ uid: conf.value });
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.hasOwnProperty('allUserLocations') &&
            this.props.allUserLocations !== prevProps.allUserLocations
        ) {
            this.populateLocations(this.props.allUserLocations);
        }
        if (
            this.props.hasOwnProperty('allCalls') &&
            this.props.allCalls !== prevProps.allCalls
        ) {
            this.populateCalls(this.props.allCalls);
        }
    }

    openUserModal = user => {
        this.setState({
            editingUser: user,
            userModalOpen: true
        });
    };

    closeUserModal = () => {
        this.setState({
            editingUser: null,
            userModalOpen: false
        });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.userModalOpen && (
                    <UserUnitsModal
                        user={this.state.editingUser}
                        open={this.state.userModalOpen}
                        close={this.closeUserModal}
                    />
                )}
                <Query query={ALL_MAPS}>
                    {({ subscribeToMore, data }) => {
                        const activeMaps = data ?
                            data.allMaps.filter(m => m.active) :
                            [];
                        const layers = activeMaps.map((layer, i) =>
                            <LayersControl.BaseLayer
                                key={layer.id}
                                checked={(activeMaps.length === 1 || layer.id === 'f49debda-9724-4e01-946c-6c1a114a2dd5') ? true : false}
                                name={layer.name}
                            >
                                <TileLayer
                                    minZoom={this.state.minZoom}
                                    maxZoom={this.state.maxZoom}
                                    attribution={this.state.attribution}
                                    url={`/custom_maps/${btoa(layer.id)}/{z}/map_{x}_{y}.png`}
                                />
                            </LayersControl.BaseLayer>
                        );
                        return <Map
                            className={this.props.classes.map}
                            ref={c => {
                                this.map = c;
                            }}
                            crs={CRS.Simple}
                            center={this.state.center}
                            minZoom={this.state.minZoom}
                            maxZoom={this.state.maxZoom}
                            zoom={this.state.zoom}
                            zoomControl={false}
                        >
                            <LayersControl position="bottomright">
                                {layers}
                            </LayersControl>
                            <ZoomControl position="bottomleft" />
                            {this.state.allCalls.map(location => {
                                return (
                                    <CallMarker
                                        highlightedCall={this.props.highlightedCall}
                                        key={location.id}
                                        call={location}
                                    />
                                );
                            })}
                            {this.state.allUserLocations.map(location =>
                                <UserMarker
                                    key={location.id}
                                    location={location}
                                    openUserModal={this.openUserModal}
                                />
                            )}
                        </Map>;
                    }}
                </Query>
            </React.Fragment>
        );
    }
}

export default compose(
    withStyles(styles),
    withCalls,
    withContext,
    withUserLocations
)(CadMap);
