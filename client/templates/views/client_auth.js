const SESSION_COOKIE = 'session_data'

function checkSessionExists() {
    const session = Cookies.get(SESSION_COOKIE)
    return session ? JSON.parse(session) : false;
}

function createSession(session) {
    Cookies.set(SESSION_COOKIE, 
        typeof (session) == 'string' ? session : JSON.stringify(session), 
        {expires: 7, })
}

function removeSession() {
    Cookies.remove(SESSION_COOKIE)
    window.location.href='/home'
}

let GLOBAL_USER_DATA = null

function setGlobalUserData(data) {
    GLOBAL_USER_DATA = data;
}

function getGlobalUserData() { return GLOBAL_USER_DATA }

function configureSession() {
    const user = getGlobalUserData()
    if (user) {
        const session = checkSessionExists()
        if (!session || session.uid != user.uid) {
            createSession(user)
        }
    } else { 
        const session = checkSessionExists()
        if (session) {           
            window.location.href=`/home/${session.uid}`
        }
    }
}
