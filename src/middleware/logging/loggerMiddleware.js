import logger from '../../logging';

export default (req, res, next) => {
    logger.debug('Request recieved', { url: req.url, params: req.params });
    next();
};
