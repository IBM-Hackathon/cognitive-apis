[Hamburg](https://github.com/IBM-Hackathon/Hamburg2016/wiki) > [Howto](https://github.com/IBM-Hackathon/Hamburg2016/wiki/Howto) > [Cognitive APIs on IBM G-Cloud](https://github.com/IBM-Hackathon/cognitive-apis) > [use](https://github.com/IBM-Hackathon/cognitive-apis/blob/master/docs/howto.md) > Unmut

# Unmut API

Unmut is an IBM Watson based API which provides ad-hoc text analysis, known as Real-time NLP to recognize displeasure of customers in a natural written German text like E-Mails or letters from customers.

The following example shows a request to the API using cURL:

```bash
curl --request POST \
  --url https://api.eu.apiconnect.ibmcloud.com/g-cloud-dev/cognitive-apis/unmut/1.0.2/analysis/text \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header 'x-ibm-client-id: REPLACE_THIS_KEY' \
  --header 'x-ibm-client-secret: REPLACE_THIS_KEY' \
  --data '{"text":"Ich bin sehr unzufrieden mit der Situation!"}'
```

For examples in other languages see the [Developer Portal](https://cognitive-apis-g-cloud-dev.developer.eu.apiconnect.ibmcloud.com/node/119).

The following table describes the request parameters:

Parameter | Required | Description
--- | --- | ---
`body.text` | Yes | Text to be analyzed
`header.x-ibm-client-id` | Yes | Application's Client-Key
`header.x-ibm-client-secret` | Yes | Application's Client-Secret
`header.accept` | Yes | Expected output content type. Always `application/json`
`header.content-type` | Yes | Input content type. Always `application/json`

The response contains several facets:

```json
{  
   "metadata":{  
      "textfacets":[  
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

In those facets you find that the whole message has a medium displeasure (`sentiment/Klasse --> Mittlerer Unmut`) as well as that the displeasure is related to the contract (`unmut/vertragsanliegen --> Unmut`) and not to the quality of operations (`unmut/bearbeitungsqualitaet --> Kein-unmut`).

The API contains the following Unmut-related facets:

Facet path | Possible values | Related to
--- | --- | ---
`unmut/bearbeitungsqualitaet` | `Unmut`, `Kein-unmut` | Sentence
`unmut/bearbeitungszeit` | `Unmut`, `Kein-unmut` | Sentence
`unmut/inkasso` | `Unmut`, `Kein-unmut` | Sentence
`unmut/unmut` | `Unmut`, `Kein-unmut` | Document
`unmut/vertragsanliegen` | `Unmut`, `Kein-unmut` | Sentence
`sentiment/Klasse` | `Kein`, `Schwacher`, `Mittlerer`, `Starker`, `Unmut` | Document
`sentiment/numerisch` | `-1` - negative, `0` - neutral | Document
