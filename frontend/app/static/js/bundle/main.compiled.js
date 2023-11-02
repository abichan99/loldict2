var yourLibName;(()=>{"use strict";var e={};(e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})})(e);function t(e){return n(e,{maxLen:30,allowedUnicodeCategoryList:["L","N"],allowedIndividualCharacterList:[" ","　","`","_","-","、","。","「","」","ー","(",")","（","）","[","]","%","％","‘","’"]})}function n(e,t){const n=function(e){let t="[^";for(let n=0;n<e.length;n++)t+=`\\p{${e[n]}}`;return t+="]",new RegExp(t,"gu")}(t.allowedUnicodeCategoryList);if(e.length>t.maxLen)return{isValid:!1,errMessage:`${t.maxLen}자 이내로 입력해 주세요.`};const r=e.normalize("NFC").match(n);if(null===r)return{isValid:!0,errMessage:""};for(let e=0;e<r.length;e++){const n=r[e];if(!t.allowedIndividualCharacterList.includes(n))return{isValid:!1,errMessage:`사용 할 수 없는 문자가 포함되어 있습니다: ${n}.`}}return{isValid:!0,errMessage:""}}function r(e){const n=window.localStorage.getItem("searchingHistory");if(!t(e).isValid)return;const r=e;if(null===n||""===n)return void window.localStorage.setItem("searchingHistory",r);let o;o=-1===n.indexOf(",")?[n]:n.split(",");const i=[];o.forEach((e=>{t(e).isValid&&i.push(e)}));const l=i.length;-1===i.indexOf(r)?l>=10?window.localStorage.setItem("searchingHistory",function(e,t){let n=e[1];for(let t=2;t<e.length;t++)n=`${n},${e[t]}`;return n=`${n},${t}`,n}(i,r)):window.localStorage.setItem("searchingHistory",`${n},${e}`):window.localStorage.setItem("searchingHistory",function(e,t){if(1===e.length&&e[0]===t)return t.toString();const n=e.indexOf(t);e.splice(n,1);let r=e[0];for(let t=1;t<e.length;t++)r=`${r},${e[t]}`;return r=`${r},${t}`,r}(i,r))}const o="registrationForm",i="wordKrInput",l="wordJpInput",a="descriptionInput";const s=["flex","justify-center","items-center","mx-3.5"],d=["mx-2","myapp-text","break-keep","hover:underline"];function c(e){let t;if(0===e.length)return'class=""';t=`class="${e[0]}`;for(let n=1;n<e.length;n++)t=`${t} ${e[n]}`;return t+='"',t}const u="http://localhost:5000/";var g,m;g=u,window.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("header-title");null==e||e.setAttribute("href",g)})),function(){const e=document.getElementById("darkModeBtn");null!=e&&("dark"===localStorage.theme?e.checked=!0:e.checked=!1)}(),function(){const e=document.getElementById("darkModeBtn");null!=e&&e.addEventListener("change",(function(){!0===this.checked?(localStorage.theme="dark",document.documentElement.classList.add("dark")):(localStorage.theme="light",document.documentElement.classList.remove("dark"))}))}(),function(){const e=function(e,n,r){if(!e)return"";let o;o=-1===e.indexOf(",")?[e]:e.split(",").reverse();let i=0,l="";return o.every((e=>!e||"undefined"===e||!t(e).isValid))?"":(o.forEach((e=>{if(!e||"undefined"===e||!t(e).isValid)return"";let o="<div ";o+=`id="searched-word${i}" `,i+=1,o+=`${c(n)}>`,o+=`<button ${c(r)}>${e}</button>`,o+="</div>",l+=o})),l)}(window.localStorage.getItem("searchingHistory"),s,d),n=document.getElementById("searchingHistoryField");""!==e&&null!=n&&(n.innerHTML=e)}(),["left","right"].forEach((e=>{var t;null===(t=document.getElementById(`scroll-button-${e}`))||void 0===t||t.addEventListener("pointerdown",(()=>{const t=setInterval((()=>{!function(e,t){const n=document.getElementById("searchingHistoryField");"left"===e&&null!=n?n.scrollLeft-=4:"right"===e&&null!=n&&(n.scrollLeft+=4)}(e)}),10);document.addEventListener("pointerup",(()=>{clearInterval(t)}),{once:!0})}))})),function(e){var n;const o=function(){const e=localStorage.getItem("searchingHistory");let t=0;return e&&"undefined"!==e&&(t=e.split(",").length),t}();for(let i=0;i<o;i++){const o=`searched-word${i.toString()}`,l=null===(n=document.getElementById(o))||void 0===n?void 0:n.children[0],a=null==l?void 0:l.innerHTML;null==l||l.addEventListener("click",(()=>{void 0!==a&&t(a).isValid&&(r(a),window.location.href=`${e}?keyword=${a}`)}))}}(u),null===(m=document.getElementById(o))||void 0===m||m.addEventListener("submit",(function(e){e.preventDefault();const r=e.target.querySelector(`#${i}`),s=e.target.querySelector(`#${l}`),d=e.target.querySelector(`#${a}`),c=t(r.value),u=t(s.value),g=function(e){return n(e,{maxLen:200,allowedUnicodeCategoryList:["L","N"],allowedIndividualCharacterList:[".",","," ","　",'"',"'","`","_","-","、","。","「","」","^","~","ー","(",")","{","}","[","]","%","％","‘","’"]})}(d.value);if(!c.isValid)return void r.setCustomValidity(c.errMessage);if(!u.isValid)return void s.setCustomValidity(u.errMessage);if(!g.isValid)return void d.setCustomValidity(g.errMessage);const m={wordKr:r.value,wordJp:s.value,description:d.value},f=document.getElementById(o).action,y=new XMLHttpRequest;y.open("POST",f,!0),y.setRequestHeader("Content-Type","application/json"),y.onreadystatechange=function(){4===y.readyState&&200===y.status&&(alert(y.responseText),window.location.reload())},y.send(JSON.stringify(m))})),function(e){var n;null===(n=document.getElementById("searchingForm"))||void 0===n||n.addEventListener("submit",(n=>{!function(e,n){e.preventDefault();const o=e.target.querySelector("#translationSearchingBar"),i=o.value,l=t(i);if(null!=o&&!l.isValid)return void o.setCustomValidity(l.errMessage);r(i);const a=`${n}?keyword=${i}`;window.location.href=a}(n,e)}))}(u),function(e){e.forEach((e=>{var t;null===(t=document.getElementById(e))||void 0===t||t.addEventListener("change",(function(){this.setCustomValidity("")}))}))}(["wordKrInput","wordJpInput","descriptionInput","translationSearchingBar"]),function(){const e=document.getElementById("collapseBtnRegistrationForm");null==e||e.addEventListener("click",(e=>{e.currentTarget.classList.toggle("active");const t=document.getElementById("target-collapse");null!=t&&"block"===t.style.display?t.style.display="none":null!=t&&"none"===t.style.display&&(t.style.display="block")}))}(),function(){const e=document.getElementsByClassName("myapp-text");Array.from(e).forEach((e=>{e.classList.add("dark:text-gray-400")}))}(),yourLibName=e})();