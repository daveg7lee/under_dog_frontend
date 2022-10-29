export interface IUser {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
  is_verified: boolean;
  points: number;
  underdog: IUnderDog;
  invests: IInvest[];
  likedProjects: string;
  role: string;
}

export interface IInvest {
  id: number;
  investor: IUser;
  project: IProject;
}

export interface IUnderDog {
  id: string;
  name: string;
  leader: IUser;
  members: string;
  experiences: string;
  scenario: string;
  ability: string;
  bio: string;
  avatarUrl: string;
  projects: IProject[];
}

export interface IProject {
  id: number;
  title: string;
  author: IUser;
  detail: string;
  progress: number;
  goal_amount: number;
  current_amount: number;
  investors: IInvest[];
  like: IUser[];
  mediaUrl: string;
  imageUrl: string;
  category: ICategory;
  ticket_price: number;
  fundingDueDate: string;
  fundingReward: string;
}

export interface ICategory {
  id: number;
  title: string;
  projects: IProject[];
}
