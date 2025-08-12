import{o as s,i,a as t,n as a,d as m,g as B,J as x,l as V,aj as C,bF as $,B as b,c as M,E as j,b as r,t as l,V as y,j as _,f as h,w as f,F as L,aP as N,ae as H,m as I}from"./index-DBhY06dt.js";import{a as k}from"./browserLogos-BVwt2Tt0.js";import{_ as P}from"./Tooltip.vue_vue_type_style_index_0_lang-CpM40yWe.js";const D={style:{"min-width":"16px","min-height":"16px"},width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function F(c,o){return s(),i("svg",D,[t("path",{d:"M13 2H4C3.44772 2 3 2.44772 3 3V11H4H13V2Z",class:a(["background","icon-light"]),fill:"#D0D2E0",style:{}}),t("path",{d:"M13 11V2H4M13 11H4M13 11V14H4M3 11V13C3 13.5523 3.44772 14 4 14V14M3 11V3C3 2.44772 3.44772 2 4 2V2M3 11H4M4 2V11M4 11V14M10 5H7",class:a(["border","icon-dark"]),stroke:"#1B1E2E","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})])}const ne={name:"cy-book_x16",render:F},q={style:{"min-width":"24px","min-height":"24px"},width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},E=t("path",{d:"M20.4853 20.4853C15.799 25.1716 8.20101 25.1716 3.51472 20.4853C-1.17157 15.799 -1.17157 8.20101 3.51472 3.51472C8.20101 -1.17157 15.799 -1.17157 20.4853 3.51472C25.1716 8.20101 25.1716 15.799 20.4853 20.4853Z",fill:"#FFF",class:"icon-dark"},null,-1),U=t("path",{d:"M15.999 9L11 15L8.00098 12",stroke:"white","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"icon-light"},null,-1),Z=t("circle",{cx:"12",cy:"12",r:"12",stroke:"black","stroke-width":"1",style:{stroke:"rgba(0,0,0,0.1)"}},null,-1),z=[E,U,Z];function A(c,o){return s(),i("svg",q,z)}const J={name:"cy-circle-check_x24",render:A},O=["data-browser-id","onClick"],R={class:"grow"},T={class:"font-normal mr-[20px] text-gray-500 text-[14px] filter whitespace-nowrap group-focus-within:mix-blend-luminosity group-hover:mix-blend-luminosity"},G={key:0},K={class:"flex items-center h-full align-middle"},Q={key:0,"data-cy":"top-nav-browser-list-selected-item"},W={key:1,class:"h-[16px] relative"},X={class:"text-center p-2 text-gray-300 text-[14px] leading-[20px]"},Y=t("div",{class:"mb-2 font-medium text-white"}," Unsupported browser ",-1),ae=m({__name:"VerticalBrowserListItems",props:{selectable:{type:Boolean,default:!1},gql:null,specPath:{default:""}},setup(c){const o=c,{t:p}=B();x`
fragment VerticalBrowserListItems on CurrentProject {
  id
  browsers {
    id
    isSelected
    displayName
    version
    majorVersion
    isVersionSupported
    warning
    disabled
  }
}
`,x`
mutation VerticalBrowserListItems_SetBrowser($id: ID!, $specPath: String) {
  launchpadSetBrowser(id: $id) {
    id
    ...VerticalBrowserListItems
  }
  launchOpenProject(specPath: $specPath) {
    id
  }
}
`;const u=V(()=>(o.gql.browsers??[]).slice().sort((n,d)=>n.displayName>d.displayName?1:-1)),g=C($),w=async n=>{if(n.disabled||!n.isVersionSupported||n.isSelected)return;const d={id:n.id,specPath:o.specPath};await g.executeMutation(d)};return(n,d)=>{const S=J,v=N;return o.gql?(s(!0),i(L,{key:0},b(r(u),e=>(s(),i("li",{key:e.id,class:a(["border-b border-transparent cursor-pointer flex border-b-gray-50 border-[1px] min-w-[240px] py-[12px] px-[16px] transition-colors duration-300 group focus-within-default",{"bg-jade-50":e.isSelected,"hover:bg-indigo-50 focus-within:bg-indigo-50":!e.isSelected&&!e.disabled&&e.isVersionSupported,"bg-gray-50 cursor-not-allowed":e.disabled||!e.isVersionSupported,"cursor-pointer":!e.disabled&&e.isVersionSupported}]),"data-cy":"top-nav-browser-list-item","data-browser-id":e.id,onClick:te=>w(e)},[(s(),M(j(r(k)[e.displayName?.toLowerCase()]||r(k).generic),{class:a(["mr-[16px] min-w-[26px] w-[26px] min-h-[45px]",{"filter grayscale":e.disabled||!e.isVersionSupported}]),alt:""},null,8,["class"])),t("div",R,[t("div",null,[t("button",{class:a(["box-border font-medium focus:outline-none",{"text-indigo-500 group-hover:text-indigo-700":!e.isSelected&&!e.disabled&&e.isVersionSupported,"text-jade-700":e.isSelected,"text-gray-500":e.disabled||!e.isVersionSupported}])},l(e.displayName),3),t("div",T,[y(l(r(p)("topNav.version"))+" "+l(e.majorVersion)+" ",1),e.isVersionSupported?_("",!0):(s(),i("span",G," (Unsupported) "))])])]),t("div",null,[t("div",K,[e.isSelected?(s(),i("div",Q,[h(S,{class:"h-[24px] w-[24px] icon-dark-jade-100 icon-light-jade-500"})])):e.isVersionSupported?_("",!0):(s(),i("div",W,[h(P,null,{popper:f(()=>[t("div",X,[Y,y(" "+l(e.warning),1)])]),default:f(()=>[h(v,{class:"icon-dark-gray-700 icon-light-gray-200","data-cy":"unsupported-browser-tooltip-trigger"})]),_:2},1024)]))])])],10,O))),128)):_("",!0)}}}),ee=m({inheritAttrs:!0}),re=m({...ee,__name:"HideDuringScreenshot",setup(c){const o=H(),p=V(()=>({hidden:o.isScreenshotting}));return(u,g)=>(s(),i("div",{class:a([r(p),"p-0 m-0"])},[I(u.$slots,"default")],2))}}),ce=""+new URL("cypress-dark-BaptZgkl.png",import.meta.url).href;export{ne as B,ae as _,ce as a,re as b};
