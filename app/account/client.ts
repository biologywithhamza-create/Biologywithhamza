import {createClient,type SupabaseClient} from '@supabase/supabase-js';
const url=process.env.NEXT_PUBLIC_SUPABASE_URL??'';
const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY??'';
export const accountsConfigured=/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url)&&/^sb_publishable_[a-zA-Z0-9_-]+$/.test(key);
let client:SupabaseClient|null=null;
export function accountClient(){if(!accountsConfigured)throw Error('Online accounts are not enabled on this site yet.');if(!client)client=createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false,storageKey:'bwh-secure-session'}});return client;}
