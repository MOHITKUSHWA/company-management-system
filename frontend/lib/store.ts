import { create } from 'zustand';

// --- Types ---

export type Role = 'company_admin' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyId?: string; // If employee, which company they belong to. If admin, which company they own.
  avatar?: string;
  title?: string; // Job title
}

export interface Company {
  id: string;
  name: string;
  description: string;
  website?: string;
  logo?: string;
  ownerId: string;
}

export interface Project {
  id: string;
  companyId: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  dueDate?: string;
  members: string[]; // User IDs
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assigneeId?: string;
  dueDate?: string;
}

// --- Mock Data ---

const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    name: 'Acme Corp',
    description: 'Leading provider of coyote catching equipment.',
    ownerId: 'u1',
    logo: 'https://avatar.vercel.sh/acme-corp.png',
  },
  {
    id: 'c2',
    name: 'Globex',
    description: 'We move the world.',
    ownerId: 'u3',
  }
];

const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john@acme.com',
    role: 'company_admin',
    companyId: 'c1',
    title: 'CEO',
    avatar: 'https://i.pravatar.cc/150?u=john',
  },
  {
    id: 'u2',
    name: 'Jane Smith',
    email: 'jane@acme.com',
    role: 'employee',
    companyId: 'c1',
    title: 'Senior Engineer',
    avatar: 'https://i.pravatar.cc/150?u=jane',
  },
  {
    id: 'u3',
    name: 'Hank Scorpio',
    email: 'hank@globex.com',
    role: 'company_admin',
    companyId: 'c2',
    title: 'CEO',
  }
];

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    companyId: 'c1',
    name: 'Website Redesign',
    description: 'Overhaul the corporate website with new branding.',
    status: 'active',
    dueDate: '2024-12-31',
    members: ['u1', 'u2'],
  },
  {
    id: 'p2',
    companyId: 'c1',
    name: 'Mobile App MVP',
    description: 'Initial release of the mobile application.',
    status: 'planning',
    members: ['u2'],
  }
];

const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Design Home Page',
    status: 'done',
    priority: 'high',
    assigneeId: 'u2',
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Implement Auth',
    status: 'in-progress',
    priority: 'high',
    assigneeId: 'u2',
  },
  {
    id: 't3',
    projectId: 'p2',
    title: 'Setup React Native',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'u2',
  }
];

// --- Store ---

interface AppState {
  users: User[];
  companies: Company[];
  projects: Project[];
  tasks: Task[];
  currentUser: User | null;

  // Actions
  login: (email: string, role: Role) => boolean;
  logout: () => void;
  registerCompany: (name: string, ownerName: string, email: string) => void;
  
  // CRUD
  addEmployee: (user: Omit<User, 'id'>) => void;
  updateEmployee: (id: string, data: Partial<User>) => void;
  deleteEmployee: (id: string) => void;
  
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, data: Partial<Task>) => void;

  updateCompany: (id: string, data: Partial<Company>) => void;
  updateUser: (id: string, data: Partial<User>) => void;
}

export const useStore = create<AppState>((set, get) => ({
  users: MOCK_USERS,
  companies: MOCK_COMPANIES,
  projects: MOCK_PROJECTS,
  tasks: MOCK_TASKS,
  currentUser: null,

  login: (email, role) => {
    // Simple mock login - find user by email
    const user = get().users.find(u => u.email === email); // && u.role === role in real app? 
    // For demo simplicity, if user exists, log them in. 
    if (user) {
      set({ currentUser: user });
      return true;
    }
    return false;
  },

  logout: () => set({ currentUser: null }),

  registerCompany: (name, ownerName, email) => {
    const companyId = `c${Date.now()}`;
    const userId = `u${Date.now()}`;
    
    const newCompany: Company = {
      id: companyId,
      name,
      description: '',
      ownerId: userId,
    };

    const newUser: User = {
      id: userId,
      name: ownerName,
      email,
      role: 'company_admin',
      companyId,
    };

    set(state => ({
      companies: [...state.companies, newCompany],
      users: [...state.users, newUser],
      currentUser: newUser, // Auto login
    }));
  },

  addEmployee: (userData) => {
    const newUser = { ...userData, id: `u${Date.now()}` };
    set(state => ({ users: [...state.users, newUser] }));
  },

  updateEmployee: (id, data) => {
    set(state => ({
      users: state.users.map(u => u.id === id ? { ...u, ...data } : u)
    }));
  },

  deleteEmployee: (id) => {
    set(state => ({
      users: state.users.filter(u => u.id !== id)
    }));
  },

  addProject: (projectData) => {
    const newProject = { ...projectData, id: `p${Date.now()}` };
    set(state => ({ projects: [...state.projects, newProject] }));
  },

  updateProject: (id, data) => {
    set(state => ({
      projects: state.projects.map(p => p.id === id ? { ...p, ...data } : p)
    }));
  },

  addTask: (taskData) => {
    const newTask = { ...taskData, id: `t${Date.now()}` };
    set(state => ({ tasks: [...state.tasks, newTask] }));
  },

  updateTask: (id, data) => {
    set(state => ({
      tasks: state.tasks.map(t => t.id === id ? { ...t, ...data } : t)
    }));
  },

  updateCompany: (id, data) => {
    set(state => ({
      companies: state.companies.map(c => c.id === id ? { ...c, ...data } : c)
    }));
  },

  updateUser: (id, data) => {
     set(state => ({
      users: state.users.map(u => u.id === id ? { ...u, ...data } : u),
      // update current user if it's them
      currentUser: state.currentUser?.id === id ? { ...state.currentUser, ...data } : state.currentUser
    }));
  }
}));
