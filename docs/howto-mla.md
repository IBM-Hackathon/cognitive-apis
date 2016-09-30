[Hamburg](https://github.com/IBM-Hackathon/Hamburg2016/wiki) > [Howto](https://github.com/IBM-Hackathon/Hamburg2016/wiki/Howto) > [Cognitive APIs on IBM G-Cloud](https://github.com/IBM-Hackathon/cognitive-apis) > [use](https://github.com/IBM-Hackathon/cognitive-apis/blob/master/docs/howto.md) > MLA

# Medical Linguistic Analysis (MLA) API

MLA is an IBM Watson based API which provides ad-hoc text analysis, known as Real-time NLP to recognize TOOOOODOOOOO.

The following example shows a request to the API using cURL:

```bash
curl --request POST \
    --url https://api.eu.apiconnect.ibmcloud.com/g-cloud-dev/cognitive-apis/mla/1.0.1/analysis/text \
    --header 'accept: application/json' \
    --header 'content-type: application/json' \
    --header 'x-ibm-client-id: REPLACE_THIS_KEY' \
    --header 'x-ibm-client-secret: REPLACE_THIS_KEY' \
    --data '{"text":"Ich muss sehr stark husten und habe Durchfall :()"}'
```

For examples in other languages see the [Developer Portal](https://cognitive-apis-g-cloud-dev.developer.eu.apiconnect.ibmcloud.com/node/120).

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
  "uri":"resturi",
  "content":"Ich muss sehr stark husten und habe Durchfall :()",
  "metadata":{
    "fields":[
      {
        "name":"date",
        "value":"1475013102000"
      },
      {
        "name":"icd10_hierarchy",
        "value":"11: Krankheiten des Verdauungssystems (K00-K93)&05: Nichtinfektiöse Enteritis und Kolitis (K50-K52)&K52.9: Nichtinfektiöse Gastroenteritis und Kolitis, nicht näher bezeichnet"
      },
      {
        "name":"icd_fulltext",
        "value":"Nichtinfektiöse Gastroenteritis und Kolitis, nicht näher bezeichnet"
      },
      {
        "name":"icd_codes",
        "value":"unknown"
      },
      {
        "name":"diagnosis",
        "value":"Durchfall"
      },
      {
        "name":"$source",
        "value":"api"
      },
      {
        "name":"$language",
        "value":"de"
      },
      {
        "name":"$charset",
        "value":"UTF-16"
      },
      {
        "name":"$doctype",
        "value":"text/plain"
      }
    ],
    "docfacets":[
      {
        "path":[
          "date",
          "2016",
          "9",
          "27",
          "21",
          "51"
        ],
        "keyword":""
      }
    ],
    "textfacets":[
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
          "_phrase",
          "pred_phrase",
          "noun_pred"
        ],
        "keyword":"Ich ... müssen",
        "begin":0,
        "end":8
      },
      {
        "path":[
          "_word",
          "verb"
        ],
        "keyword":"müssen",
        "begin":4,
        "end":8
      },
      {
        "path":[
          "_word",
          "adv"
        ],
        "keyword":"sehr",
        "begin":9,
        "end":13
      },
      {
        "path":[
          "_word",
          "adj"
        ],
        "keyword":"stark",
        "begin":14,
        "end":19
      },
      {
        "path":[
          "_word",
          "verb"
        ],
        "keyword":"husten",
        "begin":20,
        "end":26
      },
      {
        "path":[
          "_word",
          "conj"
        ],
        "keyword":"und",
        "begin":27,
        "end":30
      },
      {
        "path":[
          "_word",
          "verb"
        ],
        "keyword":"haben",
        "begin":31,
        "end":35
      },
      {
        "path":[
          "_phrase",
          "pred_phrase",
          "verb_noun"
        ],
        "keyword":"haben ... Durchfall",
        "begin":31,
        "end":45
      },
      {
        "path":[
          "_word",
          "noun",
          "general"
        ],
        "keyword":"Durchfall",
        "begin":36,
        "end":45
      }
    ]
  },
  "partition":0
}
```

`metadata.textfacets` contains phrases found in the text mapped to multiple facets, including MLA-specific facets:

TOOODOOOO
