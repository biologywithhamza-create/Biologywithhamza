# Publish PYRO on Netlify

The project is already configured for Netlify. The `netlify.toml` file supplies
the build command and publish folder automatically.

## First deployment

1. Create a new private repository on GitHub named `pyro-website`.
2. Upload this project to that repository.
3. Sign in to Netlify and choose **Add new project → Import an existing project**.
4. Select **GitHub**, authorize Netlify, and choose `pyro-website`.
5. Netlify should display:
   - Build command: `npm run build:netlify`
   - Publish directory: `out`
6. Choose **Deploy**. No environment variables are required.
7. Netlify will provide a temporary address such as `pyro-biology.netlify.app`.

## Connect HamzaRamzan.online

1. Open the PYRO project in Netlify.
2. Go to **Domain management → Add a domain → Add a domain you already own**.
3. Enter `HamzaRamzan.online` and confirm it.
4. Choose one of Netlify's two options:
   - **Netlify DNS:** copy the nameservers shown by Netlify into the account
     where the domain was purchased.
   - **External DNS:** keep the existing DNS provider and add the records
     displayed by Netlify.
5. Add `www.HamzaRamzan.online` as an alias and make the root domain primary.
6. Wait for DNS verification and HTTPS activation. DNS changes may take several
   hours to become visible everywhere.

## Future publishing

Once GitHub is connected, every commit to the main branch starts a new Netlify
deployment automatically. The previous working deployment stays available in
Netlify's deploy history and can be restored if needed.

## Manual ZIP deployment

Netlify's drag-and-drop uploader accepts the generated `out` folder, not the
source-code folder. Run `npm install` and `npm run build:netlify`, then upload
the resulting `out` directory. GitHub deployment is recommended because it
automatically republishes future edits.
