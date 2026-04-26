import { useState } from "react";

// AI-generated prototype normalized for a local Vite demo shell.

/* ── DESIGN TOKENS ─────────────────────────────────────────── */
const C = {
  p:'#00488d', pC:'#005fb8', t:'#005428', tF:'#8df9a9', tFD:'#71dc8f',
  s:'#f7fafb', sL:'#f2f4f5', sM:'#eceeef', sH:'#e6e8e9', sX:'#e0e3e4', s0:'#ffffff',
  oS:'#191c1d', oSV:'#424752', sec:'#446277', sFx:'#c8e6ff', sFxD:'#abcae3',
  e:'#ba1a1a', eC:'#ffdad6', out:'#727783', oV:'#c2c6d4', pFx:'#d6e3ff',
};
const VG = 'linear-gradient(135deg,#00488d 0%,#005fb8 100%)';
const gl = { background:'rgba(247,250,251,0.75)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)' };

/* ── ATOMS ───────────────────────────────────────────────────── */
const Ic = ({n,f=0,s=20,col}: any) => (
  <span className="material-symbols-outlined"
    style={{fontSize:s,fontVariationSettings:`'FILL' ${f},'wght' 400,'GRAD' 0,'opsz' ${s}`,
      lineHeight:1,display:'inline-flex',alignItems:'center',color:col||'inherit'}}>
    {n}
  </span>
);

const Bdg = ({ch,bg,col,s=10}: any) => (
  <span style={{background:bg,color:col,fontSize:s,fontWeight:700,padding:'2px 8px',
    borderRadius:20,textTransform:'uppercase',letterSpacing:'0.08em',whiteSpace:'nowrap',display:'inline-flex',alignItems:'center'}}>
    {ch}
  </span>
);

const SL = ({ch,col}: any) => (
  <p style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.15em',color:col||C.sec}}>{ch}</p>
);

/** Compact icon action for code cards (copy / edit / link / remove). */
const CodeIconBtn = ({icon, onClick, title, danger}: any) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    style={{
      width: 32,
      height: 32,
      borderRadius: 8,
      border: `1px solid ${danger ? `${C.e}55` : `${C.oV}55`}`,
      background: danger ? `${C.eC}40` : C.s0,
      color: danger ? C.e : C.oSV,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      flexShrink: 0,
      transition: "background 0.15s, border-color 0.15s, opacity 0.15s",
    }}
  >
    <Ic n={icon} s={17} col={danger ? C.e : C.oSV} />
  </button>
);

const CTA = ({ch,onClick,disabled,full,icon,sm,red}: any) => (
  <button onClick={onClick} disabled={disabled} style={{
    background:disabled?C.oV:red?C.e:VG, color:'#fff', fontWeight:700,
    padding:sm?'8px 16px':'12px 24px', borderRadius:8, border:'none',
    cursor:disabled?'not-allowed':'pointer',
    boxShadow:disabled?'none':red?'0 4px 12px rgba(186,26,26,0.2)':'0 4px 16px rgba(0,72,141,0.22)',
    fontSize:sm?11:14, display:'inline-flex', alignItems:'center', gap:6,
    width:full?'100%':'auto', justifyContent:'center', transition:'all 0.15s', flexShrink:0
  }}>
    {icon&&<Ic n={icon} f={1} s={sm?14:16}/>}{ch}
  </button>
);

const NavItem = ({icon,label,active,onClick}: any) => (
  <button onClick={onClick} style={{
    display:'flex',alignItems:'center',gap:12,padding:'10px 12px',borderRadius:8,
    borderLeft:'none',borderTop:'none',borderBottom:'none',
    borderRight:`4px solid ${active?C.p:'transparent'}`,
    background:active?'rgba(0,72,141,0.06)':'transparent',
    color:active?C.p:C.oSV, fontWeight:active?600:500, fontSize:14,
    cursor:'pointer',width:'100%',textAlign:'left',transition:'all 0.15s'
  }}>
    <Ic n={icon} f={active?1:0} col={active?C.p:C.oSV}/>{label}
  </button>
);

/* ── LAYOUT SHELLS ───────────────────────────────────────────── */
function Sidebar({items,active,onNav,sub}: any) {
  return (
    <aside style={{width:240,height:'calc(100vh - 44px)',background:C.sL,display:'flex',
      flexDirection:'column',padding:'24px 16px',position:'fixed',left:0,top:44,zIndex:40}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:28,padding:'0 8px'}}>
        <div style={{width:36,height:36,borderRadius:10,background:VG,display:'flex',
          alignItems:'center',justifyContent:'center',boxShadow:'0 4px 10px rgba(0,72,141,0.3)'}}>
          <Ic n="health_and_safety" f={1} s={18} col="#fff"/>
        </div>
        <div>
          <div style={{fontWeight:900,fontSize:15,color:'#1e3a5f',letterSpacing:'-0.02em'}}>Clinical Portal</div>
          <div style={{fontSize:9,fontWeight:700,color:C.out,textTransform:'uppercase',letterSpacing:'0.15em'}}>{sub} View</div>
        </div>
      </div>
      <nav style={{flex:1,display:'flex',flexDirection:'column',gap:2}}>
        {items.map(i=><NavItem key={i.id} icon={i.ic} label={i.lbl} active={active===i.id} onClick={()=>onNav(i.id)}/>)}
      </nav>
      <div style={{borderTop:`1px solid ${C.oV}40`,paddingTop:16,marginTop:12}}>
        <button style={{width:'100%',padding:'10px 16px',borderRadius:10,background:VG,color:'#fff',
          fontWeight:700,fontSize:13,border:'none',cursor:'pointer',marginBottom:6,
          boxShadow:'0 4px 12px rgba(0,72,141,0.25)',display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
          <Ic n="add" s={16} col="#fff"/>New Entry
        </button>
        <button style={{display:'flex',alignItems:'center',gap:10,padding:'8px 12px',color:C.oSV,
          fontSize:13,background:'transparent',border:'none',cursor:'pointer',width:'100%'}}>
          <Ic n="logout" s={16}/>Sign Out
        </button>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header style={{position:'fixed',top:44,left:240,right:0,zIndex:30,...gl,
      boxShadow:'0 1px 3px rgba(0,0,0,0.06)',display:'flex',justifyContent:'space-between',
      alignItems:'center',padding:'10px 24px',height:52}}>
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <span style={{fontSize:18,fontWeight:800,color:'#1e3a5f',letterSpacing:'-0.02em'}}>Sanctuary Health</span>
        <div style={{display:'flex',alignItems:'center',background:C.sX,borderRadius:20,padding:'5px 14px',gap:8}}>
          <Ic n="search" s={15} col={C.out}/>
          <input placeholder="Search patient or claim..." style={{background:'transparent',border:'none',
            outline:'none',fontSize:12,color:C.oS,width:200}}/>
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <button style={{background:'transparent',border:'none',cursor:'pointer',color:C.oSV,
          position:'relative',padding:6,display:'flex'}}>
          <Ic n="notifications" s={20}/>
          <span style={{position:'absolute',top:8,right:8,width:6,height:6,background:C.p,borderRadius:'50%'}}/>
        </button>
        <div style={{width:30,height:30,borderRadius:'50%',background:VG,display:'flex',
          alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,fontWeight:700}}>DR</div>
      </div>
    </header>
  );
}

/* ── META BAR ───────────────────────────────────────────────── */
const STATUS_STEPS = [
  {id:1,lbl:'Profile & Insurance',prt:'User App'},
  {id:2,lbl:'Hospital Booked',prt:'User App'},
  {id:3,lbl:'Booking Received',prt:'Hospital HIS'},
  {id:4,lbl:'Appointment Confirmed',prt:'Hospital HIS'},
  {id:5,lbl:'Pre-auth Sent',prt:'Hospital HIS'},
  {id:6,lbl:'Data Received',prt:'MediCode'},
  {id:7,lbl:'Auto Coding Done',prt:'MediCode'},
  {id:8,lbl:'Coder Review',prt:'MediCode'},
  {id:9,lbl:'Fraud Check',prt:'MediCode'},
  {id:10,lbl:'Pushed to Insurer',prt:'MediCode'},
  {id:11,lbl:'Insurer Review',prt:'Insurer Portal'},
  {id:12,lbl:'Claim Decision',prt:'Insurer Portal'},
  {id:13,lbl:'Status Synced',prt:'MediCode'},
];

function MetaBar({portal,setPortal,step}: any) {
  const ps = [
    {id:'patient',lbl:'Patient App',ic:'smartphone'},
    {id:'hospital',lbl:'Hospital HIS',ic:'local_hospital'},
    {id:'medicode',lbl:'MediCode Platform',ic:'smart_toy'},
    {id:'insurer',lbl:'Insurer Portal',ic:'shield'},
  ];
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,zIndex:50,background:VG,
      display:'flex',alignItems:'center',justifyContent:'space-between',
      padding:'0 20px',boxShadow:'0 2px 12px rgba(0,72,141,0.35)',height:44}}>
      <div style={{display:'flex',alignItems:'center',gap:6}}>
        <div style={{color:'#fff',fontWeight:900,fontSize:14,letterSpacing:'-0.02em',
          marginRight:14,display:'flex',alignItems:'center',gap:6}}>
          <Ic n="medical_services" f={1} s={16} col="#fff"/>MediCode
        </div>
        {ps.map(p=>(
          <button key={p.id} onClick={()=>setPortal(p.id)} style={{
            display:'flex',alignItems:'center',gap:5,padding:'5px 12px',borderRadius:6,
            background:portal===p.id?'rgba(255,255,255,0.22)':'transparent',
            color:portal===p.id?'#fff':'rgba(255,255,255,0.65)',
            fontWeight:portal===p.id?700:500,fontSize:12,border:'none',cursor:'pointer',transition:'all 0.15s'}}>
            <Ic n={p.ic} f={portal===p.id?1:0} s={13} col={portal===p.id?'#fff':'rgba(255,255,255,0.65)'}/>{p.lbl}
          </button>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8,color:'rgba(255,255,255,0.85)',fontSize:11,fontWeight:600}}>
        <Ic n="timeline" s={13} col="rgba(255,255,255,0.8)"/>
        Step {step}/13 — {STATUS_STEPS[step-1]?.lbl}
        <span style={{background:'rgba(255,255,255,0.18)',borderRadius:20,padding:'2px 8px',fontSize:10,fontWeight:700,marginLeft:4}}>
          {STATUS_STEPS[step-1]?.prt}
        </span>
      </div>
    </div>
  );
}

/* ── DATA ────────────────────────────────────────────────────── */
const BOOKINGS = [
  {id:'BK-99201',name:'Julianne DeSilva',ini:'JD',age:'32y • Female',insurer:'Aetna Premium',policy:'99120-X92-A1',reason:'Chronic Knee Pain',date:'Oct 24, 2023',time:'09:30 AM',ic:'#dbeafe',it:'#1d4ed8'},
  {id:'BK-99188',name:'Robert Kallis',ini:'RK',age:'45y • Male',insurer:'BlueShield Elite',policy:'BS-8822-P01',reason:'Post-Op Check',date:'Oct 24, 2023',time:'11:15 AM',ic:'#dcfce7',it:'#166534'},
  {id:'BK-99175',name:'Sarah Millicent',ini:'SM',age:'28y • Female',insurer:'MetLife Global',policy:'ML-900-552',reason:'Migraine Consult',date:'Oct 24, 2023',time:'02:45 PM',ic:'#fef3c7',it:'#92400e'},
  {id:'BK-99163',name:'Ravi Kumar',ini:'RK',age:'34y • Male',insurer:'Star Health',policy:'POL-2024-004521',reason:'General Checkup',date:'Oct 25, 2023',time:'04:00 PM',ic:'#fce7f3',it:'#9d174d'},
];

const CODES = [
  {type:'ICD-10-CM',code:'I21.19',desc:'ST elevation (STEMI) myocardial infarction of inferior wall',conf:98,col:C.p},
  {type:'ICD-10-CM',code:'R07.9',desc:'Chest pain, unspecified',conf:94,col:C.p},
  {type:'CPT Procedure',code:'92928',desc:'Percutaneous transcatheter placement of intracoronary stent(s)',conf:82,col:C.sec},
  {type:'Suggestion',code:'E11.9',desc:'Type 2 diabetes mellitus — Patient history mentions DM. Add as secondary code?',conf:0,col:C.p,suggest:true},
];

const CLAIMS = [
  {id:'CL-99281',name:'Sarah J. Miller',type:'Radiology',amt:'$1,420.00',date:'Oct 24, 2023',st:'New',sb:'#dbeafe',sc:'#1d4ed8'},
  {id:'CL-99275',name:'David Chen',type:'Primary Care',amt:'$245.50',date:'Oct 23, 2023',st:'Coded',sb:C.tF,sc:C.t},
  {id:'CL-99264',name:'Elena Rodriguez',type:'Pharmacy',amt:'$89.00',date:'Oct 23, 2023',st:'Flagged',sb:C.eC,sc:C.e},
  {id:'CL-99259',name:'Marcus Thorne',type:'Orthopedics',amt:'$2,840.00',date:'Oct 22, 2023',st:'Coded',sb:C.tF,sc:C.t},
];

const DEMO_SCENARIOS = [
  {id:'healthy',lbl:'Healthy Flow',desc:'Clean data, compliant handoff, explainable AI.'},
  {id:'missingDocs',lbl:'Missing Docs',desc:'Clinical attachment and discharge summary not received.'},
  {id:'lowConfidence',lbl:'Low Confidence AI',desc:'Narrative ambiguity reduces coding confidence.'},
  {id:'policyMismatch',lbl:'Policy Mismatch',desc:'Coverage validation and waiting period checks fail.'},
  {id:'consentHold',lbl:'Consent Hold',desc:'Patient consent for data sharing is incomplete.'},
];

