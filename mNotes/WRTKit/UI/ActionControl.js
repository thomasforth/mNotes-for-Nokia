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
// The ActionControl class is an abstract base class for action controls like
// buttons. Don't use ActionControl directly.

// Constructor.
function ActionControl(id, caption) {
    if (id != UI_NO_INIT_ID) {
        this.init(id, caption);
    }
}

// ActionControl inherits from Control.
ActionControl.prototype = new Control(UI_NO_INIT_ID);

// Reference to the button element.
ActionControl.prototype.buttonElement = null;

// Reference to the link element.
ActionControl.prototype.linkElement = null;

// Enabled status.
ActionControl.prototype.enabled = false;

// Initializer - called from constructor.
ActionControl.prototype.init = function(id, caption) {
    uiLogger.debug("ActionControl.init(" + id + ", " + caption + ")");
    
    // call superclass initializer
    Control.prototype.init.call(this, id, caption);
    
    // the control defaults to enabled
    this.enabled = true;
}

// Common event listeners hookup function called from subclasses.
ActionControl.prototype.bindActionControlListeners = function() {
    var self = this;
    this.linkElement.addEventListener("focus", function() { self.focusStateChanged(true); }, false);
    this.linkElement.addEventListener("blur", function() { self.focusStateChanged(false); }, false);
    this.buttonElement.addEventListener("mouseover", function() { self.hoverStateChanged(true); }, false);
    this.buttonElement.addEventListener("mouseout", function() { self.hoverStateChanged(false); }, false);
    this.buttonElement.addEventListener("mousedown", function(event) {
                                                       self.controlClicked();
                                                       event.stopPropagation();
                                                       event.preventDefault();
                                                   }, true);
    this.buttonElement.addEventListener("keydown", function(event) {
                                                    // center and enter trigger the action
                                                    if (event.keyCode == 0 || event.keyCode == 13) {
                                                        self.controlClicked();
                                                        event.stopPropagation();
                                                        event.preventDefault();
                                                    }
                                                 }, true);
}

// Returns the enabled state.
ActionControl.prototype.isEnabled = function() {
    return this.enabled;
}

// Sets the enabled state.
ActionControl.prototype.setEnabled = function(enabled) {
    uiLogger.debug("ActionControl.setEnabled(" + enabled + ")");
    // switch the state
    this.enabled = enabled;
}

// Sets the focused state for the control.
// Note: This may not always succeed.
ActionControl.prototype.setFocused = function(focused) {
    uiLogger.debug("ActionControl.setFocused(" + focused + ")");
    if (this.enabled) {
        if (focused) {
            this.linkElement.focus();
        } else {
            this.linkElement.blur();
        }
    }
}

// Callback for clicks.
ActionControl.prototype.controlClicked = function() {
    uiLogger.debug("ActionControl.controlClicked()");
    
    // if we're enabled then a click results in an action performed event
    if (this.enabled) {
        // focus when clicked
        if (!this.focused) {
            this.linkElement.focus();
        }
        
        // notify event listeners
        this.actionPerformed();
    }
}

// Callback for action performed events.
ActionControl.prototype.actionPerformed = function() {
    uiLogger.debug("ActionControl.actionPerformed()");
    // notify event listeners
    this.fireEvent(this.createEvent("ActionPerformed", null));
}
