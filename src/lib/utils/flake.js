export default function () {
    const ts = Date.now()
    const pid = process.pid
    const rnd = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    return `${ts}${pid}${rnd}`
}