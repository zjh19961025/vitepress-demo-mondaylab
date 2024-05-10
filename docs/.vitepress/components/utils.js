export default function heartAnimation(e=window, t = document, a={}) {
    const s = [];
    function animationLoop() {
        for (let i = 0; i < s.length; i++) {
            if (s[i].alpha <= 0) {
                t.body.removeChild(s[i].el);
                s.splice(i, 1);
            } else {
                s[i].y--;
                s[i].scale += .004;
                s[i].alpha -= .013;
                s[i].el.style.cssText = "left:" + s[i].x + "px;top:" + s[i].y + "px;opacity:" + s[i].alpha + ";transform:scale(" + s[i].scale + "," + s[i].scale + ") rotate(45deg);background:" + s[i].color + ";z-index:99999";
            }
        }
        requestAnimationFrame(animationLoop);
    }
    function clickHandler() {
        const previousClickHandler = typeof e.onclick === 'function' && e.onclick;
        e.onclick = function(event) {
            if (previousClickHandler) previousClickHandler();
            createHeart(event);
        };
    }
    function createHeart(event) {
        const heart = t.createElement("div");
        heart.className = "heart";
        s.push({
            el: heart,
            x: event?.clientX - 5,
            y: event?.clientY - 5,
            scale: 1,
            alpha: 1,
            color: getRandomColor()
        });
        t.body.appendChild(heart);
    }
    function addStyles(css) {
        const style = t.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(t.createTextNode(css));
        } catch (err) {
            style.styleSheet.cssText = css;
        }
        t.getElementsByTagName("head")[0].appendChild(style);
    }
    function getRandomColor() {
        return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")";
    }
    addStyles(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
    clickHandler();
    animationLoop();
}