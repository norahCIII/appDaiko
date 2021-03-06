  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>Daiko</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons -->
    <link href="assets/img/favicon.png" rel="icon">
    <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->

    <!DOCTYPE html>
    <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title inertia>{{ config('app.name', 'Daiko') }}</title>

      <!-- Fonts -->
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

      <!-- Styles -->
      <link rel="stylesheet" href="{{ mix('css/app.css') }}">
      <link href="assets/css/style.css" rel="stylesheet">
      <!-- Scripts -->
      @routes
      <script src="{{ mix('js/app.js') }}" defer></script>
    </head>

  <body class="font-sans antialiased">
    @inertia
    <app-layout></app-layout>
    @env ('local')
    <script src="http://localhost:3000/browser-sync/browser-sync-client.js"></script>
    @endenv
  </body>

  </html>