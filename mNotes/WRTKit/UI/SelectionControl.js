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
// The SelectionControl class is an abstract base class for controls that lets
// the user select one or more options from a list of options. Don't use
// SelectionControl directly.

// Constructor.
function SelectionControl(id, caption, options, multipleSelection, selected) {
    if (id != UI_NO_INIT_ID) {
        this.init(id, caption, options, multipleSelection, selected);
    }
}

// SelectionControl inherits from Control.
SelectionControl.prototype = new Control(UI_NO_INIT_ID);

// List of options.
SelectionControl.prototype.options = null;

// The single selected option in single selection controls
// or list of options in multi selection controls.
SelectionControl.prototype.selected = null;

// Single or multiple selection.
SelectionControl.prototype.multipleSelection = false;

// Initializer - called from constructor.
SelectionControl.prototype.init = function(id, caption, options, multipleSelection, selected) {
    uiLogger.debug("SelectionControl.init(" + id + ", " + caption + ", " + options + ", " + multipleSelection + ", " + selected + ")");
    
    // call superclass initializer
    Control.prototype.init.call(this, id, caption);
    
    // set the multiple selection property
    this.multipleSelection = multipleSelection;
    
    // init options and selected (makes copies of the original arrays)
    this.options = (options != null) ? options.slice(0) : [];
    if (multipleSelection) {
        this.selected = (selected == null) ? [] : selected.slice(0);
    } else {
        this.selected = selected;
    }
    this.validateSelected();
}

// Returns true if the control is a multiple selection control; false if single.
SelectionControl.prototype.isMultipleSelection = function() {
    return this.multipleSelection;
}

// Returns true if the specified option is selected; false if not.
SelectionControl.prototype.isSelected = function(option) {
    if (this.multipleSelection) {
        // multiple selection
        // iterate through all selected options and look for the specified option
        for (var i = 0; i < this.selected.length; i++) {
            if (this.selected[i] == option) {
                return true;
            }
        }
        return false;
    } else {
        // single selection
        return (this.selected == option);
    }
}

// Returns the currently selected option in a single selection control or
// an array of selected options in a multiple selection control. If there are
// no selected options a single selection control returns null and a multiple
// selection control returns an empty array.
SelectionControl.prototype.getSelected = function() {
    return this.multipleSelection ? this.selected.slice(0) : this.selected;
}

// Sets the currently selected options. Pass a single option in a single selection
// control or an array of selected controls in a multiple selection control. To
// deselect all options pass null in a single selection control and an empty array
// in a multiple selection control.
// Override in sublcasses to provide full implementation.
SelectionControl.prototype.setSelected = function(selected) {
    this.selected = this.multipleSelection ? selected.slice(0) : selected;
    // make sure the selected option or options are legal
    this.validateSelected();
}

// Ensures that the selected option or options exist among the options in this control.
SelectionControl.prototype.validateSelected = function() {
    if (this.multipleSelection) {
        // multiple selection
        // iterate through all selected options and ensure they exist among the options
        for (var i = 0; i < this.selected.length; i++) {
            // check that the selected option exists among the options
            var found = false;
            for (var j = 0; j < this.options.length; j++) {
                if (this.options[j] == this.selected[i]) {
                    // found - stop looking for this option
                    found = true;
                    break;
                }
            }
            // not found - remove this selected element
            if (!found) {
                this.selected.splice(i, 1);
                // since we removed an entry we must re-check this position
                i--;
            }
        }
    } else {
        // single selection
        if (this.selected != null) {
            // check that the selected option exists among the options
            for (var i = 0; i < this.options.length; i++) {
                if (this.options[i] == this.selected) {
                    // found - we're done
                    return;
                }
            }
            // not found - remove the selection
            this.selected = null;
        }
    }
}

// Returns the options in the control as an array of option objects with
// a value and text property.
SelectionControl.prototype.getOptions = function() {
    return this.options;
}

// Sets the options in the control.
// Override in sublcasses to provide full implementation.
SelectionControl.prototype.setOptions = function(options) {
    this.options = options.slice(0);
    // make sure the selected option or options are legal
    this.validateSelected();
}

// Returns the option that has the specified value; null if none.
SelectionControl.prototype.getOptionForValue = function(value) {
    // iterate through all options and look for a match
    for (var i = 0; i < this.options.length; i++) {
        if (this.options[i].value == value) {
            return this.options[i];
        }
    }
    return null;
}
