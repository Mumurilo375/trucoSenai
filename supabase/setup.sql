-- Truco Paulista: schema mínimo. Execute tudo uma vez no SQL Editor do Supabase.
create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^[A-Z2-9]{6}$'),
  host_user_id uuid not null,
  guest_user_id uuid,
  host_name text not null check (char_length(host_name) between 1 and 18),
  guest_name text check (guest_name is null or char_length(guest_name) between 1 and 18),
  game_state jsonb not null default '{}'::jsonb check (jsonb_typeof(game_state) = 'object'),
  version bigint not null default 1 check (version > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint rooms_distinct_players check (guest_user_id is null or guest_user_id <> host_user_id)
);

create index if not exists rooms_host_user_id_idx on public.rooms (host_user_id);
create index if not exists rooms_guest_user_id_idx on public.rooms (guest_user_id) where guest_user_id is not null;
create index if not exists rooms_updated_at_idx on public.rooms (updated_at desc);

alter table public.rooms enable row level security;
alter table public.rooms force row level security;

-- A chave pública não pode consultar nem alterar salas. A API usa a chave secreta
-- exclusivamente no servidor; ela ignora RLS como esperado.
revoke all on table public.rooms from anon, authenticated;
grant all on table public.rooms to service_role;

drop policy if exists "No direct client access to rooms" on public.rooms;
create policy "No direct client access to rooms"
  on public.rooms for all to anon, authenticated
  using (false) with check (false);

-- updated_at é definido pela API em toda atualização; não é necessária função SQL.
