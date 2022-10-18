# Administrating a Pioneer instance

> **Warning**
> Any environment variable prefixed with `REACT_APP_` set in the building environment will be **accessible by anyone** on Pioneer frontend.

## Deploying Pioneer

1.
   ### Configure the network Pioneer should connect to by default

   To do so define `REACT_APP_TESTNET_NODE_SOCKET`, `REACT_APP_TESTNET_QUERY_NODE`, `REACT_APP_TESTNET_QUERY_NODE_SOCKET`, and `REACT_APP_TESTNET_MEMBERSHIP_FAUCET_URL`.

   For example, for the Joystream testnet:

   ```shell
   REACT_APP_TESTNET_NODE_SOCKET=wss://rpc.joystream.org:9944
   REACT_APP_TESTNET_QUERY_NODE=https://query.joystream.org/graphql
   REACT_APP_TESTNET_QUERY_NODE_SOCKET=wss://query.joystream.org/graphql
   REACT_APP_TESTNET_MEMBERSHIP_FAUCET_URL=https://18.234.141.38.nip.io/member-faucet/register
   ```

2.
   ### Run the deployment script

   ```shell
   yarn run build
   ```
   Will build Pioneer inside the `packages/ui/build` folder.

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

> **Note**
> If both method 1 and 2 are used, both blacklists are merged together.

If needed `IMAGE_SAFETY_BLACKLIST_HEADERS` can define the headers (`\n` separated) passed to the request made to `IMAGE_SAFETY_BLACKLIST_URL`. e.g:
```shell
IMAGE_SAFETY_BLACKLIST_HEADERS="Authorization: Bearer API_KEY"
```

#### Example: Airtable api

Given an api key `keyXYZ`, a base `appXYZ`, and a table `tableXYZ` with the following structure:
| image | page | blacklisted |
| --- | --- | --- |
| https://example.com/x.png | https://dao.joystream.org/#/forum/thread/1 | [X] |
| https://example.com/y.png | https://dao.joystream.org/#/forum/thread/1 | [ ] |
| https://example.com/z.png | https://dao.joystream.org/#/forum/thread/2 | [X] |

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

> **Warning**
> Unlike fetching the blacklist which happens on the build step, this happens on the front-end. Therefore (just as with any environment variable prefixed with `REACT_APP_`) any sensitive information set in `REACT_APP_IMAGE_REPORT_API_URL` or `REACT_APP_IMAGE_SAFETY_REPORT_HEADERS` will be **accessible by anyone**.

> **Warning**
> No CAPTCHA nor any other way to securely prevent some users from spamming the third party API is currently supported.

#### Example: Airtable api
Given an api key `keyXYZ` (with write access to the table), a base `appXYZ`, and a table `tableXYZ` with the following structure:
| src | page |
| --- | --- |
| https://example.com/x.png | https://dao.joystream.org/#/forum/thread/1 |

This configuration:

```shell
REACT_APP_IMAGE_REPORT_API_URL="https://api.airtable.com/v0/appXYZ/tableXYZ?api_key=keyXYZ"
REACT_APP_IMAGE_SAFETY_REPORT_BODY_TEMPLATE={"records":[{"fields":{"src":"{image}","page":"{context}"}}]}
```

Will allow users to report image urls and the page they were reported from, into the `tableXYZ`.

> **Warning**
> Because this is making `tableXYZ` public by making `keyXYZ` accessible to anyone. The actually blacklisted url, should probably be stored somewhere else (where `tableXYZ` cannot write). Otherwise this would allow anyone to blacklist any image.
