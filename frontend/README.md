## Frontend quickstart

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL` to your backend GraphQL origin (defaults to `http://localhost:4000`).

## Demo credentials

- Manager: `manager@example.com` / `manager123`
- Store Keeper: `keeper@example.com` / `keeper123`

## Feature flow coverage

- Auth & roles: login, JWT, manager/store-keeper redirects.
- Products: list with search/filter, client-side pagination, view details, add, edit, delete (with confirm).
- Dashboard: manager-only KPIs fed from products query.
