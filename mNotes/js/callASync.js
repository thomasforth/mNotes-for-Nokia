/* asynchronous call */

// defined global, as required in call-back as well.
var xmlHttp = null;

function callASync(url) {
    try {
        xmlHttp = new Ajax();
        xmlHttp.onreadystatechange = httpCallBack;
        xmlHttp.open('GET', url, true);
        xmlHttp.send(null);
    }
    catch (e) {
        uiManager.showNotification(500, "wait", "Sorry, I can't connect. Please check that you are connected to the internet and try again", null);
    }
}

function httpCallBack()  {
	if(xmlHttp.readyState != 4) {
	}
	// readyStatus=4 Means completed
	if (xmlHttp.readyState == 4) {
		try  {
			// first check, if there is a response at all
			var resultXml = xmlHttp.responseText;
			if (!resultXml) {
			    //make sure the result exists 
			}
			else {
			    aSyncReturnText = xmlHttp.responseText;
			    parseJSON(aSyncReturnText, outputView, insertoption);
			    insertoption = null; //reset the insertoption (if it was set);
			    uiManager.setView(outputView);
			}
		}
		catch (e) {
		//this runs again after a succesful return so needs to be left empty
	    }


    }
}