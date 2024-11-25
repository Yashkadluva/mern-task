const isEmptyObject = (data: object) => {
    return Object.keys(data).length === 0;
}

export function validateKey(data: any, keys: any) {
    if (keys.length == 0) {
        return false;
    }
    if (isEmptyObject(data)) {
        return { message: `${keys[0]} is required` }
    }
    let errors: any[] = [];
    keys.length > 0 && keys.map((item: any) => {
        let isKey = false;
        Object.entries(data).map((key: any) => {
            if (item == key[0]) {
                isKey = true;
            }
        });
        if (!isKey) {
            errors.push({ message: `${item} is required` })
        }
    });
    if (errors.length > 0) {
        return errors[0];
    } else if (errors.length == 0) {
        return false;
    }
}