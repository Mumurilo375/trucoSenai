import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
export async function sessionClient(){const jar=await cookies();return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{cookies:{getAll:()=>jar.getAll(),setAll:(all)=>{try{all.forEach(({name,value,options})=>jar.set(name,value,options));}catch{}}}});}
export function adminClient(){const url=process.env.NEXT_PUBLIC_SUPABASE_URL,secret=process.env.SUPABASE_SECRET_KEY;if(!url||!secret)throw new Error('O servidor ainda não foi conectado ao Supabase. Preencha as três variáveis de ambiente.');return createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});}
