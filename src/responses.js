const respond = (request, response, status, content, type) => {
    response.writeHead(status, {'Content-Type': type});
    response.write(content);
    response.end();
}

const success = (request, response, type) => {
    const object = {
        message: 'Successful response',
    };

    if (type[0] === 'text/xml'){
        let XML = '<response>';
        XML += `<message>${object.message}</message>`;
        XML += '</response>';

        return respond(request, response, 200, XML, 'text/xml');
    }

    return respond(request, response, 200, JSON.stringify(object), 'application/json');
}

const badRequest = (request, response, type, params) => {
    
    //set status to 200
    let status = 200;

    const object = {
        message: 'Request has required paramters',
        id: 'badRequest',
    };

    //if the parameters are invalid, change object.message to ask for valid params and status code to 400
    if(!params.valid || params.valid !== true) {
        object.message = 'Missing valid query paramters';
        response.id = 'badRequest';
        status = 400;
    }

    if (type[0] === 'text/xml'){
        let XML = '<response>';
        XML += `<message>${object.message}</message>`;
        XML += '</response>';

        return respond(request, response, status, XML, 'text/xml');
    }

    return respond(request, response, status, JSON.stringify(object), 'application/json');
}

const unauthorized = (request, response, type, params) => {
    
    //set status to 200
    let status = 200;

    const object = {
        message: 'Request has required paramters',
        id: 'unauthorized',
    };

    //if the parameters are invalid, change object.message to ask for valid params and status code to 401
    if(!params.loggedIn || params.loggedIn !== yes) {
        object.message = 'Missing valid query paramters';
        response.id = 'badRequest';
        status = 401;
    }

    if (type[0] === 'text/xml'){
        let XML = '<response>';
        XML += `<message>${object.message}</message>`;
        XML += '</response>';

        return respond(request, response, status, XML, 'text/xml');
    }

    return respond(request, response, status, JSON.stringify(object), 'application/json');
}

const forbidden = (request, response, type) => {
    const object = {
        message: 'You do not have access to this content',
        id: 'forbidden',
    };

    if (type[0] === 'text/xml'){
        let XML = '<response>';
        XML += `<message>${object.message}</message>`;
        XML += '</response>';

        return respond(request, response, 403, XML, 'text/xml');
    }

    return respond(request, response, 403, JSON.stringify(object), 'application/json');
}

const internal = (request, response, type) => {
    const object = {
        message: 'Internal Server Error',
        id: 'internalError'
    };

    if (type[0] === 'text/xml'){
        let XML = '<response>';
        XML += `<message>${object.message}</message>`;
        XML += '</response>';

        return respond(request, response, 500, XML, 'text/xml');
    }

    return respond(request, response, 500, JSON.stringify(object), 'application/json');
}

const notImplemented = (request, response, type) => {
    const object = {
        message: 'Page has not been implemented yet. Check back later.',
        id: 'notImplemented',
    };

    if (type[0] === 'text/xml'){
        let XML = '<response>';
        XML += `<message>${object.message}</message>`;
        XML += '</response>';

        return respond(request, response, 501, XML, 'text/xml');
    }

    return respond(request, response, 501, JSON.stringify(object), 'application/json');
}

const notFound = (request, response, type) => {
    const object = {
        message: 'The page you are looking for was not found',
        id: 'notFound',
    };

    if (type[0] === 'text/xml'){
        let XML = '<response>';
        XML += `<message>${object.message}</message>`;
        XML += '</response>';

        return respond(request, response, 404, XML, 'text/xml');
    }

    return respond(request, response, 404, JSON.stringify(object), 'application/json');
}

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound,
};