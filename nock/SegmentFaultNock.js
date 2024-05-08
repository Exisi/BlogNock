// ==UserScript==
// @name         SegmentFaultNock
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  BlogNock系列，思否文章的标识优化
// @author       Exisi
// @license      MIT License
// @match        segmentfault.com/a/*
// @supportURL   https://github.com/Exisi/BlogNock/issues/
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
	"use strict";
	const features = {
		mark: {
			datetime: {
				enabled: GM_getValue("datetime", true),
				selector: ["time[itemprop='datePublished']"],
				icon: "data:image/png;base64,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",
			},
			adjust_position: {
				enabled: GM_getValue("adjust_position", true),
				selector: ["time[itemprop='datePublished']"],
				icon: "data:image/png;base64,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",
			},
			readtime: {
				enabled: GM_getValue("readtime", true),
				selector: ["time[itemprop='datePublished']", "article"],
				icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAFCUlEQVRoge1YWU8bVxQ+nrFnxuMVs5iyLy4GK0AILQ1QaCqBVBLx0ERtUiEUIar2F+UxQjwgdVFQk1ZVFaFEbSpKaEExiwsB0pYQGiiLsT1je2bsqc4E0pJAwdcW6cN8yEKyfO79vrPdcy/o0KFDhw4dOgAMJD5QVRXGf54uowyGpIGikhnxo6qCrCSYfHf207KyQtFgSI2akWTPL7787lzg10c+jmOuGch8cSBkRQELb+65crnrMwBIyUFEQoLbIWduTtY1k4nI/FBgpCMRcWhzKzgCAOup2FIkG9pslpAgRPsoKnPRwFSSZQX/92ZlObZStifZFD13Y/j220+e/HWP4xiSJV4CppWZY7tbWhpGq73lW6nWCFFEEL4aTyAWi2uiMgEpLkNujmsdRZAsRyyEogxJk4nOiAjYjbKJMSrEfEgNHQ5biGWZDxKJzHRfRUmA3W4NkdoTC8nPz0larZZIIpEgXeI5kskkGI3GXnde9lPSNYiFIAoL81awTlItzBeB3crptAUrK4sjpGukJaTaWz5H03SvohCntuYEUYz1VVQUPUqHS5oRcSuve0oehsNiH0lU0AYjarGYxXPvvBlIh0taQhDd3e+O8zwrRqOxlFMMG0UkEu1vbj49mi6PtIUgOjqaRyRJvhqXpGOLwXa7sxPqq6urmmo841tJl0NGhFR7K7Y6O1puy5LcIwjR/xSjjSKKAsFguK+mpnLuwvn2XzLBgXhEOQhLS8vWH+5NtAeDYSfPc0MvCtqticu465kG32RrS8PiocRSTNOMCtnDT2P+iomJ2SWjkQaK+ifoWNhFRe62i+93/ngksZOatQ7Dysoas70dctE0/ZKf8Lt4XGJmZhbyMr1vRiNy5+79U37/fB2AOmSx8FpX2jv50cMMY4R4XNbOjeJi9/JHVy7cOZTYq0qtb779vml2ZtFnt1sHMJ0EQQSWZfCM0EhJcQnCEQFYlgWGMcHOTuSqzcaHPv3kw6/+N0IwEuPj000ul+M6RiEWjYG3uhxqT1WB252t/UYUojD/8HeYmAwATgI8b4adnXAvDp8f91+69cqFLC4t24eHRy7abJYBvDFGIiK0tjbA2bfqD7RdXV2HW1/fBUmSgec52NgM9tfVeqfOd7Xta8MnXuyjow9aTCbjAHaoUEiA+jrvoSIQBQV50PVem1Y/OCw67LbrgcCS7/HjP9O6aqYlZG7+N9fa2kYeehZbq8vlgPb2N460Ky0tgNraKhxP4NnlTB30++dPp8MlLSELC394KIoexOJGIfX1VVohHweNjT7gLZyWYmYzByur60WvTMja+mY+y5q0FLHZLFBZWXJs2yynHUqKXtPaMaZlJCxYZ2YXic8XYiHLy6tcVIxxeMihV7OznRq5VID1AuqzwlZVdXBzI+g6cSGCEOMlSf4cOxVeVVMVgcjOcTzvmxgVQRStpHyInwrjksShANhtlXuvjnvfHQWsK+1DU1o7NxiwziSOlA/ROTI9vZA3NvbgrKQoN400rZE3m1nAsURNqoB/RwHtYnjahwXNEbiGqsIlj6dksbOjeepEHrHvj081BUORm067FZKqqg2DghCD7e2w5prjUEA7FMNxrBaR3Vq7MTkZ6KsoL8T7e0oPEURCEomE0UhTIMn7Hx2O23r/DXnfGqr28BeXZO5EhHg8pYt+/3wPRRlihNl5AFSQJJXJz8/d8tVUbmRoUR06dOjQoeNoAMDfddMStWBVXeEAAAAASUVORK5CYII=",
			},
		},
	};

	const setModal = `<div class="modal-dialog"> <div class="modal-setting" onClick="event.cancelBubble = true"> <div class="modal-header"> <h3>功能设置</h3> <span class="btn-dialog-close">×</span> </div> <div class="modal-body"> <div class="setting-item"> <span> 文章显示时间优化 </span> <span> <input type="checkbox" id="feature-mark-datetime" aria-nock="datetime" /> <label for="feature-mark-datetime"></label> </span> </div> <div class="setting-item"> <span> 定位文字调整 </span> <span> <input type="checkbox" id="feature-mark-adjust-position" aria-nock="adjust_position" /> <label for="feature-mark-adjust-position"></label> </span> </div> <div class="setting-item"> <span> 点击文章阅读时长跳转文章底部 </span> <span> <input type="checkbox" id="feature-mark-readtime" aria-nock="readtime" /> <label for="feature-mark-readtime"></label> </span> </div> </div> </div> </div>`;
	const setStyle = `@keyframes fall { 0% { transform: translate(0%, -100%); opacity: 0; } 100% { transform: translate(0%, 0%); opacity: 1; } } .setting-item input[type=checkbox] { height: 0; width: 0; display: none; } .setting-item label { cursor: pointer; text-indent: -9999px; width: 40px; height: 20px; background: pink; display: block; border-radius: 100px; position: relative; } .setting-item label:after { content: ''; position: absolute; top: 2px; left: 2px; width: 15px; height: 15px; background: #fff; border-radius: 90px; transition: 0.2s; } .setting-item input:checked+label { background: #57a; } .setting-item input:checked+label:after { left: calc(100% - 2px); transform: translateX(-100%); } .setting-item label:active:after { width: 28px; } .modal-dialog { display:none; border: none; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; min-width: 100vw; min-height: 100vh; height: 100%; background-color: rgba(0, 0, 0, 0.4); } .modal-setting { width: 450px; margin: auto; background-color: #ffffff; border-radius: 5px; padding: 20px; margin-top: 40px; position: relative; box-sizing: border-box; animation: fall 0.5s ease-in-out; } .modal-header { border-bottom: 1px solid #000000; } .modal-header h3 { padding: 10px 0; margin: 0; } .modal-header span { font-size: 24px; color: #ccc; position: absolute; right: 5px; top: 0; cursor: pointer; } .setting-item { margin: 10px 0; display: flex; justify-content: space-between; }`;

	const dStyle = document.createElement("style");
	dStyle.innerHTML = setStyle;
	document.head.appendChild(dStyle);
	const modal = document.createElement("div");
	modal.innerHTML = setModal;
	document.body.appendChild(modal);

	const checkboxList = document.querySelectorAll(".setting-item input");
	Array.from(checkboxList).forEach((checkbox) => {
		const nock = checkbox.getAttribute("aria-nock");
		checkbox.checked = GM_getValue(nock, true);
	});

	const showSetting = () => (document.querySelector(".modal-dialog").style.display = "block");
	const closeSetting = () => (document.querySelector(".modal-dialog").style.display = "none");

	document.querySelector(".modal-dialog").addEventListener("click", closeSetting);
	document.querySelector(".modal-setting").addEventListener("click", (e) => e.stopPropagation());
	document.querySelector(".btn-dialog-close").addEventListener("click", closeSetting);
	document.querySelector(".modal-body").addEventListener("click", (e) => {
		if (e.target.type !== "checkbox") {
			return;
		}
		const nock = e.target.getAttribute("aria-nock");
		const flag = GM_getValue(nock) == null ? false : !GM_getValue(nock);
		GM_setValue(nock, flag);
	});
	GM_registerMenuCommand("功能设置", showSetting);

	if (features.mark.datetime.enabled) {
		const datePublished = document.querySelector(features.mark.datetime.selector[0]);
		const rawPublishedTime = datePublished.getAttribute("datetime");

		const postTimeAgo = calculateTimeAgo(rawPublishedTime);
		const postTime = new Date(rawPublishedTime).toLocaleString().replaceAll("/", "-");

		const formattedPostTime = `${postTime}（${postTimeAgo}）`;
		datePublished.style.textDecoration = "underline";
		datePublished.innerText = formattedPostTime;

		const icon = document.createElement("img");
		icon.src = features.mark.datetime.icon;
		icon.style.width = "15px";
		icon.style.marginRight = "3px";
		datePublished.before(icon);
		datePublished.parentNode.style.display = "flex";
		datePublished.parentNode.style.alignItems = "center";
	}

	if (features.mark.adjust_position.enabled && document.querySelector(features.mark.adjust_position.selector[0]).nextSibling) {
		const time = document.querySelector(features.mark.adjust_position.selector[0]);
		const position = time.nextSibling;
		const positionBox = document.createElement("a");

		const icon = document.createElement("img");
		icon.src = features.mark.adjust_position.icon;
		icon.style.width = "14px";

		positionBox.style.display = "flex";
		positionBox.style.alignItems = "center";
		positionBox.style.marginLeft = "10px";
		positionBox.style.color = "rgba(108, 117, 125)";
		positionBox.appendChild(icon);
		positionBox.appendChild(position);
		time.parentNode.after(positionBox);
	}

	if (features.mark.readtime.enabled) {
		const time = document.querySelector(features.mark.readtime.selector[0]);
		const article = document.querySelector(features.mark.readtime.selector[1]);
		const readtime = time.closest("div").lastChild;
		readtime.style.textDecoration = "underline";
		readtime.style.cursor = "pointer";
		readtime.addEventListener("click", () => article.scrollIntoView(false));
	}

	function calculateTimeAgo(datetime) {
		const SECOND = 1000;
		const MINUTE = 60 * SECOND;
		const HOUR = 60 * MINUTE;
		const DAY = 24 * HOUR;
		const MONTH = 30 * DAY;
		const YEAR = 12 * MONTH;

		const postDate = new Date(datetime);
		const currentDate = new Date();
		const timeDiff = currentDate - postDate;

		if (timeDiff >= YEAR) {
			return Math.floor(timeDiff / YEAR) + " 年前";
		}
		if (timeDiff >= MONTH) {
			return Math.floor(timeDiff / MONTH) + " 个月前";
		}
		if (timeDiff >= DAY) {
			return Math.floor(timeDiff / DAY) + " 天前";
		}
		if (timeDiff >= HOUR) {
			return Math.floor(timeDiff / HOUR) + " 小时前";
		}
		if (timeDiff >= MINUTE) {
			return Math.floor(timeDiff / MINUTE) + " 分钟前";
		}
		return Math.floor(timeDiff / SECOND) + " 秒前";
	}
})();
