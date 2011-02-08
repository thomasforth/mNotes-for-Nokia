// Please don't remove line below - it is used for code-completion for Visual Studio
/// <reference path="preview\vsdoc.js" />

// Reference to the WRTKit user interface manager and main view.
var version = '1.01';

var uiManager;
var mainView;
var myNotesView = null;
var myLatestView = null;
var galleryView = null;
var uploadView = null;

dateObject = new Date(); //object for timekeeping

var lastControl = null;

var outputView; //some global variables so that "ActionPerformed" functions don't have to pass variables (bug on some phones)
var imgURL;
var loggedin = false; //global variable to hold the logged in state

var longitude;
var latitude;

var insertoption; //a global variable used by callASync to insert controls in the fileUpload view
var recognisedNoteID; //a global variable to hold the ID of a newly uploaded object's note
var uploadImagePath; //a global variable to hold the path to an image about to be uploaded
var silentLogin = false; //a global variable that makes logins silent that can be read by a callback function

var aSyncReturnText = null;

//about view label control
var aboutLabel;

// Called from the onload event handler to initialize the widget.
function init() {
    //the checkAPI code does not preview well so is disabled until shipping
    /*if (checkAPI() == true) {
    }
    else {
        alert('This application requires the APIBridge component from Nokia. This will now be downloaded and only needs to be installed once. Please install it and relaunch to continue');
        widget.openURL('http://www.tomforth.co.uk/moodstocks/apibridgedownloadhelper.php?file=APIBridge_v1_1.sis');
    }*/
    // create UI manager
    holdview = document.getElementById("viewholder");
    uiManager = new UIManager(holdview, null);
    createOptions();
    window.onresize = resizeFunction;
    resizeFunction();
    // This callback function deals with the style changes when device orientation is changed
    
    function resizeFunction() {       
        var uiManagerSection = document.getElementById('viewholder');
        
        if (window.innerHeight < 300) { //non-touch blackberry style device s60v3
            //alert('s60v3style');
            document.styleSheets[0].disabled = false;
            document.styleSheets[1].disabled = true;
            document.styleSheets[2].disabled = true;
            document.styleSheets[3].disabled = true;
            resizeFunction = null; //the resize function is useless on a S60v3 device and causes some problems, so I disable it.
            window.onresize = null; //I also disable the function call in case the above method doesn't work.
            menu.showSoftkeys();            
        }
        else { //touch screen device
            if (window.innerHeight < window.innerWidth) { //in landscape
                if (window.menu.location == 3) { //s60v5 behaviour to have softkeys on right in landscape
                    //alert('s60v5landscape');
                    menu.hideSoftkeys();
                    document.styleSheets[0].disabled = true;
                    document.styleSheets[1].disabled = true;
                    document.styleSheets[2].disabled = true;
                    document.styleSheets[3].disabled = false;
                    sectionHeight = window.innerHeight; //no softKeys at the bottom
                }
                else { //symbian^3 style softkey layout
                    //alert('symbian3landscape');
                    document.styleSheets[0].disabled = true;
                    document.styleSheets[1].disabled = false;
                    document.styleSheets[2].disabled = true;
                    document.styleSheets[3].disabled = true;
                    sectionHeight = window.innerHeight - 20; //softKeys take up room at the room
                }
            }
            else { //portrait is the same in both s60v5 and symbian^3
                //alert('touchportrait');
                menu.showSoftkeys();
                document.styleSheets[0].disabled = true;
                document.styleSheets[1].disabled = true;
                document.styleSheets[2].disabled = false;
                document.styleSheets[3].disabled = true;
                sectionHeight = window.innerHeight - 90; //softKeys and menubar take up more pix at the bottom
            }
            uiManagerSection.style.height = sectionHeight + 'px';
        }
        
    }

    // set cursor-navigation mode if we are in the WRT environment
    if (window.widget) {
        widget.setNavigationEnabled(true);
    }

    // create main view
    mainView = new ListView(null, null);
    latestView = new ListView(null, null);
	//Create about view
	aboutView = new ListView(null, "Hello World");
    
	// About lable control
    aboutLabel = new Label();
	aboutView.addControl(aboutLabel);
	
	//load my notes or go to login upon load
	if (!widget.preferenceForKey('password')) {
	    settingsPage();
	}
	else {
	    uiManager.showNotification(2000, "wait", "Logging in...", -1);
	    settingsPage('silent');
	    silentLogin = true;
	    doLogin();
	}
}

