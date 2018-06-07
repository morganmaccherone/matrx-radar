import Radar from './Radar.html';

var app = new Radar({
	target: document.body,
	data: {
		Slices: [
			{startAngle: 0, endAngle: Math.Pi / 4}
		]
	}
});

export default app;
