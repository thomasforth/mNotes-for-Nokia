function takePhoto() {
    APIBridge.newFileService(
	    "Image",
	    function(src) {
	        displayPicture(src);
	    },
	    function(res) {
	        alert(res);
	    }
    );
}
