# TaskEase

TaskEase is a modern task management application built with Next.js, helping users organize tasks, boost productivity, and achieve their goals through an intuitive interface.

![TaskEase](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072)

## Features

- 📝 **Task Management**: Create, update, and delete tasks with ease
- 🏷️ **Priority Levels**: Assign low, medium, or high priority to tasks
- 📊 **Status Tracking**: Monitor task progress (Todo, In Progress, Completed)
- 🔍 **Search Functionality**: Quickly find tasks with the search feature
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔐 **User Authentication**: Secure login and signup system
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS and shadcn/ui

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Icons**: Lucide React

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/taskease.git
cd taskease
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
taskease/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── about/             # About page
├── components/            # React components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── lib/                   # Utility functions
└── public/               # Static assets
```

## Features in Detail

### Task Management
- Create new tasks with title, description, priority, and due date
- Update task status and details
- Delete tasks
- Organize tasks in columns by status

### Authentication
- Secure user registration and login
- JWT-based authentication
- Protected routes and API endpoints

### User Interface
- Clean and modern design
- Responsive layout
- Intuitive task organization
- Real-time updates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [MongoDB](https://www.mongodb.com/)
- [Lucide Icons](https://lucide.dev/)