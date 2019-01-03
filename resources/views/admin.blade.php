<!DOCTYPE html>
<html>
<head>
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<title>Al-Hashmi app</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.0/gh-fork-ribbon.min.css" />
	<link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
</head>
<body class="animsition">
	<div id="app">
	</div>
	<script src="{{asset('js/app.js')}}" type="text/javascript" charset="utf-8" async defer></script>
</body>
</html>