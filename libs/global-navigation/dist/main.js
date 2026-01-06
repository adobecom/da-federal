var i=class e extends Error{constructor(t){super(t),Object.setPrototypeOf(this,e.prototype)}},p=class e extends Error{constructor(t,r="Minor"){super(t),Object.setPrototypeOf(this,e.prototype)}};var F=window.matchMedia("(min-width: 900px)"),j={brand:'<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 64.57 35"><defs><style>.cls-1{fill: #eb1000;}</style></defs><path class="cls-1" d="M6.27,10.22h4.39l6.2,14.94h-4.64l-3.92-9.92-2.59,6.51h3.08l1.23,3.41H0l6.27-14.94ZM22.03,13.32c.45,0,.94.04,1.43.16v-3.7h3.88v14.72c-.89.4-2.81.89-4.73.89-3.48,0-6.47-1.98-6.47-5.93s2.88-6.13,5.89-6.13ZM22.52,22.19c.36,0,.65-.07.94-.16v-5.42c-.29-.11-.58-.16-.96-.16-1.27,0-2.45.94-2.45,2.92s1.2,2.81,2.47,2.81ZM34.25,13.32c3.23,0,5.98,2.18,5.98,6.02s-2.74,6.02-5.98,6.02-6-2.18-6-6.02,2.72-6.02,6-6.02ZM34.25,22.13c1.11,0,2.14-.89,2.14-2.79s-1.03-2.79-2.14-2.79-2.12.89-2.12,2.79.96,2.79,2.12,2.79ZM41.16,9.78h3.9v3.7c.47-.09.96-.16,1.45-.16,3.03,0,5.84,1.98,5.84,5.86,0,4.1-2.99,6.18-6.53,6.18-1.52,0-3.46-.31-4.66-.87v-14.72ZM45.91,22.17c1.34,0,2.56-.96,2.56-2.94,0-1.85-1.2-2.72-2.5-2.72-.36,0-.65.04-.91.16v5.35c.22.09.51.16.85.16ZM58.97,13.32c2.92,0,5.6,1.87,5.6,5.64,0,.51-.02,1-.09,1.49h-7.27c.4,1.32,1.56,1.94,3.01,1.94,1.18,0,2.27-.29,3.5-.82v2.97c-1.14.58-2.5.82-3.9.82-3.7,0-6.58-2.23-6.58-6.02s2.61-6.02,5.73-6.02ZM60.93,18.02c-.2-1.27-1.05-1.78-1.92-1.78s-1.58.54-1.87,1.78h3.79Z"/></svg>',company:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none"><path d="M14.2353 21.6209L12.4925 16.7699H8.11657L11.7945 7.51237L17.3741 21.6209H24L15.1548 0.379395H8.90929L0 21.6209H14.2353Z" fill="#EB1000"/></svg>',search:'<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false"><path d="M14 2A8 8 0 0 0 7.4 14.5L2.4 19.4a1.5 1.5 0 0 0 2.1 2.1L9.5 16.6A8 8 0 1 0 14 2Zm0 14.1A6.1 6.1 0 1 1 20.1 10 6.1 6.1 0 0 1 14 16.1Z"></path></svg>',home:'<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 0 18 18" width="25"><path fill="#6E6E6E" d="M17.666,10.125,9.375,1.834a.53151.53151,0,0,0-.75,0L.334,10.125a.53051.53051,0,0,0,0,.75l.979.9785A.5.5,0,0,0,1.6665,12H2v4.5a.5.5,0,0,0,.5.5h4a.5.5,0,0,0,.5-.5v-5a.5.5,0,0,1,.5-.5h3a.5.5,0,0,1,.5.5v5a.5.5,0,0,0,.5.5h4a.5.5,0,0,0,.5-.5V12h.3335a.5.5,0,0,0,.3535-.1465l.979-.9785A.53051.53051,0,0,0,17.666,10.125Z"/></svg>'},X=e=>t=>{let r=[],n=[];for(let o=0;o<t.length;o++){if(e(t[o])){r.push(n),n=[];continue}n.push(t[o])}return r.push(n),r};var _=e=>t=>{if(t.length===0)return t;let[r,...n]=t;return e(r)?[r].concat(_(e)(n)):[]};var S=e=>{let t=[],r=e.nextElementSibling??null;for(;r!==null;)t.push(r),r=r.nextElementSibling??null;return t},y=e=>({eval:e,or:t=>y(r=>{try{return e(r)}catch{return t(r)}})}),f=(e,t)=>e.reduce(([r,n],o)=>{try{let[s,a]=t(o);return[[...r,s],[...n,...a]]}catch(s){return s instanceof i?[r,[s,...n]]:[r,n]}},[[],[]]),Q=({mobileEventListeners:e,desktopEventListeners:t})=>r=>{let n;F.matches?n=t(r):n=e(r),F.addEventListener("change",()=>{n?.(),n=F.matches?t(r):e(r)})},x=async e=>{try{if(e===null)return new i("URL is null");let t=Y(`${e.origin}${e.pathname.replace(/(\.html$|$)/,".plain.html")}${e.hash}`),r=await fetch(t);if(!r.ok)return new i(`Request for ${t} failed`);let n=await r.text(),{body:o}=new DOMParser().parseFromString(n,"text/html");return o}catch(t){return new i(t?.message)}},L,V=()=>{if(L)return L;let e=["https://www.adobe.com","https://business.adobe.com","https://blog.adobe.com","https://milo.adobe.com","https://news.adobe.com","graybox.adobe.com"];if(L)return L;let t=window.location.origin;L=e.some(o=>{let s=t.replace(".stage","");return o.startsWith("https://")?s===o:s.endsWith(o)})?t:"https://www.adobe.com";let n=window.location.hostname.includes(".aem.")?"aem":"hlx";return(t.includes("localhost")||t.includes(`.${n}.`))&&(L=`https://main--federal--adobecom.aem.${t.endsWith(".live")?"live":"page"}`),L},Y=(e="")=>{if(typeof e!="string"||!e.includes("/federal/"))return e;if(e.startsWith("/"))return`${V()}${e}`;try{let{pathname:t,search:r,hash:n}=new URL(e);return`${V()}${t}${r}${n}`}catch(t){console.log(`getFederatedUrl errored parsing the URL: ${e}: ${t?.message}`)}return e},ee=async e=>{let t=async(r,n)=>{if(r instanceof i)return r;try{let s=[...r.querySelectorAll('a[href*="#_inline"]')].map(async a=>{try{if(n.has(a.href))return;let c=Y(a.href),u=new URL(c),l=await x(u);if(n.add(a.href),l instanceof i)throw l;await t(l,n);let m=a.closest("div");m?m.replaceWith(...l.children):a.replaceWith(...l.children);return}catch{return}},[]);return await Promise.all(s),r}catch(o){return new i(JSON.stringify(o))}};return t(e,new Set)},b=(e,t)=>e.map(r=>`<li>${t(r)}</li>`).join(""),w=e=>e.toLowerCase().trim().replace(/[^a-z0-9]/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"").replace(/^(\d)/,"id-$1"),te=()=>!0;var N={elementNull:"Error when parsing Brand. Element is null",noLinks:"Error when parsing Brand. No links found",noPrimaryLink:"Error when parsing Brand. No primary link found"},k=/(\.png|\.jpg|\.jpeg|\.svg)/i,Ge=e=>{let t=e.querySelector("picture img")?.getAttribute("src")??null;if(t!==null&&t!=="")return t;let r=e.textContent?.trim();if(r!==void 0&&r!==""&&k.test(r)){let o=r.split("|")[0]?.trim();if(o!==void 0&&o!=="")return o}let n=e.getAttribute("href");return n!==null&&n!==""&&k.test(n)?n:null},Be=e=>{let t=e.textContent?.trim();if(t?.includes("|")===!0){let n=t.split("|")[1]?.trim();if(n)return n}return e.querySelector("img")?.getAttribute("alt")??""},re=e=>{if(e===null)throw new i(N.elementNull);let t=e.querySelector(".gnav-brand");if(t===null)throw new i(N.elementNull);let r=[...t.querySelectorAll("a")];if(r.length===0)throw new i(N.noLinks);let n=r.find(v=>{let g=v.textContent??"";return!k.test(v.href)&&!k.test(g)});if(!n)throw new i(N.noPrimaryLink);let o=t.matches(".brand-image-only"),s=t.matches(".no-logo"),a=t.matches(".image-only"),c=!s,u=!o&&!a,l=r.filter(v=>{let g=v.textContent??"";return k.test(v.href)||k.test(g)}),[m,T,E]=(()=>{let v=o?j.brand:j.company,[g=null,U=null]=[...t.querySelectorAll('picture img[src$=".svg"]')].map(D=>D?.src).filter(D=>D?.length>0),[$e=null,Ie=null]=l.map(Ge),Ne=l[0]instanceof Element?Be(l[0]):n.textContent?.trim()??"";return[$e??g??v,Ie??U,Ne]})(),I=n.textContent?.trim()??"",C=n.href;if(!c&&!u)return[{type:"Brand",data:{type:"NoRender"}},[]];let J=(v,g)=>{let U=g!=null&&g!=="";return te()&&U?g:v},O=m.startsWith("<svg")?{type:"inline-svg",svgContent:J(m,T),alt:E}:{type:"image",src:J(m,T),alt:E};return c&&u?[{type:"Brand",data:{type:"LabelledBrand",href:C,label:I,image:O}},[]]:c&&o?[{type:"Brand",data:{type:"BrandImageOnly",href:C,image:O,alt:E}},[]]:c&&a?[{type:"Brand",data:{type:"ImageOnlyBrand",href:C,image:O,alt:E}},[]]:[{type:"Brand",data:{type:"BrandLabelOnly",href:C,label:I}},[]]};var qe=`.feds-brand-container {
    display: flex;
    flex-shrink: 0;
}

