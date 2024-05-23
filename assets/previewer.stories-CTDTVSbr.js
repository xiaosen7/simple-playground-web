import{r as e}from"./index-CBqU2yxZ.js";import{P as t,r as g}from"./previewer-BjoloniC.js";import{P as y,b as x,c as P}from"./index-Ot4FPyMv.js";import{S as v,P as a}from"./startCase-CXMyWpNW.js";import"./_commonjsHelpers-BosuxZz1.js";import"./undomanager-DgycbOGT.js";import"./iframe-BZCXwl5t.js";import"../sb-preview/runtime.js";import"./index-BdbcaEid.js";import"./index-Bl6ORisp.js";import"./styled-COiZKFch.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-BPGUNDjC.js";import"./Typography-B4tSQxDB.js";import"./useSlotProps-B9ta8Ox-.js";import"./TransitionGroupContext-B0DYWRHX.js";import"./ButtonBase-FzN6Indi.js";import"./assertThisInitialized-B9jnkVVz.js";import"./inheritsLoose-B7h9gheN.js";const q={component:t},r=()=>e.createElement(y,{cwd:"/src/playgrounds/1"},e.createElement(t,null)),o=()=>{const n=e.useMemo(()=>x.create({cwd:"/src/playgrounds/1"}),[]);return e.useEffect(()=>{const s=n.explore.readFileSync("index.tsx","utf-8");return console.log({existingCode:s}),n.explore.writeFileSync("index.tsx",`

      const div = document.createElement('div');
      div.textContent = "hello world";
      document.body.append(div);


      ${g(100).map(u=>`console.log('hello world ${u}')`).join(`
`)}

      console.error('some error logs'); 
      console.error('some error logs2'); 
      
      throw new Error('some error happens');
    `),()=>{n.explore.writeFileSync("index.tsx",s)}}),e.createElement(P,{value:n},e.createElement(v,{spacing:2},e.createElement(a,null,e.createElement(t,null)),e.createElement(a,null,e.createElement(t.Console,{height:300}))))};r.__docgenInfo={description:"",methods:[],displayName:"Base"};o.__docgenInfo={description:"",methods:[],displayName:"RuntimeInfo"};var l,i,d;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  return <PlaygroundProviderBuilder cwd="/src/playgrounds/1">
      <Previewer />
    </PlaygroundProviderBuilder>;
}`,...(d=(i=r.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var c,p,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const playground = React.useMemo(() => Playground.create({
    cwd: "/src/playgrounds/1"
  }), []);
  React.useEffect(() => {
    const existingCode = playground.explore.readFileSync("index.tsx", "utf-8");
    console.log({
      existingCode
    });
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
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const z=["Base","RuntimeInfo"];export{r as Base,o as RuntimeInfo,z as __namedExportsOrder,q as default};
