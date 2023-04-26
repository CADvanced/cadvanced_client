import React from 'react';
import { Route } from 'react-router-dom';

import AdminAppBar from './AdminAppBar';
import AdminFront from './AdminFront';
import Calls from './Values/Calls/Calls';
import Units from './Values/Units/Units';
import Citizens from './Values/Citizens/Citizens';
import VehiclesWeapons from './Values/VehiclesWeapons/VehiclesWeapons';
import Legal from './Values/Legal/Legal';
import Users from './Values/Users/Users';
import UserManagement from './UserManagement/UserManagement';
import Preferences from './Preferences/Preferences';
import Downloads from './Downloads/Downloads';
import CitizenManagement from './Citizens/Citizens';
import Departments from './Departments/Departments';
import Maps from './Maps/Maps';

const Admin = () => {
    return (
        <AdminAppBar>
            <Route exact path="/admin" component={AdminFront} />
            <Route exact path="/admin/values/calls" component={Calls} />
            <Route exact path="/admin/values/units" component={Units} />
            <Route exact path="/admin/values/citizens" component={Citizens} />
            <Route
                exact
                path="/admin/values/vehiclesweapons"
                component={VehiclesWeapons}
            />
            <Route exact path="/admin/values/legal" component={Legal} />
            <Route exact path="/admin/values/users" component={Users} />
            <Route exact path="/admin/departments" component={Departments} />
            <Route exact path="/admin/citizens" component={CitizenManagement} />
            <Route
                exact
                path="/admin/usermanagement"
                component={UserManagement}
            />
            <Route exact path="/admin/maps" component={Maps} />
            <Route exact path="/admin/preferences" component={Preferences} />
            <Route exact path="/admin/downloads" component={Downloads} />
        </AdminAppBar>
    );
};

export default Admin;