.feds-brand {
    display: flex;
}

.feds-brand,
.feds-logo {
    align-items: center;
    outline-offset: 2px;
    padding: 0 var(--feds-gutter);
    column-gap: 10px;
}

.feds-brand-image,
.feds-logo-image {
    width: 25px;
    flex-shrink: 0;
}

.feds-brand-image.brand-image-only {
    height: 36px;
    width: auto;
    min-width: 66px;
}

.feds-brand-image.brand-image-only picture,
.feds-brand-image.brand-image-only img,
.feds-brand-image.brand-image-only svg {
    width: auto;
    height: 100%;
}

.feds-brand-image picture,
.feds-brand-image img,
.feds-brand-image svg,
.feds-logo-image picture,
.feds-logo-image img,
.feds-logo-image svg {
    width: 100%;
    display: block;
}

.feds-brand-label,
.feds-logo-label {
    flex-shrink: 0;
    font-weight: 700;
    font-size: 18px;
    color: var(--feds-color-adobeBrand);
}

@media (min-width: 900px) {
    .feds-brand-image+.feds-brand-label {
        display: flex;
    }
}`,ne=document.createElement("style");ne.textContent=qe;document.head.appendChild(ne);var Z=(e,t)=>{let r=`feds-brand-image${t?" brand-image-only":""}`;if(e.type==="inline-svg")return`<span class="${r}">${e.svgContent}</span>`;let n=e.alt?` alt="${e.alt}"`:"";return`<span class="${r}"><img src="${e.src}"${n} /></span>`},G=(e,t,r="")=>`<div class="feds-brand-container">
    <a href="${e}" class="feds-brand" daa-ll="Brand"${r}>
      ${t}
    </a>
  </div>`.trim(),oe=e=>{let{data:t}=e;switch(t.type){case"LabelledBrand":return G(t.href,Z(t.image,!1)+`<span class="feds-brand-label">${t.label}</span>`);case"BrandImageOnly":{let r=t.alt?` aria-label="${t.alt}"`:"";return G(t.href,Z(t.image,!0),r)}case"ImageOnlyBrand":{let r=t.alt?` aria-label="${t.alt}"`:"";return G(t.href,Z(t.image,!1),r)}case"BrandLabelOnly":return G(t.href,`<span class="feds-brand-label">${t.label}</span>`);case"NoRender":return"";default:return""}};var B={elementNull:"Error when parsing Link. Element is null",notAnchor:"Cannot parse non-anchor as Link",textContentNotFound:"Error when parsing Link. Element has no textContent",hrefNotFound:"Element has no href"},d=e=>{if(e===null)throw new i(B.elementNull);if(e.tagName!=="A")throw new i(B.notAnchor);let t=e?.textContent??"";if(t==="")throw new i(B.textContentNotFound);let r=e?.getAttribute("href")??"";if(r==="")throw new i(B.hrefNotFound);return[{type:"Link",text:t,href:r},[]]};var ie=e=>t=>{if(t===null)throw new Error("");let r=t.querySelector(Oe(e));if(!r)throw new Error("");let[{text:n,href:o},s]=d(r);return[{type:e.type,text:n,href:o},s]},A=ie({type:"PrimaryCTA"}),P=ie({type:"SecondaryCTA"}),ae=e=>y(A).or(P).eval(e),Oe=({type:e})=>{switch(e){case"PrimaryCTA":return"strong > a";case"SecondaryCTA":return"em > a";default:throw new Error("")}};var R=({text:e,href:t})=>`
