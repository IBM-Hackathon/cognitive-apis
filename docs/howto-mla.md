[Hamburg](https://github.com/IBM-Hackathon/Hamburg2016/wiki) > [Howto](https://github.com/IBM-Hackathon/Hamburg2016/wiki/Howto) > [Cognitive APIs on IBM G-Cloud](https://github.com/IBM-Hackathon/cognitive-apis) > [use](./howto.md) > MLA

# Medical Linguistic Analysis (MLA) API

MLA is an IBM Watson based API which provides ad-hoc text analysis, known as Real-time NLP to extract medical concepts (e.g. diagnoses, symptoms, ...) from texts (e.g. medical reports, discharge letters, ...) in naturally written German language.

Based on its various underlying linguistic models it provides 3 different features:
* Diagnosis
* Symptom
* Medication

## Diagnosis

The Diagnosis feature is able to detect medical diagnoses in free text and enrich the detected concept with an ICD-10 code. Furthermore, this feature is able to recognize the status of a diagnosis (positive, negative, suspected or status post) based on common wording. Negative diagnoses are indicated by phrases of negation (e.g. "keine Gastritis", "kein Anhalt für Gastritis" etc.). Suspected diagnoses are diagnoses which have not been verified yet (e.g. "Verdacht auf Gastritis"). Status Post Diagnoses are diagnoses that were made in the past but are usually still relevant pieces of information in a person's medical history.

The detection and mapping of diagnoses to ICD-10 codes provides a foundation for various areas of application e.g. billing/DRG, mapping to other languages, patient summaries or analytical and statistical analyses. Further information about the ICD-10 classification can be found at:  http://www.who.int/classifications/icd/en/

The following example shows a request to the API using cURL:

```bash
curl --request POST \
  --url https://api.eu.apiconnect.ibmcloud.com/g-cloud-dev/cognitive-apis/mla/1.0.2/diagnosis \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header 'x-ibm-client-id: REPLACE_THIS_KEY' \
  --header 'x-ibm-client-secret: REPLACE_THIS_KEY' \
  --data '{"text":"Bei Max Mustermann wurde ein Fortschreiten der hepatalen Metastasierung bei st.p. Sigmakarzinom (ED: 2002) diagnositiziert. Es liegt ein V.a. pulmonale Absiedelungen vor. Es gibt keinen Anhalt für renale Secundaria."}'
```

For examples in other languages see the [Developer Portal](https://cognitive-apis-g-cloud-dev.developer.eu.apiconnect.ibmcloud.com/node/131).

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
  "metadata": {
    "textfacets": [
      {
        "path": [
          "positivediagnosis"
        ],
        "keyword": "hepatalen Metastasierung#ICD10:C78.7",
        "begin": 47,
        "end": 71
      },
      {
        "path": [
          "statuspostdiagnosis"
        ],
        "keyword": "st.p. Sigmakarzinom#ICD10:C18.7",
        "begin": 76,
        "end": 95
      },
      {
        "path": [
          "suspecteddiagnosis"
        ],
        "keyword": "V.a. pulmonale Absiedelungen#ICD10:C78.0",
        "begin": 137,
        "end": 165
      },
      {
        "path": [
          "negativediagnosis"
        ],
        "keyword": "keinen Anhalt für renale Secundaria#ICD10:C79.0",
        "begin": 179,
        "end": 214
      }
    ]
  }
}
```

`metadata.textfacets` contains terms (including their mapped codes) found in the text mapped to various facets related to diagnosis.

This feature provides the following facets related to diagnosis:

* `diagnosis/negative`
* `diagnosis/positive`
* `diagnosis/statuspost`
* `diagnosis/suspected`

Each of these facets has a value of the following syntax: `text` # \[ `code` \] \[ | `code` \]

* `text` contains the medical term (a.k.a. covered text) as appeared within the analyzed text
* `code` the mapped code (if present); multiple codes are separated by a vertical bar `|`; each code is prefixed with its corresponding type

## Symptom

The Symptom feature is able to detect medical symptoms in free text and enrich the detected concept with MedDRA and (if available) ICD-10 codes of the R group. Moreover, the status of the symptom (positive or negative) is recognized based on common phrases. Negative symptoms are indicated by phrases of negation (e.g. "keine Schmerzen", "Schmerzen wurden verneint" etc.). Positive symptoms are symptoms without an indication for negation.

The detection and mapping of symptoms to MedDRA codes provides a foundation for various areas of application e.g. automatically assessing a person's medical status, deriving possible differential diagnoses, patient summaries or statistical analyzes. Further information about MedDRA can be found at:  http://www.meddra.org/basics

The following example shows a request to the API using cURL:

```bash
curl --request POST \
  --url https://api.eu.apiconnect.ibmcloud.com/g-cloud-dev/cognitive-apis/mla/1.0.2/symptom \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header 'x-ibm-client-id: REPLACE_THIS_KEY' \
  --header 'x-ibm-client-secret: REPLACE_THIS_KEY' \
  --data '{"text":"Patientin Musterfrau berichtet über wiederholtes Erbrechen, Schmerzen im Unterbauch; Blutungen werden verneint."}'
```

For examples in other languages see the [Developer Portal](https://cognitive-apis-g-cloud-dev.developer.eu.apiconnect.ibmcloud.com/node/131).

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
  "metadata":{  
    "textfacets":[  
      {  
        "path":[  
          "symptom",
          "negative"
        ],
        "keyword":"Blutungen werden verneint#MedDRA:10017381|MedDRA:10055798|MedDRA:10019524|MedDRA:10005103|ICD10R:R58",
        "begin":-1,
        "end":-1
      },
      {  
        "path":[  
          "symptom",
          "positive"
        ],
        "keyword":"Schmerzen im Unterbauch#ICD10R:R10.3|MedDRA:10000084|MedDRA:10024940",
        "begin":-1,
        "end":-1
      },
      {  
        "path":[  
          "symptom",
          "positive"
        ],
        "keyword":"wiederholtes Erbrechen#MedDRA:10047700|ICD10R:R11|MedDRA:10014542",
        "begin":-1,
        "end":-1
      }
    ]
  }
}
```

`metadata.textfacets` contains terms (including their mapped codes) found in the text mapped to various facets related to symptoms.

The feature provides the following facets related to symptom:

* `symptom/negative`
* `symptom/positive`

Each of these facets has a value of the following syntax: `text` # \[ `code` \] \[ | `code` \]

* `text` contains the medical term (a.k.a. covered text) as appeared within the analyzed text
* `code` the mapped code (if present); multiple codes are separated by a vertical bar `|`; each code is prefixed with its corresponding type

## Medication

The Medication feature is able to detect drugs and/or active agents based on the ATC classification in free text. Moreover, this feature maps the detected drug or agent to its respective ATC code. The code can further be used for standardization purposes and provides a strong foundation for understanding a person's current medication. Further information about the ATC Classification can be found at: http://www.whocc.no/atc/structure_and_principles/

The following example shows a request to the API using cURL:

```bash
curl --request POST \
  --url https://api.eu.apiconnect.ibmcloud.com/g-cloud-dev/cognitive-apis/mla/1.0.2/medication \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header 'x-ibm-client-id: REPLACE_THIS_KEY' \
  --header 'x-ibm-client-secret: REPLACE_THIS_KEY' \
  --data '{"text":"Die Patientin Musterfrau wurde mit 80mg ASS und 20mg Nexium behandelt. Die Verträglichkeit der medikamentösen Therapie mit Acetylsalicylsäure war gut."}'
```

For examples in other languages see the [Developer Portal](https://cognitive-apis-g-cloud-dev.developer.eu.apiconnect.ibmcloud.com/node/131).

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
  "metadata":{
    "textfacets":[
      {
        "path":[
          "medication",
          "agent"
        ],
        "keyword":"Acetylsalicylsäure#N02BA01",
        "begin":-1,
        "end":-1
      },
      {
        "path":[
          "medication",
          "drug"
        ],
        "keyword":"Nexium#Esomeprazol#A02BC05",
        "begin":-1,
        "end":-1
      },
      {
        "path":[
          "medication",
          "drug"
        ],
        "keyword":"ASS#Acetylsalicylsäure#B01AC06",
        "begin":-1,
        "end":-1
      }
    ]
  },
  "partition":0
}
```

`metadata.textfacets` contains terms (including their mapped codes) found in the text mapped to various facets related to medication. The feature contains the following facets related to medication:

* `medication/agent`
* `medication/drug`

The facet `medication/agent` has a value of the following syntax: \[ `agent` \] # \[ `code` \]
The facet `medication/drug` has a value of the following syntax: \[ `drug` \] # \[ `agent` \] # \[ `code` \]

`drug`: the drug name (a.k.a. covered text) as appeared within the analyzed text
`agent`: the agent name (a.k.a. covered text) as appeared within the analyzed text
`code`: the mapped ATC classification code

## Additional Resources

The following sample documents (discharge letters) could be used for testing/trial:

* With concepts related to ICD-10 subcategory I (Diseases of the circulatory system):
  * [DischargeLetter_I_1.txt](./samples/DischargeLetter_I_1.txt)
  * [DischargeLetter_I_2.txt](./samples/DischargeLetter_I_2.txt)
  * [DischargeLetter_I_3.txt](./samples/DischargeLetter_I_3.txt)

  
* With concepts related to ICD-10 subcategory K (Diseases of the digestive system):
  * [DischargeLetter_K_1.txt](./samples/DischargeLetter_K_1.txt)
  * [DischargeLetter_K_2.txt](./samples/DischargeLetter_K_2.txt)
  * [DischargeLetter_K_3.txt](./samples/DischargeLetter_K_3.txt)

Furthermore, for testing of the concepts you could also use patient information leaflets of drugs publicly available in German under: http://www.ema.europa.eu/ema/index.jsp?curl=pages/medicines/landing/epar_search.jsp&mid=WC0b01ac058001d125

Moreover, you could also use Wikipedia entries about diseases, symptoms or drugs as sample documents like: https://de.wikipedia.org/wiki/Bradykardie.