const SCENARIO_META = {
  healthy: {
    tone:C.t,
    bg:C.tF,
    label:'Demo state: Healthy flow',
    alert:'AI, data quality, and compliance controls are all green for straight-through review.',
    explainability:[
      {k:'Primary evidence',v:'ECG findings, chest pain narrative, cath lab transport note'},
      {k:'Policy rationale',v:'Network hospital, active policy, pre-auth linked to encounter'},
      {k:'Risk guardrails',v:'Bias scan passed, duplicate-claim scan clear, confidence within policy threshold'},
    ],
    audit:[
      {evt:'Consent token verified', who:'Patient App', when:'08:42 AM', ok:true},
      {evt:'FHIR bundle received', who:'Hospital HIS', when:'08:46 AM', ok:true},
      {evt:'AI decision card signed', who:'MediCode', when:'08:48 AM', ok:true},
    ],
    quality:[
      {l:'Source completeness',v:98,tone:C.t},
      {l:'Identity match',v:99,tone:C.t},
      {l:'Document OCR confidence',v:96,tone:C.t},
      {l:'Sync latency',v:12,suffix:'s',tone:C.p},
    ],
  },
  missingDocs: {
    tone:'#d97706',
    bg:'#fef3c7',
    label:'Demo state: Missing documents',
    alert:'The claim cannot proceed automatically until the operative note and discharge summary arrive.',
    explainability:[
      {k:'Blocked evidence',v:'Discharge summary missing; operative attachment checksum unresolved'},
      {k:'Fallback action',v:'Route to manual review and notify hospital integration queue'},
      {k:'Reason code',v:'DOC-014 incomplete clinical packet for claim adjudication'},
    ],
    audit:[
      {evt:'Attachment poll failed', who:'Hospital HIS', when:'08:47 AM', ok:false},
      {evt:'Retry queued', who:'Integration Hub', when:'08:49 AM', ok:true},
      {evt:'Manual review opened', who:'MediCode Ops', when:'08:50 AM', ok:true},
    ],
    quality:[
      {l:'Source completeness',v:61,tone:'#d97706'},
      {l:'Identity match',v:99,tone:C.t},
      {l:'Document OCR confidence',v:42,tone:C.e},
      {l:'Sync latency',v:184,suffix:'s',tone:'#d97706'},
    ],
  },
  lowConfidence: {
    tone:C.e,
    bg:C.eC,
    label:'Demo state: Low-confidence AI',
    alert:'The AI recommendation is visible but cannot auto-progress because confidence and evidence quality are below threshold.',
    explainability:[
      {k:'Ambiguous phrase',v:'Narrative references chest discomfort without confirming final ruled-in diagnosis'},
      {k:'Model response',v:'Confidence drops because diabetes and hypertension appear only in history snippets'},
      {k:'Required next step',v:'Coder must edit, add evidence, and justify the override before submission'},
    ],
    audit:[
      {evt:'Bias drift monitor flagged outlier', who:'MediCode AI', when:'08:47 AM', ok:false},
      {evt:'Human review required', who:'Coding Workbench', when:'08:48 AM', ok:true},
      {evt:'Auto-send locked', who:'Policy Engine', when:'08:48 AM', ok:true},
    ],
    quality:[
      {l:'Source completeness',v:88,tone:'#d97706'},
      {l:'Identity match',v:99,tone:C.t},
      {l:'Document OCR confidence',v:84,tone:'#d97706'},
      {l:'Sync latency',v:21,suffix:'s',tone:C.p},
    ],
  },
  policyMismatch: {
    tone:C.e,
    bg:C.eC,
    label:'Demo state: Policy mismatch',
    alert:'Coverage rules do not line up with the requested claim because the waiting period and network rules conflict.',
    explainability:[
      {k:'Policy conflict',v:'Procedure marked as out-of-scope during current waiting-period window'},
      {k:'Rule source',v:'Policy v2026.04 clause 7.3 and network exception table'},
      {k:'Required next step',v:'Escalate to insurer reviewer or request cashless exception approval'},
    ],
    audit:[
      {evt:'Coverage check failed', who:'Insurer Rules API', when:'08:47 AM', ok:false},
      {evt:'Exception route suggested', who:'MediCode Rules', when:'08:49 AM', ok:true},
      {evt:'Member notice drafted', who:'Portal Workflow', when:'08:50 AM', ok:true},
    ],
    quality:[
      {l:'Source completeness',v:95,tone:C.t},
      {l:'Identity match',v:97,tone:C.t},
      {l:'Document OCR confidence',v:92,tone:C.t},
      {l:'Sync latency',v:18,suffix:'s',tone:C.p},
    ],
  },
  consentHold: {
    tone:'#d97706',
    bg:'#fef3c7',
    label:'Demo state: Consent hold',
    alert:'Personally identifiable data is masked and insurer submission is paused until consent is refreshed.',
    explainability:[
      {k:'Consent issue',v:'Patient accepted treatment but not downstream claims data-sharing scope'},
      {k:'System response',v:'Mask PHI, stop outbound transmission, raise consent task to patient app'},
      {k:'Regulatory note',v:'No insurer-facing payload allowed until consent timestamp is refreshed'},
    ],
    audit:[
      {evt:'Consent scope expired', who:'Consent Ledger', when:'08:44 AM', ok:false},
      {evt:'PHI masking enabled', who:'Privacy Guard', when:'08:45 AM', ok:true},
      {evt:'Patient re-consent SMS sent', who:'Patient App', when:'08:46 AM', ok:true},
    ],
    quality:[
      {l:'Source completeness',v:94,tone:C.t},
      {l:'Identity match',v:98,tone:C.t},
      {l:'Document OCR confidence',v:91,tone:C.t},
      {l:'Sync latency',v:15,suffix:'s',tone:C.p},
    ],
  },
};

