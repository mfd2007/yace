# yace
Yet another CSAF editor

A simple editor to create CSAF files.

## Product database

The selectable products are placed in folder data. 

- `product-list.json` contains a list of all products with name and id. `name` is displayed in the drop down field. `id` is used as part of filename to download product details.
- `/data/` contains files with product details.

## ToDo

- Find full product name & id dynamically in product database, to make product definition more flexible.
- Load files from URL or drag'n'drop.
- Send csaf document to validation server
- Hübsch machen
    - Input-Felder ggf. Gruppieren
    - Entfernen-Button ist teilweise verrutscht/nicht richtig sichtbar
- Progessbar.
    - ggf. Einfärben der einträge für die Menuzeile, je nachdem ob noch Angaben fehlen
- Export-Button in Fusszeile
- Übersichtstab erstellen
    - Funktionen für laden von Dokumenten von Festplatte oder URL

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