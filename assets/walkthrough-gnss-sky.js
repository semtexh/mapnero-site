(()=>{'use strict';
function mount(parent){
 const node=(tag,text)=>{const e=document.createElement(tag);if(text)e.textContent=text;return e;};
 const group=node('fieldset');group.className='app-buffer-settings';parent.append(group);
 group.append(node('legend','Satellites reported in the log'),node('p','Completed GSV cycles only. North is at the top; the horizon is the outside ring and 90° elevation is the centre. Tap a satellite or its list button to inspect it. Unknown angles stay in the list. Signal strength does not establish whether a satellite contributed to a fix.'));
 const chart=node('div');chart.className='app-gnss-sky';group.append(chart);
 const list=node('div');list.className='app-gnss-satellite-list';const details=node('p');details.setAttribute('role','status');group.append(list,details);
 const ringColours={GPS:'#5c9cff',GLONASS:'#ef6060',Galileo:'#cb92ed',BeiDou:'#f2ad4b',QZSS:'#61d8df',Other:'#aaa'};
 function render(sats){chart.replaceChildren();list.replaceChildren();details.textContent=sats.length?`${sats.length} satellite signal records. Select one to inspect. No live receiver connection.`:'No completed GSV cycle in this input.';
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 320 320');svg.setAttribute('aria-hidden','true');chart.append(svg);
  const add=(tag,attrs,text)=>{const e=document.createElementNS(svg.namespaceURI,tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,String(v));if(text)e.textContent=text;svg.append(e);};
  add('circle',{cx:160,cy:160,r:130,fill:'#10252e'});
  for(const r of [130,130*2/3,130/3])add('circle',{cx:160,cy:160,r,fill:'none',stroke:'#62767d','stroke-width':1});
  for(const [x1,y1,x2,y2]of [[30,160,290,160],[160,30,160,290]])add('line',{x1,y1,x2,y2,stroke:'#62767d'});
  for(const [label,x,y]of [['N',160,17],['E',306,164],['S',160,312],['W',14,164],['30°',255,150],['60°',211,150],['90°',160,164]])add('text',{x,y,fill:'#e9edf0','font-size':12,'text-anchor':'middle'},label);
  const inspect=s=>{details.textContent=`${s.constellation} · ${s.talker} PRN ${s.prn} · signal ${s.signal_id??'unspecified'} · elevation ${s.elevation===null?'Unknown':s.elevation+'°'} · azimuth ${s.azimuth===null?'Unknown':s.azimuth+'°'} · C/N0 ${s.snr===null?'Unknown':s.snr+' dB-Hz'}. From this log, not a live measurement.`;};
  for(const s of sats){const label=`Inspect ${s.talker} satellite ${s.prn}${s.signal_id===null?'':' signal '+s.signal_id}`,position=MapNeroGNSS.skyPosition(s),colour=s.snr===null||s.snr===0?'#a7afb2':s.snr<20?'#ed6666':s.snr<35?'#ead263':'#78d98a';
   if(position){const b=node('button');b.type='button';b.className='app-gnss-sat';b.setAttribute('aria-label',label+' on sky plot');b.style.left=((160+position.x*130)/320*100)+'%';b.style.top=((160+position.y*130)/320*100)+'%';b.onclick=()=>inspect(s);const dot=node('span',String(s.prn));dot.style.background=colour;dot.style.borderColor=ringColours[s.constellation]||ringColours.Other;b.append(dot);chart.append(b);}
   const b=node('button',`${s.talker} ${s.prn} · ${s.snr===null?'C/N0 unknown':s.snr+' dB-Hz'}`);b.type='button';b.className='app-record-download';b.setAttribute('aria-label',label);b.onclick=()=>inspect(s);list.append(b);
  }
 }
 render([]);return{render};
}
window.MapNeroGNSSSky={mount};})();
