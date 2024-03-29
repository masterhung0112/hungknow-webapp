function transformFromSet(incoming: any) {
    const state = {...incoming};

    for (const key in state) {
        if (Object.prototype.hasOwnProperty.call(state, key)) {
            if (state[key] instanceof Set) {
                state[key] = Array.from([...state[key]]);
            }
        }
    }

    return state;
}

function transformToSet(incoming: any) {
    const state = {...incoming};

    for (const key in state) {
        if (Object.prototype.hasOwnProperty.call(state, key)) {
            state[key] = new Set(state[key]);
        }
    }

    return state;
}

export function transformSet(incoming: any, setTransforms: any, toStorage = true) {
    const state = {...incoming};

    const transformer = toStorage ? transformFromSet : transformToSet;

    for (const key in state) {
        if (Object.prototype.hasOwnProperty.call(state, key) && setTransforms.includes(key)) {
            state[key] = transformer(state[key]);
        }
    }

    return state;
}
