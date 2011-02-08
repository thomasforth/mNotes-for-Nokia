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
// The ContentPanel class is a control for displaying content. The panel
// can be expanded and collapsed.

// Constructor.
function ContentPanel(id, caption, content, foldable, expanded) {
    if (id != UI_NO_INIT_ID) {
        this.init(id, caption, content, foldable, expanded);
    }
}

// ContentPanel inherits from Control.
ContentPanel.prototype = new Control(UI_NO_INIT_ID);

// The element hierarchy in a content panel is as follows:
//
// rootElement
//     assemblyElement
//         captionElement
//             foldToggleElement
//                 captionLinkElement
//                     captionTextElement
//     contentElement
//
// captionTextElement is moved under foldToggleElement if disabled
// or captionElement if not foldable

// The fold toggle element used for folding content panels.
ContentPanel.prototype.foldToggleElement = null;

// The caption link element of this control.
ContentPanel.prototype.captionLinkElement = null;

// The caption text element of this control.
ContentPanel.prototype.captionTextElement = null;

// The content element of this control.
ContentPanel.prototype.contentElement = null;

// The foldable state of this control.
ContentPanel.prototype.foldable = false;

// The expanded state of this control.
ContentPanel.prototype.expanded = false;

// Enabled status.
ContentPanel.prototype.enabled = false;

// Initializer - called from constructor.
ContentPanel.prototype.init = function(id, caption, content, foldable, expanded) {
    uiLogger.debug("ContentPanel.init(" + id + ", " + caption + ", " + content + ", " + foldable + ", " + expanded + ")");
    
    // call superclass initializer
    Control.prototype.init.call(this, id, caption);
    
    // the control defaults to enabled
    this.enabled = true;
    
    // create caption text element
    this.captionTextElement = document.createElement("span");
    
    // disconnect the control element
    this.assemblyElement.removeChild(this.controlElement);
    
    // set the foldable state
    this.foldable = foldable;
    
    // is this a foldable content panel?
    if (foldable) {
        // create fold toggle element
        this.foldToggleElement = document.createElement("div");
        this.captionElement.appendChild(this.foldToggleElement);
        
        // create caption link and add to caption element
        this.captionLinkElement = document.createElement("a");
        this.captionLinkElement.href = "JavaScript:void(0)";
        this.foldToggleElement.appendChild(this.captionLinkElement);
        
        // add the text element to the link element
        this.captionLinkElement.appendChild(this.captionTextElement);
        
        // bind event listeners
        var self = this;
        this.captionLinkElement.addEventListener("focus", function() { self.focusStateChanged(true); }, false);
        this.captionLinkElement.addEventListener("blur", function() { self.focusStateChanged(false); }, false);
        this.foldToggleElement.addEventListener("mouseover", function() { self.hoverStateChanged(true); }, false);
        this.foldToggleElement.addEventListener("mouseout", function() { self.hoverStateChanged(false); }, false);
        this.foldToggleElement.addEventListener("mousedown", function(event) {
                                                                 self.captionClicked();
                                                                 event.stopPropagation();
                                                                 event.preventDefault();
                                                             }, true);
        this.foldToggleElement.addEventListener("keydown", function(event) {
                                                               // center and enter trigger the action
                                                               if (event.keyCode == 0 || event.keyCode == 13) {
                                                                   self.captionClicked();
                                                                   event.stopPropagation();
                                                                   event.preventDefault();
                                                               }
                                                           }, true);
        
        this.expanded = expanded;
    } else {
        // since this is not a foldable panel the content should be expanded
        this.expanded = true;
        
        // add the text element directly to the caption element
        this.captionElement.appendChild(this.captionTextElement);
    }
    
    // create content element
    this.contentElement = document.createElement("div");
    this.contentElement.style.display = this.expanded ? "block" : "none";
    this.rootElement.appendChild(this.contentElement);
    
    // set caption, content and expanded state
    this.setCaption(caption);
    this.setContent(content);
    
    // update style
    this.updateStyleFromState();
}

// Returns the enabled state.
ContentPanel.prototype.isEnabled = function() {
    return this.enabled;
}

// Sets the enabled state.
ContentPanel.prototype.setEnabled = function(enabled) {
    uiLogger.debug("ContentPanel.setEnabled(" + enabled + ")");
    
    // bail out early if there is no change in state
    if (this.enabled == enabled) {
        return;
    }
    
    // set the enabled state
    this.enabled = enabled;
    
    // is this a foldable content?
    if (this.foldable) {
         // the caption link must be disabled
        if (this.enabled) {
            // diabled -> enabled
            this.foldToggleElement.removeChild(this.captionTextElement);
            this.foldToggleElement.appendChild(this.captionLinkElement);
            this.captionLinkElement.appendChild(this.captionTextElement);
        } else {
            // enabled -> diabled
            this.captionLinkElement.removeChild(this.captionTextElement);
            this.foldToggleElement.removeChild(this.captionLinkElement);
            this.foldToggleElement.appendChild(this.captionTextElement);
        }
    }
    
    // update style
    this.updateStyleFromState();    
}

// Returns the caption; null if none.
ContentPanel.prototype.getCaption = function() {
    return this.caption;
}