<a href="${t}" class="feds-primary-cta">
  ${e}
</a>
`,H=({text:e,href:t})=>`
<a href="${t}" class="feds-secondary-cta">
  ${e}
</a>
`,se=e=>e.type==="PrimaryCTA"?R(e):H(e);var M=({text:e,href:t})=>`<a href="${t}">${e}</a>`;var le=e=>y(De).or(Ue).or(Fe).eval(e),h={elementNull:"Element not found",noTitleAnchor:"Title anchor not found",noHref:"Title Anchor has no href",noTitle:"Title text not found",noSubtitleP:"Subtitle <p> not found",noSubtitle:"Subtitle text not found",notAHeader:"Expected a Header class"},Ue=e=>{let t=new Set;if(!e)throw new i(h.elementNull);let r=e.querySelector("p a");if(!r)throw new i(h.noTitleAnchor);let n=r.textContent??"";n===""&&t.add(new p(h.noTitle));let o=r.getAttribute("href")??"";o===""&&t.add(new p(h.noHref));let s=r?.closest("p")?.nextElementSibling;if(!s)throw new i(h.noSubtitleP);let a=s.textContent??"";a===""&&t.add(new p(h.noSubtitle));let[c=null,u=null]=(e.firstElementChild?.firstElementChild?.textContent?.split("|")??[]).map(l=>l.trim());return[{type:"LinkGroupLink",iconHref:c,iconAlt:u,title:n,href:o,subtitle:a},[...t]]},De=e=>{if(!e)throw new i(h.elementNull);let t=[...e.classList];if(!t.includes("header"))throw new i(h.notAHeader);let r=e.querySelector("h5")?.textContent??"";if(r==="")throw new i(h.noTitle);return[{type:"LinkGroupHeader",title:r,classes:t},[]]},Fe=e=>{if(!e)throw new i(h.elementNull);if(!e.classList.contains("blue"))throw new Error("Not a Blue Link Group");let t=e.querySelector("a"),[r,n]=d(t);return[{type:"LinkGroupBlue",link:r},n]};var ce=e=>{let[t,r]=je(e);return(()=>{switch(t.type){case"SingleColumnSection":return[[{type:"Tab",title:t.title,columns:[t.items],CTA:W(t)}],r];case"SingleColumnSectionList":return[t.sections.flatMap(n=>({type:"Tab",title:n.title,columns:[n.items],CTA:W(n)})),r];case"MultiColumnSection":return[[{type:"Tab",title:t.title,columns:t.columns,CTA:W(t)}],r];case"MenuPromo":return[[{type:"Tab",title:"More",columns:t,CTA:void 0}],r];default:return[[],[]]}})()},W=e=>e.type==="SingleColumnSection"?e.items.find(t=>t.type==="PrimaryCTA"):e.columns.flat().find(t=>t.type==="PrimaryCTA"),je=e=>y(z).or(pe).or(_e).or(K).eval(e),ue=e=>f(e,t=>y(le).or(A).or(P).or(d).eval(t)),me=e=>e.flatMap(t=>t.nodeName==="UL"?[...t.querySelectorAll("li > a")]:[t]),pe=e=>{if(e.querySelector(".gnav-promo"))throw new Error("This is a promo");if(e.querySelector(".column-break"))throw new i("Has a column break");let t=e.firstElementChild;if(t===null)throw new i("No Children");let r=t.nodeName==="H5"?t.textContent??null:null,n=t.nodeName==="H5"?S(t):[...e.children],o=me(n),[s,a]=ue(o);return[{type:"SingleColumnSection",title:r,items:s},a]},z=e=>{if(e.querySelector(".column-break"))throw new i("Has a column break");let t=[...e.querySelectorAll("h5")];if(t.length<=1)throw new i("Not a section list");let r=s=>{let a=document.createElement("div"),c=_(u=>u.nodeName!=="H5")(S(s));return a.append(s,...c),pe(a)},[n,o]=f(t,r);return[{type:"SingleColumnSectionList",sections:n},o]},_e=e=>{if(!e.querySelector(".column-break"))throw new i("Expected a Column Break");let t=e.firstElementChild;if(t===null||t.nodeName!=="H5")throw new i($.expectedH5);let r=t.textContent;if(r===""||r===null)throw new i($.emptyTitle);let o=X(c=>c.classList.contains("column-break"))(S(t)).map(me),[s,a]=f(o,ue);return[{type:"MultiColumnSection",title:r,columns:s},a]},K=e=>{if(e===null)throw new i($.elementNull);let t=e.querySelector(".gnav-promo, .gnav-image");if(t===null)throw new i($.noPromo);let r=t.innerHTML??"";if(r==="")throw new i($.noPromoContent);return[{type:"MenuPromo",content:r},[]]},$={expectedH5:"Expected an H5 element for the title ",emptyTitle:"Expected Title to not be empty",elementNull:"Element is null",noPromo:"Promo or gnav image not found",noPromoContent:"Promo Content not found"};var fe=e=>{let t=new Set;if(e===null)throw new i(de.elementNull);let r=e.querySelector("h2")?.textContent??"";r===""&&t.add(new p(de.noTitle));let n=(async()=>{try{let u=e.querySelector("h2 > a"),l=new URL(u?.href??""),m=await x(l);if(m instanceof i)throw new Error(m.message);let T=await ee(m);if(T instanceof i)throw new Error(T.message);let E=[...T.children],[I,C]=f(E,ce);return[I.flat(),C]}catch(u){throw new i(u?.message)}})(),o=e.querySelectorAll(".cross-cloud-menu ul > li > a"),[s,a]=f([...o],d),c=e.classList.contains("section");return[{type:"MegaMenu",title:r,tabs:n,crossCloudMenu:s,isSection:c},[...a,...t]]},de={elementNull:"Element is null",noTitle:"Large Menu has no Title"};var ge=e=>{let t=()=>({name:"",description:""}),r=[0,1,2,3].map(t);return`
  <div class="feds-popup loading" aria-hidden="true">
    <div class="top-bar">
    </div>
    <div class="title">
      <h2>${e}</h2>
    </div>
    <div class="tabs" role="tablist">
      ${r.map(({name:n,description:o},s)=>`
        <div class="tab-wrapper">
          <button
          role="tab"
          class="tab"
          aria-selected="false"
          aria-controls="${s}"
          >${n.trim()===""?"<div></div>":n}</button>
          ${o?`<div class="feds-menu-description">${o}</div>`:""}
        </div>
      `).join("")}
    </div>
    <div class="tab-content">
    ${r.map((n,o)=>`
        <div
          id="${o}"
          role="tabpanel"
          aria-labelledby="${o}"
          class="feds-navLink-content"
        >
      <div class="feds-navLink-title"></div>
      <div class="feds-navLink-description"></div>
      </div>`).join("")}
  </div>
  `},ye=({title:e,isSection:t})=>`
  <button type="button"
          aria-expanded="false"
          aria-controls="${w(e)}"
          class="mega-menu"
  >
    ${e}
  </button>
  <div id="${w(e)}" class="feds-popup${t?"":" section"}">
    <ul>
      
    </ul>
  </div>
