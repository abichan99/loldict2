var yourLibName;(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function n(e,t,n){r(`${n}increaseGoodNum?id=${e}`,t,"good"),setTimeout((()=>window.location.reload()),1e3)}function o(e,t,n){r(`${n}increaseBadNum?id=${e}`,t,"bad"),setTimeout((()=>window.location.reload()),1e3)}function r(e,t,n){const o=new XMLHttpRequest;o.open("GET",e,!0),o.onreadystatechange=function(){4===o.readyState&&200===o.status&&i(t,n)},o.send(null)}function i(e,t){const n=document.getElementById(e),o=null==n?void 0:n.querySelector(".myapp-translation-goodBar"),r=null==n?void 0:n.querySelector(".myapp-translation-badBar");let i=parseInt(o.children[0].innerHTML,10),a=parseInt(r.children[0].innerHTML,10);"good"===t?i+=1:a+=1,o.children[0].innerHTML=i.toString(),r.children[0].innerHTML=a.toString();const d=i+a,l=Math.round(100*i/d),u=100-l;o.style.width=`${l.toString()}px`,r.style.width=`${u.toString()}px`}e.r(t),e.d(t,{increaseBadNum:()=>o,increaseGoodNum:()=>n,sendAjaxReq:()=>r,updateEval:()=>i}),yourLibName=t})();