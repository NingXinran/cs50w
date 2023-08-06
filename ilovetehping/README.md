# CS50w Final Project - ilovetehping

### About This Project

Teh ping is a Singaporean drink that is made from tea, milk and sugar. This project is a webapp that allows the user to track their favourite teh ping shops by creating and editing markers (’Teh Pins’) on a map, and filter and sort the shops that have been created. There is an additional Translator feature that teaches the user to order the drink in true Singaporean fashion.

![Screenshot 2023-08-06 at 9 56 09 PM](https://github.com/NingXinran/cs50w/assets/70146427/3158185f-4b85-47c9-bcc0-2e2df84ae474)

### Distinctiveness and Complexity

This project is distinct due to its use the following various tools that were not taught in the lectures nor used in any of my previous projects:

1. React frontend: Instead of serving react components inside HTML files, this project uses a react app to call API provided by a Django backend using axios. I utilise the react router to make the website a single page app, and learnt to write declaratively by using React hooks like useState and useEffect. The project is made more complex by the following features I have implemented:
    - Creating or editing a marker automatically updates the cards below
    - Filter and Sort: Typing in the filter input or selecting a sort automatically changes the cards that are displayed. Furthermore, the filter and sort functions are not mutually exclusive, i.e. sort can be applied on top of what has been filtered.
    - New bootstrap components: I used more complex bootstrap components such as OverlayTrigger, Tooltip, and Offcanvas for the first time.
2. Google Maps API: In this project, I learnt to integrate Google Maps using a react package that wraps over the Google Maps API. The complexity comes from learning to choose the package that provides the tools that I need, and reading the documentation provided by Google Maps and other package developers for creating more complex custom features such as:
    - Use custom Google Map style
    - Fetch data from backend then create a marker for each pin
    - Show pin name when hovering over marker
    - Show edit form when clicked on marker
    - Pan map to corresponding marker when marker is created or clicked, or when the ‘View’ button on card is clicked
3. Django REST Framework: I used Serializers in Django’s REST framework to provide CRUD operations on the pins.
4. Package Management: To more easily manage the packages for the project and make it easier to run on other machines, I learnt to use virtual environment `pipenv` and react package manager `npm`.

### Running this Project

1. Clone this project into your local machine and `cd` into the project
2. Run the backend:
    - Open a new terminal
    - `pip3 install pipenv` if you don’t have pipenv installed.
    - `pipenv install` to install the dependencies
        
        There should not be a need to use the `requirements.txt` file.
        
    - `pipenv shell` to enter the virtual environment.
    - `cd backend`, then `python3 manage.py runserver` to start the backend server
3. Run the frontend:
    - Open a new terminal
    - `cd ../frontend`
    - `npm install` to install the dependencies for the frontend. You should see a folder called `node_modules` created.
    - `npm start` to run the frontend app
    - **Important!** Make sure the backend is running on port 8000, as the frontend only allows API calls from this port. Make sure the frontend is running on port 3000, as the Google Maps API Key only allows API calls from this port.

### File Directory

- `Pipfile` - The file used by Pipenv to manage project dependencies.
- `/backend` folder - the Django project containing backend code
    - `/ilovetehping` folder - the Django app for this website
        - `serializers.py` and `views.py` - Serializers that provides API for models created in Django
        - `models.py` - The main model created for this project is the Shop, which contains all the necessary information required to display on the frontend map and cards.
- `/frontend` folder - the React app containing the frontend code
    - `.env` - The file containing the keys needed to display the unique Google map for the website.
    - `package.json` - The file containing metadata about the project, and used by `npm` package manager to manage project dependencies
    - `/public` folder - Contains publicly accessible assets such as the `index.html` file to be rendered, and the icons that are used in the project.
    - `/src` folder - The folder containing all the code written for the frontend of the project.
        - `App.js` - The top most component of the app, where all other components are nested as child components. This component is displayed in `index.js`.
        - `global.css` - The file containing CSS code that makes this project mobile responsive.
        - `/components` folder - Contains all the components I have written for the project, which are listed below:
            - `Acknowledgements.jsx` - The Acknowledgement component built using bootstrap’s Offcanvas component. It is a dismissible panel that is displayed from the right side of the screen when ‘Acknowledgement’ is tapped in the navigation bar.
            - `Header.jsx` - The navigation bar that is present at all times. It allows the user to navigate between the Map and Translator pages, and display the Acknowledgements panel.
            - `Callout.js` - The dismissable alert that is displayed by default to let users know what ‘teh ping’ is.
            - `Home.js` - The home page, which contains the Callout, Map and PinDetails components. The home page is in charge of fetching the pins from the backend and passing it to other child components using props.
            - `Map.js` - The main component of the app. This component handles the loading of the google map, and contains methods for handling interactions with the map markers, and creating, editing and deleting these markers. It also displays the details for each pin in the cards section below the map.
            - `PinDetails.js` - The component for the card section. It renders a card for each pin and displays the details related to the pin. Each card also has a ‘View’ button that, when clicked, navigates the user to the associated pin on the map. The component also contains the Filter component.
            - `Filter.js` - The component that allows the user to filter and sort the cards.
            - `MarkerWithTooltip.js` - The marker component wrapped in an OverlayTrigger component that allows the name of the marker to be shown when the user hovers over the marker.
            - `consts.js` - The javascript file containing the constants used by other files, such as the map style and the default center of the map.
            - `Translator.js` - The component that displays the translator feature of the webpage. It uses multiple useState and useEffect hooks to dynamically display the name of the drink based on the user’s selections.
