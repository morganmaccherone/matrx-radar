function noop() {}

function assign(tar, src) {
	for (var k in src) tar[k] = src[k];
	return tar;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function destroyEach(iterations, detach) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d(detach);
	}
}

function createSvgElement(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function createText(data) {
	return document.createTextNode(data);
}

function createComment() {
	return document.createComment('');
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function setXlinkAttribute(node, attribute, value) {
	node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = noop;

	this._fragment.d(detach !== false);
	this._fragment = null;
	this._state = {};
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		var handler = handlers[i];

		if (!handler.__calling) {
			handler.__calling = true;
			handler.call(this, data);
			handler.__calling = false;
		}
	}
}

function get() {
	return this._state;
}

function init(component, options) {
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function on(eventName, handler) {
	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign(assign({}, oldState), newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		this.fire("state", { changed: changed, current: this._state, previous: oldState });
		this._fragment.p(changed, this._state);
		this.fire("update", { changed: changed, current: this._state, previous: oldState });
	}
}

function callAll(fns) {
	while (fns && fns.length) fns.shift()();
}

function _mount(target, anchor) {
	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
}

var proto = {
	destroy,
	get,
	fire,
	on,
	set,
	_recompute: noop,
	_set,
	_mount,
	_differs
};

/* src/Arc.html generated by Svelte v2.7.2 */

function p1x({innerRadius, centerX, startRadians}) {
	return centerX + (innerRadius * Math.sin(startRadians));
}

function p1y({innerRadius, centerY, startRadians}) {
	return centerY - (innerRadius * Math.cos(startRadians));
}

function p2x({innerRadius, centerX, endRadians}) {
	return centerX + (innerRadius * Math.sin(endRadians));
}

function p2y({innerRadius, centerY, endRadians}) {
	return centerY - (innerRadius * Math.cos(endRadians));
}

function p3x({outerRadius, centerX, endRadians}) {
	return centerX + (outerRadius * Math.sin(endRadians));
}

function p3y({outerRadius, centerY, endRadians}) {
	return centerY - (outerRadius * Math.cos(endRadians));
}

function p4x({outerRadius, centerX, startRadians}) {
	return centerX + (outerRadius * Math.sin(startRadians));
}

function p4y({outerRadius, centerY, startRadians}) {
	return centerY - (outerRadius * Math.cos(startRadians));
}

function arcSweep({endRadians, startRadians}) {
	return (endRadians - startRadians <= Math.PI) ? "0" : "1";
}

function pMRadius({innerRadius, outerRadius}) {
	return (innerRadius + outerRadius) / 2;
}

function pMStartX({pMRadius, centerX, startRadians}) {
	return centerX + (pMRadius * Math.sin(startRadians));
}

function pMStartY({pMRadius, centerY, startRadians}) {
	return centerY - (pMRadius * Math.cos(startRadians));
}

function pMEndX({pMRadius, centerX, endRadians}) {
	return centerX + (pMRadius * Math.sin(endRadians));
}

function pMEndY({pMRadius, centerY, endRadians}) {
	return centerY - (pMRadius * Math.cos(endRadians));
}

function data() {
  return {
    id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = crypto.getRandomValues(new Uint8Array(1))[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16)
    }),
    opacity: 1,
    label: "",
  }
}
function create_main_fragment(component, ctx) {
	var svg, defs, path, path_d_value, text, textPath, text_1, textPath_xlink_href_value;

	function select_block_type(ctx) {
		if ((ctx.startRadians > ctx.Math.PI / 2) && (ctx.endRadians < 3 * ctx.Math.PI / 2)) return create_if_block;
		return create_if_block_1;
	}

	var current_block_type = select_block_type(ctx);
	var if_block = current_block_type(component, ctx);

	return {
		c() {
			svg = createSvgElement("svg");
			defs = createSvgElement("defs");
			if_block.c();
			path = createSvgElement("path");
			text = createSvgElement("text");
			textPath = createSvgElement("textPath");
			text_1 = createText(ctx.label);
			setAttribute(path, "fill", ctx.fill);
			setAttribute(path, "opacity", ctx.opacity);
			setAttribute(path, "stroke", ctx.stroke);
			setAttribute(path, "stroke-width", ctx.strokeWidth);
			setAttribute(path, "stroke-linecap", "square");
			setAttribute(path, "d", path_d_value = "\n      M " + ctx.p1x + " " + ctx.p1y + "\n      A " + ctx.innerRadius + " " + ctx.innerRadius + " 0 " + ctx.arcSweep + " 1 " + ctx.p2x + " " + ctx.p2y + "\n      L " + ctx.p3x + " " + ctx.p3y + "\n      A " + ctx.outerRadius + " " + ctx.outerRadius + " 1 " + ctx.arcSweep + " 0 " + ctx.p4x + " " + ctx.p4y + "\n      L " + ctx.p1x + " " + ctx.p1y + "\n    ");
			setXlinkAttribute(textPath, "xlink:href", textPath_xlink_href_value = "#" + ctx.id);
			setAttribute(textPath, "alignment-baseline", "middle");
			setAttribute(textPath, "text-anchor", "middle");
			setAttribute(textPath, "startOffset", "50%");
			setAttribute(textPath, "fill", ctx.fontColor);
			setAttribute(text, "font-size", ctx.fontSize);
		},

		m(target, anchor) {
			insertNode(svg, target, anchor);
			appendNode(defs, svg);
			if_block.m(defs, null);
			appendNode(path, svg);
			appendNode(text, svg);
			appendNode(textPath, text);
			appendNode(text_1, textPath);
		},

		p(changed, ctx) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(changed, ctx);
			} else {
				if_block.d(1);
				if_block = current_block_type(component, ctx);
				if_block.c();
				if_block.m(defs, null);
			}

			if (changed.fill) {
				setAttribute(path, "fill", ctx.fill);
			}

			if (changed.opacity) {
				setAttribute(path, "opacity", ctx.opacity);
			}

			if (changed.stroke) {
				setAttribute(path, "stroke", ctx.stroke);
			}

			if (changed.strokeWidth) {
				setAttribute(path, "stroke-width", ctx.strokeWidth);
			}

			if ((changed.p1x || changed.p1y || changed.innerRadius || changed.arcSweep || changed.p2x || changed.p2y || changed.p3x || changed.p3y || changed.outerRadius || changed.p4x || changed.p4y) && path_d_value !== (path_d_value = "\n      M " + ctx.p1x + " " + ctx.p1y + "\n      A " + ctx.innerRadius + " " + ctx.innerRadius + " 0 " + ctx.arcSweep + " 1 " + ctx.p2x + " " + ctx.p2y + "\n      L " + ctx.p3x + " " + ctx.p3y + "\n      A " + ctx.outerRadius + " " + ctx.outerRadius + " 1 " + ctx.arcSweep + " 0 " + ctx.p4x + " " + ctx.p4y + "\n      L " + ctx.p1x + " " + ctx.p1y + "\n    ")) {
				setAttribute(path, "d", path_d_value);
			}

			if (changed.label) {
				text_1.data = ctx.label;
			}

			if ((changed.id) && textPath_xlink_href_value !== (textPath_xlink_href_value = "#" + ctx.id)) {
				setXlinkAttribute(textPath, "xlink:href", textPath_xlink_href_value);
			}

			if (changed.fontColor) {
				setAttribute(textPath, "fill", ctx.fontColor);
			}

			if (changed.fontSize) {
				setAttribute(text, "font-size", ctx.fontSize);
			}
		},

		d(detach) {
			if (detach) {
				detachNode(svg);
			}

			if_block.d();
		}
	};
}

