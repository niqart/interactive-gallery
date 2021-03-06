export const setTriangle = (p, state, pose, width) => {
    const { rightShoulder, leftShoulder, rightHip, leftHip } = pose;
    state.triangle.tColor = state.background.tColor.complement();
    state.triangle.A.x = rightShoulder.x;
    state.triangle.A.y = rightShoulder.y;
    state.triangle.B.x = leftShoulder.x;
    state.triangle.B.y = leftShoulder.y;
    state.triangle.C.x = Math.round((rightHip.x + leftHip.x) / 2);
    state.triangle.C.y = Math.round((rightHip.y + leftHip.y) / 2);
    state.triangle.stroke = Math.floor(width * 0.01);
}

export const drawTriangle = (p, state) => {
    p.noFill();
    p.stroke(p.color(state.triangle.tColor.toHexString()));
    p.strokeWeight(state.triangle.stroke);
    p.triangle(
        state.triangle.A.x, state.triangle.A.y,
        state.triangle.B.x, state.triangle.B.y,
        state.triangle.C.x, state.triangle.C.y
    );
}
