function returnLocation() {
    returnLocationasync();
}

function returnLocationasync() {
    //uiManager.showNotification(-1, "wait", "Getting Location...", -1);
    // ErrorCallback function
    function errorCB(positionError) {
        alert("ErrorCode: " + positionError.code + " ErrorMessage: " + positionError.message + "\nFalling back to Platform Services 1.0");
        returnLocationsync; //fallback to asynchronous lookup where needed.
        uiManager.showNotification(500, "wait", "Location Lookup Unsuccessful", -1);
    }

    // callback function
    function result(position) {
        // position coordinates
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;

        // time when the position was obtained
        var timestamp = position.timestamp;

        // accuracy of the coordinate values
        var accuracy = position.coords.accuracy;
        useLocation(longitude, latitude);
    }

    try {
        so = nokia.device.load("geolocation");

        // timeout at 60000 milliseconds (60 seconds)
        var options = { timeout: 60000 };

        // get the current position
        so.getCurrentPosition(result, errorCB, options);
    }
    catch (e) {
        //alert(e);
        alert("Falling back to Platform Services 1.0");
        returnLocationsync; //fallback to asynchronous lookup where needed.
    }
}

function returnLocationsync() {
    //uiManager.showNotification(-1, "wait", "Getting Location...", -1);

    try {
        serviceObj = device.getServiceObject("Service.Location", "ILocation");
    } catch (ex) {
        //
        alert("Service object cannot be found.");
        return;
    }

    // We are interested in basic location information (longitude, latitude and
    // altitude) only, so let's define the criteria respectively
    var criteria = new Object();
    criteria.LocationInformationClass = "BasicLocationInformation";

    // Obtain the location information (synchronous)
    var result = serviceObj.ILocation.GetLocation(criteria);
    latitude = result.ReturnValue.Latitude;
    longitude = result.ReturnValue.Longitude;

    alert(latitude + longitude);
    
    useLocation();
}

function useLocation(longitude,latitude){    // Display the location
    if (latitude == longitude == undefined) {
        uiManager.showNotification(500, "wait", "Location Lookup Unsuccessful", -1);
    }
    else if (latitude == longitude == NaN) {
        uiManager.showNotification(500, "wait", "Location Lookup Unsuccessful", -1);
    }
    else {
        uiManager.showNotification(500, "wait", "Location Successful", -1);
        locationButton.setContent('Lat = ' + latitude + ' Long = ' + longitude);
    }
}