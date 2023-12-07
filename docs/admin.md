# Administrating a Pioneer instance

> [!CAUTION]
> Any environment variable prefixed with `REACT_APP_` set in the building environment will be **accessible by anyone** on Pioneer front-end.

## Deploying Pioneer front-end

### Quick start (Vercel)

To deploy Pioneer on Vercel click on the button bellow:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJoystream%2Fpioneer&env=REACT_APP_MAINNET_NODE_SOCKET,REACT_APP_MAINNET_QUERY_NODE,REACT_APP_MAINNET_QUERY_NODE_SOCKET&envDescription=More%20information%20at%3A&envLink=https%3A%2F%2Fgithub.com%2FJoystream%2Fpioneer%2Fblob%2Fdev%2Fdocs%2Fadmin.md&project-name=pioneer&repository-name=pioneer)

1.
   ### Configure the network Pioneer should connect to by default

   To do so define `REACT_APP_MAINNET_NODE_SOCKET`, `REACT_APP_MAINNET_QUERY_NODE`, `REACT_APP_MAINNET_QUERY_NODE_SOCKET`, and `REACT_APP_MAINNET_MEMBERSHIP_FAUCET_URL`.

   For example, for the Joystream mainnet:

   ```shell
   REACT_APP_MAINNET_NODE_SOCKET=wss://rpc.joystream.org:9944
   REACT_APP_MAINNET_QUERY_NODE=https://query.joystream.org/graphql
   REACT_APP_MAINNET_QUERY_NODE_SOCKET=wss://query.joystream.org/graphql
   ```

  Additionally a membership faucet, [a notification back-end](deploying-the-pioneer-notification-back-end), or an Avatar upload service can be configured with e.g:

   ```shell
   REACT_APP_MAINNET_MEMBERSHIP_FAUCET_URL=https://faucet.joystream.org/member-faucet/register`
   REACT_APP_MAINNET_BACKEND=https://api-7zai.onrender.com`
   REACT_APP_AVATAR_UPLOAD_URL=https://atlas-services.joystream.org/avatars
   ```

   > [!IMPORTANT]
   > `faucet.joystream.org` requires a specific [hCaptcha](https://www.hcaptcha.com/) key to be set in: `REACT_APP_CAPTCHA_SITE_KEY`.

2.
   ### Run the deployment script

   ```shell
   yarn run build
   ```
   Will build Pioneer inside the `packages/ui/build` folder.

## Deploying the Pioneer notification back-end

### Prerequisites

#### Configure the Pioneer back-end

- `QUERY_NODE_ENDPOINT=https://<value>`: Query node to fetch from (in most cases this should be: `https://query.joystream.org/graphql`).
- `PIONEER_URL=https://<value>`: The URL of the your Pioneer web application.
- `STARTING_BLOCK=<value>`: The block to start fetching the events from (in most cases this should be the current block).
- `EMAIL_SENDER=<value>`: The address to send e-mail with.

Replace the `<value>` by the actual values and save the configuration in a file.

#### Set up an e-mail provider

To both register users and notify them an email provider needs to be set up. At the moment only SendGrid and Mailgun are supported but custom SMTP configuration is coming soon.

To set up SendGrid:
1. Sign up for a SendGrid account.
2. Verify your Sender e-mail address Identity.
3. Create your SendGrid API key with full access "Mail Send" permissions.
4. Add this API key to the file mentioned earlier this value is called `SENDGRID_API_KEY=<value>`

To set up Mailgun:
1. Sign up for a Mailgun account.
2. Add and verify your domain.
3. Get your Mailgun private API key from your dashboard.
4. Add this API key to the file mentioned earlier this value is called `MAILGUN_API_KEY=<value>`
5. Also add `MAILGUN_DOMAIN=<value>` to the file and if this is an EU domain `MAILGUN_API_URL=https://api.eu.mailgun.net` should be added too.

### Quick start (Render)

To deploy on Render click on the button bellow:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Joystream/pioneer/tree/dev)

> [!WARNING]
> Only Sendgrid is currently supported with the Render deployment.

### Private server deployment

