# PWA Manifest Injector

This service will append query terms to the start_url in a progressive web applications manifest at runtime.  
This is beneficial in applications where you do not know the search terms in advance, they rarely change from an group of users perspective and the application relies on them.

## Usage

Pull and then run the image

```shell
docker run -p 443:443 80:80 -d tskiba/pwa-search-term-injector:latest
```

I recommend handling ssl on the host machine rather then with this image so would not expose port 443.  
In production environments please use a numerical tag instead of `latest`.

Then update your applications index file to load the dynamic manifest.

```diff
<!DOCTYPE html>
+ <script>
+    var link = document.createElement('link');
+    link.href = 'http://localhost:8082/manifest.json' + window.location.search;
+    link.rel = 'manifest';
+    document.getElementsByTagName('head')[0].appendChild(link);
+ </script>
<head>
-    <link rel="manifest" href="app.webmanifest">
</head>
```

Ensure that you also provide an `app.webmanifest` next to the index file.

### Example

Without this service visiting https://app.tskiba.com.au?dataUrl=http://my-data.com/current.xml the manifest looks like

```json
{
  "name": "Application",
  "short_name": "App",
  "start_url": ".",
  "display": "standalone"
}
```

With the service it becomes

```json
{
"name": "Application",
  "short_name": "App",
  "start_url": "https://app.tskiba.com.au?dataUrl=http://my-data.com/current.xml",
  "display": "standalone"
}
```
