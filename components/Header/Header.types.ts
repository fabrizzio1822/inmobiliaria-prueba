export type HeaderData = {
  id: number;
  name: string;
  link: string;
  submenu?: { 
    id: number; 
    name: string; 
    link: string;
    description?: string;
    iconName?: string;
  }[];
};
