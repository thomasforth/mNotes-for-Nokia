/*
© Copyright 2008 Nokia Corporation. All rights reserved.

IMPORTANT:  The Nokia software ("WRTKit and Example Widget files") is supplied to you by Nokia
Corporation (“Nokia”) in consideration of your agreement to the following terms. Your use, installation
and/or redistribution of the WRTKit and Example Widget files constitutes acceptance of these terms. If
you do not agree with these terms, please do not use, install, or redistribute the WRTKit and Example
Widget files.

In consideration of your agreement to abide by the following terms, and subject to these terms, Nokia
grants you a personal, non-exclusive license, under Nokia’s copyrights in the WRTKit and Example
Widget files, to use, reproduce, and redistribute the WRTKit and Example files, in text form (for HTML,
CSS, or JavaScript files) or binary form (for associated images), for the sole purpose of creating S60
Widgets.

If you redistribute the WRTKit and Example files, you must retain this entire notice in all such
redistributions of the WRTKit and Example files.

You may not use the name, trademarks, service marks or logos of Nokia to endorse or promote products
that include the WRTKit and Example files without the prior written explicit agreement with Nokia.
Except as expressly stated in this notice, no other rights or licenses, express or implied, are granted by
Nokia herein, including but not limited to any patent rights that may be infringed by your products that
incorporate the WRTKit and Example files or by other works in which the WRTKit and Example files
may be incorporated.

The WRTKit and Example files are provided on an "AS IS" basis.  NOKIA MAKES NO
WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION THE IMPLIED
WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE, REGARDING THE EXAMPLES OR ITS USE AND OPERATION
ALONE OR IN COMBINATION WITH YOUR PRODUCTS.

IN NO EVENT SHALL NOKIA BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) ARISING IN ANY WAY OUT OF THE USE, REPRODUCTION, AND/OR
DISTRIBUTION OF THE EXAMPLES, HOWEVER CAUSED AND WHETHER UNDER THEORY
OF CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHERWISE,
EVEN IF NOKIA HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

///////////////////////////////////////////////////////////////////////////////
// The NavigationButton class implements a button control for use in
// navigational contexts in menu-style UIs.

// Constructor.
function NavigationButton(id, image, text) {
    if (id != UI_NO_INIT_ID) {
        this.init(id, image, text);
    }
}

// NavigationButton inherits from ActionControl.
NavigationButton.prototype = new ActionControl(UI_NO_INIT_ID);

// Button table element.
NavigationButton.prototype.tableElement = null;

// Button table row element.
NavigationButton.prototype.tableRowElement = null;

// Button table left cell element.
NavigationButton.prototype.tableLeftCellElement = null;

// Button table right cell element.
NavigationButton.prototype.tableRightCellElement = null;

// Button image element.
NavigationButton.prototype.imageElement = null;

// Button link element.
NavigationButton.prototype.linkElement = null;

// Button text element.
NavigationButton.prototype.textElement = null;

// Initializer - called from constructor.
NavigationButton.prototype.init = function(id, image, text) {
    uiLogger.debug("NavigationButton.init(" + id + ", " + image + ", " + text + ")");
    
    // call superclass initializer
    ActionControl.prototype.init.call(this, id, null);
    
    // remove caption element
    this.assemblyElement.removeChild(this.captionElement);
    
    // construct the button
    this.buttonElement = document.createElement("div");
    this.tableElement = document.createElement("table");
    this.tableRowElement = document.createElement("tr");
    this.tableLeftCellElement = document.createElement("td");
    this.tableRightCellElement = document.createElement("td");
    this.imageElement = null;
    this.linkElement = document.createElement("a");
    this.linkElement.href = "JavaScript:void(0)";
    this.textElement = document.createElement("span");
    this.tableElement.appendChild(this.tableRowElement);
    this.tableRowElement.appendChild(this.tableLeftCellElement);
    this.tableRowElement.appendChild(this.tableRightCellElement);
    this.tableRightCellElement.appendChild(this.linkElement);
    this.linkElement.appendChild(this.textElement);
    this.buttonElement.appendChild(this.tableElement);
    this.controlElement.appendChild(this.buttonElement);
    
    // set the image and text
    this.setImage(image);
    this.setText(text);
    
    // bind event listeners
    this.bindActionControlListeners();
    
    // update the style
    this.updateStyleFromState();
}

// Sets the enabled state.
NavigationButton.prototype.setEnabled = function(enabled) {
    uiLogger.debug("NavigationButton.setEnabled(" + enabled + ")");
    
    // bail out early if there is no change in state
    if (this.enabled == enabled) {
        return;
    }
    
    // set the enabled state
    this.enabled = enabled;
    
    if (this.enabled) {
        // diabled -> enabled
        this.tableRightCellElement.removeChild(this.textElement);
        this.tableRightCellElement.appendChild(this.linkElement);
        this.linkElement.appendChild(this.textElement);
    } else {
        // enabled -> diabled
        this.linkElement.removeChild(this.textElement);
        this.tableRightCellElement.removeChild(this.linkElement);
        this.tableRightCellElement.appendChild(this.textElement);
    }
    
    // update the style
    this.updateStyleFromState();
}

// Returns the button image (URL); null if none.
NavigationButton.prototype.getImage = function() {
    return (this.imageElement != null) ? this.imageElement.src : null;
}

// Sets the button image (URL); null if none.
NavigationButton.prototype.setImage = function(image) {
    uiLogger.debug("NavigationButton.setImage(" + image + ")");
    
    if (image == null) {
        // remove image - if any
        if (this.imageElement != null) {
            this.tableLeftCellElement.removeChild(this.imageElement);
        }
    } else {
        // default to not append image element
        var append = false;
        
        // create image element if one doesn't exist
        if (this.imageElement == null) {
            this.imageElement = document.createElement("img");
            this.imageElement.setAttribute("alt", "");
            append = true;
        }
        
        // set image source URL
        this.imageElement.src = image;
        
        // append the image element to the left cell?
        if (append) {
            this.tableLeftCellElement.appendChild(this.imageElement);
        }
    }
}

// Returns the button text.
NavigationButton.prototype.getText = function() {
    return this.textElement.innerHTML;
}

// Sets the button text.
NavigationButton.prototype.setText = function(text) {
    uiLogger.debug("NavigationButton.setText(" + text + ")");
    this.textElement.innerHTML = (text == null) ? "" : text;;
}

// Updates the style of the control to reflects the state of the control.
NavigationButton.prototype.updateStyleFromState = function() {
    uiLogger.debug("NavigationButton.updateStyleFromState()");
    
    // determine the state name
    var stateName = this.getStyleStateName();
    
    // set root element class name
    this.setClassName(this.rootElement, "Control");
    
    // set the control assembly class names
    this.setClassName(this.assemblyElement, "ControlAssembly ControlAssembly" + stateName);
    
    // control element
    this.setClassName(this.controlElement, "ControlElement NavigationButtonControlElement");
    
    // set the button table class names
    this.setClassName(this.buttonElement, "NavigationButton");
    this.setClassName(this.tableElement, "NavigationButtonTable");
    this.setClassName(this.tableRowElement, "NavigationButtonRow");
    this.setClassName(this.tableLeftCellElement, "NavigationButtonImageCell");
    this.setClassName(this.tableRightCellElement, "NavigationButtonTextCell");
    
    // set image class names
    if (this.imageElement) {
        this.setClassName(this.imageElement, "NavigationButtonImage");
    }
    
    // set the button text class name
    this.setClassName(this.textElement, "NavigationButtonText NavigationButtonText" + stateName);
}
