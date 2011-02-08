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
// The UIElement class is the base class for all user interface elements.

// Constructor.
function UIElement(id) {
    if (id != UI_NO_INIT_ID) {
        this.init(id);
    }
}

// UI element identifier.
UIElement.prototype.id = null;

// Root HTML element in the UI element.
UIElement.prototype.rootElement = null;

// Initializer for UIElement.
UIElement.prototype.init = function(id) {
    uiLogger.debug("UIElement.init(" + id + ")");
    
    // copy identifier
    this.id = id;
    
    // init event listener array
    this.eventListeners = [];
    
    // create the root element
    this.rootElement = document.createElement("div");
    if (id != null) {
        this.rootElement.id = id;
    }
}

// Returns an array containing the current event listeners.
UIElement.prototype.getEventListeners = function() {
    return this.eventListeners;
}

// Adds an event listener.
UIElement.prototype.addEventListener = function(eventType, listener) {
    var listenerDef = { type: eventType, listener: listener };
    this.eventListeners.push(listenerDef);
}

// Removes an event listener.
UIElement.prototype.removeEventListener = function(eventType, listener) {
    // iterate through current listeners and remove the specified
    // listener when its found
    for (var i = 0; i < this.eventListeners.length; i++) {
        var listenerDef = this.eventListeners[i];
        if ((listenerDef.type == eventType) &&
                (listenerDef.listener == listener)) {
            this.eventListeners.splice(i, 1);
            return;
        }
    }
}

// Factory method for an event object where this object is the source object.
UIElement.prototype.createEvent = function(type, value) {
    return { source: this, type: type, value: value };
}

// Fires an event to all listeners.
UIElement.prototype.fireEvent = function(event) {
    // iterate through all event listeners and notify them of the event
    for (var i = 0; i < this.eventListeners.length; i++) {
        var listenerDef = this.eventListeners[i];
        if (listenerDef.type == null || listenerDef.type == event.type) {
            listenerDef.listener.call(this, event);
        }
    }
}
