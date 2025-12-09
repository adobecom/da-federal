var B=e=>{switch(e.type){case"LinkGroupHeader":return he(e);case"LinkGroupLink":return ve(e);case"LinkGroupBlue":return ye(e);default:return console.error(e),""}},he=({title:e,classes:r})=>`
  <div role="heading" class="${r.join(",")}">
    <div class="title">${e}</div>
  </div>
`,ve=({iconHref:e,iconAlt:r,title:t,href:n,subtitle:i})=>{let s=r!==null&&e!==null?`
      <picture>
        <img
          loading="lazy"
          src="${e}"
          alt="${r}"
        >
      </picture>
    `:"";return`
    <a class="link-group" href="${n}">
      ${s}
      <div class="content">
        <div class="title">${t}</div>
        <div class="subtile">${i}</div>
      </div>
    </a>
  `},ye=({link:e})=>`
  <a href="${e.href}" class="link-group blue">
    ${e.text}
  </a>
`;var y=({text:e,href:r})=>`<a href="${r}">${e}</a>`;var T=({text:e,href:r})=>`
<a href="${r}" class="feds-primary-cta">
  ${e}
</a>
`,b=({text:e,href:r})=>`
<a href="${r}" class="feds-secondary-cta">
  ${e}
</a>
`,q=e=>e.type==="PrimaryCTA"?T(e):b(e);var o=class e extends Error{constructor(r){super(r),Object.setPrototypeOf(this,e.prototype)}},c=class e extends Error{constructor(r,t="Minor"){super(r),Object.setPrototypeOf(this,e.prototype)}};var R=window.matchMedia("(min-width: 900px)");var O=e=>r=>{let t=[],n=[];for(let i=0;i<r.length;i++){if(e(r[i])){t.push(n),n=[];continue}n.push(r[i])}return t.push(n),t},G=e=>r=>{if(r.length===0)return r;let[t,...n]=r;return e(t)?[t].concat(G(e)(n)):[]};var E=e=>{let r=[],t=e.nextElementSibling??null;for(;t!==null;)r.push(t),t=t.nextElementSibling??null;return r},h=e=>({eval:e,or:r=>h(t=>{try{return e(t)}catch{return r(t)}})}),d=(e,r)=>e.reduce(([t,n],i)=>{try{let[l,s]=r(i);return[[...t,l],[...n,...s]]}catch(l){return l instanceof o?[t,[l,...n]]:[t,n]}},[[],[]]),k=({mobileEventListeners:e,desktopEventListeners:r})=>t=>{let n;R.matches?n=r(t):n=e(t),R.addEventListener("change",()=>{n?.(),n=R.matches?r(t):e(t)})},g=async e=>{try{if(e===null)return new o("URL is null");let r=await fetch(_(e.href));if(!r.ok)return new o(`Request for ${e} failed`);let t=await r.text(),{body:n}=new DOMParser().parseFromString(t,"text/html");return n}catch(r){return new o(r?.message)}},_=e=>e.replace(/\.plain\.html(?=[?#]|$)/,".html").replace(/\.html(?=[?#]|$)|(?=[?#]|$)/,".plain.html"),F=async e=>{let r=async(t,n)=>{if(t instanceof o)return t;try{let i=[...t.querySelectorAll('a[href*="#_inline"]')].map(async l=>{try{if(n.has(l.href))return;let s=_(l.href),m=new URL(s),a=await g(m);if(n.add(l.href),a instanceof o)throw a;await r(a,n);let u=l.closest("div");u&&u.replaceChildren(...a.children);return}catch{return}},[]);return await Promise.all(i),t}catch(i){return new o(JSON.stringify(i))}};return r(e,new Set)},f=(e,r)=>e.map(t=>`<li>${r(t)}</li>`).join(""),C=e=>e.toLowerCase().trim().replace(/[^a-z0-9]/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"").replace(/^(\d)/,"id-$1");var P=e=>{switch(e.type){case"SingleColumnSection":return j(e);case"SingleColumnSectionList":return Ee(e);case"MultiColumnSection":return ge(e);case"MenuPromo":return N(e);default:return console.error(`Unexpected Column Type ${e}`),""}},j=({title:e,items:r})=>`
<ul>
  ${e===null?"":`<span class="column-section-title">${e}</span>`}
  ${f(r,Z)}
</ul>
`,Ee=({sections:e})=>`
  <ul>
    ${f(e,j)}
  </ul>
`,ge=({title:e,columns:r})=>`
  <ul>
  ${e===null?"":`<span class="column-section-title">${e}</span>`}
  ${f(r,t=>f(t,Z))}
  </ul>
`,N=({content:e})=>e,Z=e=>{switch(e.type){case"LinkGroupHeader":case"LinkGroupLink":case"LinkGroupBlue":return B(e);case"Link":return y(e);case"PrimaryCTA":return T(e);case"SecondaryCTA":return b(e);default:return console.error(`Unexpected ColumnItem type ${e}`),""}};var D=e=>[{type:"Brand",imgSrc:"/federal/assets/svgs/adobe-logo.svg",altText:"Adobe .Inc.",render:!0,brandImageOnly:!0,href:new URL("https://www.adobe.com")},[]];var z=({imgSrc:e,altText:r,href:t})=>`
<a href="${t.href}" 
   class="feds-brand"
   aria-label="Adobe"
>
 <img src="${e}" alt="${r}" loading="lazy"> 
</a>
`;var A={elementNull:"Error when parsing Link. Element is null",notAnchor:"Cannot parse non-anchor as Link",textContentNotFound:"Error when parsing Link. Element has no textContent",hrefNotFound:"Element has no href"},p=e=>{if(e===null)throw new o(A.elementNull);if(e.tagName!=="A")throw new o(A.notAnchor);let r=e?.textContent??"";if(r==="")throw new o(A.textContentNotFound);let t=e?.getAttribute("href")??"";if(t==="")throw new o(A.hrefNotFound);return[{type:"Link",text:r,href:t},[]]};var K=e=>r=>{if(r===null)throw new Error("");let t=r.querySelector(Ce(e));if(!t)throw new Error("");let[{text:n,href:i},l]=p(t);return[{type:e.type,text:n,href:i},l]},S=K({type:"PrimaryCTA"}),x=K({type:"SecondaryCTA"}),W=e=>h(S).or(x).eval(e),Ce=({type:e})=>{switch(e){case"PrimaryCTA":return"strong > a";case"SecondaryCTA":return"em > a";default:throw new Error("")}};var J=e=>h(be).or(Te).or(Se).eval(e),v={elementNull:"Element not found",noTitleAnchor:"Title anchor not found",noHref:"Title Anchor has no href",noTitle:"Title text not found",noSubtitleP:"Subtitle <p> not found",noSubtitle:"Subtitle text not found",notAHeader:"Expected a Header class"},Te=e=>{let r=new Set;if(!e)throw new o(v.elementNull);let t=e.querySelector("p a");if(!t)throw new o(v.noTitleAnchor);let n=t.textContent??"";n===""&&r.add(new c(v.noTitle));let i=t.getAttribute("href")??"";i===""&&r.add(new c(v.noHref));let l=t?.closest("p")?.nextElementSibling;if(!l)throw new o(v.noSubtitleP);let s=l.textContent??"";s===""&&r.add(new c(v.noSubtitle));let[m=null,a=null]=(e.firstElementChild?.firstElementChild?.textContent?.split("|")??[]).map(u=>u.trim());return[{type:"LinkGroupLink",iconHref:m,iconAlt:a,title:n,href:i,subtitle:s},[...r]]},be=e=>{if(!e)throw new o(v.elementNull);let r=[...e.classList];if(!r.includes("header"))throw new o(v.notAHeader);let t=e.querySelector("h5")?.textContent??"";if(t==="")throw new o(v.noTitle);return[{type:"LinkGroupHeader",title:t,classes:r},[]]},Se=e=>{if(!e)throw new o(v.elementNull);if(!e.classList.contains("blue"))throw new Error("Not a Blue Link Group");let r=e.querySelector("a"),[t,n]=p(r);return[{type:"LinkGroupBlue",link:t},n]};var V=e=>h($).or(Y).or(xe).or(I).eval(e),Q=e=>d(e,r=>h(J).or(S).or(x).or(p).eval(r)),X=e=>e.flatMap(r=>r.nodeName==="UL"?[...r.querySelectorAll("li > a")]:[r]),Y=e=>{if(e.querySelector(".column-break"))throw new o("Has a column break");let r=e.firstElementChild;if(r===null)throw new o("No Children");let t=r.nodeName==="H5"?r.textContent??null:null,n=r.nodeName==="H5"?E(r):[...e.children],i=X(n),[l,s]=Q(i);return[{type:"SingleColumnSection",title:t,items:l},s]},$=e=>{if(e.querySelector(".column-break"))throw new o("Has a column break");let r=[...e.querySelectorAll("h5")];if(r.length<=1)throw new o("Not a section list");let t=l=>{let s=document.createElement("div"),m=G(a=>a.nodeName!=="H5")(E(l));return s.append(l,...m),Y(s)},[n,i]=d(r,t);return[{type:"SingleColumnSectionList",sections:n},i]},xe=e=>{if(!e.querySelector(".column-break"))throw new o("Expected a Column Break");let r=e.firstElementChild;if(r===null||r.nodeName!=="H5")throw new o(M.expectedH5);let t=r.textContent;if(t===""||t===null)throw new o(M.emptyTitle);let i=O(m=>m.classList.contains("column-break"))(E(r)).map(X),[l,s]=d(i,Q);return[{type:"MultiColumnSection",title:t,columns:l},s]},I=e=>{if(e===null)throw new o(M.elementNull);let r=e.querySelector(".gnav-promo, .gnav-image");if(r===null)throw new o(M.noPromo);let t=r.innerHTML??"";if(t==="")throw new o(M.noPromoContent);return[{type:"MenuPromo",content:t},[]]},M={expectedH5:"Expected an H5 element for the title ",emptyTitle:"Expected Title to not be empty",elementNull:"Element is null",noPromo:"Promo or gnav image not found",noPromoContent:"Promo Content not found"};var re=e=>{let r=new Set;if(e===null)throw new o(ee.elementNull);let t=e.querySelector("h2")?.textContent??"";t===""&&r.add(new c(ee.noTitle));let n=(async()=>{try{let a=e.querySelector("h2 > a"),u=new URL(a?.href??""),L=await g(u);if(L instanceof o)throw new Error(L.message);let H=await F(L);if(H instanceof o)throw new Error(H.message);let U=[...H.children].map(w=>w.firstElementChild??w);return U.forEach(w=>console.log(w.outerHTML)),d(U,V)}catch(a){throw new o(JSON.stringify(a))}})(),i=e.querySelectorAll(".cross-cloud-menu ul > li > a"),[l,s]=d([...i],p),m=e.classList.contains("section");return[{type:"MegaMenu",title:t,columns:n,crossCloudMenu:l,isSection:m},[...s,...r]]},ee={elementNull:"Element is null",noTitle:"Large Menu has no Title"};var te=()=>`
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
      ${f(r,y)}
    </ul>
  </div>
`;var ie=e=>{let r=[];if(e===null)throw new o(oe.elementNull);let t=e.querySelector("h2"),n=t?.textContent??"";n===""&&r.push(new c(oe.noTitle));let i=(()=>{if(t===null)return e;let u=document.createElement("div");return E(t).forEach(L=>u.appendChild(L)),u})(),[l,s]=h($).or(u=>d([...u.children],Me)).eval(i),[m,a]=(()=>{try{return I(e)}catch{return[null,[]]}})();return[{type:"SmallMenu",title:n,columns:l,promo:m},[...s,...a]]},Me=e=>{if(e.nodeName!=="UL")throw new Error("");let r=[...e.querySelectorAll("ul > li > a")];return d(r,p)},oe={elementNull:"The element to be parsed is null",noTitle:"Small menu has no title"};var le=({title:e,columns:r,promo:t})=>`
  <button type="button"
          aria-expanded="false"
          aria-controls="${C(e)}"
  >
    ${e}
  </button>
  <div class="feds-popup" id="${C(e)}">
    ${we(r)}
    ${t===null?"":`<li>${N(t)}</li>`}
  </div>
`,we=e=>!Array.isArray(e)&&e?.type==="SingleColumnSectionList"?P(e):`
  <ul>
    ${f(e,r=>`
      <ul>
        ${f(r,y)}
      </ul>
    `)}
  </ul>
  `;var se={elementNull:"Error when parsing text. Element is null",textContentNull:"Error when parsing text. Element has no textContent"},ae=e=>{if(e===null)return[{type:"Text",content:""},[new c(se.elementNull,"Minor")]];let r=e.textContent;return r===null?[{type:"Text",content:""},[new c(se.textContentNull,"Minor")]]:[{type:"Text",content:r},[]]};var ce=({content:e})=>e;var ue=e=>{if(e===null)throw new o(ke.elementNull);if(e.querySelector(".gnav-brand")!==null)return D(e);let t=e.querySelector(".large-menu");return t!==null?re(t):e.querySelector("h5, ul, link-group")!==null?ie(e):e.querySelector("strong")!==null?S(e):e.querySelector("em")!==null?x(e):e.querySelector("a")===null?ae(e):p(e.querySelector("a"))},me=e=>{switch(e.type){case"Text":return ce(e);case"Link":return y(e);case"SecondaryCTA":return b(e);case"PrimaryCTA":return T(e);case"Brand":return z(e);case"SmallMenu":return le(e);case"MegaMenu":return ne(e);default:return console.error(`Failed to recognize component: ${e}`),""}},ke={elementNull:"Element is null"};var pe=e=>{let[r,t]=d([...document.querySelectorAll(".breadcrumbs ul > li > a")??[]],p),[n,i]=d([...e.children],ue),l=e.querySelector(".product-entry-cta"),[s,m]=(()=>{try{return W(l)}catch{return[null,[]]}})(),a=n.filter(L=>L.type==="MegaMenu"&&L.isSection).length===1,u=[t,i,m].flat();return{breadcrumbs:r,components:n,productCTA:s,localnav:a,errors:u}};var Pe=e=>()=>console.log(e),Ae=e=>()=>console.log(e),de=k({mobileEventListeners:Pe,desktopEventListeners:Ae});var He=e=>()=>console.log(e),Re=e=>()=>console.log(e),fe=k({mobileEventListeners:Re,desktopEventListeners:He});var Le=async({gnavSource:e,asideSource:r})=>{let t=await g(e);if(t instanceof o)return t;let n=await g(r);return{mainNav:t,aside:n}};var Bt=async e=>{if(!(e.gnavSource instanceof URL))throw new o("gnavSource needs to be a URL object");let r=await Le(e);if(r instanceof o)throw r;let{mainNav:t,aside:n}=r;if(t instanceof o)throw t;let i=pe(t);if(i instanceof o)throw i;return Ge(i)(e.mountpoint),$e(e)},Ge=e=>async r=>{let t=Ne(e);r.innerHTML=t;let n=[...r.querySelectorAll(".mega-menu ~ .feds-popup > ul")];n.forEach(s=>{s.innerHTML=te()});let i=e.components.filter(s=>s.type==="MegaMenu").map(s=>s.columns),l=await Promise.all(i.map(async(s,m)=>{let[a,u]=await s,L=f(a,P);return n[m].innerHTML=L,u}).flat());return r},Ne=({components:e,productCTA:r})=>`
<nav>
  <ul>
    ${f(e,me)}
  </ul>
  ${r===null?"":q(r)}
  <div class="feds-utilities">
  </div>
</nav>
`,$e=e=>{let r=new Set,t=Ie(e.mountpoint);t instanceof c?r.add(t):t.errors.forEach(r.add),de(e.mountpoint),fe(e.mountpoint);let n=t instanceof c?()=>{}:t.reloadUnav;return{closeEverything:Ue,reloadUnav:n,errors:r,setGnavTopPosition:i=>{},getGnavTopPosition:()=>0}},Ie=(e,r)=>new c("loadUnav has not been implemented yet"),Ue=()=>{};export{Bt as main,$e as postRenderingTasks,Ge as renderGnav,Ne as renderGnavString};
//# sourceMappingURL=main.js.map
