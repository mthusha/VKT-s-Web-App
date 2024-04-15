import React from 'react';
import { Link } from 'react-router-dom';


const Map = () => {
    let publicUrl = process.env.PUBLIC_URL+'/';

    return (
        <div className="google-map mb-120">
            <iframe src="https://maps.google.com/maps?q=jaffna%20icbt&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" frameBorder={0} allowFullScreen aria-hidden="false" tabIndex={0} />
        </div>
    );
};

export default Map;
