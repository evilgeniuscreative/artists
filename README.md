# Assignments

3/16/2024

- When navigating to InputForm, we need to pass in header title to indicate what data we're touching
- update handleSubmit in InputForm, so data will update on submit in edit page
- look for additional ways of refactoring code to make it as reusuable as possible (may or may not exist)
- look into Formik arrays in the documentation

Next time
- refactor formik form
- refactor tableview to utilize formik array


3/23/2024
- create a new form for albums
- user must be able to create, edit, delete the albums
- in addition, user will have an option to add songs. psych, just kidding, but also edit and delete. 
- table to display all albums 
    - four columns
        - name - name of album
        - artist - artist -- deletes artist from main artist db as well
        - number of songs - just a number
        - buttons - edit, delete
- by able to sort these albums alphabetically

3/30/2024
- update routes for album should take in an optional id
- understand the difference between using <Links> vs navigate


Tasks 
1. Add query parameters to the album page --  typescript issues, can't fix
2. in the artist page, when a user clicks on an album, navigate to it. (Look at question 1)
3. EXTRA - Album page should list all the songs, onClick - link to YouTube. Look into react-music-player if deisred. 
https://www.npmjs.com/package/react-h5-audio-player

You should be able to answer these questions to yourself
1. When would use <Links> vs useNavigate?
2. In the edit page, we saw that initialValues was being set, but not being rendered in the form. What prop did we use
    to fix it? and what does it do?
3. What's the name of the hook we use to access the query parameters when navigating through react-router-dom?
4. 
