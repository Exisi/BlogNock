// ==UserScript==
// @name         BiliBiliNock
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  优化哔哩哔哩专栏文章标识
// @author       Exisi
// @license      MIT
// @match        https://www.bilibili.com/opus/*
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
        selector: [".opus-module-author__pub__text", ".opus-module-author"],
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 15px; height: 15px; margin-right: 5px;"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentcolor" d="M256 8C119 8 8 119 8 256S119 504 256 504 504 393 504 256 393 8 256 8zm92.5 313h0l-20 25a16 16 0 0 1 -22.5 2.5h0l-67-49.7a40 40 0 0 1 -15-31.2V112a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16V256l58 42.5A16 16 0 0 1 348.5 321z"></path></svg>`,
      },
      readtime: {
        enabled: GM_getValue("readtime", true),
        selector: [".opus-module-content", ".bili-opus-view"],
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style="width: 15px; height: 15px; margin-right: 5px;"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentcolor" d="M360 0H24C10.7 0 0 10.7 0 24v16c0 13.3 10.7 24 24 24 0 91 51 167.7 120.8 192C75 280.3 24 357 24 448c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24 0-91-51-167.7-120.8-192C309 231.7 360 155 360 64c13.3 0 24-10.7 24-24V24c0-13.3-10.7-24-24-24zm-64 448H88c0-77.5 46.2-144 104-144 57.8 0 104 66.5 104 144z"></path></svg>`,
      },
    },
  };

  const setModal = `<div class="modal-dialog"> <div class="modal-setting" onClick="event.cancelBubble = true"> <div class="modal-header"> <h3>功能设置</h3> <span class="btn-dialog-close">×</span> </div> <div class="modal-body"> <div class="setting-item"> <span> 文章显示时间优化 </span> <span> <input type="checkbox" id="feature-mark-datetime" aria-nock="datetime" /> <label for="feature-mark-datetime"></label> </span> </div> <div class="setting-item"> <span> 文章阅读时长 </span> <span> <input type="checkbox" id="feature-mark-readtime" aria-nock="readtime" /> <label for="feature-mark-readtime"></label> </span> </div> </div> </div> </div>`;
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

  const showSetting = () =>
    (document.querySelector(".modal-dialog").style.display = "block");
  const closeSetting = () =>
    (document.querySelector(".modal-dialog").style.display = "none");

  document
    .querySelector(".modal-dialog")
    .addEventListener("click", closeSetting);
  document
    .querySelector(".modal-setting")
    .addEventListener("click", (e) => e.stopPropagation());
  document
    .querySelector(".btn-dialog-close")
    .addEventListener("click", closeSetting);
  document.querySelector(".modal-body").addEventListener("click", (e) => {
    if (e.target.type !== "checkbox") {
      return;
    }
    const nock = e.target.getAttribute("aria-nock");
    const flag = GM_getValue(nock) == null ? false : !GM_getValue(nock);
    GM_setValue(nock, flag);
  });
  GM_registerMenuCommand("功能设置", showSetting);

  // 显示发布时间（优化格式）
  if (features.mark.datetime.enabled) {
    const postTime = document.querySelector(features.mark.datetime.selector[0]);
    if (postTime) {
      // 获取原始时间字符串
      const rawDate = postTime.textContent.trim();

      // 尝试匹配不同的时间格式（如 "编辑于 2024年12月04日 22:44" 或 "2024年05月29日 16:15"）
      let formattedDate;
      if (rawDate.startsWith("编辑于")) {
        // 处理 "编辑于 2024年12月04日 22:44" 格式
        formattedDate = rawDate.replace(
          /编辑于 (\d{4})年(\d{2})月(\d{2})日 (\d{2}):(\d{2})/,
          "$1-$2-$3 $4:$5"
        );
      } else {
        // 处理 "2024年05月29日 16:15" 格式
        formattedDate = rawDate.replace(
          /(\d{4})年(\d{2})月(\d{2})日 (\d{2}):(\d{2})/,
          "$1-$2-$3 $4:$5"
        );
      }

      const postDate = new Date(formattedDate);
      const rawTimeAgo = calculateTimeAgo(postDate);

      postTime.style.cursor = "pointer";
      postTime.style.textDecoration = "underline";

      // 创建并插入格式化后的时间差
      const formattedTimeElement = document.createElement("span");
      formattedTimeElement.textContent = `（${rawTimeAgo}）`;
      const iconbox = document.createElement("div");
      iconbox.innerHTML = `${features.mark.datetime.icon}`;
      iconbox.style.display = "inline-block";
      postTime.appendChild(formattedTimeElement);
      postTime.insertBefore(iconbox, postTime.firstChild);

      const originalClick = postTime.onclick || (() => {});
      postTime.addEventListener("click", () => {
        originalClick();
        setTimeout(() => {
          const rawTimeAgo = calculateTimeAgo(postDate);
          formattedTimeElement.textContent = `（${rawTimeAgo}）`;
        }, 50);
      });
    } else {
      console.log("未找到发布时间元素"); 
    }
  }

  // 显示预计阅读时长
  if (features.mark.readtime.enabled) {
    const content = document.querySelector(features.mark.readtime.selector[0]);
    if (content) {
      const textLength = content.innerText.length;
      const readtime = Math.ceil(textLength / 400); // 假设每分钟阅读 400 字
      const readbox = document.createElement("div");
      readbox.style.marginRight = "5px"; // 调整间距
      readbox.style.textDecoration = "underline";
      readbox.style.display = "inline-block";
      readbox.style.color = "#8491a5";
      readbox.style.fontSize = "14px";
      readbox.style.alignItems = "center";
      readbox.style.cursor = "pointer";
      readbox.addEventListener("click", () => {
        const target = document.querySelector(
          features.mark.readtime.selector[1]
        );
        target.scrollIntoView(false); // 先滚动到底部
        window.scrollBy(0, 180); // 离底部距离增加 100px，你可以自定义此数值
      });
      readbox.innerHTML = `${features.mark.readtime.icon}<span> 预计阅读时长 ${readtime} 分钟</span>`;
      const postTime = document.querySelector(
        features.mark.datetime.selector[0]
      );
      postTime.appendChild(readbox);
    } else {
      console.log("未找到文章内容元素"); 
    }
  }

  function calculateTimeAgo(datetime) {
    const postDate = new Date(datetime);
    const currentDate = new Date();
    const timeDiff = currentDate - postDate;
    if (timeDiff >= 31536000000) {
      return Math.floor(timeDiff / 31536000000) + " 年前";
    }
    if (timeDiff >= 2592000000) {
      return Math.floor(timeDiff / 2592000000) + " 个月前";
    }
    if (timeDiff >= 86400000) {
      return Math.floor(timeDiff / 86400000) + " 天前";
    }
    if (timeDiff >= 3600000) {
      return Math.floor(timeDiff / 3600000) + " 小时前";
    }
    if (timeDiff >= 60000) {
      return Math.floor(timeDiff / 60000) + " 分钟前";
    }
    return Math.floor(timeDiff / 1000) + " 秒前";
  }
})();
