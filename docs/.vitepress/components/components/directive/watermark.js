import {nextTick} from 'vue'

const watermarkDirective = {
    mounted(el, binding) {
        createWatermark(el, binding.value.text)
    },
    updated(el, binding) {
        updateWatermark(el, binding.value?.text || '')
    },
    unmounted(el) {
        removeWatermark(el)
    },
}

async function createWatermark(el, text) {
    const canvasEl = el.querySelector('canvas') || document.createElement('canvas')
    const newCanvas = !el.querySelector('canvas')

    canvasEl.dataset.rendText = text

    if (!el.dataset.mutationObserverParent) {
        const mutationObserver = new MutationObserver((records) =>
            parentCheckWatermark(records, el, text),
        )
        mutationObserver.observe(el, {
            childList: true,
        })
        el.dataset.mutationObserverParent = mutationObserver
    }

    canvasEl.id = 'watermark-canvas'
    canvasEl.style.position = 'absolute'
    canvasEl.style.top = '0'
    canvasEl.style.left = '0'
    canvasEl.style.zIndex = '99'
    canvasEl.style.pointerEvents = 'none'

    const revertLs = ['display', 'opacity', 'visible', 'transform', 'clip-path']

    revertLs.forEach((v) => {
        canvasEl.style[v] = 'revert'
    })

    if (newCanvas) {
        const mutationObserver = new MutationObserver(() => canvasCheckWatermark(el, text))
        mutationObserver.observe(canvasEl, {
            attributes: true,
        })
        el.dataset.mutationObserverCanvas = mutationObserver
    }

    if (newCanvas) {
        el.appendChild(canvasEl)
    }

    canvasEl.width = window.screen.width * 0.9
    canvasEl.height = window.screen.height * 0.9
    const ctx = canvasEl.getContext('2d')
    if (!ctx) return

    ctx.rotate((-20 * Math.PI) / 180)
    ctx.font = '24px serif'
    ctx.fillStyle = 'rgba(180, 180, 180, 1)'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'

    for (let i = -canvasEl.width / 100; i < canvasEl.width / 100; i++) {
        for (let j = -canvasEl.height / 200; j < canvasEl.height / 200; j++) {
            ctx.fillText(text, i * 300, j * 300)
        }
    }
}

async function updateWatermark(el, text) {
    const canvasEl = el.querySelector('#watermark-canvas')

    if (canvasEl && canvasEl.dataset.rendText === text) return

    if (canvasEl && canvasEl.dataset.rendText !== text) {
        removeWatermark(el)
    }

    createWatermark(el, text)
}

async function parentCheckWatermark(records, el, text) {
    if (el.dataset.focusRemove) return

    const removedNodes = records[0].removedNodes
    let hasDelWatermark = false

    removedNodes.forEach((el) => {
        if (el.id === 'watermark-canvas') {
            hasDelWatermark = true
        }
    })

    if (hasDelWatermark) {
        createWatermark(el, text)
    }
}

async function canvasCheckWatermark(el, text) {
    if (el.dataset.canvasRending) return

    el.dataset.canvasRending = 'rending'
    await createWatermark(el, text)
    el.dataset.canvasRending = ''
}

async function removeWatermark(el) {
    el.dataset.focusRemove = true
    el.dataset.mutationObserverParent?.disconnect?.()
    await nextTick()
    const canvasEl = el.querySelector('#watermark-canvas')

    if (canvasEl) {
        canvasEl.dataset.mutationObserverCanvas?.disconnect?.()
        canvasEl.remove()
    }
}

export default watermarkDirective
