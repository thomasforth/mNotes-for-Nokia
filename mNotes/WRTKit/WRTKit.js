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
// This script includes the WRTKit for use in a widget.

// WRTKit version (major.minor.revision, e.g. 1.0.0).
var WRTKIT_VERSION_MAJOR = 1;
var WRTKIT_VERSION_MINOR = 0;
var WRTKIT_VERSION_REVISION = 0;

// Include util script files.
includeScript("WRTKit/Utils/Logger.js");

// Include UI visual definition.
includeStyleSheet("WRTKit/Resources/UI.css");

// Include all UI toolkit script files.
var UI_NO_INIT_ID = "UI_NO_INIT_ID";

includeScript("WRTKit/UI/UIInit.js");
includeScript("WRTKit/UI/UIElement.js");
includeScript("WRTKit/UI/Scrollbar.js");
includeScript("WRTKit/UI/NotificationPopup.js");
includeScript("WRTKit/UI/UIManager.js");
includeScript("WRTKit/UI/View.js");
includeScript("WRTKit/UI/ListView.js");
includeScript("WRTKit/UI/Control.js");
includeScript("WRTKit/UI/Separator.js");
includeScript("WRTKit/UI/Label.js");
includeScript("WRTKit/UI/ContentPanel.js");
includeScript("WRTKit/UI/TextEntryControl.js");
includeScript("WRTKit/UI/TextField.js");
includeScript("WRTKit/UI/TextArea.js");
includeScript("WRTKit/UI/SelectionControl.js");
includeScript("WRTKit/UI/SelectionMenu.js");
includeScript("WRTKit/UI/SelectionList.js");
includeScript("WRTKit/UI/ActionControl.js");
includeScript("WRTKit/UI/FormButton.js");
includeScript("WRTKit/UI/NavigationButton.js");
includeScript("WRTKit/UI/Ajax.js");

// Includes a script file by writing a script tag.
function includeScript(src) {
    document.write("<script type=\"text/javascript\" src=\"" + src + "\"></script>");
}

// Includes a style sheet by writing a style tag.
function includeStyleSheet(src) {
    document.write("<style type=\"text/css\"> @import url(\"" +  src + "\"); </style>");
}
