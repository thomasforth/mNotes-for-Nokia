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
// The SelectionList class implements a single or multi selection control
// that lets users select one or more options from a list of options.

// Constructor.
function SelectionList(id, caption, options, multipleSelection, selected) {
    if (id != UI_NO_INIT_ID) {
        this.init(id, caption, options, multipleSelection, selected);
    }
}

// SelectionList inherits from SelectionControl.
SelectionList.prototype = new SelectionControl(UI_NO_INIT_ID);

// Root element for options.
SelectionList.prototype.optionListElement = null;

// Array for tracking option elements.
SelectionList.prototype.optionElements = null;

// Tracking for currently focused option; null if none.
SelectionList.prototype.focusedOption = null;

// Enabled status.
SelectionList.prototype.enabled = false;

// Initializer - called from constructor.
SelectionList.prototype.init = function(id, caption, options, multipleSelection, selected) {
    uiLogger.debug("SelectionList.init(" + id + ", " + caption + ", " + options + ", " + multipleSelection + ", " + selected + ")");
    
    // call superclass initializer
    SelectionControl.prototype.init.call(this, id, caption, options, multipleSelection, selected);
    
    // create option list element
    this.optionListElement = document.createElement("div");
    this.controlElement.appendChild(this.optionListElement);
    
    // the control defaults to enabled
    this.enabled = true;
    
    // init option element arrays
    this.optionElements = [];
    
    // update the option elements to match the options in this control
    this.updateOptionElements();
}

// Returns the enabled state.
SelectionList.prototype.isEnabled = function() {
    return this.enabled;
}

// Sets the enabled state.
SelectionList.prototype.setEnabled = function(enabled) {
    uiLogger.debug("SelectionList.setEnabled(" + enabled + ")");
    // switch the state and update the the control
    this.enabled = enabled;
    this.updateOptionElements();
}

// Sets the focused state for the control.
// Note: This may not always succeed.
SelectionList.prototype.setFocused = function(focused) {
    uiLogger.debug("SelectionList.setFocused(" + focused + ")");
    if (this.enabled && this.optionElements.length > 0) {
        if (focused) {
            this.optionElements[0].link.focus();
        } else {
            this.optionElements[0].link.blur();
        }
    }
}

// Sets the currently selected options. Pass a single option in a single selection
// control or an array of selected controls in a multiple selection control. To
// deselect all options pass null in a single selection control and an empty array
// in a multiple selection control.
SelectionList.prototype.setSelected = function(selected) {
    // call superclass setSelected()
    SelectionControl.prototype.setSelected.call(this, selected);
    this.updateStyleFromState();
}

// Sets the options in the control.
SelectionList.prototype.setOptions = function(options) {
    // call superclass setOptions()
    SelectionControl.prototype.setOptions.call(this, options);
    this.updateOptionElements();
}

// Updates the option elements for the control element.
SelectionList.prototype.updateOptionElements = function() {
    uiLogger.debug("SelectionControl.updateOptionElements()");
    
    // start by removing all current options from the option list element
    while (this.optionListElement.firstChild != null) {
        this.optionListElement.removeChild(this.optionListElement.firstChild);
    }
    
    // iterate through the options and add (and possibly create) a
    // properly configured option element for each option
    for (var i = 0; i < this.options.length; i++) {
        // get the option and option element we're working on
        var option = this.options[i];
        
        // option, link and text elements for this option
        var optionElement;
        var optionLinkElement;
        var optionTextElement;
        
        // get the elements
        if (i == this.optionElements.length) {
            // we need to create a new option element...
            optionElement = document.createElement("div");
            
            // ...and a new option link element...
            optionLinkElement = document.createElement("a");
            optionLinkElement.href = "JavaScript:void(0)";
            
            // ...and a new option text element
            optionTextElement = document.createElement("span");
            
            // hook up event listeners to the element
            var self = this;
            optionLinkElement.addEventListener("focus", function(event) { self.optionFocusStateChanged(event, true); }, false);
            optionLinkElement.addEventListener("blur", function(event) { self.optionFocusStateChanged(event, false); }, false);
            optionElement.addEventListener("mouseover", function() { self.hoverStateChanged(true); }, false);
            optionElement.addEventListener("mouseout", function() { self.hoverStateChanged(false); }, false);
            optionElement.addEventListener("mousedown", function(event) {
                                                               self.optionClicked(event)
                                                               event.stopPropagation();
                                                               event.preventDefault();
                                                        }, true);
            optionElement.addEventListener("keydown", function(event) {
                                                            // center and enter trigger the action
                                                            if (event.keyCode == 0 || event.keyCode == 13) {
                                                                self.optionClicked(event)
                                                                event.stopPropagation();
                                                                event.preventDefault();
                                                            }
                                                      }, true);
            
            // add the elements to the option element array
            this.optionElements.push({ option: optionElement, link: optionLinkElement, text: optionTextElement });
        } else {
            // we already have ready elements so we'll reuse them
            optionElement = this.optionElements[i].option;
            optionLinkElement = this.optionElements[i].link;
            optionTextElement = this.optionElements[i].text;
            
            // remove the option link element from its current parent - if any
            if (optionLinkElement.parentNode != null) {
                optionLinkElement.parentNode.removeChild(optionLinkElement);
            }
            
            // remove the option text element from its current parent - if any
            if (optionTextElement.parentNode != null) {
                optionTextElement.parentNode.removeChild(optionTextElement);
            }
        }
        
        // set the option text
        optionTextElement.innerHTML = option.text;
        
        // hook up the option to the control
        if (this.enabled) {
            // add the option link element to the option element
            optionElement.appendChild(optionLinkElement);
            // add the text element to the option element
            optionLinkElement.appendChild(optionTextElement);
        } else {
            // add the text element directly to the control element
            optionElement.appendChild(optionTextElement);
        }
        // add the option element to the option list element
        this.optionListElement.appendChild(optionElement);
    }
    
    // update the style
    this.updateStyleFromState();
}

