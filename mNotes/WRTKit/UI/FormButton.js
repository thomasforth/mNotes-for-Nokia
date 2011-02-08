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
// The FormButton class implements a button control for use in form-style UIs.

// Constructor.
function FormButton(id, text) {
    if (id != UI_NO_INIT_ID) {
        this.init(id, text);
    }
}

// FormButton inherits from ActionControl.
FormButton.prototype = new ActionControl(UI_NO_INIT_ID);

// Button table element.
FormButton.prototype.tableElement = null;

// Button table row element.
FormButton.prototype.tableRowElement = null;

// Button table left cell element.
FormButton.prototype.tableLeftCellElement = null;

// Button table center cell element.
FormButton.prototype.tableCenterCellElement = null;

// Button text element.
FormButton.prototype.textElement = null;

// Button table right cell element.
FormButton.prototype.tableRightCellElement = null;

// Initializer - called from constructor.
FormButton.prototype.init = function(id, text) {
    uiLogger.debug("FormButton.init(" + id + ", " + text + ")");
    
    // call superclass initializer
    ActionControl.prototype.init.call(this, id, null);
    
    // remove caption element
    this.assemblyElement.removeChild(this.captionElement);
    
    // construct the button
    this.buttonElement = document.createElement("div");
    this.tableElement = document.createElement("table");
    this.tableRowElement = document.createElement("tr");
    this.tableLeftCellElement = document.createElement("td");
    this.tableCenterCellElement = document.createElement("td");
    this.linkElement = document.createElement("a");
    this.linkElement.href = "JavaScript:void(0)";
    this.textElement = document.createElement("span");
    this.tableRightCellElement = document.createElement("td");
    this.tableElement.appendChild(this.tableRowElement);
    this.tableRowElement.appendChild(this.tableLeftCellElement);
    this.tableRowElement.appendChild(this.tableCenterCellElement);
    this.tableCenterCellElement.appendChild(this.linkElement);
    this.linkElement.appendChild(this.textElement);
    this.tableRowElement.appendChild(this.tableRightCellElement);
    this.buttonElement.appendChild(this.tableElement);
    this.controlElement.appendChild(this.buttonElement);
    
    // set the text
    this.setText(text);
    
    // bind event listeners
    this.bindActionControlListeners();
    
    // update the style
    this.updateStyleFromState();
}

// Sets the enabled state.
FormButton.prototype.setEnabled = function(enabled) {
    uiLogger.debug("FormButton.setEnabled(" + enabled + ")");
    
    // bail out early if there is no change in state
    if (this.enabled == enabled) {
        return;
    }
    
    // set the enabled state
    this.enabled = enabled;
    
    if (this.enabled) {
        // diabled -> enabled
        this.tableCenterCellElement.removeChild(this.textElement);
        this.tableCenterCellElement.appendChild(this.linkElement);
        this.linkElement.appendChild(this.textElement);
    } else {
        // enabled -> diabled
        this.linkElement.removeChild(this.textElement);
        this.tableCenterCellElement.removeChild(this.linkElement);
        this.tableCenterCellElement.appendChild(this.textElement);
    }
    
    // update the style
    this.updateStyleFromState();
}

// Returns the button text.
FormButton.prototype.getText = function() {
    return this.textElement.innerHTML;
}

// Sets the button text.
FormButton.prototype.setText = function(text) {
    uiLogger.debug("FormButton.setText(" + text + ")");
    this.textElement.innerHTML = (text == null) ? "" : text;;
}

// Updates the style of the control to reflects the state of the control.
FormButton.prototype.updateStyleFromState = function() {
    uiLogger.debug("FormButton.updateStyleFromState()");
    
    // determine the state name
    var stateName = this.getStyleStateName();
    
    // set root element class name
    this.setClassName(this.rootElement, "Control");
    
    // set the control assembly class names
    this.setClassName(this.assemblyElement, "ControlAssembly ControlAssemblyNormal");
    
    // control element
    this.setClassName(this.controlElement, "ControlElement FormButtonControlElement");
    
    // set the button table class names
    this.setClassName(this.buttonElement, "FormButton");
    this.setClassName(this.tableElement, "FormButtonTable");
    this.setClassName(this.tableRowElement, "FormButtonRow");
    this.setClassName(this.tableLeftCellElement, "FormButtonLeftCell FormButtonLeftCell" + stateName);
    this.setClassName(this.tableCenterCellElement, "FormButtonCenterCell FormButtonLeftCell" + stateName);
    this.setClassName(this.tableRightCellElement, "FormButtonRightCell FormButtonLeftCell" + stateName);
    
    // set the button text class name
    this.setClassName(this.textElement, "FormButtonText FormButtonText" + stateName);
}