`;var he=e=>{let t=[];if(e===null)throw new i(be.elementNull);let r=e.querySelector("h2"),n=r?.textContent??"";n===""&&t.push(new p(be.noTitle));let o=(()=>{if(r===null)return e;let l=document.createElement("div");return S(r).forEach(m=>l.appendChild(m)),l})(),[s,a]=y(z).or(l=>f([...l.children],Ze)).eval(o),[c,u]=(()=>{try{return K(e)}catch{return[null,[]]}})();return[{type:"SmallMenu",title:n,columns:s,promo:c},[...a,...u]]},Ze=e=>{if(e.nodeName!=="UL")throw new Error("");let t=[...e.querySelectorAll("ul > li > a")];return f(t,d)},be={elementNull:"The element to be parsed is null",noTitle:"Small menu has no title"};var ve=e=>{switch(e.type){case"LinkGroupHeader":return We(e);case"LinkGroupLink":return ze(e);case"LinkGroupBlue":return Ke(e);default:return console.error(e),""}},We=({title:e,classes:t})=>`
  <div role="heading" class="${t.join(",")}">
    <div class="title">${e}</div>
  </div>
`,ze=({iconHref:e,iconAlt:t,title:r,href:n,subtitle:o})=>{let a=t!==null&&e!==null?`
      <picture>
        <img
          loading="lazy"
          src="${e}"
          alt="${t}"
        >
      </picture>
    `:"";return`
    <a class="link-group" href="${n}">
      ${a}
      <div class="content">
        <div class="title">${r}</div>
        <div class="subtile">${o}</div>
      </div>
    </a>
  `},Ke=({link:e})=>`
  <a href="${e.href}" class="link-group blue">
    ${e.text}
  </a>
