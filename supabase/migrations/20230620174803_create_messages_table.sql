-- Conversation table to hold IDs of user sessions
create table conversations (
    id uuid primary key not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

-- Hold messages of user conversations
create table messages (
    id uuid primary key not null,
    conversation_id uuid not null references conversations(id),
    created_at timestamp with time zone not null default now(),
    from_who text not null,
    to_who text not null,
    contents text not null
);
