import { EntityInput } from './types'
import { getChildrenIDs, entitiesSchema } from './entityUtils'
import { normalize } from 'normalizr'

jest.mock(
    'uuid',
    (): (() => number) => {
        let value = 0
        return () => value++
    }
)

describe('getChildrenIDs', () => {
    it('return empty array with empty kids object', () => {
        const IDs = getChildrenIDs({
            id: '',
            data: {},
            kids: {},
        })

        expect(IDs).toEqual([])
    })
    it('return empty array with empty kids object', () => {
        const kidsA = ['abc', 'def']
        const kidsB = ['ghi', 'jkl']
        const correctResult = [...kidsA, ...kidsB]
        const IDs = getChildrenIDs({
            id: '',
            data: {},
            kids: {
                relationA: { records: kidsA },
                relationB: { records: kidsB },
            },
        })

        expect(IDs).toEqual(correctResult)
    })
})

describe('normalize with entitiesSchema', () => {
    it('correctly normalize data', () => {
        const normalizedData = normalize(entityInputTestData, entitiesSchema)

        expect(normalizedData.result.length).toEqual(1)
        const index = normalizedData.result[0]
        expect(normalizedData.entities.entity[2].data).toEqual(
            entityInputTestData[index].kids['has_relatives'].records[0].kids[
                'has_phone'
            ].records[0].data
        )
    })
    it('correctly normalize data with empty records', () => {
        const testData = [
            {
                data: {},
                kids: {
                    relationA: { records: [] },
                },
            },
        ]
        const normalizedData = normalize(testData, entitiesSchema)
        expect(normalizedData.result.length).toEqual(1)
    })
    it('correctly normalize data with no records', () => {
        const testData = [
            {
                data: {},
                kids: {
                    relationA: {},
                },
            },
        ]
        const normalizedData = normalize(testData, entitiesSchema)
        expect(normalizedData.result.length).toEqual(1)
    })
    it('does not fail on data without kids attribute', () => {
        const testData = [
            {
                data: {},
            },
        ]
        const normalizedData = normalize(testData, entitiesSchema)
        expect(normalizedData.result.length).toEqual(1)
    })
    it('does not fail on data without data attribute', () => {
        const testData = [{}]
        const normalizedData = normalize(testData, entitiesSchema)
        expect(normalizedData.result.length).toEqual(1)
    })
})

export const entityInputTestData: EntityInput[] = [
    {
        data: {
            'Identification number': '34',
            Name: 'Joqmo',
        },
        kids: {
            has_relatives: {
                records: [
                    {
                        data: {
                            'Relative ID': '1007',
                            'Patient ID': '34',
                            'Is alive?': 'true',
                        },
                        kids: {
                            has_phone: {
                                records: [
                                    {
                                        data: {
                                            'Phone ID': '2008',
                                            'ID of the relative': '1007',
                                            Phone: '+(179)-982-0570',
                                        },
                                        kids: {},
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        },
    },
]