`;var Le=e=>`
  <div class="tabs" role="tablist">
    ${e.map((t,r)=>`
      <button
        role="tab"
        class="tab"
        aria-selected="false"
        aria-controls="${r}"
      >
        ${t.title===""?"<div></div>":t.title}
      </button>
    `).join("")}
  </div>
  <div class="tab-content">
    ${e.map((t,r)=>`
      <div
        id="${r}"
        role="tabpanel"
        class="${Array.isArray(t.columns)&&t.columns.flat().some(n=>n.type==="LinkGroupHeader")?"has-subheader":""}"
        hidden
      >
        <ul>
        ${Array.isArray(t.columns)?b(t.columns,n=>`
                              <ul>
                                ${b(n.filter(o=>o.type!=="PrimaryCTA"),q)}
                              </ul>
                            `):t.columns.content}
        </ul>
        <div class="sticky-cta">
          ${t.CTA?q(t.CTA):""}
        </div>
      </div>
    `.trim()).join("")}
  </div>
`.trim(),Te=({content:e})=>e,q=e=>{switch(e.type){case"LinkGroupHeader":case"LinkGroupLink":case"LinkGroupBlue":return ve(e);case"Link":return M(e);case"PrimaryCTA":return R(e);case"SecondaryCTA":return H(e);default:return""}};var Ee=({title:e,columns:t,promo:r})=>`
  <button type="button"
          aria-expanded="false"
          aria-controls="${w(e)}"
  >
    ${e}
  </button>
  <div class="feds-popup" id="${w(e)}">
    ${Je(t)}
    ${r===null?"":`<li>${Te(r)}</li>`}
  </div>
