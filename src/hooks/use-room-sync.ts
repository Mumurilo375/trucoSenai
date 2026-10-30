'use client';
import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import type { PublicRoom } from '@/lib/truco/types';

export function useRoomSync(code:string,setError:Dispatch<SetStateAction<string>>){
  const [room,setRoom]=useState<PublicRoom|null>(null);
  const [joined,setJoined]=useState(false);
  const [connection,setConnection]=useState(true);
  const inFlight=useRef(false),queued=useRef(false),refreshRef=useRef<()=>Promise<void>>(async()=>{});

  const refresh=useCallback(async()=>{
    if(!code||document.hidden)return;
    if(inFlight.current){queued.current=true;return;}
    inFlight.current=true;
    try{
      const res=await fetch(`/api/rooms/${encodeURIComponent(code)}`,{cache:'no-store'});
      const data=await res.json();
      if(!res.ok)throw Error(data.error);
      setRoom(data.room);setJoined(data.joined);setConnection(true);setError('');
    }catch(error){
      setConnection(false);
      if(error instanceof Error)setError(error.message);
    }finally{
      inFlight.current=false;
      if(queued.current){queued.current=false;window.setTimeout(()=>void refreshRef.current(),0);}
    }
  },[code,setError]);

  useEffect(()=>{refreshRef.current=refresh;},[refresh]);
  useEffect(()=>{
    if(!code)return;
    const immediate=window.setTimeout(()=>void refresh(),0);
    const interval=window.setInterval(()=>{if(!document.hidden)void refresh();},1500);
    const onVisibility=()=>{if(!document.hidden)void refresh();};
    document.addEventListener('visibilitychange',onVisibility);
    return()=>{window.clearTimeout(immediate);window.clearInterval(interval);document.removeEventListener('visibilitychange',onVisibility);};
  },[code,refresh]);

  return {room,setRoom,joined,connection,refresh};
}
