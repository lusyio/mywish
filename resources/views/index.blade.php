<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="referrer" content="no-referrer" />
        <meta property="og:title" content="{{ $ogTitle }}"/>
        <meta property="og:image" content="https://mywish.su/public/images/og.jpg"/>
        <meta property="og:url" content= "{{$ogUrl}}" />
        <title>{{$title}}</title>
        <meta name="description" content="{{$description}}">
        <link rel="shortcut icon" href="{{ public_path('/favicon.ico') }}" type="image/x-icon"/>
        <link rel="icon" href="{{ public_path('/favicon.ico') }}" type="image/x-icon"/>
        <script src="https://apis.google.com/js/platform.js" type="text/javascript"></script>
        <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div id="root"></div>
        <script src="{{mix('js/app.js')}}" ></script>
    </body>
</html>
