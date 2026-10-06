# CCL Portal Backend — Basic Skeleton

This is a minimal Node.js + Express + MongoDB backend intended to sit behind the existing CCL frontend. The goal is **not** to redesign the frontend: keep the current wireframes and gradually replace hardcoded cards/text with API data.

## 1. Setup

```bash
npm install
cp .env.example .env
# edit MONGO_URI and JWT_SECRET
npm run seed
npm run dev
```

API: `http://localhost:5000`

## 2. Public API

- `GET /api/health`
- `GET /api/ccls` — all six CCLs for the single portal landing page
- `GET /api/ccls/:slug` — one CCL configuration + public sections + published content
- `GET /api/ccls/:slug/content?type=story` — filtered public content

Example slugs:
- `thane-swm`
- `juhu-mora-gaon`
- `nagaon-murbad`
- `mahim-kelve-palghar`
- `ratnagiri-raigad`
- `tbia`

## 3. Admin API

Login:
`POST /api/admin/login`

```json
{"email":"admin@example.com","password":"ChangeMe123!"}
```

Use returned JWT as `Authorization: Bearer <token>`.

Content:
- `POST /api/admin/content`
- `PATCH /api/admin/content/:id`
- `DELETE /api/admin/content/:id`

CCL configuration:
- `POST /api/admin/ccls`
- `PATCH /api/admin/ccls/:id`

## 4. Content model

Every content item belongs to a CCL and can be a `story`, `image`, `video`, `audio`, `document`, `survey`, `dashboard`, `event`, `place`, `person`, `map`, or `download`.

Visibility is `public` or `internal`; publication status is `draft` or `published`.

This gives the project a simple foundation for the requirement that some data remain internal while selected information is broadcast on the website.

## 5. Frontend integration — minimal change

Keep the current pages/components. Add one API service and use it to populate existing components.

```js
const API = 'http://localhost:5000/api';

export async function getCcl(slug) {
  const res = await fetch(`${API}/ccls/${slug}`);
  if (!res.ok) throw new Error('Unable to load CCL');
  return res.json();
}
```

For Juhu Mora Gaon:

```js
const data = await getCcl('juhu-mora-gaon');
// data.sections -> page sections
// data.content  -> stories/images/videos/etc.
```

The visual layout can remain essentially unchanged. The backend supplies the data.

## 6. Next phase

Add:
- file/image storage (Cloudinary/S3/local uploads)
- survey result endpoints
- dashboard aggregation endpoints
- map/GIS records
- audio/video metadata
- contact/feedback forms
- real-time updates using WebSockets only where actually needed
- stronger role/permission matrix
- audit logs
- production secrets and validation
