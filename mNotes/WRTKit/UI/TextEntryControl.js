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
// The TextEntryControl class is an abstract base class for the single and multi-
// line text entry controls TextField and TextArea. Don't use TextEntryControl
// directly.

// Constructor.
function TextEntryControl(id, caption) {
    if (id != UI_NO_INIT_ID) {
        this.init(id, caption);
    }
}

// TextEntryControl inherits from Control.
TextEntryControl.prototype = new Control(UI_NO_INIT_ID);

// Reference to the peer HTML element.
TextEntryControl.prototype.peerElement = null;

// Initializer - called from constructor.
TextEntryControl.prototype.init = function(id, caption) {
    uiLogger.debug("TextEntryControl.init(" + id + ", " + caption + ")");
    
    // call superclass initializer
    Control.prototype.init.call(this, id, caption);
}

// Common event listeners hookup function called from subclasses.
TextEntryControl.prototype.bindTextEntryControlListeners = function() {
    var self = this;
    this.peerElement.addEventListener("focus", function() { self.focusStateChanged(true); }, false);
    this.peerElement.addEventListener("blur", function() { self.focusStateChanged(false); }, false);
    this.peerElement.addEventListener("mouseover", function() { self.hoverStateChanged(true); }, false);
    this.peerElement.addEventListener("mouseout", function() { self.hoverStateChanged(false); }, false);
    this.peerElement.addEventListener("change", function() { self.valueChanged(); }, false);
}

// Returns the enabled state.
// Override this in subclasses as required to implement the state change.
TextEntryControl.prototype.isEnabled = function() {
    return !this.peerElement.readOnly;
}

// Sets the enabled state.
// Override this in subclasses as required to implement the state change.
TextEntryControl.prototype.setEnabled = function(enabled) {
    uiLogger.debug("TextEntryControl.setEnabled(" + enabled + ")");
    this.peerElement.readOnly = !enabled;
    // update the style
    this.updateStyleFromState();
}

// Returns the control text.
TextEntryControl.prototype.getText = function() {
    return this.peerElement.value;
}

// Sets the text for the control.
TextEntryControl.prototype.setText = function(text) {
    this.peerElement.value = text;
}

// Returns the focusable state for the control.
TextEntryControl.prototype.isFocusable = function() {
    // text entry controls are always focusable
    return true;
}

// Sets the focused state for the control.
// Note: This may not always succeed.
TextEntryControl.prototype.setFocused = function(focused) {
    uiLogger.debug("TextEntryControl.setFocused(" + focused + ")");
    if (focused) {
        this.peerElement.focus();
    } else {
        this.peerElement.blur();
    }
}

// Callback for value change events.
TextEntryControl.prototype.valueChanged = function() {
    uiLogger.debug("TextEntryControl.valueChanged()");
    // notify event listeners
    this.fireEvent(this.createEvent("ValueChanged", this.peerElement.value));
}
