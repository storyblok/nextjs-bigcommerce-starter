[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcommerce&project-name=commerce&repo-name=commerce&demo-title=Next.js%20Commerce&demo-description=An%20all-in-one%20starter%20kit%20for%20high-performance%20e-commerce%20sites.&demo-url=https%3A%2F%2Fdemo.vercel.store&demo-image=https%3A%2F%2Fbigcommerce-demo-asset-ksvtgfvnd.vercel.app%2Fbigcommerce.png&integration-ids=oac_MuWZiE4jtmQ2ejZQaQ7ncuDT)

<a href="https://app.storyblok.com/#!/build/97866">
<img src="https://a.storyblok.com/f/88751/x/6337050f76/template-button.svg" data-canonical-src="https://a.storyblok.com/f/88751/x/6337050f76/template-button.svg" width="140"/>
</a>

# Storyblok & Next.js Commerce

<p align="center">
Demo: <a href="https://nextjs-bigcommerce-starter.vercel.app/">nextjs-bigcommerce-starter.vercel.app</a>
</p>
<p align="center">
Full Tutorial: <a href="https://www.storyblok.com/tp/storefront-next-bigcommerce">storyblok.com/tp/storefront-next-bigcommerce</a>
</p>

The all-in-one starter kit for high-performance eCommerce sites. Start right now at [nextjs.org/commerce](https://nextjs.org/commerce)


## Features

- Performant by default
- SEO Ready
- Internationalization
- Responsive
- UI Components
- Theming
- Standardized Data Hooks
- Integrations - Integrate seamlessly with the most common ecommerce platforms.
- Dark Mode Support




## Goals

* **Next.js Commerce** should have a completely data **agnostic** UI
* **Aware of schema**: should ship with the right data schemas and types.
* All providers should return the right data types and schemas to blend correctly with Next.js Commerce.
* `@framework` will be the alias utilized in commerce and it will map to the ecommerce provider of preference- e.g BigCommerce, Shopify, Swell. All providers should expose the same standardized functions. _Note that the same applies for recipes using a CMS + an ecommerce provider._

There is a `framework` folder in the root folder that will contain multiple ecommerce providers.

Additionally, we need to ensure feature parity (not all providers have e.g. wishlist) we will also have to build a feature API to disable/enable features in the UI.

People actively working on this project: @okbel & @lfades.

## Troubleshoot

<details>
<summary>I already own a BigCommerce store. What should I do?</summary>
<br>
First thing you do is: <b>set your environment variables</b>
<br>
<br>
.env.local

```sh
BIGCOMMERCE_STOREFRONT_API_URL=<>
BIGCOMMERCE_STOREFRONT_API_TOKEN=<>
BIGCOMMERCE_STORE_API_URL=<>
BIGCOMMERCE_STORE_API_TOKEN=<>
BIGCOMMERCE_STORE_API_CLIENT_ID=<>
STORYBLOK_TOKEN=<>
```

If your project was started with a "Deploy with Vercel" button, you can use Vercel's CLI to retrieve these credentials.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and Github accounts (creates .vercel file): `vercel link`
3. Download your environment variables: `vercel env pull .env.local`

Next, you're free to customize the starter. More updates coming soon. Stay tuned.

</details>

<details>
<summary>BigCommerce shows a Coming Soon page and requests a Preview Code</summary>
<br>
After Email confirmation, Checkout should be manually enabled through BigCommerce platform. Look for "Review & test your store" section through BigCommerce's dashboard.
<br>
<br>
BigCommerce team has been notified and they plan to add more detailed about this subject.
</details>



