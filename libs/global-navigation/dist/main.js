var Le=`/**
 * Link Group Styles
 */
.feds-link-group {
    --title-color: #2f2f2f;
    --sub-title-color: #4b4b4b;
    --bg-hover-color: #e9e9e9;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    padding: 12px;
}

.feds-link-group:hover {
    background-color: var(--bg-hover-color);
}

.feds-link-group__title {
    /* font-family: var(--heading-font-family); */
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1rem;
    color: var(--title-color);
}

.feds-link-group__subtitle {
    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--sub-title-color);
}

@media (min-width: 900px) {
    .feds-link-group {
        --title-color: #9f9f9f;
        --sub-title-color: #9f9f9f;
        --title-color-hover: #fff;
        --sub-title-color-hover: #fff;
        --bg-hover-color: transparent;
        padding: 0;
    }

    .feds-link-group__content {
        padding: 24px 0;
    }

    .feds-link-group__title {
        font-size: 1.25rem;
        line-height: 115%;
        padding-bottom: 10px;
    }

    .feds-link-group:hover .feds-link-group__title {
        color: var(--title-color-hover);
    }

    .feds-link-group__subtitle {
        font-size: 0.875rem;
        line-height: 140%;
    }

    .feds-link-group:hover .feds-link-group__subtitle {
        color: var(--sub-title-color-hover);
    }
}`,B=document.createElement("style");B.textContent=Le;document.head.appendChild(B);var U=e=>{switch(e.type){case"LinkGroupHeader":return ye(e);case"LinkGroupLink":return Ee(e);case"LinkGroupBlue":return Ce(e);default:return console.error(e),""}},ye=({title:e,classes:r})=>`
  <div role="heading" class="${r.join(",")}">
    <div class="title">${e}</div>
  </div>
`,Ee=({iconHref:e,iconAlt:r,title:n,href:t,subtitle:i})=>{let l=r!==null&&e!==null?`
      <picture class="feds-link-group__icon">
        <img
          loading="lazy"
          src="${e}"
          alt="${r}"
          class="feds-link-group__icon-img"
        >
      </picture>
    `:"";return`
    <a class="feds-link-group" href="${t}" daa-ll="${n}">
      ${l}
      <div class="feds-link-group__content">
        <div class="feds-link-group__title">${n}</div>
        <div class="feds-link-group__subtitle">${i}</div>
      </div>
    </a>
  `},Ce=({link:e})=>`
  <a href="${e.href}" class="link-group blue">
    ${e.text}
  </a>
`;var L=({text:e,href:r})=>`<a href="${r}">${e}</a>`;var b=({text:e,href:r})=>`
<a href="${r}" class="feds-primary-cta">
  ${e}
</a>
`,T=({text:e,href:r})=>`
<a href="${r}" class="feds-secondary-cta">
  ${e}
</a>
`,q=e=>e.type==="PrimaryCTA"?b(e):T(e);var o=class e extends Error{constructor(r){super(r),Object.setPrototypeOf(this,e.prototype)}},c=class e extends Error{constructor(r,n="Minor"){super(r),Object.setPrototypeOf(this,e.prototype)}};var R=window.matchMedia("(min-width: 900px)");var O=e=>r=>{let n=[],t=[];for(let i=0;i<r.length;i++){if(e(r[i])){n.push(t),t=[];continue}t.push(r[i])}return n.push(t),n},G=e=>r=>{if(r.length===0)return r;let[n,...t]=r;return e(n)?[n].concat(G(e)(t)):[]};var y=e=>{let r=[],n=e.nextElementSibling??null;for(;n!==null;)r.push(n),n=n.nextElementSibling??null;return r},v=e=>({eval:e,or:r=>v(n=>{try{return e(n)}catch{return r(n)}})}),f=(e,r)=>e.reduce(([n,t],i)=>{try{let[s,l]=r(i);return[[...n,s],[...t,...l]]}catch(s){return s instanceof o?[n,[s,...t]]:[n,t]}},[[],[]]),w=({mobileEventListeners:e,desktopEventListeners:r})=>n=>{let t;R.matches?t=r(n):t=e(n),R.addEventListener("change",()=>{t?.(),t=R.matches?r(n):e(n)})},E=async e=>{try{if(e===null)return new o("URL is null");let r=await fetch(F(e.href));if(!r.ok)return new o(`Request for ${e} failed`);let n=await r.text(),{body:t}=new DOMParser().parseFromString(n,"text/html");return t}catch(r){return new o(r?.message)}},F=e=>e.replace(/\.plain\.html(?=[?#]|$)/,".html").replace(/\.html(?=[?#]|$)|(?=[?#]|$)/,".plain.html"),D=async e=>{let r=async(n,t)=>{if(n instanceof o)return n;try{let s=[...n.querySelectorAll('a[href*="#_inline"]')].map(async l=>{try{if(t.has(l.href))return;let u=F(l.href),m=new URL(u),a=await E(m);if(t.add(l.href),a instanceof o)throw a;await r(a,t);let p=l.closest("div");p&&p.replaceChildren(...a.children);return}catch{return}},[]);return await Promise.all(s),n}catch(i){return new o(JSON.stringify(i))}};return r(e,new Set)},h=(e,r)=>e.map(n=>`<li>${r(n)}</li>`).join(""),C=e=>e.toLowerCase().trim().replace(/[^a-z0-9]/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"").replace(/^(\d)/,"id-$1");var P=e=>{switch(e.type){case"SingleColumnSection":return j(e);case"SingleColumnSectionList":return be(e);case"MultiColumnSection":return Te(e);case"MenuPromo":return I(e);default:return console.error(`Unexpected Column Type ${e}`),""}},j=({title:e,items:r})=>`
<ul>
  ${e===null?"":`<span class="column-section-title">${e}</span>`}
  ${h(r,Z)}
</ul>
`,be=({sections:e})=>`
  <ul>
    ${h(e,j)}
  </ul>
`,Te=({title:e,columns:r})=>`
  <ul>
  ${e===null?"":`<span class="column-section-title">${e}</span>`}
  ${h(r,n=>h(n,Z))}
  </ul>
`,I=({content:e})=>e,Z=e=>{switch(e.type){case"LinkGroupHeader":case"LinkGroupLink":case"LinkGroupBlue":return U(e);case"Link":return L(e);case"PrimaryCTA":return b(e);case"SecondaryCTA":return T(e);default:return console.error(`Unexpected ColumnItem type ${e}`),""}};var z=e=>[{type:"Brand",imgSrc:"/federal/assets/svgs/adobe-logo.svg",altText:"Adobe .Inc.",render:!0,brandImageOnly:!0,href:new URL("https://www.adobe.com")},[]];var K=({imgSrc:e,altText:r,href:n})=>`
<a href="${n.href}" 
   class="feds-brand"
   aria-label="Adobe"
>
 <img src="${e}" alt="${r}" loading="lazy"> 
</a>
`;var A={elementNull:"Error when parsing Link. Element is null",notAnchor:"Cannot parse non-anchor as Link",textContentNotFound:"Error when parsing Link. Element has no textContent",hrefNotFound:"Element has no href"},d=e=>{if(e===null)throw new o(A.elementNull);if(e.tagName!=="A")throw new o(A.notAnchor);let r=e?.textContent??"";if(r==="")throw new o(A.textContentNotFound);let n=e?.getAttribute("href")??"";if(n==="")throw new o(A.hrefNotFound);return[{type:"Link",text:r,href:n},[]]};var W=e=>r=>{if(r===null)throw new Error("");let n=r.querySelector(Se(e));if(!n)throw new Error("");let[{text:t,href:i},s]=d(n);return[{type:e.type,text:t,href:i},s]},S=W({type:"PrimaryCTA"}),x=W({type:"SecondaryCTA"}),J=e=>v(S).or(x).eval(e),Se=({type:e})=>{switch(e){case"PrimaryCTA":return"strong > a";case"SecondaryCTA":return"em > a";default:throw new Error("")}};var V=e=>v(ke).or(xe).or(Me).eval(e),g={elementNull:"Element not found",noTitleAnchor:"Title anchor not found",noHref:"Title Anchor has no href",noTitle:"Title text not found",noSubtitleP:"Subtitle <p> not found",noSubtitle:"Subtitle text not found",notAHeader:"Expected a Header class"},xe=e=>{let r=new Set;if(!e)throw new o(g.elementNull);let n=e.querySelector("p a");if(!n)throw new o(g.noTitleAnchor);let t=n.textContent??"";t===""&&r.add(new c(g.noTitle));let i=n.getAttribute("href")??"";i===""&&r.add(new c(g.noHref));let s=n?.closest("p")?.nextElementSibling;if(!s)throw new o(g.noSubtitleP);let l=s.textContent??"";l===""&&r.add(new c(g.noSubtitle));let[u=null,m=null]=(e.firstElementChild?.firstElementChild?.textContent?.split("|")??[]).map(a=>a.trim());return[{type:"LinkGroupLink",iconHref:u,iconAlt:m,title:t,href:i,subtitle:l},[...r]]},ke=e=>{if(!e)throw new o(g.elementNull);let r=[...e.classList];if(!r.includes("header"))throw new o(g.notAHeader);let n=e.querySelector("h5")?.textContent??"";if(n==="")throw new o(g.noTitle);return[{type:"LinkGroupHeader",title:n,classes:r},[]]},Me=e=>{if(!e)throw new o(g.elementNull);if(!e.classList.contains("blue"))throw new Error("Not a Blue Link Group");let r=e.querySelector("a"),[n,t]=d(r);return[{type:"LinkGroupBlue",link:n},t]};var Q=e=>v(N).or(ee).or(we).or($).eval(e),X=e=>f(e,r=>v(V).or(S).or(x).or(d).eval(r)),Y=e=>e.flatMap(r=>r.nodeName==="UL"?[...r.querySelectorAll("li > a")]:[r]),ee=e=>{if(e.querySelector(".column-break"))throw new o("Has a column break");let r=e.firstElementChild;if(r===null)throw new o("No Children");let n=r.nodeName==="H5"?r.textContent??null:null,t=r.nodeName==="H5"?y(r):[...e.children],i=Y(t),[s,l]=X(i);return[{type:"SingleColumnSection",title:n,items:s},l]},N=e=>{if(e.querySelector(".column-break"))throw new o("Has a column break");let r=[...e.querySelectorAll("h5")];if(r.length<=1)throw new o("Not a section list");let n=s=>{let l=document.createElement("div"),u=G(m=>m.nodeName!=="H5")(y(s));return l.append(s,...u),ee(l)},[t,i]=f(r,n);return[{type:"SingleColumnSectionList",sections:t},i]},we=e=>{if(!e.querySelector(".column-break"))throw new o("Expected a Column Break");let r=e.firstElementChild;if(r===null||r.nodeName!=="H5")throw new o(k.expectedH5);let n=r.textContent;if(n===""||n===null)throw new o(k.emptyTitle);let i=O(u=>u.classList.contains("column-break"))(y(r)).map(Y),[s,l]=f(i,X);return[{type:"MultiColumnSection",title:n,columns:s},l]},$=e=>{if(e===null)throw new o(k.elementNull);let r=e.querySelector(".gnav-promo, .gnav-image");if(r===null)throw new o(k.noPromo);let n=r.innerHTML??"";if(n==="")throw new o(k.noPromoContent);return[{type:"MenuPromo",content:n},[]]},k={expectedH5:"Expected an H5 element for the title ",emptyTitle:"Expected Title to not be empty",elementNull:"Element is null",noPromo:"Promo or gnav image not found",noPromoContent:"Promo Content not found"};var ne=e=>{let r=new Set;if(e===null)throw new o(re.elementNull);let n=e.querySelector("h2")?.textContent??"";n===""&&r.add(new c(re.noTitle));let t=(async()=>{try{let m=e.querySelector("h2 > a"),a=new URL(m?.href??""),p=await E(a);if(p instanceof o)throw new Error(p.message);let H=await D(p);if(H instanceof o)throw new Error(H.message);let _=[...H.children].map(M=>M.firstElementChild??M);return _.forEach(M=>console.log(M.outerHTML)),f(_,Q)}catch(m){throw new o(JSON.stringify(m))}})(),i=e.querySelectorAll(".cross-cloud-menu ul > li > a"),[s,l]=f([...i],d),u=e.classList.contains("section");return[{type:"MegaMenu",title:n,columns:t,crossCloudMenu:s,isSection:u},[...l,...r]]},re={elementNull:"Element is null",noTitle:"Large Menu has no Title"};var te=()=>`
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
`,oe=({title:e,crossCloudMenu:r,isSection:n})=>`
  <button type="button"
          aria-expanded="false"
          aria-controls="${C(e)}"
          class="mega-menu"
  >
    ${e}
  </button>
  <div id="${C(e)}" class="feds-popup${n?"":" section"}">
    <ul>
    </ul>
    <ul class="cross-cloud-menu">
      ${h(r,L)}
    </ul>
  </div>
`;var le=e=>{let r=[];if(e===null)throw new o(ie.elementNull);let n=e.querySelector("h2"),t=n?.textContent??"";t===""&&r.push(new c(ie.noTitle));let i=(()=>{if(n===null)return e;let a=document.createElement("div");return y(n).forEach(p=>a.appendChild(p)),a})(),[s,l]=v(N).or(a=>f([...a.children],Pe)).eval(i),[u,m]=(()=>{try{return $(e)}catch{return[null,[]]}})();return[{type:"SmallMenu",title:t,columns:s,promo:u},[...l,...m]]},Pe=e=>{if(e.nodeName!=="UL")throw new Error("");let r=[...e.querySelectorAll("ul > li > a")];return f(r,d)},ie={elementNull:"The element to be parsed is null",noTitle:"Small menu has no title"};var se=({title:e,columns:r,promo:n})=>`
  <button type="button"
          aria-expanded="false"
          aria-controls="${C(e)}"
  >
    ${e}
  </button>
  <div class="feds-popup" id="${C(e)}">
    ${Ae(r)}
    ${n===null?"":`<li>${I(n)}</li>`}
  </div>
`,Ae=e=>!Array.isArray(e)&&e?.type==="SingleColumnSectionList"?P(e):`
  <ul>
    ${h(e,r=>`
      <ul>
        ${h(r,L)}
      </ul>
    `)}
  </ul>
  `;var ae={elementNull:"Error when parsing text. Element is null",textContentNull:"Error when parsing text. Element has no textContent"},ce=e=>{if(e===null)return[{type:"Text",content:""},[new c(ae.elementNull,"Minor")]];let r=e.textContent;return r===null?[{type:"Text",content:""},[new c(ae.textContentNull,"Minor")]]:[{type:"Text",content:r},[]]};var ue=({content:e})=>e;var me=e=>{if(e===null)throw new o(He.elementNull);if(e.querySelector(".gnav-brand")!==null)return z(e);let n=e.querySelector(".large-menu");return n!==null?ne(n):e.querySelector("h5, ul, link-group")!==null?le(e):e.querySelector("strong")!==null?S(e):e.querySelector("em")!==null?x(e):e.querySelector("a")===null?ce(e):d(e.querySelector("a"))},pe=e=>{switch(e.type){case"Text":return ue(e);case"Link":return L(e);case"SecondaryCTA":return T(e);case"PrimaryCTA":return b(e);case"Brand":return K(e);case"SmallMenu":return se(e);case"MegaMenu":return oe(e);default:return console.error(`Failed to recognize component: ${e}`),""}},He={elementNull:"Element is null"};var de=e=>{let[r,n]=f([...document.querySelectorAll(".breadcrumbs ul > li > a")??[]],d),[t,i]=f([...e.children],me),s=e.querySelector(".product-entry-cta"),[l,u]=(()=>{try{return J(s)}catch{return[null,[]]}})(),m=t.filter(p=>p.type==="MegaMenu"&&p.isSection).length===1,a=[n,i,u].flat();return{breadcrumbs:r,components:t,productCTA:l,localnav:m,errors:a}};var Re=e=>()=>console.log(e),Ge=e=>()=>console.log(e),fe=w({mobileEventListeners:Re,desktopEventListeners:Ge});var Ie=e=>()=>console.log(e),Ne=e=>()=>console.log(e),he=w({mobileEventListeners:Ne,desktopEventListeners:Ie});var ve=async({gnavSource:e,asideSource:r})=>{let n=await E(e);if(n instanceof o)return n;let t=await E(r);return{mainNav:n,aside:t}};var $e=`
/**
 * Global Navigation Styles
 * Styles for the federal global navigation component
 */

/* ========================================
   Header Container
   ======================================== */

   header.global-navigation.site-pivot {
    display: block;
    visibility: visible;
  }`,ge=document.createElement("style");ge.textContent=$e;document.head.appendChild(ge);var Zn=async e=>{if(!(e.gnavSource instanceof URL))throw new o("gnavSource needs to be a URL object");let r=await ve(e);if(r instanceof o)throw r;let{mainNav:n,aside:t}=r;if(n instanceof o)throw n;let i=de(n);if(i instanceof o)throw i;return _e(i)(e.mountpoint),Ue(e)},_e=e=>async r=>{let n=Be(e);r.innerHTML=n,r.classList.add("site-pivot");let t=[...r.querySelectorAll(".mega-menu ~ .feds-popup > ul")];t.forEach(l=>{l.innerHTML=te()});let i=e.components.filter(l=>l.type==="MegaMenu").map(l=>l.columns),s=await Promise.all(i.map(async(l,u)=>{let[m,a]=await l,p=h(m,P);return t[u].innerHTML=p,a}).flat());return r},Be=({components:e,productCTA:r})=>`
<nav>
  <ul>
    ${h(e,pe)}
  </ul>
  ${r===null?"":q(r)}
  <div class="feds-utilities">
  </div>
</nav>
`,Ue=e=>{let r=new Set,n=qe(e.mountpoint);n instanceof c?r.add(n):n.errors.forEach(r.add),fe(e.mountpoint),he(e.mountpoint);let t=n instanceof c?()=>{}:n.reloadUnav;return{closeEverything:Oe,reloadUnav:t,errors:r,setGnavTopPosition:i=>{},getGnavTopPosition:()=>0}},qe=(e,r)=>new c("loadUnav has not been implemented yet"),Oe=()=>{};export{Zn as main,Ue as postRenderingTasks,_e as renderGnav,Be as renderGnavString};
//# sourceMappingURL=main.js.map
