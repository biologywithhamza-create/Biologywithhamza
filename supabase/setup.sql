-- Run once in your Supabase SQL editor. No secret key belongs in the website.
create table if not exists public.learning_snapshots (
  user_id uuid primary key references auth.users(id) on delete cascade,
  version bigint not null default 1 check (version > 0),
  updated_at timestamptz not null default now(),
  payload jsonb not null check (jsonb_typeof(payload) = 'object' and octet_length(payload::text) <= 3000000)
);
alter table public.learning_snapshots enable row level security;
alter table public.learning_snapshots force row level security;
revoke all on public.learning_snapshots from anon, public;
grant select, insert, update, delete on public.learning_snapshots to authenticated;
drop policy if exists "Read own learning" on public.learning_snapshots;
create policy "Read own learning" on public.learning_snapshots for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Create own learning" on public.learning_snapshots;
create policy "Create own learning" on public.learning_snapshots for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "Update own learning" on public.learning_snapshots;
create policy "Update own learning" on public.learning_snapshots for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "Delete own learning" on public.learning_snapshots;
create policy "Delete own learning" on public.learning_snapshots for delete to authenticated using ((select auth.uid()) = user_id);

-- Compare-and-swap prevents a stale browser from silently overwriting a newer copy.
-- SECURITY INVOKER deliberately keeps the caller's RLS restrictions.
create or replace function public.save_learning_snapshot(expected_version bigint, new_payload jsonb)
returns table(version bigint, updated_at timestamptz)
language plpgsql security invoker set search_path = '' as $$
declare owner_id uuid := auth.uid();
begin
  if owner_id is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if expected_version < 0 or jsonb_typeof(new_payload) <> 'object'
     or new_payload->>'format' is distinct from 'bwh-learning-snapshot'
     or new_payload->>'version' is distinct from '1'
     or octet_length(new_payload::text) > 3000000 then
    raise exception 'Invalid learning snapshot' using errcode = '22023';
  end if;
  if expected_version = 0 then
    return query insert into public.learning_snapshots as s(user_id, payload)
      values(owner_id, new_payload) on conflict(user_id) do nothing
      returning s.version, s.updated_at;
  else
    return query update public.learning_snapshots as s
      set payload = new_payload, version = s.version + 1, updated_at = now()
      where s.user_id = owner_id and s.version = expected_version
      returning s.version, s.updated_at;
  end if;
  if not found then raise exception 'Cloud version conflict; reload before saving' using errcode = '40001'; end if;
end;
$$;
revoke all on function public.save_learning_snapshot(bigint, jsonb) from public, anon;
grant execute on function public.save_learning_snapshot(bigint, jsonb) to authenticated;
