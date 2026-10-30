import type { Player } from './types';
export function seatForUser(userId:string,hostId:string,guestId:string|null):Player|null {if(userId===hostId)return'host';if(guestId&&userId===guestId)return'guest';return null;}
