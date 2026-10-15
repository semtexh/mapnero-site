(function(){
  'use strict';
  let enabled=false,pitch=45;
  function reset(){enabled=false;pitch=45;}
  function mount(parent,{getDataset}){
    const group=document.createElement('fieldset');group.className='app-buffer-settings';
    const legend=document.createElement('legend');legend.textContent='Try the Android terrain camera';group.append(legend);
    const note=document.createElement('p');note.textContent='Tilt the real London map without changing any saved geometry. This is camera perspective, not an elevation model. Your source maps and track heights remain unchanged. These local preferences last until reload or Start again.';group.append(note);
    const label=document.createElement('label'),toggle=document.createElement('input');toggle.type='checkbox';toggle.checked=enabled;toggle.setAttribute('aria-label','Enable practice terrain camera');label.append(toggle,'Enable practice terrain camera');group.append(label);
    const pitchLabel=document.createElement('label'),slider=document.createElement('input');slider.type='range';slider.min=0;slider.max=60;slider.step=5;slider.value=String(pitch);slider.setAttribute('aria-label','Practice terrain camera pitch');pitchLabel.append('Camera pitch · 0–60°',slider);group.append(pitchLabel);
    const feedback=document.createElement('p');feedback.setAttribute('role','status');group.append(feedback);parent.append(group);
    let map=null;
    function report(){const actual=map?.view();feedback.textContent=`${enabled?'Perspective enabled':'Top-down view'} · selected pitch ${pitch}° · map camera ${actual?actual.pitch.toFixed(0):enabled?pitch:0}°. Source elevations unchanged.`;}
    function apply(){toggle.checked=enabled;slider.disabled=!enabled;map?.setPitch(enabled?pitch:0);report();}
    toggle.onchange=()=>{enabled=toggle.checked;apply();};slider.oninput=()=>{pitch=Number(slider.value);apply();};
    map=MapNeroLiveMapPractice.mount(group,{getDataset,readOnly:true,allowDrawing:false,initialView:{pitch:enabled?pitch:0},onCameraIdle:report,selectionText:{legend:'Working London map perspective',note:'Drag to pan and pinch with two fingers to zoom. Use the camera pitch control above to compare top-down and tilted views. OpenStreetMap tiles load online; this demo does not request GPS or change your account.',ready:'London perspective map ready. Pan, pinch or adjust camera pitch above.'}});
    apply();
    return{toggle:()=>{enabled=!enabled;apply();},cleanup:()=>{map.cleanup();group.remove();}};
  }
  window.MapNeroTerrainViewPractice={mount,reset};
})();
