const validateTitle = (req,resp,next) => {
    const {body} = req;

    if(body.title === undefined){
       return resp.status(400).json({message: 'the field "title" is required'});
    }

    if(body.title === ''){
       return resp.status(400).json({message: '"title" cannot be empty'});
    }

    next();
};

const validateStatus = (req,resp,next) => {
    const {body} = req;

    if(body.status === undefined){
       return resp.status(400).json({message: 'the field "status" is required'});
    }

    if(body.status === ''){
       return resp.status(400).json({message: '"status" cannot be empty'});
    }

    next();
};


module.exports = {
    validateTitle,
    validateStatus
};