`,Je=e=>!Array.isArray(e)&&e?.type==="SingleColumnSectionList"?Ve(e):`
  <ul>
    ${b(e,t=>`
      <ul>
        ${b(t,M)}
      </ul>
    `)}
  </ul>
  `,Ve=e=>`
  <ul>
    ${b(e.sections,t=>`
      <ul>
        ${t.title===null?"":`<span class="column-section-title">${t.title}</span>`}
        ${b(t.items,q)}
      </ul>
    `.trim())}
  </ul>
`.trim();var Ce={elementNull:"Error when parsing text. Element is null",textContentNull:"Error when parsing text. Element has no textContent"},Se=e=>{if(e===null)return[{type:"Text",content:""},[new p(Ce.elementNull,"Minor")]];let t=e.textContent;return t===null?[{type:"Text",content:""},[new p(Ce.textContentNull,"Minor")]]:[{type:"Text",content:t},[]]};var xe=({content:e})=>e;var we=e=>{if(e===null)throw new i(Xe.elementNull);if(e.querySelector(".gnav-brand")!==null)return re(e);let r=e.querySelector(".large-menu");return r!==null?fe(r):e.querySelector("h5, ul, link-group")!==null?he(e):e.querySelector("strong")!==null?A(e):e.querySelector("em")!==null?P(e):e.querySelector("a")===null?Se(e):d(e.querySelector("a"))},ke=e=>{switch(e.type){case"Text":return xe(e);case"Link":return M(e);case"SecondaryCTA":return H(e);case"PrimaryCTA":return R(e);case"Brand":return oe(e);case"SmallMenu":return Ee(e);case"MegaMenu":return ye(e);default:return console.error(`Failed to recognize component: ${e}`),""}},Xe={elementNull:"Element is null"};var Me=e=>{let[t,r]=f([...document.querySelectorAll(".breadcrumbs ul > li > a")??[]],d),[n,o]=f([...e.children],we),s=e.querySelector(".product-entry-cta"),[a,c]=(()=>{try{return ae(s)}catch{return[null,[]]}})(),u=n.filter(m=>m.type==="MegaMenu"&&m.isSection).length===1,l=[r,o,c].flat();return{breadcrumbs:t,components:n,productCTA:a,localnav:u,errors:l}};var Qe=e=>{let t=[...e.querySelectorAll('.tabs > button[role="tab"]')],r=[...e.querySelectorAll(".tab-content > div")],n=t.map((o,s)=>()=>{t.forEach(a=>{a.setAttribute("aria-selected","false")}),r.forEach(a=>{a.setAttribute("hidden","true")}),r[s]?.removeAttribute("hidden"),o.setAttribute("aria-selected","true")});return t.forEach((o,s)=>{o.addEventListener("click",n[s])}),()=>{t.forEach((o,s)=>{o.removeEventListener("click",n[s])})}};var Ae=Qe;var Ye=e=>()=>console.log(e),et=e=>()=>console.log(e),Pe=Q({mobileEventListeners:et,desktopEventListeners:Ye});var Re=async({gnavSource:e,asideSource:t})=>{let r=await x(e);if(r instanceof i)return r;let n=await x(t);return{mainNav:r,aside:n}};var tt=`/**
 * Global Navigation Styles
 * Styles for the federal global navigation component
 */

