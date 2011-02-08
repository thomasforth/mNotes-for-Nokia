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
// The TextArea class implements a multi line text entry control.

// Constructor.
function TextArea(id, caption, value, rows) {
    if (id != UI_NO_INIT_ID) {
        this.init(id, caption, value, rows);
    }
}

// TextArea inherits from TextEntryControl.
TextArea.prototype = new TextEntryControl(UI_NO_INIT_ID);

// Initializer - called from constructor.
TextArea.prototype.init = function(id, caption, value, rows) {
    uiLogger.debug("TextArea.init(" + id + ", " + caption + ", " + value + ", " + rows + ")");
    
    // call superclass initializer
    TextEntryControl.prototype.init.call(this, id, caption);
    
    // create the peer element
    this.peerElement = document.createElement("textarea");
    // default rowcount is 3 if not defined
    // width always comes from style but is a required attribute
    this.peerElement.rows = (rows != null) ? rows : 3;
    this.peerElement.cols = 20;
    this.controlElement.appendChild(this.peerElement);
    
    // set the value
    this.peerElement.value = (value == null) ? "" : value;
    
    // bind event listeners
    this.bindTextEntryControlListeners();
    
    // update the style
    this.updateStyleFromState();
}

// Updates the style of the control to reflects the state of the control.
TextArea.prototype.updateStyleFromState = function() {
    uiLogger.debug("TextArea.updateStyleFromState()");
    
    // determine the state name
    var stateName = this.getStyleStateName();
    
    // set element class names
    this.setClassName(this.rootElement, "Control");
    this.setClassName(this.controlElement, "ControlElement");
    this.setClassName(this.assemblyElement, "ControlAssembly ControlAssembly" + stateName);
    this.setClassName(this.captionElement, "ControlCaption ControlCaption" + stateName);
    
    // set peer element class names
    var peerStateName = this.isEnabled() ? stateName : "Disabled";
    this.setClassName(this.peerElement, "TextArea TextArea" + stateName);
}
