# Publish Biology with Hamza on Netlify

The project is configured for Netlify. The included `netlify.toml` supplies the
build command and publish folder automatically.

## Upload this complete version to GitHub

1. Extract the supplied ZIP on your computer.
2. Open the `Biologywithhamza` repository on GitHub.
3. Choose **Add file → Upload files**.
4. Upload **all extracted files and folders into the repository root**. Files
   such as `package.json`, `netlify.toml`, and the `app` folder must be visible
   on the repository's first page—not inside an extra outer folder.
5. Enter a message such as `Complete Biology with Hamza update`.
6. Choose **Commit changes** once. That single commit triggers one Netlify build.

## First Netlify deployment

1. In Netlify choose **Add new project → Import an existing project**.
2. Select GitHub, authorize Netlify, and choose the `Biologywithhamza` repository.
3. Select the `main` branch.
4. Leave the base directory empty.
5. Confirm:
   - Build command: `npm run build:netlify`
   - Publish directory: `out`
6. Choose **Deploy**. No environment variables are required.

## Connect HamzaRamzan.online from Hostinger

1. In Netlify open **Domain management → Add a domain → Add a domain you
   already own** and enter `HamzaRamzan.online`.
2. If using **Netlify DNS**, copy the four nameservers Netlify displays.
3. In Hostinger open **Domains → Manage → DNS / Nameservers → Change
   nameservers**, choose custom nameservers, and paste all four Netlify values.
4. Back in Netlify, make `hamzaramzan.online` the primary domain and add
   `www.hamzaramzan.online` as an alias.
5. Wait for DNS verification and automatic HTTPS. Worldwide DNS propagation can
   take several hours, and occasionally up to 48 hours.

## Future publishing and credit control

Every commit to `main` starts a deployment. To reduce build-credit use, finish a
batch of edits and make one commit instead of committing after every small edit.
Netlify retains previous successful deployments so they can be restored.

## Manual ZIP deployment

Netlify's drag-and-drop uploader accepts the generated `out` folder, not this
source-code ZIP. For GitHub-connected publishing, upload the source files to
GitHub and let Netlify run `npm run build:netlify`.
