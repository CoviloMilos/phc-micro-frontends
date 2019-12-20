export interface ContainerInfo {
    container_id: string;
    image: string;
    created: number;
    state: string;
    status: string;
    privatePort: number;
    publicPort: number;
}