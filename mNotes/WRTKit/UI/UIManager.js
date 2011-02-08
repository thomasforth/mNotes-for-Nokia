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
// The UI manager manages a set of views and other user interface elements.

// Constructor.
function UIManager(viewParentElement, scrollbarParentElement) {
    uiLogger.debug("UIManager(" + viewParentElement + ", " + scrollbarParentElement + ")");
    
    // parent element for views
    if (viewParentElement == null) {
        // create a parent for views
        this.viewParentElement = document.createElement("div");
        this.viewParentElement.className = "ViewContainer";
        document.body.appendChild(this.viewParentElement);
    } else {
        this.viewParentElement = viewParentElement;
    }
    
    // parent element for scrollbar
    if (scrollbarParentElement == null) {
        // create a parent for the scrollbar
        this.scrollbarParentElement = document.createElement("div");
        this.scrollbarParentElement.className = "DocumentScrollbarContainer";
        document.body.appendChild(this.scrollbarParentElement);
    } else {
        this.scrollbarParentElement = scrollbarParentElement;
    }
    
    // currently selected view
    this.currentView = null;
    
    // create the notification popup
    // the notification popup adds itself as a child element to the document body
    this.notificationPopup = new NotificationPopup();
    
    // create scrollbar
    this.scrollbar = new Scrollbar(this.scrollbarParentElement);
    
    // setup scrollbar tracking
    var self = this;
    this.startTimer();
    window.addEventListener("resize", function() { self.updateScrollbar(); }, false);
    window.addEventListener("scroll", function() { self.updateScrollbar(); }, false);
}

// Parent element for views.
UIManager.prototype.viewParentElement = null;

// Parent element for scrollbar.
UIManager.prototype.scrollbarParentElement = null;

// The currently displayed view.
UIManager.prototype.currentView = null;

// Reference to the scrollbar.
UIManager.prototype.scrollbar = null;

// Current scroll Y position.
UIManager.prototype.scrollY = -1;

// Current viewport height.
UIManager.prototype.viewportHeight = -1;

// Current document height.
UIManager.prototype.documentHeight = -1;

// Timer identifier or null if no active timer.
UIManager.prototype.timerId = null;

// Interval for timer ticks for the UI manager timer (in milliseconds)
UIManager.prototype.TIMER_INTERVAL = 250;

// Reference to the notification popup used to displays notifications.
UIManager.prototype.notificationPopup = null;

// Returns the current view.
UIManager.prototype.getView = function() {
    return this.currentView;
}

// Switches to the specified view.
UIManager.prototype.setView = function(view) {
    uiLogger.debug("View set to " + view.id);
    
    // remove the current view from the parent element
    if (this.currentView != null) {
        this.viewParentElement.removeChild(this.currentView.rootElement);
    }
    
    // reset scroll
    window.scrollTo(0, 0);
    
    // add the new view to the parent element
    if (view != null) {
        this.currentView = view;
        this.currentView.resetControlFocusStates();
        this.viewParentElement.appendChild(this.currentView.rootElement);
    }
    
    // update scrollbar
    this.updateScrollbar();
    
    // focus the first focusable control
    // a timer is used to prevent unwanted focus shift
    setTimeout(function() { view.focusFirstControl(); }, 1);
}

// Updates the scrollbar.
UIManager.prototype.updateScrollbar = function() {
    // get current viewport and document position and dimensions
    var scrollY = window.scrollY;
    var viewportHeight = window.innerHeight;
    var documentHeight = Math.max(document.documentElement.scrollHeight, document.height);
    main
    // check if the scroll position or view has changed
    if (this.scrollY != scrollY ||
            this.viewportHeight != viewportHeight ||
            this.documentHeight != documentHeight) {
        // scroll position or view has changed
        this.scrollY = scrollY;
        this.viewportHeight = viewportHeight;
        this.documentHeight = documentHeight;
        
        // update the scrollbar
        this.scrollbar.update(scrollY, viewportHeight, documentHeight);
        uiLogger.debug("Scrollbar updated");
    }
}

// Starts the view manager timer.
UIManager.prototype.startTimer = function() {
    if (this.timerId == null) {
        uiLogger.debug("UIManager timer started");
        var self = this;
        // setup the timer
        this.timerId = setInterval(function() { self.onTimer(); }, this.TIMER_INTERVAL);
    } else {
        uiLogger.warn("UIManager timer already running");
    }
}

// Stops the view manager timer.
UIManager.prototype.stopTimer = function() {
    if (this.timerId != null) {
        // stop the timer
        clearTimeout(this.timerId);
        this.timerId = null;
    } else {
        uiLogger.warn("UIManager timer already stopped");
    }
}

// Timer callback function.
UIManager.prototype.onTimer = function() {
    // make sure the scrollbar is up to date
    this.updateScrollbar();
}

// Displays a notification.
UIManager.prototype.showNotification = function(displayTime, type, text, progress) {
    uiLogger.debug("UIManager.showNotification(" + displayTime + ", " + type + ", " + text + ", " + progress + ")");
    // use the notification popup to show the notification
    this.notificationPopup.showNotification(displayTime, type, text, progress);
}

// Hides the currently displayed notification.
UIManager.prototype.hideNotification = function() {
    uiLogger.debug("UIManager.hideNotification()");
    // hide the notification popup
    this.notificationPopup.hideNotification();
}