function createOptions() {
    //create about menu
    var aboutMenuItem = new MenuItem("About", 0);
    aboutMenuItem.onSelect = menuItemSelected;
    menu.append(aboutMenuItem);
    //create spanner menu item
    var spannerMenuItem = new MenuItem("Settings", 1);
    spannerMenuItem.onSelect = menuItemSelected;
    menu.append(spannerMenuItem);
    //create refresh menu item
    var refreshMenuItem = new MenuItem("Refresh", 2);
    refreshMenuItem.onSelect = menuItemSelected;
    menu.append(refreshMenuItem);
    //create checkforupdate menu item
    var updateMenuitem = new MenuItem("Check for Update", 3);
    updateMenuitem.onSelect = menuItemSelected;
    menu.append(updateMenuitem);
}

function settingsPage(option) {
    settingsView = new ListView(null, null);
    loginTextHolder = new ContentPanel(null, null, 'Please login to continue<br /><br />', false, true);
    settingsView.addControl(loginTextHolder);
    usernameField = new TextField(null, 'Username:', null, false);
    settingsView.addControl(usernameField);
    if (widget.preferenceForKey('username')) {
        usernameField.setText(widget.preferenceForKey('username'));
    }
    passwordField = new TextField(null, 'Password:', null, true);
    settingsView.addControl(passwordField);
    if (widget.preferenceForKey('password')) {
        passwordField.setText(widget.preferenceForKey('password'));
    }
    loginButton = new FormButton(null, 'Login');
    loginButton.addEventListener("ActionPerformed", doLogin);
    settingsView.addControl(loginButton);
    registerTextHolder = new ContentPanel(null, null, '<br /><br />Or click here to register and begin<br />', false, true);
    settingsView.addControl(registerTextHolder);
    registerButton = new FormButton(null, 'Register');
    registerButton.addEventListener("ActionPerformed", registerLink);
    settingsView.addControl(registerButton);
    if (option == 'silent') {
    }
    else {
        uiManager.setView(settingsView);
    }    
}

function registerLink() {
    signupURL = 'http://www.notes.moodstocks.com/web/signup';
    widget.openURL(signupURL);
}

function doLogin() {
    if (silentLogin != true) {
        uiManager.showNotification(-1, "wait", "Logging in...", -1);
    }
    widget.setPreferenceForKey(usernameField.getText(), 'username');
    widget.setPreferenceForKey(passwordField.getText(), 'password');
    
    username = widget.preferenceForKey('username');
    password = widget.preferenceForKey('password');
    echoURL = 'http://notes.moodstocks.com/api/v2/user/' + username + '/echo' + createHash(username, password);
    //alert(echoURL);
    testLogin(echoURL)
}

var loginAjax = null;

function testLogin(url) {
    try {
        loginAjax = new Ajax();
        loginAjax.onreadystatechange = loginResponse;
        loginAjax.open('GET', url, true);
        loginAjax.send(null);
    }
    catch (e) {
        uiManager.showNotification(500, "wait", "Sorry, I can't connect. Please check that you are connected to the internet and try again", null);
    }
}

function loginResponse() {
    if (loginAjax.readyState != 4) {
    }

    if (loginAjax.readyState == 4) {
        try {
            var response = loginAjax.responseText;
            if (!response) {
            }
            else {
                rawresponse = response;
                response = eval('(' + response + ')');
                if (response.status == 'ok') {
                    loggedin = true;
                    if (silentLogin == true) {
                        silentLogin = false; //reset silent login
                        if (outputView == myNotesView || outputView == null) { myNotesAPI(); }
                        if (outputView == myLatestView) { popularNotesAPI(); }                        
                    }
                    else {
                        alert('Login Successful!\nYou will be logged on automatically from now on!');
                        uiManager.showNotification(500, "wait", "Login Successful!", null);
                    }
                }
                else {
                    alert('Login was not successful ' + rawresponse);
                    uiManager.showNotification(500, "wait", "Login Unsuccessful.", null);
                    outputView = settingsPage;
                    settingsPage();
                    loggedin = false;                  
                }    
            }
        }
        catch (e) {
        }
    }
}

