# 2026-01-13: WSL2/Docker Integration & Local Supabase Edge Function Connectivity

## Problem
In a WSL2 environment with Docker Desktop for Windows, the standard Supabase CLI flow (`supabase functions serve`) failed because:
1.  **Docker Socket Timeout**: Integration between WSL2 and Docker Windows was hanging, making `docker ps` and `supabase status` unusable.
2.  **SSL Trust**: Deno (Edge Function engine) did not trust the self-signed/local certificate of `https://supabase.dev.zntl` (`UnknownIssuer` error).
3.  **Port Conflict**: Port 8000 was occupied by a zombie Kong process from a previous (partially failed) Supabase run.
4.  **Network Isolation**: WSL2 localhost vs. Docker Windows network made it difficult for containers to reach the host API.

## Resolution (The Bypass Strategy)
To continue development without a working Docker/WSL2 bridge, we implemented a direct Deno bypass:
1.  **Direct Deno Installation**: Downloaded and installed the Deno binary directly into WSL2 (`wget` + `unzip`).
2.  **Direct Execution**: Ran the Edge Function skeleton using the native Deno runtime:
    ```bash
    ./deno run --allow-net --allow-env --unsafely-ignore-certificate-errors=supabase.dev.zntl guide/supabase/functions/api-v1/index.ts
    ```
3.  **Port Customization**: Changed the Edge Function port to `8001` in `index.ts` to avoid conflict with the hanging Kong process on `8000`.
4.  **SSL Bypass**: Used `--unsafely-ignore-certificate-errors` to allow Deno to talk to the local `https` API on Windows.

## Current Status
- **Connectivity**: Confirmed! The function reached the PostgREST API on Windows.
- **Data Issue**: Encountered `PGRST205 (Could not find the table public.categories)`. While migrations exist in the repo, they might not have been applied to the specific DB instance or the schema cache needed a refresh.
- **Front-end**: `radzyn.city` is ready to use this API via the `NEXT_PUBLIC_GUIDE_API_BASE_URL` feature flag.

## Key Learnings
- When Docker/Supabase CLI fails in WSL2, Deno can be run as a standalone process to verify Edge Function logic.
- Always check if ports (8000/54321) are held by "zombie" containers when switching between CLI and manual runs.