function pushActivity(state: any, entry: any) {
  return [
    {
      id: `${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      time: entry.time || 'Now',
      actor: entry.actor,
      text: entry.text,
      tone: entry.tone || C.p,
    },
    ...(state.activities || []),
  ].slice(0, 12);
}

function applyStateUpdate(setState: any, updater: (prev: any) => any, activity?: any) {
  setState((prev: any) => {
    const next = updater(prev);
    return activity ? { ...next, activities: pushActivity(prev, activity) } : next;
  });
}

function ScenarioToggle({scenario,setScenario}: any) {
  return (
    <div style={{background:C.s0,borderRadius:16,padding:18,boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div>
          <SL ch="Gap Upgrade Plan"/>
          <p style={{fontSize:15,fontWeight:800,color:C.oS,marginTop:4}}>Unhappy-path demo states</p>
        </div>
        <Bdg ch={SCENARIO_META[scenario].label} bg={SCENARIO_META[scenario].bg} col={SCENARIO_META[scenario].tone} s={9}/>
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
        {DEMO_SCENARIOS.map(opt=>(
          <button key={opt.id} onClick={()=>setScenario(opt.id)} style={{
            padding:'8px 12px',borderRadius:10,border:`1px solid ${scenario===opt.id?SCENARIO_META[scenario].tone:C.oV}`,
            background:scenario===opt.id?SCENARIO_META[scenario].bg:C.s0,color:scenario===opt.id?SCENARIO_META[scenario].tone:C.oSV,
            fontSize:11,fontWeight:700,cursor:'pointer'
          }}>{opt.lbl}</button>
        ))}
      </div>
      <p style={{fontSize:12,color:C.oSV,lineHeight:1.55,marginTop:12}}>
        {DEMO_SCENARIOS.find(opt=>opt.id===scenario)?.desc}
      </p>
    </div>
  );
}

function DataQualityCard({scenario}: any) {
  const meta = SCENARIO_META[scenario];
  return (
    <div style={{background:C.s0,borderRadius:20,padding:22,boxShadow:'0 4px 18px rgba(0,0,0,0.05)'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
        <div>
          <SL ch="Foundation Layer"/>
          <h3 style={{fontSize:18,fontWeight:800,color:C.oS,marginTop:4}}>Data Quality / Integration Health</h3>
        </div>
        <Bdg ch={scenario==='healthy'?'Stable':'Attention Needed'} bg={meta.bg} col={meta.tone}/>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
        {meta.quality.map((item:any)=>(
          <div key={item.l} style={{background:C.sL,borderRadius:12,padding:14}}>
            <p style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:C.out}}>{item.l}</p>
            <p style={{fontSize:24,fontWeight:900,color:item.tone,marginTop:4}}>{item.v}{item.suffix||'%'}</p>
          </div>
        ))}
      </div>
      <div style={{marginTop:16,display:'flex',flexDirection:'column',gap:10}}>
        {[
          ['FHIR / HIS bridge', scenario==='missingDocs'?'Retrying attachment fetch':'Healthy'],
          ['Consent ledger', scenario==='consentHold'?'Expired scope detected':'Synced'],
          ['Insurer rules API', scenario==='policyMismatch'?'Policy conflict returned':'Healthy'],
        ].map(([k,v])=>(
          <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:12}}>
            <span style={{color:C.oSV}}>{k}</span>
            <span style={{fontWeight:700,color:String(v).includes('Healthy')||String(v).includes('Synced')?C.t:meta.tone}}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExplainabilityPanel({scenario}: any) {
  const meta = SCENARIO_META[scenario];
  return (
    <section style={{width:320,background:C.s0,borderLeft:`1px solid ${C.oV}20`,display:'flex',flexDirection:'column',flexShrink:0}}>
      <div style={{padding:'18px 20px',borderBottom:`1px solid ${C.oV}20`,background:'rgba(255,255,255,0.72)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <SL ch="AI Trust Layer"/>
            <h3 style={{fontSize:18,fontWeight:800,color:C.oS,marginTop:4}}>Explainability Panel</h3>
          </div>
          <Ic n="psychology" f={1} s={22} col={meta.tone}/>
        </div>
        <p style={{fontSize:12,color:C.oSV,lineHeight:1.5,marginTop:8}}>{meta.alert}</p>
      </div>
      <div style={{padding:16,overflowY:'auto',display:'flex',flexDirection:'column',gap:12}}>
        {meta.explainability.map((item:any)=>(
          <div key={item.k} style={{background:C.sL,borderRadius:14,padding:16}}>
            <p style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:C.out,marginBottom:6}}>{item.k}</p>
            <p style={{fontSize:12,color:C.oSV,lineHeight:1.55}}>{item.v}</p>
          </div>
        ))}
        <div style={{background:meta.bg,borderRadius:14,padding:16}}>
          <p style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:meta.tone,marginBottom:6}}>Bias & governance checks</p>
          <p style={{fontSize:12,color:C.oS,lineHeight:1.55}}>
            {scenario==='lowConfidence'
              ? 'Protected-class proxy drift monitor triggered a human review hold. Reviewer justification is required before outbound submission.'
              : 'Protected-class proxy scan, data minimization policy, and model version attestation all passed for this recommendation.'}
          </p>
        </div>
      </div>
    </section>
  );
}

function ComplianceAuditSidebar({scenario,activities}: any) {
  const meta = SCENARIO_META[scenario];
  return (
    <div style={{position:'sticky',top:96,display:'flex',flexDirection:'column',gap:14}}>
      <div style={{background:C.s0,borderRadius:18,padding:20,boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <div>
            <SL ch="Trust Controls"/>
            <h3 style={{fontSize:17,fontWeight:800,color:C.oS,marginTop:4}}>Compliance & Audit</h3>
          </div>
          <Bdg ch={scenario==='healthy'?'Compliant':'Review'} bg={meta.bg} col={meta.tone} s={9}/>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {meta.audit.map((item:any)=>(
            <div key={item.evt} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
              <span style={{background:item.ok?C.tF:meta.bg,borderRadius:'50%',padding:4,display:'inline-flex',flexShrink:0}}>
                <Ic n={item.ok?'check':'warning'} s={12} col={item.ok?C.t:meta.tone}/>
              </span>
              <div>
                <p style={{fontSize:12,fontWeight:700,color:C.oS}}>{item.evt}</p>
                <p style={{fontSize:10,color:C.oSV,marginTop:2}}>{item.who} • {item.when}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:C.s0,borderRadius:18,padding:20,boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
        <p style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:C.out,marginBottom:10}}>Regulatory trace</p>
        <div style={{display:'flex',flexDirection:'column',gap:8,fontSize:12,color:C.oSV}}>
          <div style={{display:'flex',justifyContent:'space-between'}}><span>Consent status</span><strong style={{color:scenario==='consentHold'?'#d97706':C.t}}>{scenario==='consentHold'?'Refresh required':'Verified'}</strong></div>
          <div style={{display:'flex',justifyContent:'space-between'}}><span>Model version</span><strong style={{color:C.oS}}>ICD-AI v4.2.1</strong></div>
          <div style={{display:'flex',justifyContent:'space-between'}}><span>Human override</span><strong style={{color:scenario==='healthy'?C.t:'#d97706'}}>{scenario==='healthy'?'Not required':'Mandatory'}</strong></div>
          <div style={{display:'flex',justifyContent:'space-between'}}><span>Retention packet</span><strong style={{color:C.oS}}>Ready for export</strong></div>
        </div>
      </div>
      <ActivityTimeline items={activities} title="Exception & audit activity"/>
    </div>
  );
}

function ActivityTimeline({items,title='Activity Timeline'}: any) {
  return (
    <div style={{background:C.s0,borderRadius:18,padding:20,boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
        <div>
          <SL ch="Audit Trail"/>
          <h3 style={{fontSize:17,fontWeight:800,color:C.oS,marginTop:4}}>{title}</h3>
        </div>
        <Ic n="history" s={18} col={C.sec}/>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {(items || []).length
          ? items.map((item:any)=>(
              <div key={item.id} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                <span style={{width:10,height:10,borderRadius:'50%',background:item.tone || C.p,marginTop:5,flexShrink:0}}/>
                <div>
                  <p style={{fontSize:12,fontWeight:700,color:C.oS}}>{item.text}</p>
                  <p style={{fontSize:10,color:C.oSV,marginTop:2}}>{item.actor} • {item.time}</p>
                </div>
              </div>
            ))
          : <p style={{fontSize:12,color:C.oSV,lineHeight:1.55}}>Workflow events and exception actions will appear here as the demo progresses.</p>}
      </div>
    </div>
  );
}

function PatientApp({state,setState,advance}: any) {
  const consentRecovered = !!state.consentRecovered;
  return (
    <div style={{display:'flex',minHeight:'100vh'}}>
      <Sidebar items={[
        {id:'overview',ic:'space_dashboard',lbl:'Overview'},
        {id:'appointments',ic:'event_available',lbl:'Appointments'},
        {id:'consent',ic:'verified_user',lbl:'Consent Center'},
        {id:'claims',ic:'receipt_long',lbl:'Claims'},
        {id:'messages',ic:'chat',lbl:'Messages'},
      ]} active="overview" onNav={()=>{}} sub="Patient"/>
      <TopBar/>
      <div style={{marginLeft:240,marginTop:96,flex:1,padding:32,background:C.s,minHeight:'calc(100vh - 96px)'}}>
        <div style={{display:'grid',gridTemplateColumns:'1.6fr 1fr',gap:22,alignItems:'start'}}>
          <div style={{display:'flex',flexDirection:'column',gap:20}}>
            <div style={{background:C.s0,borderRadius:20,padding:26,boxShadow:'0 4px 18px rgba(0,0,0,0.05)'}}>
              <SL ch="Patient App"/>
              <h1 style={{fontSize:34,fontWeight:900,color:C.oS,letterSpacing:'-0.02em',marginTop:4}}>Member Claim Companion</h1>
              <p style={{fontSize:14,color:C.oSV,lineHeight:1.65,marginTop:8,maxWidth:620}}>
                A dedicated patient-facing view for appointments, consent recovery, status tracking, and communications before the hospital begins claim review.
              </p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:18}}>
                {[
                  {l:'Current claim',v:state.claimStatus || 'Pre-auth pending',c:C.p},
                  {l:'Consent status',v:consentRecovered?'Active':'Needs action',c:consentRecovered?C.t:'#d97706'},
                  {l:'Hospital booking',v:'Apollo Hospitals',c:C.sec},
                ].map(card=>(
                  <div key={card.l} style={{background:C.sL,borderRadius:14,padding:16}}>
                    <p style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:C.out}}>{card.l}</p>
                    <p style={{fontSize:20,fontWeight:900,color:card.c,marginTop:4}}>{card.v}</p>
                  </div>
                ))}
              </div>
            </div>
            <ConsentRecoveryCard state={state} setState={setState}/>
            <div style={{background:C.s0,borderRadius:20,padding:24,boxShadow:'0 4px 18px rgba(0,0,0,0.05)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <div>
                  <SL ch="Patient Timeline"/>
                  <h3 style={{fontSize:18,fontWeight:800,color:C.oS,marginTop:4}}>Claim & appointment milestones</h3>
                </div>
                <Bdg ch={`Step ${state.currentStep}/13`} bg={C.pFx} col={C.p}/>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {STATUS_STEPS.slice(0, Math.max(state.currentStep, 5)).map((step:any)=>(
                  <div key={step.id} style={{display:'flex',alignItems:'center',gap:10}}>
                    <span style={{width:12,height:12,borderRadius:'50%',background:state.currentStep >= step.id ? C.t : C.oV,flexShrink:0}}/>
                    <div>
                      <p style={{fontSize:13,fontWeight:700,color:C.oS}}>{step.lbl}</p>
                      <p style={{fontSize:10,color:C.oSV,marginTop:2}}>{step.prt}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:10,marginTop:16,flexWrap:'wrap'}}>
                <CTA ch="Complete profile & insurance" onClick={()=>applyStateUpdate(setState, (s:any)=>({...s,currentStep:Math.max(s.currentStep,2)}), { actor:'Patient App', text:'Patient completed profile and insurance details', tone:C.t })} sm icon="task_alt"/>
                <CTA ch="Book hospital slot" onClick={()=>applyStateUpdate(setState, (s:any)=>({...s,currentStep:Math.max(s.currentStep,2)}), { actor:'Patient App', text:'Patient booked hospital appointment and shared policy info', tone:C.p })} sm icon="event_available"/>
              </div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <ScenarioToggle scenario={state.demoScenario || 'healthy'} setScenario={(demoScenario:any)=>setState((s:any)=>({...s,demoScenario}))}/>
            <ActivityTimeline items={state.activities} title="Patient-visible activity"/>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntakeQueue({state,setState,onOpen}: any) {
  const queueRows = [
    {id:'IQ-4021',patient:'Ravi Kumar',source:'Patient App',docs:(state.uploadedDocs || []).length || 1,status:state.demoScenario==='missingDocs'?'Missing Docs':'Ready for HIS',tone:state.demoScenario==='missingDocs'?C.e:C.t},
    {id:'IQ-4022',patient:'Julianne DeSilva',source:'Aggregator',docs:3,status:'Ready for HIS',tone:C.t},
    {id:'IQ-4023',patient:'Robert Kallis',source:'Patient App',docs:2,status:'Consent Check',tone:'#d97706'},
  ];
  return (
    <div>
      <div style={{marginBottom:28,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
        <div>
          <SL ch="Hospital Intake"/>
          <h1 style={{fontSize:36,fontWeight:900,color:C.oS,letterSpacing:'-0.02em',marginTop:4}}>Intake Queue</h1>
          <p style={{fontSize:14,color:C.oSV,marginTop:6}}>Review incoming patient-app submissions and claim packets before they enter the HIS workbench.</p>
        </div>
        <div style={{display:'flex',gap:12}}>
          {[{l:'Queued today',v:'18',c:C.p},{l:'Needs triage',v:state.demoScenario==='missingDocs'?'4':'1',c:state.demoScenario==='missingDocs'?C.e:'#d97706'}].map(card=>(
            <div key={card.l} style={{background:C.s0,borderRadius:14,padding:'12px 20px',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
              <p style={{fontSize:9,fontWeight:700,color:C.out,textTransform:'uppercase',letterSpacing:'0.12em'}}>{card.l}</p>
              <p style={{fontSize:28,fontWeight:900,color:card.c,marginTop:2}}>{card.v}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:C.s0,borderRadius:16,overflow:'hidden',boxShadow:'0 4px 24px rgba(0,0,0,0.04)'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'rgba(242,244,245,0.5)'}}>
              {['Queue ID','Patient','Source','Docs','Status','Action'].map(h=>(
                <th key={h} style={{padding:'12px 18px',textAlign:h==='Action'?'right':'left',fontSize:9,fontWeight:700,color:C.out,textTransform:'uppercase',letterSpacing:'0.1em'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {queueRows.map(row=>(
              <tr key={row.id} style={{borderBottom:`1px solid ${C.sL}`}}>
                <td style={{padding:'16px 18px'}}><span style={{background:C.sH,padding:'4px 8px',borderRadius:6,fontFamily:'monospace',fontWeight:700,fontSize:12}}>{row.id}</span></td>
                <td style={{padding:'16px 18px',fontWeight:700,color:C.oS}}>{row.patient}</td>
                <td style={{padding:'16px 18px',fontSize:12,color:C.oSV}}>{row.source}</td>
                <td style={{padding:'16px 18px',fontSize:12,color:C.oSV}}>{row.docs} files</td>
                <td style={{padding:'16px 18px'}}><Bdg ch={row.status} bg={row.tone===C.t?C.tF:row.tone===C.e?C.eC:'#fef3c7'} col={row.tone}/></td>
                <td style={{padding:'16px 18px',textAlign:'right'}}>
                  <CTA ch="Open Intake" sm icon="open_in_new" onClick={()=>{
                    applyStateUpdate(setState, (s:any)=>({...s,hospitalIntakeReviewed:true,currentStep:Math.max(s.currentStep,3)}), { actor:'Hospital Intake', text:`Opened ${row.id} from intake queue for hospital review`, tone:C.p });
                    onOpen();
                  }}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,marginTop:20}}>
        <OcrIntakeCard state={state} setState={setState}/>
        <ActivityTimeline items={state.activities} title="Intake activity"/>
      </div>
    </div>
  );
}

function ConsentRecoveryCard({state,setState}: any) {
  const consentRecovered = !!state.consentRecovered;
  return (
    <div style={{background:C.s0,borderRadius:16,padding:22,boxShadow:'0 4px 18px rgba(0,0,0,0.05)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div>
          <SL ch="Patient App"/>
          <h3 style={{fontSize:18,fontWeight:800,color:C.oS,marginTop:4}}>Consent Recovery Flow</h3>
        </div>
        <Bdg ch={consentRecovered?'Recovered':'Hold Active'} bg={consentRecovered?C.tF:'#fef3c7'} col={consentRecovered?C.t:'#d97706'}/>
      </div>
      <p style={{fontSize:12,color:C.oSV,lineHeight:1.6,marginBottom:14}}>
        Simulates the patient-facing flow for re-consenting to insurer data sharing when the claims scope is missing or expired.
      </p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:14}}>
        {[
          {l:'SMS sent',v:'08:46 AM',ok:true},
          {l:'OTP verified',v:consentRecovered?'Verified':'Pending',ok:consentRecovered},
          {l:'Claims consent',v:consentRecovered?'Granted':'Expired',ok:consentRecovered},
        ].map(item=>(
          <div key={item.l} style={{background:C.sL,borderRadius:12,padding:12}}>
            <p style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:C.out}}>{item.l}</p>
            <p style={{fontSize:14,fontWeight:800,color:item.ok?C.t:'#d97706',marginTop:4}}>{item.v}</p>
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
        <CTA ch={consentRecovered?'Consent Synced':'Send Re-consent Link'} onClick={()=>applyStateUpdate(setState, (s:any)=>({...s,consentLinkSent:true}), { actor:'Patient App', text:'Sent re-consent link to patient mobile app', tone:'#d97706' })} sm icon="sms"/>
        <CTA ch="Simulate Patient Approval" onClick={()=>applyStateUpdate(setState, (s:any)=>({...s,consentRecovered:true,demoScenario:'healthy'}), { actor:'Patient App', text:'Patient approved refreshed claims data-sharing consent', tone:C.t })} sm icon="verified_user" disabled={consentRecovered}/>
      </div>
    </div>
  );
}

function OcrIntakeCard({state,setState}: any) {
  const uploadedDocs = state.uploadedDocs || [];
  const extracted = state.extractedDocs || [];
  const addMissingPacket = () => {
    applyStateUpdate(setState, (s:any)=>({
      ...s,
      uploadedDocs:['Pre-auth form','Operative note','Discharge summary'],
      extractedDocs:[
        {name:'Pre-auth form',confidence:98,status:'Mapped'},
        {name:'Operative note',confidence:94,status:'Mapped'},
        {name:'Discharge summary',confidence:91,status:'Mapped'},
      ],
      demoScenario:'healthy',
      missingDocsResolved:true,
    }), { actor:'Hospital Intake', text:'Uploaded missing clinical packet and completed OCR extraction', tone:C.t });
  };

  return (
    <div style={{background:C.s0,borderRadius:16,padding:22,boxShadow:'0 4px 18px rgba(0,0,0,0.05)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div>
          <SL ch="Hospital Intake"/>
          <h3 style={{fontSize:18,fontWeight:800,color:C.oS,marginTop:4}}>Document Upload / OCR Intake</h3>
        </div>
        <Bdg ch={uploadedDocs.length?`${uploadedDocs.length} docs staged`:'Packet incomplete'} bg={uploadedDocs.length?C.tF:C.eC} col={uploadedDocs.length?C.t:C.e}/>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:14}}>
        <div style={{background:C.sL,borderRadius:12,padding:14}}>
          <p style={{fontSize:11,fontWeight:700,color:C.oS,marginBottom:8}}>Expected attachments</p>
          {['Pre-auth form','Operative note','Discharge summary'].map(doc=>(
            <div key={doc} style={{display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:12,color:C.oSV,marginBottom:8}}>
              <span>{doc}</span>
              <strong style={{color:uploadedDocs.includes(doc)?C.t:C.e}}>{uploadedDocs.includes(doc)?'Received':'Missing'}</strong>
            </div>
          ))}
        </div>
        <div style={{background:C.sL,borderRadius:12,padding:14}}>
          <p style={{fontSize:11,fontWeight:700,color:C.oS,marginBottom:8}}>OCR extraction</p>
          {extracted.length
            ? extracted.map((doc:any)=>(
                <div key={doc.name} style={{display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:12,color:C.oSV,marginBottom:8}}>
                  <span>{doc.name}</span>
                  <strong style={{color:doc.confidence >= 90 ? C.t : '#d97706'}}>{doc.confidence}%</strong>
                </div>
              ))
            : <p style={{fontSize:12,color:C.oSV,lineHeight:1.5}}>No claim packet has been uploaded yet. Use this state to demo paper-to-digital intake.</p>}
        </div>
      </div>
      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:14}}>
        <CTA ch="Upload Missing Packet" onClick={addMissingPacket} sm icon="upload_file"/>
        <button onClick={()=>applyStateUpdate(setState, (s:any)=>({...s,uploadedDocs:[],extractedDocs:[],missingDocsResolved:false,demoScenario:'missingDocs'}), { actor:'Hospital Intake', text:'Reset claim packet to missing-documents scenario', tone:'#d97706' })} style={{padding:'8px 14px',borderRadius:8,background:C.sM,color:C.oSV,fontWeight:700,fontSize:11,border:'none',cursor:'pointer'}}>Reset Missing-docs State</button>
      </div>
    </div>
  );
}

function ExceptionActionsCard({state,setState}: any) {
  const scenario = state.demoScenario || 'healthy';
  const actions = [];
  if (scenario === 'missingDocs') {
    actions.push({
      label:'Request missing document',
      icon:'attach_file',
      run:()=>applyStateUpdate(setState, (s:any)=>({
        ...s,
        exceptionAction:'Missing documents requested from hospital',
        uploadedDocs:['Pre-auth form'],
        extractedDocs:[{name:'Pre-auth form',confidence:98,status:'Mapped'}],
      }), { actor:'MediCode Ops', text:'Requested missing operative packet from hospital', tone:'#d97706' }),
    });
  }
  if (scenario === 'lowConfidence') {
    actions.push({
      label:'Escalate to coder',
      icon:'person_alert',
      run:()=>applyStateUpdate(setState, (s:any)=>({...s,exceptionAction:'Escalated to coder queue',coderEscalated:true}), { actor:'Coding Workbench', text:'Escalated low-confidence claim to coder review queue', tone:C.e }),
    });
  }
  if (scenario === 'policyMismatch') {
    actions.push({
      label:'Create policy override case',
      icon:'gavel',
      run:()=>applyStateUpdate(setState, (s:any)=>({...s,exceptionAction:'Policy override case created',overrideCaseCreated:true}), { actor:'Insurer Review', text:'Created policy override case for waiting-period exception', tone:C.e }),
    });
  }
  if (scenario === 'consentHold') {
    actions.push({
      label:'Launch consent recovery',
      icon:'verified_user',
      run:()=>applyStateUpdate(setState, (s:any)=>({...s,exceptionAction:'Consent recovery launched',consentLinkSent:true}), { actor:'Patient App', text:'Consent recovery flow launched for insurer data-sharing approval', tone:'#d97706' }),
    });
  }
  if (!actions.length) return null;

  return (
    <div style={{background:C.s0,borderRadius:16,padding:18,boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div>
          <SL ch="Resolution Flow"/>
          <p style={{fontSize:16,fontWeight:800,color:C.oS,marginTop:4}}>Exception Actions</p>
        </div>
        {state.exceptionAction && <Bdg ch="Triggered" bg={C.pFx} col={C.p}/>}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {actions.map((action:any)=>(
          <CTA key={action.label} ch={action.label} onClick={action.run} full icon={action.icon} sm/>
        ))}
      </div>
      <p style={{fontSize:12,color:C.oSV,lineHeight:1.55,marginTop:12}}>
        {state.exceptionAction || 'Select an action to show how the workflow resolves non-happy-path scenarios.'}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOSPITAL HIS
══════════════════════════════════════════════════════════════ */
function HospitalHIS({state,setState,advance}: any) {
  const [view,setView] = useState('intake');
  const [sel,setSel] = useState(null);
  const [confirmed,setConfirmed] = useState({});
  const [sent,setSent] = useState({});

  const nav = [
    {id:'intake',ic:'move_to_inbox',lbl:'Intake Queue'},
    {id:'dashboard',ic:'dashboard',lbl:'Dashboard'},
    {id:'patients',ic:'group',lbl:'Patients'},
    {id:'workbench',ic:'smart_toy',lbl:'Workbench'},
    {id:'insurance',ic:'policy',lbl:'Insurance'},
    {id:'claims',ic:'receipt_long',lbl:'Claims'},
    {id:'analytics',ic:'leaderboard',lbl:'Analytics'},
    {id:'settings',ic:'settings',lbl:'Settings'},
  ];

  const activeNav = view==='treatment'?'workbench':view;

  return (
    <div style={{display:'flex',minHeight:'100vh'}}>
      <Sidebar items={nav} active={activeNav} onNav={v=>{setView(v);}} sub="Provider"/>
      <TopBar/>
      <div style={{marginLeft:240,marginTop:96,flex:1,padding:32,background:C.s,minHeight:'calc(100vh - 96px)'}}>
        {view==='intake'
          ? <IntakeQueue state={state} setState={setState} onOpen={()=>setView('workbench')}/>
          : view!=='treatment'
          ? <BookingsDash bookings={BOOKINGS} confirmed={confirmed}
              onConfirm={id=>{setConfirmed(p=>({...p,[id]:true}));advance(4);applyStateUpdate(setState, (s:any)=>s, { actor:'Hospital HIS', text:`Confirmed appointment ${id} for hospital review`, tone:C.t });}}
              onReview={b=>{setSel(b);setView('treatment');}}
              state={state} setState={setState} advance={advance}/>
          : <TreatmentRev booking={sel||BOOKINGS[0]} sent={sent}
              state={state} setState={setState}
              onSend={id=>{setSent(p=>({...p,[id]:true}));advance(5);applyStateUpdate(setState, (s:any)=>({...s,preAuthSent:true}), { actor:'Hospital HIS', text:`Sent pre-auth package ${id} to insurer/TPA`, tone:C.p });}}
              onBack={()=>setView('workbench')}/>
        }
      </div>
    </div>
  );
}

function BookingsDash({bookings,confirmed,onConfirm,onReview,state,setState}: any) {
  return (
    <div>
      <div style={{marginBottom:32,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
        <div>
          <SL ch="Workbench"/>
          <h1 style={{fontSize:36,fontWeight:900,color:C.oS,letterSpacing:'-0.02em',marginTop:4}}>External Bookings</h1>
          <p style={{color:C.oSV,marginTop:4,fontSize:14,fontWeight:500}}>Manage and review TPA insurance-linked appointments.</p>
        </div>
        <div style={{display:'flex',gap:12}}>
          {[{l:'Active Requests',v:'24',c:C.p},{l:'Pending TPAs',v:'12',c:C.t}].map(k=>(
            <div key={k.l} style={{background:C.s0,borderRadius:12,padding:'12px 24px',
              boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
              <p style={{fontSize:9,fontWeight:700,color:C.out,textTransform:'uppercase',letterSpacing:'0.15em'}}>{k.l}</p>
              <p style={{fontSize:28,fontWeight:900,color:k.c,marginTop:2}}>{k.v}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:C.s0,borderRadius:16,overflow:'hidden',boxShadow:'0 4px 24px rgba(0,0,0,0.04)'}}>
        <div style={{padding:'14px 24px',background:C.sL,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',gap:8}}>
            {['All Bookings','Pending TPA','Completed'].map((t,i)=>(
              <button key={t} style={{padding:'6px 16px',borderRadius:8,background:i===0?C.s0:'transparent',
                color:i===0?C.p:C.oSV,fontWeight:i===0?700:500,fontSize:13,border:'none',cursor:'pointer',
                boxShadow:i===0?'0 1px 4px rgba(0,0,0,0.06)':'none'}}>{t}</button>
            ))}
          </div>
          <button style={{background:'transparent',border:'none',cursor:'pointer',color:C.oSV,display:'flex'}}>
            <Ic n="filter_list" s={20}/>
          </button>
        </div>

        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'rgba(242,244,245,0.5)'}}>
                {['Booking ID','Patient Name','Insurer','Policy #','Reason','Slot','Action'].map(h=>(
                  <th key={h} style={{padding:'12px 20px',textAlign:h==='Action'?'right':'left',
                    fontSize:9,fontWeight:700,color:C.out,textTransform:'uppercase',letterSpacing:'0.12em',whiteSpace:'nowrap'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map(b=>(
                <tr key={b.id} style={{borderBottom:`1px solid ${C.sL}`,transition:'background 0.1s',cursor:'default'}}
                  onMouseEnter={e=>e.currentTarget.style.background=C.sL}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{padding:'18px 20px'}}>
                    <span style={{background:C.sH,padding:'4px 8px',borderRadius:6,
                      fontFamily:'monospace',fontWeight:700,fontSize:13,color:C.oS}}>{b.id}</span>
                  </td>
                  <td style={{padding:'18px 20px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div style={{width:34,height:34,borderRadius:'50%',background:b.ic,
                        display:'flex',alignItems:'center',justifyContent:'center',
                        fontSize:11,fontWeight:700,color:b.it,flexShrink:0}}>{b.ini}</div>
                      <div>
                        <p style={{fontWeight:700,fontSize:14,color:C.oS}}>{b.name}</p>
                        <p style={{fontSize:11,color:C.oSV}}>{b.age}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{padding:'18px 20px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <span style={{width:6,height:6,borderRadius:'50%',background:C.p,display:'inline-block',flexShrink:0}}/>
                      <span style={{fontWeight:600,fontSize:13,color:C.oS}}>{b.insurer}</span>
                    </div>
                  </td>
                  <td style={{padding:'18px 20px'}}><span style={{fontSize:13,color:C.oSV}}>{b.policy}</span></td>
                  <td style={{padding:'18px 20px'}}>
                    <span style={{background:C.sX,color:C.oSV,fontSize:11,fontWeight:600,
                      padding:'3px 10px',borderRadius:20}}>{b.reason}</span>
                  </td>
                  <td style={{padding:'18px 20px'}}>
                    <p style={{fontWeight:700,fontSize:13,color:C.oS}}>{b.date}</p>
                    <p style={{fontSize:11,color:C.oSV}}>{b.time}</p>
                  </td>
                  <td style={{padding:'18px 20px',textAlign:'right'}}>
                    {confirmed[b.id]
                      ? <div style={{display:'flex',gap:8,justifyContent:'flex-end',alignItems:'center'}}>
                          <Bdg ch="✓ Confirmed" bg={C.tF} col={C.t} s={11}/>
                          <CTA ch="Review & Send" onClick={()=>onReview(b)} sm icon="send"/>
                        </div>
                      : <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
                          <button onClick={()=>onConfirm(b.id)} style={{background:C.tF,color:C.t,fontWeight:700,
                            fontSize:11,padding:'7px 12px',borderRadius:8,border:`1px solid rgba(0,84,40,0.2)`,cursor:'pointer'}}>
                            ✓ Confirm
                          </button>
                          <CTA ch="Review & Send to TPA" onClick={()=>onReview(b)} sm icon="send"/>
                        </div>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{padding:'14px 24px',background:C.sL,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <p style={{fontSize:11,fontWeight:500,color:C.out,textTransform:'uppercase',letterSpacing:'0.1em'}}>Showing 4 of 24 records</p>
          <div style={{display:'flex',gap:6}}>
            {['chevron_left','chevron_right'].map(ic=>(
              <button key={ic} style={{padding:6,borderRadius:8,background:C.s0,
                border:`1px solid ${C.oV}`,cursor:'pointer',color:C.out,display:'flex',alignItems:'center'}}>
                <Ic n={ic} s={18}/>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:20,marginTop:24}}>
        <div style={{background:C.sL,borderRadius:16,padding:28,position:'relative',overflow:'hidden'}}>
          <h4 style={{fontSize:18,fontWeight:800,color:C.p,letterSpacing:'-0.01em'}}>TPA Integration Health</h4>
          <p style={{color:C.oSV,fontSize:13,marginTop:4,maxWidth:360,lineHeight:1.6}}>
            All systems operational with average claim response of 12s. 14 active insurer connections.
          </p>
          <div style={{marginTop:20,display:'flex',alignItems:'center',gap:12}}>
            <div style={{display:'flex'}}>
              {['🏥','🛡️','💊','🔬'].map((e,i)=>(
                <div key={i} style={{width:34,height:34,borderRadius:'50%',background:C.sX,
                  marginLeft:i>0?-8:0,border:'2px solid white',display:'flex',
                  alignItems:'center',justifyContent:'center',fontSize:14}}>{e}</div>
              ))}
              <div style={{width:34,height:34,borderRadius:'50%',background:C.pC,marginLeft:-8,
                border:'2px solid white',display:'flex',alignItems:'center',
                justifyContent:'center',color:'#fff',fontSize:10,fontWeight:700}}>+10</div>
            </div>
            <span style={{fontSize:10,fontWeight:700,color:C.p,textTransform:'uppercase',letterSpacing:'0.1em'}}>Active TPA Connections</span>
          </div>
        </div>
        <div style={{background:VG,borderRadius:16,padding:28,color:'#fff',position:'relative',overflow:'hidden'}}>
          <Ic n="verified" f={1} s={36} col="rgba(255,255,255,0.9)"/>
          <h4 style={{fontWeight:700,fontSize:15,marginTop:10,lineHeight:1.3}}>Instant Verification Enabled</h4>
          <p style={{fontSize:12,color:'rgba(255,255,255,0.7)',marginTop:6,lineHeight:1.5}}>
            92% of external bookings are pre-validated by the Sanctuary Nexus Engine.
          </p>
          <button style={{marginTop:16,fontSize:11,fontWeight:700,textTransform:'uppercase',
            letterSpacing:'0.1em',background:'transparent',border:'none',cursor:'pointer',
            color:'rgba(255,255,255,0.85)',display:'flex',alignItems:'center',gap:4}}>
            View Engine Logs <Ic n="arrow_forward" s={13} col="rgba(255,255,255,0.85)"/>
          </button>
        </div>
        <ScenarioToggle scenario={state.demoScenario || 'healthy'} setScenario={(demoScenario:any)=>setState((s:any)=>({...s,demoScenario}))}/>
      </div>
    </div>
  );
}

function TreatmentRev({booking,sent,state,setState,onSend,onBack}: any) {
  const [diag,setDiag] = useState('Patient presents with persistent grade 3 osteoarthritis of the right knee. Reports significant mobility limitation over the last 6 months despite conservative management. Pain levels documented at 7/10 during weight-bearing activities.');
  const isSent = sent[booking?.id];

  return (
    <div>
      <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,color:C.p,
        fontWeight:600,fontSize:13,background:'transparent',border:'none',cursor:'pointer',marginBottom:20}}>
        <Ic n="arrow_back" s={16} col={C.p}/>Back to Bookings
      </button>

      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:24,alignItems:'start'}}>
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          {/* Bio Card */}
          <div style={{background:'rgba(255,255,255,0.7)',backdropFilter:'blur(20px)',
            WebkitBackdropFilter:'blur(20px)',borderRadius:16,padding:28,
            boxShadow:'0 4px 20px rgba(0,0,0,0.04)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div style={{display:'flex',gap:20}}>
                <div style={{width:72,height:72,borderRadius:14,background:booking.ic,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:22,fontWeight:700,color:booking.it,flexShrink:0}}>{booking.ini}</div>
                <div>
                  <Bdg ch="In-Network" bg={C.pFx} col={C.p}/>
                  <h3 style={{fontSize:26,fontWeight:700,color:C.oS,letterSpacing:'-0.02em',marginTop:6}}>{booking.name}</h3>
                  <p style={{color:C.oSV,fontSize:13,marginTop:2}}>ID: HIS-{booking.id} • {booking.age}</p>
                  <div style={{display:'flex',gap:16,marginTop:10}}>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <Ic n="bloodtype" s={14} col={C.p}/>
                      <span style={{fontSize:12,fontWeight:600,color:C.oS}}>A Positive</span>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <Ic n="warning" s={14} col='#f59e0b'/>
                      <span style={{fontSize:12,fontWeight:600,color:C.oS}}>Penicillin Allergy</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <p style={{fontSize:9,fontWeight:700,color:C.out,textTransform:'uppercase',letterSpacing:'0.12em'}}>Primary Insurance</p>
                <p style={{fontSize:16,fontWeight:700,color:C.oS,marginTop:4}}>{booking.insurer}</p>
                <p style={{fontSize:12,color:C.p,fontWeight:500,marginTop:2}}>Policy: {booking.policy}</p>
              </div>
            </div>
          </div>

          {/* Clinical Section */}
          <div style={{background:C.sL,borderRadius:16,padding:28}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:16,alignItems:'center'}}>
              <SL ch="Clinical Narrative"/>
              <span style={{fontSize:11,color:C.oSV}}>Last updated: Today, 09:12 AM</span>
            </div>
            <div style={{background:C.s0,borderRadius:12,padding:20,display:'flex',flexDirection:'column',gap:16}}>
              <div>
                <p style={{fontWeight:700,fontSize:13,color:C.oS,marginBottom:6}}>Subjective Assessment</p>
                <textarea value={diag} onChange={e=>setDiag(e.target.value)}
                  style={{width:'100%',border:'none',background:'transparent',fontSize:13,
                    color:C.oSV,lineHeight:1.7,resize:'vertical',minHeight:80,outline:'none',
                    fontFamily:'inherit'}}/>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                {[{l:'Planned Procedure',v:booking.reason,sub:'CPT Code: 27447'},{l:'Facility',v:'Sanctuary Orthopedic Wing',sub:'Provider: Dr. Marcus Sterling'}].map(f=>(
                  <div key={f.l} style={{background:C.sL,borderRadius:10,padding:14}}>
                    <p style={{fontSize:11,fontWeight:700,color:C.oS,marginBottom:4}}>{f.l}</p>
                    <p style={{fontSize:14,fontWeight:800,color:C.p,letterSpacing:'-0.01em'}}>{f.v}</p>
                    <p style={{fontSize:10,color:C.oSV,marginTop:3}}>{f.sub}</p>
                  </div>
                ))}
              </div>
              <div>
                <p style={{fontWeight:700,fontSize:13,color:C.oS,marginBottom:10}}>Medical Necessity Justification</p>
                {['Failure of conservative therapy (PT, Corticosteroid injections ×3)',
                  'Radiographic evidence of bone-on-bone contact in medial compartment',
                  'Womack scale score exceeding clinical thresholds for surgical intervention'].map((item,i)=>(
                  <div key={i} style={{display:'flex',gap:10,marginBottom:10,alignItems:'flex-start'}}>
                    <Ic n="check_circle" f={1} s={15} col={C.t}/>
                    <span style={{fontSize:13,color:C.oSV,lineHeight:1.5}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Financial */}
          <div>
            <SL ch="Financial Forecast"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,marginTop:12}}>
              {[{l:'Estimated Cost',v:'$24,450',bg:'#eff6ff',c:'#1d4ed8'},{l:'TPA Coverage',v:'$19,560',bg:C.tF,c:C.t},{l:'Patient Responsibility',v:'$4,890',bg:C.sH,c:C.oS}].map(f=>(
                <div key={f.l} style={{background:f.bg,borderRadius:12,padding:18}}>
                  <p style={{fontSize:9,fontWeight:700,color:f.c,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6}}>{f.l}</p>
                  <p style={{fontSize:22,fontWeight:900,color:f.c}}>{f.v}</p>
                </div>
              ))}
            </div>
          </div>

          <OcrIntakeCard state={state} setState={setState}/>
          {(state.demoScenario === 'consentHold' || state.consentLinkSent) && <ConsentRecoveryCard state={state} setState={setState}/>}
        </div>

        {/* Sidebar */}
        <div style={{position:'sticky',top:96,display:'flex',flexDirection:'column',gap:16}}>
          <div style={{background:C.s0,borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(0,0,0,0.08)'}}>
            <p style={{fontWeight:700,fontSize:15,color:C.oS,marginBottom:20}}>Submission Status</p>
            {[{n:1,l:'Verify Clinical Narrative',done:true},{n:2,l:'TPA Policy Match',done:true},{n:3,l:'Ready for Submission',done:isSent}].map(st=>(
              <div key={st.n} style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
                <div style={{width:32,height:32,borderRadius:'50%',flexShrink:0,
                  border:`2px solid ${st.done?C.t:st.n===3?C.p:C.oV}`,
                  background:st.done?C.tF:'transparent',
                  display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {st.done?<Ic n="check" s={14} col={C.t}/>:<span style={{fontSize:12,fontWeight:700,color:st.n===3?C.p:C.oSV}}>{st.n}</span>}
                </div>
                <p style={{fontSize:13,fontWeight:500,color:st.n===3&&!st.done?C.p:C.oSV,flex:1}}>{st.l}</p>
                {st.done&&st.n<3&&<Ic n="check_circle" f={1} s={18} col={C.t}/>}
              </div>
            ))}
            <div style={{marginTop:16}}>
              {isSent
                ? <div style={{background:C.tF,borderRadius:12,padding:14,display:'flex',alignItems:'center',gap:8}}>
                    <Ic n="check_circle" f={1} s={20} col={C.t}/>
                    <span style={{fontWeight:700,fontSize:13,color:C.t}}>Pre-auth sent successfully</span>
                  </div>
                : <CTA ch="Send Pre-auth / Treatment to TPA" onClick={()=>onSend(booking.id)} full icon="send" disabled={state.demoScenario==='consentHold' && !state.consentRecovered}/>
              }
              <p style={{fontSize:10,textAlign:'center',color:C.out,marginTop:10,lineHeight:1.5}}>
                By clicking, you confirm the clinical data reflects the HIS narrative and satisfies policy requirements.
              </p>
            </div>
          </div>

          {state.demoScenario==='consentHold' && (
            <div style={{background:'#fff7ed',borderRadius:20,padding:20,border:'1px solid rgba(217,119,6,0.2)'}}>
              <p style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.12em',color:'#d97706',marginBottom:10}}>Submission Block</p>
              <p style={{fontSize:13,fontWeight:700,color:C.oS,marginBottom:8}}>Patient-facing consent recovery required</p>
              <p style={{fontSize:12,color:C.oSV,lineHeight:1.55}}>TPA submission remains paused until the patient approves insurer data-sharing in the recovery flow.</p>
            </div>
          )}

          <div style={{background:C.oS,borderRadius:20,padding:24}}>
            <p style={{fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.15em',
              color:'rgba(255,255,255,0.4)',marginBottom:20}}>Review Timeline</p>
            <div style={{position:'relative',paddingLeft:22}}>
              <div style={{position:'absolute',left:6,top:6,bottom:6,width:2,background:'rgba(255,255,255,0.12)',borderRadius:1}}/>
              {[{l:'Encounter Logged',t:'Today, 08:45 AM',done:true},{l:'TPA Auto-Scan Complete',t:'Today, 08:46 AM',done:true},{l:'TPA Processing',t:'Estimated 15 mins',done:false}].map((ev,i)=>(
                <div key={i} style={{position:'relative',marginBottom:22}}>
                  <div style={{position:'absolute',left:-16,top:4,width:12,height:12,borderRadius:'50%',
                    background:ev.done?C.p:'rgba(255,255,255,0.15)',border:'3px solid #191c1d'}}/>
                  <p style={{fontSize:13,fontWeight:700,color:ev.done?'#fff':'rgba(255,255,255,0.35)'}}>{ev.l}</p>
                  <p style={{fontSize:9,textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginTop:2}}>{ev.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MEDICODE PLATFORM
══════════════════════════════════════════════════════════════ */
function MedicodePlatform({state,setState,advance}: any) {
  const [view,setView] = useState('dashboard');
  const [codeState,setCodeState] = useState({});
  const [auxCodes,setAuxCodes] = useState<any[]>([]);
  const [removedCodes,setRemovedCodes] = useState<string[]>([]);
  const [fraudDone,setFraudDone] = useState(false);
  const [fraudLoading,setFraudLoading] = useState(false);

  const mergedCodes = [...CODES, ...auxCodes].filter((c) => !removedCodes.includes(c.code));

  const nav = [
    {id:'dashboard',ic:'dashboard',lbl:'Dashboard'},
    {id:'patients',ic:'group',lbl:'Patients'},
    {id:'workbench',ic:'smart_toy',lbl:'Workbench'},
    {id:'insurance',ic:'policy',lbl:'Insurance'},
    {id:'claims',ic:'receipt_long',lbl:'Claims'},
    {id:'analytics',ic:'leaderboard',lbl:'Analytics'},
    {id:'settings',ic:'settings',lbl:'Settings'},
  ];

  const navActive = view==='coding'||view==='adjudication'?'workbench':view;

  const handleCode = (code, action) => {
    setCodeState((p) => {
      const next = { ...p, [code]: action };
      const pending = mergedCodes.filter((c) => !c.suggest);
      const allDone = pending.every((c) => next[c.code] || c.code === code);
      if (allDone) queueMicrotask(() => advance(8));
      return next;
    });
  };

  const runFraud = () => {
    setFraudLoading(true);
    setTimeout(()=>{setFraudLoading(false);setFraudDone(true);advance(9);},1800);
  };

  const allAccepted = mergedCodes.filter((c) => !c.suggest).every((c) => codeState[c.code] === "accepted");

  return (
    <div style={{display:'flex',minHeight:'100vh'}}>
      <Sidebar items={nav} active={navActive} onNav={setView} sub="Provider"/>
      <TopBar/>
      <div style={{marginLeft:240,marginTop:view==='coding'?96:96,flex:1,
        background:C.s,minHeight:'calc(100vh - 96px)',
        overflow:view==='coding'?'hidden':'auto'}}>
        {view==='dashboard'&&<MediDash state={state} setState={setState} onWorkbench={()=>setView('coding')} onAdj={()=>setView('adjudication')}/>}
        {(view==='coding'||view==='workbench')&&
          <CodingWorkbench state={state} setState={setState} codeState={codeState} onCode={handleCode} fraudDone={fraudDone}
            fraudLoading={fraudLoading} onRunFraud={runFraud} allAccepted={allAccepted}
            codesList={mergedCodes}
            onAddCode={()=>setAuxCodes((ac:any[])=>[...ac,{
              type:'ICD-10-CM', code:`Z9${Date.now().toString(36).slice(-4).toUpperCase()}`,
              desc:'Additional coding line (demo). Use link icon to open an external code reference.',
              conf:76, col:C.p,
            }])}
            onRemoveCode={(codeStr:string)=>setRemovedCodes((r)=>[...r, codeStr])}
            onPush={()=>{advance(10);setState(s=>({...s,claimStatus:'submitted'}));}}/>}
        {view==='adjudication'&&<ClaimAdj state={state} advance={advance}/>}
      </div>
    </div>
  );
}

function MediDash({state,setState,onWorkbench,onAdj}: any) {
  const scenario = state.demoScenario || 'healthy';
  return (
    <div style={{padding:32}}>
      <div style={{marginBottom:36,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
        <div>
          <SL ch="Executive Overview"/>
          <h1 style={{fontSize:40,fontWeight:900,color:C.oS,letterSpacing:'-0.03em',marginTop:4}}>The Clinical Sanctuary</h1>
          <p style={{color:C.oSV,fontSize:14,marginTop:8,maxWidth:480,lineHeight:1.65}}>
            Precision data monitoring for carrier efficiency. Review network health and claim lifecycles with real-time biometric tracking.
          </p>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
          <span style={{fontSize:9,fontWeight:700,color:C.out,textTransform:'uppercase',letterSpacing:'0.1em'}}>System Status</span>
          <span style={{display:'flex',alignItems:'center',gap:6,color:C.t,fontWeight:700,fontSize:13,marginTop:4}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:C.t}}/>Operational
          </span>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18,marginBottom:36}}>
        {[
          {ic:'receipt_long',v:'12,842',l:'Total Claims',badge:'+12%',bbg:C.tF,bc:C.t,ibg:C.pFx,ic2:C.p},
          {ic:'rate_review',v:'432',l:'Pending Reviews',ibg:C.sFx,ic2:C.sec},
          {ic:'report_problem',v:'14',l:'Fraud Alerts',critical:true,ibg:C.eC,ic2:C.e},
          {ic:'avg_time',v:'2.4 Days',l:'Avg Processing',ibg:C.pFx,ic2:C.pC},
        ].map(k=>(
          <div key={k.l} style={{background:C.s0,borderRadius:16,padding:22,
            boxShadow:'0 2px 8px rgba(0,0,0,0.04)',display:'flex',flexDirection:'column',
            justifyContent:'space-between',height:148,
            borderLeft:k.critical?`4px solid ${C.e}`:'none'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <span style={{background:k.ibg,padding:8,borderRadius:10,display:'inline-flex'}}>
                <Ic n={k.ic} s={20} col={k.ic2}/>
              </span>
              {k.badge&&<Bdg ch={k.badge} bg={k.bbg} col={k.bc}/>}
              {k.critical&&<span style={{fontSize:9,fontWeight:700,color:C.e,textTransform:'uppercase'}}>Critical</span>}
            </div>
            <div>
              <p style={{fontSize:26,fontWeight:900,color:C.oS,letterSpacing:'-0.02em'}}>{k.v}</p>
              <p style={{fontSize:9,fontWeight:700,color:C.oSV,textTransform:'uppercase',letterSpacing:'0.12em',marginTop:2}}>{k.l}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:24,alignItems:'start'}}>
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <h3 style={{fontSize:18,fontWeight:700,color:C.oS,letterSpacing:'-0.01em'}}>Recent Claim Submissions</h3>
            <button onClick={onAdj} style={{color:C.p,fontSize:12,fontWeight:700,background:'transparent',border:'none',cursor:'pointer'}}>View All Activity</button>
          </div>
          <div style={{background:C.sL,borderRadius:20,overflow:'hidden'}}>
            {CLAIMS.map((cl,i)=>(
              <div key={cl.id} onClick={onAdj} style={{padding:18,display:'flex',alignItems:'center',
                justifyContent:'space-between',borderBottom:i<CLAIMS.length-1?`1px solid ${C.sM}`:'none',
                cursor:'pointer',transition:'background 0.1s'}}
                onMouseEnter={e=>e.currentTarget.style.background=C.s0}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <div style={{display:'flex',alignItems:'center',gap:14}}>
                  <div style={{width:42,height:42,borderRadius:'50%',background:C.sH,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontSize:13,fontWeight:700,color:C.oSV,flexShrink:0}}>
                    {cl.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <p style={{fontWeight:700,fontSize:13,color:C.oS}}>{cl.name}</p>
                    <p style={{fontSize:11,color:C.oSV,marginTop:1}}>#{cl.id} • {cl.type}</p>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:20}}>
                  <div style={{textAlign:'right'}}>
                    <p style={{fontWeight:700,fontSize:13,color:C.oS}}>{cl.amt}</p>
                    <p style={{fontSize:11,color:C.oSV}}>{cl.date}</p>
                  </div>
                  <Bdg ch={cl.st} bg={cl.sb} col={cl.sc}/>
                  <Ic n="chevron_right" s={18} col={C.oV}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <ScenarioToggle scenario={scenario} setScenario={(demoScenario:any)=>setState((s:any)=>({...s,demoScenario}))}/>
          <DataQualityCard scenario={scenario}/>
          <ExceptionActionsCard state={state} setState={setState}/>
          <h3 style={{fontSize:18,fontWeight:700,color:C.oS}}>Active Coverage Analysis</h3>
          <div style={{background:'rgba(255,255,255,0.65)',backdropFilter:'blur(20px)',
            WebkitBackdropFilter:'blur(20px)',borderRadius:24,padding:24,
            boxShadow:'0 8px 32px rgba(0,0,0,0.06)'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <div style={{width:36,height:36,borderRadius:10,background:VG,
                display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Ic n="analytics" f={1} s={18} col="#fff"/>
              </div>
              <div>
                <p style={{fontWeight:800,fontSize:13,color:C.oS}}>Network Integrity</p>
                <p style={{fontSize:9,textTransform:'uppercase',letterSpacing:'0.1em',color:C.oSV,marginTop:1}}>Real-time biometrics</p>
              </div>
            </div>
            {[{l:'Medicare Advantage',v:94,c:VG},{l:'Employer Group PPO',v:78,c:C.sFxD},{l:'Individual HMO',v:62,c:C.t}].map(n=>(
              <div key={n.l} style={{marginBottom:14}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:11,fontWeight:700,marginBottom:4,color:C.oS}}>
                  <span>{n.l}</span><span>{n.v}%</span>
                </div>
                <div style={{height:5,background:C.sX,borderRadius:3,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${n.v}%`,background:n.c,borderRadius:3}}/>
                </div>
              </div>
            ))}
            <div style={{borderTop:`1px solid ${C.oV}30`,paddingTop:16,marginTop:8}}>
              <p style={{fontSize:11,fontStyle:'italic',color:C.oSV,lineHeight:1.5,marginBottom:12}}>
                "Algorithm-driven coding review has reduced manual intervention by 22% this quarter."
              </p>
              <button onClick={onWorkbench} style={{width:'100%',padding:'10px',background:C.sH,borderRadius:10,
                fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:'0.08em',
                color:C.p,border:'none',cursor:'pointer'}}>Go to Coding Workbench →</button>
            </div>
          </div>
          <div style={{background:VG,borderRadius:24,padding:24,color:'#fff',position:'relative',overflow:'hidden'}}>
            <Ic n="security" s={36} col="rgba(255,255,255,0.4)"/>
            <h4 style={{fontWeight:900,fontSize:15,lineHeight:1.3,marginTop:6}}>Compliance Check Required</h4>
            <p style={{fontSize:12,color:'rgba(255,255,255,0.75)',marginTop:6,lineHeight:1.5}}>
              Three new HIPAA-related updates require administrative attestation by Friday.
            </p>
            <button style={{marginTop:14,fontSize:11,fontWeight:700,textTransform:'uppercase',
              letterSpacing:'0.08em',background:'transparent',border:'none',
              borderBottom:'2px solid rgba(255,255,255,0.3)',cursor:'pointer',
              color:'rgba(255,255,255,0.9)',paddingBottom:3}}>Review Updates</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CodingWorkbench({
  state,
  setState,
  codeState,
  onCode,
  fraudDone,
  fraudLoading,
  onRunFraud,
  allAccepted,
  onPush,
  codesList = CODES,
  onAddCode,
  onRemoveCode,
}: any) {
  const [codeFilter, setCodeFilter] = useState("");
  const [sortNewest, setSortNewest] = useState(true);
  const scenario = state.demoScenario || 'healthy';
  const segs = [
    {t:'Patient presents with ',n:true},
    {t:'acute onset of chest pain',h:'blue'},
    {t:' radiating to the left arm, described as pressure-like and 8/10 in severity. Symptoms began approximately 2 hours prior to arrival.\n\nPhysical examination reveals a ',n:true},
    {t:'diaphoretic patient',h:'amber'},
    {t:' in moderate distress. HR 105 bpm, BP 145/90 mmHg. EKG showed ',n:true},
    {t:'ST-segment elevation',h:'blue'},
    {t:' in leads II, III, and aVF consistent with ',n:true},
    {t:'acute inferior myocardial infarction',h:'blue'},
    {t:'.\n\nImmediate treatment: ',n:true},
    {t:'324mg Aspirin PO',h:'green'},
    {t:' and ',n:true},
    {t:'Nitroglycerin 0.4mg SL',h:'green'},
    {t:' × 3. Patient transported to Cath Lab for ',n:true},
    {t:'percutaneous coronary intervention (PCI)',h:'blue'},
    {t:'.\n\nMedical history significant for ',n:true},
    {t:'Type 2 Diabetes Mellitus',h:'gray'},
    {t:' and ',n:true},
    {t:'Hypertension',h:'gray'},
    {t:'. Active smoker, 1 pack/day for 20 years.',n:true},
  ];
  const hMap = {blue:{bg:'#dbeafe',c:'#1e40af',b:'#3b82f6'},amber:{bg:'#fef3c7',c:'#92400e',b:'#f59e0b'},green:{bg:C.tF,c:C.t,b:C.t},gray:{bg:C.sX,c:C.oS,b:C.oV}};
  const scenarioMeta = SCENARIO_META[scenario];
  const canSubmit = fraudDone && allAccepted && scenario!=='missingDocs' && scenario!=='consentHold' && scenario!=='lowConfidence';
  const q = codeFilter.trim().toLowerCase();
  const filteredCodes = codesList.filter(
    (c) => !q || c.code.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
  );
  const sortedCodes = [...filteredCodes].sort((a, b) =>
    sortNewest ? b.code.localeCompare(a.code) : a.code.localeCompare(b.code)
  );
  const copyCodeLine = (c: any) => {
    const line = `${c.code}\t${c.desc}`;
    if (navigator.clipboard?.writeText) void navigator.clipboard.writeText(line);
  };
  const openCodeReference = (c: any) => {
    const u = `https://www.icd10data.com/search?s=${encodeURIComponent(c.code)}`;
    window.open(u, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{display:'flex',flexDirection:'column',height:'calc(100vh - 96px)'}}>
      <div style={{padding:'14px 24px',borderBottom:`1px solid ${C.oV}20`,background:C.s0,display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Bdg ch={scenarioMeta.label} bg={scenarioMeta.bg} col={scenarioMeta.tone}/>
          <p style={{fontSize:12,color:C.oSV,maxWidth:620,lineHeight:1.55}}>{scenarioMeta.alert}</p>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'flex-end'}}>
          {DEMO_SCENARIOS.map(opt=>(
            <button key={opt.id} onClick={()=>setState((s:any)=>({...s,demoScenario:opt.id}))} style={{
              padding:'7px 10px',borderRadius:999,border:`1px solid ${scenario===opt.id?SCENARIO_META[opt.id].tone:C.oV}`,
              background:scenario===opt.id?SCENARIO_META[opt.id].bg:C.s0,color:scenario===opt.id?SCENARIO_META[opt.id].tone:C.oSV,
              fontSize:10,fontWeight:700,cursor:'pointer'
            }}>{opt.lbl}</button>
          ))}
        </div>
      </div>
      <div style={{flex:1,display:'flex',overflow:'hidden'}}>
        {/* Narrative */}
        <section style={{flex:1,background:C.s0,overflowY:'auto',padding:32,borderRight:`1px solid ${C.oV}20`}}>
          <div style={{maxWidth:640,margin:'0 auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
              <h2 style={{fontSize:22,fontWeight:700,color:C.oS,letterSpacing:'-0.02em'}}>Treatment Narrative</h2>
              <div style={{display:'flex',gap:8}}>
                {['ED Visit #4410','Oct 24, 2023'].map(t=>(
                  <span key={t} style={{background:C.sH,padding:'3px 10px',borderRadius:6,
                    fontSize:9,fontWeight:700,textTransform:'uppercase',color:C.oSV}}>{t}</span>
                ))}
              </div>
            </div>
            <p style={{fontSize:15,color:C.oSV,lineHeight:1.9,whiteSpace:'pre-wrap'}}>
              {segs.map((seg,i)=>seg.h
                ? <mark key={i} style={{background:hMap[seg.h].bg,color:hMap[seg.h].c,borderRadius:3,
                    padding:'0 3px',borderBottom:`2px solid ${hMap[seg.h].b}`}}>{seg.t}</mark>
                : <span key={i}>{seg.t}</span>
              )}
            </p>
            <div style={{marginTop:24,background:scenarioMeta.bg,borderRadius:16,padding:18}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                <Ic n={scenario==='healthy'?'verified':'error'} f={1} s={18} col={scenarioMeta.tone}/>
                <p style={{fontWeight:800,fontSize:14,color:scenarioMeta.tone}}>Exception-aware narrative check</p>
              </div>
              <p style={{fontSize:12,color:C.oS,lineHeight:1.6}}>
                {scenario==='missingDocs' && 'Narrative is present, but the discharge summary and operative note attachments are missing from the clinical packet.'}
                {scenario==='lowConfidence' && 'The assessment contains symptoms and history, but the final coded condition is still ambiguous and needs coder justification.'}
                {scenario==='policyMismatch' && 'Clinical story is coherent, but policy and benefit rules conflict with the planned reimbursement path.'}
                {scenario==='consentHold' && 'Clinical data is available, but downstream sharing is paused until patient consent for insurer submission is renewed.'}
                {scenario==='healthy' && 'Narrative, documents, and policy references are aligned well enough for explainable straight-through processing.'}
              </p>
            </div>
            <div style={{marginTop:20}}>
              <ExceptionActionsCard state={state} setState={setState}/>
            </div>
          </div>
        </section>

        {/* Coding Panel — layout aligned with medical coding portals (codes list + icon actions) */}
        <section style={{width:420,background:C.sL,display:'flex',flexDirection:'column',flexShrink:0}}>
          <div style={{padding:'16px 18px',borderBottom:`1px solid ${C.oV}20`,
            background:'rgba(255,255,255,0.72)',backdropFilter:'blur(12px)',
            WebkitBackdropFilter:'blur(12px)',position:'sticky',top:0,zIndex:10}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,marginBottom:10}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <h3 style={{fontWeight:800,fontSize:17,color:C.oS,margin:0,letterSpacing:'-0.02em'}}>Codes</h3>
                <Bdg ch="AI Assisted" bg="rgba(0,72,141,0.1)" col={C.p} s={9}/>
              </div>
              {onAddCode && (
                <button type="button" onClick={onAddCode} style={{
                  background:C.pC,color:'#fff',fontWeight:700,fontSize:12,padding:'8px 16px',borderRadius:8,
                  border:'none',cursor:'pointer',boxShadow:'0 2px 8px rgba(0,95,184,0.35)',display:'inline-flex',alignItems:'center',gap:6,
                }}>
                  <Ic n="add" s={16} col="#fff"/>Add
                </button>
              )}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
              <Ic n="filter_list" s={16} col={C.out}/>
              <input
                value={codeFilter}
                onChange={(e)=>setCodeFilter(e.target.value)}
                placeholder="Filter codes…"
                style={{
                  flex:1,fontSize:12,padding:'8px 10px',borderRadius:8,border:`1px solid ${C.oV}55`,
                  background:C.s0,outline:'none',color:C.oS,
                }}
              />
            </div>
            <button
              type="button"
              onClick={()=>setSortNewest((v)=>!v)}
              style={{
                width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',
                padding:'8px 10px',borderRadius:8,border:`1px solid ${C.oV}40`,background:C.s0,
                cursor:'pointer',fontSize:11,fontWeight:600,color:C.oSV,
              }}
            >
              <span style={{display:'flex',alignItems:'center',gap:6}}>
                <Ic n="sort" s={16} col={C.p}/>
                Sort: {sortNewest ? "newest → oldest" : "oldest → newest"}
              </span>
              <Ic n="expand_more" s={18} col={C.out}/>
            </button>
            <p style={{fontSize:10,color:C.out,margin:'10px 0 0',fontStyle:'italic'}}>
              {sortedCodes.length} of {codesList.length} codes · narrative-generated
            </p>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:14,display:'flex',flexDirection:'column',gap:12}}>
            {sortedCodes.map((code)=>(
              <div key={code.code} style={{background:C.s0,borderRadius:14,padding:14,
                boxShadow:'0 2px 8px rgba(0,0,0,0.05)',
                border:`1px solid ${C.oV}35`,
                borderLeft:`4px solid ${codeState[code.code]==='accepted'?C.t:code.suggest?C.p:code.col}`,
                transition:'border-color 0.2s'}}>
                {code.suggest?(
                  <div style={{display:'flex',gap:10}}>
                    <Ic n="lightbulb" f={1} s={18} col={C.p}/>
                    <div style={{flex:1}}>
                      <p style={{fontSize:9,fontWeight:700,color:C.p,textTransform:'uppercase',marginBottom:4}}>AI Suggestion</p>
                      <p style={{fontSize:12,color:C.oSV,lineHeight:1.5}}>{code.desc}</p>
                      <button onClick={()=>onCode(code.code,'accepted')}
                        style={{marginTop:8,fontSize:11,fontWeight:700,color:C.p,textDecoration:'underline',
                          background:'transparent',border:'none',cursor:'pointer'}}>Add to queue</button>
                    </div>
                  </div>
                ):(
                  <>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8,marginBottom:6}}>
                      <div style={{minWidth:0}}>
                        <span style={{fontSize:9,fontWeight:700,color:C.out,textTransform:'uppercase',
                          letterSpacing:'0.1em',display:'block',marginBottom:3}}>{code.type}</span>
                        <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                          <span style={{fontSize:20,fontWeight:900,color:C.oS,letterSpacing:'-0.02em'}}>{code.code}</span>
                          {codeState[code.code] !== "accepted" && (
                            <Bdg ch="Predicted" bg="#e0f2fe" col={C.pC} s={9}/>
                          )}
                          {codeState[code.code] === "accepted" && (
                            <Bdg ch="Confirmed" bg={C.tF} col={C.t} s={9}/>
                          )}
                          {codeState[code.code] === "edited" && (
                            <Bdg ch="Edited" bg={C.sFx} col={C.sec} s={9}/>
                          )}
                        </div>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:4,flexShrink:0}}>
                        <CodeIconBtn icon="content_copy" title="Copy code" onClick={()=>copyCodeLine(code)} />
                        <CodeIconBtn icon="edit" title="Mark edited" onClick={()=>onCode(code.code,"edited")} />
                        <CodeIconBtn icon="open_in_new" title="Open reference" onClick={()=>openCodeReference(code)} />
                        {onRemoveCode && (
                          <CodeIconBtn icon="close" title="Remove from list" danger onClick={()=>onRemoveCode(code.code)} />
                        )}
                      </div>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:10,marginBottom:8}}>
                      <p style={{fontSize:12,color:C.oSV,lineHeight:1.45,margin:0,flex:1}}>{code.desc}</p>
                      <div style={{textAlign:'right',flexShrink:0}}>
                        <span style={{fontSize:10,fontWeight:700,
                          color:(scenario==='lowConfidence'?Math.max(code.conf-18,62):code.conf)>=90?C.t:(scenario==='lowConfidence'?Math.max(code.conf-18,62):code.conf)>=75?'#d97706':C.e}}>
                          {scenario==='lowConfidence'?Math.max(code.conf-18,62):code.conf}%
                        </span>
                        <div style={{width:64,height:4,background:C.sX,borderRadius:2,overflow:'hidden',marginTop:4}}>
                          <div style={{height:'100%',width:`${scenario==='lowConfidence'?Math.max(code.conf-18,62):code.conf}%`,borderRadius:2,
                            background:(scenario==='lowConfidence'?Math.max(code.conf-18,62):code.conf)>=90?C.t:(scenario==='lowConfidence'?Math.max(code.conf-18,62):code.conf)>=75?'#d97706':C.e}}/>
                        </div>
                      </div>
                    </div>
                    <div style={{display:'flex',gap:8}}>
                      <button type="button" onClick={()=>onCode(code.code,'accepted')} style={{flex:1,padding:'8px 0',
                        background:codeState[code.code]==='accepted'?C.tF:`rgba(0,84,40,0.08)`,
                        color:C.t,fontWeight:700,fontSize:11,borderRadius:8,
                        border:codeState[code.code]==='accepted'?`1px solid ${C.t}40`:'none',cursor:'pointer',
                        display:'flex',alignItems:'center',justifyContent:'center',gap:4}}>
                        {codeState[code.code]==='accepted'&&<Ic n="check" s={11} col={C.t}/>}
                        {codeState[code.code]==='accepted'?'Accepted':'Accept'}
                      </button>
                      <button type="button" onClick={()=>onCode(code.code,'edited')} style={{flex:1,padding:'8px 0',
                        background:C.sM,color:C.oSV,fontWeight:700,fontSize:11,borderRadius:8,border:'none',cursor:'pointer'}}>
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
        <ExplainabilityPanel scenario={scenario}/>
      </div>

      {/* Footer bar */}
      <footer style={{height:76,background:C.s0,borderTop:`1px solid ${C.oV}30`,padding:'0 28px',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        boxShadow:'0 -4px 20px rgba(0,0,0,0.04)',flexShrink:0,zIndex:20}}>
        <div style={{display:'flex',alignItems:'center',gap:36}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{position:'relative',width:44,height:44}}>
              <svg width="44" height="44" style={{transform:'rotate(-90deg)'}}>
                <circle cx="22" cy="22" r="18" fill="transparent" stroke={C.sX} strokeWidth="4"/>
                <circle cx="22" cy="22" r="18" fill="transparent" stroke={C.t} strokeWidth="4"
                  strokeDasharray="113.1" strokeDashoffset={fraudDone?11.3:113}
                  style={{transition:'stroke-dashoffset 1s ease'}}/>
              </svg>
              <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',
                justifyContent:'center',fontSize:10,fontWeight:900,color:C.oS}}>
                {fraudDone?'0.02':'?'}
              </div>
            </div>
            <div>
              <div style={{fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:C.out}}>Fraud Score</div>
              <div style={{fontSize:12,fontWeight:700,color:fraudDone?C.t:C.oSV,display:'flex',alignItems:'center',gap:4}}>
                {fraudDone&&<Ic n="verified" f={1} s={13} col={C.t}/>}
                {fraudDone?'Negligible Risk':'Awaiting'}
              </div>
            </div>
          </div>
          <div>
            <div style={{fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:C.out}}>Estimated Reimbursement</div>
            <div style={{fontSize:22,fontWeight:900,color:C.oS}}>$3,420.50</div>
          </div>
          <div>
            <div style={{fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:C.out}}>Submission guardrail</div>
            <div style={{fontSize:12,fontWeight:700,color:canSubmit?C.t:scenarioMeta.tone}}>{canSubmit?'Ready for insurer submission':'Blocked by demo scenario controls'}</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          {!fraudDone&&(
            <button onClick={onRunFraud} disabled={fraudLoading}
              style={{padding:'10px 18px',borderRadius:8,background:fraudLoading?C.sL:C.sM,
                color:C.oSV,fontWeight:700,fontSize:13,border:'none',cursor:'pointer'}}>
              {fraudLoading?'⏳ Running checks...':'Run Fraud Check'}
            </button>
          )}
          <button style={{padding:'10px 18px',borderRadius:8,background:C.sM,color:C.oSV,
            fontWeight:700,fontSize:13,border:'none',cursor:'pointer'}}>Save Draft</button>
          <CTA ch="Approve & Send" onClick={onPush} disabled={!canSubmit} icon="send"/>
        </div>
      </footer>
    </div>
  );
}

