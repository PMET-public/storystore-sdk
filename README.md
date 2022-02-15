<img src="storystore-sdk.png" width="100" height="100" />

## v1

### ✅ Pre-requisites

The following tools should be installed locally:

- Node 12 or above https://nodejs.org/
- Yarn `sudo npm install -g yarn`
- [AEM SDK](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/graphql/multi-step/setup.html?lang=en#aem-sdk) running locally (localhost:4502)
  - [Sample Data and GraphQL Endpoint](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/graphql/multi-step/setup.html?lang=en#wknd-site-content-endpoints)
  - [CORS Configuration](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/graphql/multi-step/setup.html?lang=en#cors-config)

### 📜 Instructions

☝️ Install dependencies:

`yarn install`

✌️ Run PWA

`yarn pwa`

The experience will be available at:

- **WKND Adventures (Your Demo Web App)**: http://localhost:6007

You can view and edit source code in the PWA `./packages/pwa`

---

✨ Run StoryStore SDK:

`yarn sdk`

The experience will be available at:

- **WKND Adventures (Your Demo Web App)**: http://localhost:6007
- **UIKit (Development Canvas)**: http://localhost:6006

You can view and edit source code in the UIKit `./packages/ui-kit/src`

📦 Package PWA

`yarn pkg`

### 🔨 Other tools

- Apollo Clien Devtools ([Chrome](https://chrome.google.com/webstore/detail/apollo-client-devtools/jdkknkkbebbapilgoeccciglkfbmbnfm?utm_source=chrome-ntp-icon) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/))