// Sets the caption; null if none.
ContentPanel.prototype.setCaption = function(caption) {
    // bail out if the caption text element has not been created
    // this is to prevent the superclass init calling this before
    // we've initialized our custom caption
    if (this.captionTextElement == null)
        return;
    
    uiLogger.debug("ContentPanel.setCaption(" + caption + ")");
    
    // set the display style
    this.captionElement.style.display = (caption == null) ? "none" : "block";
    
    // set the caption
    this.caption = caption;
    this.captionTextElement.innerHTML = (caption == null) ? "" : caption;
    
    // update style
    this.updateStyleFromState();
}

// Returns the content.
ContentPanel.prototype.getContent = function() {
    return this.contentElement.innerHTML;
}

// Sets the content.
ContentPanel.prototype.setContent = function(content) {
    uiLogger.debug("ContentPanel.setContent(" + content + ")");
    this.contentElement.innerHTML = (content == null) ? "" : content;
}

// Returns the focusable state for the control.
ContentPanel.prototype.isFocusable = function() {
    // a content panel is focusable if it's foldable and enabled
    return (this.foldable && this.enabled);
}

// Sets the focused state for the control.
// Note: This may not always succeed.
ContentPanel.prototype.setFocused = function(focused) {
    uiLogger.debug("ContentPanel.setFocused(" + focused + ")");
    if (this.enabled && this.foldable) {
        if (focused) {
            this.captionLinkElement.focus();
        } else {
            this.captionLinkElement.blur();
        }
    }
    // note that this.focused gets set as a result of focusStateChanged() being called
    // rather than setting it explicitly here
}

// Returns the expanded state.
ContentPanel.prototype.isExpanded = function() {
    return this.expanded;
}

// Sets the expanded state.
ContentPanel.prototype.setExpanded = function(expanded) {
    uiLogger.debug("ContentPanel.setExpanded(" + expanded + ")");
    
    // make sure only foldable content panels are folded
    if (!this.foldable) {
        uiLogger.warn("Cannot fold a non-foldable content panel!");
        return;
    }
    
    this.expanded = expanded;
    if (this.expanded) {
        // expand
        this.contentElement.style.display = "block";
        
        // find out control top and bottom
        var controlTop = this.getAbsoluteTop(this.rootElement);
        var controlHeight = this.rootElement.clientHeight;
        var controlBottom = controlTop + controlHeight;
        
        // find out the viewport top and bottom
        var viewportTop = window.scrollY;
        var viewportHeight = window.innerHeight;
        var viewportBottom = viewportTop + viewportHeight;
        
        // make sure the control is positioned so that it can be seen
        var overflow = controlBottom - viewportBottom;
        if (overflow > 0) {
            // there's overflow so we need to scroll to get the control
            // into the viewport - however not so far that the control
            // goes past the viewport top.
            var distanceToTop = controlTop - viewportTop;
            var scrollAmount = Math.min(overflow, distanceToTop);
            window.scrollBy(0, scrollAmount);
        }
    } else {
        // collapse
        this.contentElement.style.display = "none";
    }
    
    // notify event listeners
    this.fireEvent(this.createEvent("ExpandedStateChanged", this.expanded));
    
    // update the style
    this.updateStyleFromState();
}

// Returns the absolute position (y) of the given element.
ContentPanel.prototype.getAbsoluteTop = function(element) {
    // traverse from element to root and add top-offset
    // for each element we find on the way
    var absTop = 0;
    while (element != null) {
        absTop += element.offsetTop;
        element = element.offsetParent;
    }
    return absTop;
}

// Callback for when the caption is clicked.
ContentPanel.prototype.captionClicked = function() {
    uiLogger.debug("ContentPanel.captionClicked()");
    
    // if we're enabled then a click results toggling the expanded state
    if (this.enabled) {
        // focus when clicked
        if (!this.focused) {
            this.captionLinkElement.focus();
        }
        
        // toggle the expanded state
        this.setExpanded(!this.expanded);
    }
}

// Updates the style of the control to reflects the state of the control.
ContentPanel.prototype.updateStyleFromState = function() {
    uiLogger.debug("ContentPanel.updateStyleFromState()");

    // determine the state name
    var stateName = this.getStyleStateName();
    
    // set root element class name
    this.setClassName(this.rootElement, "Control");

    // set the control assembly class names
    this.setClassName(this.assemblyElement, "ControlAssembly ControlAssembly" + stateName);
    
    if (this.foldable) {
        // foldable content panel
        this.setClassName(this.captionElement, "ContentPanelCaptionFoldable");
        this.setClassName(this.foldToggleElement, "ContentPanelFoldToggle ContentPanelFoldToggle" + (this.expanded ? "Expanded" : "Collapsed"));
    } else {
        // non-folding
        this.setClassName(this.captionElement, "ContentPanelCaptionNonFoldable");
    }
    
    // set the content caption text class names
    this.setClassName(this.captionTextElement, "ContentPanelCaptionText ContentPanelCaptionText" + stateName);
    
    // set the content element class names
    this.setClassName(this.contentElement, "ContentPanelContent");
}
