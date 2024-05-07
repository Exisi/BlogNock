// ==UserScript==
// @name         ZhiHuNock-Q
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  BlogNock系列，知乎问答的标识优化
// @author       Exisi
// @license      MIT License
// @match        www.zhihu.com/question/*
// @supportURL   https://github.com/Exisi/BlogNock/issues/
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
	"use strict";
	const features = {
		mark: {
			question_datetime: {
				enabled: GM_getValue("question_datetime", true),
				selector: [
					"meta[itemprop='dateCreated']",
					"meta[itemprop='dateModified']",
					".QuestionHeaderActions>.ShareMenu",
				],
				icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABXCAMAAAC3HXLTAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAHLUExURQAAAJmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpmaqpqbq62uu7CxvaOks8bGz/39/f////X19qeotZqbqvDw8tLT2tTV293d4vv7+8DBy5ucq/7+/t7e46GhsPLy9LKzv97e5NDR2J2erfv7/Ofn66mqt87O1vX297+/ycTEzdPU26ytuu/v8cLCzKChsNbW3by9yPj4+fz8/bGyvubm6sXGz56frs/Q19jY3ra3wurq7qChr6Sls+Dg5fb295ydrL29yMTFzq2uulR/hS8AAABfdFJOUwAeSnhqOAERW4rK9/vqqncwv/j9QSSf2W81r/rtfxIZ+V8FWcAlGvzwadWmBvHQcj7bsHaXSZ6Z7G4xydoQqVrpercPRdNo5R039gK5eYmuwVjdp0LRcJrrHwOLIzu4MpnXbQAAAAFiS0dEZizU2SUAAAAHdElNRQfoBB4PMzHdbJcUAAADAklEQVRYw+3Z6VcSURgHYAgMcECCkU0GmSAcQ0AsNUvLpT0rK8l2XtumbLEobbOyfd/3PzfjkNzBuTP3zlzO8YO/r16eM+f1zl3esVhWsjxiXWX7H3vDajamw+lq5NyAhPM0edeYVe0+P6iF97iajbOBoLpasUNhhyE20hIFnQixVmo2HhSBIMLaBJ2bFIAw61IUbFuLBMRpX09e3TTQROrIEJYhC5TJtZG4nRJQJx2ojwuQzdfH1ZeNugBdmnXOc7jfTZ49V855fJ015BR+Ply4KJdz6TJ2yAbsrMvksD+auiJXchVfjY04uBsI4Gv4Qf6IutsjmYQhp7oiJUJgFoaYGhwD83C7ylLnEBjA0Ev5wMSwGKB7YGIYNtXCYWAD99VusCFGMGxWult4VnC/EnYBKzhqVcADzGCwo+5WPzt4GwoPAjt4CIWHGcJutMgjDGHoQWAPS9iLwBxLGHmrt4ss4ZEq3AB1gncwhXdW4V1MYc4YfL1e8PSNm+QwTY3l0q3b2mN3G5sVC5mZJZ0Ve9y68h0Elqfv3iOD9d88mL2PyvKDObJ1Ux+GhwpYfvR4imStaNSHJ+eVz1x6givHIMWWV87TZ8qHfo4ZtxeB7US3gRcvSyiMOSnvG0UbHW4iGV69rrpv3qqP2a/YpT1kMMy9W4TfY4YcoDpXLObDx8r/8BPmzeaVzZdmnvje9Xnmn/vlK+bPoZqzm4cYhm/fS/IP7OXpoMVirBYL+fnr9x/sCav2gByIApOMLTnRB5m4/NLeVkpkAftUbk0sHllUu0LGBfNwr+rNNGza7YurwolDJl0pSd9VIEoHvn8lmXHTGq1Orwk3q9UyzDQZd7W7TYZl6bBOe8ygLHXqNvQMydkkQQsy0y0xrm+1q+ennGcR0j5v/ghNeccpWvWt48R7oJC0UKVwlGydDMZpu/+JCf39lfdFLAaSmBjQLEg0WDD8iaVw7DjuKj4QPmHqo9BJ56mu2tOzmxvznmbxHWv0jM3mKvaLojhULA7bnNaVz4XLI38BDLUAuY9SUusAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDQtMzBUMTA6Mzc6MTUrMDA6MDCSbBCjAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTA0LTMwVDE1OjUxOjM2KzAwOjAwaHi86AAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNC0wNC0zMFQxNTo1MTo0OSswMDowMMPg5McAAAAASUVORK5CYII=",
			},
		},
		hidden_login: {
			enabled: GM_getValue("hidden_login", true),
			selector: [".Modal-closeButton", ".ZDI--Xmark16", "svg[width='26'][height='8']"],
		},
		hidden_app_qrcode: {
			enabled: GM_getValue("hidden_app_qrcode", true),
			selector: [".Card.AppBanner"],
		},
		hidden_footer: {
			enabled: GM_getValue("hidden_footer", true),
			selector: ["footer"],
		},
	};

	const setModal = `<div class="modal-dialog"> <div class="modal-setting" onClick="event.cancelBubble = true"> <div class="modal-header"> <h3>功能设置</h3> <span class="btn-dialog-close">×</span> </div> <div class="modal-body"> <div class="setting-item"> <span> 问答显示时间 </span> <span> <input type="checkbox" id="feature-question-datetime" aria-nock="question_datetime" /> <label for="feature-question-datetime"></label> </span> </div> <div class="setting-item"> <span> 登录提示自动隐藏 </span> <span> <input type="checkbox" id="feature-hidden-login" aria-nock="hidden_login" /> <label for="feature-hidden-login"></label> </span> </div> <div class="setting-item"> <span> 隐藏左侧移动端推荐 </span> <span> <input type="checkbox" id="feature-hidden-app-qrcode" aria-nock="hidden_app_qrcode" /> <label for="feature-hidden-app-qrcode"></label> </span> </div> <div class="setting-item"> <span> 隐藏左侧知乎 footer </span> <span> <input type="checkbox" id="feature-hidden-footer" aria-nock="hidden_footer" /> <label for="feature-hidden-footer"></label> </span> </div> </div> </div> </div>`;
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

	if (features.mark.question_datetime.enabled) {
		const questionCreatedTime = document.querySelector(features.mark.question_datetime.selector[0]);
		const questionModifiedTime = document.querySelector(
			features.mark.question_datetime.selector[0]
		);
		const rawQuestionPostTime = questionCreatedTime.getAttribute("content");
		const rawQuestionUpdateTime = questionModifiedTime.getAttribute("content");

		const questionPostTimeAgo = calculateTimeAgo(rawQuestionPostTime);
		const questionUpdateTimeAgo = calculateTimeAgo(rawQuestionUpdateTime);

		const questionPostTime = new Date(rawQuestionPostTime).toLocaleString().replaceAll("/", "-");
		const questionUpdateTime = new Date(rawQuestionUpdateTime)
			.toLocaleString()
			.replaceAll("/", "-");

		const questionPostFormattedText = `发布时间 ${questionPostTime}（${questionPostTimeAgo}）`;
		const questionUpdateFormattedText = `更新时间 ${questionUpdateTime}（${questionUpdateTimeAgo}）`;

		const icon = document.createElement("img");
		icon.src = features.mark.question_datetime.icon;
		icon.style.marginRight = "5px";
		icon.width = 15;

		const formattedTimeBox = document.createElement("div");
		formattedTimeBox.textContent = questionPostFormattedText;
		formattedTimeBox.style.color = "#8491a5";
		formattedTimeBox.style.marginLeft = "20px";
		formattedTimeBox.style.display = "flex";
		formattedTimeBox.style.alignItems = "center";
		formattedTimeBox.style.fontSize = "14px";
		formattedTimeBox.style.cursor = "pointer";
		formattedTimeBox.style.textDecoration = "underline";
		formattedTimeBox.addEventListener("click", () => {
			const formattedText =
				formattedTimeBox.textContent == questionPostFormattedText
					? questionUpdateFormattedText
					: questionPostFormattedText;

			formattedTimeBox.textContent = formattedText;
			formattedTimeBox.prepend(icon);
		});
		formattedTimeBox.prepend(icon);

		const questionHeaderShareAction = document.querySelector(
			features.mark.question_datetime.selector[2]
		);
		questionHeaderShareAction.after(formattedTimeBox);
	}

	if (features.hidden_login.enabled) {
		const createObserver = (selector, callback) => {
			const observer = new MutationObserver(() => {
				const closeBtn = document.querySelector(selector);

				if (!closeBtn) {
					return;
				}

				callback();
				observer.disconnect();
			});

			observer.observe(document.body, { childList: true, subtree: true });
		};

		createObserver(features.hidden_login.selector[0], () => {
			document.querySelector(features.hidden_login.selector[0]).click();
		});

		createObserver(features.hidden_login.selector[1], () => {
			document.querySelector(
				features.hidden_login.selector[1]
			).parentNode.parentNode.parentNode.style.display = "none";
		});

		createObserver(features.hidden_login.selector[2], () => {
			document.querySelector(features.hidden_login.selector[2]).closest("div").style.display =
				"none";
		});
	}

	if (features.hidden_app_qrcode.enabled) {
		const qrcodeBanner = document.querySelector(features.hidden_app_qrcode.selector[0]);
		qrcodeBanner.style.display = "none";
	}

	if (features.hidden_footer.enabled) {
		const footer = document.querySelector(features.hidden_footer.selector[0]);
		footer.style.display = "none";
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
