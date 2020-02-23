import { GenderEnum} from '../enum/gender.enum';

export class User {
    name: string;
    email: string;
    gender: GenderEnum;
    status: boolean;

    constructor() {
        this.name = null;
        this.email = null;
        this.gender = GenderEnum.FEMININE;
        this.status = true;
    }
}