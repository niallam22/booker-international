Booker

Born out of the frustration of scheduling group meetings spanning different timezones. This project enables people to create and share a meeting with their potential availability. Once attendees have responded the faciliator can then select the best possible time that suits everybody whilst also removing the hastle of manually calculating timezone differences that Booker handles automajically.

![Setting up a meeting](readmeImg/booking.gif?raw=true "Booking a meeting")
Link to project: 

How It's Made:
Tech used: HTML, CSS, JavaScript, Express 

This is a fullstack CRUD app project with protected user authentication and is based on MVC architecture. The site has been rendered using .ejs templates and dynamically styled using Bootstrap 5.

MongoDB is used to store user sessions, encrypted user login information and meeting informtion. 

This project has both protected and public views. Protected views that can only be accessed upon user authentication, such as creating meetings. And private views, once a meeting is created the meeting facilitator can share the meeting id with potential attenedees that can register their attendence without logging in to ensure a smoother user experience. 

The meeting facilitor has access to a dynamically generated form to create their meeting request including all the information and availability e.g. so the user can choose how many options for times they want to see. Once the user has selected one or more timeslots for the meeting the Moment.js library is used to convert the meeting date and time into a standard ISO format. Timings are then converted to local when a user is accessing the meeting information, ensuring that users dont need to calculate differing timezones.

Once attendence has been registered for the meeting, the facilitator can view the responses displayed in a table and finalise the most suitable time. The time will then be displayed on both the public and private views.

Optimizations
Use a javascript library such as React to create the UI to leverage reusable components e.g the public and private meeting views would ideally share a parent component.

Create email notification of meeting times and changes
Create shareable clickable meeting links
3rd party calendar syncing

Lessons Learned:
Where possible and appropritate prioritising client side computation to reduce the load on the servers e.g when creating a meeting the user generates a large array of timeslots that they can continue to change. There is no need for these times to be processed by the server.




