<!DOCTYPE html>
<html lang="en">
    <head>
        <title>CV</title>
        <link rel="icon" type="image/png" href="src/assets/favicon.png" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta content="IE=edge" http-equiv="X-UA-Compatible">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <script src="src/libs/jquery/jquery-1.11.3.min.js" type="text/javascript"></script>
    </head>
    <body>
        <script>
            var GET = <?= json_encode(filter_input_array(INPUT_GET)); ?>;
        </script>
        <script src="src/js/loader.js" type="text/javascript"></script>
    </body>
</html>