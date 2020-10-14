# JsOS - The Javascript Mock Operating System

JsOS is a virtual browser "mock" operating system, powered by nodeJS.

The current build features:
- File saving / loading
- Form editing using JSFrame
- UI draggable and resizable windows

## Startup

To create your JSFrame window program, simply start your code with

```javascript
var frame = new JSFrame();
frame.title = "New App";
frame.width = 640;
frame.height = 480;
frame.initialize();
```

## Components

The JSFrame window can hold several Components, and each Component can hold sub-components.

The current components are:
- JSButton
- JSLabel
- JSMenubar
- JSPanel
- JSTextarea
- JSTextbox
- JSTreeview (beta)

To add a (sub)component to a JSFrame/component, use
```
<JSFrame/component>.add(component);
```
This will append the component inside of the item.

Think of it as Java's *swing*, except with Javascript.

## Layouts

The current supported layouts are:
- TableLayout
