# How to use Cognitive APIs

Cognitive APIs are RESTful APIs with `application/json` input and output payload. All API calls must be authenticated and authorized using a Client-Key and -Secret, see [Getting started with Cognitive APIs](./getting-started.md) for details.

## Unmut API

Unmut is an IBM Watson based API which provides ad-hoc text analysis, known as Real-time NLP to recognize displeasure of customers in a natural written German text like E-Mails or letters from customers.

The following example shows a request to the API:

```bash
curl --request POST \
  --url https://api.eu.apiconnect.ibmcloud.com/g-cloud-dev/cognitive-apis/unmut/analysis/text \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header 'x-ibm-client-id: REPLACE_THIS_KEY' \
  --header 'x-ibm-client-secret: REPLACE_THIS_KEY' \
  --data '{"text":"Ich bin sehr unzufrieden mit der Situation!"}'
```

The following table describes the request parameters:

Parameter | Required | Description
--- | --- | ---
`body.text` | Yes | Text to be analyzed
`header.x-ibm-client-id` | Yes | Application's Client-Key
`header.x-ibm-client-secret` | Yes | Application's Client-Secret
`header.accept` | Yes | Expected output content type. Always `application/json`
`header.content-type` | Yes | Input content type. Always `application/json`

The response to the request above looks like this:

```json
{  
   "content":"Ich bin sehr unzufrieden mit der Situation!",
   "metadata":{  
      "textfacets":[  
         {  
            "path":[  
               "_dolce",
               "noun",
               "negative"
            ],
            "keyword":"Ich",
            "begin":0,
            "end":3
         },
         {  
            "path":[  
               "_word",
               "noun",
               "general"
            ],
            "keyword":"Ich",
            "begin":0,
            "end":3
         },
         {  
            "path":[  
               "opinionphrase2"
            ],
            "keyword":"-0,471",
            "begin":0,
            "end":24
         },
         {  
            "path":[  
               "sentiment",
               "OpinionPhrase"
            ],
            "keyword":"-0,471",
            "begin":0,
            "end":24
         },
         {  
            "path":[  
               "unmut",
               "bearbeitungsqualitaet"
            ],
            "keyword":"Kein-unmut",
            "begin":0,
            "end":43
         },
         {  
            "path":[  
               "unmut",
               "inkasso"
            ],
            "keyword":"Kein-unmut",
            "begin":0,
            "end":43
         },
         {  
            "path":[  
               "sentiment",
               "Numerisch"
            ],
            "keyword":"-0,471",
            "begin":0,
            "end":43
         },
         {  
            "path":[  
               "unmut",
               "vertragsanliegen"
            ],
            "keyword":"Unmut",
            "begin":0,
            "end":43
         },
         {  
            "path":[  
               "unmut",
               "bearbeitungszeit"
            ],
            "keyword":"Kein-unmut",
            "begin":0,
            "end":43
         },
         {  
            "path":[  
               "unmut",
               "unmut"
            ],
            "keyword":"Unmut",
            "begin":0,
            "end":43
         },
         {  
            "path":[  
               "sentiment",
               "Klasse"
            ],
            "keyword":"Mittlerer Unmut",
            "begin":0,
            "end":43
         },
         {  
            "path":[  
               "_word",
               "verb"
            ],
            "keyword":"sein",
            "begin":4,
            "end":7
         },
         {  
            "path":[  
               "_word",
               "adv"
            ],
            "keyword":"sehr",
            "begin":8,
            "end":12
         },
         {  
            "path":[  
               "_word",
               "adj"
            ],
            "keyword":"unzufrieden",
            "begin":13,
            "end":24
         },
         {  
            "path":[  
               "_phrase",
               "noun_phrase",
               "adp_noun"
            ],
            "keyword":"mit ... Situation",
            "begin":25,
            "end":42
         },
         {  
            "path":[  
               "_word",
               "noun",
               "general"
            ],
            "keyword":"Situation",
            "begin":33,
            "end":42
         },
         {  
            "path":[  
               "$view"
            ],
            "keyword":"_negative",
            "begin":0,
            "end":43
         },
         {  
            "path":[  
               "$view"
            ],
            "keyword":"_negative",
            "begin":0,
            "end":43
         },
         {  
            "path":[  
               "$view"
            ],
            "keyword":"_negative",
            "begin":0,
            "end":43
         }
      ]
   },
   "partition":0
}
```

`metadata.textfacets` contains phrases found in the text against multiple facets, including Unmut-specific facets:

```json
[
  {
    "path":[
      "sentiment",
      "Klasse"
    ],
    "keyword":"Mittlerer Unmut",
    "begin":0,
    "end":43
  },
  {
    "path":[
      "unmut",
      "bearbeitungsqualitaet"
    ],
    "keyword":"Kein-unmut",
    "begin":0,
    "end":43
  },
  {
    "path":[
      "unmut",
      "inkasso"
    ],
    "keyword":"Kein-unmut",
    "begin":0,
    "end":43
  },
  {
    "path":[
      "unmut",
      "vertragsanliegen"
    ],
    "keyword":"Unmut",
    "begin":0,
    "end":43
  },
  {
    "path":[
      "unmut",
      "bearbeitungszeit"
    ],
    "keyword":"Kein-unmut",
    "begin":0,
    "end":43
  }
]
```

In those facets you find that the whole message has a medium displeasure (`sentiment/Klasse --> Mittlerer Unmut`) as well as that the displeasure is related to the contract (`unmut/vertragsanliegen --> Unmut`) and not to the quality of operations (`unmut/bearneitungsqualitaet --> Kein-unmut`).

The API contains the following Unmut-related facets:

**TDODOOOO**

## MLA API

**TODOOOOO**