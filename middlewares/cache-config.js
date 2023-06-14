module.exports = (req, res, next) =>{
    const period = 60 * 60

    if(req.method === 'GET'){
        res.set('Cache-control', `public, max-age=${period}`)
    }else{
        res.set('Cache-control',`no-store`)
    }

    next()
}