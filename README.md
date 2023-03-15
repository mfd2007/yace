# yace
Yet another CSAF editor

A simple editor to create CSAF files.

## Product database

The selectable products are hardcoded at the moment in the file `yace/js/lib/productdatabase.js`.

## ToDo

- Loading of product database from json file.
- Find full product name & id dynamically in product database.


## Security consideration

There is no input sanitation. Malicious script code entered by a user will not be filtered. 

## Thanks

- Thanks to Andy Bell and his actricle on https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/ for the simple state management system.