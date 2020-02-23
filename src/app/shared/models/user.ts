export class User {
    name: string;
    email: string;
    gender: 'FEMININE' | 'MALE';
    status: boolean;

    constructor() {
        this.name = null;
        this.email = null;
        this.gender = 'FEMININE';
        this.status = true;
    }
}