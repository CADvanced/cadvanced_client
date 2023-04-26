import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { divIcon, point } from 'leaflet';

const getTooltipBackground = user => {
    if (
        user &&
        user.character &&
        user.character.department &&
        user.character.department.colour &&
        user.character.department.colour.length > 0
    ) {
        return `#${user.character.department.colour}`;
    }
    return '#fff';
};

const getMarkerIcon = user => {
    const element = (
        <React.Fragment>
            <style>{`
                .iconContainer {
                    width: 0;
                    height: 0;
                    border-radius: 999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: ping 1.5s ease-out infinite;
                    background: ${getTooltipBackground(user)}
                }
                .icon {
                    width: 20px;
                    height: 20px;
                }            
                @keyframes ping {
                    0 % {
                        background: rgba(255, 255, 255, 1);
                    }
                    100% {
                        background: rgba(255, 255, 255, 0);
                        width: 80px;
                        height: 80px;
                        margin-left: -40px;
                        margin-top: -40px;
                    }
                }
            `}</style>
            <div className="iconContainer">
                <img className="icon" src={user.avatarUrl} />
            </div>

        </React.Fragment>
    );
    return new divIcon({
        iconAnchor: point(10, 10),
        html: ReactDOMServer.renderToStaticMarkup(element),
        className: 'dummy' // Remove the default styling
    });
};

export default getMarkerIcon;