import{r as o}from"./index-CBqU2yxZ.js";import{P as l}from"./previewer-zOZemEkL.js";import{i as P,P as w,b as h,c as E}from"./index-BisR2S7Q.js";import{a as s}from"./FileSaver.min-GPj8h9Dk.js";import{S,P as m}from"./startCase-D732WrYE.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-BdbcaEid.js";import"./subs-Cgx4Eb1R.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-BPGUNDjC.js";import"./index-Bl6ORisp.js";import"./Typography-5yBsSdYl.js";import"./useSlotProps-CeQ2hkUT.js";import"./TransitionGroupContext-CoLYZPpo.js";import"./ButtonBase-DBvZsvUd.js";import"./assertThisInitialized-B9jnkVVz.js";import"./inheritsLoose-B7h9gheN.js";import"./dividerClasses-BQlZRdsc.js";import"./iframe-Doa08hs7.js";import"../sb-preview/runtime.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";var C=Math.ceil,R=Math.max;function F(n,r,e,t){for(var v=-1,c=R(C((r-n)/(e||1)),0),d=Array(c);c--;)d[++v]=n,n+=e;return d}function _(n){return function(r,e,t){return t&&typeof t!="number"&&P(r,e,t)&&(e=t=void 0),r=s(r),e===void 0?(e=r,r=0):e=s(e),t=t===void 0?r<e?1:-1:s(t),F(r,e,t)}}var B=_();const V={component:l},i=()=>o.createElement(w,{cwd:"/src/playgrounds/xstate"},o.createElement(l,null)),a=()=>{const n=o.useMemo(()=>h.create({cwd:"/src/playgrounds/xstate"}),[]);return o.useEffect(()=>{const r=n.explore.readFileSync("index.tsx","utf-8");return n.explore.writeFileSync("index.tsx",`

      const div = document.createElement('div');
      div.textContent = "hello world";
      document.body.append(div);


      ${B(100).map(e=>`console.log('hello world ${e}')`).join(`
`)}

      console.error('some error logs'); 
      console.error('some error logs2'); 
      
      throw new Error('some error happens');
    `),()=>{n.explore.writeFileSync("index.tsx",r)}}),o.createElement(E,{value:n},o.createElement(S,{spacing:2},o.createElement(m,null,o.createElement(l,null)),o.createElement(m,null,o.createElement(l.Console,{height:300}))))};i.__docgenInfo={description:"",methods:[],displayName:"Base"};a.__docgenInfo={description:"",methods:[],displayName:"RuntimeInfo"};var u,p,g;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  return <PlaygroundProviderBuilder cwd="/src/playgrounds/xstate">
      <Previewer />
    </PlaygroundProviderBuilder>;
}`,...(g=(p=i.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var x,y,f;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const playground = React.useMemo(() => Playground.create({
    cwd: "/src/playgrounds/xstate"
  }), []);
  React.useEffect(() => {
    const existingCode = playground.explore.readFileSync("index.tsx", "utf-8");
    playground.explore.writeFileSync("index.tsx", \`

      const div = document.createElement('div');
      div.textContent = "hello world";
      document.body.append(div);


      \${range(100).map(i => \`console.log('hello world \${i}')\`).join("\\n")}

      console.error('some error logs'); 
      console.error('some error logs2'); 
      
      throw new Error('some error happens');
    \`);
    return () => {
      playground.explore.writeFileSync("index.tsx", existingCode);
    };
  });
  return <PlaygroundProvider value={playground}>
      <Stack spacing={2}>
        <Paper>
          <Previewer />
        </Paper>

        <Paper>
          <Previewer.Console height={300} />
        </Paper>
      </Stack>
    </PlaygroundProvider>;
}`,...(f=(y=a.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};const W=["Base","RuntimeInfo"];export{i as Base,a as RuntimeInfo,W as __namedExportsOrder,V as default};
