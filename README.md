# List Control

Oracle APEX Plug-in to make List and Card items selectable!

- **Boost UX** - Replace old plain checkboxes and radio buttons with effective and engaging UI! Plug-in offers various style options for single/multi selection controls.

- **Utilize APEX Templates** - Controls are integrated into powerful APEX UT template regions which are customizable, responsive, and compatible with right to left page direction.

- **Save Dev Time** - The plug-in's hidden page item catches selected item ids on real-time and can be processed effortlessly.


## Demo App

- [View demo app](#)
- [Download demo app export file](#)  
Demo app can be imported only to APEX 20.1 or above. If you have a previous version, you can import to [apex.oracle.com](https://apex.oracle.com/en/) account.

## How it Works

1.  The plug-in's hidden page item resides inside target region (List or Classic Report regions).
2.  Each change of selection refreshes the page item value with selected ids (This change event can optionally trigger a dynamic action).
3.  On page submit the page item's value can be processed as with any page item.
4.  On page load, options are displayed as selected based on plug-in page item's value.

## Install

Compatible with APEX 5.1 or above.

1.  Import plug-in file 'dynamic_action_plugin_apexux_mporan_listcontrol.sql' from 'source' directory into your application.
2.  Create a List or Classic Report region (#1 on image) and specify list or query respectively.
3.  Provide return values on list/query using the instructions on "How to define return values"
4.  On region attributes (#2 on image) select Media List or Card template.
5.  Create a new page item inside target region (#3 on image).
6.  For page item 'Type' select 'List Control [Plug-In]'.

[image]

### How to define return values

#### For List Region
Go to List component settings on "Shared Components" -> "Lists".
1.  Choose List.
2.  Choose list item.
3.  On "User Defined Attributes" section find "Link Attributes" (3rd item for Media List, 5th item for Cards).  
    Set value to: data-id="x". Replace "x" with the return value (INCLUDING quotation marks). For example: data-id="1".

#### For Classic Report Region
Add a field to the query according the following table. Replace "id" with return value field, for example emp_no.

Media List template:  
'data-id=' || "id"  as LINK_ATTR

Card template:  
'lcp-data-id-' || "id" as CARD_MODIFIERS

### Notes

1. To display pre-selected items on page load set plug-in page item's value using source/default value/pre-processing. Avoid using "Current List Entry" on list definition.
2. Some template/plug-in option combinations may be incompatible. 
3. For region template use "Standard". "Blank with Attributes" template is not supported.

## Plug-In Settings

**Control Type** - Choose selection control type and whether user can select single or multiple items.

-   Radio Button (Single)
-   Checkbox (Multi)
-   Circle Checked (Single)
-   Circle Checked (Multi)
-   Plus Circle Checked (Multi)
-   Toggle-Switch (Multi)
-   Star (Multi)
-   Heart (multi)
-   Hidden (Single)
-   Hidden (Multi)

**Position** - Set position of selection control to start or end (left or right depending on page direction LTR/RTL). 

**Separator** - Choose whether to add border between selection control and list item content. Only affects Media List template.

### Optional - CSS templates
Demo app includes style modifications on some regions. The plug-in's CSS file includes the needed CSS lines. If you want to achieve the same appearance, install the demo app and inspect region's CSS Classes (Appearance section) to find out which class to use.

List of classes:

-   lcp-template-cards-b1
-   lcp-template-cards-b2
-   lcp-template-cards-f2
-   lcp-template-list--remove-border
-   lcp-template-cards--hide-title

## Planned Features
1.  Refresh selections on page when plug-in page item value is altered by dynamic action or JavaScript
1.  Plug-in settings for custom Font APEX icons for selection controls
