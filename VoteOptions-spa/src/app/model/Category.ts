export interface ElectionCategories {
    election: any
    categories: CategoriesByElection[]
}
export interface CategoriesByElection {
    categoriesByElectionItemsId: string
    category: Category
}

export interface Category{
    categoriesByElectionItemsId: string
    id: string,
    name: string,
    description: string
}

export interface CategoryVote{
    id: string,
    name: string,
    description: string
}
export interface Project {
    id: number,
    name: string,
    description: string,
    goal: number,
    pledged: number,
    backersCount: number
    pictureUrl: string,
    userId: string,
    userName: string,
    userPicture:string,
    financedDate?: Date;  // El símbolo '?' indica que es opcional, equivalente a un DateTime?
    creationOn: Date;
}

export interface ProjectResponseIA {
    name: string,
    description: string,
    goal: number,
    creationOn: Date;
}


export interface CreateProject {
    name: string;
    description: string;
    goal: number;
    picture?: File; 
}


export interface UdateProject {
    id: number,
    name: string,
    description: string,
    goal: number
}