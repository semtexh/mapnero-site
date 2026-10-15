(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.MapNeroTouchNavigation=factory();})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 function bind(surface,{getFrame,onBrowse}){
  let start=null;
  function clear(){const previous=start;start=null;if(previous&&surface.hasPointerCapture(previous.id))surface.releasePointerCapture(previous.id);}
  function down(e){
   // A second finger is a pinch/scroll interaction, never a screen swipe.
   if(e.pointerType==='touch'&&!e.isPrimary){clear();return;}
   if(e.target!==surface||!e.isPrimary||e.button!==0||![e.clientX,e.clientY].every(Number.isFinite))return;
   if(start&&start.id!==e.pointerId){clear();return;}
   start={id:e.pointerId,x:e.clientX,y:e.clientY,frame:getFrame()};surface.setPointerCapture(e.pointerId);
  }
  function up(e){if(!start||start.id!==e.pointerId)return;const gesture=start;clear();const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y,threshold=Math.min(75,Math.max(40,surface.clientWidth*.18));if(gesture.frame===getFrame()&&Math.abs(dx)>threshold&&Math.abs(dy)<50&&Math.abs(dx)>Math.abs(dy)*1.5)onBrowse(dx<0?1:-1);}
  function cancel(e){if(start?.id===e.pointerId)clear();}
  const handlers={pointerdown:down,pointerup:up,pointercancel:cancel,lostpointercapture:cancel};for(const [name,handler]of Object.entries(handlers))surface.addEventListener(name,handler);
  return{cleanup(){clear();for(const [name,handler]of Object.entries(handlers))surface.removeEventListener(name,handler);}};
 }
 return{bind};
});