function refresh() {
    currentView = uiManager.getView();
    if (currentView == myNotesView) {
        myNotesView = null;
        myNotesAPI();
    }
    if (currentView == myLatestView) {
        myLatestView = null;
        popularNotesAPI();
    }
    if (currentView == galleryView) {
        getListAsync();
    }
}

function myNotesAPI() {
    if (!widget.preferenceForKey('password')) {
        alert('You need to login first!');
        settingsPage();
    }
    else {
        if (myNotesView == null) { //only fetch the feed if the view doesn't already exist
            if (loggedin == false) {
                settingsPage('silent');
                silentLogin = true;
                doLogin();
                myNotesView == null;
            }
            if (loggedin == true) {
                uiManager.showNotification(-1, "wait", "Getting your notes...", -1);
                myNotesView = new ListView(null, null);
                myNotesURL = 'http://notes.moodstocks.com/api/v2/user/' + widget.preferenceForKey('username') + '/note' + createHash(widget.preferenceForKey('username'), widget.preferenceForKey('password'));
                outputView = myNotesView;
                callASync(myNotesURL);
            }
        }
        else {
            uiManager.setView(myNotesView);
        } 
    }
}

function objectNotesAPI(object) {
    var objectfeedurl = 'http://notes.moodstocks.com/api/v2/object/' + object + createHash(widget.preferenceForKey('username'), widget.preferenceForKey('password'));
    uiManager.showNotification(-1, "wait", "Getting notes for object #" + object + "...", -1);
    ObjectNotesView = new ListView(null, null);
    outputView = ObjectNotesView;
    callASync(objectfeedurl);
}


function userNotesAPI(user) {
    var userfeedurl = 'http://notes.moodstocks.com/api/v2/user/' + user + '/note' + createHash(widget.preferenceForKey('username'), widget.preferenceForKey('password'));
    uiManager.showNotification(-1, "wait", "Getting " + user + "'s notes...", -1);
    myUserNotesView = new ListView(null, null);
    outputView = myUserNotesView;
    callASync(userfeedurl);
}

function popularNotesAPI() { //uses the LatestView container because I can't be bothered to make a seperate container
    if (!widget.preferenceForKey('password')) {
        alert('You need to login first!');
        settingsPage();
    }
    else {
        if (myLatestView == null) {
            if (loggedin == false) {
                settingsPage('silent');
                silentLogin = true;
                doLogin();
                myLatestView == null;
            }
            if (loggedin == true) {
                uiManager.showNotification(-1, "wait", "Getting some popular notes...", -1);
                myLatestView = new ListView(null, null);
                popularnotesurl = 'http://notes.moodstocks.com/api/v2/note/popular' + createHash(widget.preferenceForKey('username'), widget.preferenceForKey('password')) + '&n=20';
                outputView = myLatestView;
                callASync(popularnotesurl);
            }
        }
        else {
            uiManager.setView(myLatestView);
        }
    }
}

function createGallery() {    
    if (galleryView == null) { //if a gallery already exists just switch to it. The user can refresh if needed
        uiManager.showNotification(-1, "wait", "Creating a Gallery of Recent Images...", -1);
        galleryView = new ListView(null, null);
        galleryHolder = new ContentPanel(null, null, null, false, true);
        galleryView.addControl(galleryHolder);
        getListAsync();
        uiManager.setView(galleryView);
        uiManager.showNotification(500, "wait", "Done!");
    }
    else {
        uiManager.setView(galleryView);
    }
}

