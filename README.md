# yace
Yet another CSAF editor

A simple editor to create CSAF files.

## Product database

The selectable products are placed in folder data. 

- `product-list.json` contains a list of all products with name and id. `name` is displayed in the drop down field. `id` is used as part of filename to download product details.
- `/data/` contains files with product details.

## ToDo
- Load files from URL or drag'n'drop.
- Finding product name and id don't work with mixed full_product_name and branches or with relationships.

- Send csaf document to validation server
- Progessbar.
    - ggf. Einfärben der einträge für die Menuzeile, je nachdem ob noch Angaben fehlen

- Tab für Backend
    - Option für Login in Backend
    - Wird angezeigt, wenn Nutzer eingelogt ist.
    - Anzeige von Dokumenten aus dem Backend
    - Option für Anzeige von Dokumenten 
    - Workflow-Wechsel


## Security consideration

There is no input sanitation. Malicious script code entered by a user will not be filtered. 

## Thanks

- Thanks to Andy Bell and his actricle on https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/ for the simple state management system.
- Stefan Goessner for JsonPath