const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");function d(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}let n=null;e.disabled=!0,t.addEventListener("click",(function(){document.body.style.backgroundColor=d(),t.disabled=!0,e.disabled=!0,e.disabled=!1,n=setInterval((()=>{document.body.style.backgroundColor=d()}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.b9340a53.js.map