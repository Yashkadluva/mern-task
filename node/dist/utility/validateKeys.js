"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateKey = validateKey;
const isEmptyObject = (data) => {
    return Object.keys(data).length === 0;
};
function validateKey(data, keys) {
    if (keys.length == 0) {
        return false;
    }
    if (isEmptyObject(data)) {
        return { message: `${keys[0]} is required` };
    }
    let errors = [];
    keys.length > 0 && keys.map((item) => {
        let isKey = false;
        Object.entries(data).map((key) => {
            if (item == key[0]) {
                isKey = true;
            }
        });
        if (!isKey) {
            errors.push({ message: `${item} is required` });
        }
    });
    if (errors.length > 0) {
        return errors[0];
    }
    else if (errors.length == 0) {
        return false;
    }
}
//# sourceMappingURL=validateKeys.js.map