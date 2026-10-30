'use client';
import { createBrowserClient } from '@supabase/ssr';
let client: ReturnType<typeof createBrowserClient>|undefined;
export function supabaseBrowser(){const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;if(!url||!key)throw new Error('Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY para jogar online.');return client??=createBrowserClient(url,key);}
