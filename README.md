## Control

The Control is a simple jQuery data binding control inspired by Knockout. 

## Usage

First include jQuery theme.

```html
<link type="text/css" href="css/bootstrap.css" rel="stylesheet" />
```

Then include jQuery script.

```html
<script type="text/javascript" src="script/jquery-1.10.2.js"></script>
<script type="text/javascript" src="script/control.js"></script>
```

Add a data control to your HTML page

```html
    <div id="source">
    Last Name <input type="text" name="lastname">
    First name<input type="text" name="firstname">
    </div>
```

Add a data source for control to bind.

```javascript
    var data = {lastname: "Xia", firstname: "Alex"};
```

Set up the data control like following. This control can update the source and fire update event.

```javascript
    $("#source").Control({
        DataSource: data,
        Event: 'data.changed',
        Update: 'true'
    });
```

If you need to watch data changed, then set up control like following.

```javascript
    $("#source").Control({
        DataSource: data,
        Event: 'data.changed'
    });
}; 
```

That's it. Enjoy.

## Authors

[Alex Xia](https://github.com/xiaalex)