/* ========================================
   Header Container
   ======================================== */

header.global-navigation.site-pivot {
    display: block;
    visibility: visible;
}

header.global-navigation.site-pivot ul {
    list-style: none;
}
`,He=document.createElement("style");He.textContent=tt;document.head.appendChild(He);var un=async e=>{if(!(e.gnavSource instanceof URL))throw new i("gnavSource needs to be a URL object");let t=await Re(e);if(t instanceof i)throw t;let{mainNav:r,aside:n}=t;if(r instanceof i)throw r;let o=Me(r);if(o instanceof i)throw o;return await rt(o)(e.mountpoint),ot(e)},rt=e=>async t=>{let r=nt(e);t.innerHTML=r,t.classList.add("site-pivot");let n=[...t.querySelectorAll(".mega-menu ~ .feds-popup > ul")];n.forEach(a=>{a.innerHTML=ge(a.textContent?.trim()??"")});let o=e.components.filter(a=>a.type==="MegaMenu").map(a=>a.tabs),s=await Promise.all(o.map(async(a,c)=>{let[u,l]=await a,m=Le(u);return n[c].innerHTML=m,l}).flat());return t},nt=({components:e,productCTA:t})=>`
<nav>
  <ul>
    ${b(e,ke)}
  </ul>
  ${t===null?"":se(t)}
  <div class="feds-utilities">
  </div>
</nav>
`,ot=e=>{let t=new Set,r=it(e.mountpoint);r instanceof p?t.add(r):r.errors.forEach(t.add),Ae(e.mountpoint),Pe(e.mountpoint);let n=r instanceof p?()=>{}:r.reloadUnav;return{closeEverything:at,reloadUnav:n,errors:t,setGnavTopPosition:o=>{},getGnavTopPosition:()=>0}},it=(e,t)=>new p("loadUnav has not been implemented yet"),at=()=>{};export{un as main,ot as postRenderingTasks,rt as renderGnav,nt as renderGnavString};
//# sourceMappingURL=main.js.map
