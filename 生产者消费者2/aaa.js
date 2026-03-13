

js_scrollBy()

async function js_scrollBy() {
    for (let i = 0; i < 999999999; i++) {
        window.scrollBy(0, window.innerHeight)
        await new Promise((resolve) => setTimeout(resolve, 1.1 * 1000))
        window.scrollBy(0, window.innerHeight)
        await new Promise((resolve) => setTimeout(resolve, 1.1 * 1000))
        window.scrollBy(0, window.innerHeight)
        await new Promise((resolve) => setTimeout(resolve, 20 * 1000))
    }
}