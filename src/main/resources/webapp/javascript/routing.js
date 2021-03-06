/**
 * Created by ruslangramatic on 9/21/18.
 */
const RESOURCE_URL = window.location.protocol + "//" + window.location.host;
const REST_API_URL = RESOURCE_URL + "/rest";
const METHOD_GET = "GET";
const METHOD_POST = "POST";
const METHOD_PUT = "PUT";
const METHOD_DELETE = "DELETE";

const static = {
    loginPage: () => window.location.replace(RESOURCE_URL + '/login.html'),
    logoutPage: () => window.location.replace(RESOURCE_URL + '/login.html'),
    roomsPage: () => window.location.replace(RESOURCE_URL + '/rooms.html'),
    gameplayPage: () => window.location.replace(RESOURCE_URL + '/gameplay.html'),
    achievementsPage: () => window.location.replace(RESOURCE_URL + '/achievements.html'),
    testPage: () => window.location.replace(RESOURCE_URL + '/test.html')
};

const endpoints = {
    AccountAchievementController: {
        getAccountAchievementsList: (accountId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/account/${accountId}/achievement/list`, callback)
    },
    AccountBuildingController: {
        clearAccountBuildingList: (accountId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/account/${accountId}/building/list/clear`, callback),
        getAccountBuildingList: (accountId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/account/${accountId}/building/list`, callback)
    },
    AccountCardController: {
        applyCard: (accountId, cardId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/account/${accountId}/card/${cardId}/apply`, callback),
        getAllowAccountCardList: (accountId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/account/${accountId}/card/list`, callback)
    },
    AccountController: {
        getAccountInfo: (accountId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/account/${accountId}`, callback),
        getAccountByCookie: (callback) => restRequest(METHOD_GET, `${REST_API_URL}/account/id`, callback)
    },
    AccountNotificationController: {
        clearAccountNotificationList: (accountId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/account/${accountId}/notification/list/clear`, callback),
        getAccountRecentNotificationList: (accountId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/account/${accountId}/notification/list`, callback)
    },
    AccountResourceController: {
        clearAccountResourceList: (accountId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/account/${accountId}/resource/list/clear`, callback),
        getAccountResourceList: (accountId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/account/${accountId}/resource/list`, callback)
    },
    AccountUpgradeController: {
        clearAccountUpgradeList: (accountId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/account/${accountId}/upgrade/list/clear`, callback),
        getAccountUpgradeList: (accountId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/account/${accountId}/upgrade/list`, callback)
    },
    AchievementController: {
        getAllAchievementList: (callback) => restRequest(METHOD_GET, `${REST_API_URL}/achievement/list`, callback)
    },
    BuildingController: {
        getAllBuildingList: (callback) => restRequest(METHOD_GET, `${REST_API_URL}/building/list`, callback)
    },
    CardController: {
        getAllCardList: (callback) => restRequest(METHOD_GET, `${REST_API_URL}/card/list`, callback)
    },
    MessageController: {
        getRoomMessageList: (roomId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/room/${roomId}/message/list`, callback),
        sendMessage: (accountId, callback) => restRequest(METHOD_POST, `${REST_API_URL}/account/${accountId}/message`, callback)
    },
    NotificationController: {
        getAllNotificationList: (callback) => restRequest(METHOD_GET, `${REST_API_URL}/notification/list`, callback)
    },
    ResourceController: {
        getAllResourceList: (callback) => restRequest(METHOD_GET, `${REST_API_URL}/resource/list`, callback)
    },
    RoomController: {
        getAccountRoomList: (callback) => restRequest(METHOD_GET, `${REST_API_URL}/room/account/list`, callback),
        getAllRoomList: (callback) => restRequest(METHOD_GET, `${REST_API_URL}/room/list`, callback),
        joinRoom: (roomId, accountId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/room/${roomId}/account/${accountId}/join`, callback),
        leaveRoom: (roomId, accountId, callback) => restRequest(METHOD_GET, `${REST_API_URL}/room/${roomId}/account/${accountId}/leave`, callback)
    },
    UpgradeController: {
        getAllUpgradeList: (callback) => restRequest(METHOD_GET, `${REST_API_URL}/upgrade/list`, callback)
    },
    UserController: {
        createNewUser: (callback, body) => restRequest(METHOD_POST, `${REST_API_URL}/user/new`, callback, body),
        loginUser: (callback, body) => restRequest(METHOD_POST, `${REST_API_URL}/user/login`, callback, body),
        logoutUser: (callback) => restRequest(METHOD_GET, `${REST_API_URL}/user/logout`, callback)
    }
};

function restRequest(method, url, callback, body) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open(method, url, true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.setRequestHeader('Accept', 'application/json');
    httpRequest.onreadystatechange = () => {
        if (this.readyState == 4 && (this.status == 200 || this.status == 201)) {
            if(callback && this.responseText) {
                callback(JSON.parse(this.responseText));
            } else if (callback) {
                callback();
            }
        } else {
            console.log("status: " + this.status);
            console.log(this.responseText);
        }
    };
    if(body) console.log(body);
    switch(method) {
        case METHOD_GET: httpRequest.send(null); break;
        case METHOD_POST: httpRequest.send(JSON.stringify(requestBody)); break;
        case METHOD_PUT: httpRequest.send(JSON.stringify(requestBody)); break;
        case METHOD_DELETE: httpRequest.send(null); break;
    }
}

function getCookie(key) {
    var match = document.cookie.match(new RegExp(key + '=([^;]+)'));
    if (match) return match[1];
    return null;
}
function removeCookie(key) {
    document.cookie = key + "=";
}
function setCookie(key, value) {
    document.cookie = key + "=" + value;
}
