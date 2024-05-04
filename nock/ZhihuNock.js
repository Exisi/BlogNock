// ==UserScript==
// @name         ZhiHuNock
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  BlogNock系列，知乎文章的标识优化
// @author       Exisi
// @license      MIT License
// @match        zhuanlan.zhihu.com/p/*
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
				selector: [".ContentItem-time", ".Post-Header"],
				icon: "data:image/png;base64,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",
			},
			readtime: {
				enabled: GM_getValue("readtime", true),
				selector: [".Post-RichText", ".Post-NormalMain"],
				icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAFCUlEQVRoge1YWU8bVxQ+nrFnxuMVs5iyLy4GK0AILQ1QaCqBVBLx0ERtUiEUIar2F+UxQjwgdVFQk1ZVFaFEbSpKaEExiwsB0pYQGiiLsT1je2bsqc4E0pJAwdcW6cN8yEKyfO79vrPdcy/o0KFDhw4dOgAMJD5QVRXGf54uowyGpIGikhnxo6qCrCSYfHf207KyQtFgSI2akWTPL7787lzg10c+jmOuGch8cSBkRQELb+65crnrMwBIyUFEQoLbIWduTtY1k4nI/FBgpCMRcWhzKzgCAOup2FIkG9pslpAgRPsoKnPRwFSSZQX/92ZlObZStifZFD13Y/j220+e/HWP4xiSJV4CppWZY7tbWhpGq73lW6nWCFFEEL4aTyAWi2uiMgEpLkNujmsdRZAsRyyEogxJk4nOiAjYjbKJMSrEfEgNHQ5biGWZDxKJzHRfRUmA3W4NkdoTC8nPz0larZZIIpEgXeI5kskkGI3GXnde9lPSNYiFIAoL81awTlItzBeB3crptAUrK4sjpGukJaTaWz5H03SvohCntuYEUYz1VVQUPUqHS5oRcSuve0oehsNiH0lU0AYjarGYxXPvvBlIh0taQhDd3e+O8zwrRqOxlFMMG0UkEu1vbj49mi6PtIUgOjqaRyRJvhqXpGOLwXa7sxPqq6urmmo841tJl0NGhFR7K7Y6O1puy5LcIwjR/xSjjSKKAsFguK+mpnLuwvn2XzLBgXhEOQhLS8vWH+5NtAeDYSfPc0MvCtqticu465kG32RrS8PiocRSTNOMCtnDT2P+iomJ2SWjkQaK+ifoWNhFRe62i+93/ngksZOatQ7Dysoas70dctE0/ZKf8Lt4XGJmZhbyMr1vRiNy5+79U37/fB2AOmSx8FpX2jv50cMMY4R4XNbOjeJi9/JHVy7cOZTYq0qtb779vml2ZtFnt1sHMJ0EQQSWZfCM0EhJcQnCEQFYlgWGMcHOTuSqzcaHPv3kw6/+N0IwEuPj000ul+M6RiEWjYG3uhxqT1WB252t/UYUojD/8HeYmAwATgI8b4adnXAvDp8f91+69cqFLC4t24eHRy7abJYBvDFGIiK0tjbA2bfqD7RdXV2HW1/fBUmSgec52NgM9tfVeqfOd7Xta8MnXuyjow9aTCbjAHaoUEiA+jrvoSIQBQV50PVem1Y/OCw67LbrgcCS7/HjP9O6aqYlZG7+N9fa2kYeehZbq8vlgPb2N460Ky0tgNraKhxP4NnlTB30++dPp8MlLSELC394KIoexOJGIfX1VVohHweNjT7gLZyWYmYzByur60WvTMja+mY+y5q0FLHZLFBZWXJs2yynHUqKXtPaMaZlJCxYZ2YXic8XYiHLy6tcVIxxeMihV7OznRq5VID1AuqzwlZVdXBzI+g6cSGCEOMlSf4cOxVeVVMVgcjOcTzvmxgVQRStpHyInwrjksShANhtlXuvjnvfHQWsK+1DU1o7NxiwziSOlA/ROTI9vZA3NvbgrKQoN400rZE3m1nAsURNqoB/RwHtYnjahwXNEbiGqsIlj6dksbOjeepEHrHvj081BUORm067FZKqqg2DghCD7e2w5prjUEA7FMNxrBaR3Vq7MTkZ6KsoL8T7e0oPEURCEomE0UhTIMn7Hx2O23r/DXnfGqr28BeXZO5EhHg8pYt+/3wPRRlihNl5AFSQJJXJz8/d8tVUbmRoUR06dOjQoeNoAMDfddMStWBVXeEAAAAASUVORK5CYII=",
			},
		},
		action_btn_adjust: {
			enabled: GM_getValue("action_btn_adjust", true),
			selector: [
				".ContentItem-actions",
				".BottomActions-CommentBtn",
				".Post-Main",
				".AppHeader-profileAvatar",
			],
		},
		hidden_login: {
			enabled: GM_getValue("login_hidden", true),
			selector: [".Modal-closeButton", ".ZDI--Xmark16", "svg[width='26'][height='8']"],
		},
	};

	const setModal = `<dialog class="modal-dialog"> <div class="modal-setting" onClick="event.cancelBubble = true"> <div class="modal-header"> <h3>功能设置</h3> <span class="btn-dialog-close">×</span> </div> <div class="modal-body"> <div class="setting-item"> <span> 文章显示时间优化 </span> <span> <input type="checkbox" id="feature-mark-datetime" aria-nock="datetime" /> <label for="feature-mark-datetime"></label> </span> </div> <div class="setting-item"> <span> 文章阅读时长 </span> <span> <input type="checkbox" id="feature-mark-readtime" aria-nock="readtime" /> <label for="feature-mark-readtime"></label> </span> </div> <div class="setting-item"> <span> 知乎文章按钮位置调整 </span> <span> <input type="checkbox" id="feature-action-btn-adjust" aria-nock="action_btn_adjust" /> <label for="feature-action-btn-adjust"></label> </span> </div> <div class="setting-item"> <span> 登录提示自动隐藏 </span> <span> <input type="checkbox" id="feature-login-hidden" aria-nock="login_hidden" /> <label for="feature-login-hidden"></label> </span> </div> </div> </div> </dialog>`;
	const setStyle = `@keyframes fall { 0% { transform: translate(0%, -100%); opacity: 0; } 100% { transform: translate(0%, 0%); opacity: 1; } } .setting-item input[type=checkbox] { height: 0; width: 0; display: none; } .setting-item label { cursor: pointer; text-indent: -9999px; width: 40px; height: 20px; background: pink; display: block; border-radius: 100px; position: relative; } .setting-item label:after { content: ''; position: absolute; top: 2px; left: 2px; width: 15px; height: 15px; background: #fff; border-radius: 90px; transition: 0.2s; } .setting-item input:checked+label { background: #57a; } .setting-item input:checked+label:after { left: calc(100% - 2px); transform: translateX(-100%); } .setting-item label:active:after { width: 28px; } .modal-dialog { border: none; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; min-width: 100vw; min-height: 100vh; height: 100%; background-color: rgba(0, 0, 0, 0.4); } .modal-setting { width: 450px; margin: auto; background-color: #ffffff; border-radius: 5px; padding: 20px; margin-top: 40px; position: relative; box-sizing: border-box; animation: fall 0.5s ease-in-out; } .modal-header { border-bottom: 1px solid #000000; } .modal-header h3 { padding: 10px 0; margin: 0; } .modal-header span { font-size: 24px; color: #ccc; position: absolute; right: 5px; top: 0; cursor: pointer; } .setting-item { margin: 10px 0; display: flex; justify-content: space-between; }`;

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

	const showSetting = () => document.querySelector(".modal-dialog").show();
	const closeSetting = () => document.querySelector(".modal-dialog").close();

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

	const messageblock = document.createElement("div");
	if (features.mark.datetime.enabled) {
		const getRawTimeAgo = (element) => calculateTimeAgo(element.innerText.match(regex)[0]);

		const postTime = document.querySelector(features.mark.datetime.selector[0]);
		const regex = /\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}/g;
		const rawTimeAgo = getRawTimeAgo(postTime);

		const icon = document.createElement("img");
		icon.src = features.mark.datetime.icon;
		icon.width = 15;
		icon.style.marginRight = "5px";

		const formattedTimeElement = document.createElement("span");
		formattedTimeElement.textContent = `（${rawTimeAgo}）`;

		const originalClick = postTime.onclick;
		postTime.style.marginTop = 0;
		postTime.style.cursor = "pointer";
		postTime.style.textDecoration = "underline";
		postTime.style.display = "inline-flex";
		postTime.style.alignItems = "center";
		postTime.prepend(icon);
		postTime.appendChild(formattedTimeElement);
		postTime.addEventListener("click", () => {
			originalClick();
			setTimeout(() => {
				const time = document.querySelector(features.mark.datetime.selector[0]);
				const rawTimeAgo = getRawTimeAgo(time);
				formattedTimeElement.textContent = `（${rawTimeAgo}）`;
			}, 50);
		});
		messageblock.appendChild(postTime);
	}

	if (features.mark.readtime.enabled) {
		const readbox = document.createElement("div");
		const textCount = document.querySelector(features.mark.readtime.selector[0]).innerText.length;
		const readtime = textCount / 400;
		if (readtime >= 1440) {
			const days = Math.floor(readtime / 1440);
			readbox.innerHTML = `<img src=${features.mark.readtime.icon} width='20'><span style='cursor:pointer;'> 预计阅读时长 ${days} 天</span>`;
		}

		if (readtime >= 60) {
			const hours = Math.floor(readtime / 60);
			const minutes = Math.floor(readtime % 60);
			readbox.innerHTML = `<img src=${features.mark.readtime.icon} width='20'><span style='cursor:pointer;'> 预计阅读时长 ${hours} 小时 ${minutes} 分钟</span>`;
		}

		if (readtime >= 1) {
			const minutes = Math.round(readtime);
			readbox.innerHTML = `<img src=${features.mark.readtime.icon} width='20'><span style='cursor:pointer;'> 预计阅读时长 ${minutes} 分钟</span>`;
		}

		if (readtime < 1) {
			const seconds = Math.round(readtime * 60);
			readbox.innerHTML = `<img src=${features.mark.readtime.icon} width='20'><span style='cursor:pointer;'> 预计阅读时长 ${seconds} 秒</span>`;
		}
		readbox.style.textDecoration = "underline";
		readbox.style.display = "inline-flex";
		readbox.style.color = "#8491a5";
		readbox.style.fontSize = "14px";
		readbox.style.alignItems = "center";
		readbox.addEventListener("click", () =>
			document.querySelector(features.mark.readtime.selector[1]).scrollIntoView(false)
		);

		messageblock.appendChild(readbox);
	}

	if (features.action_btn_adjust.enabled) {
		const style = document.createElement("style");
		style.textContent = ".RichContent-actions.is-fixed { position: inherit !important; }";
		document.head.appendChild(style);

		const contentItemActions = document.querySelector(features.action_btn_adjust.selector[0]);
		const clonedContentItemActions = contentItemActions.cloneNode(true);

		Array.from(contentItemActions.children).forEach((child, index) => {
			if (clonedContentItemActions.children.item(index)) {
				clonedContentItemActions.children
					.item(index)
					.addEventListener("click", () => child.click());
			}
		});

		clonedContentItemActions.children.item(0).remove();
		clonedContentItemActions.children.item(0).remove();
		clonedContentItemActions.children.item(0).remove();
		clonedContentItemActions.children.item(clonedContentItemActions.children.length - 1).remove();

		const plainItemActionBtn = clonedContentItemActions.children.item(0);
		const plainIcon = plainItemActionBtn.querySelector("span");

		const plainActionBtnEvent = () => {
			const loginStatus = document.querySelector(features.action_btn_adjust.selector[3]);

			if (!loginStatus) {
				return;
			}

			const text =
				plainItemActionBtn.innerText.replace(/[^\u4e00-\u9fa5]/g, "") == "喜欢"
					? "​取消喜欢"
					: "喜欢";

			plainItemActionBtn.innerHTML = text;
			plainItemActionBtn.prepend(plainIcon);
		};

		contentItemActions.children.item(3).addEventListener("click", () => plainActionBtnEvent());

		const actionCommentBtn = document.querySelector(features.action_btn_adjust.selector[1]);
		const clonedActionCommentBtn = actionCommentBtn.cloneNode(true);

		clonedActionCommentBtn.addEventListener("click", () => {
			const commentsContainer = document.querySelector(".Comments-container");
			commentsContainer.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
		clonedContentItemActions.prepend(clonedActionCommentBtn);

		Array.from(clonedContentItemActions.children).forEach((child) => {
			child.style.margin = 0;
		});
		Array.from(clonedContentItemActions.querySelectorAll("span")).forEach((span) => {
			span.style.display = "block";
		});
		Array.from(clonedContentItemActions.querySelectorAll(".Button-zi")).forEach((icon) => {
			icon.style.width = "1.3em";
			icon.style.height = "1.3em";
		});

		clonedContentItemActions.style.display = "flex";
		clonedContentItemActions.style.position = "fixed";
		clonedContentItemActions.style.top = "260px";
		clonedContentItemActions.style.width = "96px";
		clonedContentItemActions.style.justifyContent = "center";
		clonedContentItemActions.style.right = "calc(50vw - 495px)";
		clonedContentItemActions.style.gap = "20px";
		clonedContentItemActions.style.margin = 0;
		clonedContentItemActions.style.padding = 0;
		clonedContentItemActions.style.opacity = 0;
		clonedContentItemActions.style.backgroundColor = "#00000000";
		clonedContentItemActions.style.flexDirection = "column";
		clonedContentItemActions.style.transition = "opacity 0.55s ease-in-out";
		actionCommentBtn.parentNode.appendChild(clonedContentItemActions);

		const postMain = document.querySelector(features.action_btn_adjust.selector[2]);
		const postMainHeight = postMain.offsetHeight + 40;

		window.addEventListener("scroll", () => {
			const scrollTop = document.documentElement.scrollTop;
			const windowHeight = window.innerHeight;
			const postMainTop = postMain.offsetTop;
			const postMainBottom = postMainTop + postMainHeight;

			if (scrollTop === 0 || scrollTop + windowHeight >= postMainBottom) {
				clonedContentItemActions.style.opacity = 0;
			} else {
				clonedContentItemActions.style.opacity = 1;
			}
		});
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

	messageblock.style.display = "flex";
	messageblock.style.alignItems = "center";
	messageblock.style.gap = "10px";
	document.querySelector(features.mark.datetime.selector[1]).appendChild(messageblock);

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
