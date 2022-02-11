## CURL for testing
curl -d '{"content":  "CURL is good for testing apis", "date": "2019-05-30T19:20:14.298Z", "important":true}' -H 'Content-Type: application/json' http://localhost:3001/api/notes
{"content":"CURL is good for testing apis","important":true,"date":"2022-02-09T09:57:56.603Z","id":4}