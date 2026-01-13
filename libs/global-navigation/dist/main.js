var s=class e extends Error{constructor(n){super(n),Object.setPrototypeOf(this,e.prototype)}},d=class e extends Error{constructor(n,t="Minor"){super(n),Object.setPrototypeOf(this,e.prototype)}};var _=window.matchMedia("(min-width: 900px)"),K={brand:'<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 64.57 35"><defs><style>.cls-1{fill: #eb1000;}</style></defs><path class="cls-1" d="M6.27,10.22h4.39l6.2,14.94h-4.64l-3.92-9.92-2.59,6.51h3.08l1.23,3.41H0l6.27-14.94ZM22.03,13.32c.45,0,.94.04,1.43.16v-3.7h3.88v14.72c-.89.4-2.81.89-4.73.89-3.48,0-6.47-1.98-6.47-5.93s2.88-6.13,5.89-6.13ZM22.52,22.19c.36,0,.65-.07.94-.16v-5.42c-.29-.11-.58-.16-.96-.16-1.27,0-2.45.94-2.45,2.92s1.2,2.81,2.47,2.81ZM34.25,13.32c3.23,0,5.98,2.18,5.98,6.02s-2.74,6.02-5.98,6.02-6-2.18-6-6.02,2.72-6.02,6-6.02ZM34.25,22.13c1.11,0,2.14-.89,2.14-2.79s-1.03-2.79-2.14-2.79-2.12.89-2.12,2.79.96,2.79,2.12,2.79ZM41.16,9.78h3.9v3.7c.47-.09.96-.16,1.45-.16,3.03,0,5.84,1.98,5.84,5.86,0,4.1-2.99,6.18-6.53,6.18-1.52,0-3.46-.31-4.66-.87v-14.72ZM45.91,22.17c1.34,0,2.56-.96,2.56-2.94,0-1.85-1.2-2.72-2.5-2.72-.36,0-.65.04-.91.16v5.35c.22.09.51.16.85.16ZM58.97,13.32c2.92,0,5.6,1.87,5.6,5.64,0,.51-.02,1-.09,1.49h-7.27c.4,1.32,1.56,1.94,3.01,1.94,1.18,0,2.27-.29,3.5-.82v2.97c-1.14.58-2.5.82-3.9.82-3.7,0-6.58-2.23-6.58-6.02s2.61-6.02,5.73-6.02ZM60.93,18.02c-.2-1.27-1.05-1.78-1.92-1.78s-1.58.54-1.87,1.78h3.79Z"/></svg>',company:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none"><path d="M14.2353 21.6209L12.4925 16.7699H8.11657L11.7945 7.51237L17.3741 21.6209H24L15.1548 0.379395H8.90929L0 21.6209H14.2353Z" fill="#EB1000"/></svg>',search:'<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false"><path d="M14 2A8 8 0 0 0 7.4 14.5L2.4 19.4a1.5 1.5 0 0 0 2.1 2.1L9.5 16.6A8 8 0 1 0 14 2Zm0 14.1A6.1 6.1 0 1 1 20.1 10 6.1 6.1 0 0 1 14 16.1Z"></path></svg>',home:'<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 0 18 18" width="25"><path fill="#6E6E6E" d="M17.666,10.125,9.375,1.834a.53151.53151,0,0,0-.75,0L.334,10.125a.53051.53051,0,0,0,0,.75l.979.9785A.5.5,0,0,0,1.6665,12H2v4.5a.5.5,0,0,0,.5.5h4a.5.5,0,0,0,.5-.5v-5a.5.5,0,0,1,.5-.5h3a.5.5,0,0,1,.5.5v5a.5.5,0,0,0,.5.5h4a.5.5,0,0,0,.5-.5V12h.3335a.5.5,0,0,0,.3535-.1465l.979-.9785A.53051.53051,0,0,0,17.666,10.125Z"/></svg>'},le=e=>n=>{let t=[],r=[];for(let o=0;o<n.length;o++){if(e(n[o])){t.push(r),r=[];continue}r.push(n[o])}return t.push(r),t};var J=e=>n=>{if(n.length===0)return n;let[t,...r]=n;return e(t)?[t].concat(J(e)(r)):[]};var P=e=>{let n=[],t=e.nextElementSibling??null;for(;t!==null;)n.push(t),t=t.nextElementSibling??null;return n},C=e=>({eval:e,or:n=>C(t=>{try{return e(t)}catch{return n(t)}})}),h=(e,n)=>e.reduce(([t,r],o)=>{try{let[a,i]=n(o);return[[...t,a],[...r,...i]]}catch(a){return a instanceof s?[t,[a,...r]]:[t,r]}},[[],[]]),ce=({mobileEventListeners:e,desktopEventListeners:n})=>t=>{let r;_.matches?r=n(t):r=e(t),_.addEventListener("change",()=>{r?.(),r=_.matches?n(t):e(t)})},I=async e=>{try{if(e===null)return new s("URL is null");let n=ue(`${e.origin}${e.pathname.replace(/(\.html$|$)/,".plain.html")}${e.hash}`),t=await fetch(n);if(!t.ok)return new s(`Request for ${n} failed`);let r=await t.text(),{body:o}=new DOMParser().parseFromString(r,"text/html");return o}catch(n){return new s(n?.message)}},T,se=()=>{if(T)return T;let e=["https://www.adobe.com","https://business.adobe.com","https://blog.adobe.com","https://milo.adobe.com","https://news.adobe.com","graybox.adobe.com"];if(T)return T;let n=window.location.origin;T=e.some(o=>{let a=n.replace(".stage","");return o.startsWith("https://")?a===o:a.endsWith(o)})?n:"https://www.adobe.com";let r=window.location.hostname.includes(".aem.")?"aem":"hlx";return(n.includes("localhost")||n.includes(`.${r}.`))&&(T=`https://main--federal--adobecom.aem.${n.endsWith(".live")?"live":"page"}`),T},ue=(e="")=>{if(typeof e!="string"||!e.includes("/federal/"))return e;if(e.startsWith("/"))return`${se()}${e}`;try{let{pathname:n,search:t,hash:r}=new URL(e);return`${se()}${n}${t}${r}`}catch(n){console.log(`getFederatedUrl errored parsing the URL: ${e}: ${n?.message}`)}return e},pe=async e=>{let n=async(t,r)=>{if(t instanceof s)return t;try{let a=[...t.querySelectorAll('a[href*="#_inline"]')].map(async i=>{try{if(r.has(i.href))return;let l=ue(i.href),c=new URL(l),u=await I(c);if(r.add(i.href),u instanceof s)throw u;await n(u,r);let m=i.closest("div");m?m.replaceWith(...u.children):i.replaceWith(...u.children);return}catch{return}},[]);return await Promise.all(a),t}catch(o){return new s(JSON.stringify(o))}};return n(e,new Set)},E=(e,n)=>e.map(t=>`<li>${n(t)}</li>`).join(""),M=e=>e.toLowerCase().trim().replace(/[^a-z0-9]/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"").replace(/^(\d)/,"id-$1"),de=()=>!0;function rn(e,{id:n,as:t,callback:r,crossorigin:o,rel:a,fetchpriority:i}={rel:"stylesheet"}){let l=document.head.querySelector(`link[href="${e}"]`);return l?r&&r("noop"):(l=document.createElement("link"),l.setAttribute("rel",a),n&&l.setAttribute("id",n),t&&l.setAttribute("as",t),o&&l.setAttribute("crossorigin",o),i&&l.setAttribute("fetchpriority",i),l.setAttribute("href",e),r&&(l.onload=c=>r(c.type),l.onerror=c=>r(typeof c=="string"?"error":c.type)),document.head.appendChild(l)),l}function on(e,n){return rn(e,{rel:"stylesheet",callback:n})}function me(e,n=!1){n&&on(e)}var fe=(e,n,{mode:t,id:r}={})=>new Promise((o,a)=>{let i=document.querySelector(`head > script[src="${e}"]`);if(!i){let{head:c}=document;i=document.createElement("script"),i.setAttribute("src",e),r&&i.setAttribute("id",r),n&&i.setAttribute("type",n),t&&["async","defer"].includes(t)&&i.setAttribute(t,""),c.append(i)}if(i.dataset.loaded){o(i);return}let l=c=>{i.removeEventListener("load",l),i.removeEventListener("error",l),c.type==="error"?a(new Error(`error loading script: ${i.src}`)):c.type==="load"&&(i.dataset.loaded="true",o(i))};i.addEventListener("load",l),i.addEventListener("error",l)});function ge(e,n=document){let t=e&&e.includes(":")?"property":"name",r=n.head.querySelector(`meta[${t}="${e}"]`);return r&&r.content}var an=e=>{if(!e||typeof e!="object")return!1;let n=e;if(!n.locale||typeof n.locale!="object"||typeof n.locale.prefix!="string"||!n.env||typeof n.env!="object"||typeof n.env.name!="string")return!1;if(n.unav!==void 0){if(typeof n.unav!="object"||n.unav===null)return!1;let o=n.unav;if(o.profile!==void 0){if(typeof o.profile!="object"||o.profile===null)return!1;let a=o.profile;if(a.signInCtaStyle!==void 0&&a.signInCtaStyle!=="primary"&&a.signInCtaStyle!=="secondary"||a.messageEventListener!==void 0&&typeof a.messageEventListener!="function")return!1}}return!(n.jarvis!==void 0&&(typeof n.jarvis!="object"||n.jarvis===null||typeof n.jarvis.id!="string"))},[ve,w]=(()=>{let e,n=!1;return[t=>{if(!n){if(!an(t))throw new Error("MiloConfig validation failed: Invalid structure");e=t,n=!0}},()=>{if(!e)throw new Error("MiloConfig not initialized. Call setMiloConfig() first.");return e}]})(),sn={en:"US","en-gb":"GB","es-mx":"MX","fr-ca":"CA",da:"DK",et:"EE",ar:"DZ",el:"GR",iw:"IL",he:"IL",id:"ID",ms:"MY",nb:"NO",sl:"SI",sv:"SE",cs:"CZ",uk:"UA",hi:"IN","zh-hans":"CN","zh-hant":"TW",ja:"JP",ko:"KR",fil:"PH",th:"TH",vi:"VN"},he={ar:"AR_es",be_en:"BE_en",be_fr:"BE_fr",be_nl:"BE_nl",br:"BR_pt",ca:"CA_en",ch_de:"CH_de",ch_fr:"CH_fr",ch_it:"CH_it",cl:"CL_es",co:"CO_es",la:"DO_es",mx:"MX_es",pe:"PE_es",africa:"MU_en",dk:"DK_da",de:"DE_de",ee:"EE_et",eg_ar:"EG_ar",eg_en:"EG_en",es:"ES_es",fr:"FR_fr",gr_el:"GR_el",gr_en:"GR_en",ie:"IE_en",il_he:"IL_iw",it:"IT_it",lv:"LV_lv",lt:"LT_lt",lu_de:"LU_de",lu_en:"LU_en",lu_fr:"LU_fr",my_en:"MY_en",my_ms:"MY_ms",hu:"HU_hu",mt:"MT_en",mena_en:"DZ_en",mena_ar:"DZ_ar",nl:"NL_nl",no:"NO_nb",pl:"PL_pl",pt:"PT_pt",ro:"RO_ro",si:"SI_sl",sk:"SK_sk",fi:"FI_fi",se:"SE_sv",tr:"TR_tr",uk:"GB_en",at:"AT_de",cz:"CZ_cs",bg:"BG_bg",ru:"RU_ru",ua:"UA_uk",au:"AU_en",in_en:"IN_en",in_hi:"IN_hi",id_en:"ID_en",id_id:"ID_id",nz:"NZ_en",sa_ar:"SA_ar",sa_en:"SA_en",sg:"SG_en",cn:"CN_zh-Hans",tw:"TW_zh-Hant",hk_zh:"HK_zh-hant",jp:"JP_ja",kr:"KR_ko",za:"ZA_en",ng:"NG_en",cr:"CR_es",ec:"EC_es",pr:"US_es",gt:"GT_es",cis_en:"TM_en",cis_ru:"TM_ru",sea:"SG_en",th_en:"TH_en",th_th:"TH_th"};function ln(e){let n=sn[e];return!n&&he[e]&&(n=e),!n&&e.includes("-")&&([n]=e.split("-")),n||"US"}var V="langstore/";function ye(e){let t=(e?.prefix||"US_en").replace("/","")??"",[r="US",o="en"]=(he[t]??t).split("_",2);if(t.startsWith(V)||window.location.pathname.startsWith(`/${V}`)){let a=t.replace(V,"").toLowerCase();r=ln(a),o=a}return r=r.toUpperCase(),o=o.toLowerCase(),{language:o,country:r,locale:`${o}_${r}`}}var O={elementNull:"Error when parsing Brand. Element is null",noLinks:"Error when parsing Brand. No links found",noPrimaryLink:"Error when parsing Brand. No primary link found"},R=/(\.png|\.jpg|\.jpeg|\.svg)/i,cn=e=>{let n=e.querySelector("picture img")?.getAttribute("src")??null;if(n!==null&&n!=="")return n;let t=e.textContent?.trim();if(t!==void 0&&t!==""&&R.test(t)){let o=t.split("|")[0]?.trim();if(o!==void 0&&o!=="")return o}let r=e.getAttribute("href");return r!==null&&r!==""&&R.test(r)?r:null},un=e=>{let n=e.textContent?.trim();if(n?.includes("|")===!0){let r=n.split("|")[1]?.trim();if(r)return r}return e.querySelector("img")?.getAttribute("alt")??""},be=e=>{if(e===null)throw new s(O.elementNull);let n=e.querySelector(".gnav-brand");if(n===null)throw new s(O.elementNull);let t=[...n.querySelectorAll("a")];if(t.length===0)throw new s(O.noLinks);let r=t.find(p=>{let g=p.textContent??"";return!R.test(p.href)&&!R.test(g)});if(!r)throw new s(O.noPrimaryLink);let o=n.matches(".brand-image-only"),a=n.matches(".no-logo"),i=n.matches(".image-only"),l=!a,c=!o&&!i,u=t.filter(p=>{let g=p.textContent??"";return R.test(p.href)||R.test(g)}),[m,f,b]=(()=>{let p=o?K.brand:K.company,[g=null,k=null]=[...n.querySelectorAll('picture img[src$=".svg"]')].map(Z=>Z?.src).filter(Z=>Z?.length>0),[D=null,nn=null]=u.map(cn),tn=u[0]instanceof Element?un(u[0]):r.textContent?.trim()??"";return[D??g??p,nn??k,tn]})(),y=r.textContent?.trim()??"",L=r.href;if(!l&&!c)return[{type:"Brand",data:{type:"NoRender"}},[]];let S=(p,g)=>{let k=g!=null&&g!=="";return de()&&k?g:p},A=m.startsWith("<svg")?{type:"inline-svg",svgContent:S(m,f),alt:b}:{type:"image",src:S(m,f),alt:b};return l&&c?[{type:"Brand",data:{type:"LabelledBrand",href:L,label:y,image:A}},[]]:l&&o?[{type:"Brand",data:{type:"BrandImageOnly",href:L,image:A,alt:b}},[]]:l&&i?[{type:"Brand",data:{type:"ImageOnlyBrand",href:L,image:A,alt:b}},[]]:[{type:"Brand",data:{type:"BrandLabelOnly",href:L,label:y}},[]]};var pn=`.feds-brand-container {
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
}`,Le=document.createElement("style");Le.textContent=pn;document.head.appendChild(Le);var Y=(e,n)=>{let t=`feds-brand-image${n?" brand-image-only":""}`;if(e.type==="inline-svg")return`<span class="${t}">${e.svgContent}</span>`;let r=e.alt?` alt="${e.alt}"`:"";return`<span class="${t}"><img src="${e.src}"${r} /></span>`},j=(e,n,t="")=>`<div class="feds-brand-container">
    <a href="${e}" class="feds-brand" daa-ll="Brand"${t}>
      ${n}
    </a>
  </div>`.trim(),Ce=e=>{let{data:n}=e;switch(n.type){case"LabelledBrand":return j(n.href,Y(n.image,!1)+`<span class="feds-brand-label">${n.label}</span>`);case"BrandImageOnly":{let t=n.alt?` aria-label="${n.alt}"`:"";return j(n.href,Y(n.image,!0),t)}case"ImageOnlyBrand":{let t=n.alt?` aria-label="${n.alt}"`:"";return j(n.href,Y(n.image,!1),t)}case"BrandLabelOnly":return j(n.href,`<span class="feds-brand-label">${n.label}</span>`);case"NoRender":return"";default:return""}};var q={elementNull:"Error when parsing Link. Element is null",notAnchor:"Cannot parse non-anchor as Link",textContentNotFound:"Error when parsing Link. Element has no textContent",hrefNotFound:"Element has no href"},v=e=>{if(e===null)throw new s(q.elementNull);if(e.tagName!=="A")throw new s(q.notAnchor);let n=e?.textContent??"";if(n==="")throw new s(q.textContentNotFound);let t=e?.getAttribute("href")??"";if(t==="")throw new s(q.hrefNotFound);return[{type:"Link",text:n,href:t},[]]};var Ee=e=>n=>{if(n===null)throw new Error("");let t=n.querySelector(dn(e));if(!t)throw new Error("");let[{text:r,href:o},a]=v(t);return[{type:e.type,text:r,href:o},a]},$=Ee({type:"PrimaryCTA"}),U=Ee({type:"SecondaryCTA"}),xe=e=>C($).or(U).eval(e),dn=({type:e})=>{switch(e){case"PrimaryCTA":return"strong > a";case"SecondaryCTA":return"em > a";default:throw new Error("")}};var N=({text:e,href:n})=>`
