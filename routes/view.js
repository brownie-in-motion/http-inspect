module.exports = {
    path: '/view/:id/:key?',
    method: 'GET',
    handler: ({ database, assetsPath }) => async (req, res) => {
        const id = req.params.id;
        const exists = await database.has(id);
        if (!exists) {
            res.redirect('/');
            res.end();
            return;
        }

        const key = req.params.key ?? '';
        const info = await database.get(id);
        if (key !== info.key) {
            res.redirect('/');
            res.end();
            return;
        }

        res.sendFile(assetsPath + '/view.html');
    }
}
