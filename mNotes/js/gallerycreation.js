// mediamanagement-sample.js
// 
// In this sample the media objects and meta-data from the S60 media
// Gallery will be listed;

// Declare the service object 
var so;

// imgid for callback1 function
var imgid_callback1;

// Called from onload()
function setup()
{
  try {
    so = device.getServiceObject("Service.MediaManagement", "IDataSource");
    console.info("setup: so: %s", so);
  }
  catch(e) {
    alert('<setup> ' +e);
  }
}

// Get List Async
// This method retrieves a list of media objects and meta-data from the S60 media Gallery.
// In order to test this method make sure that there are media objects in the media Gallery. 
function getListAsync() 
{
  setup();
  var filter = { FileType: "Image"};
  var sort = { Key: "FileDate", Order: "Descending"};
  var criteria = { Type: "FileInfo", Sort: sort, Filter: filter };

  try {
      // Media Management supports asynchronous call
      var result = so.IDataSource.GetList(criteria, callback);
  }
  catch (e) {
      alert("getListAsync: " + e);
  } 
}

// This is the asynchronous callback handler 
function callback(transId, eventCode, result)
{
  console.info("callback: transId: %d  eventCode: %d result.ErrorCode: %d", transId, eventCode, result.ErrorCode);
  showIterableList(result.ReturnValue, 30);
  drawGallery();
}

var counter = 0;
// Build the message by reading a iteratorable list in a recursive manner
function showIterableList(iterator, numberofrecords) {
    var iteratorcount = 0;
    var msg = "";
    try {
        iterator.reset();
        counter = 0;
        var item;
        while ((item = iterator.getNext()) != undefined && iteratorcount < numberofrecords) {
            msg += showObject(item);
            iteratorcount++;
        }
    }
    catch (e) {
        alert('<showIterableList> ' + e);
    }
    return msg;
}

var filepatharray = []; //define an array to hold filepaths
var filesizearray = [];

// Build the message by reading a JS object in a recursive manner
function showObject(obj) {
    //var txt = "";
    try {
        if (typeof obj != 'object')
            return "" + obj + '<BR/>';
        else {
            for (var key in obj) {
                //txt += key + ":";
                if (key == 'FileNameAndPath') { //save FileNameAndPath to an array
                    filepatharray[counter] = obj[key];
                }
                if (key == 'FileSize') {
                    filesizearray[counter] = obj[key];
                }
                //txt += showObject(obj[key]);

            }
            //txt += '<BR/>';
        }
        counter++;
    }
    catch (e) {
        alert("showObject: " + e);
    }
    //return txt;

}

function drawGallery() {
    var galleryLayout = "";
    var safefilepath = "";
    var thumbfilepath = "";
    var linkefilepath = "";
    var displayed = 0;
    if (window.innerHeight < window.innerWidth) { //in landscape
        imgWidth = 25;
        imgHeight = window.innerHeight/3;
    }
    else {//in portrait
        imgHeight = window.innerHeight/4;
        imgWidth = 33.3;
    }

    var ready = 1; //this variable stops the APIBridge being called again before it's returned a value.
    //alert(filepatharray.length);
    for (var i in filepatharray) { //the ordering by date is old to new so that's why I flipped it
        if (displayed < 24 && ready == 1 ) { //whatsapp files don't work so I skip them. also skip non-jpeg
            ready = 0;
            if (filesizearray[i] > 1000) { // && filepatharray[i].search(/ /) != -1  //for the moment I can't deal with spaces in the filepath so I just skip 'em
                safefilepath = filepatharray[i]; //I'll have to do something to fix paths with spaces in
                safefilepath = safefilepath.replace("E:", "e:");
                safefilepath = safefilepath.replace("D:", "d:");
                safefilepath = safefilepath.replace("C:", "c:");
                thumbfilepath = safefilepath.replace(/\\/gi, "\\"); //this replaces the / in usual dirs with \\ which works with apibridge
                linkfilepath = safefilepath.replace(/\\/gi, "\\\\"); //more padding of backslashes to keep javascript happy

                APIBridge.resizeImg(safefilepath, 180, 180, false,
                    function(smallImg) {
                        layoutElement = '<img src="' + smallImg + '" width="' + imgWidth + '%" onclick="displayPicture(\'' + linkfilepath + '\')"/>';
                        galleryLayout = galleryLayout + layoutElement;
                        ready = 1; //the APIBridge is now ready to accept another request.
                    },
                    function(err) {
                        alert(err);
                        alert('you might need to install the API Bridge or try again');
                        ready = 1;
                    }
                );

                // the getThumbnail call is perhaps slightly quicker but lower quality and won't crop to square
                //alert('gallerylength = ' + galleryLayout.length);

                /*
                APIBridge.getThumbnail(thumbfilepath,
                function(smallImg) {
                //imageHolder.setContent('<img width="100%" src="' + smallImg + '"/>');
                safefilepath = safefilepath.replace(/\\/gi, "\\\\"); //more padding of backslashes to keep javascript happy
                layoutElement = '<img src="' + smallImg + '" height="' + imgHeight + 'px" width="' + imgWidth + '%" onclick="displayPicture(\'' + linkfilepath + '\')"/>';
                alert(layoutElement);
                galleryLayout = galleryLayout + layoutElement;
                ready = 1; //the APIBridge is now ready to accept another request.

                },
                function(err) {
                alert(err);
                alert('you might need to install the API Bridge or try again');
                }
                );
                */
                displayed++;

            }
            else {
                ready = 1;
            }
        }
    }
    if (galleryLayout == "") { //sometimes a gallery isn't created the first time the script runs. I can't find out why, so I'll just run it again.
        uiManager.showNotification(-1, "wait", "Creating a Gallery of Recent Images...", -1);
        getListAsync();
    }
    else {
        galleryHolder.setContent(galleryLayout);
        uiManager.showNotification(500, "wait", "Done!", -1);
    }
}