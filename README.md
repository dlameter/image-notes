# Image Notes
A web program that allows you to take persistant notes on images.

# How to install/run
To build the final bundle needed to run the webpage locally or host on a server go to the project root and run ```npm run build```. This will create a working bundle.js of the main js file. After that just open index.html in your browser of choice.

# How to use
The main functionality added is the loading and saving of data. Once the site is opened on the top right corner there will be four buttons, which when clicked will do the following:
* The image icon allows you to load an image as a background to take notes upon.
* The document icon allows you to load geojson data that will be placed on top of the image.
* The download icon allows you to download created geojson notes to file so that you can persist your notes.
* The trash icon allows you to clear the application to work on a seperate image or data without needing to refresh the webpage.

Tools to markup your images, edit existing image markup, and erase markup are found on the left side of the screen below the zoom buttons. You can also zoom using the mouse wheel, and you can pan by clicking and dragging while holding the left mouse button.
