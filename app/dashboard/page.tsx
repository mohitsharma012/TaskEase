"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Plus, LogOut, Search, Trash2, Edit2, Calendar, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getCurrentUser, logout } from "@/lib/auth";
import { createTask, getTasks, updateTask, deleteTask } from "@/lib/tasks";
import { Task } from "../types";
import { LoadingSpinner } from "@/components/loading";
import { toast } from 'react-toastify';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "todo" as Task["status"],
    priority: "medium" as Task["priority"],
    dueDate: "",
  });
  
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push("/auth");
        return;
      }
      const fetchTasks = async () => {
        try {
          const userTasks = await getTasks(user.userId);
          setTasks(userTasks);
        } catch (error) {
          toast.error("Failed to fetch tasks");
         
        } finally {
          setLoading(false);
        }
      };
      fetchTasks();
    };
    fetchData();
  }, [router, toast]);

  const resetForm = () => {
    setTaskForm({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
    });
    setEditingTask(null);
  };

  const handleOpenDialog = (task?: Task) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSubmitTask = async () => {
    try {
      if (editingTask) {
        const updatedTask = await updateTask(editingTask._id, {
          ...taskForm,
          userId: editingTask.userId,
          createdAt: editingTask.createdAt,
        });
        setTasks(tasks.map((t) => (t._id === editingTask._id ? updatedTask : t)));
        toast.success("Task updated");
      } else {
        const user = await getCurrentUser();
        if (!user) {
          toast.error("User not found");
          return;
        }
        const newTask = await createTask({
          ...taskForm, userId: user.userId,
          _id: ""
        });
        setTasks([...tasks, newTask]);
        toast.success("Task created");
       
      }
      handleCloseDialog();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((t) => t._id !== taskId));
      toast.success("Task deleted");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, status: Task["status"]) => {
    try {
      console.log("status", status);
      const updatedTask = await updateTask(taskId, { status });
      // setTasks(tasks.map((t) => (t._id === taskId ? updatedTask : t)));
      toast.success("Task updated");
      
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  const getPriorityIcon = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "";
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return "border-l-4 border-red-500";
      case "in-progress":
        return "border-l-4 border-yellow-500";
      case "completed":
        return "border-l-4 border-green-500";
      default:
        return "";
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColumns = ["todo", "in-progress", "completed"] as const;
  const statusTitles = {
    "todo": "To Do",
    "in-progress": "In Progress",
    "completed": "Completed"
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            TaskEase
            </h1>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="ghost" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <Suspense fallback={<LoadingSpinner />}>
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold">Your Tasks</h2>
              <p className="text-muted-foreground">Manage and organize your tasks efficiently</p>
            </div>
            <Button onClick={() => handleOpenDialog()} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={taskForm.title}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, title: e.target.value })
                    }
                    placeholder="Enter task title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={taskForm.description}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, description: e.target.value })
                    }
                    placeholder="Enter task description"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={taskForm.priority}
                      onValueChange={(value) =>
                        setTaskForm({ ...taskForm, priority: value as Task["priority"] })
                      }
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={taskForm.dueDate}
                      onChange={(e) =>
                        setTaskForm({ ...taskForm, dueDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button onClick={handleSubmitTask} className="w-full">
                  {editingTask ? 'Update Task' : 'Create Task'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statusColumns.map((status) => (
              <div key={`column-${status}`} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{statusTitles[status]}</h3>
                  <span className="text-sm text-muted-foreground">
                    {filteredTasks.filter(t => t.status === status).length} tasks
                  </span>
                </div>
                <div className="space-y-4">
                  {filteredTasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                      <Card 
                        key={`task-${task._id}`}
                        className={`hover:shadow-lg transition-all duration-300 ${getStatusColor(task.status)}`}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg font-semibold">
                              {task.title}
                            </CardTitle>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOpenDialog(task)}
                                className="h-8 w-8"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteTask(task._id)}
                                className="h-8 w-8 text-destructive hover:text-destructive/90"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {task.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <div className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                              {getPriorityIcon(task.priority)}
                              <span className="capitalize">{task.priority}</span>
                            </div>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                          <Select
                            value={task.status}
                            onValueChange={(value) =>
                              handleUpdateTaskStatus(task._id, value as Task["status"])
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todo">To Do</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </Suspense>
    </div>
  );
}