function parseJSON(response, view, insertoption) { 
    progress = 0;
    response = eval('(' + response + ')');
    for (var i in response.notes) {
        containedURL = null;
        uiManager.showNotification(500, "wait", "Parsing Notes...", progress);
        user = response.notes[i].user;
        text = response.notes[i].text;
        //scrapedURL = text.match(/(\S*\/\S*\.\S*)\./); //match URLs (not perfect but pretty good).
        scrapedURL = text.match(/((https?\:\/\/|www\.)([\-\w\.]+)+(\:\d+)?(\/([\w\/\.\-\=\?\&\_]*(\S+)?)?)?)/); //match URLs (better regexp, thanks Pierre).
        if (scrapedURL != null) {
            containedURL = scrapedURL[1];
        }
        text = text.replace(/\//gi, "/<wbr>"); //very long urls can cause overflows
        
        count = response.notes[i].count;
        epoch = response.notes[i].epoch;
        noteid = response.notes[i].id;
        objectid = response.notes[i].object;
        imgthumbnail = response.notes[i].imageurl + '/140.jpg';
        imgfullsize = response.notes[i].imageurl + '/large.jpg';
       
        noteButton = new NavigationButton(i, imgthumbnail, '<p class="username">' + user + ' said:</p><p class="notetext">' + text + '</p><p class="details">' + howLongAgoString(epoch) + '&nbsp;&nbsp;&nbsp;&nbsp;' + count + ' other notes</p>');

        if (insertoption == 'insert') { //special case where an object is recognised and other notes for the same object are inserted underneath it
            view.insertControl(noteButton, imageNote);
        }
        else {
            noteButton.addEventListener("ActionPerformed", showDetails);
            if (containedURL == null) { //only show a link if a link has been found
                secondRow = '<td colspan=2 class="tableElement"\
                onclick="uiManager.showNotification(2000, \'wait\', \'Loading Image...\', -1);document.getElementById(\'largeImageHolder' + i + '\').src = \'' + imgfullsize + '\'"/>Open full image</td>';
            }
            else {
                secondRow = '<td class="tableElement"\
                onclick="uiManager.showNotification(2000, \'wait\', \'Loading Image...\', -1);"document.getElementById(\'largeImageHolder' + i + '\').src = \'' + imgfullsize + '\'"/>Open full image</td>\
                <td class="tableElement" onclick="widget.openURL(\'' + encodeURI(containedURL) + '\')">Open link</td>';
            }
            detailsTable = '<table width="100%">\
                                <tr>\
                                    <td class="tableElement" onclick="userNotesAPI(\'' + user + '\')">Notes by this user</td>\
                                    <td class="tableElement" onclick="objectNotesAPI(\'' + objectid + '\')">Notes for this object</td>\
                                </tr>\
                                <tr>' + secondRow + '</tr>\
                            </table>\
                            <img id="largeImageHolder' + i + '" width="100%" src=""/>';

            buttonDetailName = new ContentPanel(i, null, detailsTable, true, true);
            buttonDetailName.setExpanded(false);
            view.addControl(noteButton);
            view.addControl(buttonDetailName);
        }
        progress = i / response.notes.length;
    }
}

var lastControlID = 1; //make global
function showDetails(note) {
    controlid = note.source.id;
    controlid = controlid * 2 + 1;
    currentView = uiManager.getView();
    controls = currentView.getControls();
    if (controls[controlid].isExpanded() == true) { //close if an open control is clicked
        controls[lastControlID].setExpanded(false);
        controls[controlid].setExpanded(false);
        lastControlID = controlid;
    }
    else {
        controls[lastControlID].setExpanded(false);
        controls[controlid].setExpanded(true);
    }
    lastControlID = controlid;
}

function howLongAgoString(objecttime) {
    timeDelta = dateObject.getTime() / 1000 - objecttime;
    unit = ' seconds ';
    if (timeDelta > 60) {
        timeDelta = timeDelta / 60;
        if (timeDelta < 1.5) {
            unit = ' minute ';
        }
        else {
            unit = ' minutes ';
        }
    
        if (timeDelta > 60) {
            timeDelta = timeDelta / 60;
            if (timeDelta < 1.5) {
                unit = ' hour ';
            }
            else {
                unit = ' hours ';
            }
        
            if (timeDelta > 24) {
                timeDelta = timeDelta / 24;
                if (timeDelta < 1.5) {
                    unit = ' day ';
                }
                else {
                    unit = ' days ';
                }
         
                if (timeDelta > 30) {
                    timeDelta = timeDelta / 30;
                    if (timeDelta < 1.5) {
                        unit = ' month ';
                    }
                    else {
                        unit = ' months ';
                    }                
                
                    if (timeDelta > 12) {
                        timeDelta = timeDelta / 12;
                        if (timeDelta < 1.5) {
                            unit = ' year ';
                        }
                        else {
                            unit = ' years ';
                        }
                    }
                }
            }
        }
    }
    returnString = Math.round(timeDelta) + unit + ' ago ';
    return returnString;
}

function createHash (username, password, option) {
    dateObject = new Date(); //dateObject is now defined globally but defining it again here stops nasty problems with repeated digests
    Time = dateObject.getTime();
    salt = dateObject.getMilliseconds();
    EpochTime = (Time - salt) / 1000;
    stringtohash = EpochTime + ':' + salt + ':' + password;
    md5Hash = calcMD5(stringtohash);
    if (option == 'object') {
        hashinObjectNotation = { "auth_key": username, "auth_ts": EpochTime, "auth_salt": salt, "auth_digest": md5Hash };
        return hashinObjectNotation;
    }
    else {
        hashinQueryNotation = '?auth_key=' + username + '&auth_ts=' + EpochTime + '&auth_salt=' + salt + '&auth_digest=' + md5Hash;
        return hashinQueryNotation;
    }
}

function displayPicture(img) {
    uploadImagePath = img;
    uploadView = new ListView(null, null);
    imageHeight = window.innerHeight - 80;
    safeHeight = window.innerHeight - 24;
    imageWidth = window.innerWidth - 28;
    if (window.innerHeight < window.innerWidth) { //in landscape
        //imageHolder = new ContentPanel(null, null, '<img  style="width:' + safeHeight + 'px; height:auto;" src="' + img + '"/>', false, true);
        imageHolder = new ContentPanel(null, null, '<img class="uploadImage" src="' + img + '"/>', false, true);
    }
    else { //in portrait
        //imageHolder = new ContentPanel(null, null, '<img style="width:' + imageWidth + 'px; height:auto;" src="' + img + '"/>', false, true);
        imageHolder = new ContentPanel(null, null, '<img class="uploadImage" src="' + img + '"/>', false, true);
    }
    uploadView.addControl(imageHolder);
    
    uploadButton = new FormButton(null, 'Scan Image');
    uploadButton.addEventListener("ActionPerformed", submitPicture);
    uploadView.addControl(uploadButton);

    imageNote = new TextArea(null, 'Your Note:', null, 2);
    uploadView.addControl(imageNote);

    locationButton = new ContentPanel(null, null, '<input type="checkbox" onclick="returnLocation();locationButton.setContent(\'Getting Location... (why not make a note while you wait?)\');" /> Include location?', false, false);
    uploadView.addControl(locationButton);
    
    noteUpload = new FormButton(null, 'Upload your Note');
    noteUpload.addEventListener("ActionPerformed", putNote);
    uploadView.addControl(noteUpload);
    
    uiManager.setView(uploadView);
}

var failcount = 0;

function submitPicture() {
    
    if (!widget.preferenceForKey('password')) {
        alert('You need to login first!');
        settingsPage();
    }
    else {
        uiManager.showNotification(-1, "wait", "Scanning Image...", -1);
        parameters = createHash(widget.preferenceForKey('username'), widget.preferenceForKey('password'), 'object');
        
        rawURL = 'http://notes.moodstocks.com/api/v2/note/';

        APIBridge.fileUpload(
	    'file',
	    uploadImagePath,
	    rawURL,
	    parameters,
	    function(res) {
	        uiManager.showNotification(500, "info", "Done!", null);
	        noteinfo = res.responseText;
	        handleResponse(noteinfo);
	    },
	    function(res) {
	        if (res.statusText.search('-4') != -1) {
	            uiManager.showNotification(1, "info", "Oh no!", null);
	            alert("I'm really sorry but something's gone wrong.\nMost likely the camera on your phone takes pictures that are so good they're too big to upload.\nAt the moment I'm afraid the only solution is to open the file in the gallery and reduce its resolution.");
	        }
	        else {
	            //uiManager.showNotification(1, "info", "Oh no!", null);
	            /*while (failcount < 3) {
	                failcount++;
	                submitPicture();
	            }
	            if (failcount == 3) {
	                alert(res);
	            }*/
	        }
	    }
    );
    }
}

function handleResponse(noteinfo) {
    noteinfo = eval('(' + noteinfo + ')');
    objectid = noteinfo.object;
    noteid = noteinfo.note;
    recognisedNoteID = noteid; //this variable is globally available so that the putNote() function can work properly
    found = noteinfo.found;
    if (found == false) {
        alert('Moodstocks hasn\'t seen your object before, make a note!');
    }
    else {
        alert('Moodstocks recognises that object, check the other notes and then add your own!');
        uiManager.showNotification(-1, "wait", "Getting notes for object #" + objectid + "...", -1);
        insertoption = 'insert'; //set callASync to insert controls in the fileUploadView
        outputView = uploadView;
        var objectfeedurl = 'http://notes.moodstocks.com/api/v2/object/' + objectid + createHash(widget.preferenceForKey('username'), widget.preferenceForKey('password'));
        callASync(objectfeedurl);        
    }    
}

var putAjax = null; //make it global so I can use it in the callback

function putNote() {
    
    if (recognisedNoteID == null) {
        alert('You need to scan an object before you can add a note to it!');
    }
    else {
        uiManager.showNotification(-1, "wait", "Uploading your note...", -1);
        //PUT a note up
        noteText = imageNote.getText();        
          
        putNoteURL = 'http://notes.moodstocks.com/api/v2/note/' + recognisedNoteID + createHash(widget.preferenceForKey('username'), widget.preferenceForKey('password'));

        if (longitude == parseFloat(longitude) && latitude == parseFloat(latitude)) { //checks that latitude and longitude are numbers
            putNoteURL = putNoteURL + '&latitude=' + latitude + '&longitude=' + longitude;
        }
        
        try {
            putAjax = new Ajax();
            putAjax.onreadystatechange = putCallback;
            putAjax.open('PUT', putNoteURL, true);
            putAjax.send(noteText);
        }
        catch (e) {
            uiManager.showNotification(500, "wait", "Sorry, I can't connect. Please check that you are connected to the internet and try again", null);
        }
    }
}

function putCallback() {
    if (putAjax.readyState != 4) {
    }

    if (putAjax.readyState == 4) {
        try {
            var result = putAjax.responseText;
            if (!result) {
            }
            else {
                uiManager.showNotification(500, "wait", "Done!");
                //alert('callback successful');
                //alert(result);
            }
        }
        catch (e) {
        }
    }
}

//Displays the About view
function showAboutView() {
    aboutLabel.setText("This Widget's WRTKit components are licensed from Nokia &copy 2011");
    aboutView = new ListView(null, 'Moodstocks for Nokia');
    aboutcontent = '<p>Developed for Moodstocks by Thomas Forth.</p>\
                   <p>See www.tomforth.co.uk/moodstocks for more info, updates and contact details.</p>\
                   <p>See www.moodstocks.com for apps for other platforms and the web interface.</p>\
                   <p>Please contact me if you have any feedback, bug reports or even just for a chat. I\'m quite friendly.</p>\
                   <p>Oh and don\'t blame me if this app crashes your phone or does anything bad, just uninstall it.\
                   I\'ve tested it as best I can but I\'m only one guy so don\'t sue me or anything daft like that.</p>\
                   <p>Finally, thanks for trying my app. I like building things but it\'s so much cooler when other people use them. Thank you!</p>\
                   <p>Tom</p>';                   
    aboutContentPanel = new ContentPanel(null, null, aboutcontent, false, true);
    aboutView.addControl(aboutContentPanel);
    uiManager.setView(aboutView);
}

// Callback for when menu items are selected.
function menuItemSelected(id) {
    switch (id) {
        case 0:
            showAboutView();
            break;
        case 1:
            settingsPage();
            break;
        case 2:
            refresh();
            break;
        case 3:
            checkForUpdate();
            break;
    }
}

function checkForUpdate() {
    try {
        updateAjax = new Ajax();
        updateAjax.onreadystatechange = updateCallback;
        updateAjax.open("GET", 'http://www.tomforth.co.uk/moodstocks/moodstocksversion.txt#' + dateObject.getMilliseconds(), true); //the milliseconds bit is useless but stops the browser caching the request
        updateAjax.send(null);
    }
    catch (err) { //there's a strange thing in the wrt. If you don't allow a network connection very quickly, it doesn't work. This tries again and fixes that problem
        uiManager.showNotification(500, "wait", "Sorry, I can't connect. Please check that you are connected to the internet and try again", null);
    }
}

function updateCallback() {
    if (updateAjax.readyState != 4) {
    }
    if (updateAjax.readyState == 4) {
        webversion = updateAjax.responseText;
        if (version == webversion) {
            alert('Your version is ' + version + '\nThe most up-to-date version is ' + webversion + '\nNo update is available.');
        }
        else {
            alert('Your version is ' + version + '\nThe most up-to-date version is ' + webversion + '\nAn update is available at www.tomforth.co.uk/moodstocks.');
        }
    } 
} 