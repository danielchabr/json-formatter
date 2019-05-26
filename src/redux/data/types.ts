export interface EntityInput {
    data: {}
    kids: {
        [relation: string]: {
            records: EntityInput[]
        }
    }
}

type UUID = string
export interface Entity {
    id: UUID
    parentId?: UUID
    data: {
        [key: string]: any
    }
    kids: {
        [relation: string]: {
            records: UUID[]
        }
    }
}

export interface EntityMap {
    [UUID: string]: Entity
}

export enum LoadingStateEnum {
    NONE,
    IN_PROGRESS,
    SUCCESS,
    ERROR,
}