// (3:4) {#if (startRadians > Math.PI / 2) && (endRadians < 3 * Math.PI / 2)}
function create_if_block(component, ctx) {
	var path, path_d_value;

	return {
		c() {
			path = createSvgElement("path");
			setAttribute(path, "id", ctx.id);
			setAttribute(path, "d", path_d_value = "\n          M " + ctx.pMEndX + " " + ctx.pMEndY + "\n          A " + ctx.pMRadius + " " + ctx.pMRadius + " 1 " + ctx.arcSweep + " 0 " + ctx.pMStartX + " " + ctx.pMStartY + "\n        ");
		},

		m(target, anchor) {
			insertNode(path, target, anchor);
		},

		p(changed, ctx) {
			if (changed.id) {
				setAttribute(path, "id", ctx.id);
			}

			if ((changed.pMEndX || changed.pMEndY || changed.pMRadius || changed.arcSweep || changed.pMStartX || changed.pMStartY) && path_d_value !== (path_d_value = "\n          M " + ctx.pMEndX + " " + ctx.pMEndY + "\n          A " + ctx.pMRadius + " " + ctx.pMRadius + " 1 " + ctx.arcSweep + " 0 " + ctx.pMStartX + " " + ctx.pMStartY + "\n        ")) {
				setAttribute(path, "d", path_d_value);
			}
		},

		d(detach) {
			if (detach) {
				detachNode(path);
			}
		}
	};
}