function ClaimAdj({state,advance}: any) {
  const scenario = state.demoScenario || 'healthy';
  const [decided,setDecided] = useState(false);
  return (
    <div style={{padding:32,paddingBottom:100}}>
      <div style={{marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
        <div>
          <div style={{display:'flex',gap:8,marginBottom:8}}>
            <Bdg ch="Claim #CLN-98421" bg={C.sFx} col={C.sec}/>
            <Bdg ch="In-Network" bg={C.tF} col={C.t}/>
          </div>
          <h1 style={{fontSize:32,fontWeight:900,color:C.oS,letterSpacing:'-0.02em'}}>Patient Adjudication Review</h1>
          <p style={{color:C.oSV,fontSize:15,fontWeight:500,marginTop:4}}>Elias Thorne • ID: 449-002-120 • Primary PPO</p>
        </div>
        <div style={{display:'flex',gap:16,background:C.sL,padding:'12px 20px',borderRadius:12}}>
          <div style={{borderRight:`1px solid ${C.oV}40`,paddingRight:16}}>
            <p style={{fontSize:9,textTransform:'uppercase',letterSpacing:'0.1em',color:C.out,marginBottom:2}}>Submitted On</p>
            <p style={{fontSize:13,fontWeight:600,color:C.oS}}>Oct 24, 2023</p>
          </div>
          <div>
            <p style={{fontSize:9,textTransform:'uppercase',letterSpacing:'0.1em',color:C.out,marginBottom:2}}>Total Claim Value</p>
            <p style={{fontSize:18,fontWeight:700,color:C.p}}>$12,450.00</p>
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'5fr 4fr 3fr',gap:18}}>
        {/* Clinical */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div style={{background:C.s0,borderRadius:16,padding:24,boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:18,alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}><Ic n="medical_information" s={18} col={C.sec}/><SL ch="Clinical Narrative"/></div>
              <button style={{color:C.p,fontSize:11,fontWeight:600,background:'transparent',border:'none',cursor:'pointer'}}>View Document</button>
            </div>
            <div style={{background:'rgba(242,244,245,0.6)',borderRadius:10,padding:14,marginBottom:12,
              fontStyle:'italic',color:C.oSV,lineHeight:1.7,fontSize:12}}>
              "Patient presents with chronic lumbar pain radiating to the left lower extremity. Symptoms worsened over 3 months despite physical therapy. MRI findings indicate L4-L5 disc herniation with nerve root impingement..."
            </div>
            <p style={{fontSize:13,color:C.oSV,lineHeight:1.7}}>Admitted for scheduled microdiscectomy. Procedure uncomplicated. Post-operative checks stable. Discharged after 24-hour observation with PT referral.</p>
            <p style={{fontSize:13,color:C.oSV,lineHeight:1.7,marginTop:10}}>Clinical necessity based on failure of conservative treatment and progressive neurological deficit (4/5 dorsiflexor strength).</p>
          </div>
          <div style={{background:C.sM,borderRadius:14,padding:18}}>
            <p style={{fontSize:12,fontWeight:700,color:C.oS,marginBottom:10}}>Prior Authorization Link</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:C.s0,padding:12,borderRadius:10}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <Ic n={scenario==='missingDocs'?'warning':'check_circle'} f={1} s={18} col={scenario==='missingDocs'?'#d97706':C.t}/>
                <span style={{fontWeight:600,fontSize:13,color:C.oS}}>AUTH-2023-X99</span>
              </div>
              <span style={{fontSize:11,fontWeight:700,color:scenario==='missingDocs'?'#d97706':C.sec}}>{scenario==='missingDocs'?'PENDING PACKET':'MATCHED'}</span>
            </div>
          </div>
        </div>

        {/* AI Coding */}
        <div style={{background:C.s0,borderRadius:16,overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
          <div style={{padding:'14px 20px',borderBottom:`1px solid ${C.sH}`,background:C.s,
            display:'flex',alignItems:'center',gap:8}}>
            <Ic n="smart_toy" s={18} col={C.sec}/><SL ch="AI Coding Logic"/>
          </div>
          <div style={{padding:8}}>
            {[{c:'CPT 63030',n:'Laminotomy (Hemilaminectomy)',d:'Decompression of nerve root; 1 interspace, lumbar.',m:98,warn:false},
              {c:'ICD-10 M51.26',n:'Other intervertebral disc displacement',d:'Lumbar region. MRI findings on page 3.',m:94,warn:false},
              {c:'CPT 99214',n:'Office Visit Level 4',d:'E&M code potentially bundled with surgical global period. Review suggested.',m:null,warn:true}
            ].map(cd=>(
              <div key={cd.c} style={{padding:14,borderRadius:10,margin:4,
                background:cd.warn?`rgba(255,218,214,0.3)`:'transparent',
                borderLeft:cd.warn?`4px solid ${C.e}`:'none'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <div>
                    <Bdg ch={cd.c} bg={cd.warn?C.eC:C.pFx} col={cd.warn?C.e:C.p}/>
                    <p style={{fontWeight:700,fontSize:13,color:C.oS,marginTop:5}}>{cd.n}</p>
                  </div>
                  {cd.m&&<span style={{fontSize:11,fontWeight:700,color:C.t}}>{cd.m}% Match</span>}
                  {cd.warn&&<span style={{fontSize:11,fontWeight:700,color:C.e}}>Duplicate?</span>}
                </div>
                <p style={{fontSize:11,color:cd.warn?C.e:C.oSV,lineHeight:1.4}}>{cd.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fraud */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div style={{background:C.s0,borderRadius:16,padding:22,textAlign:'center',
            boxShadow:'0 2px 8px rgba(0,0,0,0.04)',borderTop:`6px solid ${scenario==='lowConfidence'||scenario==='policyMismatch'?C.e:C.t}`}}>
            <SL ch="Integrity Score"/>
            <div style={{position:'relative',display:'inline-block',marginTop:14}}>
              <svg width="112" height="112" style={{transform:'rotate(-90deg)'}}>
                <circle cx="56" cy="56" r="48" fill="transparent" stroke={C.sX} strokeWidth="7"/>
                <circle cx="56" cy="56" r="48" fill="transparent" stroke={scenario==='lowConfidence'||scenario==='policyMismatch'?C.e:C.t} strokeWidth="7"
                  strokeDasharray="301.6" strokeDashoffset={scenario==='lowConfidence'?82:scenario==='policyMismatch'?120:30.16}/>
              </svg>
              <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <span style={{fontSize:26,fontWeight:900,color:C.oS}}>{scenario==='lowConfidence'?'73':scenario==='policyMismatch'?'61':'90'}</span>
                <span style={{fontSize:9,fontWeight:700,color:scenario==='lowConfidence'||scenario==='policyMismatch'?C.e:C.t,textTransform:'uppercase'}}>{scenario==='lowConfidence'||scenario==='policyMismatch'?'Escalate':'Low Risk'}</span>
              </div>
            </div>
            <p style={{fontSize:11,color:C.oSV,marginTop:12,lineHeight:1.5}}>
              {scenario==='healthy'?'Claim passes 14 of 15 standard fraud & waste detection protocols.':'Risk and policy guardrails are forcing manual intervention before adjudication.'}
            </p>
          </div>
          <div style={{background:C.s0,borderRadius:16,padding:18,boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
              <Ic n="gavel" s={18} col={C.sec}/><SL ch="Rule Hits"/>
            </div>
            {[{l:'Provider History',d:'No previous disciplinary actions.',ok:true},{l:'Member Eligibility',d:'Coverage active through 12/31/2023.',ok:true},{l:'Unbundling Check',d:'Potential issue with concurrent visit billing.',ok:false}].map(r=>(
              <div key={r.l} style={{display:'flex',gap:10,marginBottom:12,alignItems:'flex-start'}}>
                <span style={{background:r.ok?C.tF:C.eC,borderRadius:'50%',padding:4,display:'inline-flex',flexShrink:0}}>
                  <Ic n={r.ok?'check':'warning'} s={11} col={r.ok?C.t:C.e}/>
                </span>
                <div>
                  <p style={{fontSize:12,fontWeight:700,color:C.oS}}>{r.l}</p>
                  <p style={{fontSize:10,color:C.oSV,marginTop:1}}>{r.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:`rgba(196,228,253,0.4)`,borderRadius:14,padding:16}}>
            <p style={{fontSize:9,fontWeight:700,color:C.sec,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:10}}>Assigned Adjuster</p>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:32,height:32,borderRadius:8,background:C.sec,
                display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,fontWeight:700}}>SR</div>
              <div>
                <p style={{fontSize:13,fontWeight:700,color:C.oS}}>Sarah Richardson</p>
                <p style={{fontSize:10,color:C.oSV,marginTop:1}}>Level 3 Senior Reviewer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{position:'fixed',bottom:0,left:240,right:0,padding:18,zIndex:50,pointerEvents:'none'}}>
        <div style={{maxWidth:820,margin:'0 auto',background:'rgba(255,255,255,0.88)',
          backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',borderRadius:18,
          padding:'14px 22px',display:'flex',alignItems:'center',justifyContent:'space-between',
          boxShadow:'0 -4px 32px rgba(0,0,0,0.09)',pointerEvents:'all'}}>
          <div>
            <p style={{fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:C.out}}>Recommended Action</p>
            <p style={{fontSize:13,fontWeight:700,color:C.t,display:'flex',alignItems:'center',gap:4,marginTop:2}}>
              <Ic n="auto_awesome" s={14} col={C.t}/> Approve (AI Suggestion)
            </p>
          </div>
          <div style={{display:'flex',gap:10}}>
            <button style={{padding:'10px 18px',fontSize:13,fontWeight:700,color:C.sec,background:'transparent',border:'none',cursor:'pointer',borderRadius:8}}>Query/Hold</button>
            <button style={{padding:'10px 18px',fontSize:13,fontWeight:700,color:C.e,border:`2px solid rgba(186,26,26,0.15)`,background:'transparent',cursor:'pointer',borderRadius:8}}>Reject Claim</button>
            <CTA ch="Approve Claim" onClick={()=>{setDecided(true);advance(11);}} icon="check"/>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   INSURER PORTAL
══════════════════════════════════════════════════════════════ */
function InsurerPortal({state,setState,advance}: any) {
  const [view,setView] = useState('claims');
  const [decision,setDecision] = useState(null);
  const [notes,setNotes] = useState('');

  const nav = [
    {id:'dashboard',ic:'dashboard',lbl:'Dashboard'},
    {id:'claims',ic:'receipt_long',lbl:'Claims'},
    {id:'compliance',ic:'policy',lbl:'Compliance'},
    {id:'analytics',ic:'leaderboard',lbl:'Analytics'},
    {id:'settings',ic:'settings',lbl:'Settings'},
  ];

  const decide = d => {
    setDecision(d);
    setState(s=>({...s,claimDecision:d}));
    advance(12);
    setTimeout(()=>advance(13),600);
  };

  return (
    <div style={{display:'flex',minHeight:'100vh'}}>
      <Sidebar items={nav} active={view==='detail'?'claims':view} onNav={setView} sub="Insurer"/>
      <TopBar/>
      <div style={{marginLeft:240,marginTop:96,flex:1,padding:32,background:C.s,minHeight:'calc(100vh - 96px)'}}>
        {view!=='detail'
          ? <InsurerQueue onReview={()=>setView('detail')} state={state}/>
          : <InsurerDetail decision={decision} onDecide={decide} notes={notes} setNotes={setNotes} state={state} setState={setState} onBack={()=>setView('claims')}/>
        }
      </div>
    </div>
  );
}

function InsurerQueue({onReview,state}: any) {
  const rows = [
    {id:'CLM-2024-001',pat:state.name||'Ravi Kumar',policy:state.policy||'POL-2024-004521',hosp:state.selectedHospital?.name||'Apollo Hospitals',amt:`₹${state.estCost||'12,500'}`,date:'Apr 22, 2024',st:'Pending Review',sb:'#fef3c7',sc:'#92400e'},
    {id:'CLM-2024-002',pat:'Priya Sharma',policy:'NHIC-2024-009',hosp:'Yashoda Super Speciality',amt:'₹45,200',date:'Apr 21, 2024',st:'Under Review',sb:C.sFx,sc:C.sec},
    {id:'CLM-2024-003',pat:'Arjun Mehta',policy:'MAX-2023-441',hosp:'Apollo Hospitals',amt:'₹8,750',date:'Apr 20, 2024',st:'Approved',sb:C.tF,sc:C.t},
    {id:'CLM-2024-004',pat:'Meena Iyer',policy:'SBI-2024-112',hosp:'Vijaya Diagnostic Centre',amt:'₹3,200',date:'Apr 19, 2024',st:'Rejected',sb:C.eC,sc:C.e},
  ];
  return (
    <div>
      <div style={{marginBottom:28,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
        <div>
          <SL ch="Insurer Dashboard"/>
          <h1 style={{fontSize:36,fontWeight:900,color:C.oS,letterSpacing:'-0.02em',marginTop:4}}>Claims Queue</h1>
          <p style={{color:C.oSV,fontSize:14,marginTop:4}}>Review and adjudicate incoming coded claims from MediCode Platform.</p>
        </div>
        <div style={{display:'flex',gap:12}}>
          {[{l:'Total Claims',v:'847',c:C.p},{l:'Pending Review',v:'12',c:'#d97706'},{l:'Approved Today',v:'34',c:C.t}].map(k=>(
            <div key={k.l} style={{background:C.s0,borderRadius:12,padding:'12px 20px',
              textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
              <p style={{fontSize:9,fontWeight:700,color:C.out,textTransform:'uppercase',letterSpacing:'0.12em'}}>{k.l}</p>
              <p style={{fontSize:26,fontWeight:900,color:k.c,marginTop:2}}>{k.v}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:C.s0,borderRadius:16,overflow:'hidden',boxShadow:'0 4px 24px rgba(0,0,0,0.04)'}}>
        <div style={{padding:'14px 24px',background:C.sL,display:'flex',gap:8}}>
          {['All Claims','Pending Review','Approved','Rejected'].map((t,i)=>(
            <button key={t} style={{padding:'6px 16px',borderRadius:8,background:i===0?C.s0:'transparent',
              color:i===0?C.p:C.oSV,fontWeight:i===0?700:500,fontSize:12,border:'none',cursor:'pointer',
              boxShadow:i===0?'0 1px 4px rgba(0,0,0,0.06)':'none'}}>{t}</button>
          ))}
        </div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'rgba(242,244,245,0.5)'}}>
              {['Claim ID','Patient','Policy','Hospital','Amount','Date','Status','Action'].map(h=>(
                <th key={h} style={{padding:'12px 18px',textAlign:h==='Action'?'right':'left',
                  fontSize:9,fontWeight:700,color:C.out,textTransform:'uppercase',letterSpacing:'0.1em',whiteSpace:'nowrap'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id} style={{borderBottom:`1px solid ${C.sL}`,transition:'background 0.1s'}}
                onMouseEnter={e=>e.currentTarget.style.background=C.sL}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <td style={{padding:'16px 18px'}}><span style={{background:C.sH,padding:'3px 8px',borderRadius:6,fontFamily:'monospace',fontWeight:700,fontSize:12,color:C.oS}}>{r.id}</span></td>
                <td style={{padding:'16px 18px'}}><p style={{fontWeight:700,fontSize:13,color:C.oS}}>{r.pat}</p></td>
                <td style={{padding:'16px 18px'}}><span style={{fontSize:12,color:C.oSV}}>{r.policy}</span></td>
                <td style={{padding:'16px 18px'}}><span style={{fontSize:12,color:C.oSV}}>{r.hosp}</span></td>
                <td style={{padding:'16px 18px'}}><span style={{fontWeight:700,fontSize:13,color:C.oS}}>{r.amt}</span></td>
                <td style={{padding:'16px 18px'}}><span style={{fontSize:12,color:C.oSV}}>{r.date}</span></td>
                <td style={{padding:'16px 18px'}}><Bdg ch={r.st} bg={r.sb} col={r.sc}/></td>
                <td style={{padding:'16px 18px',textAlign:'right'}}>
                  <button onClick={onReview} style={{background:VG,color:'#fff',fontWeight:700,
                    fontSize:11,padding:'7px 14px',borderRadius:8,border:'none',cursor:'pointer',
                    boxShadow:'0 2px 8px rgba(0,72,141,0.2)'}}>Review Claim</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{padding:'14px 24px',background:C.sL,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <p style={{fontSize:10,fontWeight:500,color:C.out,textTransform:'uppercase',letterSpacing:'0.1em'}}>Showing 4 of 847 records</p>
          <div style={{display:'flex',gap:6}}>
            {['chevron_left','chevron_right'].map(ic=>(
              <button key={ic} style={{padding:6,borderRadius:8,background:C.s0,border:`1px solid ${C.oV}`,cursor:'pointer',color:C.out,display:'flex'}}>
                <Ic n={ic} s={18}/>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InsurerDetail({decision,onDecide,notes,setNotes,state,setState,onBack}: any) {
  const scenario = state.demoScenario || 'healthy';
  const recommendedAction = scenario==='policyMismatch'
    ? 'Query / Create override case'
    : scenario==='missingDocs'
      ? 'Hold for documents'
      : scenario==='consentHold'
        ? 'Hold until consent refresh'
        : 'Approve';
  return (
    <div style={{paddingBottom:100}}>
      <button onClick={onBack} style={{display:'flex',alignItems:'center',gap:6,color:C.p,
        fontWeight:600,fontSize:13,background:'transparent',border:'none',cursor:'pointer',marginBottom:18}}>
        <Ic n="arrow_back" s={16} col={C.p}/>Back to Claims Queue
      </button>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <Bdg ch="Claim #CLM-2024-001" bg={C.sFx} col={C.sec}/>
        <Bdg ch="Network Hospital" bg={C.tF} col={C.t}/>
      </div>
      <h1 style={{fontSize:30,fontWeight:900,color:C.oS,letterSpacing:'-0.02em',marginBottom:4}}>Claim Adjudication Review</h1>
      <p style={{color:C.oSV,fontSize:14,marginBottom:24}}>{state.name||'Ravi Kumar'} • Policy: {state.policy||'POL-2024-004521'} • {state.insurer||'Star Health'}</p>

      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 320px',gap:18,alignItems:'start'}}>
        <div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,marginBottom:18}}>
            <div style={{background:C.s0,borderRadius:16,padding:22,boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
              <SL ch="Claim Summary"/>
              <div style={{marginTop:14,display:'flex',flexDirection:'column',gap:9}}>
                {[['Patient',scenario==='consentHold'?'Masked until re-consent':state.name||'Ravi Kumar'],['Hospital',state.selectedHospital?.name||'Apollo Hospitals'],['Insurer',state.insurer||'Star Health'],['Claim Amount',`₹${state.estCost||'12,500'}`],['ICD Codes',scenario==='lowConfidence'?'I21.19, R07.9 (review)': 'Z00.00, J18.9'],['CPT Codes',scenario==='missingDocs'?'Pending final packet':'99213, 71046'],['Submission Date','Apr 22, 2024']].map(([k,v])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',
                    borderBottom:`1px solid ${C.sL}`,paddingBottom:8}}>
                    <span style={{fontSize:12,color:C.oSV}}>{k}</span>
                    <span style={{fontSize:13,fontWeight:700,color:C.oS}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:C.s0,borderRadius:16,padding:22,boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
              <SL ch="Policy Conditions Check"/>
              <div style={{marginTop:14,display:'flex',flexDirection:'column',gap:9}}>
                {[
                  ['Sum Insured',`₹${state.sumInsured||'5,00,000'}`,true],
                  ['Claim Within Limit',scenario==='policyMismatch'?'No':'Yes ✓',scenario!=='policyMismatch'],
                  ['Policy Valid Until',state.validity||'31/03/2026',true],
                  ['Network Hospital',scenario==='policyMismatch'?'Exception required':'Yes ✓',scenario!=='policyMismatch'],
                  ['Pre-existing Condition',scenario==='policyMismatch'?'Disclosure review':'No',scenario!=='policyMismatch'],
                  ['Waiting Period Cleared',scenario==='policyMismatch'?'No':'Yes',scenario!=='policyMismatch']
                ].map(([k,v,ok])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',
                    borderBottom:`1px solid ${C.sL}`,paddingBottom:8}}>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <Ic n={ok?'check_circle':'cancel'} f={1} s={14} col={ok?C.t:C.e}/>
                      <span style={{fontSize:12,color:C.oSV}}>{k}</span>
                    </div>
                    <Bdg ch={v} bg={ok?C.tF:C.eC} col={ok?C.t:C.e}/>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{background:C.s0,borderRadius:16,padding:22,marginBottom:18,
            boxShadow:'0 2px 8px rgba(0,0,0,0.04)',display:'flex',gap:24,alignItems:'center'}}>
            <div style={{textAlign:'center',flexShrink:0}}>
              <div style={{position:'relative',display:'inline-block'}}>
                <svg width="88" height="88" style={{transform:'rotate(-90deg)'}}>
                  <circle cx="44" cy="44" r="36" fill="transparent" stroke={C.sX} strokeWidth="7"/>
                  <circle cx="44" cy="44" r="36" fill="transparent" stroke={scenario==='policyMismatch'?C.e:scenario==='lowConfidence'?'#d97706':C.t} strokeWidth="7"
                    strokeDasharray="226.2" strokeDashoffset={scenario==='policyMismatch'?'104':scenario==='lowConfidence'?'62':'22.6'}/>
                </svg>
                <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                  <span style={{fontSize:20,fontWeight:900,color:C.oS}}>{scenario==='policyMismatch'?'54':scenario==='lowConfidence'?'72':'90'}</span>
                  <span style={{fontSize:8,fontWeight:700,color:scenario==='policyMismatch'?C.e:scenario==='lowConfidence'?'#d97706':C.t,textTransform:'uppercase'}}>{scenario==='healthy'?'Low Risk':'Needs review'}</span>
                </div>
              </div>
              <SL ch="Fraud Score"/>
            </div>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:C.oS,marginBottom:12}}>MediCode Fraud Engine Results</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                {['Duplicate Claim','Policy Coverage','Billing Anomaly','Clinical Consistency','Network Verify','Waiting Period'].map(r=>(
                  <div key={r} style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:C.oSV}}>
                    <Ic n={(scenario==='policyMismatch' && (r==='Policy Coverage' || r==='Waiting Period'))?'warning':'check_circle'} f={1} s={13} col={(scenario==='policyMismatch' && (r==='Policy Coverage' || r==='Waiting Period'))?C.e:C.t}/>
                    {r}: <strong style={{color:(scenario==='policyMismatch' && (r==='Policy Coverage' || r==='Waiting Period'))?C.e:C.t}}>{(scenario==='policyMismatch' && (r==='Policy Coverage' || r==='Waiting Period'))?'Escalate':'Pass'}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{background:C.s0,borderRadius:16,padding:22,boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <SL ch="Adjudicator Notes"/>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)}
              placeholder="Add notes, conditions, or query for additional documentation..."
              style={{width:'100%',border:`1px solid ${C.oV}`,borderRadius:10,padding:'12px 14px',
                fontSize:13,color:C.oS,resize:'vertical',minHeight:80,marginTop:12,
                outline:'none',fontFamily:'inherit',lineHeight:1.6}}/>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <ComplianceAuditSidebar scenario={scenario} activities={state.activities}/>
          <ExceptionActionsCard state={state} setState={setState}/>
        </div>
      </div>

      <div style={{position:'fixed',bottom:0,left:240,right:0,padding:18,zIndex:50,pointerEvents:'none'}}>
        <div style={{maxWidth:900,margin:'0 auto',background:'rgba(255,255,255,0.9)',
          backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',borderRadius:18,
          padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',
          boxShadow:'0 -4px 32px rgba(0,0,0,0.1)',pointerEvents:'all'}}>
          {decision?(
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:40,height:40,borderRadius:'50%',
                background:decision==='approved'?C.tF:decision==='rejected'?C.eC:C.sFx,
                display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Ic n={decision==='approved'?'check_circle':decision==='rejected'?'cancel':'help'} f={1} s={22}
                  col={decision==='approved'?C.t:decision==='rejected'?C.e:C.sec}/>
              </div>
              <div>
                <p style={{fontWeight:700,fontSize:15,color:C.oS}}>
                  {decision==='approved'?'✓ Claim Approved — Payment Initiated':decision==='rejected'?'✗ Claim Rejected':'❓ Query Raised — Awaiting Hospital Response'}
                </p>
                <p style={{fontSize:11,color:C.oSV,marginTop:2}}>Status synced to MediCode Platform, Hospital HIS, and Patient App</p>
              </div>
            </div>
          ):(
            <div>
              <p style={{fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:C.out}}>Recommended Action</p>
              <p style={{fontSize:12,fontWeight:700,color:C.t,display:'flex',alignItems:'center',gap:4,marginTop:2}}>
                <Ic n="auto_awesome" s={13} col={scenario==='healthy'?C.t:SCENARIO_META[scenario].tone}/>{recommendedAction}
              </p>
            </div>
          )}
          {!decision&&(
            <div style={{display:'flex',gap:10,flexShrink:0}}>
              <button onClick={()=>onDecide('query')} style={{padding:'10px 18px',fontSize:13,fontWeight:700,
                color:C.sec,background:'transparent',border:'none',cursor:'pointer',borderRadius:8,
                transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=C.sL}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>Query/Hold</button>
              <button onClick={()=>onDecide('rejected')} style={{padding:'10px 18px',fontSize:13,fontWeight:700,
                color:C.e,border:`2px solid rgba(186,26,26,0.15)`,background:'transparent',cursor:'pointer',borderRadius:8}}>
                Reject Claim
              </button>
              <CTA ch="Approve Claim" onClick={()=>onDecide('approved')} icon="check_circle"/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════ */
export default function App() {
  const [portal,setPortal] = useState('patient');
  const [gs,setGs] = useState({
    currentStep:3,name:'Ravi Kumar',dob:'15/04/1990',phone:'+91 98765 43210',
    email:'ravi@email.com',policy:'POL-2024-004521',insurer:'Star Health',
    sumInsured:'5,00,000',validity:'31/03/2026',
    selectedHospital:{name:'Apollo Hospitals'},selectedSlot:'04:00 PM',
    claimStatus:null,claimDecision:null,estCost:'12,500',preAuthSent:false,demoScenario:'healthy',
    uploadedDocs:['Pre-auth form'],
    extractedDocs:[{name:'Pre-auth form',confidence:98,status:'Mapped'}],
    activities:[
      {id:'seed-1',time:'08:42 AM',actor:'Patient App',text:'Patient profile and insurance details submitted',tone:C.p},
      {id:'seed-2',time:'08:44 AM',actor:'Patient App',text:'Hospital slot booked and shared with Apollo Hospitals',tone:C.t},
    ],
  });
  const advance = step => setGs(s=>({...s,currentStep:Math.max(s.currentStep,step)}));
  const cp = {state:gs,setState:setGs,advance};

  return (
    <div style={{fontFamily:"'Inter',-apple-system,sans-serif",background:C.s,minHeight:'100vh'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        html,body,#root{margin:0;min-height:100%;background:${C.s};}
        .material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;font-family:'Material Symbols Outlined';}
        *{box-sizing:border-box;}
        body{font-family:'Inter',-apple-system,sans-serif;}
        button,input,textarea{font:inherit}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#c2c6d4;border-radius:3px}
        button:hover{opacity:0.92}
      `}</style>
      <MetaBar portal={portal} setPortal={setPortal} step={gs.currentStep}/>
      {portal==='patient'&&<PatientApp {...cp}/>}
      {portal==='hospital'&&<HospitalHIS {...cp}/>}
      {portal==='medicode'&&<MedicodePlatform {...cp}/>}
      {portal==='insurer'&&<InsurerPortal {...cp}/>}
    </div>
  );
}
