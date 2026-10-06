# Enable optional student accounts

The complete site works without account configuration. Cambridge answers, chapter checklists, local practice IDs and backups are available immediately. The Account page clearly says online sign-in is not enabled until configured.

## What the integration uses

- Supabase Auth: email one-time codes, verified by the authentication service.
- Supabase PostgreSQL: one private learning snapshot per signed-in account.
- Row Level Security: each user can read/write/delete only their own snapshot.
- Explicit save/restore: no hidden automatic uploads or silent merging of another device's work.
- Version checks: an older device cannot overwrite a newer cloud snapshot through the save flow without reading it again.

Your Cloudflare Pages build remains static. There is no need to move the domain or add a server to the GitHub repository. The authentication/database and email services are separate services whose usage limits and costs depend on the plans you choose.

## 1. Create your Supabase project

Open https://supabase.com/dashboard and create a project you own. Keep its database password private. The site does not need that password.

Open the project's SQL editor, paste the entire contents of `supabase/setup.sql`, and run it. It creates the private table, policies and save function. Do not disable Row Level Security to troubleshoot an error.

## 2. Configure email-code authentication

Enable the Email provider and allow new user registrations. This integration uses verified email codes, not passwords or anonymous sign-in.

In Authentication → Email Templates, set the **Magic Link** template to send a code, for example:

```html
<h2>Your Biology with Hamza sign-in code</h2>
<p>Enter this code on the website:</p>
<p><strong>{{ .Token }}</strong></p>
<p>If you did not request this code, ignore this email.</p>
```

Check the confirmation/sign-up email template also includes `{{ .Token }}` if your project's configuration uses it for new email registrations. Keep email verification enabled. Set the Site URL to `https://hamzaramzan.online`. Codes are entered on the Account page; this release does not process magic-link redirects.

Configure **custom SMTP** before opening accounts to students. Supabase's default sender is intended for testing and restricts recipients; it is not a general student email-delivery service. Add the sending-domain records requested by your email provider, and test receipt using an address outside your Supabase team. SMTP credentials belong in Supabase's settings, never in GitHub or public website variables.

Keep server-side authentication rate limits enabled and set email-volume limits appropriate for your class size. The site's resend countdown is a convenience, not a security control. This release does not include a CAPTCHA widget; enabling mandatory CAPTCHA in Supabase requires adding that widget before sign-in will work.

## 3. Set two Cloudflare Pages build variables

In your Cloudflare Pages project's Settings → Variables and Secrets / Environment variables, add the production build variables:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your project URL, such as `https://your-project-ref.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your project's **publishable** key beginning `sb_publishable_` |

The code supports the standard hosted Supabase project URL. These two values are public configuration: browser code needs them. Access to student data comes from a verified user session and the database policies, not from keeping the publishable key hidden.

Never use a secret key (`sb_secret_`), `service_role` key, database password or SMTP password here. This release deliberately accepts only the new publishable-key format. No secret key is needed by the website.

Keep the build command `npm run build:netlify` and output directory `out`. Rebuild after setting these variables because Next.js includes public variables at build time. For local testing, put these same values in `.env.local` and keep that file out of GitHub.

## 4. Test before inviting students

1. Open `/account`, request a code for your own email, and verify it.
2. Write a Cambridge answer and mark a chapter-pack step complete. Create a local practice ID and finish a short quiz if you want quiz history in the snapshot.
3. In Account, choose **Read latest cloud copy**, then **Save this browser's progress to account**. Check the displayed profile, and confirm.
4. On another device or a separate browser profile, sign in with the same email. Read the cloud copy, preview it and confirm restore. Verify the answer, checklist and quiz records appear.
5. Sign in as a different email in a third browser profile. It should have no cloud progress until you explicitly save some. Never upload another student's browser profile into that account.
6. Open the same account on two devices, read the same cloud version, save on device A, then try saving on B without re-reading. B must show a version-conflict message.
7. Test sign-out, an expired/incorrect code, a disconnected network, and cloud-data deletion.

## Data behavior and privacy

- Uploaded snapshot: active local profile name/ID, latest 50 detailed quiz attempts, mistake review schedule, saved Cambridge responses and self-checks, completion marks, bookmarks and study notes.
- Not uploaded: passwords, other local profile histories, the old score-only summary list, appearance settings or recent-browsing history.
- There is one cloud snapshot per email account. Saving replaces it after confirmation. Restoring replaces this browser's active learning state after confirmation; it does not merge answers.
- Browser learning records remain after sign-out. On shared devices, save/download first and then clear the site's browser data when finished.
- The account page can delete its cloud progress. Removing the authentication account itself is an owner action in Supabase → Authentication → Users. Deleting that user also removes its snapshot through the database relationship.
- The site owner operates the service and is responsible for account support, data requests and the privacy notice appropriate to the students using it.

## Verification status

The SQL was executed locally using a PostgreSQL-compatible test runtime. Owner isolation, anonymous denial and version-conflict behavior passed. The frontend is tested with simulated service responses. A real Supabase project and real outbound email were not provisioned or tested in this package; complete the checks above after setup.

Official references:
- https://supabase.com/docs/guides/auth/auth-email-passwordless
- https://supabase.com/docs/guides/auth/auth-smtp
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/getting-started/api-keys
