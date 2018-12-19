function createList() {
    let list = [];

    function splitApart(contents) {
        const regex = new RegExp(/([0-9]+\s[a-zA-Z\-]+)\sof\s([a-zA-Z\-\s]+)/);
        contents = contents.toLowerCase();
        while(contents.length > 0) {
            regexResult = regex.exec(contents);
            if(!regexResult) break;
            contents = contents.replace(regexResult[1], '').replace(regexResult[2], '')
            list.push({name:regexResult[2].trim().toLowerCase(),amount:regexResult[1].trim().toLowerCase()});
        }
    }

    return {
        start: (rawBody) => {
            const contents = rawBody.text;
            list = [];
            splitApart(contents);
            return Promise.resolve();
        }, 
        figureItOut: (key) => {
            const target = list.reduce((target, item) => {
                if(item.name === key) target = item;
                return target;
            }, undefined)
            return Promise.resolve(target)
        },
        showMe: () => Promise.resolve(list.map(item => `${item.name} ${item.amount}`).join(' '))
    }
}

module.exports = createList