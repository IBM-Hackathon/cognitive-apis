[Hamburg](https://github.com/IBM-Hackathon/Hamburg2016/wiki) > [Howto](https://github.com/IBM-Hackathon/Hamburg2016/wiki/Howto) > Cognitive APIs on IBM G-Cloud

# IBM G-Cloud Cognitive APIs

![Logo](./docs/images/G-Cloud_label_250.png)

This repository contains examples and how-to guides for the following Cognitive APIs available on the IBM German Cognitive Industry Cloud (G-Cloud):

* **Unmut** recognize displeasure of customers in a natural written German text like E-Mails or letters from customers

* **MLA** recognizes medical symptoms and disorders from natural written German texts

To use the Cognitive APIs you need to register your application and subscribe to Plan. To get started read the following:

* [Getting started with Cognitive APIs](./docs/getting-started.md)
* [How to use Cognitive APIs](./docs/howto.md)

## Sample Application

The [sample application (app.js)](./app.js) shows you how to do requests against the APIs.

To run the sample application you need to provide a valid Client-Key and -Secret (see [Getting started with Cognitive APIs](./docs/getting-started.md) to obtain them). If you have them, execute the following commands:

```bash
git clone https://github.com/IBM-Hackathon/cognitive-apis.git
cd cognitive-apis/

npm install
npm start -- [CLIENT_KEY] [CLIENT_SECRET]
```

The return values of the APIs are explained in the [docs/](./docs/howto.md).
