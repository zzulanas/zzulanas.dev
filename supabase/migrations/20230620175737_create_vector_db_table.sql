-- Enable pgvector extension
create extension if not exists vector with schema public;

-- Hold documents and embeddings
create table documents (
  id bigserial primary key,
  content text,
  embedding vector(1536)
);

-- Function to match documents based on embeddings
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;

-- Create PG vector index https://github.com/pgvector/pgvector#indexing
create index on documents using ivfflat (embedding vector_cosine_ops)
with
  (lists = 100);
