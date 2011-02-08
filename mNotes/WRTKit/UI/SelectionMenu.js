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
// The SelectionMenu class implements a single or multi selection control
// that lets users select one or more options from a menu.

// Constructor.
function SelectionMenu(id, caption, options, multipleSelection, selected) {
    if (id != UI_NO_INIT_ID) {
        this.init(id, caption, options, multipleSelection, selected);
    }
}

// SelectionMenu inherits from SelectionControl.
SelectionMenu.prototype = new SelectionControl(UI_NO_INIT_ID);

// Reference to the peer HTML element.
SelectionControl.prototype.peerElement = null;

// Array for tracking option elements.
SelectionMenu.prototype.optionElements = null;

// Initializer - called from constructor.
SelectionMenu.prototype.init = function(id, caption, options, multipleSelection, selected) {
    uiLogger.debug("SelectionMenu.init(" + id + ", " + caption + ", " + options + ", " + multipleSelection + ", " + selected + ")");
    
    // call superclass initializer
    SelectionControl.prototype.init.call(this, id, caption, options, multipleSelection, selected);
    
    // create the control
    this.peerElement = document.createElement("select");
    this.peerElement.multiple = multipleSelection;
    this.controlElement.appendChild(this.peerElement);
    
    // init option elements array
    this.optionElements = [];
    
    // update the option elements to match the options in this control
    this.updateOptionElements();
    
    // bind event listeners
    var self = this;
    this.peerElement.addEventListener("focus", function() { self.focusStateChanged(true); }, false);
    this.peerElement.addEventListener("blur", function() { self.focusStateChanged(false); }, false);
    this.peerElement.addEventListener("mouseover", function() { self.hoverStateChanged(true); }, false);
    this.peerElement.addEventListener("mouseout", function() { self.hoverStateChanged(false); }, false);
    this.peerElement.addEventListener("change", function() { self.selectionChanged(); }, false);
}

// Returns the enabled state.
SelectionMenu.prototype.isEnabled = function() {
    return !this.peerElement.disabled;
}

// Sets the enabled state.
SelectionMenu.prototype.setEnabled = function(enabled) {
    uiLogger.debug("SelectionMenu.setEnabled(" + enabled + ")");
    this.peerElement.disabled = !enabled;
}

// Sets the focused state for the control.
// Note: This may not always succeed.
SelectionMenu.prototype.setFocused = function(focused) {
    uiLogger.debug("SelectionMenu.setFocused(" + focused + ")");
    if (focused) {
        this.peerElement.focus();
    } else {
        this.peerElement.blur();
    }
}

// Sets the currently selected options. Pass a single option in a single selection
// control or an array of selected controls in a multiple selection control. To
// deselect all options pass null in a single selection control and an empty array
// in a multiple selection control.
SelectionMenu.prototype.setSelected = function(selected) {
    // call superclass setSelected()
    SelectionControl.prototype.setSelected.call(this, selected);
    
    // iterate through the options and set the selected state
    // on the corresponding option element
    for (var i = 0; i < this.options.length; i++) {
        this.optionElements[i].selected = this.isSelected(this.options[i]);
    }
}

// Sets the options in the control.
SelectionMenu.prototype.setOptions = function(options) {
    // call superclass setOptions()
    SelectionControl.prototype.setOptions.call(this, options);
    this.updateOptionElements();
}

// Updates the option elements for the peer select element.
SelectionMenu.prototype.updateOptionElements = function() {
    // start by removing all current options from the select element
    while (this.peerElement.firstChild != null) {
        this.peerElement.removeChild(this.peerElement.firstChild);
    }
    
    // iterate through the options and add (and possibly create) a
    // properly configured option element for each option
    for (var i = 0; i < this.options.length; i++) {
        // do we need to create a new option element?
        if (i == this.optionElements.length) {
            this.optionElements.push(document.createElement("option"));
        }
        
        // get the option and option element we're working on
        var option = this.options[i];
        var optionElement = this.optionElements[i];
        
        // set the state for this option element and add it to the
        // peer select element
        optionElement.text = option.text;
        optionElement.selected = this.isSelected(option);
        this.peerElement.appendChild(optionElement);
    }
    
    // update the style
    this.updateStyleFromState();    
}

// Callback for selection change events.
SelectionMenu.prototype.selectionChanged = function() {
    uiLogger.debug("SelectionControl.selectionChanged()");
    
    // update the selected options array or reference
    this.selected = (this.multipleSelection) ? [] : null;
    for (var i = 0; i < this.options.length; i++) {
        if (this.optionElements[i].selected) {
            if (this.multipleSelection) {
                this.selected.push(this.options[i]);
            } else {
                this.selected = this.options[i];
                break;
            }
        }
    }
    
    // notify event listeners
    this.fireEvent(this.createEvent("SelectionChanged", this.getSelected()));
}

// Updates the style of the control to reflects the state of the control.
SelectionMenu.prototype.updateStyleFromState = function() {
    uiLogger.debug("SelectionMenu.updateStyleFromState()");
    
    // determine the state name
    var stateName = this.getStyleStateName();
    
    // set element class names
    this.setClassName(this.rootElement, "Control");
    this.setClassName(this.controlElement, "ControlElement");
    this.setClassName(this.assemblyElement, "ControlAssembly ControlAssembly" + stateName);
    this.setClassName(this.captionElement, "ControlCaption ControlCaption" + stateName);
    
    // set select and option element class names
    var peerStateName = this.isEnabled() ? stateName : "Disabled";
    this.setClassName(this.peerElement, "SelectionMenu SelectionMenu" + peerStateName);
    for (var i = 0; i < this.options.length; i++) {
        var option = this.optionElements[i];
        this.setClassName(option, "SelectionMenuOption SelectionMenuOption" + peerStateName);
    }
}
