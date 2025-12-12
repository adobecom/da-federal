var U=e=>{switch(e.type){case"LinkGroupHeader":return ye(e);case"LinkGroupLink":return he(e);case"LinkGroupBlue":return ve(e);default:return console.error(e),""}},ye=({title:e,classes:r})=>`
  <div role="heading" class="${r.join(",")}">
    <div class="title">${e}</div>
  </div>
`,he=({iconHref:e,iconAlt:r,title:t,href:n,subtitle:i})=>{let l=r!==null&&e!==null?`
      <picture>
        <img
          loading="lazy"
          src="${e}"
          alt="${r}"
        >
      </picture>
    `:"";return`
    <a class="link-group" href="${n}">
      ${l}
      <div class="content">
        <div class="title">${t}</div>
        <div class="subtile">${i}</div>
      </div>
    </a>
  `},ve=({link:e})=>`
  <a href="${e.href}" class="link-group blue">
    ${e.text}
  </a>
`;var v=({text:e,href:r})=>`<a href="${r}">${e}</a>`;var T=({text:e,href:r})=>`
<a href="${r}" class="feds-primary-cta">
  ${e}
</a>
`,b=({text:e,href:r})=>`
<a href="${r}" class="feds-secondary-cta">
  ${e}
</a>
`,q=e=>e.type==="PrimaryCTA"?T(e):b(e);var o=class e extends Error{constructor(r){super(r),Object.setPrototypeOf(this,e.prototype)}},c=class e extends Error{constructor(r,t="Minor"){super(r),Object.setPrototypeOf(this,e.prototype)}};var R=window.matchMedia("(min-width: 900px)");var O=e=>r=>{let t=[],n=[];for(let i=0;i<r.length;i++){if(e(r[i])){t.push(n),n=[];continue}n.push(r[i])}return t.push(n),t},I=e=>r=>{if(r.length===0)return r;let[t,...n]=r;return e(t)?[t].concat(I(e)(n)):[]};var g=e=>{let r=[],t=e.nextElementSibling??null;for(;t!==null;)r.push(t),t=t.nextElementSibling??null;return r},y=e=>({eval:e,or:r=>y(t=>{try{return e(t)}catch{return r(t)}})}),f=(e,r)=>e.reduce(([t,n],i)=>{try{let[s,l]=r(i);return[[...t,s],[...n,...l]]}catch(s){return s instanceof o?[t,[s,...n]]:[t,n]}},[[],[]]),k=({mobileEventListeners:e,desktopEventListeners:r})=>t=>{let n;R.matches?n=r(t):n=e(t),R.addEventListener("change",()=>{n?.(),n=R.matches?r(t):e(t)})},E=async e=>{try{if(e===null)return new o("URL is null");let r=await fetch(F(e.href));if(!r.ok)return new o(`Request for ${e} failed`);let t=await r.text(),{body:n}=new DOMParser().parseFromString(t,"text/html");return n}catch(r){return new o(r?.message)}},F=e=>e.replace(/\.plain\.html(?=[?#]|$)/,".html").replace(/\.html(?=[?#]|$)|(?=[?#]|$)/,".plain.html"),_=async e=>{let r=async(t,n)=>{if(t instanceof o)return t;try{let s=[...t.querySelectorAll('a[href*="#_inline"]')].map(async l=>{try{if(n.has(l.href))return;let u=F(l.href),m=new URL(u),a=await E(m);if(n.add(l.href),a instanceof o)throw a;await r(a,n);let p=l.closest("div");p&&p.replaceChildren(...a.children);return}catch{return}},[]);return await Promise.all(s),t}catch(i){return new o(JSON.stringify(i))}};return r(e,new Set)},L=(e,r)=>e.map(t=>`<li>${r(t)}</li>`).join(""),C=e=>e.toLowerCase().trim().replace(/[^a-z0-9]/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"").replace(/^(\d)/,"id-$1");var P=e=>{switch(e.type){case"SingleColumnSection":return D(e);case"SingleColumnSectionList":return ge(e);case"MultiColumnSection":return Ee(e);case"MenuPromo":return G(e);default:return console.error(`Unexpected Column Type ${e}`),""}},D=({title:e,items:r})=>`
<ul>
  ${e===null?"":`<span class="column-section-title">${e}</span>`}
  ${L(r,j)}
</ul>
`,ge=({sections:e})=>`
  <ul>
    ${L(e,D)}
  </ul>
`,Ee=({title:e,columns:r})=>`
  <ul>
  ${e===null?"":`<span class="column-section-title">${e}</span>`}
  ${L(r,t=>L(t,j))}
  </ul>
`,G=({content:e})=>e,j=e=>{switch(e.type){case"LinkGroupHeader":case"LinkGroupLink":case"LinkGroupBlue":return U(e);case"Link":return v(e);case"PrimaryCTA":return T(e);case"SecondaryCTA":return b(e);default:return console.error(`Unexpected ColumnItem type ${e}`),""}};var Z=e=>[{type:"Brand",imgSrc:"/federal/assets/svgs/adobe-logo.svg",altText:"Adobe .Inc.",render:!0,brandImageOnly:!0,href:new URL("https://www.adobe.com")},[]];var z=({imgSrc:e,altText:r,href:t})=>`
<a href="${t.href}" 
   class="feds-brand"
   aria-label="Adobe"
>
 <img src="${e}" alt="${r}" loading="lazy"> 
</a>
`;var A={elementNull:"Error when parsing Link. Element is null",notAnchor:"Cannot parse non-anchor as Link",textContentNotFound:"Error when parsing Link. Element has no textContent",hrefNotFound:"Element has no href"},d=e=>{if(e===null)throw new o(A.elementNull);if(e.tagName!=="A")throw new o(A.notAnchor);let r=e?.textContent??"";if(r==="")throw new o(A.textContentNotFound);let t=e?.getAttribute("href")??"";if(t==="")throw new o(A.hrefNotFound);return[{type:"Link",text:r,href:t},[]]};var K=e=>r=>{if(r===null)throw new Error("");let t=r.querySelector(Ce(e));if(!t)throw new Error("");let[{text:n,href:i},s]=d(t);return[{type:e.type,text:n,href:i},s]},S=K({type:"PrimaryCTA"}),x=K({type:"SecondaryCTA"}),W=e=>y(S).or(x).eval(e),Ce=({type:e})=>{switch(e){case"PrimaryCTA":return"strong > a";case"SecondaryCTA":return"em > a";default:throw new Error("")}};var J=e=>y(be).or(Te).or(Se).eval(e),h={elementNull:"Element not found",noTitleAnchor:"Title anchor not found",noHref:"Title Anchor has no href",noTitle:"Title text not found",noSubtitleP:"Subtitle <p> not found",noSubtitle:"Subtitle text not found",notAHeader:"Expected a Header class"},Te=e=>{let r=new Set;if(!e)throw new o(h.elementNull);let t=e.querySelector("p a");if(!t)throw new o(h.noTitleAnchor);let n=t.textContent??"";n===""&&r.add(new c(h.noTitle));let i=t.getAttribute("href")??"";i===""&&r.add(new c(h.noHref));let s=t?.closest("p")?.nextElementSibling;if(!s)throw new o(h.noSubtitleP);let l=s.textContent??"";l===""&&r.add(new c(h.noSubtitle));let[u=null,m=null]=(e.firstElementChild?.firstElementChild?.textContent?.split("|")??[]).map(a=>a.trim());return[{type:"LinkGroupLink",iconHref:u,iconAlt:m,title:n,href:i,subtitle:l},[...r]]},be=e=>{if(!e)throw new o(h.elementNull);let r=[...e.classList];if(!r.includes("header"))throw new o(h.notAHeader);let t=e.querySelector("h5")?.textContent??"";if(t==="")throw new o(h.noTitle);return[{type:"LinkGroupHeader",title:t,classes:r},[]]},Se=e=>{if(!e)throw new o(h.elementNull);if(!e.classList.contains("blue"))throw new Error("Not a Blue Link Group");let r=e.querySelector("a"),[t,n]=d(r);return[{type:"LinkGroupBlue",link:t},n]};var V=e=>y(N).or(Y).or(xe).or($).eval(e),Q=e=>f(e,r=>y(J).or(S).or(x).or(d).eval(r)),X=e=>e.flatMap(r=>r.nodeName==="UL"?[...r.querySelectorAll("li > a")]:[r]),Y=e=>{if(e.querySelector(".column-break"))throw new o("Has a column break");let r=e.firstElementChild;if(r===null)throw new o("No Children");let t=r.nodeName==="H5"?r.textContent??null:null,n=r.nodeName==="H5"?g(r):[...e.children],i=X(n),[s,l]=Q(i);return[{type:"SingleColumnSection",title:t,items:s},l]},N=e=>{if(e.querySelector(".column-break"))throw new o("Has a column break");let r=[...e.querySelectorAll("h5")];if(r.length<=1)throw new o("Not a section list");let t=s=>{let l=document.createElement("div"),u=I(m=>m.nodeName!=="H5")(g(s));return l.append(s,...u),Y(l)},[n,i]=f(r,t);return[{type:"SingleColumnSectionList",sections:n},i]},xe=e=>{if(!e.querySelector(".column-break"))throw new o("Expected a Column Break");let r=e.firstElementChild;if(r===null||r.nodeName!=="H5")throw new o(M.expectedH5);let t=r.textContent;if(t===""||t===null)throw new o(M.emptyTitle);let i=O(u=>u.classList.contains("column-break"))(g(r)).map(X),[s,l]=f(i,Q);return[{type:"MultiColumnSection",title:t,columns:s},l]},$=e=>{if(e===null)throw new o(M.elementNull);let r=e.querySelector(".gnav-promo, .gnav-image");if(r===null)throw new o(M.noPromo);let t=r.innerHTML??"";if(t==="")throw new o(M.noPromoContent);return[{type:"MenuPromo",content:t},[]]},M={expectedH5:"Expected an H5 element for the title ",emptyTitle:"Expected Title to not be empty",elementNull:"Element is null",noPromo:"Promo or gnav image not found",noPromoContent:"Promo Content not found"};var re=e=>{let r=new Set;if(e===null)throw new o(ee.elementNull);let t=e.querySelector("h2")?.textContent??"";t===""&&r.add(new c(ee.noTitle));let n=(async()=>{try{let m=e.querySelector("h2 > a"),a=new URL(m?.href??""),p=await E(a);if(p instanceof o)throw new Error(p.message);let H=await _(p);if(H instanceof o)throw new Error(H.message);let B=[...H.children].map(w=>w.firstElementChild??w);return B.forEach(w=>console.log(w.outerHTML)),f(B,V)}catch(m){throw new o(JSON.stringify(m))}})(),i=e.querySelectorAll(".cross-cloud-menu ul > li > a"),[s,l]=f([...i],d),u=e.classList.contains("section");return[{type:"MegaMenu",title:t,columns:n,crossCloudMenu:s,isSection:u},[...l,...r]]},ee={elementNull:"Element is null",noTitle:"Large Menu has no Title"};var te=()=>`
  <li class="ghost-column">
    <div class="ghost-header"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
  </li>
  <li class="ghost-column">
    <div class="ghost-header"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
  </li>
  <li class="ghost-column">
    <div class="ghost-header"></div>
    <div class="ghost-item"></div>
    <div class="ghost-item"></div>
  </li>
`,ne=({title:e,crossCloudMenu:r,isSection:t})=>`
  <button type="button"
          aria-expanded="false"
          aria-controls="${C(e)}"
          class="mega-menu"
  >
    ${e}
  </button>
  <div id="${C(e)}" class="feds-popup${t?"":" section"}">
    <ul>
    </ul>
    <ul class="cross-cloud-menu">
      ${L(r,v)}
    </ul>
  </div>
`;var ie=e=>{let r=[];if(e===null)throw new o(oe.elementNull);let t=e.querySelector("h2"),n=t?.textContent??"";n===""&&r.push(new c(oe.noTitle));let i=(()=>{if(t===null)return e;let a=document.createElement("div");return g(t).forEach(p=>a.appendChild(p)),a})(),[s,l]=y(N).or(a=>f([...a.children],Me)).eval(i),[u,m]=(()=>{try{return $(e)}catch{return[null,[]]}})();return[{type:"SmallMenu",title:n,columns:s,promo:u},[...l,...m]]},Me=e=>{if(e.nodeName!=="UL")throw new Error("");let r=[...e.querySelectorAll("ul > li > a")];return f(r,d)},oe={elementNull:"The element to be parsed is null",noTitle:"Small menu has no title"};var le=({title:e,columns:r,promo:t})=>`
  <button type="button"
          aria-expanded="false"
          aria-controls="${C(e)}"
  >
    ${e}
  </button>
  <div class="feds-popup" id="${C(e)}">
    ${we(r)}
    ${t===null?"":`<li>${G(t)}</li>`}
  </div>
`,we=e=>!Array.isArray(e)&&e?.type==="SingleColumnSectionList"?P(e):`
  <ul>
    ${L(e,r=>`
      <ul>
        ${L(r,v)}
      </ul>
    `)}
  </ul>
  `;var se={elementNull:"Error when parsing text. Element is null",textContentNull:"Error when parsing text. Element has no textContent"},ae=e=>{if(e===null)return[{type:"Text",content:""},[new c(se.elementNull,"Minor")]];let r=e.textContent;return r===null?[{type:"Text",content:""},[new c(se.textContentNull,"Minor")]]:[{type:"Text",content:r},[]]};var ce=({content:e})=>e;var ue=e=>{if(e===null)throw new o(ke.elementNull);if(e.querySelector(".gnav-brand")!==null)return Z(e);let t=e.querySelector(".large-menu");return t!==null?re(t):e.querySelector("h5, ul, link-group")!==null?ie(e):e.querySelector("strong")!==null?S(e):e.querySelector("em")!==null?x(e):e.querySelector("a")===null?ae(e):d(e.querySelector("a"))},me=e=>{switch(e.type){case"Text":return ce(e);case"Link":return v(e);case"SecondaryCTA":return b(e);case"PrimaryCTA":return T(e);case"Brand":return z(e);case"SmallMenu":return le(e);case"MegaMenu":return ne(e);default:return console.error(`Failed to recognize component: ${e}`),""}},ke={elementNull:"Element is null"};var pe=e=>{let[r,t]=f([...document.querySelectorAll(".breadcrumbs ul > li > a")??[]],d),[n,i]=f([...e.children],ue),s=e.querySelector(".product-entry-cta"),[l,u]=(()=>{try{return W(s)}catch{return[null,[]]}})(),m=n.filter(p=>p.type==="MegaMenu"&&p.isSection).length===1,a=[t,i,u].flat();return{breadcrumbs:r,components:n,productCTA:l,localnav:m,errors:a}};var Pe=e=>()=>console.log(e),Ae=e=>()=>console.log(e),de=k({mobileEventListeners:Pe,desktopEventListeners:Ae});var He=e=>()=>console.log(e),Re=e=>()=>console.log(e),fe=k({mobileEventListeners:Re,desktopEventListeners:He});var Le=async({gnavSource:e,asideSource:r})=>{let t=await E(e);if(t instanceof o)return t;let n=await E(r);return{mainNav:t,aside:n}};var Ut=async e=>{if(!(e.gnavSource instanceof URL))throw new o("gnavSource needs to be a URL object");let r=await Le(e);if(r instanceof o)throw r;let{mainNav:t,aside:n}=r;if(t instanceof o)throw t;let i=pe(t);if(i instanceof o)throw i;return Ie(i)(e.mountpoint),Ne(e)},Ie=e=>async r=>{let t=Ge(e);r.innerHTML=t;let n=[...r.querySelectorAll(".mega-menu ~ .feds-popup > ul")];n.forEach(l=>{l.innerHTML=te()});let i=e.components.filter(l=>l.type==="MegaMenu").map(l=>l.columns),s=await Promise.all(i.map(async(l,u)=>{let[m,a]=await l,p=L(m,P);return n[u].innerHTML=p,a}).flat());return r},Ge=({components:e,productCTA:r})=>`
<nav>
  <ul>
    ${L(e,me)}
  </ul>
  ${r===null?"":q(r)}
  <div class="feds-utilities">
  </div>
</nav>
`,Ne=e=>{let r=new Set,t=$e(e.mountpoint);t instanceof c?r.add(t):t.errors.forEach(r.add),de(e.mountpoint),fe(e.mountpoint);let n=t instanceof c?()=>{}:t.reloadUnav;return{closeEverything:Be,reloadUnav:n,errors:r,setGnavTopPosition:i=>{},getGnavTopPosition:()=>0}},$e=(e,r)=>new c("loadUnav has not been implemented yet"),Be=()=>{};export{Ut as main,Ne as postRenderingTasks,Ie as renderGnav,Ge as renderGnavString};
//# sourceMappingURL=main.js.map