// Callback for focus state change events.
SelectionList.prototype.optionFocusStateChanged = function(event, focused) {
    uiLogger.debug("SelectionControl.optionFocusStateChanged()");
    
    // get the event source option
    var option = null;
    var optionElement = null;
    for (var i = 0; i < this.optionElements.length; i++) {
        optionElement = this.optionElements[i];
        if (optionElement.link == event.currentTarget) {
            option = this.options[i];
            break;
        }
    }
    
    // remember the focused option; or null if none is focused
    if (focused) {
        this.focusedOption = option;
    } else {
        this.focusedOption = null;
    }
    
    // call the superclass focus state change handler
    this.focusStateChanged(focused);
}

// Callback for clicks.
SelectionList.prototype.optionClicked = function(event) {
    uiLogger.debug("SelectionControl.optionClicked()");
    
    // bail out if we're not enabled
    if (!this.enabled) {
        return false;
    }
    
    // get the changed option
    var option = null;
    var optionElement = null;
    for (var i = 0; i < this.optionElements.length; i++) {
        optionElement = this.optionElements[i];
        if (optionElement.option == event.currentTarget) {
            option = this.options[i];
            break;
        }
    }
    
    // make sure the option is focused
    optionElement.link.focus();
    
    // toggle the selection
    if (this.multipleSelection) {
        // iterate through the selected options and see if this
        // option is selected. if not then add it to the selection.
        // if it already is selected then them remove it.
        var found = false;
        for (var i = 0; i < this.selected.length; i++) {
            if (this.selected[i] == option) {
                // remove from selected set
                found = true;
                this.selected.splice(i, 1);
                break;
            }
        }
        if (!found) {
            // add to the selected set
            this.selected.push(option);
        }
    } else {
        // update the selected option
        this.selected = option;
    }
    
    // update the style
    this.updateStyleFromState();
    
    // notify event listeners
    this.fireEvent(this.createEvent("SelectionChanged", this.getSelected()));
}

// Resets the state tracking for focus and hover.
// Override this in subclasses as required to implement the state reset.
SelectionList.prototype.resetFocusState = function() {
    uiLogger.debug("SelectionList.resetFocusState()");
    this.hovering = false;
    this.focused = false;
    this.focusedOption = null;
    this.updateStyleFromState();
}

// Updates the style of the control to reflects the state of the control.
SelectionList.prototype.updateStyleFromState = function() {
    uiLogger.debug("SelectionList.updateStyleFromState()");
    
    // determine the state name
    var stateName = this.getStyleStateName();
    
    // set element class names
    this.setClassName(this.rootElement, "Control");
    this.setClassName(this.controlElement, "ControlElement");
    this.setClassName(this.assemblyElement, "ControlAssembly ControlAssembly" + stateName);
    this.setClassName(this.captionElement, "ControlCaption ControlCaption" + stateName);
    
    // set option list and option class names
    this.setClassName(this.optionListElement, "SelectionList SelectionList" + stateName);
    for (var i = 0; i < this.options.length; i++) {
        var option = this.options[i];
        
        // get the option and option text elements for this option
        var optionElement = this.optionElements[i].option;
        var optionTextElement = this.optionElements[i].text;
        
        // figure out the option state
        var optionStateName = this.isSelected(option) ? "Checked" : "Unchecked";
        if (!this.enabled) {
            optionStateName += "Disabled";
        } else if (this.focusedOption == option) {
            optionStateName += "Focus";
        } else {
            optionStateName += "Normal";
        }
        
        // set option element class names
        if (this.multipleSelection) {
            this.setClassName(optionElement, "SelectionListOptionMulti SelectionListOptionMulti" + optionStateName);
        } else {
            this.setClassName(optionElement, "SelectionListOptionSingle SelectionListOptionSingle" + optionStateName);
        }
        
        // set option text class names
        this.setClassName(optionTextElement, "SelectionListOptionText SelectionListOptionText" + stateName);
    }
}
