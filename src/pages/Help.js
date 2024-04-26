// About.js

function About() {
    return (
      <div className="about">

        <div className="info">
          <h1 className="maintitle">Help</h1>
          <br></br>
          <p className="description">
            This page describes the actions you can perform on each page redirected through the top navigation bar.
          </p>
        </div>

        <div className="info">
          <h2 className="title">Home</h2>
          <p className="description">
            A form that allows you to choose categories of tourist attractions and search for keywords. The Home page loads 12 attractions from the TIH API and displays it in grid fashion.
            
            <br/><br/>
            Each grid item contains the name of the attraction and a clickable picture of the attraction. Once clicked, a pop-up window opens containing a description of the attraction.
            <strong>If the user is logged in</strong>, it is possible to leave a comment and rating that will be stored in a remote API.
          </p>
        </div>

        <div className="info">
          <h2 className="title">About</h2>
          <p  className="description">
            Description of site
          </p>
        </div>

        <div className="info">
          <h2 className="title">Contact Us</h2>
          <p  className="description">
            A form with <strong>Submit</strong> button allows you to contact the site owner.
          </p>
        </div>
        
        <div className="info">
          <h2 className="title">Favourites</h2>
          <p  className="description">          
            Favourites page is available once user logs in. A table that shows the logged favourites containing a rating as well as a comment of the logged-in user.
            It is possible to edit the rating and the comment of each individual attraction. It is also possible to delete any attraction from the table.
          </p>
        </div>

        <div className="info">
          <h2 className="title">Login / Logout</h2>
          <p  className="description">
            Login with username and password. Logout appears in top navigation bar.
          </p>
        </div>
      </div>
    );
  }
  
  export default About;
  