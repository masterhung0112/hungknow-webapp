// Canvas context for text measurments

function Context($p: any) {
    const el = document.createElement('canvas');
    const ctx = el.getContext('2d');
    ctx.font = $p.font;

    return ctx;
}

export default Context;
