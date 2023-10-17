const OUTPUT_PORT_DEVNULL = processor.getOutputPort('Output-DevNull');
const OUTPUT_PORT_FILE = processor.getOutputPort('Output-File');

let loginResult = null;
let cookies = '';
let fileName = '';

function onInit() {
}

function onShutdown() {
}

function onStreamStart() {
    fileName = stream.getName() + '-' + getTimestampString(new Date(Date.now()));
    stream.setOutputName(fileName);
    doLogin();
}

function onMessage(message) {
    stream.logInfo('Timer fired:' + message.data);

    // Invoke Unifi Controller query
    const result = services.Unifi.AllStatus({
        Parameter: {
            Cookie: cookies
        }
    });

    stream.logInfo('result: ' + result);

    if (result.data.Entity && result.data.Entity.GenericJSON.data) {

        // Header
        const headerMessage = dataDictionary.createMessage(dataDictionary.type.Header);
        headerMessage.data.EVENT = {
            RECORD_TYPE: 'H',
            FILENAME: fileName,
            DATETIME: Date.now()
        }
        stream.logInfo('Header: ' + headerMessage.toJson());
        stream.emit(headerMessage, OUTPUT_PORT_FILE);

        // Detail
        for (let i = 0; i < result.data.Entity.GenericJSON.data.length; i++) {
            const detailMessage = dataDictionary.createMessage(dataDictionary.type.Detail);
            detailMessage.data.EVENT = {
                RECORD_TYPE: 'D',
                EVENT_JSON: JSON.stringify(result.data.Entity.GenericJSON.data[i])
            };

            stream.emit(detailMessage, OUTPUT_PORT_FILE);
        }

        // Trailer
        const trailerMessage = dataDictionary.createMessage(dataDictionary.type.Trailer);
        trailerMessage.data.EVENT = {
            RECORD_TYPE: 'T',
            RECORD_COUNT: result.data.Entity.GenericJSON.data.length
        }
        stream.logInfo('Trailer: ' + trailerMessage.toJson());
        stream.emit(trailerMessage, OUTPUT_PORT_FILE);
    }


    stream.emit(message, OUTPUT_PORT_DEVNULL);
}

function onStreamEnd() {
    stream.logInfo('Stream ended.');
}

function doLogin() {
    loginResult = services.Unifi.Login(
        {
            Parameter: {
                Credentials: {
                    username: processor.expandString("${sec:username}"),
                    password: processor.expandString("${sec:password}")
                }
            }
        }
    )

    // stream.logInfo('loginResult: ' + loginResult.data);

    if (loginResult.data.StatusCode !== 200) {
        stream.logError('Login failed. Result:' + loginResult.data);
        throw ('Login failed. Result:' + loginResult.data);
    }

    stream.logInfo('Connection successful.');

    // In Unifi the login returns cookies in the header. 
    // We must pass these cookies back in subsquent calls to identify the 
    // logged in session  which we are in.
    // -> Collate cookies from header
    cookies = '';
    for (let i = 0; i < loginResult.data.Header.length; i++) {
        // stream.logInfo('Header Name: ' + (loginResult.data.Header[i].Name));
        // stream.logInfo('Header Value: ' + (loginResult.data.Header[i].Value));
        if (loginResult.data.Header[i].Name == 'Set-Cookie') {
            cookies += (loginResult.data.Header[i].Value + ';');
        }
    }

    stream.logInfo('cookies: ' + cookies);
}

function getTimestampString(datetime) {
    let timestampString = ''.concat(
            datetime.getFullYear(),
            padToTwoDigits(datetime.getMonth() + 1),
            padToTwoDigits(datetime.getDate()),
            padToTwoDigits(datetime.getHours()),
            padToTwoDigits(datetime.getMinutes()),
            padToTwoDigits(datetime.getSeconds())
    );

    return timestampString;
}

function padToTwoDigits(n){
  return n <= 9 ? ('0' + n) : ('' + n);
}