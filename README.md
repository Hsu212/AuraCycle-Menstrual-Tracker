🌸 AuraCycle Menstrual Tracker 🌸
Welcome to AuraCycle, a cute and user-friendly menstrual cycle tracker designed especially for girls! Track your cycle, understand your body better, and embrace your flow with a touch of pink. This web application is built to be fully responsive, providing a seamless experience on both mobile and desktop.

✨ Live Demo Link ✨
💖 Key Features
AuraCycle is packed with features to make cycle tracking simple and insightful:

Period & Ovulation Tracking: Easily log your period start and end dates.

Predictive Calendar: Get smart predictions for your next period, fertile window, and ovulation day.

Symptom & Mood Logging: Keep track of daily symptoms, moods, and notes to see patterns over time.

Cycle History: View your complete cycle history at a glance.

Secure User Accounts: Your data is safe and private with secure authentication powered by Supabase.

Cute & Responsive Design: A beautiful pink-themed interface that looks great on any device.

🛠️ Tech Stack
This project was brought to life using modern web technologies:

Frontend: React, TypeScript

Styling: Custom CSS for that perfect pink aesthetic!

Backend & Database: Supabase - The open-source Firebase alternative.

Deployment: Vercel - For seamless, continuous deployment straight from GitHub.

🚀 Getting Started Locally
Want to run the project on your own machine? Follow these simple steps!

Prerequisites
Node.js (v18 or later)

npm or yarn

A Supabase account (you'll need a free project)

Installation & Setup
Clone the Repository:

git clone [https://github.com/YOUR_USERNAME/AuraCycle.git](https://github.com/YOUR_USERNAME/AuraCycle.git)
cd AuraCycle

Install Dependencies:

npm install
# or
yarn install

Set Up Environment Variables:

Create a file named .env.local in the root of your project.

Log in to your Supabase project dashboard.

Go to Project Settings > API.

Copy your Project URL and anon public key.

Add them to your .env.local file like this:

REACT_APP_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
REACT_APP_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

Set up Supabase Database:

In your Supabase project, use the SQL Editor to create the necessary tables. You can use the schema from schema.sql (if you have one) or manually create tables for users, cycles, symptoms, etc.

Run the Development Server:

npm start
# or
yarn start

Your application should now be running locally at http://localhost:3000! 💖

🌐 Deployment
This project is configured for easy deployment with Vercel.

Push to GitHub: Make sure your code is on a GitHub repository.

Connect to Vercel: Import your GitHub repository into Vercel.

Configure Environment Variables: Add your REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in the Vercel project settings.

Deploy! Vercel will automatically build and deploy your application. Any future pushes to the main branch will trigger a new deployment.

🤝 How to Contribute
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
Distributed under the MIT License. See LICENSE for more information.
