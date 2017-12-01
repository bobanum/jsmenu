/*jslint browser:true, esnext:true*/
/*global DOMObject*/
class Menu extends DOMObject {
	constructor(label) {
		super();
		this.label = label;
		this.className = "";
		this.items = {};
		this._parentMenu = null;
		this.hideLabel = false;
	}
	get id() {
		return this.getAttribute("id");
	}
	set id(val) {
		this.setAttribute("id", val);	//Will also remove if undefined
	}
	get parentMenu() {
		return this._parentMenu;
	}
	set parentMenu(val) {
		if (this._parentMenu) {
			delete this._parentMenu.items[this.label];
			this._parentMenu = null;
			if (this._dom) {
				this._dom.classList.add("menu");
			}
		}
		if (val !== undefined) {
			this._parentMenu = val;
			val.items[this.label] = this;
			if (this._dom) {
				this._dom.classList.remove("menu");
			}
		}
	}
	set evts(evts) {
		var k;
		for (k in evts) {
			if (this._dom && this._evt[k]) {
				this._dom.removeEventListener(k, this._evt[k]);
			}
		}
	}
	DOM_create() {
		var result;
		result = document.createElement("div");
		DOMObject.walk(this._attributes, result.setAttribute, result);
		DOMObject.walk(this._events, result.addEventListener, result);
		if (!this._parentMenu) {
			result.classList.add("menu");
		}
		this.DOM_label(result);
		this.DOM_items(result);
		return result;
	}
	DOM_items(container) {
		var result;
		result = document.createElement("ul");
		for (let k in this.items) {
			let li;
			li = result.appendChild(document.createElement("li"));
			li.setAttribute("tabindex", "1");
			li.appendChild(this.items[k].dom);
			DOMObject.walk(this.evt.li, li.addEventListener, li);
		}
		if (result.childElementCount === 0) {
			return null;
		}
		if (container) {
			container.appendChild(result);
		}
		return result;
	}
	DOM_label(container) {
		var result;
		result = document.createElement("span");
		if (!this.hideLabel) {
			result.innerHTML = this.label;
		}
		if (this.icon) {
			result.setAttribute("data-icon", this.icon);
		}
		if (this.hideLabel && !this.icon) {
			result.style.display = "none";
		}
		if (container) {
			container.appendChild(result);
		}
		result.classList.add("label");
		return result;
	}
	static init() {
		this.prototype.evt = {
			li: {
				click: function() {
//					this.classList.add("active");
				},
				mouseout: function() {
//					this.classList.remove("active");
				}
			}
		}
	}
}
Menu.init();
