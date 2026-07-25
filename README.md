# Automan Fitness Gym

A modern, responsive website for Automan Fitness Gym in Dhaka, Bangladesh. It
introduces the gym's facilities, membership plans, trainers, gallery, reviews,
and branch locations while giving prospective members a simple way to submit a
joining request.

## Features

- Responsive design for desktop, tablet, and mobile devices
- Gym services, facilities, trainers, and membership sections
- Image gallery and member testimonials
- Tejgaon and Dhanmondi branch information
- Embedded Google Maps and directions
- Joining-request modal with client-side validation
- Email notifications containing the client's name, phone number, preferred
  branch, and message
- Loading, success, validation, and delivery-error states
- Accessible controls and semantic page structure
- Search-engine files including `robots.txt` and `sitemap.xml`

## Technology

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Lucide React](https://lucide.dev/)
- [FormSubmit](https://formsubmit.co/) for joining-request emails

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Installation

```bash
git clone https://github.com/saimunhasanrifat14/Automan-Fitness-Gym.git
cd Automan-Fitness-Gym
npm install
```

### Run locally

```bash
npm run dev
```

Open the local URL displayed by Vite, normally
[`http://localhost:5173`](http://localhost:5173).

## Available Commands

```bash
npm run dev       # Start the local development server
npm run build     # Create an optimized production build
npm run preview   # Preview the production build locally
npm run lint      # Check the source code with ESLint
npm run format    # Format the project with Prettier
```

## Joining-Request Emails

The Join Now form is implemented in `src/pages/Home.jsx`. After validation, it
sends the following information to the gym owner:

- Client name
- Phone number
- Preferred branch
- Optional message

FormSubmit requires one-time activation for every recipient email address.
Submit the form once, open the activation email in the recipient's inbox, and
select **Activate Form**. Subsequent joining requests will then be delivered
with the subject **Joining Request**.

To change the recipient, update `inquiryEndpoint` inside `JoinModal` in
`src/pages/Home.jsx`. The new address must be activated separately.

> For production use, replace the visible email endpoint with FormSubmit's
> random endpoint or move email delivery to a private server-side function.

## Production Build

```bash
npm run build
npm run preview
```

Vite writes the optimized static website to the `dist` directory. Deploy that
output using any static host, such as Vercel, Netlify, Cloudflare Pages, or
GitHub Pages.

## Project Structure

```text
public/                 Images and search-engine files
src/
  components/           Shared React components
  pages/
    Home.jsx             Main website and joining-request form
    NotFound.jsx         404 page
  App.jsx                Application routes
  main.jsx               React entry point
  styles.css             Global styles and Tailwind configuration
index.html               HTML entry document
vite.config.js           Vite configuration
```

## Repository

[github.com/saimunhasanrifat14/Automan-Fitness-Gym](https://github.com/saimunhasanrifat14/Automan-Fitness-Gym)
