
export class BaseModel {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean = false;
}
