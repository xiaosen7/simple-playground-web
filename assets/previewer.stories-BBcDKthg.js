import{r as e}from"./index-CBqU2yxZ.js";import{P as t,r as g}from"./previewer-OcijlzIX.js";import{P as y,a as x,b as P}from"./index--jqDb_No.js";import{S as v,P as s}from"./startCase-CAQm6IhP.js";import"./_commonjsHelpers-BosuxZz1.js";import"./undomanager-B1W1-rsR.js";import"./iframe-DPbnKlPP.js";import"../sb-preview/runtime.js";import"./index-BdbcaEid.js";import"./subs--GlfVaQp.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-BPGUNDjC.js";import"./index-Bl6ORisp.js";import"./Typography-BHasGqqo.js";import"./useSlotProps-CHLwrfPd.js";import"./TransitionGroupContext-DMFqToW6.js";import"./ButtonBase-C69Hoppp.js";import"./assertThisInitialized-B9jnkVVz.js";import"./inheritsLoose-B7h9gheN.js";const q={component:t},r=()=>e.createElement(y,{cwd:"/src/playgrounds/1"},e.createElement(t,null)),o=()=>{const n=e.useMemo(()=>x.create({cwd:"/src/playgrounds/1"}),[]);return e.useEffect(()=>{const m=n.explore.readFileSync("index.tsx","utf-8");return n.explore.writeFileSync("index.tsx",`

      const div = document.createElement('div');
      div.textContent = "hello world";
      document.body.append(div);


      ${g(100).map(u=>`console.log('hello world ${u}')`).join(`
`)}

      console.error('some error logs'); 
      console.error('some error logs2'); 
      
      throw new Error('some error happens');
    `),()=>{n.explore.writeFileSync("index.tsx",m)}}),e.createElement(P,{value:n},e.createElement(v,{spacing:2},e.createElement(s,null,e.createElement(t,null)),e.createElement(s,null,e.createElement(t.Console,{height:300}))))};r.__docgenInfo={description:"",methods:[],displayName:"Base"};o.__docgenInfo={description:"",methods:[],displayName:"RuntimeInfo"};var a,i,l;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  return <PlaygroundProviderBuilder cwd="/src/playgrounds/1">
      <Previewer />
    </PlaygroundProviderBuilder>;
}`,...(l=(i=r.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var d,c,p;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const playground = React.useMemo(() => Playground.create({
    cwd: "/src/playgrounds/1"
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
}`,...(p=(c=o.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const z=["Base","RuntimeInfo"];export{r as Base,o as RuntimeInfo,z as __namedExportsOrder,q as default};