1.
   #### Install docker
   The following deployment instructions are relying on the [`joystream/pioneer-backend`](https://hub.docker.com/r/joystream/pioneer-backend) docker image.
   Therefore [Docker](https://docs.docker.com) is a requirement.

2.
   #### Host a PostgreSQL database
   Store the database URL in the file mentioned above. It should look like this:
   ```
   DATABASE_URL=postgresql://{username}:{password}@{host}:5432/{database name}
   ```

3.
   #### Upload the configuration file on the server
   At this point it should have a all the following configuration.
   ```shell
   DATABASE_URL=postgresql://{username}:{password}@{host}:5432/{database name}
   QUERY_NODE_ENDPOINT=https://<value>
   PIONEER_URL=https://<value>
   STARTING_BLOCK=<value>
   EMAIL_SENDER=<value>
   ```

   In addition it should also have your e-mail provider configuration with either `SENDGRID_API_KEY`, or `MAILGUN_API_KEY`, `MAILGUN_DOMAIN` and maybe `MAILGUN_API_URL=https://api.eu.mailgun.net`

   Finally `APP_SECRET_KEY=<secret value>` should be added to the configuration. It's best to pick this value at random and not to store it anywhere else.

4.
   #### Serve the backend API
   E.g on a private server with the environment variable - mentioned above - set in a file at the path: `/path/to/.env`, the API can be run with:
   ```
   docker run -d -p 80:80 --restart=always --name=api --env-file=/path/to/.env joystream/pioneer-backend
   ```

5.
   #### Run the notify script at regular intervals
   E.g still on a private server the notify script can be run every 10 minutes by setting the following line in the crontab:
   ```
   */10 * * * * docker run --name=notify --env-file=/path/to/.env joystream/pioneer-backend notify
   ```

## Under maintenance screen

A "maintenance screen" can temporarily replace the app, in order to occasionally prevent users from using Pioneer (like during sensitive runtime uprade for example).

To activate it: simply set the environment variable `REACT_APP_IS_UNDER_MAINTENANCE=true`, then rebuild Pioneer.

To deactivate it: set the environment variable `REACT_APP_IS_UNDER_MAINTENANCE=false` (or completely remove this variable), finally rebuild Pioneer.

## Moderate images

Undesirable images can be moderated in the following ways:

### Blacklist method 1: Set an environment variable

The most straight forward way is to simply define `REACT_APP_BLACKLISTED_IMAGES` with whitespace (e.g " ", "\n", "\t", ...) separated image urls.

```shell
REACT_APP_BLACKLISTED_IMAGES="https://example.com/x.png https://example.com/y.png"
```

Pioneer instances build with this configuration will not display: `https://example.com/x.png` nor `https://example.com/y.png`.


### Blacklist method 2: Fetch from a url

However even with a small amount of images this method becomes tedious.
A longer term solution is to fetch a blacklist from a url. This url can be defined in `IMAGE_SAFETY_BLACKLIST_URL`. The supported response types are:

1.
   #### Plain text one image url per line. e.g:
   ```
   https://example.com/x.png
   https://example.com/y.png
   ```
2.
   #### Any JSON response. e.g:
   ```json
   {
      "results": [
         { "id": "0", "value": "https://example.com/x.png" },
         { "id": "1", "value": "https://example.com/y.png" },
      ]
   }
   ```
   In this case `IMAGE_SAFETY_BLACKLIST_JSON_PATH` will have to be define in order to target the property to extract. In this example:
   ```shell
   IMAGE_SAFETY_BLACKLIST_JSON_PATH=value
   ```
   For JSON responses with particularly complex structures, a [JSONPath](https://github.com/dchester/jsonpath#jsonpath-syntax) can be set in `IMAGE_SAFETY_BLACKLIST_JSON_PATH`.

> [!NOTE]
> If both method 1 and 2 are used, both blacklists are merged together.

If needed `IMAGE_SAFETY_BLACKLIST_HEADERS` can define the headers (`\n` separated) passed to the request made to `IMAGE_SAFETY_BLACKLIST_URL`. e.g:
```shell
IMAGE_SAFETY_BLACKLIST_HEADERS="Authorization: Bearer API_KEY"
```

#### Example: Airtable api

Given an api key `keyXYZ`, a base `appXYZ`, and a table `tableXYZ` with the following structure:
| image | page | blacklisted |
| --- | --- | --- |
| https://example.com/x.png | https://pioneerapp.xyz/#/forum/thread/1 | [X] |
| https://example.com/y.png | https://pioneerapp.xyz/#/forum/thread/1 | [ ] |
| https://example.com/z.png | https://pioneerapp.xyz/#/forum/thread/2 | [X] |

This configuration:

```shell
IMAGE_SAFETY_BLACKLIST_JSON_PATH=image
IMAGE_SAFETY_BLACKLIST_URL="https://api.airtable.com/v0/appXYZ/tableXYZ?api_key=keyXYZ&filterByFormula={blacklisted}"
```

will result in blacklisting `https://example.com/x.png` and `https://example.com/z.png` on future builds.

## Help Pioneer users to report images

Pioneer supports an image reporting user interface, which can be enable in two ways:

### Report method 1: hyperlink (Recommended)

This is the easiest and safer method. Just define a url in `REACT_APP_IMAGE_REPORT_FORM_URL`. Users will follow it to report images on an external service (form, instant messaging, email, etc...).

Importantly the reported image url and the page it was reported on can be set in the url. e.g:

1.
   #### Email link
   ```shell
   REACT_APP_IMAGE_REPORT_FORM_URL="mailto:you@example.com?subject=Report image&body=Reported: {image}\nFound at: {context}"
   ```
2.
   #### Airtable

   Given the Airtable form id: `formXYZ`:
   ```shell
   REACT_APP_IMAGE_REPORT_FORM_URL="https://airtable.com/formXYZ?prefill_image={image}&prefill_page={context}&hide_image=true&hide_page=true"
   ```
   [More information on Airtable prefilled forms](https://support.airtable.com/docs/prefilling-a-form)

In both example above `{image}` and `{context}` will be substituted with the actual url of the reported image and the page it was reported on.

### Report method 2: post to an api endpoint

However to avoid taking users out of Pioneer. A url where to POST a image urls to report, can be set in `REACT_APP_IMAGE_REPORT_API_URL`. In most cases the structure of the body of the request should also be defined in `REACT_APP_IMAGE_SAFETY_REPORT_BODY_TEMPLATE`. Otherwise the image url will be post.

Similarly to the blacklist api, a `REACT_APP_IMAGE_SAFETY_REPORT_HEADERS` can define the headers (`\n` separated) passed to the request made to `REACT_APP_IMAGE_REPORT_API_URL`. e.g:
```shell
REACT_APP_IMAGE_SAFETY_REPORT_HEADERS="Authorization Bearer API_KEY\nContent-Type:application/json"
```

> [!WARNING]
> Unlike fetching the blacklist which happens on the build step, this happens on the front-end. Therefore (just as with any environment variable prefixed with `REACT_APP_`) any sensitive information set in `REACT_APP_IMAGE_REPORT_API_URL` or `REACT_APP_IMAGE_SAFETY_REPORT_HEADERS` will be **accessible by anyone**.

> [!CAUTION]
> No CAPTCHA nor any other way to securely prevent some users from spamming the third party API is currently supported.

#### Example: Airtable api
Given an api key `keyXYZ` (with write access to the table), a base `appXYZ`, and a table `tableXYZ` with the following structure:
| src | page |
| --- | --- |
| https://example.com/x.png | https://pioneerapp.xyz/#/forum/thread/1 |

This configuration:

```shell
REACT_APP_IMAGE_REPORT_API_URL="https://api.airtable.com/v0/appXYZ/tableXYZ?api_key=keyXYZ"
REACT_APP_IMAGE_SAFETY_REPORT_BODY_TEMPLATE={"records":[{"fields":{"src":"{image}","page":"{context}"}}]}
```

Will allow users to report image urls and the page they were reported from, into the `tableXYZ`.

> [!CAUTION]
> Because this is making `tableXYZ` public by making `keyXYZ` accessible to anyone. The actually blacklisted url, should probably be stored somewhere else (where `tableXYZ` cannot write). Otherwise this would allow anyone to blacklist any image.