<a href="${n}" class="feds-primary-cta">
  ${e}
</a>
`,G=({text:e,href:n})=>`
<a href="${n}" class="feds-secondary-cta">
  ${e}
</a>
`,we=e=>e.type==="PrimaryCTA"?N(e):G(e);var H=({text:e,href:n})=>`<a class="feds-link" href="${n}">${e}</a>`;var Se=e=>C(fn).or(mn).or(gn).eval(e),x={elementNull:"Element not found",noTitleAnchor:"Title anchor not found",noHref:"Title Anchor has no href",noTitle:"Title text not found",noSubtitleP:"Subtitle <p> not found",noSubtitle:"Subtitle text not found",notAHeader:"Expected a Header class"},mn=e=>{let n=new Set;if(!e)throw new s(x.elementNull);let t=e.querySelector("p a");if(!t)throw new s(x.noTitleAnchor);let r=t.textContent??"";r===""&&n.add(new d(x.noTitle));let o=t.getAttribute("href")??"";o===""&&n.add(new d(x.noHref));let a=t?.closest("p")?.nextElementSibling;if(!a)throw new s(x.noSubtitleP);let i=a.textContent??"";i===""&&n.add(new d(x.noSubtitle));let[l=null,c=null]=(e.firstElementChild?.firstElementChild?.textContent?.split("|")??[]).map(u=>u.trim());return[{type:"LinkGroupLink",iconHref:l,iconAlt:c,title:r,href:o,subtitle:i},[...n]]},fn=e=>{if(!e)throw new s(x.elementNull);let n=[...e.classList];if(!n.includes("header"))throw new s(x.notAHeader);let t=e.querySelector("a")?.textContent??"";if(t==="")throw new s(x.noTitle);return[{type:"LinkGroupHeader",title:t,classes:n},[]]},gn=e=>{if(!e)throw new s(x.elementNull);if(!e.classList.contains("blue"))throw new Error("Not a Blue Link Group");let n=e.querySelector("a"),[t,r]=v(n);return[{type:"LinkGroupBlue",link:t},r]};var ke=e=>{let[n,t]=vn(e);return(()=>{switch(n.type){case"SingleColumnSection":return[[{type:"Tab",title:n.title,columns:[n.items],CTA:X(n)}],t];case"SingleColumnSectionList":return[n.sections.flatMap(r=>({type:"Tab",title:r.title,columns:[r.items],CTA:X(r)})),t];case"MultiColumnSection":return[[{type:"Tab",title:n.title,columns:n.columns,CTA:X(n)}],t];case"MenuPromo":return[[{type:"Tab",title:"More",columns:n,CTA:void 0}],t];default:return[[],[]]}})()},X=e=>e.type==="SingleColumnSection"?e.items.find(n=>n.type==="PrimaryCTA"):e.columns.flat().find(n=>n.type==="PrimaryCTA"),vn=e=>C(Q).or(Ae).or(hn).or(ee).eval(e),Te=e=>h(e,n=>C(Se).or($).or(U).or(v).eval(n)),Me=e=>e.flatMap(n=>n.nodeName==="UL"?[...n.querySelectorAll("li > a")]:[n]),Ae=e=>{if(e.querySelector(".gnav-promo"))throw new Error("This is a promo");if(e.querySelector(".column-break"))throw new s("Has a column break");let n=e.firstElementChild;if(n===null)throw new s("No Children");let t=n.nodeName==="H5"?n.textContent??null:null,r=n.nodeName==="H5"?P(n):[...e.children],o=Me(r),[a,i]=Te(o);return[{type:"SingleColumnSection",title:t,items:a},i]},Q=e=>{if(e.querySelector(".column-break"))throw new s("Has a column break");let n=[...e.querySelectorAll("h5")];if(n.length<=1)throw new s("Not a section list");let t=a=>{let i=document.createElement("div"),l=J(c=>c.nodeName!=="H5")(P(a));return i.append(a,...l),Ae(i)},[r,o]=h(n,t);return[{type:"SingleColumnSectionList",sections:r},o]},hn=e=>{if(!e.querySelector(".column-break"))throw new s("Expected a Column Break");let n=e.firstElementChild;if(n===null||n.nodeName!=="H5")throw new s(B.expectedH5);let t=n.textContent;if(t===""||t===null)throw new s(B.emptyTitle);let o=le(l=>l.classList.contains("column-break"))(P(n)).map(Me),[a,i]=h(o,Te);return[{type:"MultiColumnSection",title:t,columns:a},i]},ee=e=>{if(e===null)throw new s(B.elementNull);let n=e.querySelector(".gnav-promo, .gnav-image");if(n===null)throw new s(B.noPromo);let t=n.innerHTML??"";if(t==="")throw new s(B.noPromoContent);return[{type:"MenuPromo",content:t},[]]},B={expectedH5:"Expected an H5 element for the title ",emptyTitle:"Expected Title to not be empty",elementNull:"Element is null",noPromo:"Promo or gnav image not found",noPromoContent:"Promo Content not found"};var Pe=e=>{let n=new Set;if(e===null)throw new s(_e.elementNull);let t=e.querySelector("h2")?.textContent??"";t===""&&n.add(new d(_e.noTitle));let r=(async()=>{try{let c=e.querySelector("h2 > a"),u=new URL(c?.href??""),m=await I(u);if(m instanceof s)throw new Error(m.message);let f=await pe(m);if(f instanceof s)throw new Error(f.message);let b=[...f.children],[y,L]=h(b,ke);return[y.flat(),L]}catch(c){throw new s(c?.message)}})(),o=e.querySelectorAll(".cross-cloud-menu ul > li > a"),[a,i]=h([...o],v),l=e.classList.contains("section");return[{type:"MegaMenu",title:t,tabs:r,crossCloudMenu:a,isSection:l},[...i,...n]]},_e={elementNull:"Element is null",noTitle:"Large Menu has no Title"};var yn=`.mega-menu::after {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-left: 8px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg) translateY(-1px);
  transform-origin: center;
  transition: transform 150ms ease;
  pointer-events: none;
}

