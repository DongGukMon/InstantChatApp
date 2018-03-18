const functions = require('firebase-functions');
const sentiment = require('sentiment');
const cors = require('cors')({
    origin: true,
});

exports.emotionAnalysis = functions.https.onRequest((req, res) => {
    const handleError = (msg,error) => {
        console.error(msg,error);
        return res.sendStatus(500);
    };

    const handleResponse = (msg,status, body) => {
        console.log({
            msg,
        }, {
            Response: {
                Status: status,
                Body: body,
            },
        });
        if (body) {
            return res.status(200).json(body);
        }
        return res.sendStatus(status);
    };

    let message = '';

    try {
        //req body = {"text message"}
        cors(req, res, () => {
            if (req.method !== 'POST') {
                return handleResponse('request method is not post', 403,{});
            }
            message = req.body;
            if (message.length == 0) {
                return handleResponse('message is empty', 400,{});
            }

            const result = EmoticonTranslator(message);
            return handleResponse('success',200,result)
        });
    } catch (error) {
        return handleError(username, error);
    }
    return null;

});

function EmoticonTranslator(text){
    var sentence = sentiment(text);

    if(sentence.comparative >= 0.5)
        return ('happy');//매우 좋은 기분
    else if(sentence.comparative >= 0)
        return ('good'); //좋은 기분인 편임
    else if(sentence.comparative <= -0.5)
        return ('bad'); //매우 부정적인 기분
    else if(sentence.comparative < 0)
        return ('not good'); //좋은 기분은 아님
}

exports.getState = functions.https.onRequest((req, res) => {
    // [END trigger]
    // [START sendError]
    // Forbidding PUT requests.
    if (req.method === 'PUT') {
        return res.status(403).send('Forbidden!');
    }
    // [END sendError]

    // [START usingMiddleware]
    // Enable CORS using the `cors` express middleware.
    return cors(req, res, () => {
        // [END usingMiddleware]
        // Reading date format from URL query parameter.
        // [START readQueryParam]
        let msg = req.query.msg;
        // [END readQueryParam]
        // Reading date format from request body query parameter
        if (!msg) {
            // [START readBodyParam]
            msg = req.body.msg;
            // [END readBodyParam]
        }
        // [START sendResponse]
        const result = EmoticonTranslator(msg);
        console.log('Sending state result:', result);
        res.status(200).send(result);
        // [END sendResponse]
    });
});