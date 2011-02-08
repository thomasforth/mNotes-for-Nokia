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
// The Scrollbar class is an implementation of a user interface element that
// indicates the current viewport position in a document.

// Constructor.
function Scrollbar(parentElement) {
    uiLogger.debug("Scrollbar(" + parentElement + ")");
    
    // get the parent element
    this.parentElement = parentElement;
    
    // create the root element
    this.rootElement = document.createElement("div");
    this.rootElement.className = "Scrollbar";
    this.rootElement.style.visibility = "hidden";
    
    // create the scrollbar
    // the scrollbar consists of a root element with six children
    // (three track elements and three thumb elements)
    
    // track
    this.trackTopElement = document.createElement("div");
    this.trackTopElement.className = "ScrollbarTrackTop";
    this.trackMiddleElement = document.createElement("div");
    this.trackMiddleElement.className = "ScrollbarTrackMiddle";
    this.trackBottomElement = document.createElement("div");
    this.trackBottomElement.className = "ScrollbarTrackBottom";
    
    // thumb
    this.thumbTopElement = document.createElement("div");
    this.thumbTopElement.className = "ScrollbarThumbTop";
    this.thumbMiddleElement = document.createElement("div");
    this.thumbMiddleElement.className = "ScrollbarThumbMiddle";
    this.thumbBottomElement = document.createElement("div");
    this.thumbBottomElement.className = "ScrollbarThumbBottom";
    
    // assemble and attach the scrollbar
    this.rootElement.appendChild(this.trackTopElement);
    this.rootElement.appendChild(this.trackMiddleElement);
    this.rootElement.appendChild(this.trackBottomElement);
    this.rootElement.appendChild(this.thumbTopElement);
    this.rootElement.appendChild(this.thumbMiddleElement);
    this.rootElement.appendChild(this.thumbBottomElement);
    this.parentElement.appendChild(this.rootElement);
    
    // bring the scrollbar up to date
    this.update(0, 100, 100);
}

// Parent element for the scrollbar.
Scrollbar.prototype.parentElement = null;

// Root HTML element in the scrollbar.
Scrollbar.prototype.rootElement = null;

// Scrollbar track top element.
Scrollbar.prototype.trackTopElement = null;

// Scrollbar track middle element.
Scrollbar.prototype.trackMiddleElement = null;

// Scrollbar track bottom element.
Scrollbar.prototype.trackBottomElement = null;

// Scrollbar thumb top element.
Scrollbar.prototype.thumbTopElement = null;

// Scrollbar thumb middle element.
Scrollbar.prototype.thumbMiddleElement = null;

// Scrollbar thumb bottom element.
Scrollbar.prototype.thumbBottomElement = null;

// Is the scrollbar needed?
Scrollbar.prototype.scrollbarNeeded = false;

// Updates the scrollbar.
Scrollbar.prototype.update = function(scrollY, viewportHeight, documentHeight) {
    // figure out current heights
    var scrollbarHeight = this.rootElement.clientHeight;
    var trackTopHeight = this.trackTopElement.clientHeight;
    var trackBottomHeight = this.trackBottomElement.clientHeight;
    var thumbTopHeight = this.thumbTopElement.clientHeight;
    var thumbBottomHeight = this.thumbBottomElement.clientHeight;
    
    // scrollable height is the larger of document and viewport heights
    var scrollableHeight = documentHeight;
    var scrollbarNeeded = true;
    if (viewportHeight >= documentHeight) {
        scrollableHeight = viewportHeight;
        scrollbarNeeded = false;
    }
    
    // show or hide scrollbar?
    if (scrollbarNeeded != this.scrollbarNeeded) {
        this.scrollbarNeeded = scrollbarNeeded;
        this.rootElement.style.visibility = scrollbarNeeded ? "visible" : "hidden";
    }
    
    // calculate thumb top position...
    var thumbTopPct = scrollY / scrollableHeight;
    var thumbTop = scrollbarHeight * thumbTopPct;
    // ...and bottom position...
    var thumbBottomPct = (scrollY + viewportHeight) / scrollableHeight;
    var thumbBottom = scrollbarHeight * thumbBottomPct;
    
    // ...and thumb height
    var thumbHeight = thumbBottom - thumbTop;
    
    // ensure that the thumb is not too small
    var thumbMinHeight = thumbTopHeight + thumbBottomHeight;
    if (thumbHeight < thumbMinHeight) {
        var underflow = thumbMinHeight - thumbHeight;
        // adjust thumb top pos assuming a shorter scrollbar track
        var thumbMid = (scrollbarHeight - underflow) * ((thumbTopPct + thumbBottomPct) / 2) + (underflow / 2);
        thumbTop = thumbMid - (thumbMinHeight / 2);
        thumbBottom = thumbTop + thumbMinHeight;
        thumbHeight = thumbBottom - thumbTop;
    }
    
    // position and size track element (add 1 to the middle section height for rounding errors)
    this.trackTopElement.style.top = "0px";
    this.trackMiddleElement.style.top = Math.round(trackTopHeight) + "px";
    this.trackMiddleElement.style.height = Math.round(scrollbarHeight - trackTopHeight - trackBottomHeight + 1) + "px";
    this.trackBottomElement.style.top = Math.round(scrollbarHeight - trackTopHeight) + "px";
    
    // position and size thumb element (add 1 to the middle section height for rounding errors)
    this.thumbTopElement.style.top = Math.round(thumbTop) + "px";
    this.thumbMiddleElement.style.top = Math.round(thumbTop + thumbTopHeight) + "px";
    this.thumbMiddleElement.style.height = Math.round(thumbHeight - thumbTopHeight - thumbBottomHeight + 1) + "px";
    this.thumbBottomElement.style.top = Math.round(thumbBottom - thumbBottomHeight) + "px";
}
