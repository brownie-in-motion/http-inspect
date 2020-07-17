module.exports = {
    route: 'new',
    handler: ({ database }) => async (req, res) => {
        const result = { success: false };

        if (req.method !== 'POST') {
            res.json(result, 405);
            return;
        }

        if (typeof req.body.id !== 'string') {
            res.json(result, 400);
            return;
        }

        const id = req.body.id;
        const key = req.body.key;
        const exists = await database.has(id);

        if (exists) {
            result.error = "Key Taken.";
            res.json(result, 409);
            return;
        }

        // Do some validation stuff later
        database.put(id, typeof key === 'string' ? key : '');

        res.end();
    }
}
