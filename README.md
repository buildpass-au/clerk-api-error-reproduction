## Clerk Dev Environment Issue

We’re facing an issue with Clerk in Dev Environment. The strange part is that it only happens in Dev, while everything works fine in Production.

Here's the error:

```{
    "errors": [
        {
            "message": "Browser unauthenticated",
            "long_message": "Unable to authenticate this browser for your development instance. Check your Clerk cookies and try again. If the issue persists, reach out to support@clerk.com.",
            "code": "dev_browser_unauthenticated"
        }
    ],
    "clerk_trace_id": "7f0cb5d117cb4eac112d7c46bb9e429e"
}
```

### Pages

- Public: "/" `(This is where the Clerk API errors happens)`
- Admin: "/admin"

## Running the template

```bash
git clone https://github.com/clerk/clerk-nextjs-pages-quickstart
```

To run the example locally, you need to:

1. Set the required Clerk environment variables as shown in [the example `env.local.example` file](./.env.local.example).

2. `npm install` the required dependencies.

3. `npm run dev` to launch the development server.