// (11:4) {:else}
function create_if_block_1(component, ctx) {
	var path, path_d_value;

	return {
		c() {
			path = createSvgElement("path");
			setAttribute(path, "id", ctx.id);
			setAttribute(path, "d", path_d_value = "\n          M " + ctx.pMStartX + " " + ctx.pMStartY + "\n          A " + ctx.pMRadius + " " + ctx.pMRadius + " 0 " + ctx.arcSweep + " 1 " + ctx.pMEndX + " " + ctx.pMEndY + "\n        ");
		},

		m(target, anchor) {
			insertNode(path, target, anchor);
		},

		p(changed, ctx) {
			if (changed.id) {
				setAttribute(path, "id", ctx.id);
			}

			if ((changed.pMStartX || changed.pMStartY || changed.pMRadius || changed.arcSweep || changed.pMEndX || changed.pMEndY) && path_d_value !== (path_d_value = "\n          M " + ctx.pMStartX + " " + ctx.pMStartY + "\n          A " + ctx.pMRadius + " " + ctx.pMRadius + " 0 " + ctx.arcSweep + " 1 " + ctx.pMEndX + " " + ctx.pMEndY + "\n        ")) {
				setAttribute(path, "d", path_d_value);
			}
		},

		d(detach) {
			if (detach) {
				detachNode(path);
			}
		}
	};
}

function Arc(options) {
	init(this, options);
	this._state = assign(assign({ Math : Math }, data()), options.data);
	this._recompute({ innerRadius: 1, centerX: 1, startRadians: 1, centerY: 1, endRadians: 1, outerRadius: 1, pMRadius: 1 }, this._state);
	this._intro = true;

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);
	}
}

assign(Arc.prototype, proto);

Arc.prototype._recompute = function _recompute(changed, state) {
	if (changed.innerRadius || changed.centerX || changed.startRadians) {
		if (this._differs(state.p1x, (state.p1x = p1x(state)))) changed.p1x = true;
	}

	if (changed.innerRadius || changed.centerY || changed.startRadians) {
		if (this._differs(state.p1y, (state.p1y = p1y(state)))) changed.p1y = true;
	}

	if (changed.innerRadius || changed.centerX || changed.endRadians) {
		if (this._differs(state.p2x, (state.p2x = p2x(state)))) changed.p2x = true;
	}

	if (changed.innerRadius || changed.centerY || changed.endRadians) {
		if (this._differs(state.p2y, (state.p2y = p2y(state)))) changed.p2y = true;
	}

	if (changed.outerRadius || changed.centerX || changed.endRadians) {
		if (this._differs(state.p3x, (state.p3x = p3x(state)))) changed.p3x = true;
	}

	if (changed.outerRadius || changed.centerY || changed.endRadians) {
		if (this._differs(state.p3y, (state.p3y = p3y(state)))) changed.p3y = true;
	}

	if (changed.outerRadius || changed.centerX || changed.startRadians) {
		if (this._differs(state.p4x, (state.p4x = p4x(state)))) changed.p4x = true;
	}

	if (changed.outerRadius || changed.centerY || changed.startRadians) {
		if (this._differs(state.p4y, (state.p4y = p4y(state)))) changed.p4y = true;
	}

	if (changed.endRadians || changed.startRadians) {
		if (this._differs(state.arcSweep, (state.arcSweep = arcSweep(state)))) changed.arcSweep = true;
	}

	if (changed.innerRadius || changed.outerRadius) {
		if (this._differs(state.pMRadius, (state.pMRadius = pMRadius(state)))) changed.pMRadius = true;
	}

	if (changed.pMRadius || changed.centerX || changed.startRadians) {
		if (this._differs(state.pMStartX, (state.pMStartX = pMStartX(state)))) changed.pMStartX = true;
	}

	if (changed.pMRadius || changed.centerY || changed.startRadians) {
		if (this._differs(state.pMStartY, (state.pMStartY = pMStartY(state)))) changed.pMStartY = true;
	}

	if (changed.pMRadius || changed.centerX || changed.endRadians) {
		if (this._differs(state.pMEndX, (state.pMEndX = pMEndX(state)))) changed.pMEndX = true;
	}

	if (changed.pMRadius || changed.centerY || changed.endRadians) {
		if (this._differs(state.pMEndY, (state.pMEndY = pMEndY(state)))) changed.pMEndY = true;
	}
};

