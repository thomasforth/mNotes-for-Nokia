//http://www.jappit.com/blog/category/widgets/page/3/

function checkAPI() {
    var apiBridgeFound = false;
    var apiBridgeCheckError = null;

    var so = device.getServiceObject("Service.AppManager", "IAppManager");

    var criteria = new Object();
    criteria.Type = 'Application';

    var result = so.IAppManager.GetList(criteria);

    if (result.ErrorCode == 0) {
        var iterator = result.ReturnValue;

        var application;

        while ((application = iterator.getNext()) != undefined) {
            if (application.Uid == '0x20023710') {
                apiBridgeFound = true;

                break;
            }
        }
    }
    else {
        apiBridgeCheckError = result.ErrorMessage;
    }

    return apiBridgeFound;
}