.mega-menu:has(+ .feds-popup:popover-open)::after {
  transform: rotate(-135deg) translateY(1px);
  margin-top: 8px;
}

.feds-popup {
  display: none;
}

.feds-popup:popover-open {
    display: flex;
    flex-direction: row;
    justify-content: start;
    translate: 0;
    opacity: 1;
    z-index: 2;
    transition: translate 0.4s ease-out, opacity 0.2s ease, visibility 0s linear 0s;
    visibility: visible;
    background-color: #000;
    align-items: start;
    margin-top: 1px;
    padding: 12px 0;
    padding-left: 15%;
    width: 100%;
    height: calc(100vh - 64px);
    position: absolute;
    left: 0;
    box-shadow: 0 3px 3px 0 rgb(0 0 0 / 20%);
    transform: translate3d(0, 0, 0);
    top: var(--feds-nav-height);
}
`,Ie=document.createElement("style");Ie.textContent=yn;document.head.appendChild(Ie);var Re=e=>{let n=()=>({name:"",description:""}),t=[0,1,2,3].map(n);return`
  <div class="feds-popup loading" aria-hidden="true">
    <div class="top-bar">
    </div>
    <div class="title">
      <h2>${e}</h2>
    </div>
    <div class="tabs" role="tablist">
      ${t.map(({name:r,description:o},a)=>`
        <div class="tab-wrapper">
          <button
          role="tab"
          class="tab"
          aria-selected="false"
          aria-controls="${a}"
          >${r.trim()===""?"<div></div>":r}</button>
          ${o?`<div class="feds-menu-description">${o}</div>`:""}
        </div>
      `).join("")}
    </div>
    <div class="tab-content">
    ${t.map((r,o)=>`
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
  `},He=({title:e,isSection:n})=>`
  <button type="button"
          aria-expanded="false"
          aria-controls="${M(e)}"
          class="mega-menu feds-link"
          popovertarget="${M(e)}"
  >
    ${e}
  </button>
  <div id="${M(e)}" popover class="feds-popup${n?"":" section"}" aria-hidden="true">
    <ul>
    </ul>
  </div>
`;var Ue=e=>{let n=[];if(e===null)throw new s($e.elementNull);let t=e.querySelector("h2"),r=t?.textContent??"";r===""&&n.push(new d($e.noTitle));let o=(()=>{if(t===null)return e;let u=document.createElement("div");return P(t).forEach(m=>u.appendChild(m)),u})(),[a,i]=C(Q).or(u=>h([...u.children],bn)).eval(o),[l,c]=(()=>{try{return ee(e)}catch{return[null,[]]}})();return[{type:"SmallMenu",title:r,columns:a,promo:l},[...i,...c]]},bn=e=>{if(e.nodeName!=="UL")throw new Error("");let n=[...e.querySelectorAll("ul > li > a")];return h(n,v)},$e={elementNull:"The element to be parsed is null",noTitle:"Small menu has no title"};var Ln=`/**
 * Link Group Styles
 */
.feds-link-group {
    --title-color: #2f2f2f;
    --sub-title-color: #4b4b4b;
    --bg-hover-color: #e9e9e9;
    --accent-color: #274dea;
    --accent-color-hover: #1d3ecf;
    --header-border-color: #b6b6b6;
    --header-background-color: #eaeaea;
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

.feds-link-group--blue,
.feds-link-group--blue .feds-link-group__title {
    color: var(--accent-color);
}

.feds-link-group--blue:hover,
.feds-link-group--blue:hover .feds-link-group__title {
    color: var(--accent-color-hover);
}

/* styles overriden coming from styles.css */
.feds-link-group.feds-link-group--blue {
    text-decoration: underline;
}

.feds-link-group.feds-link-group--gray-gradient {
    background-color: var(--header-background-color);
}

@media (min-width: 900px) {
    .feds-link-group {
        --title-color: #9f9f9f;
        --sub-title-color: #9f9f9f;
        --title-color-hover: #fff;
        --sub-title-color-hover: #fff;
        --bg-hover-color: transparent;
        --header-background-color: transparent;
        padding: 0;
    }

    .feds-link-group--blue,
    .feds-link-group--blue:hover {
        color: var(--title-color-hover);
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

    .feds-link-group--blue .feds-link-group__title,
    .feds-link-group.feds-link-group--gray-gradient .feds-link-group__title{
        color: var(--title-color-hover);
    }

    .feds-link-group.feds-link-group--header .feds-link-group__title {
        color: var(--title-color);
        border-bottom: 1px solid var(--header-border-color);
    }

    .feds-link-group.feds-link-group--header .feds-link-group__content {
        width: 100%;
    }
}
`,Ne=document.createElement("style");Ne.textContent=Ln;document.head.appendChild(Ne);var Ge=e=>{switch(e.type){case"LinkGroupHeader":return Cn(e);case"LinkGroupLink":return En(e);case"LinkGroupBlue":return xn(e);default:return console.error(e),""}},Cn=({title:e,classes:n})=>`
    <div role="heading" class="feds-link-group ${n.slice(1).map(r=>`feds-link-group--${r}`).join(" ")}">
      <div class="feds-link-group__content">
        <div class="feds-link-group__title">${e}</div>
      </div>
    </div>
  `,En=({iconHref:e,iconAlt:n,title:t,href:r,subtitle:o})=>{let i=n!==null&&e!==null?`
      <picture class="feds-link-group__icon">
        <img
          loading="lazy"
          src="${e}"
          alt="${n}"
          class="feds-link-group__icon-img"
        >
      </picture>
    `:"";return`
    <a class="feds-link-group" href="${r}" daa-ll="${t}">
      ${i}
      <div class="feds-link-group__content">
        <div class="feds-link-group__title">${t}</div>
        <div class="feds-link-group__subtitle">${o}</div>
      </div>
    </a>
  `},xn=({link:e})=>`
  <a href="${e.href}" class="feds-link-group feds-link-group--blue" daa-ll="${e.text}">
    <div class="feds-link-group__content">
        <div class="feds-link-group__title">${e.text}</div>
      </div>
  </a>
`;var Be=(e,n,t,r,o)=>a=>`
  <div class="top-bar">
    ${o?e:""}
  </div>
  <div class="title">
    ${t||'<div class="breadcrumbs"></div>'}
    <h2 id="${r}-title">${n}</h2>
  </div>
  <div class="tabs" role="tablist">
    ${a.map((i,l)=>`
      <button
        role="tab"
        class="tab"
        aria-selected="false"
        aria-controls="${l}"
      >
        ${i.title===""?"<div></div>":i.title}
      </button>
    `).join("")}
  </div>
  <div class="tab-content">
    ${a.map((i,l)=>`
      <div
        id="${l}"
        role="tabpanel"
        class="${Array.isArray(i.columns)&&i.columns.flat().some(c=>c.type==="LinkGroupHeader")?"has-subheader":""}"
        hidden
      >
        <ul>
        ${Array.isArray(i.columns)?E(i.columns,c=>`
                              <ul>
                                ${E(c.filter(u=>u.type!=="PrimaryCTA"),W)}
                              </ul>
                            `):i.columns.content}
        </ul>
        <div class="sticky-cta">
          ${i.CTA?W(i.CTA):""}
        </div>
      </div>
    `.trim()).join("")}
  </div>
`.trim(),De=({content:e})=>e,W=e=>{switch(e.type){case"LinkGroupHeader":case"LinkGroupLink":case"LinkGroupBlue":return Ge(e);case"Link":return H(e);case"PrimaryCTA":return N(e);case"SecondaryCTA":return G(e);default:return""}};var Oe=({title:e,columns:n,promo:t})=>`
  <button type="button"
          aria-expanded="false"
          aria-controls="${M(e)}"
  >
    ${e}
  </button>
  <div class="feds-popup" id="${M(e)}">
    ${wn(n)}
    ${t===null?"":`<li>${De(t)}</li>`}
  </div>
`,wn=e=>!Array.isArray(e)&&e?.type==="SingleColumnSectionList"?Sn(e):`
  <ul>
    ${E(e,n=>`
      <ul>
        ${E(n,H)}
      </ul>
    `)}
  </ul>
  `,Sn=e=>`
  <ul>
    ${E(e.sections,n=>`
      <ul>
        ${n.title===null?"":`<span class="column-section-title">${n.title}</span>`}
        ${E(n.items,W)}
      </ul>
    `.trim())}
  </ul>
`.trim();var je={elementNull:"Error when parsing text. Element is null",textContentNull:"Error when parsing text. Element has no textContent"},qe=e=>{if(e===null)return[{type:"Text",content:""},[new d(je.elementNull,"Minor")]];let n=e.textContent;return n===null?[{type:"Text",content:""},[new d(je.textContentNull,"Minor")]]:[{type:"Text",content:n},[]]};var We=({content:e})=>e;var ze=e=>{if(e===null)throw new s(kn.elementNull);if(e.querySelector(".gnav-brand")!==null)return be(e);let t=e.querySelector(".large-menu");return t!==null?Pe(t):e.querySelector("h5, ul, link-group")!==null?Ue(e):e.querySelector("strong")!==null?$(e):e.querySelector("em")!==null?U(e):e.querySelector("a")===null?qe(e):v(e.querySelector("a"))},Fe=e=>{switch(e.type){case"Text":return We(e);case"Link":return H(e);case"SecondaryCTA":return G(e);case"PrimaryCTA":return N(e);case"Brand":return Ce(e);case"SmallMenu":return Oe(e);case"MegaMenu":return He(e);default:return console.error(`Failed to recognize component: ${e}`),""}},kn={elementNull:"Element is null"};var Ze=(e,n)=>{let[t,r]=h([...document.querySelectorAll(".breadcrumbs ul > li > a")??[]],v),[o,a]=h([...e.children],ze),i=e.querySelector(".product-entry-cta"),[l,c]=(()=>{try{return xe(i)}catch{return[null,[]]}})(),u=o.filter(f=>f.type==="MegaMenu"&&f.isSection).length===1,m=[r,a,c].flat();return{breadcrumbs:t,components:o,productCTA:l,localnav:u,errors:m,unavEnabled:n}};var Tn=e=>{let n=[...e.querySelectorAll('.tabs > button[role="tab"]')],t=[...e.querySelectorAll(".tab-content > div")],r=n.map((o,a)=>()=>{n.forEach(i=>{i.setAttribute("aria-selected","false")}),t.forEach(i=>{i.setAttribute("hidden","true")}),t[a]?.removeAttribute("hidden"),o.setAttribute("aria-selected","true")});return n.forEach((o,a)=>{o.addEventListener("click",r[a])}),()=>{n.forEach((o,a)=>{o.removeEventListener("click",r[a])})}};var Ve=Tn;var Mn=e=>()=>console.log(e),An=e=>()=>console.log(e),Ke=ce({mobileEventListeners:An,desktopEventListeners:Mn});var Je=["appswitcher","help"],ne={cs:["cz"],da:["dk"],de:["at"],en:["africa","au","ca","ie","in","mt","ng","nz","sg","za"],es:["ar","cl","co","cr","ec","gt","la","mx","pe","pr"],et:["ee"],ja:["jp"],ko:["kr"],nb:["no"],pt:["br"],sl:["si"],sv:["se"],uk:["ua"],zh:["cn","tw"]},[z,_n]=(()=>{let e,n,t,r=new Promise(o=>{n=o,t=setTimeout(()=>{e={},o(e)},5e3)});return[o=>{o&&!e&&(e=o,clearTimeout(t),n?.(e))},()=>r]})();function te(e,n=!1){let l=(/uc_carts=/.test(document.cookie)?e:e?.filter(u=>u!=="cart"))??[],c=l.length??3;if(n){let u=l.filter(f=>Je.includes(f)).length;return`calc(92px + ${u*32}px + ${u*.25}rem)`}return`calc(${c*32}px + ${(c-1)*.25}rem)`}var re=e=>{if(!e.prefix||e.prefix==="/")return"en_US";let n=e.prefix.replace("/","");if(n.includes("_")){let[r,o]=n.split("_").reverse();return`${r.toLowerCase()}_${o.toUpperCase()}`}if(n==="uk")return"en_GB";let t=Object.keys(ne).find(r=>ne[r].includes(n));return t?`${t.toLowerCase()}_${n.toUpperCase()}`:`${n.toLowerCase()}_${n.toUpperCase()}`},Pn={Mac:"macOS",Win:"windows",Linux:"linux",CrOS:"chromeOS",Android:"android",iPad:"iPadOS",iPhone:"iOS"},oe=()=>{let e=navigator.userAgent;for(let[n,t]of Object.entries(Pn))if(e.includes(n))return t;return"linux"},ie=async()=>{let e=window;return e.alloy?await e.alloy("getIdentity").then(n=>n?.identity?.ECID).catch(()=>{}):void 0};var Ye=()=>{try{return w().signInContext||{}}catch{return{}}},In=()=>{let e=w();return ge("signin-cta-style")==="primary"||e?.unav?.profile?.signInCtaStyle==="primary"?"primary":"secondary"},Rn=()=>{let n=w()?.unav?.profile?.messageEventListener;return n||(t=>{let{name:r,payload:o,executeDefaultAction:a}=t.detail;if(!(!r||r!=="System"||!o||typeof a!="function"))switch(o.subType){case"AppInitiated":window.adobeProfile?.getUserProfile().then(i=>{z(i)}).catch(()=>{z({})});break;case"SignOut":a();break;case"ProfileSwitch":Promise.resolve(a()).then(i=>{i&&window.location.reload()});break;default:break}})};function Hn(){let{unav:e}=w();return e?.unavHelpChildren||[{type:"Support"},{type:"Community"}]}var F=()=>{let e=w();return{profile:{name:"profile",attributes:{accountMenuContext:{sharedContextConfig:{enableLocalSection:!0,enableProfileSwitcher:!0,miniAppContext:{logger:{trace:()=>{},debug:()=>{},info:()=>{},warn:()=>{},error:()=>{}}},complexConfig:e?.unav?.profile?.complexConfig||null,...e?.unav?.profile?.config},messageEventListener:Rn()},signInCtaStyle:In(),isSignUpRequired:!1,callbacks:{onSignIn:()=>{window.adobeIMS?.signIn(Ye())},onSignUp:()=>{window.adobeIMS?.signIn(Ye())}}}},appswitcher:{name:"app-switcher"},notifications:{name:"notifications",attributes:{notificationsConfig:{applicationContext:{appID:e?.unav?.uncAppId||"adobecom",...e?.unav?.uncConfig}}}},help:{name:"help",attributes:{children:Hn()}},jarvis:{name:"jarvis",attributes:{appid:e?.jarvis?.id,callbacks:e?.jarvis?.callbacks}},cart:{name:"cart"}}};var Xe=(e,n)=>{e[0]&&"attributes"in e[0]&&e[0].attributes&&typeof e[0].attributes=="object"&&"isSignUpRequired"in e[0].attributes&&(e[0].attributes.isSignUpRequired=n)},ae=async(e,n)=>{try{let t=e.querySelector(".feds-utilities");if(!(t instanceof HTMLElement))return new d('missing ".feds-utilities" container');let r=new Set,o=document.head.querySelector('meta[name="universal-nav"]'),a=o instanceof HTMLMetaElement?o.content??"":"";o instanceof HTMLMetaElement||r.add(new d('metadata "universal-nav" is missing'));let i=a.trim();o instanceof HTMLMetaElement&&i.length===0&&r.add(new d('metadata "universal-nav" has no value'));let l=!window.adobeIMS?.isSignedInUser(),c=i.split(",").map(p=>p.trim()).filter(p=>Object.keys(F()).includes(p)||p==="signup");if(l){let p=te(c,l);t.style.setProperty("min-width",p)}let u;try{u=w()}catch{throw new Error("MiloConfig not available for UNAV initialization")}let m=re(u.locale),f=u.env.name==="prod"?"prod":"stage",b=await ie(),y=new URLSearchParams(window.location.search).get("unavVersion");/^\d+(\.\d+)?$/.test(y??"")||(y="1.5"),await Promise.all([fe(`https://${f}.adobeccstatic.com/unav/${y}/UniversalNav.js`),me(`https://${f}.adobeccstatic.com/unav/${y}/UniversalNav.css`,!0)]);let L=()=>{let p=F(),g=[p.profile];return Xe(g,!1),c?.forEach(k=>{if(k==="profile")return;if(k==="signup"){Xe(g,!0);return}let D=p[k];D&&g.push(D)}),g},S=()=>({target:t,env:f,locale:m,countryCode:ye(u?.locale)?.country||"US",imsClientId:window?.adobeid?.client_id,theme:"light",analyticsContext:{consumer:{name:"adobecom",version:"1.0",platform:"Web",device:oe(),os_version:navigator.platform},event:{visitor_guid:b}},children:L(),isSectionDividerRequired:!!u?.unav?.showSectionDivider,showTrayExperience:!_.matches});await window?.UniversalNav?.(S()),l||t?.style.removeProperty("min-width");let A=p=>{window?.UniversalNav?.reload(S())};return _.addEventListener("change",()=>{A()}),{reloadUnav:A,errors:r}}catch(t){let r=t instanceof Error?t.message:"failed to load universal nav";return new d(r)}};var Qe=async({gnavSource:e,asideSource:n})=>{let t=await I(e);if(t instanceof s)return t;let r=await I(n);return{mainNav:t,aside:r}};var $n=`/**
 * Global Navigation Styles
 * Styles for the federal global navigation component
 */

:root {
    --feds-heading-font: 'Adobe Clean Display', adobe-clean-display, adobe-clean, 'Trebuchet MS', sans-serif;
    --feds-link-color: #4B4B4B;
    --feds-nav-height: 64px;
}

header.global-navigation.site-pivot {
    visibility: visible;
    display: block;
}

.global-navigation nav ul {
    display: flex;
    width: 100%;
    max-width: var(--feds-maxWidth-nav);
    height: inherit;
    align-items: center;
}


.feds-link {
    font-size: 16px;
    font-weight: 800;
    color: #4B4B4B;
    font-family: var(--feds-heading-font);
    display: flex;
    align-items: center;
    border: 0;
    background-color: transparent;
    padding: 12px;
    color: var(--feds-link-color);
}

header.global-navigation.site-pivot nav {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: var(--feds-maxWidth-nav);
    height: var(--feds-height-nav);
    padding-left: 10%;
    justify-content: flex-start;
}

.global-navigation nav ul {
    display: flex;
    width: 100%;
    max-width: var(--feds-maxWidth-nav);
    height: inherit;
    align-items: center;
    padding-left: 0;
}

.feds-link {
    font-size: 16px;
    font-weight: 800;
    color: #4B4B4B;
    font-family: var(--feds-heading-font);
    display: flex;
    align-items: center;
    border: 0;
    background-color: transparent;
    padding: 12px;
    color: var(--feds-link-color);
    cursor: pointer;
}

header.global-navigation.site-pivot:has(.feds-popup:popover-open) {
    background-color: #000;
}

header.global-navigation.site-pivot:has(.feds-popup:popover-open) .feds-link {
    color: #fff;
}

header.global-navigation.site-pivot ul {
    list-style: none;
    margin: 0;
}`,en=document.createElement("style");en.textContent=$n;document.head.appendChild(en);var ao=async e=>{let{gnavSource:n,mountpoint:t,unavEnabled:r,miloConfig:o}=e;if(!(n instanceof URL))throw new s("gnavSource needs to be a URL object");let a=await Qe(e);if(a instanceof s)throw a;let{mainNav:i,aside:l}=a;if(i instanceof s)throw i;try{ve(o)}catch(u){throw new s(`Failed to initialize MiloConfig: ${u}`)}let c=Ze(i,r);if(c instanceof s)throw c;return await Un(c)(t),Gn(e)},Un=e=>async n=>{let t=Nn(e);n.innerHTML=t,n.classList.add("site-pivot");let r=[...n.querySelectorAll(".mega-menu ~ .feds-popup > ul")];r.forEach(i=>{i.innerHTML=Re(i.textContent?.trim()??"")});let o=e.components.filter(i=>i.type==="MegaMenu").map(i=>i.tabs),a=await Promise.all(o.map(async(i,l)=>{let[c,u]=await i,m=n.querySelector(".feds-brand-container")?.outerHTML??"",f=r[l].parentElement?.previousElementSibling?.textContent??"",b=n.querySelector(".breadcrumbs")?.outerHTML??"",y=r[l].querySelector(".feds-popup")?.id??"",L=r.length===1,S=Be(m,f,b,y,L)(c);return r[l].innerHTML=S,u}).flat());return n},Nn=({components:e,productCTA:n,unavEnabled:t})=>`
<nav>
  <ul>
    ${E(e,Fe)}
  </ul>
  ${n===null?"":we(n)}
  ${t?'<div class="feds-utilities"></div>':""}
</nav>
`,Gn=async e=>{let n=new Set,t=await ae(e.mountpoint);t instanceof d?n.add(t):t.errors.forEach(o=>n.add(o)),Ve(e.mountpoint),Ke(e.mountpoint);let r=t instanceof d?()=>{}:t.reloadUnav;return{closeEverything:Bn,reloadUnav:r,errors:n,setGnavTopPosition:o=>{},getGnavTopPosition:()=>0}},Bn=()=>{};export{ao as main,Gn as postRenderingTasks,Un as renderGnav,Nn as renderGnavString};
//# sourceMappingURL=main.js.map
