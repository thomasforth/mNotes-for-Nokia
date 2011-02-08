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
// The Control class is an abstract base class for all user interface controls.

// Constructor.
function Control(id, caption) {
    if (id != UI_NO_INIT_ID) {
        this.init(id, caption);
    }
}

// Control inherits from UIElement.
Control.prototype = new UIElement(UI_NO_INIT_ID);

// The view that control belongs to.
Control.prototype.view = null;

// Is the control focused?
Control.prototype.focused = false;

// Is the pointer over this control?
Control.prototype.hovering = false;

// The element hierarchy in a control is as follows:
//
// rootElement
//     assemblyElement
//         captionElement
//         controlElement
//
// The assembly element groups the portion of a control that typically handle
// the visual effects for focus and hover states. Having a separate root and
// assembly elements allows other elements to be added to a control without
// them being affected by the CSS rules of the assembly element.

// The assembly element of this control.
Control.prototype.assemblyElement = null;

// The caption of this control; null if none.
Control.prototype.caption = null;

// The caption element of this control.
Control.prototype.captionElement = null;

// The control element of this control.
Control.prototype.controlElement = null;

// Initializer - called from constructor.
Control.prototype.init = function(id, caption) {
    uiLogger.debug("Control.init(" + id + ", " + caption + ")");
    
    // call superclass initializer
    UIElement.prototype.init.call(this, id);
    
    // create assembly, caption and control elements
    this.assemblyElement = document.createElement("div");
    this.captionElement = document.createElement("div");
    this.assemblyElement.appendChild(this.captionElement);
    this.controlElement = document.createElement("div");
    this.assemblyElement.appendChild(this.controlElement);
    this.rootElement.appendChild(this.assemblyElement);
    
    // set the caption
    // style is not updated because the subclass will update the style later
    // when it has completely initialized the component
    this.setCaption(caption, true);
}

// Returns the caption; null if none.
Control.prototype.getCaption = function() {
    return this.caption;
}

// Sets the caption; null if none.
Control.prototype.setCaption = function(caption, noStyleUpdate) {
    uiLogger.debug("Control.setCaption(" + caption + ")");
    
    // set the display style
    this.captionElement.style.display = (caption == null) ? "none" : "block";
    
    // set the caption
    this.caption = caption;
    this.captionElement.innerHTML = (caption == null) ? "" : caption;
    
    // update style
    if (!noStyleUpdate) {
        this.updateStyleFromState();
    }
}

// Returns the enabled state.
// Override this in subclasses as required to implement the state change.
Control.prototype.isEnabled = function() {
    return false;
}

// Sets the enabled state.
// Override this in subclasses as required to implement the state change.
Control.prototype.setEnabled = function(enabled) {
    uiLogger.debug("Control.setEnabled(" + enabled + ")");
}

// Returns the focusable state for the control.
// Defaults focusable if enabled - override this in subclasses as required.
Control.prototype.isFocusable = function() {
    return this.isEnabled();
}

// Returns the focused state for the control.
Control.prototype.isFocused = function() {
    return this.focused;
}

// Sets the focused state for the control.
// Note: This may not always succeed.
// Override this in subclasses as required to implement the state change.
Control.prototype.setFocused = function(focused) {
    uiLogger.debug("Control.setFocused(" + focused + ")");
    // note that this.focused gets set as a result of focusStateChanged() being called
    // rather than setting it explicitly here
}

// Called when the focus state has changed for this control.
Control.prototype.focusStateChanged = function(focused) {
    uiLogger.debug("Control.focusStateChanged(" + focused + ")");
    if (this.focused != focused) {
        this.focused = focused;
        
        // let the view know about the focus change
        if (this.view != null) {
            this.view.focusedControlChanged(focused ? this : null);
        }
        
        // update the style from the current state
        this.updateStyleFromState();
        
        // notify event listeners
        this.fireEvent(this.createEvent("FocusStateChanged", focused));
    }
}

// Called when the hover state has changed for this control.
Control.prototype.hoverStateChanged = function(hovering) {
    uiLogger.debug("Control.hoverStateChanged(" + hovering + ")");
    if (this.hovering != hovering) {
        this.hovering = hovering;
        
        // update the style from the current state
        this.updateStyleFromState();
        
        // notify event listeners
        this.fireEvent(this.createEvent("HoverStateChanged", hovering));
    }
}

// Helper method that returns the state name for the current state.
Control.prototype.getStyleStateName = function() {
    var focusable = this.isFocusable();
    if (focusable && this.focused) {
        return "Focus";
    } else if (focusable && this.hovering) {
        return "Hover";
    } else if (!this.isEnabled()) {
        return "Disabled";
    } else {
        return "Normal";
    }
}

// Resets the state tracking for focus and hover.
// Override this in subclasses as required to implement the state reset.
Control.prototype.resetFocusState = function() {
    uiLogger.debug("Control.resetFocusState()");
    this.hovering = false;
    this.focused = false;
    this.updateStyleFromState();
}

// Helper function that sets a classname for an element.
// Only sets the class name if it actually is different from the current value.
Control.prototype.setClassName = function(element, className) {
    if (element.className != className) {
        element.className = className;
    }
}

// Updates the style of the control to reflects the state of the control.
// Override this in subclasses as required to implement the state change.
Control.prototype.updateStyleFromState = function() {
    uiLogger.debug("Control.updateStyleFromState()");
}
