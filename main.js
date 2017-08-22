
document.addEventListener('DOMContentLoaded', e => {
    const wrapper = document.getElementById('wrapper');
    const rice = document.getElementById('rice');
    const fish = document.getElementById('fish');
    const sushi = document.getElementById('sushi');

    [rice, fish, sushi].forEach(o => {
        wrapper.appendChild(o);
    });

    const config = { // TODO: find a better parameter
        fps: 25,
        inertia: 0.98,
        riceAccelCoeff: 3,
        fishAccelCoeff: 5,
        sushiRange: 1000
    }

    const sushiStalker = new SushiStalker(rice, fish, sushi, config);
    document.addEventListener('mousemove', e => sushiStalker.setMousePos(e.clientX, e.clientY));
    sushiStalker.run();
});
