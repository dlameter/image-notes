# Image Notes
A web program that allows you to take persistant notes on images.

# How to install/run
To build the final bundle needed to run the webpage locally or host on a server, go to the project root and run ```npm run build```. This will create a working bundle.js of the main javascript file. Once complete open index.html in your browser of choice.

# How to use
The main functionality of this application and leaflet.js extension is loading and saving data placed on the map. With the site opened, on the top right corner there will be four buttons, which when clicked will do the following:
* The image icon allows you to load a background image to take notes on.
* The document icon allows you to load geojson data that will be displayed on top of the image.
* The download icon allows you to save geojson data to file, allowing persistant notes.
* The trash icon allows you to clear the application of it's background image and data, so you can work on seperate images or data without needing to refresh the webpage.

Tools to notate your images, edit existing notes, and erase notes are found on the left side of the screen below the zoom buttons. You can also zoom using the mouse wheel, and you can pan by holding the left mouse button down and dragging.
