const CHARS: string[] = [
	...new Array(10).fill("").map((d, i) => `${i}`),
	...new Array(26).fill("").map((d, i) => String.fromCodePoint(i + 65)),
].sort(() => (Math.random() > 0.5 ? 1 : -1))

function getRandomChar() {
	const { length: chartLength } = CHARS

	const i = Math.floor(Math.random() * chartLength)

	return CHARS[i]
}

function getAlpha(current: number, total: number): number {
	return current / total
}

function hanldeLoad() {
	const canvas: HTMLCanvasElement = document.querySelector("#canvas")
	const { clientWidth, clientHeight } = document.body
	canvas.width = clientWidth
	canvas.height = clientHeight
	const ctx = canvas.getContext("2d")

	const { width, height } = canvas

	const fw = 15,
		fh = 15
	function drawText(pos: number[]) {
		ctx.clearRect(0, 0, width, height)
		ctx.save()
		ctx.fillStyle = "rgb(0,0,0)"
		ctx.fillRect(0, 0, width, height)
		ctx.restore()

		ctx.save()
		ctx.fillStyle = "rgb(0, 255, 0)"
		ctx.font = "16px Arial"
		ctx.textAlign = "start"
		ctx.textBaseline = "middle"
		for (let i = fw / 2; i < width; i += fw) {
			for (let j = 0; j < height; j += fh) {
				const index = Math.floor(i / fw)

				const alpha = getAlpha(j, pos[index])

				if (pos[index] >= j) {
					ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`
				} else {
					ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
				}
				ctx.fillText(getRandomChar(), i, j)
			}
		}
		ctx.restore()
	}

	let timeCount = -1
	let currentPos = new Array(Math.floor(width / fw))
		.fill(0)
		.map(() => Math.floor(Math.random() * height))

	function animation() {
		timeCount = (timeCount + 1) % 5
		if (timeCount === 0) {
			currentPos = currentPos.map((d) =>
				d + fh > height
					? Math.floor((Math.random() * height) / 4)
					: d + fh
			)
			drawText(currentPos)
		}
		window.requestAnimationFrame(animation)
	}

	animation()
}
window.onload = hanldeLoad

window.onresize = function() {
	location.reload()
}