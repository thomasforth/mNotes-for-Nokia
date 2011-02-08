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
// The Label class implements a control that displays textual content.

// Constructor.
function Label(id, caption, text) {
    if (id != UI_NO_INIT_ID) {
        this.init(id, caption, text);
    }
}

// Label inherits from Control.
Label.prototype = new Control(UI_NO_INIT_ID);

// Content element for label text.
Label.prototype.contentElement = null;

// Initializer - called from constructor.
Label.prototype.init = function(id, caption, text) {
    uiLogger.debug("Label.init(" + id + ", " + caption + ", " + text + ")");
    
    // call superclass initializer
    Control.prototype.init.call(this, id, caption);
    
    // create content element
    this.contentElement = document.createElement("div");
    this.controlElement.appendChild(this.contentElement);
    
    // set the text
    this.setText(text);
}

// Returns the enabled state for the control.
Label.prototype.isEnabled = function() {
    return true;
}

// Returns the focusable state for the control.
Label.prototype.isFocusable = function() {
    return false;
}

// Returns the control text.
Label.prototype.getText = function() {
    return this.contentElement.innerHTML;
}

// Sets the text for the control.
Label.prototype.setText = function(text) {
    uiLogger.debug("Label.setText(" + text + ")");
    this.contentElement.innerHTML = (text == null) ? "" : text;
    this.updateStyleFromState();
}

// Updates the style of the control to reflects the state of the control.
Label.prototype.updateStyleFromState = function() {
    uiLogger.debug("Label.updateStyleFromState()");
    
    // set element class names
    this.setClassName(this.rootElement, "Control");
    this.setClassName(this.assemblyElement, "ControlAssembly ControlAssemblyNormal");
    this.setClassName(this.captionElement, "ControlCaption ControlCaptionNormal");
    this.setClassName(this.controlElement, "ControlElement");
    this.setClassName(this.contentElement, "LabelText");
}