/* src/Slice.html generated by Svelte v2.7.2 */

function dataOuterRadius({outerRadius, labelBandHeight}) {
	return outerRadius - labelBandHeight;
}

function levelsAnnotated({levels, innerRadius, dataOuterRadius}) {
  let levelsAnnotated = [];
  let total = 0;
  let count = 0;
  for (let level of levels) {
    count++;
    total += level.portion;
  }
  let dataRangeRadius = dataOuterRadius - innerRadius;
  let lastAnnotatedLevel = null;
  let i = 0;
  for (let level of levels) {
    let currentAnnotatedLevel = {};
    if (lastAnnotatedLevel) {
      currentAnnotatedLevel.innerRadius = lastAnnotatedLevel.outerRadius;
      currentAnnotatedLevel.opacity = (count - i - 1) / (count - 1);
    } else {
      currentAnnotatedLevel.innerRadius = innerRadius;
      currentAnnotatedLevel.opacity = 1;
    }
    currentAnnotatedLevel.outerRadius = currentAnnotatedLevel.innerRadius + dataRangeRadius * (level.portion / total);
    levelsAnnotated.push(currentAnnotatedLevel);
    lastAnnotatedLevel = currentAnnotatedLevel;
    i++;
  }
  return levelsAnnotated
}

function data$1() {
  return {
  }
}
function create_main_fragment$1(component, ctx) {
	var svg, each_anchor;

	var arc_initial_data = {
	 	centerX: ctx.centerX,
	 	centerY: ctx.centerY,
	 	startRadians: ctx.startRadians,
	 	endRadians: ctx.endRadians,
	 	innerRadius: ctx.dataOuterRadius,
	 	outerRadius: ctx.outerRadius,
	 	label: ctx.label,
	 	fontColor: ctx.fontColor,
	 	fontSize: ctx.fontSize,
	 	strokeWidth: ctx.strokeWidth,
	 	fill: "none",
	 	stroke: ctx.stroke
	 };
	var arc = new Arc({
		root: component.root,
		data: arc_initial_data
	});

	var each_value = ctx.levelsAnnotated;

	var each_blocks = [];

	for (var i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(component, get_each_context(ctx, each_value, i));
	}

	var arc_1_initial_data = {
	 	centerX: ctx.centerX,
	 	centerY: ctx.centerY,
	 	startRadians: ctx.startRadians,
	 	endRadians: ctx.endRadians,
	 	innerRadius: ctx.innerRadius,
	 	outerRadius: ctx.dataOuterRadius,
	 	strokeWidth: ctx.strokeWidth,
	 	fill: "none",
	 	stroke: ctx.stroke
	 };
	var arc_1 = new Arc({
		root: component.root,
		data: arc_1_initial_data
	});

	return {
		c() {
			svg = createSvgElement("svg");
			arc._fragment.c();

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_anchor = createComment();
			arc_1._fragment.c();
		},

		m(target, anchor) {
			insertNode(svg, target, anchor);
			arc._mount(svg, null);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(svg, null);
			}

			appendNode(each_anchor, svg);
			arc_1._mount(svg, null);
		},

		p(changed, ctx) {
			var arc_changes = {};
			if (changed.centerX) arc_changes.centerX = ctx.centerX;
			if (changed.centerY) arc_changes.centerY = ctx.centerY;
			if (changed.startRadians) arc_changes.startRadians = ctx.startRadians;
			if (changed.endRadians) arc_changes.endRadians = ctx.endRadians;
			if (changed.dataOuterRadius) arc_changes.innerRadius = ctx.dataOuterRadius;
			if (changed.outerRadius) arc_changes.outerRadius = ctx.outerRadius;
			if (changed.label) arc_changes.label = ctx.label;
			if (changed.fontColor) arc_changes.fontColor = ctx.fontColor;
			if (changed.fontSize) arc_changes.fontSize = ctx.fontSize;
			if (changed.strokeWidth) arc_changes.strokeWidth = ctx.strokeWidth;
			if (changed.stroke) arc_changes.stroke = ctx.stroke;
			arc._set(arc_changes);

			if (changed.centerX || changed.centerY || changed.startRadians || changed.endRadians || changed.levelsAnnotated || changed.baseColor) {
				each_value = ctx.levelsAnnotated;

				for (var i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(changed, child_ctx);
					} else {
						each_blocks[i] = create_each_block(component, child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(svg, each_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}
				each_blocks.length = each_value.length;
			}

			var arc_1_changes = {};
			if (changed.centerX) arc_1_changes.centerX = ctx.centerX;
			if (changed.centerY) arc_1_changes.centerY = ctx.centerY;
			if (changed.startRadians) arc_1_changes.startRadians = ctx.startRadians;
			if (changed.endRadians) arc_1_changes.endRadians = ctx.endRadians;
			if (changed.innerRadius) arc_1_changes.innerRadius = ctx.innerRadius;
			if (changed.dataOuterRadius) arc_1_changes.outerRadius = ctx.dataOuterRadius;
			if (changed.strokeWidth) arc_1_changes.strokeWidth = ctx.strokeWidth;
			if (changed.stroke) arc_1_changes.stroke = ctx.stroke;
			arc_1._set(arc_1_changes);
		},

		d(detach) {
			if (detach) {
				detachNode(svg);
			}

			arc.destroy();

			destroyEach(each_blocks, detach);

			arc_1.destroy();
		}
	};
}

// (6:2) {#each levelsAnnotated as level}
function create_each_block(component, ctx) {

	var arc_initial_data = {
	 	centerX: ctx.centerX,
	 	centerY: ctx.centerY,
	 	startRadians: ctx.startRadians,
	 	endRadians: ctx.endRadians,
	 	innerRadius: ctx.level.innerRadius,
	 	outerRadius: ctx.level.outerRadius,
	 	fill: ctx.baseColor,
	 	opacity: ctx.level.opacity,
	 	stroke: "none"
	 };
	var arc = new Arc({
		root: component.root,
		data: arc_initial_data
	});

	return {
		c() {
			arc._fragment.c();
		},

		m(target, anchor) {
			arc._mount(target, anchor);
		},

		p(changed, ctx) {
			var arc_changes = {};
			if (changed.centerX) arc_changes.centerX = ctx.centerX;
			if (changed.centerY) arc_changes.centerY = ctx.centerY;
			if (changed.startRadians) arc_changes.startRadians = ctx.startRadians;
			if (changed.endRadians) arc_changes.endRadians = ctx.endRadians;
			if (changed.levelsAnnotated) arc_changes.innerRadius = ctx.level.innerRadius;
			if (changed.levelsAnnotated) arc_changes.outerRadius = ctx.level.outerRadius;
			if (changed.baseColor) arc_changes.fill = ctx.baseColor;
			if (changed.levelsAnnotated) arc_changes.opacity = ctx.level.opacity;
			arc._set(arc_changes);
		},

		d(detach) {
			arc.destroy(detach);
		}
	};
}

function get_each_context(ctx, list, i) {
	const child_ctx = Object.create(ctx);
	child_ctx.level = list[i];
	child_ctx.each_value = list;
	child_ctx.level_index = i;
	return child_ctx;
}

function Slice(options) {
	init(this, options);
	this._state = assign(data$1(), options.data);
	this._recompute({ outerRadius: 1, labelBandHeight: 1, levels: 1, innerRadius: 1, dataOuterRadius: 1 }, this._state);
	this._intro = true;

	if (!options.root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment$1(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(Slice.prototype, proto);

Slice.prototype._recompute = function _recompute(changed, state) {
	if (changed.outerRadius || changed.labelBandHeight) {
		if (this._differs(state.dataOuterRadius, (state.dataOuterRadius = dataOuterRadius(state)))) changed.dataOuterRadius = true;
	}

	if (changed.levels || changed.innerRadius || changed.dataOuterRadius) {
		if (this._differs(state.levelsAnnotated, (state.levelsAnnotated = levelsAnnotated(state)))) changed.levelsAnnotated = true;
	}
};

/* src/Radar.html generated by Svelte v2.7.2 */

function junk(s) {
  console.log(s.diciplineFontColor);
}

function disciplinesAnnotated({disciplines}) {
  let disciplinesAnnotated = disciplines;
  let practiceCount = 0;
  for (let discipline of disciplines) {
    for (let practice of discipline.practices) {
      practiceCount++;
    }
  }

  let sliceWidth = Math.PI * 2 / practiceCount;

  let currentAngle = 0;
  for (let discipline of disciplines) {
    discipline.startRadians = currentAngle;
    for (let practice of discipline.practices) {
      practice.startRadians = currentAngle;
      currentAngle += sliceWidth;
      practice.endRadians = currentAngle;
    }
    discipline.endRadians = currentAngle;
  }

  return disciplinesAnnotated
}

function data$2() {
  return {
    centerX: 50,
    centerY: 50,
    practiceStroke: "#999999",
    disciplineStroke: "#555555",
    strokeWidth: 0.15,
    baseColor: "#2E8468",
    fontColor: "#22644E",
    fontSize: 3,
    diciplineFontColor: "#184738",
    innerRadius: 10,
    outerRadius: 49,
    disciplineBandHeight: 7,
    practiceBandHeight: 5,
  }
}
function create_main_fragment$2(component, ctx) {
	var svg;

	var each_value = ctx.disciplinesAnnotated;

	var each_blocks = [];

	for (var i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(component, get_each_context$1(ctx, each_value, i));
	}

	return {
		c() {
			svg = createSvgElement("svg");

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}
			setAttribute(svg, "version", "1.1");
			setAttribute(svg, "viewBox", "0 0 100 100");
			setAttribute(svg, "preserveAspectRatio", "xMinYMin meet");
		},

		m(target, anchor) {
			insertNode(svg, target, anchor);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(svg, null);
			}
		},

		p(changed, ctx) {
			if (changed.disciplinesAnnotated || changed.centerX || changed.centerY || changed.innerRadius || changed.outerRadius || changed.disciplineBandHeight || changed.practiceBandHeight || changed.practiceStroke || changed.strokeWidth || changed.baseColor || changed.fontColor || changed.fontSize || changed.disciplineStroke || changed.diciplineFontColor) {
				each_value = ctx.disciplinesAnnotated;

				for (var i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(changed, child_ctx);
					} else {
						each_blocks[i] = create_each_block$1(component, child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(svg, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}
				each_blocks.length = each_value.length;
			}
		},

		d(detach) {
			if (detach) {
				detachNode(svg);
			}

			destroyEach(each_blocks, detach);
		}
	};
}

// (3:2) {#each disciplinesAnnotated as discipline}
function create_each_block$1(component, ctx) {
	var each_anchor;

	var each_value_1 = ctx.discipline.practices;

	var each_blocks = [];

	for (var i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(component, get_each_context_1(ctx, each_value_1, i));
	}

	var arc_initial_data = {
	 	centerX: ctx.centerX,
	 	centerY: ctx.centerY,
	 	startRadians: ctx.discipline.startRadians,
	 	endRadians: ctx.discipline.endRadians,
	 	innerRadius: ctx.outerRadius-ctx.disciplineBandHeight,
	 	outerRadius: ctx.outerRadius,
	 	labelBandHeight: ctx.disciplineBandHeight,
	 	fill: "none",
	 	strokeWidth: ctx.strokeWidth * 2,
	 	stroke: ctx.disciplineStroke,
	 	label: ctx.discipline.discipline,
	 	fontColor: ctx.diciplineFontColor,
	 	fontSize: ctx.fontSize
	 };
	var arc = new Arc({
		root: component.root,
		data: arc_initial_data
	});

	var arc_1_initial_data = {
	 	centerX: ctx.centerX,
	 	centerY: ctx.centerY,
	 	startRadians: ctx.discipline.startRadians,
	 	endRadians: ctx.discipline.endRadians,
	 	outerRadius: ctx.outerRadius,
	 	innerRadius: ctx.innerRadius,
	 	fill: "none",
	 	strokeWidth: ctx.strokeWidth * 2,
	 	stroke: ctx.disciplineStroke
	 };
	var arc_1 = new Arc({
		root: component.root,
		data: arc_1_initial_data
	});

	return {
		c() {
			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_anchor = createComment();
			arc._fragment.c();
			arc_1._fragment.c();
		},

		m(target, anchor) {
			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insertNode(each_anchor, target, anchor);
			arc._mount(target, anchor);
			arc_1._mount(target, anchor);
		},

		p(changed, ctx) {
			if (changed.centerX || changed.centerY || changed.disciplinesAnnotated || changed.innerRadius || changed.outerRadius || changed.disciplineBandHeight || changed.practiceBandHeight || changed.practiceStroke || changed.strokeWidth || changed.baseColor || changed.fontColor || changed.fontSize) {
				each_value_1 = ctx.discipline.practices;

				for (var i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(changed, child_ctx);
					} else {
						each_blocks[i] = create_each_block_1(component, child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_anchor.parentNode, each_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}
				each_blocks.length = each_value_1.length;
			}

			var arc_changes = {};
			if (changed.centerX) arc_changes.centerX = ctx.centerX;
			if (changed.centerY) arc_changes.centerY = ctx.centerY;
			if (changed.disciplinesAnnotated) arc_changes.startRadians = ctx.discipline.startRadians;
			if (changed.disciplinesAnnotated) arc_changes.endRadians = ctx.discipline.endRadians;
			if (changed.outerRadius || changed.disciplineBandHeight) arc_changes.innerRadius = ctx.outerRadius-ctx.disciplineBandHeight;
			if (changed.outerRadius) arc_changes.outerRadius = ctx.outerRadius;
			if (changed.disciplineBandHeight) arc_changes.labelBandHeight = ctx.disciplineBandHeight;
			if (changed.strokeWidth) arc_changes.strokeWidth = ctx.strokeWidth * 2;
			if (changed.disciplineStroke) arc_changes.stroke = ctx.disciplineStroke;
			if (changed.disciplinesAnnotated) arc_changes.label = ctx.discipline.discipline;
			if (changed.diciplineFontColor) arc_changes.fontColor = ctx.diciplineFontColor;
			if (changed.fontSize) arc_changes.fontSize = ctx.fontSize;
			arc._set(arc_changes);

			var arc_1_changes = {};
			if (changed.centerX) arc_1_changes.centerX = ctx.centerX;
			if (changed.centerY) arc_1_changes.centerY = ctx.centerY;
			if (changed.disciplinesAnnotated) arc_1_changes.startRadians = ctx.discipline.startRadians;
			if (changed.disciplinesAnnotated) arc_1_changes.endRadians = ctx.discipline.endRadians;
			if (changed.outerRadius) arc_1_changes.outerRadius = ctx.outerRadius;
			if (changed.innerRadius) arc_1_changes.innerRadius = ctx.innerRadius;
			if (changed.strokeWidth) arc_1_changes.strokeWidth = ctx.strokeWidth * 2;
			if (changed.disciplineStroke) arc_1_changes.stroke = ctx.disciplineStroke;
			arc_1._set(arc_1_changes);
		},

		d(detach) {
			destroyEach(each_blocks, detach);

			if (detach) {
				detachNode(each_anchor);
			}

			arc.destroy(detach);
			arc_1.destroy(detach);
		}
	};
}

// (5:4) {#each discipline.practices as practice}
function create_each_block_1(component, ctx) {

	var slice_initial_data = {
	 	centerX: ctx.centerX,
	 	centerY: ctx.centerY,
	 	startRadians: ctx.practice.startRadians,
	 	endRadians: ctx.practice.endRadians,
	 	innerRadius: ctx.innerRadius,
	 	outerRadius: ctx.outerRadius-ctx.disciplineBandHeight,
	 	levels: ctx.practice.levels,
	 	label: ctx.practice.practice,
	 	labelBandHeight: ctx.practiceBandHeight,
	 	stroke: ctx.practiceStroke,
	 	strokeWidth: ctx.strokeWidth,
	 	baseColor: ctx.baseColor,
	 	fontColor: ctx.fontColor,
	 	fontSize: ctx.fontSize
	 };
	var slice = new Slice({
		root: component.root,
		data: slice_initial_data
	});

	return {
		c() {
			slice._fragment.c();
		},

		m(target, anchor) {
			slice._mount(target, anchor);
		},

		p(changed, ctx) {
			var slice_changes = {};
			if (changed.centerX) slice_changes.centerX = ctx.centerX;
			if (changed.centerY) slice_changes.centerY = ctx.centerY;
			if (changed.disciplinesAnnotated) slice_changes.startRadians = ctx.practice.startRadians;
			if (changed.disciplinesAnnotated) slice_changes.endRadians = ctx.practice.endRadians;
			if (changed.innerRadius) slice_changes.innerRadius = ctx.innerRadius;
			if (changed.outerRadius || changed.disciplineBandHeight) slice_changes.outerRadius = ctx.outerRadius-ctx.disciplineBandHeight;
			if (changed.disciplinesAnnotated) slice_changes.levels = ctx.practice.levels;
			if (changed.disciplinesAnnotated) slice_changes.label = ctx.practice.practice;
			if (changed.practiceBandHeight) slice_changes.labelBandHeight = ctx.practiceBandHeight;
			if (changed.practiceStroke) slice_changes.stroke = ctx.practiceStroke;
			if (changed.strokeWidth) slice_changes.strokeWidth = ctx.strokeWidth;
			if (changed.baseColor) slice_changes.baseColor = ctx.baseColor;
			if (changed.fontColor) slice_changes.fontColor = ctx.fontColor;
			if (changed.fontSize) slice_changes.fontSize = ctx.fontSize;
			slice._set(slice_changes);
		},

		d(detach) {
			slice.destroy(detach);
		}
	};
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = Object.create(ctx);
	child_ctx.discipline = list[i];
	child_ctx.each_value = list;
	child_ctx.discipline_index = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = Object.create(ctx);
	child_ctx.practice = list[i];
	child_ctx.each_value_1 = list;
	child_ctx.practice_index = i;
	return child_ctx;
}

function Radar(options) {
	init(this, options);
	this._state = assign(data$2(), options.data);
	this._recompute({ disciplines: 1 }, this._state);
	this._intro = true;

	if (!options.root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment$2(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(Radar.prototype, proto);

Radar.prototype._recompute = function _recompute(changed, state) {
	if (changed.disciplines) {
		if (this._differs(state.disciplinesAnnotated, (state.disciplinesAnnotated = disciplinesAnnotated(state)))) changed.disciplinesAnnotated = true;
	}

	if (this._differs(state.junk, (state.junk = junk(state)))) changed.junk = true;
};

export default Radar;
//# sourceMappingURL=matrx-radar.mjs.map
