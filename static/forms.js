(async () => {
    await new Promise((resolve) => {
        window.addEventListener('load', resolve);
    });

    const actions = {
        "form-new": () => {
            console.log(1);
        }
    };

    for (const form of document.querySelectorAll('form')) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            data = {};
            for (const element of event.target.elements) {
                if (element.name) {
                    data[element.name] = element.value;
                }
            } 
            let response;
            if (form.method.toUpperCase() === 'GET') {
                const params = new URLSearchParams();
                for (const param in data) {
                    params.append(param, data[param]);
                }
                response = await fetch(`${form.action}?${params}`, {
                    method: 'GET'
                });
            } else {
                response = await fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            }
            if (actions[form.className]) {
                actions[form.className](response);
            }
        });
    }
})()
