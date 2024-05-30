// ==UserScript==
// @name         ZhiHuNock-Q
// @namespace    http://tampermonkey.net/
// @version      0.0.6
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
					".QuestionHeader",
				],
				icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentcolor" d="M256 8C119 8 8 119 8 256S119 504 256 504 504 393 504 256 393 8 256 8zm92.5 313h0l-20 25a16 16 0 0 1 -22.5 2.5h0l-67-49.7a40 40 0 0 1 -15-31.2V112a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16V256l58 42.5A16 16 0 0 1 348.5 321z"/></svg>`,
			},
		},
		hidden_login: {
			enabled: GM_getValue("hidden_login", true),
			selector: [
				".AppHeader-profileAvatar",
				".Modal-closeButton",
				".ZDI--Xmark16",
				"svg[width='26'][height='8']",
			],
		},
		hidden_app_qrcode: {
			enabled: GM_getValue("hidden_app_qrcode", true),
			selector: [".Card.AppBanner"],
		},
		hidden_footer: {
			enabled: GM_getValue("hidden_footer", true),
			selector: ["footer"],
		},
		hidden: {
			answer_ad: {
				enabled: GM_getValue("answer_ad", true),
				selector: [".List .Pc-word"],
			},
			sidebar_ad_pic: {
				enabled: GM_getValue("sidebar_ad_pic", true),
				selector: [".Pc-card.Card"],
			},
		},
	};

	const setModal = `<div class="modal-dialog"> <div class="modal-setting" onClick="event.cancelBubble = true"> <div class="modal-header"> <h3>功能设置</h3> <span class="btn-dialog-close">×</span> </div> <div class="modal-body"> <div class="setting-item"> <span> 问答显示时间 </span> <span> <input type="checkbox" id="feature-question-datetime" aria-nock="question_datetime" /> <label for="feature-question-datetime"></label> </span> </div> <div class="setting-item"> <span> 登录提示自动隐藏 </span> <span> <input type="checkbox" id="feature-hidden-login" aria-nock="hidden_login" /> <label for="feature-hidden-login"></label> </span> </div> <hr/> <div class="setting-item"> <span> 隐藏左侧移动端推荐 </span> <span> <input type="checkbox" id="feature-hidden-app-qrcode" aria-nock="hidden_app_qrcode" /> <label for="feature-hidden-app-qrcode"></label> </span> </div> <div class="setting-item"> <span> 隐藏左侧知乎页脚 </span> <span> <input type="checkbox" id="feature-hidden-footer" aria-nock="hidden_footer" /> <label for="feature-hidden-footer"></label> </span> </div> <div class="setting-item"> <span> 隐藏回答中的广告 </span> <span> <input type="checkbox" id="feature-hidden-answer_ad" aria-nock="answer_ad" /> <label for="feature-hidden-answer_ad"></label> </span> </div> <div class="setting-item"> <span> 隐藏右侧边栏的图片广告 </span> <span> <input type="checkbox" id="feature-hidden-sidebar-ad-pic" aria-nock="sidebar_ad_pic" /> <label for="feature-hidden-sidebar-ad-pic"></label> </span> </div> </div> </div> </div>`;
	const setStyle = `@keyframes fall { 0% { transform: translate(0%, -100%); opacity: 0; } 100% { transform: translate(0%, 0%); opacity: 1; } } .setting-item input[type=checkbox] { height: 0; width: 0; display: none; } .setting-item label { cursor: pointer; text-indent: -9999px; width: 40px; height: 20px; background: pink; display: block; border-radius: 100px; position: relative; } .setting-item label:after { content: ''; position: absolute; top: 2px; left: 2px; width: 15px; height: 15px; background: #fff; border-radius: 90px; transition: 0.2s; } .setting-item input:checked+label { background: #57a; } .setting-item input:checked+label:after { left: calc(100% - 2px); transform: translateX(-100%); } .setting-item label:active:after { width: 28px; } .modal-dialog { pointer-events: auto !important; display:none; border: none; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; min-width: 100vw; min-height: 100vh; height: 100%; background-color: rgba(0, 0, 0, 0.4); } .modal-setting { width: 450px; margin: auto; background-color: #ffffff; border-radius: 5px; padding: 20px; margin-top: 40px; position: relative; box-sizing: border-box; animation: fall 0.5s ease-in-out; } .modal-header { border-bottom: 1px solid #000000; } .modal-header h3 { padding: 10px 0; margin: 0; } .modal-header span { font-size: 24px; color: #ccc; position: absolute; right: 5px; top: 0; cursor: pointer; } .setting-item { margin: 10px 0; display: flex; justify-content: space-between; }`;

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
			features.mark.question_datetime.selector[1]
		);
		const rawQuestionPostTime = questionCreatedTime.getAttribute("content");
		const rawQuestionUpdateTime = questionModifiedTime.getAttribute("content");

		const questionPostTimeAgo = calculateTimeAgo(rawQuestionPostTime);
		const questionUpdateTimeAgo = calculateTimeAgo(rawQuestionUpdateTime);

		const questionPostTime = new Date(rawQuestionPostTime).toLocaleString().replaceAll("/", "-");
		const questionUpdateTime = new Date(rawQuestionUpdateTime)
			.toLocaleString()
			.replaceAll("/", "-");

		const questionPostFormattedText = `发布于 ${questionPostTime}（${questionPostTimeAgo}）`;
		const questionUpdateFormattedText = `编辑于 ${questionUpdateTime}（${questionUpdateTimeAgo}）`;

		const formattedTimeBox = document.createElement("div");
		formattedTimeBox.innerHTML = features.mark.question_datetime.icon;
		formattedTimeBox.style.color = "#8491a5";
		formattedTimeBox.style.marginLeft = "20px";
		formattedTimeBox.style.display = "flex";
		formattedTimeBox.style.alignItems = "center";
		formattedTimeBox.style.fontSize = "14px";
		formattedTimeBox.style.cursor = "pointer";
		formattedTimeBox.style.textDecoration = "underline";

		const datetime = document.createElement("span");
		datetime.innerText = questionPostFormattedText;
		formattedTimeBox.appendChild(datetime);

		formattedTimeBox.addEventListener("click", () => {
			const formattedText =
				datetime.innerText == questionPostFormattedText
					? questionUpdateFormattedText
					: questionPostFormattedText;

			datetime.innerText = formattedText;
		});

		const icon = formattedTimeBox.querySelector("svg");
		icon.style.width = "15px";
		icon.style.height = "15px";
		icon.style.marginRight = "5px";

		const questionHeaderShareAction = document.querySelector(
			features.mark.question_datetime.selector[2]
		);
		questionHeaderShareAction.after(formattedTimeBox);

		const questionHeader = document.querySelector(features.mark.question_datetime.selector[3]);
		questionHeader.addEventListener("click", (e) => {
			setTimeout(() => {
				const shareAction = document.querySelector(features.mark.question_datetime.selector[2]);
				shareAction.after(formattedTimeBox);
			}, 50);
		});
	}

	if (features.hidden_login.enabled && !document.querySelector(features.hidden_login.selector[0])) {
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

		createObserver(features.hidden_login.selector[1], () => {
			document.querySelector(features.hidden_login.selector[1]).click();
		});

		createObserver(features.hidden_login.selector[2], () => {
			document.querySelector(
				features.hidden_login.selector[2]
			).parentNode.parentNode.parentNode.style.display = "none";
		});

		createObserver(features.hidden_login.selector[3], () => {
			document.querySelector(features.hidden_login.selector[3]).closest("div").style.display =
				"none";
		});
	}

	if (
		features.hidden_app_qrcode.enabled &&
		document.querySelector(features.hidden_app_qrcode.selector[0])
	) {
		const qrcodeBanner = document.querySelector(features.hidden_app_qrcode.selector[0]);
		qrcodeBanner.style.display = "none";
	}

	if (features.hidden_footer.enabled) {
		const footer = document.querySelector(features.hidden_footer.selector[0]);
		footer.style.display = "none";
	}

	const hiddenStyle = document.createElement("style");
	document.head.appendChild(hiddenStyle);

	Object.entries(features.hidden).forEach(([key, option]) => {
		if (option.enabled) {
			const cssRule = `${option.selector} { display: none !important; }`;
			hiddenStyle.sheet.insertRule(cssRule);
		}
	});

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
