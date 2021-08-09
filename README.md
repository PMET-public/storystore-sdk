<img src="storystore-sdk.png" width="100" height="100" />

# ⚠️ Beta v0.1.0 ⚠️

<a name="aem-sdk"></a>
## AEM SDK

👉 If you have AEM SDK already installed and running in localhost:4502 [you may skip to StoryStore SDK](#storystore-sdk).

### Pre-requisites

The following tools should be installed locally:

- [JDK 11](https://experience.adobe.com/#/downloads/content/software-distribution/en/general.html?1_group.propertyvalues.property=./jcr:content/metadata/dc:softwareType&1_group.propertyvalues.operation=equals&1_group.propertyvalues.0_values=software-type:tooling&fulltext=Oracle~+JDK~+11~&orderby=@jcr:content/jcr:lastModified&orderby.sort=desc&layout=list&p.offset=0&p.limit=14)

### Instructions

__1.__ Navigate to the [Software Distribution Portal](https://experience.adobe.com/#/downloads/content/software-distribution/en/aemcloud.html) > __AEM as a Cloud Service__ and download the latest version of the AEM SDK.

<img src="https://experienceleague.adobe.com/docs/experience-manager-learn/assets/software-distribution-portal-download.png?lang=en" />

_⚠️ The GraphQL feature is enabled by default only on the AEM SDK from 2021-02-04 or newer._

__2.__ Unzip the download and copy the Quickstart jar (aem-sdk-quickstart-XXX.jar) to a dedicated folder, i.e ~/aem-sdk/author.

__3.__ Re-name the jar file to `aem-author-p4502.jar`. The `author` name specifies that the Quickstart jar will start in Author mode. The `p4502` specifies that the Quickstart server will run on port 4502.

__4.__ Open a new terminal window and navigate to the folder that contains the jar file. Run the following command to install and start the AEM instance:

`cd ~/aem-sdk/author`

`java -jar aem-author-p4502.jar`

__5.__ Provide an admin password as `admin` to avoid any further re-configuration.

__6.__ After a few minutes, the AEM instance will finish installing, and a new browser window should open at http://localhost:4502.

__7.__ Login with the username `admin` and password `admin`.

---

<a name="storystore-sdk"></a>

## StoryStore SDK

### Pre-requisites

The following tools should be installed locally:

- AEM SDK must be running ([instructions above](#aem-sdk))
- Node 12 or above https://nodejs.org/
- Yarn https://yarnpkg.com/getting-started/install

### Instructions

__1.__ Open a new terminal window and run the following command to clone the StoryStore SDK

`git clone https://github.com/PMET-public/storystore-sdk.git`

`cd storystore-sdk`

__2.__  Install dependencies:

`yarn install`

__3.__ ✨ Run SDK:

`yarn wknd:sdk`

__4.__ The experience will be available at:
  - **WKND Adventures (PWA)**: http://localhost:3000
  - **UIKit (Develoment Canvas)**: http://localhost:6006
