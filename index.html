<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>PriceHawk</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{background:#000;color:#fff;font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif;min-height:100vh;overflow-x:hidden}
button{font-family:inherit;cursor:pointer}
input,select{font-family:inherit}
.view{display:none;min-height:100vh;padding-bottom:40px}
.view.active{display:block}
.hdr{display:flex;align-items:center;padding:16px 20px 8px;gap:12}
.hdr-between{justify-content:space-between}
.back-btn{background:none;border:none;color:#fff;font-size:28px;padding:0;line-height:1}
.card{background:#1c1c1e;border-radius:14px;padding:16px 18px;margin-bottom:10px}
.card-press{cursor:pointer;transition:transform 0.1s}
.pill{padding:8px 16px;border-radius:20px;border:none;font-size:13px;font-weight:600;white-space:nowrap}
.pill-on{background:#2c2c2e}
.pill-off{background:transparent;color:#8e8e93}
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:8px;font-size:12px;font-weight:700}
.row{display:flex;justify-content:space-between;align-items:center}
.flex{display:flex}
.gap8{gap:8px}
.gap6{gap:6px}
.gap10{gap:10px}
.gap12{gap:12px}
.gap16{gap:16px}
.f1{flex:1;min-width:0}
.shrink0{flex-shrink:0}
.wrap{flex-wrap:wrap}
.col{flex-direction:column}
.center{align-items:center}
.right{text-align:right}
.ml12{margin-left:12px}
.mb2{margin-bottom:2px}
.mb4{margin-bottom:4px}
.mb8{margin-bottom:8px}
.mb10{margin-bottom:10px}
.mb12{margin-bottom:12px}
.mb14{margin-bottom:14px}
.mb16{margin-bottom:16px}
.mt2{margin-top:2px}
.mt4{margin-top:4px}
.mt8{margin-top:8px}
.mt10{margin-top:10px}
.pt14{padding-top:14px}
.ellip{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dim{color:#8e8e93}
.dim2{color:#636366}
.green{color:#34d399}
.red{color:#ff453a}
.amber{color:#ff9f0a}
.bold{font-weight:700}
.semi{font-weight:600}
.strike{text-decoration:line-through;color:#636366}
.ital{font-style:italic}
.s11{font-size:11px}.s12{font-size:12px}.s13{font-size:13px}.s14{font-size:14px}.s15{font-size:15px}.s17{font-size:17px}.s20{font-size:20px}.s22{font-size:22px}.s24{font-size:24px}.s48{font-size:48px}
.circ{border-radius:50%;display:flex;align-items:center;justify-content:center}
.sep{border-top:1px solid #2c2c2e}
.lsp{letter-spacing:-0.03em}
.lsp2{letter-spacing:-0.02em}
.ucase{text-transform:uppercase;letter-spacing:0.05em}
.action-row{display:flex;gap:8px}
.action-btn{flex:1;padding:11px 0;border-radius:10px;font-size:13px;font-weight:700;border:none}
.action-ghost{flex:1;padding:11px 0;border-radius:10px;font-size:13px;font-weight:600;border:1px solid #2c2c2e;background:transparent}
.tag{display:inline-block;margin-top:3px;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600}
.scroll-x{overflow-x:auto;-webkit-overflow-scrolling:touch}
canvas{display:block;width:100%}
</style>
</head>
<body>

<div id="home" class="view active">
  <div class="hdr hdr-between">
    <span class="s20 bold lsp"><span class="green">&#9670;</span> PriceHawk</span>
    <div class="flex gap8 center">
      <button id="bell-btn" onclick="showView('alerts')" style="background:#1c1c1e;border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:16px;position:relative;display:flex;align-items:center;justify-content:center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span id="bell-badge" style="display:none;position:absolute;top:-2px;right:-2px;background:#ff453a;color:#fff;font-size:10px;font-weight:700;width:18px;height:18px;border-radius:50%;align-items:center;justify-content:center;border:2px solid #000"></span>
      </button>
      <button onclick="toggleAdd()" style="background:#1c1c1e;border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:20px">+</button>
    </div>
  </div>
  <div style="padding:4px 20px 12px"><div style="background:#1c1c1e;border-radius:10px;padding:10px 14px"><input placeholder="Search Products" style="background:transparent;border:none;color:#8e8e93;font-size:16px;width:100%;outline:none"></div></div>
  <div id="add-form" style="display:none;padding:0 20px 16px"></div>
  <div id="product-list" style="padding:0 20px"></div>
</div>

<div id="detail" class="view">
  <div class="hdr"><button class="back-btn" onclick="showView('home')">&lt;</button><span class="s17 semi">Product</span></div>
  <div id="detail-content"></div>
</div>

<div id="alerts" class="view">
  <div class="hdr">
    <button class="back-btn" onclick="showView('home')">&lt;</button>
    <span class="s17 semi">Alerts</span>
    <div style="flex:1"></div>
    <span id="alert-count" class="s12 bold" style="background:#ff453a;color:#fff;padding:3px 10px;border-radius:10px"></span>
  </div>
  <div id="alert-filters" class="flex gap6" style="padding:8px 20px 16px;overflow-x:auto"></div>
  <div id="alert-summary" style="padding:0 20px 12px"></div>
  <div id="alert-list" style="padding:0 20px"></div>
</div>

<script>
var seed=function(s){return function(){s=(s*16807)%2147483647;return(s-1)/2147483646}};
var genH=function(base,days,sd){var r=seed(sd),h=[],p=base*(1+(r()-0.5)*0.1),n=Date.now();for(var i=days;i>=0;i--){p=Math.max(base*0.6,Math.min(base*1.4,p+(r()-0.47)*base*0.035));h.push({d:new Date(n-i*864e5).toISOString().split("T")[0],p:Math.round(p*100)/100})}return h};
var SHIPS=[0,4.99,5.95,3.49,6.99,7.50,0,2.99,0,5.49,4.25,0,3.99,8.50,0];
var NAMES=["CedarCraft Studio","The Artisan Nook","Maple & Thread Co.","Rustic Ember Goods","Willow & Pine Shop","Handmade by Lena","The Cozy Kiln","Oakwood Collective","Sunflower & Sage","Birchwood Mercantile","Little Fox Pottery","The Wandering Maker","Clover Hill Crafts","Moonstone Atelier","River Stone Designs"];
var mkC=function(bp){return NAMES.map(function(nm,i){return{id:"c"+i,store:nm,cp:Math.round((bp*(0.7+i*0.04+Math.sin(i)*0.08))*100)/100,ship:SHIPS[i],hist:genH(bp*(0.75+i*0.03),30,(i+1)*137)}})};
var PRODS=[
  {id:"p1",name:"Handmade Ceramic Mug \u2014 Earth Tones",plat:"Etsy",yp:28,ys:0,hist:genH(28,30,99),comps:mkC(28)},
  {id:"p2",name:"Minimalist Leather Wallet \u2014 Slim Bifold",plat:"Amazon",yp:45,ys:5.99,hist:genH(45,30,200),comps:mkC(45)},
  {id:"p3",name:"Soy Candle Set \u2014 Lavender & Sage (3pk)",plat:"Shopify",yp:34,ys:0,hist:genH(34,30,333),comps:mkC(34)},
  {id:"p4",name:"Macrame Wall Hanging \u2014 Boho Large",plat:"Etsy",yp:62,ys:8.99,hist:genH(62,30,444),comps:mkC(62)}
];
var n=Date.now();
var ALERTS=[
  {id:"a1",pn:"Handmade Ceramic Mug",st:"CedarCraft Studio",tp:"drop",op:26.5,np:22.99,sh:0,cf:94,rs:"Consistent 7-day downward trend. No sale language.",ts:new Date(n-18e5).toISOString(),status:"new"},
  {id:"a2",pn:"Minimalist Leather Wallet",st:"Rustic Ember Goods",tp:"promo",op:44,np:33,sh:4.99,cf:87,rs:"\"25% OFF\" badge detected. Likely temporary.",ts:new Date(n-72e5).toISOString(),status:"new"},
  {id:"a3",pn:"Soy Candle Set",st:"Willow & Pine Shop",tp:"drop",op:34,np:29.5,sh:5.95,cf:91,rs:"Price reduced, no promo indicators. New baseline.",ts:new Date(n-144e5).toISOString(),status:"new"},
  {id:"a4",pn:"Handmade Ceramic Mug",st:"The Cozy Kiln",tp:"noise",op:30,np:29.85,sh:3.49,cf:72,rs:"Change < 1%. Rounding or A/B test. Auto-dismissed.",ts:new Date(n-288e5).toISOString(),status:"dismissed"},
  {id:"a5",pn:"Macrame Wall Hanging",st:"Moonstone Atelier",tp:"drop",op:65,np:54.99,sh:0,cf:96,rs:"Significant sustained drop. 3 reprices this week.",ts:new Date(n-432e5).toISOString(),status:"new"},
  {id:"a6",pn:"Minimalist Leather Wallet",st:"Birchwood Mercantile",tp:"promo",op:48,np:38.4,sh:0,cf:82,rs:"\"SPRING20\" coupon visible. Seasonal promo.",ts:new Date(n-648e5).toISOString(),status:"new"},
  {id:"a7",pn:"Soy Candle Set",st:"Little Fox Pottery",tp:"noise",op:36,np:35.8,sh:2.99,cf:65,rs:"Micro-fluctuation. No pattern. Auto-dismissed.",ts:new Date(n-864e5).toISOString(),status:"dismissed"}
];

var state={selProd:null,selComps:{},visCount:5,period:"1M",showLanded:true,aFilt:"all"};

function $(id){return document.getElementById(id)}
function showView(v){document.querySelectorAll('.view').forEach(function(el){el.classList.remove('active')});$(v).classList.add('active');if(v==='home')renderHome();if(v==='alerts')renderAlerts();if(v==='detail')renderDetail()}
function chg(h){if(h.length<2)return{a:0,pc:0};var c=h[h.length-1].p,p=h[h.length-2].p;return{a:c-p,pc:((c-p)/p)*100}}
function ago(ts){var d=Date.now()-new Date(ts).getTime(),m=Math.floor(d/60000);if(m<60)return m+"m ago";var h=Math.floor(m/60);return h<24?h+"h ago":Math.floor(h/24)+"d ago"}
function miniSVG(data,up){if(!data||data.length<2)return'';var W=360,H=50,ps=data.map(function(x){return x.p}),mn=Math.min.apply(null,ps),mx=Math.max.apply(null,ps),rg=mx-mn||1;var pts=ps.map(function(p,i){return(i/(ps.length-1))*W+","+(H-((p-mn)/rg)*(H-6)-3)}).join(" ");var c=up?"#34d399":"#ff453a";var gid="g"+Math.random().toString(36).slice(2,7);return'<svg viewBox="0 0 '+W+" "+H+'" style="width:100%;height:50px;display:block"><defs><linearGradient id="'+gid+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="'+c+'" stop-opacity="0.15"/><stop offset="100%" stop-color="'+c+'" stop-opacity="0"/></linearGradient></defs><polygon points="0,'+H+" "+pts+" "+W+","+H+'" fill="url(#'+gid+')"/><polyline points="'+pts+'" fill="none" stroke="'+c+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'}
function tpS(tp){if(tp==="drop")return{l:"Price Drop",c:"#ff453a",bg:"rgba(255,69,58,0.12)",i:"\u2193"};if(tp==="promo")return{l:"Promo Detected",c:"#ff9f0a",bg:"rgba(255,159,10,0.12)",i:"%"};return{l:"Noise",c:"#636366",bg:"rgba(99,99,102,0.12)",i:"~"}}
function stB(s){if(s==="matched")return{l:"Price matched",c:"#34d399",bg:"rgba(52,211,153,0.12)"};if(s==="snoozed")return{l:"Snoozed 7d",c:"#5e5ce6",bg:"rgba(94,92,230,0.12)"};if(s==="promo")return{l:"Marked as promo",c:"#ff9f0a",bg:"rgba(255,159,10,0.12)"};if(s==="dismissed")return{l:"Auto-dismissed",c:"#636366",bg:"rgba(99,99,102,0.12)"};return null}

function toggleAdd(){var f=$('add-form');f.style.display=f.style.display==='none'?'block':'none';if(f.style.display==='block')f.innerHTML='<div class="card" style="padding:20px"><div class="s16 bold mb16">Track New Product</div><input placeholder="Product name" style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #2c2c2e;background:#000;color:#fff;font-size:15px;margin-bottom:10px;outline:none"><div class="flex gap10 mb10"><select style="flex:1;padding:12px 14px;border-radius:10px;border:1px solid #2c2c2e;background:#000;color:#fff;font-size:15px;outline:none"><option>Etsy</option><option>Amazon</option><option>Shopify</option><option>eBay</option></select><input type="number" placeholder="Your price" style="flex:1;padding:12px 14px;border-radius:10px;border:1px solid #2c2c2e;background:#000;color:#fff;font-size:15px;outline:none"></div><button onclick="toggleAdd()" style="width:100%;padding:14px;border-radius:10px;border:none;background:#34d399;color:#000;font-size:16px;font-weight:700">Start Tracking</button></div>'}

function renderHome(){
  var nc=ALERTS.filter(function(a){return a.status==="new"}).length;
  var bb=$('bell-badge');if(nc>0){bb.style.display='flex';bb.textContent=nc}else bb.style.display='none';
  var html='';
  PRODS.forEach(function(p,idx){
    var c=chg(p.hist),cur=p.hist[p.hist.length-1].p,uc=p.comps.filter(function(x){return x.cp<p.yp}).length;
    var cc=c.a>=0?"#34d399":"#ff453a",arrow=c.a>=0?"\u2191":"\u2193";
    html+='<div class="card card-press" onclick="openProduct('+idx+')">'
      +'<div style="display:flex;justify-content:space-between;align-items:flex-start">'
      +'<div style="flex:1;min-width:0"><div class="s11 dim ucase mb4">'+p.plat+'</div><div class="s15 semi mb10 ellip">'+p.name+'</div></div>'
      +'<div style="text-align:right;flex-shrink:0;margin-left:12px"><div class="s22 bold lsp2">$'+cur.toFixed(2)+'</div><div class="s13 semi mt2" style="color:'+cc+'">'+arrow+' '+Math.abs(c.pc).toFixed(2)+'% today</div></div></div>'
      +'<div class="mt4">'+miniSVG(p.hist.slice(-14),c.a>=0)+'</div>'
      +'<div class="flex gap16 mt10 pt14 sep s12"><span class="dim">Your price <span style="color:#fff;font-weight:600">$'+p.yp.toFixed(2)+'</span></span><span class="dim">Undercutting <span style="color:'+(uc>0?'#ff453a':'#34d399')+';font-weight:600">'+uc+'</span></span></div></div>';
  });
  $('product-list').innerHTML=html;
}

function openProduct(idx){
  state.selProd=PRODS[idx];state.selComps={};state.visCount=5;state.period="1M";
  showView('detail');
}

function drawChart(){
  var p=state.selProd;if(!p)return;
  var cvs=$('chart-canvas');if(!cvs)return;
  var ctx=cvs.getContext('2d');
  var box=cvs.parentElement;var w=box.clientWidth,h=Math.min(240,w*0.55);
  var dpr=window.devicePixelRatio||1;
  cvs.width=w*dpr;cvs.height=h*dpr;cvs.style.width=w+'px';cvs.style.height=h+'px';
  ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);

  var pm={"1D":1,"1W":7,"1M":30,"1Y":30,"ALL":30};
  var sl=function(d){return d.slice(-(pm[state.period]||30))};
  var yd=sl(p.hist);
  var all=yd.map(function(x){return x.p}).concat([p.yp]);
  var selC=p.comps.filter(function(c){return state.selComps[c.id]});
  selC.forEach(function(c){sl(c.hist).forEach(function(x){all.push(x.p)})});
  var mn=Math.min.apply(null,all)*0.97,mx=Math.max.apply(null,all)*1.03,rg=mx-mn||1;
  var toX=function(i,len){return(i/Math.max(1,len-1))*w};
  var toY=function(pr){return 12+(1-(pr-mn)/rg)*(h-20)};
  var drawLine=function(data,color,lw){if(data.length<2)return;ctx.beginPath();ctx.strokeStyle=color;ctx.lineWidth=lw;ctx.lineJoin="round";ctx.lineCap="round";data.forEach(function(d,i){var x=toX(i,data.length),y=toY(d.p);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)});ctx.stroke()};
  ctx.setLineDash([4,4]);ctx.strokeStyle="rgba(52,211,153,0.25)";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,toY(p.yp));ctx.lineTo(w,toY(p.yp));ctx.stroke();ctx.setLineDash([]);
  selC.forEach(function(c){drawLine(sl(c.hist),"#ef4444",1.5)});
  drawLine(yd,"#34d399",2.5);
  if(yd.length>0){ctx.beginPath();ctx.arc(toX(yd.length-1,yd.length),toY(yd[yd.length-1].p),4,0,Math.PI*2);ctx.fillStyle="#34d399";ctx.fill()}
}

function toggleLanded(){state.showLanded=!state.showLanded;renderDetail()}
function setPeriod(t){state.period=t;renderDetail()}
function toggleComp(id){if(state.selComps[id])delete state.selComps[id];else state.selComps[id]=true;renderDetail()}
function showMoreComps(){state.visCount+=10;renderDetail()}
function clearComps(){state.selComps={};renderDetail()}

function renderDetail(){
  var p=state.selProd;if(!p)return;
  var cur=p.hist[p.hist.length-1].p,c=chg(p.hist),yL=p.yp+(p.ys||0);
  var cc=c.a>=0?"#34d399":"#ff453a",arrow=c.a>=0?"\u2191":"\u2193";
  var sortedC=p.comps.slice().sort(function(a,b){var at=state.showLanded?a.cp+a.ship:a.cp,bt=state.showLanded?b.cp+b.ship:b.cp;return at-bt});
  var visC=sortedC.slice(0,state.visCount);
  var activeC=sortedC.filter(function(x){return state.selComps[x.id]});

  var html='<div style="padding:20px 24px 6px"><div class="s48 bold lsp" style="line-height:1">$'+cur.toFixed(2)+'</div>'
    +'<div class="flex gap12 mt8 s15"><span class="semi" style="color:'+cc+'">'+arrow+' '+Math.abs(c.pc).toFixed(2)+'% today</span><span style="color:'+cc+'">'+(c.a>=0?"+":"")+'$'+c.a.toFixed(2)+'</span></div></div>'
    +'<div style="padding:16px 16px 0"><canvas id="chart-canvas"></canvas></div>'
    +'<div class="flex gap6" style="justify-content:center;padding:16px 20px 0">';
  ["1D","1W","1M","1Y","ALL"].forEach(function(t){
    html+='<button onclick="setPeriod(\''+t+'\')" class="pill '+(state.period===t?'pill-on':'pill-off')+'" style="'+(state.period===t?'color:#fff':'')+'">'+t+'</button>';
  });
  html+='</div>';

  if(activeC.length>0){
    html+='<div class="flex gap16 wrap s12" style="padding:12px 24px 0"><span class="flex center gap6"><span style="width:14px;height:3px;background:#34d399;border-radius:2px;display:inline-block"></span><span class="dim">Your price</span></span><span class="flex center gap6"><span style="width:14px;height:3px;background:#ef4444;border-radius:2px;display:inline-block"></span><span class="dim">'+activeC.length+' competitor'+(activeC.length>1?'s':'')+'</span></span></div>';
  }

  // My product card
  html+='<div style="padding:20px 20px 0"><div class="card" style="padding:18px 20px;margin-bottom:10px">'
    +'<div class="row mb14"><span class="s17 bold">My product</span><span style="background:#2c2c2e;padding:5px 12px;border-radius:14px;font-size:13px;font-weight:600;color:#8e8e93">Details</span></div>'
    +'<div class="flex mb16" style="justify-content:space-between"><div><div class="s24 bold green">$'+p.yp.toFixed(2)+'</div><div class="s13 dim mt2">Your price</div></div>'
    +'<div class="right"><div class="s24 bold" style="color:'+(cur<p.yp?'#ff453a':'#34d399')+'">'+(cur>=p.yp?'+':'')+'$'+(cur-p.yp).toFixed(2)+'</div><div class="s13 dim mt2">vs. market</div></div></div>'
    +'<div class="sep pt14">'
    +'<div class="row mb10 s15"><span class="dim">Market price $</span><span class="semi">$'+cur.toFixed(2)+'</span></div>'
    +'<div class="row mb10 s15"><span class="dim">Your shipping</span><span class="semi" style="color:'+(p.ys===0?'#34d399':'#fff')+'">'+(p.ys===0?'Free':'$'+p.ys.toFixed(2))+'</span></div>'
    +'<div class="row mb10 s15"><span class="dim">Your landed price</span><span class="bold green">$'+yL.toFixed(2)+'</span></div>'
    +'<div class="row s15"><span class="dim">Position</span><span class="semi" style="color:'+(cur<p.yp?'#ff453a':'#34d399')+'">'+(cur<p.yp?'\u2193':'\u2191')+' '+Math.abs(((cur-p.yp)/p.yp)*100).toFixed(2)+'%</span></div>'
    +'</div></div></div>';

  // Competitors
  html+='<div style="padding:10px 20px 0"><div class="card" style="padding:18px 20px">'
    +'<div class="row mb4"><span class="s17 bold">Competitors</span><span style="background:#2c2c2e;padding:5px 12px;border-radius:14px;font-size:13px;font-weight:600;color:#8e8e93">Sort By</span></div>'
    +'<div class="row mb16"><div class="s13 dim">'+(state.showLanded?'Lowest Landed Price':'Lowest Sticker Price')+'</div>'
    +'<button onclick="toggleLanded()" style="display:flex;align-items:center;gap:6px;padding:5px 12px;border-radius:14px;border:none;background:'+(state.showLanded?'rgba(52,211,153,0.12)':'#2c2c2e')+';color:'+(state.showLanded?'#34d399':'#8e8e93')+';font-size:12px;font-weight:600">'
    +'<span style="width:28px;height:16px;border-radius:8px;position:relative;display:inline-block;background:'+(state.showLanded?'#34d399':'#48484a')+'"><span style="position:absolute;top:2px;width:12px;height:12px;border-radius:50%;background:#fff;left:'+(state.showLanded?'14':'2')+'px"></span></span>+ Shipping</button></div>';

  visC.forEach(function(comp,i){
    var isSel=state.selComps[comp.id],cL=comp.cp+comp.ship;
    var dp=state.showLanded?cL:comp.cp,ca=state.showLanded?yL:p.yp;
    var diff=((dp-ca)/ca)*100;
    html+='<div onclick="toggleComp(\''+comp.id+'\')" style="display:flex;align-items:center;padding:13px 0;'+(i>0?'border-top:1px solid #2c2c2e;':'')+'cursor:pointer">'
      +'<div class="circ" style="width:38px;height:38px;margin-right:12px;flex-shrink:0;background:'+(isSel?'#3b1414':'#2c2c2e')+';border:'+(isSel?'2px solid #ef4444':'2px solid transparent')+';font-size:14px;font-weight:700;color:'+(isSel?'#ef4444':'#8e8e93')+'">'+comp.store.charAt(0)+'</div>'
      +'<div style="flex:1;min-width:0"><div class="s15 semi ellip" style="color:'+(isSel?'#fff':'#e5e5ea')+'">'+comp.store+'</div>'
      +'<div class="s11 mt2" style="color:'+(comp.ship===0?'#34d399':'#636366')+'">'+(comp.ship===0?'Free shipping':'+$'+comp.ship.toFixed(2)+' shipping')+'</div></div>'
      +'<div class="right ml12 shrink0"><div class="s15 bold">$'+dp.toFixed(2)+(state.showLanded?'<span class="s11 dim2" style="font-weight:500;margin-left:3px">landed</span>':'')+'</div>'
      +'<span class="tag" style="background:'+(diff<0?'rgba(255,69,58,0.15)':'rgba(52,211,153,0.15)')+';color:'+(diff<0?'#ff453a':'#34d399')+'">'+(diff<0?'\u2193':'\u2191')+' '+Math.abs(diff).toFixed(1)+'%</span></div></div>';
  });

  if(state.visCount<sortedC.length) html+='<button onclick="event.stopPropagation();showMoreComps()" style="width:100%;padding:14px;margin-top:10px;border-radius:10px;border:1px solid #2c2c2e;background:transparent;color:#34d399;font-size:15px;font-weight:600">Show '+Math.min(10,sortedC.length-state.visCount)+' more</button>';
  if(activeC.length>0) html+='<button onclick="event.stopPropagation();clearComps()" style="width:100%;padding:14px;margin-top:8px;border-radius:10px;border:none;background:#2c2c2e;color:#8e8e93;font-size:14px;font-weight:600">Clear chart ('+activeC.length+' selected)</button>';
  html+='</div></div>';

  // News cards
  html+='<div class="flex gap10 scroll-x" style="padding:20px 20px 0">';
  [{s:"MarketWatch",t:"2D AGO",x:"Price dropped 8% on similar "+p.plat+" listings this week"},{s:"PriceHawk",t:"1H AGO",x:"3 competitors adjusted pricing in the last 24 hours"}].forEach(function(n){
    html+='<div class="card" style="min-width:240px;flex:0 0 auto"><div class="flex center gap8 mb10"><div class="circ" style="width:28px;height:28px;background:#2c2c2e;font-size:10px;font-weight:700;color:#8e8e93">PH</div><div><div class="s13 semi">'+n.s+'</div><div class="s11 dim">'+n.t+'</div></div></div><div class="s15 semi" style="line-height:1.35">'+n.x+'</div></div>';
  });
  html+='</div>';

  $('detail-content').innerHTML=html;
  setTimeout(drawChart,10);
}

function doAlert(id,action){
  ALERTS.forEach(function(a){if(a.id===id){
    if(action==="match")a.status="matched";
    if(action==="snooze")a.status="snoozed";
    if(action==="promo"){a.status="promo";a.tp="promo"}
    if(action==="dismiss")a.status="dismissed";
  }});renderAlerts();
}

function setAFilt(f){state.aFilt=f;renderAlerts()}

function renderAlerts(){
  var nc=ALERTS.filter(function(a){return a.status==="new"}).length;
  $('alert-count').textContent=nc>0?nc+" new":"";$('alert-count').style.display=nc>0?"inline":"none";

  var filts=[{k:"all",l:"All",c:""},{k:"drop",l:"Price Drops",c:"#ff453a"},{k:"promo",l:"Promos",c:"#ff9f0a"},{k:"noise",l:"Noise",c:"#636366"}];
  $('alert-filters').innerHTML=filts.map(function(f){
    var on=state.aFilt===f.k;return'<button onclick="setAFilt(\''+f.k+'\')" class="pill '+(on?'pill-on':'pill-off')+'" style="color:'+(on?(f.c||'#fff'):'#8e8e93')+'">'+f.l+'</button>';
  }).join('');

  var drops=ALERTS.filter(function(a){return a.tp==="drop"&&a.status==="new"}).length;
  var promos=ALERTS.filter(function(a){return a.tp==="promo"}).length;
  var noise=ALERTS.filter(function(a){return a.tp==="noise"}).length;
  $('alert-summary').innerHTML='<div style="background:#1c1c1e;border-radius:12px;padding:14px 16px;border-left:3px solid #34d399"><div class="s13 dim mb4">Smart Summary</div><div class="s14" style="font-weight:500;line-height:1.45">'+drops+' real price drops need attention. '+promos+' promos auto-tagged. '+noise+' noise auto-dismissed.</div></div>';

  var fa=state.aFilt==="all"?ALERTS:ALERTS.filter(function(a){return a.tp===state.aFilt});
  if(fa.length===0){$('alert-list').innerHTML='<div style="text-align:center;padding:40px;color:#636366;font-size:14px">No alerts here</div>';return}

  var html='';
  fa.forEach(function(a){
    var ts=tpS(a.tp),ss=stB(a.status),lo=a.op+a.sh,ln=a.np+a.sh,isNew=a.status==="new";
    html+='<div class="card" style="border-left:3px solid '+ts.c+';opacity:'+(a.status==="dismissed"||a.status==="snoozed"?'0.55':'1')+'">'
      +'<div class="row mb10"><div class="flex center gap8"><span class="badge" style="background:'+ts.bg+';color:'+ts.c+'">'+ts.i+' '+ts.l+'</span><span class="s11 dim2">'+a.cf+'% conf.</span></div><span class="s12 dim2">'+ago(a.ts)+'</span></div>'
      +'<div class="s15 semi mb2">'+a.st+'</div><div class="s12 dim mb10">'+a.pn+'</div>'
      +'<div class="flex center gap10" style="background:#000;border-radius:10px;padding:10px 14px;margin-bottom:8px">'
      +'<div style="flex:1"><div class="s11 dim2 mb2">Sticker</div><div class="s15 semi"><span class="strike">$'+a.op.toFixed(2)+'</span> \u2192 <span style="color:'+ts.c+'">$'+a.np.toFixed(2)+'</span></div></div>'
      +'<div style="width:1px;height:32px;background:#2c2c2e"></div>'
      +'<div style="flex:1"><div class="s11 dim2 mb2">Landed '+(a.sh>0?'(+$'+a.sh.toFixed(2)+' ship)':'(free ship)')+'</div><div class="s15 bold"><span class="strike">$'+lo.toFixed(2)+'</span> \u2192 <span style="color:#fff">$'+ln.toFixed(2)+'</span></div></div></div>'
      +'<div class="s12 dim ital" style="line-height:1.4;margin-bottom:'+(isNew?'12':'4')+'px;padding:6px 0">'+a.rs+'</div>';
    if(ss&&!isNew)html+='<div class="badge" style="background:'+ss.bg+';color:'+ss.c+';font-weight:600">\u2713 '+ss.l+'</div>';
    if(isNew)html+='<div class="action-row"><button class="action-btn" onclick="doAlert(\''+a.id+'\',\'match\')" style="background:#34d399;color:#000">Match Price</button><button class="action-ghost" onclick="doAlert(\''+a.id+'\',\'snooze\')" style="color:#8e8e93">Snooze 7d</button><button class="action-ghost" onclick="doAlert(\''+a.id+'\',\''+(a.tp==="promo"?"dismiss":"promo")+'\')" style="color:'+(a.tp==="promo"?"#636366":"#ff9f0a")+'">'+(a.tp==="promo"?"Dismiss":"It\'s a Promo")+'</button></div>';
    html+='</div>';
  });
  $('alert-list').innerHTML=html;
}

renderHome();
</script>
</body>
</html>
