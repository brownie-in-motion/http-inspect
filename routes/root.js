module.exports = {
    path: '/',
    handler: ({ assetsPath }) => (req, res) => {
        res.sendFile(assetsPath + '/index.html');
    }
}
