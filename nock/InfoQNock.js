// ==UserScript==
// @name         InfoQNock
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  BlogNock系列，infoQ 文章的标识优化
// @author       Exisi
// @license      MIT License
// @match        www.infoq.cn/article/*
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
				selector: [".publish-time .date", ".read-time li"],
			},
			readtime: {
				enabled: GM_getValue("readtime", true),
				selector: [".time-style", ".article-content-wrap"],
			},
		},
		hidden: {
			top_notice: {
				enabled: GM_getValue("top_notice", true),
				selector: [".header-notice"],
			},
			bottom_fixed_ad: {
				enabled: GM_getValue("bottom_fixed_ad", true),
				selector: [".geo-banner"],
			},
			qrcode_chat: {
				enabled: GM_getValue("qrcode_chat", true),
				selector: [".com-app-download"],
			},
			side_ad_card: {
				enabled: GM_getValue("side_ad_card", true),
				selector: [".sidebar-banner-ad"],
			},
			side_outstation_article_recommend: {
				enabled: GM_getValue("side_outstation_article_recommend", true),
				selector: [".sidebar-related li:has(a[href*='time.geekbang.org'])"],
			},
			related_book_recommend: {
				enabled: GM_getValue("related_book_recommend", true),
				selector: [".widget-minibook"],
			},
			ppt_recommend: {
				enabled: GM_getValue("ppt_recommend", true),
				selector: [".module-ppt.hot-ppt"],
			},
			related_vendors_recommend: {
				enabled: GM_getValue("related_vendors_recommend", true),
				selector: [".vcrbox-panel.sidebar-vcrbox"],
			},
			bottom_article_ad: {
				enabled: GM_getValue("bottom_article_ad", true),
				selector: [".article-extra"],
			},
			bottom_related_article_recommend: {
				enabled: GM_getValue("bottom_related_article_recommend", true),
				selector: [".article-bottom-related ul li:has(a[href*='time.geekbang.org'])"],
			},
		},
		special_adjust: {
			top_notice: {
				enabled: GM_getValue("top_notice", true),
				selector: [".inner-content.had-notice"],
			},
			sidebar_fixed: {
				enabled: GM_getValue("qrcode_chat", true),
				selector: [".layout-sidebar-fixed"],
			},
		},
	};

	const setModal = `<div class="modal-dialog"> <div class="modal-setting" onClick="event.cancelBubble = true"> <div class="modal-header"> <h3>功能设置</h3> <span class="btn-dialog-close">×</span> </div> <div class="modal-body"> <div class="setting-item"> <span> 文章显示时间优化 </span> <span> <input type="checkbox" id="feature-mark-datetime" aria-nock="datetime" /> <label for="feature-mark-datetime"></label> </span> </div> <div class="setting-item"> <span> 阅读时长点击跳转到文章底部 </span> <span> <input type="checkbox" id="feature-mark-readtime" aria-nock="readtime" /> <label for="feature-mark-readtime"></label> </span> </div> <div style="border-bottom: 1px solid #000;"></div> <div class="setting-item"> <span> 隐藏顶部提示 </span> <span> <input type="checkbox" id="feature-hidden-top-notice" aria-nock="top_notice" /> <label for="feature-hidden-top-notice"></label> </span> </div> <div class="setting-item"> <span> 隐藏底部固定广告 </span> <span> <input type="checkbox" id="feature-hidden-bottom-fixed-ad" aria-nock="bottom_fixed_ad" /> <label for="feature-hidden-bottom-fixed-ad"></label> </span> </div> <div class="setting-item"> <span> 隐藏左侧群推荐 </span> <span> <input type="checkbox" id="feature-hidden-qrcode-chat" aria-nock="qrcode_chat" /> <label for="feature-hidden-qrcode-chat"></label> </span> </div> <div class="setting-item"> <span> 隐藏左侧广告 </span> <span> <input type="checkbox" id="feature-hidden-side-ad-card" aria-nock="side_ad_card" /> <label for="feature-hidden-side-ad-card"></label> </span> </div> <div class="setting-item"> <span> 隐藏左侧推荐阅读的外站文章 </span> <span> <input type="checkbox" id="feature-hidden-side-outstation-article-recommend" aria-nock="side_outstation_article_recommend" /> <label for="feature-hidden-side-outstation-article-recommend"></label> </span> </div> <div class="setting-item"> <span> 隐藏左侧电子书推荐 </span> <span> <input type="checkbox" id="feature-hidden-related-book-recommend" aria-nock="related_book_recommend" /> <label for="feature-hidden-related-book-recommend"></label> </span> </div> <div class="setting-item"> <span> 隐藏左侧 PPT 推荐 </span> <span> <input type="checkbox" id="feature-hidden-ppt-recommend" aria-nock="ppt_recommend" /> <label for="feature-hidden-ppt-recommend"></label> </span> </div> <div class="setting-item"> <span> 隐藏左侧相关厂商推荐 </span> <span> <input type="checkbox" id="feature-hidden-related-vendors-recommend" aria-nock="related_vendors_recommend" /> <label for="feature-hidden-related-vendors-recommend"></label> </span> </div> <div class="setting-item"> <span> 隐藏文章底部广告 </span> <span> <input type="checkbox" id="feature-hidden-bottom-article-ad" aria-nock="bottom_article_ad" /> <label for="feature-hidden-bottom-article-ad"></label> </span> </div> <div class="setting-item"> <span> 隐藏底部外站文章推荐 </span> <span> <input type="checkbox" id="feature-hidden-bottom-related-article-recommend" aria-nock="bottom_related_article_recommend" /> <label for="feature-hidden-bottom-related-article-recommend"></label> </span> </div> </div> </div> </div>`;
	const setStyle = `@keyframes fall { 0% { transform: translate(0%, -100%); opacity: 0; } 100% { transform: translate(0%, 0%); opacity: 1; } } .setting-item input[type=checkbox] { height: 0; width: 0; display: none; } .setting-item label { cursor: pointer; text-indent: -9999px; width: 40px; height: 20px; background: pink; display: block; border-radius: 100px; position: relative; } .setting-item label:after { content: ''; position: absolute; top: 2px; left: 2px; width: 15px; height: 15px; background: #fff; border-radius: 90px; transition: 0.2s; } .setting-item input:checked+label { background: #57a; } .setting-item input:checked+label:after { left: calc(100% - 2px); transform: translateX(-100%); } .setting-item label:active:after { width: 28px; } .modal-dialog { pointer-events: auto !important; display:none; border: none; position: fixed; z-index: 99999; left: 0; top: 0; width: 100%; min-width: 100vw; min-height: 100vh; height: 100%; background-color: rgba(0, 0, 0, 0.4); } .modal-setting { width: 450px; margin: auto; background-color: #ffffff; border-radius: 5px; padding: 20px; margin-top: 40px; position: relative; box-sizing: border-box; animation: fall 0.5s ease-in-out; } .modal-header { border-bottom: 1px solid #000000; } .modal-header h3 { padding: 10px 0; margin: 0; } .modal-header span { font-size: 24px; color: #ccc; position: absolute; right: 5px; top: 0; cursor: pointer; } .setting-item { margin: 10px 0; font-size: 14px; display: flex; justify-content: space-between; }`;

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
		const observer = new MutationObserver(() => {
			const datePublished = document.querySelector(features.mark.datetime.selector[0]);

			if (!datePublished) {
				return;
			}

			const rawPublishedTime = datePublished.innerText;
			const postTimeAgo = calculateTimeAgo(rawPublishedTime);
			const formattedPostTime = `发布于 ${rawPublishedTime}（${postTimeAgo}）`;

			const postimeItem = document.querySelector(features.mark.datetime.selector[1]);

			postimeItem.innerText = formattedPostTime;
			postimeItem.style.textDecoration = "underline";
			observer.disconnect();
		});
		observer.observe(document.body, { childList: true, subtree: true });
	}

	if (features.mark.readtime.enabled) {
		const observer = new MutationObserver(() => {
			const readTimeItem = document.querySelectorAll(features.mark.readtime.selector[0])[1];

			if (!readTimeItem) {
				return;
			}

			readTimeItem.style.cursor = "pointer";
			readTimeItem.style.textDecoration = "underline";
			readTimeItem.addEventListener("click", () =>
				document.querySelector(features.mark.readtime.selector[1]).scrollIntoView(false)
			);
			observer.disconnect();
		});
		observer.observe(document.body, { childList: true, subtree: true });
	}

	const hiddenStyle = document.createElement("style");
	document.head.appendChild(hiddenStyle);

	Object.entries(features.hidden).forEach(([key, option]) => {
		if (option.enabled) {
			const cssRule = `${option.selector} { display: none !important; }`;
			hiddenStyle.sheet.insertRule(cssRule);
		}
	});

	if (features.special_adjust.top_notice.enabled) {
		const observer = new MutationObserver(() => {
			const headerBlock = document.querySelector(features.special_adjust.top_notice.selector[0]);
			if (!headerBlock) {
				return;
			}
			headerBlock.style.paddingTop = "107px";
			observer.disconnect();
		});
		observer.observe(document.body, { childList: true, subtree: true });
	}

	if (features.special_adjust.sidebar_fixed.enabled) {
		const observer = new MutationObserver(() => {
			const sidebar = document.querySelector(features.special_adjust.sidebar_fixed.selector[0]);
			if (!sidebar) {
				return;
			}
			sidebar.style.top = "95px";
			observer.disconnect();
		});
		observer.observe(document.body, { childList: true, subtree: true });
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
